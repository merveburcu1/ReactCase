import { Navigate } from "react-router-dom";
import { useAuthStore } from "../app/store/authStore";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/login" replace />; /*zustanddan isloading değerini okuyorum eğer kullanıcı giriş yapmadıysa login sayfasına yönlenddiriyorum*/

  return <>{children}</>;
}
