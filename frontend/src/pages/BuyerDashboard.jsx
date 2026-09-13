import { useMemo, useState } from 'react'
import { RotateCcw, SearchX } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import ProduceCard from '../components/ProduceCard.jsx'
import CartDrawer from '../components/CartDrawer.jsx'
import ToastNotification from '../components/ToastNotification.jsx'
import { useToast } from '../hooks/useToast.js'
import { useAuth } from '../context/AuthContext.jsx'
import { CATEGORIES, initialListings } from '../data/mockListings.js'

function BuyerDashboard() {
  const { user, logout } = useAuth()
  const { message, showToast } = useToast()

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(200)
  const [cart, setCart] = useState([]) // [{ id, qty }]
  const [cartOpen, setCartOpen] = useState(false)

  const categories = ['All', ...CATEGORIES]

  const filteredListings = useMemo(() => {
    const query = search.trim().toLowerCase()
    return initialListings.filter((item) => {
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesPrice = item.price <= maxPrice
      return matchesQuery && matchesCategory && matchesPrice
    })
  }, [search, activeCategory, maxPrice])

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0)

  const addToCart = (id) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id)
      if (existing) {
        return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c))
      }
      return [...prev, { id, qty: 1 }]
    })
    showToast('Added to cart')
    setCartOpen(true)
  }

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c)).filter((c) => c.qty > 0),
    )
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id))
  }

  const handleCheckout = () => {
    if (cart.length === 0) return
    setCart([])
    setCartOpen(false)
    showToast('Order placed — checkout is simulated')
  }

  const resetFilters = () => {
    setSearch('')
    setMaxPrice(200)
    setActiveCategory('All')
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar
        role="buyer"
        userName={user?.name}
        searchValue={search}
        onSearchChange={setSearch}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onLogout={logout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-6">
          <p className="text-xs font-mono uppercase tracking-wide text-soil">Welcome back</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-forest mt-0.5">
            Today's harvest
          </h1>
          <p className="text-sm text-ink/60 mt-1">
            Fresh listings straight from the farm, priced per kilogram.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          <aside className="lg:sticky lg:top-24 h-fit bg-white border border-line rounded-2xl p-5 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-forest">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-xs text-soil hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-2.5">
                Category
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      cat === activeCategory
                        ? 'bg-leaf/15 text-forest font-medium'
                        : 'text-ink/60 hover:bg-line/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Max price
                </h3>
                <span className="font-mono text-xs text-forest font-semibold">₹{maxPrice}/kg</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-ink/40 font-mono mt-1">
                <span>₹10</span>
                <span>₹200</span>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-ink/50 font-mono">
                {filteredListings.length} listing{filteredListings.length === 1 ? '' : 's'}
              </p>
            </div>

            {filteredListings.length === 0 ? (
              <div className="text-center py-16">
                <SearchX className="w-8 h-8 mx-auto text-ink/30 mb-3" />
                <p className="font-display text-lg text-forest">No produce matches yet</p>
                <p className="text-sm text-ink/50 mt-1">
                  Try widening your price range or clearing filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredListings.map((item) => (
                  <ProduceCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-10 mt-6 border-t border-line text-center">
        <p className="text-xs text-ink/40">
          AgriMarket MVP — academic prototype. Payments are simulated; no live transactions occur.
        </p>
      </footer>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        listings={initialListings}
        onChangeQty={changeQty}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
      <ToastNotification message={message} />
    </div>
  )
}

export default BuyerDashboard
