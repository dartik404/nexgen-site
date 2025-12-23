"use client"

import { Check, Zap, RefreshCw, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { type Product, type User, UserRole } from "@/types"
import { getSubscriptionProducts, PRODUCTS } from "@/lib/products"

interface StoreProps {
  onPurchase: (product: Product) => void
  user: User | null
}

export const Store = ({ onPurchase, user }: StoreProps) => {
  const subscriptions = getSubscriptionProducts()
  const premiumProduct = PRODUCTS.find((p) => p.isPremium)!
  const hwidProduct = PRODUCTS.find((p) => p.isHwidReset)!

  const getHwidPrice = () => {
    if (!user?.lastHwidReset) return 29
    const diffDays = Math.ceil(
      Math.abs(new Date().getTime() - new Date(user.lastHwidReset).getTime()) / (1000 * 3600 * 24),
    )
    return diffDays < 7 ? 59 : 29
  }

  const canBuyPremium =
    user &&
    user.role !== UserRole.FREE &&
    user.subscriptionExpiry &&
    new Date(user.subscriptionExpiry) > new Date() &&
    !user.hasPremiumAddon

  return (
    <div className="min-h-screen pt-28 pb-20 container mx-auto px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 to-transparent pointer-events-none" />
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Выберите план</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Получите доступ к лучшим функциям Nexgen и начните доминировать
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-6xl mx-auto mb-16 relative z-10">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className={`relative rounded-2xl p-5 flex flex-col transition-all duration-300 backdrop-blur-sm hover:scale-105 transform
            ${
              sub.recommended
                ? "bg-gradient-to-br from-violet-600/15 to-indigo-600/10 border-2 border-violet-500/50 shadow-lg shadow-violet-600/20"
                : "bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-violet-500/30"
            }`}
          >
            {sub.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-violet-600/30">
                Популярный
              </div>
            )}
            {sub.savePercent && (
              <div className="absolute top-3 right-3 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                -{sub.savePercent}%
              </div>
            )}

            <h3 className="text-base font-semibold text-white mb-1">{sub.name}</h3>
            <div className="flex items-baseline gap-1 mb-5">
              <span className="text-2xl font-bold text-white">{(sub.priceInCents / 100).toFixed(0)}</span>
              <span className="text-gray-500 text-sm">₽</span>
            </div>

            <div className="space-y-2.5 mb-6 flex-grow">
              {sub.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <Check
                    size={14}
                    className={`mt-0.5 shrink-0 ${sub.recommended ? "text-violet-400" : "text-gray-600"}`}
                  />
                  <span className="text-xs text-gray-400 leading-tight">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => onPurchase(sub)}
              variant={sub.recommended ? "primary" : "outline"}
              className="w-full text-sm !py-2.5"
            >
              Купить
            </Button>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold text-center mb-6 text-white relative z-10">Дополнительно</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl p-6 border border-amber-500/30 relative overflow-hidden backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Zap size={20} fill="currentColor" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{(premiumProduct.priceInCents / 100).toFixed(0)}₽</div>
                <div className="text-xs text-amber-500/80">разово</div>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Premium Addon</h4>
            <p className="text-gray-500 text-sm mb-5 leading-relaxed">
              Золотой ник, плащ и приватные конфиги. Требуется активная подписка.
            </p>
            <Button
              onClick={() => onPurchase(premiumProduct)}
              disabled={!canBuyPremium}
              className={`w-full ${canBuyPremium ? "!bg-amber-600 hover:!bg-amber-500 !border-amber-500/50" : ""}`}
            >
              {!user
                ? "Войдите для покупки"
                : user.hasPremiumAddon
                  ? "Уже активирован"
                  : !canBuyPremium
                    ? "Нужна подписка"
                    : "Купить Premium"}
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl p-6 border border-blue-500/30 relative overflow-hidden backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <RefreshCw size={20} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{getHwidPrice()}₽</div>
                <div className="text-xs text-blue-500/80">за сброс</div>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Сброс HWID</h4>
            <p className="text-gray-500 text-sm mb-5 leading-relaxed">
              Сбросьте привязку оборудования. Чаще раза в неделю — 59₽.
            </p>
            <Button
              variant="outline"
              onClick={() => onPurchase({ ...hwidProduct, priceInCents: getHwidPrice() * 100 })}
              className="w-full hover:!bg-blue-500/10 hover:!border-blue-500/50"
            >
              Сбросить HWID
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center relative z-10">
        <div className="flex items-center gap-2 text-gray-600 text-xs bg-white/[0.02] px-4 py-2 rounded-lg border border-white/5 backdrop-blur-sm">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Безопасные платежи через Stripe</span>
        </div>
      </div>
    </div>
  )
}
