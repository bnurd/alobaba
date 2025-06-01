import type { DependencyList } from "react";
import { useEffect } from "react";

import useTimeoutFn from "~/shared/hooks/use-timeout-fn";

export type UseDebounceReturn = [() => boolean | null, () => void];

export default function useDebounce<T extends (...args: unknown[]) => void>(
  fn: T,
  ms = 0,
  deps: DependencyList = []
): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(reset, deps);

  return [isReady, cancel];
}
