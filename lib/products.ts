import type { Product } from "@/types"

export const PRODUCTS: Product[] = [
  {
    id: "sub_1m",
    name: "1 Месяц",
    description: "Подписка Nexgen Client на 1 месяц",
    priceInCents: 5900,
    durationMonths: 1,
    features: ["Полный доступ к читу", "Cloud Configs", "Поддержка 24/7"],
    recommended: false,
  },
  {
    id: "sub_3m",
    name: "3 Месяца",
    description: "Подписка Nexgen Client на 3 месяца",
    priceInCents: 16900,
    durationMonths: 3,
    savePercent: 5,
    features: ["Экономия 5%", "Приоритет в очереди", "Все функции 1 месяца"],
    recommended: true,
  },
  {
    id: "sub_6m",
    name: "6 Месяцев",
    description: "Подписка Nexgen Client на 6 месяцев",
    priceInCents: 31900,
    durationMonths: 6,
    savePercent: 10,
    features: ["Экономия 10%", "Early Access к бетам", "Все функции 3 месяцев"],
    recommended: false,
  },
  {
    id: "sub_12m",
    name: "12 Месяцев",
    description: "Подписка Nexgen Client на 12 месяцев",
    priceInCents: 59900,
    durationMonths: 12,
    savePercent: 15,
    features: ["Экономия 15%", "Уникальная роль Discord", "Личный менеджер"],
    recommended: false,
  },
  {
    id: "sub_24m",
    name: "24 Месяца",
    description: "Подписка Nexgen Client на 24 месяца",
    priceInCents: 99900,
    durationMonths: 24,
    savePercent: 30,
    features: ["Максимальная выгода", "Легендарный статус", "Вечный слот"],
    recommended: false,
  },
  {
    id: "addon_premium",
    name: "Premium Addon",
    description: "Премиум дополнение к подписке",
    priceInCents: 8000,
    durationMonths: 0,
    features: ["Золотой ник в табе", "Кастомный плащ", "Доступ к приватным конфигам"],
    isPremium: true,
  },
  {
    id: "service_hwid",
    name: "Сброс HWID",
    description: "Сброс привязки оборудования",
    priceInCents: 2900,
    durationMonths: 0,
    features: ["Моментальный сброс", "Автоматическая обработка"],
    isHwidReset: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getSubscriptionProducts(): Product[] {
  return PRODUCTS.filter((p) => !p.isPremium && !p.isHwidReset)
}
