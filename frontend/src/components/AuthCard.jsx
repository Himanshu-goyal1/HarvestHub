import { Sprout } from 'lucide-react'
import { Link } from 'react-router-dom'

function AuthCard({ activeTab, children }) {
  const tabBase = 'flex-1 text-center text-sm font-medium py-2 rounded-full transition-colors'

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-2xl border border-line shadow-2xl overflow-hidden">
        <div className="px-8 pt-8 pb-6 text-center border-b border-line">
          <div className="mx-auto w-11 h-11 rounded-full bg-forest text-paper flex items-center justify-center mb-3">
            <Sprout className="w-5 h-5" />
          </div>
          <h1 className="font-display text-2xl font-bold text-forest">AgriMarket</h1>
          <p className="text-sm text-ink/60 mt-1">Direct from the field to the buyer.</p>
        </div>

        <div className="flex px-8 pt-5 gap-1" role="tablist">
          <Link
            to="/login"
            role="tab"
            aria-selected={activeTab === 'login'}
            className={`${tabBase} ${activeTab === 'login' ? 'bg-forest text-paper' : 'text-ink/60'}`}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            role="tab"
            aria-selected={activeTab === 'signup'}
            className={`${tabBase} ${activeTab === 'signup' ? 'bg-forest text-paper' : 'text-ink/60'}`}
          >
            Sign up
          </Link>
        </div>

        {children}
      </div>
    </div>
  )
}

export default AuthCard
