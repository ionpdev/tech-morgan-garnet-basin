import { useState } from "react"
import "./App.css"
import Header from "./Header"
import { Modal } from "./components/Modal/Modal"
import { CreateApplicationForm } from "./components/CreateApplicationForm/CreateApplicationForm"
import { Button } from "./components/Button/Button"
import { ApplicationsProvider } from "./context/ApplicationsProvider"
import { useFetchApplications } from "./hooks/useFetchApplications"
import Applications from "./Applications"

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { applications, loading, error, hasMore, loadMore, addApplication } =
    useFetchApplications()

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <ApplicationsProvider onAddApplication={addApplication}>
      <div className="App">
        <Header />
        <div className="create-button-container">
          <Button onClick={handleOpenModal}>+ Create Application</Button>
        </div>

        <Applications
          applications={applications}
          loading={loading}
          error={error}
          hasMore={hasMore}
          loadMore={loadMore}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Create New Application"
        >
          <CreateApplicationForm onSuccess={handleCloseModal} />
        </Modal>
      </div>
    </ApplicationsProvider>
  )
}

export default App
