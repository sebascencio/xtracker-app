"use client"

import Image from 'next/image'
import { Heart, TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Game } from '@/lib/types'

interface GameCardProps {
  game: Game
  onToggleFavorite?: (id: string) => void
  onClick?: (game: Game) => void
  variant?: 'default' | 'compact' | 'featured'
}

export function GameCard({ game, onToggleFavorite, onClick, variant = 'default' }: GameCardProps) {
  const isLowestPrice = game.currentPrice <= game.lowestPrice
  const priceChange = ((game.originalPrice - game.currentPrice) / game.originalPrice) * 100

  if (variant === 'compact') {
    return (
      <button
        onClick={() => onClick?.(game)}
        className="flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-secondary/50 transition-all duration-200 active:scale-[0.98] w-full text-left"
      >
        <div className="relative w-14 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-card-foreground truncate">{game.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{game.platform}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-primary font-bold">${game.currentPrice}</span>
            {game.discount > 0 && (
              <>
                <span className="text-xs text-muted-foreground line-through">${game.originalPrice}</span>
                <span className="text-xs font-medium text-primary bg-primary/20 px-1.5 py-0.5 rounded">
                  -{game.discount}%
                </span>
              </>
            )}
          </div>
        </div>
        {isLowestPrice && (
          <div className="flex items-center gap-1 text-primary text-xs bg-primary/10 px-2 py-1 rounded-full">
            <TrendingDown className="w-3 h-3" />
            <span>Mínimo</span>
          </div>
        )}
      </button>
    )
  }

  if (variant === 'featured') {
    return (
      <button
        onClick={() => onClick?.(game)}
        className="relative w-64 flex-shrink-0 rounded-2xl overflow-hidden group active:scale-[0.98] transition-transform duration-200"
      >
        <div className="relative aspect-[3/4]">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          {game.discount > 0 && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
              -{game.discount}%
            </div>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite?.(game.id)
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-black/60"
            aria-label={game.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            <Heart 
              className={cn(
                "w-4 h-4 transition-all",
                game.isFavorite ? "text-primary fill-primary" : "text-white"
              )} 
            />
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-semibold text-lg text-white mb-1 text-balance">{game.title}</h3>
            <p className="text-white/70 text-xs mb-2">{game.platform}</p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">${game.currentPrice}</span>
              {game.discount > 0 && (
                <span className="text-sm text-white/60 line-through">${game.originalPrice}</span>
              )}
            </div>
            {isLowestPrice && (
              <div className="flex items-center gap-1 text-primary text-xs mt-2">
                <TrendingDown className="w-3 h-3" />
                <span>Precio más bajo histórico</span>
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
      className="relative rounded-2xl overflow-hidden bg-card group active:scale-[0.98] transition-transform duration-200 w-full"
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {game.discount > 0 && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
            -{game.discount}%
          </div>
        )}
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite?.(game.id)
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-black/60"
          aria-label={game.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
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
              <span className="font-bold text-white">${game.currentPrice}</span>
              {game.discount > 0 && (
                <span className="text-xs text-white/60 line-through">${game.originalPrice}</span>
              )}
            </div>
            {isLowestPrice && (
              <TrendingDown className="w-4 h-4 text-primary" />
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
