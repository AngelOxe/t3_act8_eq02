const API_URL = 'https://dummyjson.com'

// Login acepta un nombre de usuario o un correo. DummyJSON exige username en POST.
async function resolveUsername(identifier) {
  const input = identifier.trim()
  if (!input.includes('@')) return input

  const params = new URLSearchParams({ key: 'email', value: input })
  let response
  try {
    response = await fetch(`${API_URL}/users/filter?${params}`)
  } catch {
    throw new Error('No se pudo conectar con DummyJSON. Revisa tu internet.')
  }
  if (!response.ok) throw new Error('No se pudo consultar el correo. Intenta de nuevo.')
  const data = await response.json()
  const exact = data.users?.find(user => user.email.toLowerCase() === input.toLowerCase())
  if (!exact) throw new Error('Usuario o contraseña incorrectos.')
  return exact.username
}

export async function loginWithDummyJSON(identifier, password) {
  const username = await resolveUsername(identifier)
  let response
  try {
    response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 60 }),
    })
  } catch {
    throw new Error('No fue posible conectar con el servidor. Revisa tu conexión.')
  }
  if (!response.ok) {
    if (response.status === 400 || response.status === 401) {
      throw new Error('Usuario o contraseña incorrectos.')
    }
    throw new Error('No se pudo iniciar sesión. Intenta nuevamente.')
  }
  const user = await response.json()
  if (!user.accessToken || !user.id) throw new Error('La API devolvió una respuesta inválida.')
  return user
}

export async function getCurrentUser(accessToken) {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) throw new Error('Sesión caducada o inválida.')
  return response.json()
}
