"use client"

import { useState, useMemo } from 'react'
import { Search, X, Clock, TrendingUp } from 'lucide-react'
import { GameCard } from '@/components/game-card'
import { cn } from '@/lib/utils'
import type { Game } from '@/lib/types'

interface SearchSectionProps {
  games: Game[]
  onToggleFavorite: (id: string) => void
  onGameClick: (game: Game) => void
}

const recentSearches = ['Starfield', 'Forza', 'Halo', 'Gears']
const trendingSearches = ['Fable', 'Elder Scrolls', 'Call of Duty', 'Diablo']

export function SearchSection({ games, onToggleFavorite, onGameClick }: SearchSectionProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const searchResults = useMemo(() => {
    if (!query.trim()) return []
    const lowerQuery = query.toLowerCase()
    return games.filter(g => 
      g.title.toLowerCase().includes(lowerQuery) ||
      g.category.toLowerCase().includes(lowerQuery) ||
      g.platform.toLowerCase().includes(lowerQuery)
    )
  }, [games, query])

  const hasQuery = query.trim().length > 0

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="px-5 pt-4 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Buscar</h1>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Buscar juegos, categorías..."
            className={cn(
              "w-full h-12 pl-12 pr-10 rounded-xl bg-input text-foreground placeholder:text-muted-foreground",
              "border border-border focus:border-primary focus:ring-1 focus:ring-primary",
              "transition-all duration-200 outline-none"
            )}
          />
          {hasQuery && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
          )}
        </div>
      </header>

      {hasQuery ? (
        // Search Results
        <div className="px-5">
          <p className="text-sm text-muted-foreground mb-4">
            {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} para "{query}"
          </p>
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  variant="compact"
                  onToggleFavorite={onToggleFavorite}
                  onClick={onGameClick}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <Search className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No se encontraron resultados
              </p>
            </div>
          )}
        </div>
      ) : (
        // Empty State - Show suggestions
        <div className="px-5">
          {/* Recent Searches */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground">Búsquedas recientes</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-medium text-muted-foreground">Tendencias</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Games */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Juegos populares</h3>
            <div className="grid grid-cols-2 gap-3">
              {games.slice(0, 4).map(game => (
                <GameCard 
                  key={game.id} 
                  game={game}
                  onToggleFavorite={onToggleFavorite}
                  onClick={onGameClick}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
