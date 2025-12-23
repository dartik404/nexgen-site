"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Search, FileText, CreditCard, ShieldAlert, Database, Lock, Info } from "lucide-react"

interface TermSection {
  id: string
  title: string
  icon: React.ReactNode
  content: {
    subtitle?: string
    points: string[]
  }[]
}

const termsData: TermSection[] = [
  {
    id: "general",
    title: "Общие положения",
    icon: <FileText size={18} />,
    content: [
      {
        points: [
          "Используя ПО Nexgen Client, вы автоматически соглашаетесь с данными условиями.",
          "Незнание правил не освобождает от ответственности.",
          "Администрация имеет право изменять данные правила в любой момент без предварительного уведомления.",
          'ПО предоставляется по принципу "как есть" (as is). Разработчик не несет ответственности за любой ущерб, причиненный использованием ПО.',
        ],
      },
    ],
  },
  {
    id: "license",
    title: "Лицензия и Доступ",
    icon: <Lock size={18} />,
    content: [
      {
        subtitle: "Права доступа",
        points: [
          "Покупка предоставляет вам право доступа к ПО на срок действия подписки.",
          "Вы не приобретаете само ПО, а арендуете доступ к нему.",
          "Лицензия привязывается к вашему аппаратному обеспечению (HWID).",
          "Передача аккаунта третьим лицам строго запрещена и карается вечной блокировкой.",
        ],
      },
    ],
  },
  {
    id: "payments",
    title: "Оплата и Возврат",
    icon: <CreditCard size={18} />,
    content: [
      {
        points: [
          "Все покупки являются окончательными. Возврат средств за цифровой товар надлежащего качества не производится.",
          "В случае технической ошибки при оплате, обратитесь в поддержку с чеком.",
          "Попытка принудительного возврата средств (chargeback) через банк приведет к блокировке всех ваших аккаунтов в системе.",
        ],
      },
    ],
  },
  {
    id: "prohibited",
    title: "Запрещенные действия",
    icon: <ShieldAlert size={18} />,
    content: [
      {
        points: [
          "Запрещен реверс-инжиниринг, декомпиляция, деобфускация и любой анализ кода клиента.",
          'Запрещено использование "крякнутых" версий или попытки обхода системы лицензирования.',
          "Запрещено распространение вредоносной информации о проекте.",
          "Запрещена продажа аккаунта Nexgen Client.",
        ],
      },
    ],
  },
  {
    id: "data",
    title: "Сбор данных",
    icon: <Database size={18} />,
    content: [
      {
        subtitle: "Политика конфиденциальности",
        points: [
          "Клиент собирает минимальный набор данных: HWID (для лицензии), IP (для безопасности), никнейм в игре.",
          "Мы не собираем пароли, данные банковских карт или личные файлы с вашего ПК.",
          "Данные используются исключительно для функционирования защиты и авторизации.",
        ],
      },
    ],
  },
]

export const Terms = () => {
  const [activeTab, setActiveTab] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSections = useMemo(() => {
    if (!searchQuery) return termsData
    return termsData.filter((section) => {
      const inTitle = section.title.toLowerCase().includes(searchQuery.toLowerCase())
      const inContent = section.content.some((c) =>
        c.points.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      return inTitle || inContent
    })
  }, [searchQuery])

  return (
    <div className="min-h-screen pt-28 pb-20 container mx-auto px-4 max-w-6xl">
      <div className="text-center mb-12 animate-enter">
        <h1 className="text-4xl font-bold mb-4">Правовая информация</h1>
        <p className="text-gray-400">Внимательно ознакомьтесь с условиями использования перед покупкой.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-enter [animation-delay:100ms]">
        <div className="md:col-span-4 lg:col-span-3 space-y-6">
          <div className="sticky top-24">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Поиск по правилам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-violet-500 focus:outline-none transition-colors"
              />
              <Search className="absolute left-3 top-3.5 text-gray-500" size={16} />
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-2 space-y-1">
              {termsData.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveTab(section.id)
                    setSearchQuery("")
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left
                  ${
                    activeTab === section.id && !searchQuery
                      ? "bg-violet-600/10 text-violet-400 border border-violet-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {section.icon}
                  {section.title}
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-violet-900/10 border border-violet-500/20 text-xs text-violet-300 flex gap-3 items-start">
              <Info className="shrink-0 mt-0.5" size={16} />
              <p>
                Последнее обновление правил:
                <br />
                <span className="font-bold text-white">25 Октября 2024</span>
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-9">
          <div className="space-y-6">
            {filteredSections.length > 0 ? (
              filteredSections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className={`bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 transition-all duration-300 ${activeTab === section.id || searchQuery ? "opacity-100" : "hidden"}`}
                >
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>

                  <div className="space-y-8">
                    {section.content.map((block, idx) => (
                      <div key={idx}>
                        {block.subtitle && <h3 className="text-lg font-semibold text-white mb-3">{block.subtitle}</h3>}
                        <ul className="space-y-3">
                          {block.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0 opacity-50" />
                              {searchQuery ? (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: point.replace(
                                      new RegExp(`(${searchQuery})`, "gi"),
                                      '<span class="text-white bg-violet-500/40 px-1 rounded">$1</span>',
                                    ),
                                  }}
                                />
                              ) : (
                                point
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                <Search className="mx-auto text-gray-600 mb-4" size={48} />
                <h3 className="text-xl font-bold text-white mb-2">Ничего не найдено</h3>
                <p className="text-gray-500">Попробуйте изменить запрос</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
