"use client"

import { ChevronRight, Flame, TrendingDown, Sparkles, Gamepad2 } from 'lucide-react'
import { GameCard } from '@/components/game-card'
import { CurrencySelector } from '@/components/currency-selector'
import type { Game, Currency } from '@/lib/types'

interface HomeSectionProps {
  games: Game[]
  currency: Currency
  onCurrencyChange: (currency: Currency) => void
  onToggleFavorite: (id: string) => void
  onGameClick: (game: Game) => void
}

export function HomeSection({ games, currency, onCurrencyChange, onToggleFavorite, onGameClick }: HomeSectionProps) {
  const featuredGames = games.filter(g => g.discount >= 50).slice(0, 5)
  const lowestEverGames = games.filter(g => g.currentPrice <= g.lowestPrice).slice(0, 4)
  const newDeals = games.filter(g => g.discount > 0).slice(0, 6)

  return (
    <div className="pb-28">
      {/* Header */}
      <header className="px-5 pt-6 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
              <Gamepad2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">XPrice</h1>
              <p className="text-xs text-muted-foreground font-medium">Rastreador de precios Xbox</p>
            </div>
          </div>
          <CurrencySelector 
            selectedCurrency={currency}
            onCurrencyChange={onCurrencyChange}
          />
        </div>
      </header>

      {/* Stats Bar */}
      <div className="mx-5 mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Ofertas activas</p>
            <p className="text-2xl font-bold text-foreground">{games.filter(g => g.discount > 0).length}</p>
          </div>
          <div className="h-10 w-px bg-border/50" />
          <div>
            <p className="text-xs text-muted-foreground font-medium">Minimo historico</p>
            <p className="text-2xl font-bold text-primary">{lowestEverGames.length}</p>
          </div>
          <div className="h-10 w-px bg-border/50" />
          <div>
            <p className="text-xs text-muted-foreground font-medium">En tu lista</p>
            <p className="text-2xl font-bold text-foreground">{games.filter(g => g.isFavorite).length}</p>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between px-5 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center">
              <Flame className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground tracking-tight">Ofertas destacadas</h2>
          </div>
          <button className="flex items-center text-sm text-primary font-semibold hover:text-primary/80 transition-colors">
            Ver mas
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-2 hide-scrollbar">
          {featuredGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              currency={currency}
              variant="featured"
              onToggleFavorite={onToggleFavorite}
              onClick={onGameClick}
            />
          ))}
        </div>
      </section>

      {/* Lowest Ever Section */}
      {lowestEverGames.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between px-5 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground tracking-tight">Precio minimo historico</h2>
            </div>
          </div>
          <div className="px-5 space-y-2">
            {lowestEverGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game}
                currency={currency}
                variant="compact"
                onToggleFavorite={onToggleFavorite}
                onClick={onGameClick}
              />
            ))}
          </div>
        </section>
      )}

      {/* New Deals Grid */}
      <section>
        <div className="flex items-center justify-between px-5 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground tracking-tight">Nuevas ofertas</h2>
          </div>
          <button className="flex items-center text-sm text-primary font-semibold hover:text-primary/80 transition-colors">
            Ver mas
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 px-5">
          {newDeals.map(game => (
            <GameCard 
              key={game.id} 
              game={game}
              currency={currency}
              onToggleFavorite={onToggleFavorite}
              onClick={onGameClick}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
