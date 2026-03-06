"use client"

import { useState, useCallback, useEffect } from 'react'
import { BottomNavigation } from '@/components/bottom-navigation'
import { StickyHeader } from '@/components/sticky-header'
import { ThemeToggle } from '@/components/theme-toggle'
import { GameDetailSheet } from '@/components/game-detail-sheet'
import { HomeSection } from '@/components/sections/home-section'
import { DealsSection } from '@/components/sections/deals-section'
import { FavoritesSection } from '@/components/sections/favorites-section'
import { ProfileSection } from '@/components/sections/profile-section'
import { SearchSection } from '@/components/sections/search-section'
import { mockGames, mockNotifications, mockUser } from '@/lib/mock-data'
import { currencies } from '@/lib/types'
import type { TabType, Game, Currency, UserProfile } from '@/lib/types'

export default function XPriceApp() {
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [games, setGames] = useState(mockGames)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [user, setUser] = useState<UserProfile>(mockUser)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [currency, setCurrency] = useState<Currency>(currencies[0])
  const [isDark, setIsDark] = useState(true)

  const unreadNotifications = notifications.filter(n => !n.read).length

  // Handle theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const handleToggleFavorite = useCallback((id: string) => {
    setGames(prev => prev.map(g => 
      g.id === id ? { ...g, isFavorite: !g.isFavorite } : g
    ))
    setSelectedGame(prev => 
      prev?.id === id ? { ...prev, isFavorite: !prev.isFavorite } : prev
    )
  }, [])

  const handleGameClick = useCallback((game: Game) => {
    setSelectedGame(game)
    setIsDetailOpen(true)
  }, [])

  const handleCloseDetail = useCallback(() => {
    setIsDetailOpen(false)
    setTimeout(() => setSelectedGame(null), 300)
  }, [])

  const handleMarkAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }, [])

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const handleCurrencyChange = useCallback((newCurrency: Currency) => {
    setCurrency(newCurrency)
  }, [])

  const handleUpdateUser = useCallback((updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }))
  }, [])

  const handleThemeToggle = useCallback(() => {
    setIsDark(prev => !prev)
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeSection 
            games={games}
            currency={currency}
            onToggleFavorite={handleToggleFavorite}
            onGameClick={handleGameClick}
          />
        )
      case 'deals':
        return (
          <DealsSection 
            games={games}
            currency={currency}
            onToggleFavorite={handleToggleFavorite}
            onGameClick={handleGameClick}
          />
        )
      case 'favorites':
        return (
          <FavoritesSection 
            games={games}
            currency={currency}
            onToggleFavorite={handleToggleFavorite}
            onGameClick={handleGameClick}
          />
        )
      case 'profile':
        return (
          <ProfileSection 
            user={user}
            notifications={notifications}
            onUpdateUser={handleUpdateUser}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        )
      case 'search':
        return (
          <SearchSection 
            games={games}
            currency={currency}
            onToggleFavorite={handleToggleFavorite}
            onGameClick={handleGameClick}
          />
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <StickyHeader 
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
      />

      <div className="max-w-lg mx-auto">
        {renderContent()}
      </div>

      <ThemeToggle 
        isDark={isDark}
        onToggle={handleThemeToggle}
      />

      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notificationCount={unreadNotifications}
      />

      <GameDetailSheet 
        game={selectedGame}
        currency={currency}
        open={isDetailOpen}
        onClose={handleCloseDetail}
        onToggleFavorite={handleToggleFavorite}
      />
    </main>
  )
}
