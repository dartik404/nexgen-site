"use client"

import { useState } from "react"
import { type User, UserRole, type ViewState } from "@/types"
import { Button } from "@/components/ui/Button"
import { Save, Download, CreditCard, Shield, Zap, Lock, RefreshCw, Hash, Calendar, Cpu, Edit2, X } from "lucide-react"
import { updateProfile } from "@/app/actions/profile"
import { getUser } from "@/app/actions/auth"

interface DashboardProps {
  user: User
  onUpdateUser: (updatedUser: User | null) => void
  onNavigate: (view: ViewState) => void
}

export const Dashboard = ({ user, onUpdateUser, onNavigate }: DashboardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    avatarUrl: user.avatarUrl,
    bannerUrl: user.bannerUrl,
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      const { error } = await updateProfile({
        avatar_url: formData.avatarUrl,
        banner_url: formData.bannerUrl,
      })
      if (error) throw new Error(error)
      const updated = await getUser()
      onUpdateUser(updated)
      setIsEditing(false)
    } catch (error) {
      console.error(error)
      alert("Ошибка сохранения профиля")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (isoString?: string) => {
    if (!isoString) return "Не активна"
    const date = new Date(isoString)
    if (date < new Date()) return "Истекла"
    const diff = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
    return `${date.toLocaleDateString("ru-RU")} (${diff} дн.)`
  }

  const getHwidPrice = () => {
    if (!user.lastHwidReset) return 29
    const diffDays = Math.ceil(
      Math.abs(new Date().getTime() - new Date(user.lastHwidReset).getTime()) / (1000 * 3600 * 24),
    )
    return diffDays < 7 ? 59 : 29
  }

  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="relative h-48 md:h-56 w-full bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <img
          src={formData.bannerUrl || "/placeholder.svg?height=300&width=1200&query=dark abstract banner"}
          alt="Banner"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/50 to-transparent" />

        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#111] border border-white/10 rounded-xl p-4 w-full max-w-md mx-4">
              <label className="block text-xs text-gray-400 mb-2">URL баннера</label>
              <input
                type="text"
                placeholder="https://..."
                value={formData.bannerUrl}
                onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-6 items-end mb-8">
          <div className="relative">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl border-4 border-[#030303] overflow-hidden bg-[#0a0a0a] shadow-xl">
              <img
                src={formData.avatarUrl || "/placeholder.svg?height=128&width=128&query=avatar"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-2">
                  <input
                    type="text"
                    placeholder="URL аватара"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-1 text-[10px] text-center text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              )}
            </div>
            <div
              className={`absolute -bottom-2 -right-2 px-2.5 py-1 rounded-lg border-2 border-[#030303] flex items-center gap-1.5 text-xs font-bold ${
                user.role !== UserRole.FREE ? "bg-violet-600 text-white" : "bg-[#1a1a1a] text-gray-400"
              }`}
            >
              {user.role !== UserRole.FREE && <Zap size={10} fill="currentColor" />}
              {user.role}
            </div>
          </div>

          <div className="flex-grow w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">{user.username}</h1>
                  <Lock size={14} className="text-gray-600" />
                  {user.hasPremiumAddon && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] uppercase font-bold">
                      Premium
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="px-2.5 py-1 rounded-lg bg-white/5 text-gray-500 text-xs font-mono flex items-center gap-1.5">
                    <Hash size={10} />
                    UID: <span className="text-white">{user.uid}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-white/5 text-gray-500 text-xs flex items-center gap-1.5">
                    <Calendar size={10} />
                    {new Date(user.registrationDate).toLocaleDateString("ru-RU")}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="!px-4 !py-2 text-sm">
                      <X size={14} className="mr-1.5" /> Отмена
                    </Button>
                    <Button onClick={handleSave} isLoading={loading} className="!px-4 !py-2 text-sm">
                      <Save size={14} className="mr-1.5" /> Сохранить
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)} className="!px-4 !py-2 text-sm">
                    <Edit2 size={14} className="mr-1.5" /> Редактировать
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Статус подписки</p>
                <p className="text-xl font-semibold text-white">
                  {user.role === UserRole.FREE ? "Free License" : "Active"}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  user.role !== UserRole.FREE ? "bg-violet-500/10 text-violet-500" : "bg-white/5 text-gray-600"
                }`}
              >
                <CreditCard size={20} />
              </div>
            </div>

            {user.role !== UserRole.FREE ? (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-600 w-[85%]" />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Истекает: <span className="text-white">{formatDate(user.subscriptionExpiry)}</span>
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-4">Нет активной подписки. Функционал ограничен.</p>
                <Button onClick={() => onNavigate("STORE")} className="text-sm">
                  Перейти в магазин
                </Button>
              </div>
            )}
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white mb-4">
              <Download size={20} />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Загрузка</h3>
            <p className="text-xs text-gray-500 mb-4">v1.0.4 Stable</p>
            <Button variant="secondary" className="w-full mt-auto text-sm">
              Скачать
            </Button>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Cpu size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">HWID</h3>
                <p className="text-[10px] text-gray-600">Привязка оборудования</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-black/30 rounded-lg p-2.5">
                <p className="text-[9px] text-gray-600 uppercase mb-0.5">ID</p>
                <p className="text-[10px] font-mono text-gray-400 break-all">{user.hwid}</p>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Сбросов:</span>
                <span className="text-white">{user.hwidResetsCount}</span>
              </div>
            </div>

            <div className="text-center mb-3">
              <span className="text-[10px] text-gray-600">
                Стоимость: <span className="text-white">{getHwidPrice()}₽</span>
              </span>
            </div>

            <Button variant="outline" onClick={() => onNavigate("STORE")} className="w-full text-xs">
              <RefreshCw size={12} className="mr-1.5" /> Сбросить
            </Button>
          </div>

          <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center gap-4">
            <div className="hidden sm:flex w-12 h-12 rounded-xl bg-emerald-500/10 items-center justify-center text-emerald-500 shrink-0">
              <Shield size={24} />
            </div>
            <div className="flex-grow">
              <h3 className="text-base font-semibold text-white mb-0.5">Аккаунт защищен</h3>
              <p className="text-xs text-gray-500">Двухфакторная аутентификация через HWID активна</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
