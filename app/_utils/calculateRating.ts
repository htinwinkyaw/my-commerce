import { ExtendedProductType } from "@/types/products";
import { Review } from "@prisma/client";

export const calculateRating = (product: ExtendedProductType) => {
  return product.reviews.reduce((acc: number, item: Review) => {
    return (item.rating + acc) / product.reviews.length;
  }, 0);
};
