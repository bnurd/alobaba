import { cx } from "~/shared/utils/utils";

export const Label = ({ className, ...props }: React.ComponentPropsWithRef<"label">) => {
  return <label className={cx("block text-sm font-medium text-gray-700", className)} {...props} />;
};
