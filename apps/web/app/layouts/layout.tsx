import { Outlet } from "react-router";

import LayoutHeader from "~/shared/components/layout-header";

export default function Layout() {
  return (
    <div>
      <LayoutHeader />
      <Outlet />
    </div>
  );
}
