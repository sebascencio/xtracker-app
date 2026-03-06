"use client"

import { useState } from 'react'
import { ChevronDown, Check, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { currencies, Currency } from '@/lib/types'

interface CurrencySelectorProps {
  selectedCurrency: Currency
  onCurrencyChange: (currency: Currency) => void
}

const flagEmojis: Record<string, string> = {
  US: '\uD83C\uDDFA\uD83C\uDDF8',
  MX: '\uD83C\uDDF2\uD83C\uDDFD',
  EU: '\uD83C\uDDEA\uD83C\uDDFA',
  GB: '\uD83C\uDDEC\uD83C\uDDE7',
  AR: '\uD83C\uDDE6\uD83C\uDDF7',
  BR: '\uD83C\uDDE7\uD83C\uDDF7',
  CO: '\uD83C\uDDE8\uD83C\uDDF4',
  CL: '\uD83C\uDDE8\uD83C\uDDF1',
}

export function CurrencySelector({ selectedCurrency, onCurrencyChange }: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/60 hover:bg-secondary transition-colors"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{selectedCurrency.code}</span>
        <ChevronDown className={cn(
          "w-4 h-4 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-card border border-border shadow-2xl shadow-black/40 z-50 overflow-hidden">
            <div className="p-2">
              <p className="text-xs text-muted-foreground px-3 py-2 font-medium uppercase tracking-wider">
                Region de precios
              </p>
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => {
                    onCurrencyChange(currency)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left",
                    selectedCurrency.code === currency.code
                      ? "bg-primary/15 text-primary"
                      : "hover:bg-secondary/60 text-foreground"
                  )}
                >
                  <span className="text-lg">{flagEmojis[currency.flag]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{currency.name}</p>
                    <p className="text-xs text-muted-foreground">{currency.symbol} {currency.code}</p>
                  </div>
                  {selectedCurrency.code === currency.code && (
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
