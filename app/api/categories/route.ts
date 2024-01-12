import categoryServices from "@/server/services/categoryServices";
import { checkUnauthorizedAdmin } from "@/app/_utils/checkUnauthorizedAdmin";
import { handleErrorResponse } from "@/app/_utils/handleErrorResponse";
import { handleSuccessResponse } from "@/app/_utils/handleSuccessResponse";

export const POST = async (request: Request) => {
  try {
    const unauthorizedResponse = await checkUnauthorizedAdmin();

    if (unauthorizedResponse) return unauthorizedResponse;

    const body = await request.json();

    const category = await categoryServices.createCategory(body);

    return handleSuccessResponse(201, "New category is created.", category);
  } catch (error) {
    console.error("Error creating new category: ", error);

    return handleErrorResponse(500, "Failed to create new category.");
  }
};
