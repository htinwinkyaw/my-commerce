import { DeliveryStatus, Review } from "@prisma/client";

import { checkReviewPermission } from "@/app/_utils/checkReviewPermission";
import prisma from "@/app/_lib/prismadb";
import userServices from "./userServices";

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
    // Check Review Permission for Current User
    const permission = await checkReviewPermission(productId);

    if (permission === null) throw new Error("Review permission denied.");

    // Add Review to Database
    const review = await prisma.review.create({
      data: {
        userId,
        productId,
        rating: parseInt(rating),
        comment,
      },
    });

    // Mark Reviewd Product in Database(Orders > ReviewProducts)

    return review;
  } catch (error) {
    console.error("Error creating new review: ", error);

    throw new Error("Failed to create new error. (Internal Server Error)");
  }
};
const reviewServices = { createReview };

export default reviewServices;
