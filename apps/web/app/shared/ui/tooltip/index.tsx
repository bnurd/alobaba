import { Tooltip as BaseTooltip } from "radix-ui";

import { cx } from "~/shared/utils/utils";

export interface TooltipProps extends React.ComponentPropsWithoutRef<"div"> {
  trigger: React.ReactNode;
  delay?: number;
  sideOffset?: number;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip(props: TooltipProps) {
  const { trigger, delay = 300, children, sideOffset = 10, className } = props;

  return (
    <BaseTooltip.Root delayDuration={delay}>
      <BaseTooltip.Trigger asChild>{trigger}</BaseTooltip.Trigger>
      <BaseTooltip.Portal>
        <BaseTooltip.Content
          sideOffset={sideOffset}
          className={cx("z-[9999] rounded-lg bg-white p-5 shadow", className)}
        >
          <BaseTooltip.Arrow
            className="-my-px border-none fill-white drop-shadow-[0_1px_1px_#21202029]"
            width={12}
            height={7}
            aria-hidden="true"
          />

          {children}
        </BaseTooltip.Content>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

export const TooltipProvider = BaseTooltip.Provider;
