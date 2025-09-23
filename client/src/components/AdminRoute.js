import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user || !user.isAdmin) {
    return <Navigate to="/" />; // redirect if not admin
  }

  return children;
}

export default AdminRoute;
