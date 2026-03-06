export interface Game {
  id: string
  title: string
  coverImage: string
  currentPrice: number
  originalPrice: number
  lowestPrice: number
  highestPrice: number
  discount: number
  isFavorite: boolean
  priceHistory: PricePoint[]
  platform: 'Xbox Series X|S' | 'Xbox One' | 'PC' | 'All'
  releaseDate: string
  rating: number
  category: string
}

export interface PricePoint {
  date: string
  price: number
}

export interface Notification {
  id: string
  gameId: string
  gameTitle: string
  gameCover: string
  type: 'price_drop' | 'wishlist_sale' | 'lowest_ever'
  message: string
  timestamp: string
  read: boolean
  newPrice?: number
  oldPrice?: number
}

export type TabType = 'home' | 'deals' | 'favorites' | 'notifications' | 'search'
