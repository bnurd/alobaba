import { cx } from "~/shared/utils/utils";

const OrderStatus = ({ status }: { status: "PENDING" | "PAID" | "EXPIRED" | "CANCELLED" }) => {
  return (
    <div
      className={cx("rounded-full px-3 py-1 text-xs", {
        "bg-green-50 text-green-600": status === "PAID",
        "bg-red-50 text-red-500": status === "EXPIRED",
        "bg-gray-50 text-gray-500": status === "PENDING",
        "bg-yellow-50-50 text-yellow-500": status === "CANCELLED",
      })}
    >
      {status}
    </div>
  );
};

export default OrderStatus;
