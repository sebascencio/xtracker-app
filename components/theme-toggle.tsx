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
        "fixed bottom-24 right-4 z-50",
        "w-11 h-11 rounded-full",
        "flex items-center justify-center",
        "transition-all duration-300 ease-out",
        "shadow-lg active:scale-90",
        isDark 
          ? "bg-secondary/80 backdrop-blur-sm border border-border/50 hover:bg-secondary" 
          : "bg-amber-100/90 backdrop-blur-sm border border-amber-200/50 hover:bg-amber-100"
      )}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDark ? (
        <Moon className="w-5 h-5 text-muted-foreground transition-transform duration-300" />
      ) : (
        <Sun className="w-5 h-5 text-amber-600 transition-transform duration-300" />
      )}
    </button>
  )
}
