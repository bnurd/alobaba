import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";

import { useAuth } from "~/shared/providers/auth-provider";

// the layout for check if the user is unauthenticated
export default function UnauthorizeLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      void navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div>
        <header className="sticky top-0 z-[99] border-b border-b-gray-300 bg-white py-3 md:py-4">
          <div className="max-w-8xl bg-red-5 mx-auto flex w-full items-center px-2 md:px-10">
            <Link to="/">
              <h1 className="text-primary-500 font-semibold md:text-2xl">Alobaba.com</h1>
            </Link>
          </div>
        </header>
        <Outlet />
      </div>
    );
  }

  return null;
}
