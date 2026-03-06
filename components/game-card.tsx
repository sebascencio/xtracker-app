"use client"

import Image from 'next/image'
import { Heart, TrendingDown, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Game, Currency } from '@/lib/types'

interface GameCardProps {
  game: Game
  currency: Currency
  onToggleFavorite?: (id: string) => void
  onClick?: (game: Game) => void
  variant?: 'default' | 'compact' | 'featured'
}

function formatPrice(price: number, currency: Currency): string {
  const converted = price * currency.rate
  if (currency.rate >= 100) {
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`
  }
  return `${currency.symbol}${converted.toFixed(2)}`
}

export function GameCard({ game, currency, onToggleFavorite, onClick, variant = 'default' }: GameCardProps) {
  const isLowestPrice = game.currentPrice <= game.lowestPrice

  if (variant === 'compact') {
    return (
      <button
        onClick={() => onClick?.(game)}
        className="flex items-center gap-4 p-3 rounded-2xl bg-gradient-to-r from-card to-card/50 hover:from-secondary/50 hover:to-secondary/30 border border-border/50 transition-all duration-300 active:scale-[0.98] w-full text-left group"
      >
        <div className="relative w-12 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-lg shadow-black/30">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            unoptimized
          />
          {isLowestPrice && (
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground truncate tracking-tight">{game.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">{game.platform}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-primary font-bold text-base">{formatPrice(game.currentPrice, currency)}</span>
            {game.discount > 0 && (
              <>
                <span className="text-xs text-muted-foreground line-through">{formatPrice(game.originalPrice, currency)}</span>
                <span className="text-[10px] font-bold text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                  -{game.discount}%
                </span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite?.(game.id)
          }}
          className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center transition-all hover:bg-secondary active:scale-90"
          aria-label={game.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-all",
              game.isFavorite ? "text-primary fill-primary" : "text-muted-foreground"
            )} 
          />
        </button>
      </button>
    )
  }

  if (variant === 'featured') {
    return (
      <button
        onClick={() => onClick?.(game)}
        className="relative w-44 flex-shrink-0 rounded-2xl overflow-hidden group active:scale-[0.98] transition-all duration-300 shadow-xl shadow-black/40"
      >
        <div className="relative aspect-[3/4]">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          {game.discount > 0 && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full shadow-lg shadow-primary/30">
              -{game.discount}%
            </div>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite?.(game.id)
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center transition-all hover:bg-black/70 active:scale-90"
            aria-label={game.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <Heart 
              className={cn(
                "w-3.5 h-3.5 transition-all",
                game.isFavorite ? "text-primary fill-primary" : "text-white"
              )} 
            />
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="font-bold text-sm text-white mb-0.5 text-balance leading-tight line-clamp-2">{game.title}</h3>
            <p className="text-white/60 text-[10px] font-medium mb-2">{game.platform}</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{formatPrice(game.currentPrice, currency)}</span>
              {game.discount > 0 && (
                <span className="text-xs text-white/50 line-through">{formatPrice(game.originalPrice, currency)}</span>
              )}
            </div>
            {isLowestPrice && (
              <div className="flex items-center gap-1 text-primary text-[10px] mt-1.5 font-semibold">
                <TrendingDown className="w-3 h-3" />
                <span>Minimo historico</span>
              </div>
            )}
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={() => onClick?.(game)}
      className="relative rounded-2xl overflow-hidden bg-card group active:scale-[0.98] transition-all duration-300 w-full shadow-lg shadow-black/30 border border-border/30"
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {game.discount > 0 && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-primary/30">
            -{game.discount}%
          </div>
        )}
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite?.(game.id)
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center transition-all hover:bg-black/70 active:scale-90"
          aria-label={game.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart 
            className={cn(
              "w-3.5 h-3.5 transition-all",
              game.isFavorite ? "text-primary fill-primary" : "text-white"
            )} 
          />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-semibold text-sm text-white truncate">{game.title}</h3>
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white">{formatPrice(game.currentPrice, currency)}</span>
              {game.discount > 0 && (
                <span className="text-[10px] text-white/50 line-through">{formatPrice(game.originalPrice, currency)}</span>
              )}
            </div>
            {isLowestPrice && (
              <div className="flex items-center gap-0.5 text-primary text-[10px] bg-primary/20 px-1.5 py-0.5 rounded-full">
                <TrendingDown className="w-3 h-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
