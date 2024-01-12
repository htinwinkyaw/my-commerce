import bannerServices from "@/server/services/bannerServices";
import { checkUnauthorizedAdmin } from "@/app/_utils/checkUnauthorizedAdmin";
import { handleErrorResponse } from "@/app/_utils/handleErrorResponse";
import { handleSuccessResponse } from "@/app/_utils/handleSuccessResponse";

/**
 * create a new banner
 * @param request Request data for creating new banner
 * @returns NextResponse json response
 */

export const POST = async (request: Request) => {
  const unauthorizedResponse = await checkUnauthorizedAdmin();

  if (unauthorizedResponse) return unauthorizedResponse;

  try {
    const body = await request.json();
    const { image, link } = body;

    const banner = await bannerServices.createBanner({ image, link });

    return handleSuccessResponse(201, "New banner is created.", banner);
  } catch (error) {
    console.error("Error creating new banner: ", error);

    return handleErrorResponse(500, "Failed to create new banner.");
  }
};
