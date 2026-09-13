import { Sprout } from 'lucide-react'
import { Link } from 'react-router-dom'

function Logo({ to = '/', roleBadge }) {
  return (
    <Link to={to} className="flex items-center gap-2 shrink-0">
      <div className="w-8 h-8 rounded-full bg-forest text-paper flex items-center justify-center">
        <Sprout className="w-4 h-4" />
      </div>
      <span className="font-display font-bold text-lg text-forest hidden sm:block">
        AgriMarket
      </span>
      {roleBadge && (
        <span className="hidden sm:inline text-xs font-mono uppercase tracking-wide text-soil bg-soil/10 px-2 py-0.5 rounded-full ml-1">
          {roleBadge}
        </span>
      )}
    </Link>
  )
}

export default Logo
