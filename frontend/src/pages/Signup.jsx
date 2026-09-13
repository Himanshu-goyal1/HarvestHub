import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard.jsx'
import RoleToggle from '../components/RoleToggle.jsx'
import { signupRequest } from '../api.js'
import { useAuth } from '../context/AuthContext.jsx'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('buyer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await signupRequest({
        name,
        email,
        password,
        role
      })

      // Backend response:
      // {
      //   message: "Account created successfully",
      //   user: {
      //     name,
      //     email,
      //     role
      //   }
      // }

      const finalRole =
        data.user?.role === 'farmer' || data.user?.role === 'buyer'
          ? data.user.role
          : role

      const finalName = data.user?.name || name
      const finalEmail = data.user?.email || email

      login({
        name: finalName,
        email: finalEmail,
        role: finalRole
      })

      navigate(finalRole === 'farmer' ? '/farmer' : '/buyer')
    } catch (err) {
      setError(
        err.message || "Couldn't create your account. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard activeTab="signup">
      <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
        <div>
          <label
            className="block text-xs font-medium text-ink/60 mb-1.5"
            htmlFor="name"
          >
            Full name
          </label>

          <input
            id="name"
            type="text"
            required
            placeholder="e.g. Ramesh Yadav"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-sm focus:border-leaf outline-none"
          />
        </div>

        <div>
          <label
            className="block text-xs font-medium text-ink/60 mb-1.5"
            htmlFor="email"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-sm focus:border-leaf outline-none"
          />
        </div>

        <div>
          <label
            className="block text-xs font-medium text-ink/60 mb-1.5"
            htmlFor="password"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-sm focus:border-leaf outline-none"
          />
        </div>

        <RoleToggle value={role} onChange={setRole} />

        {error && (
          <p className="text-xs text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-forest text-paper font-medium text-sm py-3 rounded-lg hover:bg-forest/90 transition-colors disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthCard>
  )
}

export default Signup
