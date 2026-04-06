"use client"

import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "fixed bottom-[6.5rem] right-5 z-40",
        "w-10 h-10 rounded-full",
        "flex items-center justify-center",
        "transition-all duration-300 ease-out",
        "shadow-lg active:scale-95",
        isDark 
          ? "bg-secondary/90 backdrop-blur-md border border-border/50 hover:bg-secondary" 
          : "bg-white/90 backdrop-blur-md border border-gray-200/50 hover:bg-white shadow-gray-200/50"
      )}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDark ? (
        <Moon className="w-5 h-5 text-muted-foreground" />
      ) : (
        <Sun className="w-5 h-5 text-amber-500" />
      )}
    </button>
  )
}
