import { createContext, useContext, useState } from "react";

export interface LayoutHeaderContextValue {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  priceFilters: { minPrice?: number; maxPrice?: number };
  setPriceFilters: React.Dispatch<React.SetStateAction<{ minPrice?: number; maxPrice?: number }>>;
}

const HeaderContext = createContext<LayoutHeaderContextValue>({
  showFilter: false,
  setShowFilter: () => {
    // no-op default implementation
  },
  priceFilters: {
    minPrice: undefined,
    maxPrice: undefined,
  },
  setPriceFilters: () => {
    // no-op default implementation
  },
});

export function LayoutHeaderProvider({ children }: { children: React.ReactNode }) {
  const [showFilter, setShowFilter] = useState(false);
  const [priceFilters, setPriceFilters] = useState<{ minPrice?: number; maxPrice?: number }>({
    minPrice: undefined,
    maxPrice: undefined,
  });

  return (
    <HeaderContext.Provider
      value={{
        showFilter,
        setShowFilter,
        priceFilters,
        setPriceFilters,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useLayoutHeader() {
  return useContext(HeaderContext);
}
