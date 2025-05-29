import { cx } from "~/shared/utils/utils";

export const TextField = ({ ref, className, ...props }: React.ComponentPropsWithRef<"input">) => {
  return (
    <input
      ref={ref}
      className={cx(
        "focus:ring-primary-500 focus:border-primary-400 w-full rounded-full border border-gray-800 px-6 py-2.5 text-base focus:border focus:ring focus:outline-none",
        "transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
};
