"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function signUp(username: string, email: string, password: string) {
  const supabase = await createClient()

  const { data: existingUser } = await supabase.from("profiles").select("username").eq("username", username).single()

  if (existingUser) {
    return { error: "Никнейм уже занят" }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || typeof window !== "undefined"
          ? window.location.origin
          : "",
      data: {
        username,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  return { data }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
}

export async function getUser() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) return null

  return {
    id: profile.id,
    uid: profile.uid,
    username: profile.username,
    email: profile.email,
    role: profile.role,
    avatarUrl:
      profile.avatar_url || `https://api.dicebear.com/9.x/shapes/svg?seed=${profile.username}&backgroundColor=0a0a0a`,
    bannerUrl:
      profile.banner_url ||
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    subscriptionExpiry: profile.subscription_expiry,
    hasPremiumAddon: profile.has_premium_addon,
    hwid: profile.hwid,
    hwidResetsCount: profile.hwid_resets_count,
    lastHwidReset: profile.last_hwid_reset,
    registrationDate: profile.registration_date,
  }
}
