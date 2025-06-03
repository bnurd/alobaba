import {
  GlobeAltIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";

import { useLogout } from "~/modules/auth/mutations/use-logout";
import CartHeaderMenu from "~/modules/cart/components/cart-header-menu";
import SearchHeader from "~/shared/components/search-header";
import { useAuth } from "~/shared/providers/auth-provider";
import { Button } from "~/shared/ui/button";
import { Tooltip } from "~/shared/ui/tooltip";

export default function LayoutHeader() {
  const { isAuthenticated, user } = useAuth();

  const logoutMutation = useLogout();

  return (
    <header className="sticky top-0 z-[99] border-b border-b-gray-300 bg-white">
      <div className="max-w-8xl bg-red-5 mx-auto flex w-full items-center px-2 md:px-10">
        <Link to="/">
          <h1 className="text-primary-500 font-semibold md:text-2xl">Alobaba.com</h1>
        </Link>
        <SearchHeader />
        {/** Show on mobile */}
        <div className="flex grow-0 items-center gap-4 sm:hidden">
          <Link to={`/cart`}>
            <ShoppingCartIcon className="h-5 w-5" />
          </Link>
          <Link to={`/sign-in`} className="flex items-center">
            <UserCircleIcon className="h-5 w-5" />
          </Link>
        </div>
        {/** Show on tablet and desktop */}
        <div className="ml-auto hidden shrink-0 items-center gap-8 sm:flex">
          <button className="hidden cursor-pointer items-center text-sm lg:flex">
            <GlobeAltIcon className="mr-2 h-6 w-6" />
            Indonesia - IDR
          </button>
          <CartHeaderMenu />
          <Tooltip
            trigger={
              <button className="flex cursor-pointer items-center text-sm hover:underline">
                <UserIcon className="mr-2 h-6 w-6" />
                {isAuthenticated ? (user?.name.split(" ")[0] ?? "-") : "Sign In"}
              </button>
            }
            className="min-w-[300px]"
          >
            {isAuthenticated && (
              <Button
                className="w-full"
                size="sm"
                variant="outlined"
                onClick={() => logoutMutation.mutate()}
                isLoading={logoutMutation.isPending}
              >
                Sign Out
              </Button>
            )}
            {!isAuthenticated && (
              <>
                <p className="mb-4 text-sm font-semibold">Welcome to Alobaba.com</p>
                <Link to="/sign-in">
                  <Button className="w-full" size="sm">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </Tooltip>
          {!isAuthenticated && (
            <Link to="/sign-up">
              <Button variant="filled" size="sm" className="hidden lg:block">
                Create Acocunt
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
