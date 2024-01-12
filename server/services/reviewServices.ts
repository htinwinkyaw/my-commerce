import { Review } from "@prisma/client";
import prisma from "@/app/_lib/prismadb";

/**
 * Create new review in the database
 * @param userId
 * @param data
 * @returns Promise resolving newly created review
 */
const createReview = async (
  userId: string,
  data: {
    productId: string;
    rating: string;
    comment?: string;
  }
): Promise<Review> => {
  const { productId, rating, comment } = data;
  try {
    const review = await prisma.review.create({
      data: {
        userId,
        productId,
        rating: parseInt(rating),
        comment,
      },
    });

    return review;
  } catch (error) {
    console.error("Error creating new review: ", error);

    throw new Error("Failed to create new error. (Internal Server Error)");
  }
};
const reviewServices = { createReview };

export default reviewServices;
