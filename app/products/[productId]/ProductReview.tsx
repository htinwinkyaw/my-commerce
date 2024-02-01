import { ExtendedProductType } from "@/types/product";
import NullData from "@/app/_components/NullData";
import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { checkReviewPermission } from "@/app/_utils/checkReviewPermission";
import userServices from "@/server/services/api/userServices";

interface Props {
  product: ExtendedProductType | null | undefined;
}

const ProductReview: React.FC<Props> = async ({ product }) => {
  const currentUser = await userServices.getCurrentUser();

  if (!product) {
    return <NullData title="Oops. No product data to show." />;
  }

  let reviewPermission;

  if (currentUser) reviewPermission = await checkReviewPermission(product.id);

  const reviews = product.reviews;

  return (
    <div className="flex flex-col gap-2">
      {reviewPermission && <ReviewForm productId={product.id} />}

      {!product?.reviews || product.reviews.length === 0 ? (
        <></>
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </div>
  );
};

export default ProductReview;
