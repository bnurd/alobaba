import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useAuth } from "~/shared/providers/auth-provider";

// the layout for check if the user is authenticated
export default function AuthorizeLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      void navigate("/sign-in");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <Outlet />;
  }

  return null;
}
