"use client"

import { Heart, ShoppingBag, Bell, TrendingDown, Sparkles } from 'lucide-react'
import { GameCard } from '@/components/game-card'
import { Button } from '@/components/ui/button'
import type { Game, Currency } from '@/lib/types'

interface FavoritesSectionProps {
  games: Game[]
  currency: Currency
  onToggleFavorite: (id: string) => void
  onGameClick: (game: Game) => void
}

function formatPrice(price: number, currency: Currency): string {
  const converted = price * currency.rate
  if (currency.rate >= 100) {
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`
  }
  return `${currency.symbol}${converted.toFixed(2)}`
}

export function FavoritesSection({ games, currency, onToggleFavorite, onGameClick }: FavoritesSectionProps) {
  const favoriteGames = games.filter(g => g.isFavorite)
  const totalValue = favoriteGames.reduce((acc, g) => acc + g.currentPrice, 0)
  const totalSavings = favoriteGames.reduce((acc, g) => acc + (g.originalPrice - g.currentPrice), 0)
  const gamesOnSale = favoriteGames.filter(g => g.discount > 0).length

  return (
    <div className="pt-20 pb-28">
      {/* Header */}
      <header className="px-5 pt-2 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
            <Heart className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Lista de deseos</h1>
            <p className="text-xs text-muted-foreground font-medium">
              {favoriteGames.length} {favoriteGames.length === 1 ? 'juego' : 'juegos'} guardados
            </p>
          </div>
        </div>
      </header>

      {favoriteGames.length > 0 ? (
        <>
          {/* Stats Cards */}
          <div className="flex gap-3 px-5 mb-6 overflow-x-auto hide-scrollbar">
            <div className="flex-shrink-0 bg-gradient-to-br from-card to-card/50 rounded-2xl p-4 min-w-[130px] border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
                  <ShoppingBag className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Valor total</p>
              <p className="text-xl font-bold text-foreground">{formatPrice(totalValue, currency)}</p>
            </div>
            <div className="flex-shrink-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 min-w-[130px] border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                  <TrendingDown className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Ahorro total</p>
              <p className="text-xl font-bold text-primary">{formatPrice(totalSavings, currency)}</p>
            </div>
            <div className="flex-shrink-0 bg-gradient-to-br from-card to-card/50 rounded-2xl p-4 min-w-[130px] border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">En oferta</p>
              <p className="text-xl font-bold text-foreground">{gamesOnSale}</p>
            </div>
          </div>

          {/* Favorites List */}
          <div className="px-5 space-y-2">
            {favoriteGames.map(game => (
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
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-5 border border-border/50">
            <Heart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">Tu lista esta vacia</h3>
          <p className="text-sm text-muted-foreground text-center mb-6 max-w-[260px] leading-relaxed">
            Agrega juegos a tu lista de deseos para recibir alertas cuando bajen de precio
          </p>
          <Button className="bg-primary text-primary-foreground rounded-xl px-6 h-11 font-semibold shadow-lg shadow-primary/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Explorar ofertas
          </Button>
        </div>
      )}
    </div>
  )
}
