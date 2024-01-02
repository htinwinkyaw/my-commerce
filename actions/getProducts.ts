import prisma from "@/app/_lib/prismadb";

export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, reviews: true },
      orderBy: { createdAt: "desc" },
    });
    return products;
  } catch (error) {
    throw new Error("Fetching Product Error.");
  }
};
