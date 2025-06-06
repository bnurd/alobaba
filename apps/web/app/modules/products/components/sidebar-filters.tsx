import { createPortal } from "react-dom";

import { useLayoutHeader } from "~/shared/providers/layout-header-provider";
import { Button } from "~/shared/ui/button";
import { TextField } from "~/shared/ui/text-field";
import { cx, formatIDR } from "~/shared/utils/utils";

export default function SidebarFilters() {
  const { showFilter, setShowFilter, priceFilters, setPriceFilters } = useLayoutHeader();

  return (
    <>
      <div
        className={cx(
          "fixed top-0 right-0 z-[9999] flex h-dvh w-[280px] shrink-0 translate-x-full flex-col overflow-y-auto bg-white p-4 shadow transition-transform md:static md:z-30 md:h-auto md:w-[250px] md:translate-x-0 md:rounded-lg",
          {
            "-translate-x-0": showFilter,
          }
        )}
      >
        <p className="mb-5 text-lg font-semibold">Filters</p>
        {/* <div className="mb-5">
          <p className="mb-4 font-semibold">Review</p>
          <RadioButtonGroup name="review" value="5" className="flex flex-col gap-3">
            <RadioButton value="5" label="5.0" />
            <RadioButton value="4-5" label="4.0 - 5.0" />
            <RadioButton value="3" label="3" />
          </RadioButtonGroup>
        </div> */}
        <div className="mb-5">
          <p className="mb-4 font-semibold">Price</p>
          <div className="flex flex-col gap-3">
            <TextField
              size="sm"
              placeholder="Min"
              value={priceFilters.minPrice ? formatIDR(priceFilters.minPrice) : ""}
              onChange={e => {
                const val = Number(e.target.value.replace(/\D/g, ""));
                setPriceFilters(prev => ({ ...prev, minPrice: val }));
              }}
            />
            <TextField
              size="sm"
              placeholder="Max"
              value={priceFilters.maxPrice ? formatIDR(priceFilters.maxPrice) : ""}
              onChange={e => {
                const val = Number(e.target.value.replace(/\D/g, ""));
                setPriceFilters(prev => ({ ...prev, maxPrice: val }));
              }}
            />
          </div>
        </div>
        {/* <div className="mb-5">
          <p className="mb-4 font-semibold">RAM</p>
          <div className="flex flex-col gap-3">
            <Checkbox label="4 GB" />
            <Checkbox label="6 GB" />
            <Checkbox label="12 GB" />
          </div>
        </div>
        <div className="mb-5">
          <p className="mb-4 font-semibold">Storage</p>
          <div className="flex flex-col gap-3">
            <Checkbox label="32 GB" />
            <Checkbox label="64 GB" />
            <Checkbox label="128 GB" />
            <Checkbox label="258 GB" />
            <Checkbox label="512 GB" />
            <Checkbox label="1 TB" />
          </div>
        </div> */}
        <Button className="md:hidden" size="sm">
          Tampilkan
        </Button>
      </div>
      {showFilter
        ? createPortal(
            <div
              className="fixed top-0 right-0 z-[999] h-screen w-screen bg-black/25"
              onClick={() => {
                setShowFilter(false);
              }}
            ></div>,
            document.body
          )
        : null}
    </>
  );
}
