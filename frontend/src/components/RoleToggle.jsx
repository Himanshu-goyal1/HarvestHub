import { ShoppingBasket, Wheat } from 'lucide-react'

function RoleToggle({ value, onChange }) {
  return (
    <div>
      <span className="block text-xs font-medium text-ink/60 mb-2">I am a</span>
      <div className="grid grid-cols-2 gap-3">
        <label className="cursor-pointer">
          <input
            type="radio"
            name="role"
            value="buyer"
            checked={value === 'buyer'}
            onChange={() => onChange('buyer')}
            className="peer sr-only"
          />
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border-2 border-line peer-checked:border-leaf peer-checked:bg-leaf/10 transition-colors">
            <ShoppingBasket className="w-4 h-4 text-leaf" />
            <span className="text-sm font-medium">Buyer</span>
          </div>
        </label>
        <label className="cursor-pointer">
          <input
            type="radio"
            name="role"
            value="farmer"
            checked={value === 'farmer'}
            onChange={() => onChange('farmer')}
            className="peer sr-only"
          />
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border-2 border-line peer-checked:border-soil peer-checked:bg-soil/10 transition-colors">
            <Wheat className="w-4 h-4 text-soil" />
            <span className="text-sm font-medium">Farmer</span>
          </div>
        </label>
      </div>
    </div>
  )
}

export default RoleToggle
