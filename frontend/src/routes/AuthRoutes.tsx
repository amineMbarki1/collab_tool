import { Routes, Route } from "react-router-dom";
import { Auth, LoginForm, SignupFrom } from "@/features/auth";
export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />}>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupFrom />} />
        <Route path="*" element={<LoginForm />} />
      </Route>
    </Routes>
  );
}
