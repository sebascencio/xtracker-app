"use client"

import { Home, Tag, Heart, Bell, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TabType } from '@/lib/types'

interface BottomNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  notificationCount?: number
}

export function BottomNavigation({ activeTab, onTabChange, notificationCount = 0 }: BottomNavigationProps) {
  const tabs: { id: TabType; icon: typeof Home; label: string }[] = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'deals', icon: Tag, label: 'Ofertas' },
    { id: 'search', icon: Search, label: 'Buscar' },
    { id: 'favorites', icon: Heart, label: 'Favoritos' },
    { id: 'notifications', icon: Bell, label: 'Alertas' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-border safe-area-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-all duration-200",
                "active:scale-95",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon 
                  className={cn(
                    "w-6 h-6 transition-all duration-200",
                    isActive && "scale-110"
                  )} 
                  strokeWidth={isActive ? 2.5 : 2}
                  fill={isActive && id === 'favorites' ? 'currentColor' : 'none'}
                />
                {id === 'notifications' && notificationCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-[10px] mt-1 font-medium transition-all duration-200",
                isActive ? "opacity-100" : "opacity-70"
              )}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
