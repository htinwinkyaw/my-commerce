import { Category } from "@prisma/client";
import prisma from "@/app/_lib/prismadb";

/**
 * Fetching all categories from the database.
 * @returns Promise resolving the array of categories
 */
const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching categories: ", error);

    throw new Error("Failed to fetch CATEGORIES.");
  }
};

/**
 * Creating new category in the database.
 * @param data Category data for creating new category.
 * @returns Promise resolving the newly created category
 */
const createCategory = async (data: any): Promise<Category> => {
  const category = await prisma.category.create({ data: { ...data } });

  return category;
};

/**
 * Updating the existing category in the database.
 * @param id categoryId for updating
 * @param data Category data for updating
 * @returns Promise resolving the updated category
 */
const updateCategory = async (id: string, data: any): Promise<Category> => {
  const existingCategory = await prisma.category.findFirst({ where: { id } });

  if (!existingCategory) {
    throw new Error(`No category with the id "${id}".`);
  }

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: { ...data },
  });

  return updatedCategory;
};

/**
 * Deleting category from the database.
 * @param id categoryId for deleting
 * @returns Promise resolving the deleted category
 */
const deleteCategory = async (id: string): Promise<Category> => {
  const existingCategory = await prisma.category.findFirst({ where: { id } });

  if (!existingCategory) {
    throw new Error(`No category with the id "${id}".`);
  }

  const deletedCategory = await prisma.category.delete({ where: { id } });

  return deletedCategory;
};

const categoryServices = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryServices;
