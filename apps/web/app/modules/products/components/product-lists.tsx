import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

import { useLayoutHeader } from "~/shared/providers/layout-header-provider";
import { Button } from "~/shared/ui/button";

export function ProductLists() {
  const { setShowFilter } = useLayoutHeader();

  return (
    <div className="grow">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-800 md:text-sm">Showing 10,000+ products</p>
        <button className="cursor-pointer" onClick={() => setShowFilter(prev => !prev)}>
          <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600 md:hidden" />
        </button>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 md:mt-5 md:gap-4 xl:grid-cols-4">
        {[1, 2, 3, 4, 6, 7, 8, 9, 9, 9, 9].map((_, idx) => (
          <div key={idx} className="rounded-lg p-1 md:bg-white md:p-4 md:shadow">
            <Link to={`products/${idx}`}>
              <div className="mb-4 h-[200px] w-full overflow-hidden rounded-lg sm:h-[250px] md:h-[280px]">
                <img
                  src="https://down-id.img.susercontent.com/file/id-11134207-7qukx-lh6ezwo582f708"
                  className="h-full w-full object-cover object-center transition-all duration-700 hover:scale-110"
                />
              </div>
            </Link>
            <Link
              to={`products/${idx}`}
              className="hover:text-primary-700 mb-3 line-clamp-2 text-sm"
            >
              High Quality Used Original for iPhone 13pro 13pro Max Smartphone Fully Unlocked Dual
              SIM 5G LTE Second Hand Mobile Phone for Sal
            </Link>
            <h2 className="mb-3 text-xl font-semibold">Rp122.000.000</h2>
            <p className="mb-2 text-sm text-gray-600">Min. order: 2 piecies</p>
            <p className="mb-5 text-sm text-gray-600">4 Terjual</p>
            <Button
              size="sm"
              color="secondary"
              variant="outlined"
              className="hidden w-full md:flex"
            >
              Add to cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
