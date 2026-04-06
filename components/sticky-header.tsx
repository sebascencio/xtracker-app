"use client"

import { Gamepad2, Moon, Sun } from 'lucide-react'
import { CurrencySelector } from '@/components/currency-selector'
import type { Currency } from '@/lib/types'

interface StickyHeaderProps {
  currency: Currency
  onCurrencyChange: (currency: Currency) => void
  isDark: boolean
  onThemeToggle: () => void
}

export function StickyHeader({ currency, onCurrencyChange, isDark, onThemeToggle }: StickyHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 safe-area-top">
      <div className="glass border-b border-border/30">
        <div className="max-w-lg mx-auto px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
                <Gamepad2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground tracking-tight">XPrice</h1>
                <p className="text-[10px] text-muted-foreground font-medium">Rastreador de precios Xbox</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onThemeToggle}
                className="w-9 h-9 rounded-xl bg-secondary/80 flex items-center justify-center transition-all active:scale-95"
                aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {isDark ? (
                  <Moon className="w-4 h-4 text-foreground" />
                ) : (
                  <Sun className="w-4 h-4 text-foreground" />
                )}
              </button>
              <CurrencySelector 
                selectedCurrency={currency}
                onCurrencyChange={onCurrencyChange}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
