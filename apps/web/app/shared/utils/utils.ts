import classnames from "classnames";
import { twMerge } from "tailwind-merge";

export function cx(...classNames: classNames.ArgumentArray) {
  return twMerge(classnames(...classNames));
}
