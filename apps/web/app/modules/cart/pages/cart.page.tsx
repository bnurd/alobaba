import { useMemo, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { match, P } from "ts-pattern";

import { useUpdateCart } from "~/modules/cart/mutations/use-update-cart";
import { useGetAllCart } from "~/modules/cart/queires/use-get-all-cart";
import ArrayForEach from "~/shared/components/array-foreach";
import { Button } from "~/shared/ui/button";
import { Checkbox } from "~/shared/ui/checkbox";
import { formatIDR } from "~/shared/utils/utils";

export default function CartPage() {
  const [selectedCartIds, setSelectedCartsIds] = useState<string[]>([]);

  const carts = useGetAllCart();
  const updateCartMutation = useUpdateCart();

  const calculateSelectedTotalPrice = useMemo(() => {
    return selectedCartIds.reduce((acc, cartId) => {
      const cart = carts.data?.find(cart => cart.id === cartId);
      if (!cart) {
        return acc;
      }
      return acc + Number(cart.product.price) * cart.quantity;
    }, 0);
  }, [carts.data, selectedCartIds]);

  const calculdateSelectedItemCount = useMemo(() => {
    return selectedCartIds.reduce((acc, cartId) => {
      const cart = carts.data?.find(cart => cart.id === cartId);
      if (!cart) {
        return acc;
      }
      return acc + cart.quantity;
    }, 0);
  }, [carts.data, selectedCartIds]);

  return (
    <div className="min-h-screen bg-white md:bg-gray-100">
      <div className="mx-auto flex max-w-5xl items-start gap-6 p-2 md:p-10">
        <div className="w-full">
          <div className="mb-5 hidden grid-cols-2 gap-5 rounded-lg bg-white p-4 text-sm md:grid">
            <p className="">Produk</p>
            <div className="flex items-center justify-between [&_p]:px-4">
              <p>Harga Satuan</p>
              <p>Quantity</p>
              <p>Total Harga</p>
              <p>Aksi</p>
            </div>
          </div>
          {match(carts)
            .with({ isLoading: true }, () => (
              <ArrayForEach length={3}>
                {idx => (
                  <div key={idx} className="mb-5 grid grid-cols-2 rounded-lg bg-white p-4 text-sm">
                    <div className="flex gap-3">
                      <div className="h-24 w-24 shrink-0 animate-pulse bg-gray-100" />
                      <div className="flex w-full flex-col gap-2">
                        <div className="h-5 w-full animate-pulse bg-gray-100" />
                        <div className="h-5 w-1/2 animate-pulse bg-gray-100" />
                      </div>
                    </div>
                  </div>
                )}
              </ArrayForEach>
            ))
            .with({ isError: true }, () => (
              <div className="mb-5 grid grid-cols-2 rounded-lg bg-white p-4 text-sm text-red-600">
                {carts.error?.message ?? "Something went wrong"}
              </div>
            ))
            .with({ data: P.array(P.any) }, ({ data }) => (
              <>
                {!data.length && (
                  <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 text-sm">
                    <img src="/empty-cart.png" className="w-[100px] text-center" />
                    <p className="font-semibold">Your cart is empty</p>
                  </div>
                )}
                {!!data.length &&
                  data.map(cart => (
                    <div
                      key={cart.id}
                      className="mb-5 grid-cols-2 items-center gap-5 rounded-lg bg-white p-4 text-sm md:grid"
                    >
                      <div className="flex gap-3">
                        <Checkbox
                          onChange={e => {
                            const newSelectedCartIds = [...selectedCartIds];
                            if (e.target.checked) newSelectedCartIds.push(cart.id);
                            else newSelectedCartIds.splice(newSelectedCartIds.indexOf(cart.id), 1);

                            // update state
                            setSelectedCartsIds(newSelectedCartIds);
                          }}
                        />
                        <img
                          src={cart.product.imageUrl ?? "/placeholder.png"}
                          className="h-24 w-24"
                        />
                        <div className="flex w-full flex-col gap-2">
                          <p className="line-clamp-2 text-sm md:line-clamp-none">
                            {cart.product.name}
                          </p>
                          <div className="flex flex-col gap-2 md:hidden">
                            <div className="flex justify-between">
                              <p>{formatIDR(Number(cart.product.price))}</p>
                              <QuantityButton
                                productId={cart.product.id}
                                currentQuantity={cart.quantity}
                              />
                            </div>
                            <p className="font-semibold">
                              Total: {formatIDR(Number(cart.product.price) * cart.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden items-center justify-between text-xs md:flex [&_p]:px-4">
                        <p>{formatIDR(Number(cart.product.price))}</p>
                        <QuantityButton
                          productId={cart.product.id}
                          currentQuantity={cart.quantity}
                        />
                        <p>{formatIDR(Number(cart.product.price) * cart.quantity)}</p>
                        <button
                          className="cursor-pointer px-4 text-red-500 underline"
                          onClick={() => {
                            // delete all cart
                            updateCartMutation.mutate({
                              productId: cart.product.id,
                              quantity: cart.quantity,
                              type: "subtract",
                            });
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
              </>
            ))
            .otherwise(() => null)}
          <div className="ml-auto flex items-center justify-between rounded-lg bg-white p-4 md:justify-end">
            <div className="md:w-1/3">
              <p className="mb-1 text-sm">Produk di pilih: {calculdateSelectedItemCount}</p>
              <p>
                Total Harga:<b> {formatIDR(calculateSelectedTotalPrice)}</b>
              </p>
            </div>
            <Button>Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const QuantityButton = ({
  productId,
  currentQuantity,
}: {
  productId: string;
  currentQuantity: number;
}) => {
  const updateCartMutation = useUpdateCart();

  return (
    <div className="flex items-center gap-3 md:gap-1">
      <button
        className="cursor-pointer"
        onClick={() => {
          // subtract quantity
          updateCartMutation.mutate({
            productId,
            quantity: 1,
            type: "subtract",
          });
        }}
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <p>{currentQuantity}</p>
      <button
        className="cursor-pointer"
        onClick={() => {
          // add quantity
          updateCartMutation.mutate({
            productId,
            quantity: 1,
            type: "add",
          });
        }}
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
};
