import { describe, it, expect } from "vitest"
import { formatDate } from "./index"

describe("formatDate", () => {
  it("should format a standard date string correctly", () => {
    const result = formatDate("2024-10-21")
    expect(result).toBe("21-10-2024")
  })

  it("should handle ISO 8601 datetime format", () => {
    const result = formatDate("2024-08-10T00:00:00.000Z")
    expect(result).toBe("10-08-2024")
  })
})
