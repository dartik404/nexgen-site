export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>

      <path d="M20 20 H 40 V 60 L 60 80 V 80 H 80 V 20 H 60 V 45 L 40 25 V 20 Z" fill="none" />

      <path
        d="M25 20 C 22.2 20 20 22.2 20 25 V 75 C 20 77.8 22.2 80 25 80 H 35 C 37.8 80 40 77.8 40 75 V 50 L 65 77 C 66 78.5 68 80 70 80 H 75 C 77.8 80 80 77.8 80 75 V 25 C 80 22.2 77.8 20 75 20 H 65 C 62.2 20 60 22.2 60 25 V 50 L 35 23 C 34 21.5 32 20 30 20 H 25 Z"
        fill="url(#metal)"
        filter="url(#shadow)"
      />
    </svg>
  )
}
