import { ProductLists } from "~/modules/products/components/product-lists";
import SidebarFilters from "~/modules/products/components/sidebar-filters";
import { LayoutHeaderProvider } from "~/shared/providers/layout-header-provider";

export default function ProductsPage() {
  return (
    <LayoutHeaderProvider>
      <div className="min-h-screen bg-white md:bg-gray-100">
        <div className="max-w-8xl mx-auto flex items-start gap-6 p-2 md:p-10">
          <SidebarFilters />
          <ProductLists />
        </div>
      </div>
    </LayoutHeaderProvider>
  );
}
