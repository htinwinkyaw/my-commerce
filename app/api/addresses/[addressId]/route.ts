import addressServices from "@/server/services/addressServices";
import { checkUnauthorizedUser } from "@/app/_utils/checkUnauthorizedUser";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { handleErrorResponse } from "@/app/_utils/handleErrorResponse";
import { handleSuccessResponse } from "@/app/_utils/handleSuccessResponse";

/**
 * Updating the default address from the database.
 * @param request Request data to update the address.
 * @param params Parameters including addressId to update the address
 * @returns Response function with NextResponse
 */
export const PUT = async (
  request: Request,
  params: { params: { addressId: string } }
) => {
  const addressId = params.params.addressId;

  try {
    const unauthroizedResponse = await checkUnauthorizedUser();

    if (unauthroizedResponse) return unauthroizedResponse;

    const body = await request.json();

    const address = await addressServices.updateAddress(addressId, body);

    return handleSuccessResponse(200, "Address is updated.", address);
  } catch (error) {
    return handleErrorResponse(500, "Failed to update address");
  }
};

/**
 * Updating the default address from the database.
 * @param request Request data to update the default address.
 * @param params Parameters including addressId to update the default address
 * @returns Response function with NextResponse
 */
export const PATCH = async (
  request: Request,
  params: { params: { addressId: string } }
) => {
  const addressId = params.params.addressId;

  try {
    const unauthorizedResponse = await checkUnauthorizedUser();
    if (unauthorizedResponse) return unauthorizedResponse;

    const address = addressServices.updateDefaultAddress(addressId);

    return handleSuccessResponse(200, "Address is updated.", address);
  } catch (error) {
    return handleErrorResponse(500, "Failed to update DEFAULT ADDRESS.");
  }
};

/**
 * Deleting address from the database.
 * @param request Request data for deleting address
 * @param params Parameters including addressId for deleting.
 * @returns Response function with NextResponse
 */
export const DELETE = async (
  request: Request,
  params: { params: { addressId: string } }
) => {
  const addressId = params.params.addressId;

  try {
    const unauthorizedResponse = await checkUnauthorizedUser();
    if (unauthorizedResponse) return unauthorizedResponse;

    await addressServices.deleteAddress(addressId);

    return handleSuccessResponse(204, "Address is deleted.");
  } catch (error) {
    return handleErrorResponse(500, "Failed to delete address.");
  }
};
