import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';

export default function GuestGuard({ children }) {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
