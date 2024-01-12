import { checkUnauthorizedUser } from "@/app/_utils/checkUnauthorizedUser";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { handleErrorResponse } from "@/app/_utils/handleErrorResponse";
import { handleSuccessResponse } from "@/app/_utils/handleSuccessResponse";
import reviewServices from "@/server/services/reviewServices";

/**
 * Create new review
 * @param request
 * @returns Response function with NextResponse
 */
export const POST = async (request: Request) => {
  try {
    const unauthorizedResponse = await checkUnauthorizedUser();
    if (unauthorizedResponse) return unauthorizedResponse;

    const currentUser = await getCurrentUser();
    const userId = currentUser?.id;

    const body: { productId: string; rating: string; comment?: string } =
      await request.json();

    const review = await reviewServices.createReview(userId!, body);

    return handleSuccessResponse(201, "Product review is created.", review);
  } catch (error) {
    return handleErrorResponse(500, "Failed to add product review.");
  }
};
