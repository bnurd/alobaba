import { createContext, useContext, useState } from "react";

export interface LayoutHeaderContextValue {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderContext = createContext<LayoutHeaderContextValue>({
  showFilter: false,
  setShowFilter: () => {
    // no-op default implementation
  },
});

export function LayoutHeaderProvider({ children }: { children: React.ReactNode }) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <HeaderContext.Provider
      value={{
        showFilter,
        setShowFilter,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useLayoutHeader() {
  return useContext(HeaderContext);
}
