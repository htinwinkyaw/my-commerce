import { DeliveryStatus, PaymentStatus } from "@prisma/client";

import { checkUnauthorizedAdmin } from "@/app/_utils/checkUnauthorizedAdmin";
import { checkUnauthorizedUser } from "@/app/_utils/checkUnauthorizedUser";
import { handleErrorResponse } from "@/app/_utils/handleErrorResponse";
import { handleSuccessResponse } from "@/app/_utils/handleSuccessResponse";
import orderServices from "@/server/services/api/orderServices";
import userServices from "@/server/services/api/userServices";

/**
 * Creating new order
 * @param request
 * @returns Response function with NextResponse
 */
export const POST = async (request: Request) => {
  try {
    const unauthorizedResponse = await checkUnauthorizedUser();
    if (unauthorizedResponse) return unauthorizedResponse;

    const currentUser = await userServices.getCurrentUser();
    const userId = currentUser?.id;

    const body = await request.json();

    const order = orderServices.createOrder(userId!, {
      addressId: body.addressId,
      products: body.cartProducts,
      amount: body.totalAmount,
    });

    return handleSuccessResponse(201, "New order is created.", order);
  } catch (error) {
    return handleErrorResponse(500, "Failed to create new order.");
  }
};

/**
 * Changing ORDER STATUS
 * (deliveryStatus and paymentStatus based on the request data)
 * @param request
 * @returns Response function with NextResponse
 */
export const PATCH = async (request: Request) => {
  try {
    const unauthorizedResponse = await checkUnauthorizedAdmin();
    if (unauthorizedResponse) return unauthorizedResponse;

    const body: {
      id: string;
      deliveryStatus?: DeliveryStatus;
      paymentStatus?: PaymentStatus;
    } = await request.json();

    const updatedOrder = await orderServices.updateOrderStatus(body);

    return handleSuccessResponse(202, "Order status is updated.", updatedOrder);
  } catch (error) {
    return handleErrorResponse(500, "Failed to update order status.");
  }
};
