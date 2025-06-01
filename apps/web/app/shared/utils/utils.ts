import classnames from "classnames";
import { twMerge } from "tailwind-merge";

export function cx(...classNames: classNames.ArgumentArray) {
  return twMerge(classnames(...classNames));
}

export function formatIDR(value: number) {
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
}
