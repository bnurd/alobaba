import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useAuth } from "~/shared/providers/auth-provider";

// the layout for check if the user is authenticated
export default function AuthorizeLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void navigate("/sign-in");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isAuthenticated) {
    return <Outlet />;
  }

  return null;
}
