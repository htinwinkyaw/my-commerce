import { ExtendedProductType } from "@/types/product";
import NullData from "@/app/_components/NullData";
import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

interface Props {
  product: ExtendedProductType | null | undefined;
}

const ProductReview: React.FC<Props> = ({ product }) => {
  if (!product) {
    return <NullData title="Oops. No product data to show." />;
  }

  const reviews = product.reviews;

  return (
    <div className="flex flex-col gap-2">
      <ReviewForm productId={product.id} />

      {!product?.reviews || product.reviews.length === 0 ? (
        <></>
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </div>
  );
};

export default ProductReview;
