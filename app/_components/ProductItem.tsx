import { ExtendedProductType } from "@/types/products";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { truncateName } from "../_utils/truncateName";
import { formatPrice } from "../_utils/formatPrice";
import { Rating } from "@mui/material";
import { calculateRating } from "../_utils/calculateRating";

interface Props {
  product: ExtendedProductType;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const rating = calculateRating(product);

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="p-2 col-span-1 cursor-pointer border-[1.2px] border-slate-200
      bg-slate-50 rounded-sm text-sm hover:scale-105"
      >
        <div className="flex flex-col w-full gap-1">
          <div className="relative aspect-square overflow-hidden w-full">
            <Image alt={product.name} src={product.images[0]} />
          </div>
          <div className="mt-4">{truncateName(product.name)}</div>
          <div>
            <Rating value={rating} readOnly />
          </div>
          <div>{product.reviews.length} reviews</div>
          <div className="font-semibold">{formatPrice(product.price)}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
