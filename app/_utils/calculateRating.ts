import { ExtendedProductType } from "@/types/product";

export const calculateRating = (product: ExtendedProductType) => {
  const totalRating: number = product.reviews.reduce(
    (acc: number, review: any) => {
      return acc + review.rating;
    },
    0
  );

  const averageRating = totalRating / product.reviews.length;

  return averageRating;
};
