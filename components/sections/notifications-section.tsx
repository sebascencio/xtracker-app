"use client"

import Image from 'next/image'
import { Bell, TrendingDown, Tag, Sparkles, Check, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Notification } from '@/lib/types'

interface NotificationsSectionProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
}

function formatTimeAgo(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 60) return `Hace ${minutes} min`
  if (hours < 24) return `Hace ${hours} h`
  return `Hace ${days} día${days > 1 ? 's' : ''}`
}

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case 'price_drop':
      return <TrendingDown className="w-4 h-4" />
    case 'lowest_ever':
      return <Sparkles className="w-4 h-4" />
    case 'wishlist_sale':
      return <Tag className="w-4 h-4" />
    default:
      return <Bell className="w-4 h-4" />
  }
}

export function NotificationsSection({ notifications, onMarkAsRead, onMarkAllAsRead }: NotificationsSectionProps) {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="px-5 pt-4 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bell className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Notificaciones</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 
                ? `${unreadCount} nueva${unreadCount > 1 ? 's' : ''}` 
                : 'Todo al día'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onMarkAllAsRead}
                className="text-xs text-primary"
              >
                <Check className="w-4 h-4 mr-1" />
                Marcar leídas
              </Button>
            )}
            <Button variant="ghost" size="icon" className="w-9 h-9">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </header>

      {/* Notification Settings Quick Toggle */}
      <div className="px-5 mb-4">
        <div className="bg-card rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Alertas de precio</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-secondary-foreground">Bajadas de precio</span>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-primary-foreground transition-transform translate-x-6" />
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-secondary-foreground">Precio mínimo histórico</span>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-primary-foreground transition-transform translate-x-6" />
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-secondary-foreground">Ofertas en favoritos</span>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-primary-foreground transition-transform translate-x-6" />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="px-5 space-y-2">
          {notifications.map(notification => (
            <button
              key={notification.id}
              onClick={() => onMarkAsRead(notification.id)}
              className={cn(
                "w-full flex items-start gap-3 p-4 rounded-2xl transition-all text-left",
                notification.read ? "bg-card" : "bg-primary/10 border border-primary/20"
              )}
            >
              <div className="relative flex-shrink-0">
                <div className="w-14 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={notification.gameCover}
                    alt={notification.gameTitle}
                    width={56}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center",
                  notification.type === 'lowest_ever' 
                    ? "bg-primary text-primary-foreground"
                    : notification.type === 'price_drop'
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}>
                  {getNotificationIcon(notification.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm text-foreground truncate">
                    {notification.gameTitle}
                  </h3>
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                {notification.newPrice && notification.oldPrice && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-primary font-bold">${notification.newPrice}</span>
                    <span className="text-xs text-muted-foreground line-through">${notification.oldPrice}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {formatTimeAgo(notification.timestamp)}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-5">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Bell className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Sin notificaciones</h3>
          <p className="text-sm text-muted-foreground text-center max-w-[250px]">
            Activa las alertas de precio para no perderte ninguna oferta
          </p>
        </div>
      )}
    </div>
  )
}
