"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Mail, Lock, UserIcon, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: () => void
}

export const AuthModal = ({ isOpen, onClose, onLoginSuccess }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    const supabase = createClient()

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
        if (error) throw error
        onLoginSuccess()
        onClose()
      } else {
        if (formData.username.length < 3) {
          throw new Error("Никнейм должен быть не менее 3 символов")
        }
        if (formData.password.length < 6) {
          throw new Error("Пароль должен быть не менее 6 символов")
        }

        const { data: existingUser } = await supabase
          .from("profiles")
          .select("username")
          .eq("username", formData.username)
          .single()

        if (existingUser) {
          throw new Error("Никнейм уже занят")
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
            data: {
              username: formData.username,
            },
          },
        })
        if (error) throw error
        setSuccess("Проверьте почту для подтверждения регистрации")
      }
    } catch (err: any) {
      const message = err.message || "Произошла ошибка"
      if (message.includes("Invalid login")) {
        setError("Неверный email или пароль")
      } else if (message.includes("already registered")) {
        setError("Этот email уже зарегистрирован")
      } else {
        setError(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setError("")
    setSuccess("")
    setFormData({ username: "", email: "", password: "" })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all z-10"
        >
          <X size={18} />
        </button>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-1">{isLogin ? "Вход в аккаунт" : "Создание аккаунта"}</h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? "Войдите чтобы получить доступ к клиенту" : "Заполните форму для регистрации"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Никнейм</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Введите никнейм"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    className="w-full bg-[#111] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:border-violet-500 focus:outline-none transition-colors"
                  />
                  <UserIcon className="absolute left-4 top-3.5 text-gray-600" size={18} />
                </div>
                <p className="text-[11px] text-gray-600 mt-1.5">Будет отображаться в клиенте</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-[#111] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:border-violet-500 focus:outline-none transition-colors"
                />
                <Mail className="absolute left-4 top-3.5 text-gray-600" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Пароль</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Минимум 6 символов"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full bg-[#111] border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white placeholder-gray-600 focus:border-violet-500 focus:outline-none transition-colors"
                />
                <Lock className="absolute left-4 top-3.5 text-gray-600" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm text-center">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? "Войти" : "Создать аккаунт"}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <button onClick={switchMode} className="text-gray-500 hover:text-white text-sm transition-colors">
              {isLogin ? (
                <>
                  Нет аккаунта? <span className="text-violet-400">Зарегистрироваться</span>
                </>
              ) : (
                <>
                  Уже есть аккаунт? <span className="text-violet-400">Войти</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
