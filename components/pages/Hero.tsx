"use client"

import {
  ChevronRight,
  SparklesIcon,
  Shield,
  Zap,
  Cloud,
  Cpu,
  Lock,
  Eye,
  UsersIcon,
  ClockIcon,
  CheckCircle2Icon,
} from "lucide-react"
import { PlatformIcon, FeatureCard, FAQItem } from "./utils"

interface HeroProps {
  onBuyClick: () => void
}

export const Hero = ({ onBuyClick }: HeroProps) => {
  const features = [
    {
      icon: <Shield size={18} className="text-violet-400" />,
      title: "Обход античитов",
      desc: "Передовая система обхода всех современных античитов включая Vulcan, Matrix, Spartan, Grim и Polar",
    },
    {
      icon: <Zap size={18} className="text-amber-400" />,
      title: "Sodium оптимизация",
      desc: "Интеграция с Sodium для максимальной производительности и стабильного FPS",
    },
    {
      icon: <Cloud size={18} className="text-sky-400" />,
      title: "Облачные конфиги",
      desc: "Синхронизация настроек между устройствами с доступом к 500+ готовым конфигам от про-игроков",
    },
    {
      icon: <Cpu size={18} className="text-emerald-400" />,
      title: "Интеллектуальный анализ",
      desc: "Встроенная система анализирует игровые ситуации и подсказывает оптимальные настройки в реальном времени",
    },
    {
      icon: <Lock size={18} className="text-rose-400" />,
      title: "Полная гибкость",
      desc: "Настройка каждого модуля под себя: цвета, горячие клавиши, режимы работы и профили для разных серверов",
    },
    {
      icon: <Eye size={18} className="text-orange-400" />,
      title: "Максимальная проработка",
      desc: "Каждая функция тщательно протестирована и оптимизирована для идеальной работы без багов и вылетов",
    },
  ]

  const faqs = [
    {
      q: "Как происходит активация после покупки?",
      a: "После оплаты вы получаете доступ к личному кабинету, где можете скачать лоадер. Активация автоматическая по HWID вашего ПК - просто запустите лоадер и войдите в аккаунт.",
    },
    {
      q: "Какие версии Minecraft поддерживаются?",
      a: "На данный момент мы поддерживаем версию 1.21.4. Клиент оптимизирован именно под эту версию для максимальной стабильности и производительности.",
    },
    {
      q: "Безопасно ли использовать на серверах с античитом?",
      a: "Да, наша система обхода работает со всеми популярными античитами включая Vulcan, Matrix, Spartan, Grim, Polar и другие. Мы обновляем обход в течение 24 часов после апдейтов.",
    },
    {
      q: "Можно ли сбросить HWID при смене компьютера?",
      a: "Да, владельцы Premium подписки могут сбрасывать HWID 1 раз в 30 дней через личный кабинет. При необходимости более частого сброса обратитесь в поддержку.",
    },
    {
      q: "Есть ли тестовый период?",
      a: "Мы не предоставляем тестовый период, но гарантируем возврат средств в течение 24 часов, если софт не соответствует заявленным характеристикам.",
    },
    {
      q: "Как часто выходят обновления?",
      a: "Обновления выходят еженедельно с новыми функциями и улучшениями. Критические фиксы и обходы античитов выпускаются в течение 24 часов.",
    },
  ]

  const stats = [
    { value: "99.9%", label: "Uptime серверов" },
    { value: "24/7", label: "Техническая поддержка" },
    { value: "2 года", label: "На рынке" },
  ]

  return (
    <div className="relative min-h-screen pt-16 flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-[100px] left-[20%] w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-[200px] right-[15%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px]" />
      </div>

      <main className="flex-grow container mx-auto px-4 relative z-10">
        <section className="flex flex-col items-center justify-center text-center py-20 min-h-[90vh]">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-gray-400">
              Stable v1.0 <span className="text-gray-600 mx-1.5">•</span> Minecraft 1.21.4
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white">NEXGEN</h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 mb-8">
            DOMINATE THE GAME
          </p>

          <p className="max-w-xl text-base md:text-lg text-gray-400 mb-12 leading-relaxed">
            Приватный софт нового поколения с <span className="text-white">Sodium оптимизацией</span>, облачными
            конфигами и <span className="text-white">обходом всех античитов</span>.
          </p>

          <button
            onClick={onBuyClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl overflow-hidden transition-all shadow-lg shadow-violet-600/30 hover:shadow-violet-500/40 hover:scale-105 transform duration-200"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <div className="relative flex items-center justify-center gap-3">
              <SparklesIcon size={18} className="text-white" />
              <span className="text-base font-semibold text-white">Приобрести доступ</span>
              <ChevronRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <div className="w-full max-w-4xl mt-24">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-20" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-widest">Платформы</span>
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-20" />
            </div>

            <div className="flex flex-wrap justify-center gap-16">
              <PlatformIcon name="Windows" color="#0078D6">
                <svg viewBox="0 0 88 88" className="w-10 h-10 fill-current">
                  <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203L0 12.402zm35.67 33.529l.028 34.453L.028 75.48.025 46.14l35.645-.21zM87.838 5.162l-48.53 6.635.016 34.09 48.552-.285V5.162zm-.037 80.082l-48.56-6.697-.03-34.195 48.56.294.03 40.598z" />
                </svg>
              </PlatformIcon>
              <PlatformIcon name="macOS" color="#ffffff">
                <svg viewBox="0 0 384 512" className="w-8 h-8 fill-current">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
                </svg>
              </PlatformIcon>
              <PlatformIcon name="Linux" color="#FCC624">
                <svg viewBox="0 0 448 512" className="w-9 h-9 fill-current">
                  <path d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9.6 7.9 1.2 11.8 1.2 8.1 2.5 15.7.8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1.6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3.4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4.7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3z" />
                </svg>
              </PlatformIcon>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="grid grid-cols-3 gap-6 mb-20">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-300 group">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-20" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-widest">Возможности</span>
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-20" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FeatureCard key={i} icon={f.icon} title={f.title} desc={f.desc} />
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-20" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-widest">Как это работает</span>
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-20" />
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: <UsersIcon size={20} />,
                title: "Регистрация",
                desc: "Создайте аккаунт за 30 секунд",
              },
              { step: "02", icon: <SparklesIcon size={20} />, title: "Покупка", desc: "Выберите подходящий тариф" },
              { step: "03", icon: <ClockIcon size={20} />, title: "Скачивание", desc: "Загрузите лоадер из кабинета" },
              { step: "04", icon: <CheckCircle2Icon size={20} />, title: "Игра", desc: "Запустите и доминируйте" },
            ].map((item, i) => (
              <div key={i} className="relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 text-center group hover:border-violet-500/30 transition-all duration-300 backdrop-blur-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full text-xs font-bold shadow-lg shadow-violet-600/30">
                  {item.step}
                </div>
                <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 flex items-center justify-center mb-4 mt-2 text-violet-400 group-hover:scale-110 group-hover:bg-violet-500/10 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-20" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-widest">Вопросы и ответы</span>
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-20" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
