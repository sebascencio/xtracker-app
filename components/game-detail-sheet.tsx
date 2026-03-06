"use client"

import Image from 'next/image'
import { X, Heart, TrendingDown, TrendingUp, Bell, ExternalLink, Star } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PriceChart } from './price-chart'
import { cn } from '@/lib/utils'
import type { Game } from '@/lib/types'

interface GameDetailSheetProps {
  game: Game | null
  open: boolean
  onClose: () => void
  onToggleFavorite: (id: string) => void
}

export function GameDetailSheet({ game, open, onClose, onToggleFavorite }: GameDetailSheetProps) {
  if (!game) return null

  const isLowestPrice = game.currentPrice <= game.lowestPrice
  const savingsPercent = Math.round(((game.originalPrice - game.currentPrice) / game.originalPrice) * 100)

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side="bottom" 
        className="h-[92vh] rounded-t-3xl border-t border-border bg-background p-0 overflow-hidden"
      >
        {/* Header Image */}
        <div className="relative h-56 w-full">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          {/* Discount Badge */}
          {game.discount > 0 && (
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
              -{game.discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-5 pb-32 -mt-12 relative overflow-y-auto h-[calc(92vh-14rem)] hide-scrollbar">
          {/* Title Section */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground text-balance">{game.title}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {game.platform}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {game.category}
                  </Badge>
                  {game.rating > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      {game.rating}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => onToggleFavorite(game.id)}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                  game.isFavorite 
                    ? "bg-primary/20 text-primary" 
                    : "bg-secondary text-muted-foreground"
                )}
                aria-label={game.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                <Heart className={cn("w-6 h-6", game.isFavorite && "fill-current")} />
              </button>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-card rounded-2xl p-4 mb-6">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Precio actual</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">${game.currentPrice}</span>
                  {game.discount > 0 && (
                    <span className="text-lg text-muted-foreground line-through">${game.originalPrice}</span>
                  )}
                </div>
              </div>
              {game.discount > 0 && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">Ahorras</p>
                  <p className="text-lg font-semibold text-primary">
                    ${(game.originalPrice - game.currentPrice).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
            
            {isLowestPrice && (
              <div className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-2 rounded-xl">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">Precio más bajo de la historia</span>
              </div>
            )}
          </div>

          {/* Price Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Precio mínimo</span>
              </div>
              <p className="text-xl font-bold text-foreground">${game.lowestPrice}</p>
            </div>
            <div className="bg-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Precio máximo</span>
              </div>
              <p className="text-xl font-bold text-foreground">${game.highestPrice}</p>
            </div>
          </div>

          {/* Price History Chart */}
          <div className="bg-card rounded-2xl p-4 mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Historial de precios</h3>
            <PriceChart 
              data={game.priceHistory}
              lowestPrice={game.lowestPrice}
              highestPrice={game.highestPrice}
              currentPrice={game.currentPrice}
            />
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span>Últimos 12 meses</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Mínimo</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <span>Máximo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 h-12 rounded-xl"
            >
              <Bell className="w-4 h-4 mr-2" />
              Alertar precio
            </Button>
            <Button 
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver en Xbox Store
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
