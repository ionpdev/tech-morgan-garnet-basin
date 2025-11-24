import { useState, useEffect } from "react"

type Application = {
  id: number
  guid?: string
  loan_amount: number
  first_name: string
  last_name: string
  company: string
  email: string
  date_created: string
  expiry_date: string
}

type UseFetchApplicationsResult = {
  applications: Application[]
  loading: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
  addApplication: (application: Application) => void
}

export type { Application }

const API_BASE_URL = "http://localhost:3001/api"
const LIMIT = 5

export const useFetchApplications = (): UseFetchApplicationsResult => {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${API_BASE_URL}/applications?_page=${page}&_limit=${LIMIT}`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch applications: ${response.status}`)
        }

        const data: Application[] = await response.json()

        // here we are parse Link header to determine if there are more pages
        const linkHeader = response.headers.get("Link")
        if (linkHeader) {
          // here we are checking if there's a "next" link in the Link header
          setHasMore(linkHeader.includes('rel="next"'))
        } else {
          setHasMore(false)
        }

        // add new applications to existing ones in already fetched data
        setApplications((prev) => (page === 1 ? data : [...prev, ...data]))
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [page])

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1)
    }
  }

  const addApplication = (application: Application) => {
    // simple optimistic ui update
    setApplications((prev) => [...prev, application])
  }

  return { applications, loading, error, hasMore, loadMore, addApplication }
}
