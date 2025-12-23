"use client"

import { useCallback, useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import type { Product } from "@/types"
import { createCheckoutSession } from "@/app/actions/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutProps {
  product: Product
  onBack: () => void
  onComplete: () => void
}

export const Checkout = ({ product, onBack, onComplete }: CheckoutProps) => {
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState("")

  const fetchClientSecret = useCallback(async () => {
    try {
      const clientSecret = await createCheckoutSession(product.id)
      return clientSecret
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }, [product.id])

  const handleComplete = async () => {
    setIsComplete(true)
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Оплата успешна!</h2>
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <Loader2 size={14} className="animate-spin" />
            Перенаправление...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-28 pb-20 container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Ошибка</h2>
          <p className="text-gray-500 mb-6 text-sm">{error}</p>
          <Button onClick={onBack} variant="outline">
            Назад в магазин
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-20 container mx-auto px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-white mb-6 text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Назад
        </button>

        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-white mb-0.5">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
            <p className="text-2xl font-bold text-white">{(product.priceInCents / 100).toFixed(0)}₽</p>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{
              fetchClientSecret,
              onComplete: handleComplete,
            }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  )
}
