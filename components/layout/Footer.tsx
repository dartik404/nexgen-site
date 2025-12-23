import { Twitter, Youtube, MessageCircle } from "lucide-react"
import { Logo } from "@/components/ui/Logo"

export const Footer = () => {
  return (
    <footer className="bg-[#030303] border-t border-white/5 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Logo className="w-5 h-5" />
              <span className="font-semibold text-white">Nexgen Client</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              Приватный утилити клиент для Minecraft с технологиями оптимизации Sodium.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Навигация</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Скачать
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Магазин
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Помощь
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Информация</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Соглашение
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Конфиденциальность
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-700 text-xs">© 2025 Nexgen Client. Not affiliated with Mojang Studios.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-white transition-colors">
              <Twitter size={16} />
            </a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors">
              <Youtube size={16} />
            </a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
