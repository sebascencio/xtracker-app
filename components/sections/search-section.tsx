"use client"

import { useState, useMemo } from 'react'
import { Search, X, Clock, TrendingUp, Gamepad2 } from 'lucide-react'
import { GameCard } from '@/components/game-card'
import { cn } from '@/lib/utils'
import type { Game, Currency } from '@/lib/types'

interface SearchSectionProps {
  games: Game[]
  currency: Currency
  onToggleFavorite: (id: string) => void
  onGameClick: (game: Game) => void
}

const recentSearches = ['Starfield', 'Forza', 'Halo', 'Gears']
const trendingSearches = ['Fable', 'Elder Scrolls', 'Call of Duty', 'Diablo']

export function SearchSection({ games, currency, onToggleFavorite, onGameClick }: SearchSectionProps) {
  const [query, setQuery] = useState('')

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
    <div className="pb-28">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
            <Search className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Buscar</h1>
            <p className="text-xs text-muted-foreground font-medium">Encuentra tu proximo juego</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar juegos, categorias..."
            className={cn(
              "w-full h-14 pl-12 pr-12 rounded-2xl bg-card text-foreground placeholder:text-muted-foreground",
              "border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20",
              "transition-all duration-300 outline-none font-medium"
            )}
          />
          {hasQuery && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted-foreground/20 flex items-center justify-center hover:bg-muted-foreground/30 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
        </div>
      </header>

      {hasQuery ? (
        // Search Results
        <div className="px-5">
          <p className="text-sm text-muted-foreground mb-4 font-medium">
            {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} para <span className="text-primary">"{query}"</span>
          </p>
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map(game => (
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
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
                <Gamepad2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-center font-medium">
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
              <h3 className="text-sm font-semibold text-muted-foreground">Busquedas recientes</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2.5 rounded-xl bg-card text-foreground text-sm font-medium border border-border/50 hover:border-primary/50 transition-all"
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
              <h3 className="text-sm font-semibold text-muted-foreground">Tendencias</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-semibold border border-primary/20 hover:bg-primary/20 transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Games */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Juegos populares</h3>
            <div className="grid grid-cols-2 gap-3">
              {games.slice(0, 4).map(game => (
                <GameCard 
                  key={game.id} 
                  game={game}
                  currency={currency}
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
