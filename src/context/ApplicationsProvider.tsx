import type { ReactNode } from "react"
import { ApplicationsContext } from "./applicationsContext"
import type { Application } from "../hooks/useFetchApplications"

type ApplicationsProviderProps = {
  children: ReactNode
  onAddApplication: (application: Application) => void
}

export const ApplicationsProvider = ({
  children,
  onAddApplication,
}: ApplicationsProviderProps) => {
  return (
    <ApplicationsContext.Provider
      value={{ addNewApplication: onAddApplication }}
    >
      {children}
    </ApplicationsContext.Provider>
  )
}
