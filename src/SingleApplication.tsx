import styles from "./SingleApplication.module.css"
import { formatDate } from "./utils"

interface Application {
  company: string
  first_name: string
  last_name: string
  email: string
  loan_amount: number
  date_created: string
  expiry_date: string
}

const SingleApplication = ({ application }: { application: Application }) => {
  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        {application.company}
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        {application.first_name} {application.last_name}
      </div>
      <div className={styles.cell}>
        <sub>Email</sub>
        <a href={`mailto:${application.email}`} className={styles.email}>
          {application.email}
        </a>
      </div>
      <div className={styles.cell}>
        <sub>Loan Amount</sub>
        {application.loan_amount}
      </div>
      <div className={styles.cell}>
        <sub>Application Date</sub>
        {formatDate(application.date_created)}
      </div>
      <div className={styles.cell}>
        <sub>Expiry date</sub>
        {formatDate(application.expiry_date)}
      </div>
    </div>
  )
}

export default SingleApplication
