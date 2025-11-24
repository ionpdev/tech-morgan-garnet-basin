import { createContext } from "react"
import type { Application } from "../hooks/useFetchApplications"

export type ApplicationsContextType = {
  addNewApplication: (application: Application) => void
}

export const ApplicationsContext = createContext<
  ApplicationsContextType | undefined
>(undefined)
