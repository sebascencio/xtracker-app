import { Game, Notification } from './types'

// Generate price history data
const generatePriceHistory = (basePrice: number, months: number = 12) => {
  const history = []
  const now = new Date()
  
  for (let i = months; i >= 0; i--) {
    const date = new Date(now)
    date.setMonth(date.getMonth() - i)
    const variance = (Math.random() - 0.5) * basePrice * 0.6
    const price = Math.max(basePrice * 0.3, Math.min(basePrice * 1.1, basePrice + variance))
    history.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100
    })
  }
  
  return history
}

export const mockGames: Game[] = [
  {
    id: '1',
    title: 'Starfield',
    coverImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1716740/library_600x900_2x.jpg',
    currentPrice: 34.99,
    originalPrice: 69.99,
    lowestPrice: 29.99,
    highestPrice: 69.99,
    discount: 50,
    isFavorite: true,
    priceHistory: generatePriceHistory(69.99),
    platform: 'Xbox Series X|S',
    releaseDate: '2023-09-06',
    rating: 4.2,
    category: 'RPG'
  },
  {
    id: '2',
    title: 'Forza Horizon 5',
    coverImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/library_600x900_2x.jpg',
    currentPrice: 29.99,
    originalPrice: 59.99,
    lowestPrice: 24.99,
    highestPrice: 59.99,
    discount: 50,
    isFavorite: true,
    priceHistory: generatePriceHistory(59.99),
    platform: 'All',
    releaseDate: '2021-11-09',
    rating: 4.8,
    category: 'Racing'
  },
  {
    id: '3',
    title: 'Halo Infinite',
    coverImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1240440/library_600x900_2x.jpg',
    currentPrice: 19.99,
    originalPrice: 59.99,
    lowestPrice: 14.99,
    highestPrice: 59.99,
    discount: 67,
    isFavorite: false,
    priceHistory: generatePriceHistory(59.99),
    platform: 'All',
    releaseDate: '2021-12-08',
    rating: 4.5,
    category: 'Shooter'
  },
  {
    id: '4',
    title: 'Sea of Thieves',
    coverImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1172620/library_600x900_2x.jpg',
    currentPrice: 19.99,
    originalPrice: 39.99,
    lowestPrice: 9.99,
    highestPrice: 39.99,
    discount: 50,
    isFavorite: false,
    priceHistory: generatePriceHistory(39.99),
    platform: 'All',
    releaseDate: '2018-03-20',
    rating: 4.3,
    category: 'Adventure'
  },
  {
    id: '5',
    title: 'Microsoft Flight Simulator',
    coverImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1250410/library_600x900_2x.jpg',
    currentPrice: 44.99,
    originalPrice: 59.99,
    lowestPrice: 29.99,
    highestPrice: 59.99,
    discount: 25,
    isFavorite: false,
    priceHistory: generatePriceHistory(59.99),
    platform: 'All',
    releaseDate: '2020-08-18',
    rating: 4.7,
    category: 'Simulation'
  },
  {
    id: '6',
    title: 'Gears 5',
    coverImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1097840/library_600x900_2x.jpg',
    currentPrice: 9.99,
    originalPrice: 39.99,
    lowestPrice: 9.99,
    highestPrice: 39.99,
    discount: 75,
    isFavorite: false,
    priceHistory: generatePriceHistory(39.99),
    platform: 'All',
    releaseDate: '2019-09-10',
    rating: 4.6,
    category: 'Shooter'
  },
  {
    id: '7',
    title: 'Age of Empires IV',
    coverImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1466860/library_600x900_2x.jpg',
    currentPrice: 29.99,
    originalPrice: 59.99,
    lowestPrice: 19.99,
    highestPrice: 59.99,
    discount: 50,
    isFavorite: false,
    priceHistory: generatePriceHistory(59.99),
    platform: 'PC',
    releaseDate: '2021-10-28',
    rating: 4.4,
    category: 'Strategy'
  },
  {
    id: '8',
    title: 'Diablo IV',
    coverImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2344520/library_600x900_2x.jpg',
    currentPrice: 49.99,
    originalPrice: 69.99,
    lowestPrice: 39.99,
    highestPrice: 69.99,
    discount: 29,
    isFavorite: true,
    priceHistory: generatePriceHistory(69.99),
    platform: 'All',
    releaseDate: '2023-06-06',
    rating: 4.3,
    category: 'RPG'
  },
  {
    id: '9',
    title: 'Call of Duty: MW III',
    coverImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2519060/library_600x900_2x.jpg',
    currentPrice: 39.99,
    originalPrice: 69.99,
    lowestPrice: 34.99,
    highestPrice: 69.99,
    discount: 43,
    isFavorite: false,
    priceHistory: generatePriceHistory(69.99),
    platform: 'All',
    releaseDate: '2023-11-10',
    rating: 4.1,
    category: 'Shooter'
  },
  {
    id: '10',
    title: 'Ori and the Will of the Wisps',
    coverImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1057090/library_600x900_2x.jpg',
    currentPrice: 14.99,
    originalPrice: 29.99,
    lowestPrice: 9.99,
    highestPrice: 29.99,
    discount: 50,
    isFavorite: true,
    priceHistory: generatePriceHistory(29.99),
    platform: 'All',
    releaseDate: '2020-03-11',
    rating: 4.9,
    category: 'Adventure'
  }
]

export const mockNotifications: Notification[] = [
  {
    id: '1',
    gameId: '1',
    gameTitle: 'Starfield',
    gameCover: 'https://cdn.akamai.steamstatic.com/steam/apps/1716740/library_600x900_2x.jpg',
    type: 'price_drop',
    message: 'El precio ha bajado un 50%',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    newPrice: 34.99,
    oldPrice: 69.99
  },
  {
    id: '2',
    gameId: '3',
    gameTitle: 'Halo Infinite',
    gameCover: 'https://cdn.akamai.steamstatic.com/steam/apps/1240440/library_600x900_2x.jpg',
    type: 'lowest_ever',
    message: 'Precio mas bajo de la historia',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
    newPrice: 19.99,
    oldPrice: 59.99
  },
  {
    id: '3',
    gameId: '6',
    gameTitle: 'Gears 5',
    gameCover: 'https://cdn.akamai.steamstatic.com/steam/apps/1097840/library_600x900_2x.jpg',
    type: 'wishlist_sale',
    message: 'Un juego de tu lista esta en oferta',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
    newPrice: 9.99,
    oldPrice: 39.99
  },
  {
    id: '4',
    gameId: '2',
    gameTitle: 'Forza Horizon 5',
    gameCover: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/library_600x900_2x.jpg',
    type: 'price_drop',
    message: 'El precio ha bajado',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    read: true,
    newPrice: 29.99,
    oldPrice: 44.99
  }
]
