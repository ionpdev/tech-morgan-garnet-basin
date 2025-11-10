import { renderHook, waitFor } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { useFetchApplications } from "./useFetchApplications"

const mockApplicationsPage1 = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    loan_amount: 10000,
    company: "Company A",
    email: "john@example.com",
    date_created: "2021-01-01",
    expiry_date: "2021-12-31",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    loan_amount: 20000,
    company: "Company B",
    email: "jane@example.com",
    date_created: "2021-02-01",
    expiry_date: "2021-12-31",
  },
]

const mockApplicationsPage2 = [
  {
    id: 3,
    first_name: "Bob",
    last_name: "Johnson",
    loan_amount: 30000,
    company: "Company C",
    email: "bob@example.com",
    date_created: "2021-03-01",
    expiry_date: "2021-12-31",
  },
]

describe("useFetchApplications", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    globalThis.fetch = vi.fn()
  })

  it("should fetch applications on initial load", async () => {
    const mockFetch = globalThis.fetch as ReturnType<typeof vi.fn>
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApplicationsPage1,
      headers: new Headers({
        Link: '<http://localhost:3001/api/applications?_page=2&_limit=5>; rel="next"',
      }),
    })

    const { result } = renderHook(() => useFetchApplications())

    expect(result.current.loading).toBe(true)
    expect(result.current.applications).toEqual([])

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.applications).toEqual(mockApplicationsPage1)
    expect(result.current.hasMore).toBe(true)
    expect(result.current.error).toBe(null)
  })

  it("should load more applications when loadMore is called", async () => {
    const mockFetch = globalThis.fetch as ReturnType<typeof vi.fn>

    // first page
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApplicationsPage1,
      headers: new Headers({
        Link: '<http://localhost:3001/api/applications?_page=2&_limit=5>; rel="next"',
      }),
    })

    const { result } = renderHook(() => useFetchApplications())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.applications).toHaveLength(2)

    // second page
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApplicationsPage2,
      headers: new Headers({
        Link: '<http://localhost:3001/api/applications?_page=1&_limit=5>; rel="prev"',
      }),
    })

    result.current.loadMore()

    await waitFor(() => {
      expect(result.current.applications).toHaveLength(3)
    })

    expect(result.current.applications).toEqual([
      ...mockApplicationsPage1,
      ...mockApplicationsPage2,
    ])
    expect(result.current.hasMore).toBe(false)
  })

  it("should set hasMore to false when there is no next link", async () => {
    const mockFetch = globalThis.fetch as ReturnType<typeof vi.fn>
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApplicationsPage1,
      headers: new Headers({
        Link: '<http://localhost:3001/api/applications?_page=1&_limit=5>; rel="first"',
      }),
    })

    const { result } = renderHook(() => useFetchApplications())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.hasMore).toBe(false)
  })

  it("should handle fetch errors", async () => {
    const mockFetch = globalThis.fetch as ReturnType<typeof vi.fn>
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    const { result } = renderHook(() => useFetchApplications())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe("Failed to fetch applications: 500")
    expect(result.current.applications).toEqual([])
  })

  it("should handle network errors", async () => {
    const mockFetch = globalThis.fetch as ReturnType<typeof vi.fn>
    mockFetch.mockRejectedValueOnce(new Error("Network error"))

    const { result } = renderHook(() => useFetchApplications())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe("Network error")
    expect(result.current.applications).toEqual([])
  })

  it("should not load more when already loading", async () => {
    const mockFetch = globalThis.fetch as ReturnType<typeof vi.fn>
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockApplicationsPage1,
      headers: new Headers({
        Link: '<http://localhost:3001/api/applications?_page=2&_limit=5>; rel="next"',
      }),
    })

    const { result } = renderHook(() => useFetchApplications())

    result.current.loadMore()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it("should not load more when hasMore is false", async () => {
    const mockFetch = globalThis.fetch as ReturnType<typeof vi.fn>
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApplicationsPage1,
      headers: new Headers({}),
    })

    const { result } = renderHook(() => useFetchApplications())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.hasMore).toBe(false)

    result.current.loadMore()

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })
})
