"use client"

import { ChevronRight, Flame, TrendingDown, Sparkles } from 'lucide-react'
import { GameCard } from '@/components/game-card'
import type { Game } from '@/lib/types'

interface HomeSectionProps {
  games: Game[]
  onToggleFavorite: (id: string) => void
  onGameClick: (game: Game) => void
}

export function HomeSection({ games, onToggleFavorite, onGameClick }: HomeSectionProps) {
  const featuredGames = games.filter(g => g.discount >= 50).slice(0, 5)
  const lowestEverGames = games.filter(g => g.currentPrice <= g.lowestPrice).slice(0, 4)
  const newDeals = games.filter(g => g.discount > 0).slice(0, 6)

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="px-5 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-foreground">
              <path d="M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.643 2.941-3.477 3.398-4.763.385-1.082-.375-2.27-1.576-2.27H2.276c-1.201 0-1.961 1.188-1.576 2.27.457 1.286 1.521 3.12 3.402 4.763zM21.9 12c.536 0 1.062-.196 1.376-.64.313-.445.374-1.007.133-1.5C21.62 6.285 17.21 3.57 12 3.57c-5.21 0-9.62 2.715-11.409 6.29-.241.493-.18 1.055.133 1.5.314.444.84.64 1.376.64h19.8zM12 0c1.655 0 3 1.345 3 3s-1.345 3-3 3-3-1.345-3-3 1.345-3 3-3z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">XPrice</h1>
            <p className="text-xs text-muted-foreground">Rastreador de precios Xbox</p>
          </div>
        </div>
      </header>

      {/* Featured Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between px-5 mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Ofertas destacadas</h2>
          </div>
          <button className="flex items-center text-sm text-primary">
            Ver más
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 pb-2 hide-scrollbar">
          {featuredGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
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
              <TrendingDown className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Precio mínimo histórico</h2>
            </div>
          </div>
          <div className="px-5 space-y-2">
            {lowestEverGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
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
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Nuevas ofertas</h2>
          </div>
          <button className="flex items-center text-sm text-primary">
            Ver más
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 px-5">
          {newDeals.map(game => (
            <GameCard 
              key={game.id} 
              game={game}
              onToggleFavorite={onToggleFavorite}
              onClick={onGameClick}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
