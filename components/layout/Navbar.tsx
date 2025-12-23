"use client"

import { useState } from "react"
import { Menu, X, LogOut, LayoutDashboard, ChevronDown } from "lucide-react"
import type { User, ViewState } from "@/types"
import { Logo } from "@/components/ui/Logo"

interface NavbarProps {
  user: User | null
  currentView: ViewState
  onNavigate: (view: ViewState) => void
  onLoginClick: () => void
  onLogoutClick: () => void
}

export const Navbar = ({ user, currentView, onNavigate, onLoginClick, onLogoutClick }: NavbarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const navItems = [
    { label: "Главная", view: "HOME" as ViewState },
    { label: "Магазин", view: "STORE" as ViewState },
    { label: "Соглашение", view: "TERMS" as ViewState },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#030303]/90 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => onNavigate("HOME")}>
              <Logo className="w-8 h-8 transition-transform group-hover:scale-105" />
              <span className="text-base font-bold tracking-tight text-white group-hover:text-violet-300 transition-colors">
                NEXGEN
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.view)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200
                    ${currentView === item.view ? "text-white" : "text-gray-500 hover:text-white"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                >
                  <img
                    src={user.avatarUrl || "/placeholder.svg?height=32&width=32&query=avatar"}
                    alt="Avatar"
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-white leading-tight">{user.username}</span>
                    <span className="text-[10px] text-violet-400 font-medium leading-tight">{user.role}</span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                      <div className="p-1">
                        <button
                          onClick={() => {
                            onNavigate("DASHBOARD")
                            setIsDropdownOpen(false)
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <LayoutDashboard size={16} />
                          Личный кабинет
                        </button>
                        <button
                          onClick={() => {
                            onLogoutClick()
                            setIsDropdownOpen(false)
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <LogOut size={16} />
                          Выйти
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onLoginClick}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Войти
                </button>
                <button
                  onClick={onLoginClick}
                  className="px-5 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-all shadow-lg shadow-violet-600/20"
                >
                  Регистрация
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-gray-400 hover:text-white p-2"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/5">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.view)
                  setIsMobileOpen(false)
                }}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${
                    currentView === item.view
                      ? "text-white bg-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.label}
              </button>
            ))}

            {user ? (
              <>
                <div className="border-t border-white/5 my-2" />
                <button
                  onClick={() => {
                    onNavigate("DASHBOARD")
                    setIsMobileOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm"
                >
                  <LayoutDashboard size={18} />
                  Личный кабинет
                </button>
                <button
                  onClick={() => {
                    onLogoutClick()
                    setIsMobileOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg text-sm"
                >
                  <LogOut size={18} />
                  Выйти
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-white/5 my-2" />
                <button
                  onClick={() => {
                    onLoginClick()
                    setIsMobileOpen(false)
                  }}
                  className="w-full py-3 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
                >
                  Войти / Регистрация
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
