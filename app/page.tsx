"use client"

import { useState, useEffect, useCallback } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/pages/Hero"
import { Store } from "@/components/pages/Store"
import { Dashboard } from "@/components/pages/Dashboard"
import { Terms } from "@/components/pages/Terms"
import { Checkout } from "@/components/pages/Checkout"
import { AuthModal } from "@/components/auth/AuthModal"
import { createClient } from "@/lib/supabase/client"
import type { User, ViewState, Product } from "@/types"
import { getUser } from "@/app/actions/auth"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [currentView, setCurrentView] = useState<ViewState>("HOME")
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [initLoading, setInitLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const loadUser = useCallback(async () => {
    const userData = await getUser()
    setUser(userData)
    return userData
  }, [])

  useEffect(() => {
    const init = async () => {
      await loadUser()
      setInitLoading(false)
    }
    init()

    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        await loadUser()
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setCurrentView("HOME")
      }
    })

    return () => subscription.unsubscribe()
  }, [loadUser])

  const handleLoginSuccess = async () => {
    await loadUser()
    setIsAuthOpen(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setCurrentView("HOME")
  }

  const handlePurchase = (product: Product) => {
    if (!user) {
      setIsAuthOpen(true)
      return
    }
    setSelectedProduct(product)
    setCurrentView("CHECKOUT")
  }

  const handleCheckoutComplete = async () => {
    await loadUser()
    setSelectedProduct(null)
    setCurrentView("DASHBOARD")
  }

  if (initLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent pointer-events-none" />
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="w-12 h-12 border-3 border-violet-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-500 text-sm font-medium uppercase tracking-widest">Загрузка</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar
        user={user}
        currentView={currentView}
        onNavigate={setCurrentView}
        onLoginClick={() => setIsAuthOpen(true)}
        onLogoutClick={handleLogout}
      />

      <main className="relative z-10">
        {currentView === "HOME" && <Hero onBuyClick={() => setCurrentView("STORE")} />}
        {currentView === "STORE" && <Store onPurchase={handlePurchase} user={user} />}
        {currentView === "TERMS" && <Terms />}
        {currentView === "CHECKOUT" && selectedProduct && (
          <Checkout
            product={selectedProduct}
            onBack={() => setCurrentView("STORE")}
            onComplete={handleCheckoutComplete}
          />
        )}
        {currentView === "DASHBOARD" && user && (
          <Dashboard user={user} onUpdateUser={setUser} onNavigate={setCurrentView} />
        )}
        {currentView === "DASHBOARD" && !user && (
          <div className="min-h-screen flex items-center justify-center flex-col gap-4 pt-16">
            <h2 className="text-2xl font-bold">Доступ запрещен</h2>
            <p className="text-gray-500 text-sm">Войдите в аккаунт для доступа к личному кабинету</p>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="text-violet-400 hover:text-white text-sm transition-colors"
            >
              Войти в аккаунт
            </button>
          </div>
        )}
      </main>

      <Footer />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </div>
  )
}
