import { Outlet } from "react-router";

import LayoutHeader from "~/shared/components/layout-header";
import { LayoutHeaderProvider } from "~/shared/providers/layout-header-provider";

export default function Layout() {
  return (
    <LayoutHeaderProvider>
      <div>
        <LayoutHeader />
        <Outlet />
      </div>
    </LayoutHeaderProvider>
  );
}
