// Talks to the backend the App.jsx / login.jsx scaffold was already calling.
// Adjust API_BASE if your backend runs somewhere other than localhost:5000.
const API_BASE = 'http://localhost:5000'

async function request(path, body) {
  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error(
      `Couldn't reach the server at ${API_BASE}. Is the backend running?`,
    )
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.')
  }

  return data
}

// Expects { name, email, password, role } and, ideally, a response that
// echoes back { name, role } so the UI knows which dashboard to open.
export const signupRequest = (payload) => request('/signup', payload)

// Expects { email, password } and, ideally, a response containing
// { name, role } for the account that just logged in.
export const loginRequest = (payload) => request('/login', payload)
