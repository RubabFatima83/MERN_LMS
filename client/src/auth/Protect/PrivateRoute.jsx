import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading || !user) return <p>Loading...</p>
  return (!isAuthenticated) ? <Outlet /> : <Navigate to="/login" replace />

}

export default PrivateRoute
