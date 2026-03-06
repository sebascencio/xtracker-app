"use client"

import { Heart, ShoppingBag, Bell, TrendingDown } from 'lucide-react'
import { GameCard } from '@/components/game-card'
import { Button } from '@/components/ui/button'
import type { Game } from '@/lib/types'

interface FavoritesSectionProps {
  games: Game[]
  onToggleFavorite: (id: string) => void
  onGameClick: (game: Game) => void
}

export function FavoritesSection({ games, onToggleFavorite, onGameClick }: FavoritesSectionProps) {
  const favoriteGames = games.filter(g => g.isFavorite)
  const totalValue = favoriteGames.reduce((acc, g) => acc + g.currentPrice, 0)
  const totalSavings = favoriteGames.reduce((acc, g) => acc + (g.originalPrice - g.currentPrice), 0)
  const gamesOnSale = favoriteGames.filter(g => g.discount > 0).length

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="px-5 pt-4 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-6 h-6 text-primary fill-primary" />
          <h1 className="text-2xl font-bold text-foreground">Lista de deseos</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {favoriteGames.length} {favoriteGames.length === 1 ? 'juego' : 'juegos'} guardados
        </p>
      </header>

      {favoriteGames.length > 0 ? (
        <>
          {/* Stats Cards */}
          <div className="flex gap-3 px-5 mb-6 overflow-x-auto hide-scrollbar">
            <div className="flex-shrink-0 bg-card rounded-2xl p-4 min-w-[140px]">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Valor total</span>
              </div>
              <p className="text-xl font-bold text-foreground">${totalValue.toFixed(2)}</p>
            </div>
            <div className="flex-shrink-0 bg-card rounded-2xl p-4 min-w-[140px]">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Ahorro total</span>
              </div>
              <p className="text-xl font-bold text-primary">${totalSavings.toFixed(2)}</p>
            </div>
            <div className="flex-shrink-0 bg-card rounded-2xl p-4 min-w-[140px]">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">En oferta</span>
              </div>
              <p className="text-xl font-bold text-foreground">{gamesOnSale}</p>
            </div>
          </div>

          {/* Favorites List */}
          <div className="px-5 space-y-2">
            {favoriteGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                variant="compact"
                onToggleFavorite={onToggleFavorite}
                onClick={onGameClick}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-5">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Tu lista está vacía</h3>
          <p className="text-sm text-muted-foreground text-center mb-6 max-w-[250px]">
            Añade juegos a tu lista de deseos para recibir alertas cuando bajen de precio
          </p>
          <Button className="bg-primary text-primary-foreground">
            Explorar ofertas
          </Button>
        </div>
      )}
    </div>
  )
}
