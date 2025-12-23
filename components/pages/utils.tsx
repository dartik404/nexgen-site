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
  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 text-left group">
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
      {icon}
    </div>
    <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
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
    <div className="border border-white/5 rounded-xl bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-medium text-gray-300 text-sm">{q}</span>
        {isOpen ? (
          <ChevronUp size={14} className="text-gray-500" />
        ) : (
          <ChevronDown size={14} className="text-gray-500" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{a}</div>
      </div>
    </div>
  )
}
