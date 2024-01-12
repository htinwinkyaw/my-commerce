import addressServices from "@/server/services/addressServices";
import { checkUnauthorizedUser } from "@/app/_utils/checkUnauthorizedUser";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { handleErrorResponse } from "@/app/_utils/handleErrorResponse";
import { handleSuccessResponse } from "@/app/_utils/handleSuccessResponse";

/**
 * Creating new address
 * @param request Request data for creating new address
 * @returns NextResponse JSON response
 */
export const POST = async (request: Request) => {
  const unauthorizedResponse = await checkUnauthorizedUser();

  if (unauthorizedResponse) return unauthorizedResponse;

  try {
    const body = await request.json();

    const address = await addressServices.createdAddress(body);

    return handleSuccessResponse(201, "New address is created.", address);
  } catch (error) {
    console.error(error);

    return handleErrorResponse(500, "Failed to create new address.");
  }
};
