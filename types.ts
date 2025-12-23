export enum UserRole {
  FREE = "Free",
  USER = "User",
  PREMIUM = "Premium",
  ADMIN = "Admin",
}

export interface User {
  id: string
  uid: number
  username: string
  email: string
  role: UserRole
  avatarUrl: string
  bannerUrl: string
  subscriptionExpiry?: string
  hasPremiumAddon: boolean
  hwid: string
  hwidResetsCount: number
  lastHwidReset?: string
  registrationDate: string
}

export interface Profile {
  id: string
  uid: number
  username: string
  email: string
  role: string
  avatar_url: string
  banner_url: string
  subscription_expiry: string | null
  has_premium_addon: boolean
  hwid: string
  hwid_resets_count: number
  last_hwid_reset: string | null
  registration_date: string
}

export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  durationMonths: number
  savePercent?: number
  features: string[]
  isPremium?: boolean
  isHwidReset?: boolean
  recommended?: boolean
}

export interface Purchase {
  id: string
  user_id: string
  product_id: string
  product_name: string
  price_cents: number
  duration_months: number
  stripe_session_id: string | null
  stripe_payment_intent: string | null
  status: "pending" | "completed" | "failed" | "refunded"
  created_at: string
}

export type ViewState = "HOME" | "STORE" | "DASHBOARD" | "TERMS" | "CHECKOUT"
