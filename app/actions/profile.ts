"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateProfile(updates: {
  avatar_url?: string
  banner_url?: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Не авторизован" }
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { data }
}

export async function resetHwid() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Не авторизован" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("hwid_resets_count, last_hwid_reset")
    .eq("id", user.id)
    .single()

  if (!profile) {
    return { error: "Профиль не найден" }
  }

  const newHwid =
    "HWID-" +
    Math.random().toString(36).substring(2, 6).toUpperCase() +
    "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase() +
    "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase()

  const { error } = await supabase
    .from("profiles")
    .update({
      hwid: newHwid,
      hwid_resets_count: profile.hwid_resets_count + 1,
      last_hwid_reset: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function activatePremium() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Не авторизован" }
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      has_premium_addon: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function addSubscription(months: number) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Не авторизован" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_expiry, role")
    .eq("id", user.id)
    .single()

  if (!profile) {
    return { error: "Профиль не найден" }
  }

  const now = new Date()
  const currentExpiry = profile.subscription_expiry ? new Date(profile.subscription_expiry) : now
  const baseDate = currentExpiry > now ? currentExpiry : now
  const newExpiry = new Date(baseDate)
  newExpiry.setMonth(newExpiry.getMonth() + months)

  const newRole = profile.role === "Free" ? "User" : profile.role

  const { error } = await supabase
    .from("profiles")
    .update({
      subscription_expiry: newExpiry.toISOString(),
      role: newRole,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}
