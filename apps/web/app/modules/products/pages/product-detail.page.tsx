import type { Route } from "+/app/modules/products/pages/+types/product-detail.page";
import { useMemo, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import { useGetDetailProduct } from "~/modules/products/queries/use-get-detail-product";
import { Button } from "~/shared/ui/button";
import { TextField } from "~/shared/ui/text-field";
import { cx, formatIDR } from "~/shared/utils/utils";

export default function ProductDetailPage({ params }: Route.ComponentProps) {
  const detailQuery = useGetDetailProduct(params.slug as string);

  const detail = detailQuery.data;

  const images = useMemo(() => {
    const otherImages = detail?.ProductImages.map(image => image.imageUrl) ?? [];
    if (detail?.imageUrl) {
      return [detail.imageUrl, ...otherImages];
    }
    return otherImages;
  }, [detail?.ProductImages, detail?.imageUrl]);

  if (detailQuery.isLoading) {
    return (
      <div className="flex w-screen flex-col items-center justify-center gap-5 py-40">
        <div className="loader mx-auto"></div>
        <p>Loading ..</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl items-start gap-10 p-2 md:p-10">
      <div className="flex w-[75%] flex-col">
        <p className="mb-8 text-lg font-semibold">{detail?.name}</p>
        <ImagesGallery images={images} />
        <div className="mt-5">
          <p className="text=lg mb-2 font-semibold">Description</p>
          <p>{detail?.description}</p>
        </div>
      </div>
      <OrderBox
        stockQuantity={detail?.stockQuantity ?? 0}
        minimumOrder={detail?.minumumOrderQuantity}
        price={Number(detail?.price)}
      />
    </div>
  );
}

const OrderBox = ({
  stockQuantity,
  minimumOrder,
  price,
}: {
  stockQuantity: number;
  minimumOrder: number | null | undefined;
  price: number;
}) => {
  const [quantity, setQuantity] = useState(1);

  // define the min order quantity based on stock quantity and minimum order
  const minOrderQuantity = useMemo(() => {
    if (!minimumOrder) return stockQuantity;
    if (minimumOrder > stockQuantity) return stockQuantity;
    return minimumOrder;
  }, [minimumOrder, stockQuantity]);

  const disableButton = quantity === 0 || stockQuantity === 0 || quantity > stockQuantity;

  return (
    <div className="w-1/4 shrink-0 rounded-xl border border-gray-300 p-4">
      <p className="mb-5 text-lg font-semibold">Order Here</p>
      {!!minimumOrder && <p className="mb-4">Mininum order: {minimumOrder}</p>}
      <div className="mb-5 flex items-center gap-2">
        <button
          className="cursor-pointer"
          onClick={() => {
            if (quantity <= 1) return;
            setQuantity(quantity - 1);
          }}
        >
          <MinusIcon className="h-5 w-5" />
        </button>
        <TextField
          type="number"
          value={quantity}
          onChange={e => {
            const val = Math.max(1, Math.min(minOrderQuantity, Number(e.target.value)));
            setQuantity(val);
          }}
          className="w-20 appearance-none text-center"
          size="sm"
          min={1}
          max={stockQuantity}
        />
        <button
          className="cursor-pointer"
          onClick={() => {
            if (quantity >= minOrderQuantity) return;
            setQuantity(quantity + 1);
          }}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
        <p className="pl-5">Stock: {stockQuantity}</p>
      </div>
      <div className="mb-5 flex justify-between">
        Subtotal: <b>{formatIDR(price * quantity)}</b>
      </div>
      <Button className="mb-2 w-full" variant="outlined" size="sm" disabled={disableButton}>
        Add to Cart
      </Button>
      <Button className="w-full" variant="filled" size="sm" disabled={disableButton}>
        Buy Now
      </Button>
    </div>
  );
};

export const ImagesGallery = ({ images }: { images: string[] }) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  return (
    <div className="flex w-full gap-2">
      <div className="flex h-[450px] w-24 shrink-0 flex-col gap-3 overflow-y-auto scroll-smooth p-1 pr-3">
        {images.map((image, idx) => (
          <button
            key={idx}
            className={cx(
              "rounded-lg bg-gray-100 p-2 transition-all hover:ring-2 hover:ring-black",
              selectedImageIdx === idx && "ring-2 ring-black"
            )}
            onClick={() => setSelectedImageIdx(idx)}
          >
            <img key={idx} src={image} className="h-20 w-20 object-contain" />
          </button>
        ))}
      </div>
      <div className="h-[450px] w-full grow overflow-hidden rounded-lg bg-gray-100">
        <img src={images[selectedImageIdx]} className="h-full w-full object-contain" />
      </div>
    </div>
  );
};
