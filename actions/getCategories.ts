import prisma from "@/app/_lib/prismadb";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error) {
    throw new Error("Categories fetching error.");
  }
};
