import { Route, Routes } from "react-router-dom"
import "./App.css"
import Login from "./features/login/login"
import Register from "./features/register/register"
import Notes from "./features/notes/notes"
import Auth from "./features/auth/auth"
import Index from "./features/index"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

import { selectAuth } from "./features/auth/authSlice"
import { useSelector } from "react-redux"

const App = () => {
  const isAuthenticated = useSelector(selectAuth)

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route element={<Auth />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route
        path="notes"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Notes />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
