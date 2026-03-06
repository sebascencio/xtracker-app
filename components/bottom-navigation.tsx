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
    { id: 'favorites', icon: Heart, label: 'Lista' },
    { id: 'notifications', icon: Bell, label: 'Alertas' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-gradient-to-t from-background via-background to-transparent h-6 pointer-events-none" />
      <div className="glass border-t border-border/50 safe-area-bottom">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
          {tabs.map(({ id, icon: Icon, label }) => {
            const isActive = activeTab === id
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full transition-all duration-300",
                  "active:scale-90"
                )}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300",
                  isActive && "bg-primary/15"
                )}>
                  <Icon 
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      isActive ? "text-primary scale-110" : "text-muted-foreground"
                    )} 
                    strokeWidth={isActive ? 2.5 : 2}
                    fill={isActive && id === 'favorites' ? 'currentColor' : 'none'}
                  />
                  {id === 'notifications' && notificationCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg shadow-primary/40 animate-pulse">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "text-[10px] mt-0.5 font-semibold transition-all duration-300",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
