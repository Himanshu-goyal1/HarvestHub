import { Search, ShoppingCart, Bell, LogOut } from 'lucide-react'
import Logo from './Logo.jsx'

function Navbar({
  role,
  userName,
  searchValue,
  onSearchChange,
  cartCount = 0,
  onCartClick,
  onLogout,
}) {
  const isBuyer = role === 'buyer'
  const initials = userName
    ? userName
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?'

  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-6">
        <Logo to={isBuyer ? '/buyer' : '/farmer'} roleBadge={isBuyer ? null : 'Farmer'} />

        {isBuyer && (
          <div className="flex-1 max-w-xl">
            <label className="relative block">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search produce or location…"
                className="w-full pl-10 pr-3 py-2.5 rounded-full border border-line bg-white text-sm focus:border-leaf outline-none"
              />
            </label>
          </div>
        )}

        <div className="flex-1" />

        <div className="hidden sm:flex items-center gap-2 text-sm text-ink/70">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
              isBuyer ? 'bg-leaf/15 text-forest' : 'bg-soil/15 text-soil'
            }`}
          >
            {initials}
          </div>
          <span>{userName}</span>
        </div>

        {isBuyer ? (
          <button
            onClick={onCartClick}
            aria-label="Open cart"
            className="relative w-10 h-10 rounded-full bg-forest text-paper flex items-center justify-center hover:bg-forest/90 transition-colors shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-harvest text-forest text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-paper">
                {cartCount}
              </span>
            )}
          </button>
        ) : (
          <button
            aria-label="Notifications"
            className="relative w-10 h-10 rounded-full bg-soil text-paper flex items-center justify-center shrink-0"
          >
            <Bell className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={onLogout}
          aria-label="Log out"
          title="Log out"
          className="w-9 h-9 rounded-full border border-line text-ink/50 hover:text-ink hover:border-ink/30 flex items-center justify-center shrink-0 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}

export default Navbar
