import {
  GlobeAltIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { Button } from "~/shared/ui/button";
import { Tooltip } from "~/shared/ui/tooltip";

export default function LayoutHeader() {
  return (
    <header className="border-b border-b-gray-300 bg-white">
      <div className="max-w-8xl bg-red-5 mx-auto flex w-full items-center px-10">
        <h1 className="text-primary-500 text-2xl font-semibold">Alobaba.com</h1>
        <div className="w-full px-8 py-4 md:w-1/2">
          <div className="focus-within:border-primary-500 focus-within:ring-primary-500 flex items-center rounded-full border border-gray-800 px-1.5 py-1 text-base focus-within:ring">
            <input
              className="w-full px-6 focus:outline-none"
              placeholder="Search anything products..."
            />
            <Button className="shrink-0" size="sm" icon={<MagnifyingGlassIcon />}>
              Search
            </Button>
          </div>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-8">
          <button className="flex cursor-pointer items-center text-sm">
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
              <button className="flex cursor-pointer text-sm hover:underline">
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
          <Button variant="filled" size="sm">
            Create Acocunt
          </Button>
        </div>
      </div>
    </header>
  );
}
