"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface PlatformIconProps {
  name: string
  color: string
  children: React.ReactNode
}

export const PlatformIcon = ({ name, color, children }: PlatformIconProps) => (
  <div className="flex flex-col items-center gap-3 group cursor-default">
    <div
      className="w-14 h-14 flex items-center justify-center text-gray-500 transition-all duration-300 group-hover:scale-110"
      style={{ ["--hover-color" as string]: color }}
    >
      <div className="group-hover:text-[var(--hover-color)] transition-colors">{children}</div>
    </div>
    <span className="text-xs font-medium text-gray-600 group-hover:text-gray-300 transition-colors">{name}</span>
  </div>
)

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  desc: string
}

export const FeatureCard = ({ icon, title, desc }: FeatureCardProps) => (
  <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300 text-left group backdrop-blur-sm">
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-violet-500/10 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-base font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
)

interface FAQItemProps {
  q: string
  a: string
}

export const FAQItem = ({ q, a }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-white/5 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] overflow-hidden backdrop-blur-sm hover:border-violet-500/20 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.03] transition-colors"
      >
        <span className="font-medium text-gray-300 text-sm pr-4">{q}</span>
        {isOpen ? (
          <ChevronUp size={16} className="text-violet-400 shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-gray-500 shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{a}</div>
      </div>
    </div>
  )
}
