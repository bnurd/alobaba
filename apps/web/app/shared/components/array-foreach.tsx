import type React from "react";

const ArrayForEach = ({
  length,
  children,
}: {
  length: number;
  children: (idx: number) => React.ReactNode;
}) => {
  return Array(length)
    .fill(0)
    .map((_, idx) => children(idx));
};

export default ArrayForEach;
