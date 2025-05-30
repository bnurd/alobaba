import { cloneElement } from "react";
import { tv } from "tailwind-variants";

import type { ComponentIcon } from "~/shared/types/types";
import { cx } from "~/shared/utils/utils";

export interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  icon?: ComponentIcon;
  variant?: "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
}

export const Button = ({
  children,
  className,
  size,
  variant,
  icon,
  color,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={buttonStyles({ className, size, variant, disabled: props.disabled, color })}
      {...props}
    >
      {icon
        ? cloneElement(icon, {
            className: cx(
              "mr-2 shrink-0",
              {
                "h-5 w-5": size === "sm",
                "h-6 w-6": size === "md",
                "h-7 w-7": size === "lg",
              },
              icon.props.className
            ),
          })
        : null}
      <span className="inline-block shrink-0">{children}</span>
    </button>
  );
};

export const buttonStyles = tv({
  base: cx(
    "inline-flex cursor-pointer items-center justify-center rounded-full border text-center font-semibold transition duration-300 focus:outline-none"
  ),
  variants: {
    variant: {
      filled: "", // defined in compound variants to avoid conflict with color
      outlined: "",
    },
    color: {
      primary: "", // defined in compound variants to avoid conflict with variant
      secondary: "",
    },
    size: {
      sm: cx("px-5 py-[7px] text-sm"),
      md: cx("px-6 py-2.5 text-base"),
      lg: cx("px-7 py-3 text-lg"),
    },
    disabled: {
      true: "",
    },
  },
  compoundVariants: [
    {
      variant: "filled",
      color: "primary",
      class: cx(
        "bg-primary-500 border-primary-500 text-white",
        "hover:bg-primary-600 hover:border-primary-600",
        "focus:ring-primary-500 focus:ring"
      ),
    },
    {
      variant: "filled",
      color: "secondary",
      class: cx(
        "border-gray-900 bg-gray-900 text-white",
        "hover:border-gray-800 hover:bg-gray-800",
        "focus:ring focus:ring-gray-300"
      ),
    },
    {
      variant: "outlined",
      color: "primary",
      class: cx(
        "text-primary-500 border-primary-500 bg-white",
        "hover:bg-primary-50",
        "focus:ring-primary-500 focus:ring"
      ),
    },
    {
      variant: "outlined",
      color: "secondary",
      class: cx(
        "border-gray-800 bg-white text-gray-800",
        "hover:bg-gray-100",
        "focus:ring focus:ring-gray-300"
      ),
    },
    {
      variant: "filled",
      disabled: true,
      className: cx(
        "border-gray-200 bg-gray-200 text-gray-400 hover:border-gray-200 hover:bg-gray-200"
      ),
    },
    {
      variant: "outlined",
      disabled: true,
      className: cx("border-gray-300 bg-white text-gray-400 hover:border-gray-300 hover:bg-white"),
    },
  ],
  defaultVariants: {
    variant: "filled",
    color: "primary",
    size: "md",
  },
});
