import prisma from "@/app/_lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getCart = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Oops! You have to sign in first.");
  }

  try {
    const cart = await prisma.cart.findFirst({
      where: { userId: currentUser.id },
    });

    return cart;
  } catch (error) {
    throw new Error("Oops! Cannot fetch cart data.");
  }
};
