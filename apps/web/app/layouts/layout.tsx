import { Outlet } from "react-router";

import LayoutHeader from "~/shared/components/layout-header";
import { AuthProvider } from "~/shared/providers/auth-provider";
import { LayoutHeaderProvider } from "~/shared/providers/layout-header-provider";

export default function Layout() {
  return (
    <AuthProvider>
      <LayoutHeaderProvider>
        <div>
          <LayoutHeader />
          <Outlet />
        </div>
      </LayoutHeaderProvider>
    </AuthProvider>
  );
}
