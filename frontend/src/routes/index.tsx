import ProtectedRoutes from "./ProtectedRoutes";
import AuthRoutes from "./AuthRoutes";
import { useAppStore } from "@/hooks";

export function AppRoutes() {
  const { useAppSelector } = useAppStore();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? <ProtectedRoutes /> : <AuthRoutes />;
}
