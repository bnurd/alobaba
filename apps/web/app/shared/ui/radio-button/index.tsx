import { Children, cloneElement, isValidElement, useId, useImperativeHandle, useRef } from "react";

import { cx } from "~/shared/utils/utils";

export interface RadioButtonProps extends React.ComponentPropsWithRef<"input"> {
  label: string | React.ReactNode;
  rootClassName?: string;
}

export const RadioButton = ({ rootClassName, id, checked, ...props }: RadioButtonProps) => {
  const _defaultId = useId();

  return (
    <div className={cx("inline-flex items-center", rootClassName)}>
      <label className="relative flex cursor-pointer items-center" htmlFor={id ?? _defaultId}>
        <input
          type="radio"
          className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all checked:border-slate-400 disabled:bg-gray-100"
          id={id ?? _defaultId}
          checked={checked}
          {...props}
        />
        <span className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black opacity-0 transition-opacity duration-200 peer-checked:opacity-100"></span>
      </label>
      <label className="ml-2 cursor-pointer" htmlFor={id ?? _defaultId}>
        {props.label}
      </label>
    </div>
  );
};

export interface RadioButtonGroupProps extends React.ComponentPropsWithRef<"input"> {
  name: string;
  children: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  className?: string;
  disabled?: boolean;
  value?: string;
}

export const RadioButtonGroup = ({ ref, className, ...props }: RadioButtonGroupProps) => {
  const _internalRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        _internalRef.current?.focus();
        _internalRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      },
      ..._internalRef.current,
    } as HTMLInputElement;
  });

  return (
    <div ref={_internalRef} className={cx("flex", className)}>
      {Children.map(props.children, child => {
        if (isValidElement<RadioButtonProps>(child)) {
          return cloneElement(child, {
            name: props.name,
            onChange: props.onChange,
            onBlur: props.onBlur,
            onFocus: props.onFocus,
            checked: child.props.value === props.value,
            disabled: props.disabled,
            ...child.props,
          });
        }
        return child;
      })}
    </div>
  );
};
