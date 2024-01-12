import { checkUnauthorizedAdmin } from "@/app/_utils/checkUnauthorizedAdmin";
import { handleErrorResponse } from "@/app/_utils/handleErrorResponse";
import { handleSuccessResponse } from "@/app/_utils/handleSuccessResponse";
import productServices from "@/server/services/productServices";

/**
 * Create new product
 * @param request
 * @returns Response function with NextResponse
 */
export const POST = async (request: Request) => {
  try {
    const unauthorizedResponse = await checkUnauthorizedAdmin();
    if (unauthorizedResponse) return unauthorizedResponse;

    const body: {
      name: string;
      price: string;
      category: string;
      description: string;
      brand: string;
      inStock: boolean;
    } = await request.json();

    const product = await productServices.createProduct(body);

    return handleSuccessResponse(201, "New product is created.", product);
  } catch (error) {
    return handleErrorResponse(500, "Internal server error.");
  }
};

/**
 * Change the PRODUCT STOCK STATUS
 * @param request
 * @returns Response function with NextResponse
 */
export const PATCH = async (request: Request) => {
  const unauthorizedResponse = await checkUnauthorizedAdmin();
  if (unauthorizedResponse) return unauthorizedResponse;

  const body: { id: string; inStock: boolean } = await request.json();

  try {
    const updatedProduct = await productServices.updateProductStockStatus(body);

    return handleSuccessResponse(
      200,
      "PRODUCT STOCK STATUS is updated.",
      updatedProduct
    );
  } catch (error) {
    return handleErrorResponse(
      500,
      "Failed to change the PROUCT STOCK STATUS."
    );
  }
};
