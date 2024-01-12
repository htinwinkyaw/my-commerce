import { ExtendedProductType } from "@/types/product";
import ProductInfo from "./ProductInfo";
import ProductReview from "./ProductReview";
import React from "react";

interface Props {
  product: ExtendedProductType | null | undefined;
}

const ProductDetailClient: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex flex-col">
      <ProductInfo product={product} />
      <ProductReview product={product} />
    </div>
  );
};

export default ProductDetailClient;
