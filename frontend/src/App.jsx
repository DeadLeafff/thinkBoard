import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import Createpage from "./pages/Createpage"
import NodeDetailPage from "./pages/NodeDetailPage"
import { Toaster } from "react-hot-toast"


const App = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content" data-theme="forest">
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/edit/:id" element={<Createpage />} />
        <Route path="/node/:id" element={<NodeDetailPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App