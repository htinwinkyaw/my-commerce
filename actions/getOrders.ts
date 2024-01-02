import prisma from "@/app/_lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getOrders = async () => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    });

    return orders;
  } catch (error) {
    console.log(error);
  }
};
