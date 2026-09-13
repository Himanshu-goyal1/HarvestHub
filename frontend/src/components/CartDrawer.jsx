import {
  ShoppingCart,
  ShoppingBasket,
  X,
  Minus,
  Plus,
  Trash2,
  CheckCircle,
} from 'lucide-react'

function CartDrawer({ isOpen, onClose, cartItems, listings, onChangeQty, onRemove, onCheckout }) {
  const lines = cartItems
    .map((c) => {
      const item = listings.find((l) => l.id === c.id)
      return item ? { ...item, qty: c.qty } : null
    })
    .filter(Boolean)

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0)

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-ink/50 z-40 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-paper z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 className="font-display text-xl font-bold text-forest flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" /> Your cart
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full hover:bg-line/60 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <ShoppingBasket className="w-9 h-9 text-ink/25 mb-3" />
            <p className="font-display text-lg text-forest">Your cart is empty</p>
            <p className="text-sm text-ink/50 mt-1">
              Add produce from the marketplace to get started.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {lines.map((item) => (
              <div key={item.id} className="flex gap-3 items-center border border-line rounded-xl p-3">
                <div className="w-12 h-12 rounded-lg bg-leaf/10 flex items-center justify-center text-2xl shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-ink/50 font-mono">₹{item.price}/kg</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onChangeQty(item.id, -1)}
                    aria-label="Decrease quantity"
                    className="w-6 h-6 rounded-full border border-line flex items-center justify-center hover:bg-line/50 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-mono w-5 text-center">{item.qty}</span>
                  <button
                    onClick={() => onChangeQty(item.id, 1)}
                    aria-label="Increase quantity"
                    className="w-6 h-6 rounded-full border border-line flex items-center justify-center hover:bg-line/50 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  aria-label="Remove item"
                  className="text-ink/30 hover:text-red-500 transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-line px-6 py-5 space-y-3">
          <div className="flex items-center justify-between text-sm text-ink/60">
            <span>Subtotal</span>
            <span className="font-mono text-forest font-semibold">
              ₹{subtotal.toLocaleString('en-IN')}
            </span>
          </div>
          <button
            onClick={onCheckout}
            disabled={lines.length === 0}
            className="w-full bg-harvest disabled:opacity-40 disabled:cursor-not-allowed text-forest font-semibold text-sm py-3.5 rounded-lg hover:bg-harvest/90 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" /> Place order
          </button>
          <p className="text-center text-[11px] text-ink/40">
            Checkout is simulated for this prototype — no payment is processed.
          </p>
        </div>
      </aside>
    </>
  )
}

export default CartDrawer
