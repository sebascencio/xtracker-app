"use client"

import { useState } from 'react'
import { Tag, Percent, ArrowDown, ArrowUp, Sparkles } from 'lucide-react'
import { GameCard } from '@/components/game-card'
import { cn } from '@/lib/utils'
import type { Game, Currency } from '@/lib/types'

interface DealsSectionProps {
  games: Game[]
  currency: Currency
  onToggleFavorite: (id: string) => void
  onGameClick: (game: Game) => void
}

type SortOption = 'discount' | 'price_low' | 'price_high' | 'name'
type FilterCategory = 'all' | 'RPG' | 'Shooter' | 'Racing' | 'Adventure' | 'Simulation' | 'Strategy' | 'Sports' | 'Horror' | 'Fighting'

export function DealsSection({ games, currency, onToggleFavorite, onGameClick }: DealsSectionProps) {
  const [sortBy, setSortBy] = useState<SortOption>('discount')
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all')

  const categories: FilterCategory[] = ['all', 'RPG', 'Shooter', 'Racing', 'Adventure', 'Sports', 'Horror', 'Fighting']

  const filteredGames = games
    .filter(g => g.discount > 0)
    .filter(g => filterCategory === 'all' || g.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return b.discount - a.discount
        case 'price_low':
          return a.currentPrice - b.currentPrice
        case 'price_high':
          return b.currentPrice - a.currentPrice
        case 'name':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  return (
    <div className="pt-20 pb-28">
      {/* Header */}
      <header className="px-5 pt-2 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
            <Tag className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Ofertas</h1>
            <p className="text-xs text-muted-foreground font-medium">{filteredGames.length} juegos en oferta</p>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-4 hide-scrollbar">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border",
              filterCategory === category 
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30" 
                : "bg-card text-secondary-foreground border-border/50 hover:border-primary/50"
            )}
          >
            {category === 'all' ? 'Todos' : category}
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex gap-2 px-5 mb-5 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setSortBy('discount')}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all",
            sortBy === 'discount'
              ? "bg-primary/15 text-primary border border-primary/30"
              : "bg-secondary/50 text-muted-foreground border border-transparent"
          )}
        >
          <Percent className="w-3.5 h-3.5" />
          Mayor descuento
        </button>
        <button
          onClick={() => setSortBy('price_low')}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all",
            sortBy === 'price_low'
              ? "bg-primary/15 text-primary border border-primary/30"
              : "bg-secondary/50 text-muted-foreground border border-transparent"
          )}
        >
          <ArrowDown className="w-3.5 h-3.5" />
          Menor precio
        </button>
        <button
          onClick={() => setSortBy('price_high')}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all",
            sortBy === 'price_high'
              ? "bg-primary/15 text-primary border border-primary/30"
              : "bg-secondary/50 text-muted-foreground border border-transparent"
          )}
        >
          <ArrowUp className="w-3.5 h-3.5" />
          Mayor precio
        </button>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-2 gap-3 px-5">
        {filteredGames.map(game => (
          <GameCard 
            key={game.id} 
            game={game}
            currency={currency}
            onToggleFavorite={onToggleFavorite}
            onClick={onGameClick}
          />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-5">
          <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-center font-medium">
            No hay ofertas en esta categoria
          </p>
        </div>
      )}
    </div>
  )
}
