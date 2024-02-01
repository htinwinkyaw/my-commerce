import {
  CartProductType,
  DeliveryStatus,
  Order,
  PaymentStatus,
  User,
} from "@prisma/client";

import prisma from "@/app/_lib/prismadb";

/**
 * Creating order in the database.
 * @param userId
 * @param data
 * @returns Promise resolving newly created order
 */
const createOrder = async (
  userId: string,
  data: { addressId: string; products: CartProductType[]; amount: number }
): Promise<Order> => {
  try {
    // check the user has an address to deliver
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: { address: true },
    });

    if (!user?.address || user?.address.length === 0) {
      throw new Error("User has no address to deliver the order.");
    }

    // create the order
    const order = await prisma.order.create({
      data: {
        userId: userId,
        addressId: data.addressId,
        products: data.products,
        amount: data.amount,
      },
    });

    return order;
  } catch (error) {
    console.error("Error creating new order: ", error);

    throw new Error("Failed to create new order.");
  }
};

/**
 * Fetching all orders from the database.
 * @returns Promise resolving the array of order
 */
const getOrders = async (): Promise<Order[]> => {
  try {
    const orders = await prisma.order.findMany();

    return orders;
  } catch (error) {
    console.error("Error fetching orders: ", error);

    throw new Error("Failed to fetch ORDERS.");
  }
};

/**
 * Fetching all orders from the database.
 * @returns Promise resolving the array of order
 */
const getDetailOrders = async (): Promise<(Order & { user: User })[]> => {
  try {
    const orders = await prisma.order.findMany({ include: { user: true } });

    return orders;
  } catch (error) {
    console.error("Error fetching orders: ", error);

    throw new Error("Failed to fetch ORDERS.");
  }
};

/**
 * Fetching all orders by filtering with userid from the database.
 * @param userId User ID for fetching orders
 * @returns Promise resolving the array of order
 */
const getOrdersByUserId = async (
  userId: string
): Promise<Array<Order & { user: User }>> => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching ORDERS BY USER ID: ", error);

    throw new Error("Failed to fetch ORDERS BY USER ID.");
  }
};

/**
 * Changing the order status from the database
 * @param data Data for updating order status
 * @returns Promise resolving updated order
 */
const updateOrderStatus = async (data: {
  id: string;
  paymentStatus?: PaymentStatus;
  deliveryStatus?: DeliveryStatus;
}): Promise<Order> => {
  const { id, paymentStatus, deliveryStatus } = data;

  try {
    const existingOrder = await prisma.order.findFirst({ where: { id } });

    if (!existingOrder) {
      throw new Error(`No order is found with ${id} id.`);
    }

    let processedData;

    if (!deliveryStatus || deliveryStatus.length === 0) {
      processedData = { paymentStatus };
    }
    if (!paymentStatus || paymentStatus.length === 0) {
      processedData = { deliveryStatus };
    }

    const updatedData = await prisma.order.update({
      where: { id },
      data: { ...processedData },
    });

    return updatedData;
  } catch (error) {
    console.error("Error changing order status: ", error);
    throw new Error("Failed to change the order status.");
  }
};

const orderServices = {
  createOrder,
  getOrders,
  getDetailOrders,
  getOrdersByUserId,
  updateOrderStatus,
};

export default orderServices;
