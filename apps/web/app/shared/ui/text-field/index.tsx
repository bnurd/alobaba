import { tv } from "tailwind-variants";

import { cx } from "~/shared/utils/utils";

export interface TextFieldProps extends Omit<React.ComponentPropsWithRef<"input">, "size"> {
  size?: "sm" | "md" | "lg";
  isError?: boolean;
}

export const TextField = ({ ref, className, size, isError, ...props }: TextFieldProps) => {
  return <input ref={ref} className={textFieldStyles({ className, size, isError })} {...props} />;
};

export const textFieldStyles = tv({
  base: cx(
    "focus:ring-primary-500 focus:border-primary-400 w-full rounded-full border border-gray-800 focus:border focus:ring focus:outline-none",
    "transition-colors duration-300"
  ),
  variants: {
    isError: {
      true: cx("border-red-500 focus:border-red-400 focus:ring-red-500"),
    },
    size: {
      sm: cx("px-5 py-[7px] text-sm"),
      md: cx("px-6 py-2.5 text-base"),
      lg: cx("px-7 py-3 text-lg"),
    },
  },
  defaultVariants: {
    size: "md",
  },
});
