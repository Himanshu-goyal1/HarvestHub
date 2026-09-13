import { MapPin, Plus } from 'lucide-react'

function ProduceCard({ item, onAddToCart }) {
  const stampLabel = item.category.split(' ')[0]

  return (
    <div className="card-hover bg-white border border-line rounded-2xl overflow-hidden flex flex-col">
      <div className="relative h-36 bg-gradient-to-br from-leaf/15 to-harvest/15 flex items-center justify-center">
        <span className="text-5xl">{item.emoji}</span>
        <span className="stamp absolute top-3 left-3 text-[10px] font-mono font-semibold uppercase tracking-wide px-2.5 py-1 text-forest">
          {stampLabel}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display font-semibold text-base leading-snug">{item.title}</h3>
        <p className="text-xs text-ink/50 mt-1 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {item.location}
        </p>
        <p className="text-xs text-ink/40 mt-0.5">Sold by {item.seller}</p>
        <div className="flex items-end justify-between mt-3">
          <div>
            <span className="font-mono text-lg font-bold text-forest">₹{item.price}</span>
            <span className="text-xs text-ink/40">/kg</span>
          </div>
          <span className="text-[11px] text-ink/40 font-mono">{item.qty}kg left</span>
        </div>
        <button
          onClick={() => onAddToCart(item.id)}
          className="mt-3 w-full bg-forest text-paper text-sm font-medium py-2.5 rounded-lg hover:bg-forest/90 transition-colors flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProduceCard
