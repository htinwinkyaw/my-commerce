import { checkUnauthorizedAdmin } from "@/app/_utils/checkUnauthorizedAdmin";
import { handleErrorResponse } from "@/app/_utils/handleErrorResponse";
import { handleSuccessResponse } from "@/app/_utils/handleSuccessResponse";
import productServices from "@/server/services/productServices";

/**
 * Updating product by productId from the database.
 * @param request data for updating product
 * @param params parameters including productId for updating
 * @returns Promise resovling the updated product
 */
export const PUT = async (
  request: Request,
  params: { params: { productId: string } }
) => {
  const productId = params.params.productId;

  try {
    const unauthorizedResponse = await checkUnauthorizedAdmin();
    if (unauthorizedResponse) return unauthorizedResponse;

    const body = await request.json();

    const updatedProduct = await productServices.updateProduct(productId, body);

    return handleSuccessResponse(200, "Product is updated.", updatedProduct);
  } catch (error) {
    return handleErrorResponse(500, "Failed to update product.");
  }
};

/**
 * Deleting product by productId from the database.
 * @param request data for deleting product
 * @param params parameters including productId for deleting
 * @returns Promise resolving the deleted product
 */
export const DELETE = async (
  request: Request,
  params: { params: { productId: string } }
) => {
  const productId = params.params.productId;

  try {
    const unauthorizedResponse = await checkUnauthorizedAdmin();
    if (unauthorizedResponse) return unauthorizedResponse;

    await productServices.deleteProduct(productId);

    return handleSuccessResponse(204, "Product is deleted.");
  } catch (error) {
    return handleErrorResponse(500, "Failed to delete product.");
  }
};
