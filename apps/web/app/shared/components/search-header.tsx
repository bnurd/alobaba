import { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { match, P } from "ts-pattern";

import { useSearchProducts } from "~/modules/products/queries/user-search-products";
import useDebounce from "~/shared/hooks/use-debounce";
import { Button } from "~/shared/ui/button";

const SearchHeader = () => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleClickOutside = (e: MouseEvent) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
      setSearch("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useDebounce(
    () => {
      setSearchValue(search);
    },
    500,
    [search]
  );

  const searchQuery = useSearchProducts({ name: searchValue });

  const showSearchSuggestion = !!search.length;

  return (
    <div className="relative w-full px-4 py-3 md:px-8 md:py-4 lg:w-1/2">
      <div
        ref={searchBoxRef}
        className="focus-within:border-primary-500 focus-within:ring-primary-500 flex items-center rounded-full border border-gray-100 bg-gray-100 px-1.5 py-1 text-base focus-within:ring md:border-gray-800 md:bg-transparent"
      >
        <MagnifyingGlassIcon className="h-3 w-3 text-gray-600 md:hidden" />
        <input
          className="w-full cursor-pointer px-2 text-xs focus:outline-none md:cursor-text md:px-6 md:text-base"
          placeholder="Search anything products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button className="hidden shrink-0 md:flex" size="sm" icon={<MagnifyingGlassIcon />}>
          Search
        </Button>
      </div>
      {showSearchSuggestion && (
        <div
          ref={node => {
            if (node) {
              const box = searchBoxRef.current?.getBoundingClientRect();
              console.log(box);
              const width = box?.width ?? 0;
              node.style.width = `${width}px`;
            }
          }}
          className="absolute top-[70px] right-8 left-8 z-10 flex max-h-[400px] w-[300px] items-center justify-center overflow-y-auto rounded-lg bg-white px-2 py-1 text-sm shadow"
        >
          {match(searchQuery)
            .with({ isLoading: true }, () => <div className="py-10">Loading...</div>)
            .with({ isError: true }, () => <div className="py-10 text-red-600">Error</div>)
            .with({ data: P.array(P.any) }, ({ data }) => (
              <div className="flex flex-col gap-1">
                {data.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-gray-100"
                  >
                    <img src={product.imgaeUrl ?? "/placeholder.png"} className="h-10 w-10" />
                    <p>{product.name}</p>
                  </div>
                ))}
                {!data.length && <div className="py-10">No results found</div>}
              </div>
            ))
            .otherwise(() => null)}
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
