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
        "fixed bottom-[7.5rem] left-1/2 -translate-x-1/2 z-40",
        "h-9 px-4 rounded-full",
        "flex items-center justify-center gap-2",
        "transition-all duration-300 ease-out",
        "shadow-lg active:scale-95",
        isDark 
          ? "bg-secondary/90 backdrop-blur-md border border-border/50 hover:bg-secondary" 
          : "bg-white/90 backdrop-blur-md border border-gray-200/50 hover:bg-white shadow-gray-200/50"
      )}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <div className={cn(
        "flex items-center gap-2 text-xs font-medium transition-colors",
        isDark ? "text-muted-foreground" : "text-gray-600"
      )}>
        {isDark ? (
          <>
            <Moon className="w-4 h-4" />
            <span>Oscuro</span>
          </>
        ) : (
          <>
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Claro</span>
          </>
        )}
      </div>
    </button>
  )
}
