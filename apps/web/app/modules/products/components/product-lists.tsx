import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router";

import { useUpdateCart } from "~/modules/cart/mutations/use-update-cart";
import { useGetAllProducts } from "~/modules/products/queries/use-get-all-products";
import ArrayForEach from "~/shared/components/array-foreach";
import { useAuth } from "~/shared/providers/auth-provider";
import { useLayoutHeader } from "~/shared/providers/layout-header-provider";
import { Button } from "~/shared/ui/button";
import { formatIDR } from "~/shared/utils/utils";

export function ProductLists() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const products = useGetAllProducts();

  const { setShowFilter } = useLayoutHeader();
  const updateCartMutation = useUpdateCart();

  return (
    <div className="grow">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-800 md:text-sm">Showing {products.data?.length} products</p>
        <button className="cursor-pointer" onClick={() => setShowFilter(prev => !prev)}>
          <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600 md:hidden" />
        </button>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 md:mt-5 md:gap-4 xl:grid-cols-4">
        {products.isLoading && (
          <ArrayForEach length={10}>
            {idx => (
              <div key={idx} className="rounded-lg p-1 md:bg-white md:p-4 md:shadow">
                <div className="mb-3 h-[200px] w-full animate-pulse overflow-hidden rounded-lg bg-gray-100 sm:h-[250px] md:h-[280px]" />
                <div className="mb-5 h-5 w-full bg-gray-100 sm:h-[1px] md:h-4" />
                <div className="mb-5 h-5 w-full bg-gray-100 sm:h-[1px] md:h-9" />
                <div className="hidden h-5 w-full rounded-full bg-gray-100 sm:h-[1px] md:block md:h-9" />
              </div>
            )}
          </ArrayForEach>
        )}
        {products.data?.map(product => (
          <div key={product.id} className="rounded-lg p-1 md:bg-white md:p-4 md:shadow">
            <Link to={`products/${product.slug}`}>
              <div className="mb-4 h-[200px] w-full overflow-hidden rounded-lg sm:h-[250px] md:h-[280px]">
                <img
                  src={product.imageUrl ?? "/placeholder.png"}
                  className="h-full w-full object-cover object-center transition-all duration-700 hover:scale-110"
                />
              </div>
            </Link>
            <Link
              to={`products/${product.slug}`}
              className="hover:text-primary-700 mb-3 line-clamp-2 text-sm"
            >
              {product.name}
            </Link>
            <h2 className="mb-3 text-xl font-semibold">{formatIDR(Number(product.price))}</h2>
            <p className="mb-2 text-sm text-gray-600">
              Min. order: {product.minumumOrderQuantity} piecies
            </p>
            <p className="mb-5 text-sm text-gray-600">Stock {product.stockQuantity}</p>
            <Button
              size="sm"
              color="secondary"
              variant="outlined"
              className="hidden w-full md:flex"
              isLoading={
                updateCartMutation.isPending &&
                updateCartMutation.variables.productId === product.id
              }
              onClick={() => {
                if (!isAuthenticated) {
                  // redirect to sign-in page with follow_up query param to add to cart
                  void navigate(
                    `/sign-in?follow_up=${btoa(`action=add_cart&product_id=${product.id}`)}`
                  );
                  return;
                }
                updateCartMutation.mutate({
                  productId: product.id,
                  quantity: 1,
                  type: "add",
                });
              }}
            >
              Add to cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
