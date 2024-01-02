import prisma from "@/app/_lib/prismadb";

export const getProductById = async (id: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: { id: id },
      include: { category: true, reviews: true },
    });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
};
