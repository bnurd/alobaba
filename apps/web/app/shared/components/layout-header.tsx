import {
  GlobeAltIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { Button } from "~/shared/ui/button";
import { Tooltip } from "~/shared/ui/tooltip";

export default function LayoutHeader() {
  return (
    <header className="sticky top-0 z-[99] border-b border-b-gray-300 bg-white">
      <div className="max-w-8xl bg-red-5 mx-auto flex w-full items-center px-2 md:px-10">
        <h1 className="text-primary-500 font-semibold md:text-2xl">Alobaba.com</h1>
        <div className="w-full px-4 py-3 md:px-8 md:py-4 lg:w-1/2">
          <div className="focus-within:border-primary-500 focus-within:ring-primary-500 flex items-center rounded-full border border-gray-100 bg-gray-100 px-1.5 py-1 text-base focus-within:ring md:border-gray-800 md:bg-transparent">
            <MagnifyingGlassIcon className="h-3 w-3 text-gray-600 md:hidden" />
            <input
              className="w-full cursor-pointer px-2 text-xs focus:outline-none md:cursor-text md:px-6 md:text-base"
              placeholder="Search anything products..."
            />
            <Button className="hidden shrink-0 md:flex" size="sm" icon={<MagnifyingGlassIcon />}>
              Search
            </Button>
          </div>
        </div>
        {/** Show on mobile */}
        <div className="flex grow-0 items-center gap-4 sm:hidden">
          <button>
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
          <button>
            <UserCircleIcon className="h-5 w-5" />
          </button>
        </div>
        {/** Show on tablet and desktop */}
        <div className="ml-auto hidden shrink-0 items-center gap-8 sm:flex">
          <button className="hidden cursor-pointer items-center text-sm lg:flex">
            <GlobeAltIcon className="mr-2 h-6 w-6" />
            Indonesia - IDR
          </button>
          <Tooltip
            trigger={
              <button className="cursor-pointer text-sm">
                <ShoppingCartIcon className="h-6 w-6" />
              </button>
            }
            className="min-w-[300px]"
          >
            <p className="font-semibold">Shopping cart</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-2">
              <img src="/empty-cart.png" className="w-[100px] text-center" />
              <p className="font-semibold">Your cart is empty</p>
            </div>
            <Button variant="outlined" color="secondary" size="sm" className="mt-4 w-full">
              Go to cart
            </Button>
          </Tooltip>
          <Tooltip
            trigger={
              <button className="flex cursor-pointer items-center text-sm hover:underline">
                <UserIcon className="mr-2 h-6 w-6" />
                Sign In
              </button>
            }
            className="min-w-[300px]"
          >
            <p className="mb-4 text-sm font-semibold">Welcome to Alobaba.com</p>
            <Button className="w-full" size="sm">
              Sign In
            </Button>
          </Tooltip>
          <Button variant="filled" size="sm" className="hidden lg:block">
            Create Acocunt
          </Button>
        </div>
      </div>
    </header>
  );
}
