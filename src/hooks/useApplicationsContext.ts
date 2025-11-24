import { useContext } from "react"
import { ApplicationsContext } from "../context/applicationsContext"

export const useApplicationsContext = () => {
  const context = useContext(ApplicationsContext)
  if (!context) {
    throw new Error(
      "useApplicationsContext must be used within ApplicationsProvider"
    )
  }
  return context
}
