import type { Route } from "+/app/modules/payment/pages/+types/payment.page";
import { useEffect, useMemo, useState } from "react";
import { match, P } from "ts-pattern";

import { useCreatePayment } from "~/modules/payment/mutations/use-create-payment";
import { useGetPaymentProducts } from "~/modules/payment/queries/user-get-payment-products";
import ArrayForEach from "~/shared/components/array-foreach";
import { Button } from "~/shared/ui/button";
import { Label } from "~/shared/ui/label";
import { formatIDR } from "~/shared/utils/utils";

export default function PaymentPage({ params }: Route.ComponentProps) {
  const [address, setAddress] = useState("");
  const productQuery = useGetPaymentProducts(params.code);

  const calculateTotalPrice = useMemo(() => {
    return productQuery.data?.products.reduce((acc, product) => {
      return acc + Number(product.price) * product.qty;
    }, 0);
  }, [productQuery.data]);

  useEffect(() => {
    setAddress(productQuery.data?.user.address ?? "");
  }, [productQuery.data]);

  const createMutation = useCreatePayment();

  return (
    <div className="min-h-screen bg-white md:bg-gray-100">
      <title>Payment - Alobaba</title>
      <div className="mx-auto flex max-w-5xl items-start gap-6 p-2 md:p-10">
        <div className="w-full">
          <h2 className="mb-8 text-2xl font-semibold">Payment</h2>
          <div className="mb-5 hidden grid-cols-2 gap-5 rounded-lg bg-white p-4 text-sm md:grid">
            <p className="">Produk</p>
            <div className="flex items-center justify-between [&_p]:px-4">
              <p>Harga Satuan</p>
              <p>Quantity</p>
              <p>Total Harga</p>
            </div>
          </div>
          {match(productQuery)
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
            .with({ isError: true }, data => (
              <div className="mb-5 grid grid-cols-2 rounded-lg bg-white p-4 text-sm text-red-600">
                {data.error.message}
              </div>
            ))
            .with({ data: { products: P.array(P.any) } }, ({ data }) => (
              <>
                {!data.products.length && (
                  <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 text-sm">
                    <img src="/empty-cart.png" className="w-[100px] text-center" />
                    <p className="font-semibold">Your cart is empty</p>
                  </div>
                )}
                {!!data.products.length &&
                  data.products.map(product => {
                    return (
                      <div
                        key={product.id}
                        className="mb-5 grid-cols-2 items-center gap-5 rounded-lg bg-white p-4 text-sm md:grid"
                      >
                        <div className="flex gap-3">
                          <img src={product.imageUrl ?? "/placeholder.png"} className="h-24 w-24" />
                          <div className="flex w-full flex-col gap-2">
                            <p className="line-clamp-2 text-sm hover:underline md:line-clamp-none">
                              {product.name}
                            </p>
                            <div className="flex flex-col gap-2 md:hidden">
                              <div className="flex justify-between">
                                <p>{formatIDR(Number(product.price))}</p>
                                <p>{product.qty}x</p>
                              </div>
                              <p className="font-semibold">
                                Total: {formatIDR(Number(product.price) * product.qty)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="hidden items-center justify-between text-xs md:flex [&_p]:px-4">
                          <p>{formatIDR(Number(product.price))}</p>
                          <p>{product.qty}x</p>
                          <p>{formatIDR(Number(product.price) * product.qty)}</p>
                        </div>
                      </div>
                    );
                  })}
              </>
            ))
            .otherwise(() => null)}
          <div className="mb-5 rounded-lg bg-white p-4">
            <Label className="mb-1">Alamat Pengiriman</Label>
            <textarea
              className="focus-visible:ring-primary-500 focus-visible:border-primary-500 w-full rounded-xl border border-r-gray-100 p-3 text-sm focus-visible:ring-1 focus-visible:outline-none"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="ml-auto flex items-center justify-between rounded-lg bg-white p-4 md:justify-end">
            <p className="mr-5">
              Total Harga:<b> {formatIDR(calculateTotalPrice ?? 0)}</b>
            </p>
            <Button
              size="sm"
              isLoading={createMutation.isPending}
              onClick={() => {
                createMutation.mutate(
                  {
                    code: params.code,
                    address,
                  },
                  {
                    onSuccess: data => {
                      window.location.href = data.Url;
                    },
                  }
                );
              }}
            >
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
