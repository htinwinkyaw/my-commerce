import categoryServices from "@/server/services/api/categoryServices";
import { handleErrorResponse } from "@/app/_utils/handleErrorResponse";
import { handleSuccessResponse } from "@/app/_utils/handleSuccessResponse";

/**
 * Updating category information
 * @param request
 * @param params Parameters including categoryId for updating category
 * @returns Response function with NextResponse
 */
export const PUT = async (
  request: Request,
  params: { params: { categoryId: string } }
) => {
  const categoryId = params.params.categoryId;
  try {
    const body = await request.json();

    const category = await categoryServices.updateCategory(categoryId, body);

    return handleSuccessResponse(200, "Category is updated.", category);
  } catch (error) {
    console.error("Error updating category: ", error);

    return handleErrorResponse(500, "Failed to update category.");
  }
};

/**
 * Deleting category with categoryId
 * @param request
 * @param params Parameters including categoryId for updating category
 * @returns Response function with NextResponse
 */
export const DELETE = async (
  request: Request,
  params: { params: { categoryId: string } }
) => {
  const categoryId = params.params.categoryId;

  try {
    const category = await categoryServices.deleteCategory(categoryId);

    return handleSuccessResponse(204, "Category is deleted.", category);
  } catch (error) {
    console.error("Error deleting category: ", error);

    return handleErrorResponse(500, "Failed to delete category. (Route)");
  }
};
