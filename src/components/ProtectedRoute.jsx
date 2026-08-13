import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-900 flex items-center justify-center text-muted">
        Chargement…
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  return children;
}
