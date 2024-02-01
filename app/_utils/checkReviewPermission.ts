import { DeliveryStatus } from "@prisma/client";
import prisma from "../_lib/prismadb";
import userServices from "@/server/services/api/userServices";

export const checkReviewPermission = async (productId: string) => {
  const userId = await userServices.getCurrentUserId();
  const orders = await prisma.order.findMany({ where: { userId } });

  // check delivered orders
  const deliveredOrders = orders.filter((order) => {
    return order.deliveryStatus === DeliveryStatus.completed;
  });

  if (!deliveredOrders || deliveredOrders.length === 0) return null;

  // check products in delivered orders
  const availableOrders = deliveredOrders.filter((order) => {
    return order.products.find((product) => {
      return product.id === productId;
    });
  });

  if (!availableOrders || availableOrders.length === 0) return null;

  // check the reviewed products
  const reviewableOrders = availableOrders.filter((order) => {
    return order.reviewedProducts.map((productId) => {
      return productId === productId;
    });
  });

  return {
    orders: reviewableOrders,
  };
};
