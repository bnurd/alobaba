import dayjs from "dayjs";

import "dayjs/locale/id";

import OrderStatus from "~/modules/products/components/order-status";
import { useGetAllOrderHistories } from "~/modules/products/queries/use-get-all-order-histories";
import { Button } from "~/shared/ui/button";
import { formatIDR } from "~/shared/utils/utils";

dayjs.locale("id");

export default function OrderHistoryPage() {
  const histories = useGetAllOrderHistories();

  return (
    <div className="min-h-screen bg-white md:bg-gray-100">
      <title>Order History - Alobaba</title>
      <div className="mx-auto flex max-w-5xl items-start gap-6 p-2 md:p-10">
        <div className="w-full">
          <h2 className="mb-8 text-2xl font-semibold">Order History</h2>
          {histories.data?.map(history => {
            const total = history.OrderItem.reduce((acc, item) => {
              return acc + Number(item.priceTotal);
            }, 0);

            const payment = history.Payment[0];

            return (
              <div
                key={history.id}
                className="mb-3 border-b border-gray-300 bg-white md:mb-5 md:rounded-xl"
              >
                <div className="flex flex-col gap-1 border-b border-b-gray-200 p-4 md:flex-row md:items-center md:border-b-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="mr-4 text-sm md:text-base">#{history.id}</p>
                    <OrderStatus status={payment?.status ?? "PENDING"} />
                  </div>
                  <p className="text-sm text-gray-500 md:ml-auto">
                    {dayjs(history.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                  </p>
                </div>
                <div className="flex flex-col gap-4 p-4">
                  {history.OrderItem.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.Product.imageUrl ?? "/placeholder.png"}
                        className="h-24 w-24"
                      />
                      <div className="flex flex-col">
                        <p className="mb-3 text-sm">{item.Product.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity}x {formatIDR(item.quantity * Number(item.priceTotal))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-t-gray-200 p-4">
                  {payment?.status === "PENDING" && (
                    <Button
                      size="sm"
                      onClick={() => {
                        const paymentData = payment.paymentData as { Url: string };
                        window.location.href = paymentData.Url;
                      }}
                    >
                      Bayar Sekarang
                    </Button>
                  )}
                  <p className="ml-auto font-medium">Total Harga: {formatIDR(total)} </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
