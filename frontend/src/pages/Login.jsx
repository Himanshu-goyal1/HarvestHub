import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard.jsx'
import { loginRequest } from '../api.js'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await loginRequest({ email, password })

      // Backend returns:
      // {
      //   message: "Login successful",
      //   user: {
      //     id,
      //     name,
      //     email,
      //     role
      //   }
      // }

      const role = data.user?.role === 'farmer' ? 'farmer' : 'buyer'
      const name = data.user?.name || email.split('@')[0]

      login({
        name,
        email,
        role
      })

      navigate(role === 'farmer' ? '/farmer' : '/buyer')
    } catch (err) {
      setError(err.message || "Couldn't log in. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard activeTab="login">
      <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
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
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </AuthCard>
  )
}

export default Login
