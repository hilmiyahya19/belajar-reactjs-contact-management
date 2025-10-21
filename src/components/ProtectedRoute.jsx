// components/ProtectedRoute.jsx
import { Navigate } from "react-router";
import { useLocalStorage } from "react-use";

export default function ProtectedRoute({ children }) {
  const [token] = useLocalStorage("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
