"use client"

import { useState } from 'react'
import { Tag, Filter, ArrowUpDown } from 'lucide-react'
import { GameCard } from '@/components/game-card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Game } from '@/lib/types'

interface DealsSectionProps {
  games: Game[]
  onToggleFavorite: (id: string) => void
  onGameClick: (game: Game) => void
}

type SortOption = 'discount' | 'price_low' | 'price_high' | 'name'
type FilterCategory = 'all' | 'RPG' | 'Shooter' | 'Racing' | 'Adventure' | 'Simulation' | 'Strategy'

export function DealsSection({ games, onToggleFavorite, onGameClick }: DealsSectionProps) {
  const [sortBy, setSortBy] = useState<SortOption>('discount')
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all')

  const categories: FilterCategory[] = ['all', 'RPG', 'Shooter', 'Racing', 'Adventure', 'Simulation', 'Strategy']

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
    <div className="pb-24">
      {/* Header */}
      <header className="px-5 pt-4 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Tag className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Ofertas</h1>
        </div>
        <p className="text-sm text-muted-foreground">{filteredGames.length} juegos en oferta</p>
      </header>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-4 hide-scrollbar">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              filterCategory === category 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category === 'all' ? 'Todos' : category}
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex gap-2 px-5 mb-4 overflow-x-auto hide-scrollbar">
        <Button
          variant={sortBy === 'discount' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('discount')}
          className="rounded-full text-xs h-8"
        >
          Mayor descuento
        </Button>
        <Button
          variant={sortBy === 'price_low' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('price_low')}
          className="rounded-full text-xs h-8"
        >
          Menor precio
        </Button>
        <Button
          variant={sortBy === 'price_high' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('price_high')}
          className="rounded-full text-xs h-8"
        >
          Mayor precio
        </Button>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-2 gap-3 px-5">
        {filteredGames.map(game => (
          <GameCard 
            key={game.id} 
            game={game}
            onToggleFavorite={onToggleFavorite}
            onClick={onGameClick}
          />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-5">
          <Tag className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            No hay ofertas en esta categoría
          </p>
        </div>
      )}
    </div>
  )
}
