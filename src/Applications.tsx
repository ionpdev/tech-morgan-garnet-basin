import SingleApplication from "./SingleApplication"
import { Button } from "./components/Button/Button"
import styles from "./Applications.module.css"
import type { Application } from "./hooks/useFetchApplications"

interface ApplicationsProps {
  applications: Application[]
  loading: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
}

const Applications = ({
  applications,
  loading,
  error,
  hasMore,
  loadMore,
}: ApplicationsProps) => {
  if (loading && applications.length === 0) {
    return <div className={styles.Applications}>Loading applications...</div>
  }

  if (error) {
    return <div className={styles.Applications}>Error: {error}</div>
  }

  if (applications.length === 0 && !loading) {
    return <div className={styles.Applications}>No applications found.</div>
  }

  return (
    <div className={styles.Applications}>
      {applications.map((application) => (
        <SingleApplication key={application.id} application={application} />
      ))}

      {hasMore && (
        <div className={styles.ButtonContainer}>
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  )
}

export default Applications
