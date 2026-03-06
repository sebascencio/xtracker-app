"use client"

import Image from 'next/image'
import { X, Heart, TrendingDown, TrendingUp, Bell, ExternalLink, Star, Gamepad2 } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PriceChart } from './price-chart'
import { cn } from '@/lib/utils'
import type { Game, Currency } from '@/lib/types'

interface GameDetailSheetProps {
  game: Game | null
  currency: Currency
  open: boolean
  onClose: () => void
  onToggleFavorite: (id: string) => void
}

function formatPrice(price: number, currency: Currency): string {
  const converted = price * currency.rate
  if (currency.rate >= 100) {
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`
  }
  return `${currency.symbol}${converted.toFixed(2)}`
}

export function GameDetailSheet({ game, currency, open, onClose, onToggleFavorite }: GameDetailSheetProps) {
  if (!game) return null

  const isLowestPrice = game.currentPrice <= game.lowestPrice

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side="bottom" 
        className="h-[92vh] rounded-t-[2rem] border-t border-border/50 bg-background p-0 overflow-hidden"
      >
        {/* Header Image */}
        <div className="relative h-52 w-full">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/70 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          {/* Discount Badge */}
          {game.discount > 0 && (
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold px-3 py-1.5 rounded-full shadow-lg shadow-primary/30">
              -{game.discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-5 pb-32 -mt-10 relative overflow-y-auto h-[calc(92vh-13rem)] hide-scrollbar">
          {/* Title Section */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground text-balance tracking-tight">{game.title}</h2>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <Badge variant="secondary" className="text-xs font-semibold rounded-lg px-2.5 py-1">
                    <Gamepad2 className="w-3 h-3 mr-1" />
                    {game.platform}
                  </Badge>
                  <Badge variant="outline" className="text-xs font-semibold rounded-lg px-2.5 py-1 border-border/50">
                    {game.category}
                  </Badge>
                  {game.rating > 0 && (
                    <div className="flex items-center gap-1 text-xs font-semibold text-foreground bg-card px-2.5 py-1 rounded-lg">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      {game.rating}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => onToggleFavorite(game.id)}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg",
                  game.isFavorite 
                    ? "bg-primary/20 text-primary shadow-primary/20" 
                    : "bg-card text-muted-foreground border border-border/50"
                )}
                aria-label={game.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <Heart className={cn("w-6 h-6", game.isFavorite && "fill-current")} />
              </button>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-5 mb-5 border border-border/50">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Precio actual</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground tracking-tight">{formatPrice(game.currentPrice, currency)}</span>
                  {game.discount > 0 && (
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(game.originalPrice, currency)}</span>
                  )}
                </div>
              </div>
              {game.discount > 0 && (
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Ahorras</p>
                  <p className="text-xl font-bold text-primary">
                    {formatPrice(game.originalPrice - game.currentPrice, currency)}
                  </p>
                </div>
              )}
            </div>
            
            {isLowestPrice && (
              <div className="flex items-center gap-2 text-primary bg-primary/15 px-4 py-3 rounded-xl border border-primary/20">
                <TrendingDown className="w-5 h-5" />
                <span className="text-sm font-semibold">Precio mas bajo de la historia</span>
              </div>
            )}
          </div>

          {/* Price Stats */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-primary" />
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Precio minimo</span>
              </div>
              <p className="text-2xl font-bold text-primary">{formatPrice(game.lowestPrice, currency)}</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Precio maximo</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatPrice(game.highestPrice, currency)}</p>
            </div>
          </div>

          {/* Price History Chart */}
          <div className="bg-card rounded-2xl p-5 mb-6 border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-4 tracking-tight">Historial de precios</h3>
            <PriceChart 
              data={game.priceHistory}
              lowestPrice={game.lowestPrice}
              highestPrice={game.highestPrice}
              currentPrice={game.currentPrice}
            />
            <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground font-medium">
              <span>Ultimos 12 meses</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span>Minimo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/50" />
                  <span>Maximo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 h-13 rounded-2xl border-border/50 font-semibold"
            >
              <Bell className="w-4 h-4 mr-2" />
              Alertar precio
            </Button>
            <Button 
              className="flex-1 h-13 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/30"
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
