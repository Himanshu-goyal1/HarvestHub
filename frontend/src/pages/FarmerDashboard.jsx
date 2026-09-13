import { useMemo, useState } from 'react'
import {
  IndianRupee,
  PackageCheck,
  LayoutGrid,
  Warehouse,
  TrendingUp,
  AlertTriangle,
  Receipt,
  Upload,
  ClipboardList,
  PlusCircle,
  PackageOpen,
} from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import ToastNotification from '../components/ToastNotification.jsx'
import { useToast } from '../hooks/useToast.js'
import { useAuth } from '../context/AuthContext.jsx'
import {
  CATEGORIES,
  EMOJI_MAP,
  salesThisWeek,
  categorySplit,
  stockLevels,
  recentTransactions,
  initialFarmerListings,
} from '../data/mockListings.js'

const emptyForm = { title: '', category: '', price: '', qty: '', harvest: '', location: '' }

function FarmerDashboard() {
  const { user, logout } = useAuth()
  const { message, showToast } = useToast()

  const [listings, setListings] = useState(initialFarmerListings)
  const [form, setForm] = useState(emptyForm)
  const [nextId, setNextId] = useState(initialFarmerListings.length + 1)

  const activeCategoryCount = useMemo(
    () => new Set(listings.map((l) => l.category)).size,
    [listings],
  )

  const handleFieldChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, category, price, qty, harvest, location } = form
    if (!title.trim() || !category || !price || !qty || !harvest || !location.trim()) return

    setListings((prev) => [
      ...prev,
      {
        id: nextId,
        title: title.trim(),
        category,
        price: Number(price),
        qty: Number(qty),
        harvest,
        location: location.trim(),
        emoji: EMOJI_MAP[category] || '🌱',
      },
    ])
    setNextId((id) => id + 1)
    setForm(emptyForm)
    showToast(`${title.trim()} listed successfully`)
  }

  const formatHarvest = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

  return (
    <div className="min-h-screen bg-paper">
      <Navbar role="farmer" userName={user?.name} onLogout={logout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-soil">Farmer dashboard</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-forest mt-0.5">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-sm text-ink/60 mt-1">
            Here's how your listings are performing this month.
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-line rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink/50">Total revenue</span>
              <IndianRupee className="w-3.5 h-3.5 text-leaf" />
            </div>
            <p className="font-mono text-xl sm:text-2xl font-bold text-forest mt-1.5">₹1,84,250</p>
            <p className="text-[11px] text-leaf mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12.4% vs last month
            </p>
          </div>

          <div className="bg-white border border-line rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink/50">Orders fulfilled</span>
              <PackageCheck className="w-3.5 h-3.5 text-leaf" />
            </div>
            <p className="font-mono text-xl sm:text-2xl font-bold text-forest mt-1.5">63</p>
            <p className="text-[11px] text-leaf mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +8 this week
            </p>
          </div>

          <div className="bg-white border border-line rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink/50">Active listings</span>
              <LayoutGrid className="w-3.5 h-3.5 text-soil" />
            </div>
            <p className="font-mono text-xl sm:text-2xl font-bold text-forest mt-1.5">
              {listings.length}
            </p>
            <p className="text-[11px] text-ink/40 mt-1">
              Across {activeCategoryCount} categor{activeCategoryCount === 1 ? 'y' : 'ies'}
            </p>
          </div>

          <div className="bg-white border border-line rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink/50">Stock remaining</span>
              <Warehouse className="w-3.5 h-3.5 text-rust" />
            </div>
            <p className="font-mono text-xl sm:text-2xl font-bold text-forest mt-1.5">1,240kg</p>
            <p className="text-[11px] text-rust mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> 1 crop running low
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
          {/* Sales chart */}
          <div className="bg-white border border-line rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-lg text-forest">Sales this week</h2>
              <span className="text-xs font-mono text-ink/40">in ₹</span>
            </div>
            <div className="flex items-end justify-between gap-2 sm:gap-4 h-40">
              {salesThisWeek.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-mono text-ink/40">{d.label}</span>
                  <div
                    className={`w-full rounded-t-md transition-[height] duration-700 ${d.barClass}`}
                    style={{ height: `${d.height}%` }}
                  />
                  <span className={`text-[11px] ${d.peak ? 'font-semibold text-forest' : 'text-ink/50'}`}>
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Category split */}
          <div className="bg-white border border-line rounded-2xl p-5 sm:p-6">
            <h2 className="font-display font-semibold text-lg text-forest mb-5">
              Revenue by category
            </h2>
            <div className="space-y-4">
              {categorySplit.map((c) => (
                <div key={c.category}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${c.dotClass}`} />
                      {c.category}
                    </span>
                    <span className="font-mono text-ink/60">
                      ₹{c.revenue.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-line rounded-full">
                    <div
                      className={`h-2 rounded-full ${c.barClass}`}
                      style={{ width: `${c.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
          {/* Stock left to sell */}
          <div className="bg-white border border-line rounded-2xl p-5 sm:p-6">
            <h2 className="font-display font-semibold text-lg text-forest mb-4 flex items-center gap-2">
              <Warehouse className="w-4 h-4" /> Stock left to sell
            </h2>
            <div className="space-y-4">
              {stockLevels.map((s) => (
                <div key={s.title}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium">
                      {s.emoji} {s.title}
                    </span>
                    <span className="font-mono text-xs text-ink/50">
                      {s.remaining} / {s.total}kg
                    </span>
                  </div>
                  <div className="w-full h-2 bg-line rounded-full">
                    <div
                      className={`h-2 rounded-full ${s.barClass}`}
                      style={{ width: `${s.percent}%` }}
                    />
                  </div>
                  {s.warning && (
                    <p className="text-[11px] text-rust mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> {s.warning}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent transactions */}
          <div className="bg-white border border-line rounded-2xl p-5 sm:p-6">
            <h2 className="font-display font-semibold text-lg text-forest mb-4 flex items-center gap-2">
              <Receipt className="w-4 h-4" /> Recent transactions
            </h2>
            <div className="space-y-3">
              {recentTransactions.map((t, i) => (
                <div
                  key={t.id}
                  className={`flex items-center gap-3 ${
                    i < recentTransactions.length - 1 ? 'pb-3 border-b border-line' : ''
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 ${t.iconBg}`}
                  >
                    {t.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {t.buyer} <span className="text-ink/40 font-normal">bought {t.item}</span>
                    </p>
                    <p className="text-[11px] text-ink/40">{t.meta}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-sm font-semibold text-forest">
                      ₹{t.amount.toLocaleString('en-IN')}
                    </p>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${t.statusClass}`}
                    >
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Crop listing management */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          <div className="bg-white border border-line rounded-2xl p-6 h-fit">
            <h2 className="font-display font-semibold text-lg text-forest mb-4 flex items-center gap-2">
              <Upload className="w-4 h-4" /> List a crop
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink/60 mb-1.5" htmlFor="cropTitle">
                  Crop name
                </label>
                <input
                  id="cropTitle"
                  required
                  type="text"
                  placeholder="e.g. Alphonso Mangoes"
                  value={form.title}
                  onChange={handleFieldChange('title')}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-line text-sm focus:border-leaf outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="block text-xs font-medium text-ink/60 mb-1.5"
                    htmlFor="cropCategory"
                  >
                    Category
                  </label>
                  <select
                    id="cropCategory"
                    required
                    value={form.category}
                    onChange={handleFieldChange('category')}
                    className="w-full px-3 py-2.5 rounded-lg border border-line text-sm focus:border-leaf outline-none bg-white"
                  >
                    <option value="">Select…</option>
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-xs font-medium text-ink/60 mb-1.5"
                    htmlFor="cropPrice"
                  >
                    Price (₹/kg)
                  </label>
                  <input
                    id="cropPrice"
                    required
                    type="number"
                    min="1"
                    placeholder="e.g. 60"
                    value={form.price}
                    onChange={handleFieldChange('price')}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-line text-sm focus:border-leaf outline-none font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="block text-xs font-medium text-ink/60 mb-1.5"
                    htmlFor="cropQuantity"
                  >
                    Quantity (kg)
                  </label>
                  <input
                    id="cropQuantity"
                    required
                    type="number"
                    min="1"
                    placeholder="e.g. 300"
                    value={form.qty}
                    onChange={handleFieldChange('qty')}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-line text-sm focus:border-leaf outline-none font-mono"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-medium text-ink/60 mb-1.5"
                    htmlFor="cropHarvest"
                  >
                    Harvest date
                  </label>
                  <input
                    id="cropHarvest"
                    required
                    type="date"
                    value={form.harvest}
                    onChange={handleFieldChange('harvest')}
                    className="w-full px-3 py-2.5 rounded-lg border border-line text-sm focus:border-leaf outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-xs font-medium text-ink/60 mb-1.5"
                  htmlFor="cropLocation"
                >
                  Location
                </label>
                <input
                  id="cropLocation"
                  required
                  type="text"
                  placeholder="e.g. Nashik, Maharashtra"
                  value={form.location}
                  onChange={handleFieldChange('location')}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-line text-sm focus:border-leaf outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-soil text-paper font-medium text-sm py-3 rounded-lg hover:bg-soil/90 transition-colors flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" /> Post listing
              </button>
            </form>
          </div>

          <div className="bg-white border border-line rounded-2xl p-6">
            <h2 className="font-display font-semibold text-lg text-forest mb-4 flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> Your active listings
            </h2>
            <div className="overflow-x-auto">
              {listings.length === 0 ? (
                <div className="text-center py-12">
                  <PackageOpen className="w-8 h-8 mx-auto text-ink/30 mb-3" />
                  <p className="text-sm text-ink/50">
                    Nothing posted yet — use the form to list your first crop.
                  </p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wide text-ink/40 border-b border-line">
                      <th className="pb-2.5 pr-3 font-medium">Crop</th>
                      <th className="pb-2.5 pr-3 font-medium">Category</th>
                      <th className="pb-2.5 pr-3 font-medium text-right">Price/kg</th>
                      <th className="pb-2.5 pr-3 font-medium text-right">Stock</th>
                      <th className="pb-2.5 font-medium">Harvest</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {listings.map((item) => (
                      <tr key={item.id} className="text-sm">
                        <td className="py-2.5 pr-3 font-medium">
                          {item.emoji} {item.title}
                        </td>
                        <td className="py-2.5 pr-3 text-ink/60">{item.category}</td>
                        <td className="py-2.5 pr-3 text-right font-mono">₹{item.price}</td>
                        <td className="py-2.5 pr-3 text-right font-mono">{item.qty}kg</td>
                        <td className="py-2.5 text-ink/60">{formatHarvest(item.harvest)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-10 mt-2 border-t border-line text-center">
        <p className="text-xs text-ink/40">
          AgriMarket MVP — academic prototype. Analytics and transactions above are static demo
          data.
        </p>
      </footer>

      <ToastNotification message={message} />
    </div>
  )
}

export default FarmerDashboard
