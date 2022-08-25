import { Navigate, Outlet } from "react-router-dom";

export default function PrivateOutlet({ user }) {
  let auth = false;
  if (user && user.length > 0) {
    auth = true;
  } else {
    auth = false;
  }
  return auth ? <Outlet /> : <Navigate to="/" />;
}
