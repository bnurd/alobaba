import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

import { useGetAllCart } from "~/modules/cart/queires/use-get-all-cart";
import { useAuth } from "~/shared/providers/auth-provider";
import { Button } from "~/shared/ui/button";
import { Tooltip } from "~/shared/ui/tooltip";
import { formatIDR } from "~/shared/utils/utils";

const CartHeaderMenu = () => {
  const { isAuthenticated } = useAuth();
  const carts = useGetAllCart();

  const filteredCarts = carts.data?.slice(0, 3);

  return (
    <Tooltip
      trigger={
        <button className="cursor-pointer text-sm">
          <ShoppingCartIcon className="h-6 w-6" />
        </button>
      }
      className="min-w-[300px]"
    >
      <p className="font-semibold">Shopping cart</p>
      {!filteredCarts?.length && (
        <div className="mt-8 flex flex-col items-center justify-center gap-2">
          <img src="/empty-cart.png" className="w-[100px] text-center" />
          <p className="font-semibold">Your cart is empty</p>
        </div>
      )}
      {!!filteredCarts?.length && (
        <div className="mt-4 flex flex-col gap-4">
          {filteredCarts.map(cart => (
            <div key={cart.id} className="flex items-center gap-2">
              <img src={cart.product.imageUrl ?? "/placeholder.png"} className="h-14 w-14" />
              <div className="flex flex-col gap-0.5">
                <p className="line-clamp-1 w-[200px] text-xs">{cart.product.name}</p>
                <p className="w-[200px] text-xs">qty: {cart.quantity}</p>
                <p className="text-xs">
                  Total: {formatIDR(Number(cart.product.price) * cart.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link
        to={isAuthenticated ? "/cart" : `/sign-in?return=${encodeURIComponent("/cart")}`}
        className="mt-4 w-full"
      >
        <Button variant="outlined" color="secondary" size="sm" className="mt-4 w-full">
          Go to cart
        </Button>
      </Link>
    </Tooltip>
  );
};

export default CartHeaderMenu;
