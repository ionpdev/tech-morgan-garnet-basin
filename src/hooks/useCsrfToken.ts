import { useState, useEffect } from "react"

const API_BASE_URL = "http://localhost:3001/api"

export const useCsrfToken = () => {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/xcsrftoken`)
        if (!response.ok) {
          throw new Error("Failed to fetch CSRF token")
        }
        const data = await response.json()
        setToken(data.xcsrftoken)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchToken()
  }, [])

  return { token, loading, error }
}
