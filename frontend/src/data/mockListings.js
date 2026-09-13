export const CATEGORIES = ['Grains & Pulses', 'Vegetables', 'Fruits']

export const EMOJI_MAP = {
  'Grains & Pulses': '🌾',
  Vegetables: '🥬',
  Fruits: '🍊',
}

// Buyer marketplace listings
export const initialListings = [
  { id: 1, title: 'Basmati Rice', category: 'Grains & Pulses', price: 85, qty: 500, location: 'Karnal, Haryana', seller: 'Suresh Rathi', harvest: '2026-06-10', emoji: '🌾' },
  { id: 2, title: 'Red Tomatoes', category: 'Vegetables', price: 28, qty: 220, location: 'Nashik, Maharashtra', seller: 'Vinayak Pawar', harvest: '2026-07-18', emoji: '🍅' },
  { id: 3, title: 'Alphonso Mangoes', category: 'Fruits', price: 140, qty: 150, location: 'Ratnagiri, Maharashtra', seller: 'Anjali Kadam', harvest: '2026-05-02', emoji: '🥭' },
  { id: 4, title: 'Toor Dal', category: 'Grains & Pulses', price: 105, qty: 300, location: 'Latur, Maharashtra', seller: 'Ramesh Yadav', harvest: '2026-04-20', emoji: '🫘' },
  { id: 5, title: 'Fresh Spinach', category: 'Vegetables', price: 18, qty: 90, location: 'Ludhiana, Punjab', seller: 'Gurpreet Singh', harvest: '2026-07-28', emoji: '🥬' },
  { id: 6, title: 'Onions', category: 'Vegetables', price: 22, qty: 400, location: 'Nashik, Maharashtra', seller: 'Manoj Deshmukh', harvest: '2026-06-30', emoji: '🧅' },
]

// Seed rows for the logged-in farmer's own "active listings" table
export const initialFarmerListings = [
  { id: 1, title: 'Basmati Rice', category: 'Grains & Pulses', price: 85, qty: 340, location: 'Karnal, Haryana', harvest: '2026-06-10', emoji: '🌾' },
  { id: 2, title: 'Toor Dal', category: 'Grains & Pulses', price: 105, qty: 210, location: 'Latur, Maharashtra', harvest: '2026-04-20', emoji: '🫘' },
]

// Static demo analytics for the farmer dashboard (KPI cards, chart, etc.)
export const salesThisWeek = [
  { day: 'Mon', label: '4.2k', height: 48, barClass: 'bg-leaf/20' },
  { day: 'Tue', label: '6.8k', height: 70, barClass: 'bg-leaf/30' },
  { day: 'Wed', label: '5.1k', height: 56, barClass: 'bg-leaf/25' },
  { day: 'Thu', label: '8.9k', height: 92, barClass: 'bg-forest', peak: true },
  { day: 'Fri', label: '3.6k', height: 40, barClass: 'bg-leaf/20' },
  { day: 'Sat', label: '7.4k', height: 78, barClass: 'bg-leaf/30' },
  { day: 'Sun', label: '2.9k', height: 32, barClass: 'bg-leaf/20' },
]

export const categorySplit = [
  { category: 'Grains & Pulses', revenue: 89400, percent: 49, dotClass: 'bg-forest', barClass: 'bg-forest' },
  { category: 'Vegetables', revenue: 61150, percent: 33, dotClass: 'bg-leaf', barClass: 'bg-leaf' },
  { category: 'Fruits', revenue: 33700, percent: 18, dotClass: 'bg-harvest', barClass: 'bg-harvest' },
]

export const stockLevels = [
  { title: 'Basmati Rice', emoji: '🌾', remaining: 340, total: 500, percent: 68, barClass: 'bg-leaf' },
  { title: 'Toor Dal', emoji: '🫘', remaining: 210, total: 300, percent: 70, barClass: 'bg-leaf' },
  { title: 'Red Tomatoes', emoji: '🍅', remaining: 55, total: 220, percent: 25, barClass: 'bg-harvest', warning: 'Running low — consider restocking' },
  { title: 'Onions', emoji: '🧅', remaining: 380, total: 400, percent: 95, barClass: 'bg-leaf' },
  { title: 'Fresh Spinach', emoji: '🥬', remaining: 18, total: 90, percent: 20, barClass: 'bg-rust', warning: 'Almost sold out' },
]

export const recentTransactions = [
  { id: 1, emoji: '🌾', iconBg: 'bg-leaf/10', buyer: 'Anand Traders', item: 'Basmati Rice', meta: '80kg · Today, 10:42 AM', amount: 6800, status: 'Paid', statusClass: 'text-leaf bg-leaf/10' },
  { id: 2, emoji: '🧅', iconBg: 'bg-leaf/10', buyer: 'Priya Wholesale Mart', item: 'Onions', meta: '120kg · Today, 9:15 AM', amount: 2640, status: 'Paid', statusClass: 'text-leaf bg-leaf/10' },
  { id: 3, emoji: '🍅', iconBg: 'bg-harvest/10', buyer: 'Deshmukh Fresh Foods', item: 'Red Tomatoes', meta: 'Yesterday, 6:50 PM', amount: 1540, status: 'Pending', statusClass: 'text-harvest bg-harvest/10' },
  { id: 4, emoji: '🫘', iconBg: 'bg-leaf/10', buyer: 'Latur Grain Co-op', item: 'Toor Dal', meta: 'Yesterday, 2:20 PM', amount: 9450, status: 'Paid', statusClass: 'text-leaf bg-leaf/10' },
  { id: 5, emoji: '🥬', iconBg: 'bg-rust/10', buyer: 'Ludhiana Retail Hub', item: 'Spinach', meta: '2 days ago, 11:05 AM', amount: 1260, status: 'Refunded', statusClass: 'text-rust bg-rust/10' },
]
