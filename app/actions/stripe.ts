"use server"

import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
import { getProductById } from "@/lib/products"

export async function createCheckoutSession(productId: string) {
  const product = getProductById(productId)

  if (!product) {
    throw new Error(`Продукт с ID "${productId}" не найден`)
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Необходима авторизация")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (product.isHwidReset && profile) {
    const now = new Date()
    if (profile.last_hwid_reset) {
      const lastReset = new Date(profile.last_hwid_reset)
      const diffDays = Math.ceil((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays < 7) {
        product.priceInCents = 5900
      }
    }
  }

  if (product.isPremium && profile) {
    if (profile.role === "Free" || !profile.subscription_expiry || new Date(profile.subscription_expiry) < new Date()) {
      throw new Error("Premium доступен только при активной подписке")
    }
    if (profile.has_premium_addon) {
      throw new Error("Premium уже активирован")
    }
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    customer_email: user.email,
    line_items: [
      {
        price_data: {
          currency: "rub",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      user_id: user.id,
      product_id: productId,
      duration_months: product.durationMonths.toString(),
      is_premium: product.isPremium ? "true" : "false",
      is_hwid_reset: product.isHwidReset ? "true" : "false",
    },
  })

  await supabase.from("purchases").insert({
    user_id: user.id,
    product_id: productId,
    product_name: product.name,
    price_cents: product.priceInCents,
    duration_months: product.durationMonths,
    stripe_session_id: session.id,
    status: "pending",
  })

  return session.client_secret
}

export async function handlePaymentSuccess(sessionId: string) {
  const supabase = await createClient()

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status !== "paid") {
    return { error: "Оплата не завершена" }
  }

  const { user_id, product_id, duration_months, is_premium, is_hwid_reset } = session.metadata || {}

  await supabase
    .from("purchases")
    .update({
      status: "completed",
      stripe_payment_intent: session.payment_intent as string,
    })
    .eq("stripe_session_id", sessionId)

  if (is_hwid_reset === "true") {
    const newHwid =
      "HWID-" +
      Math.random().toString(36).substring(2, 6).toUpperCase() +
      "-" +
      Math.random().toString(36).substring(2, 6).toUpperCase() +
      "-" +
      Math.random().toString(36).substring(2, 6).toUpperCase()

    const { data: profile } = await supabase.from("profiles").select("hwid_resets_count").eq("id", user_id).single()

    await supabase
      .from("profiles")
      .update({
        hwid: newHwid,
        hwid_resets_count: (profile?.hwid_resets_count || 0) + 1,
        last_hwid_reset: new Date().toISOString(),
      })
      .eq("id", user_id)

    return { success: true, type: "hwid_reset" }
  }

  if (is_premium === "true") {
    await supabase
      .from("profiles")
      .update({
        has_premium_addon: true,
      })
      .eq("id", user_id)

    return { success: true, type: "premium" }
  }

  const months = Number.parseInt(duration_months || "0")
  if (months > 0) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_expiry, role")
      .eq("id", user_id)
      .single()

    const now = new Date()
    const currentExpiry = profile?.subscription_expiry ? new Date(profile.subscription_expiry) : now
    const baseDate = currentExpiry > now ? currentExpiry : now
    const newExpiry = new Date(baseDate)
    newExpiry.setMonth(newExpiry.getMonth() + months)

    await supabase
      .from("profiles")
      .update({
        subscription_expiry: newExpiry.toISOString(),
        role: profile?.role === "Free" ? "User" : profile?.role,
      })
      .eq("id", user_id)

    return { success: true, type: "subscription" }
  }

  return { success: true }
}
