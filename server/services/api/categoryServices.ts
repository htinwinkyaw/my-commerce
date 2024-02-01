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

    const filteredCategories = categories.filter((category) => {
      return category.name !== "All";
    });

    const customizedCategories = [
      { id: "custom", name: "All" },
      ...filteredCategories,
    ];

    return customizedCategories;
  } catch (error) {
    console.error("Error fetching categories: ", error);

    throw new Error("Failed to fetch CATEGORIES.");
  }
};

const getCategoriesWithoutAll = async (): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    const filteredCategories = categories.filter((category) => {
      return category.name !== "All";
    });

    return filteredCategories;
  } catch (error) {
    console.error("Error fetching CATEGORIES WITHOUT ALL: ", error);

    throw new Error("Failed to fetch CATEGORIES WITHOUT ALL.");
  }
};

/**
 * Fetch Category by categoryId
 * @param categoryId
 * @returns Promise resolving Category get by categoryId or null
 */
const getCategoryById = async (
  categoryId: string
): Promise<Category | null> => {
  try {
    const category = await prisma.category.findFirst({
      where: { id: categoryId },
    });

    return category;
  } catch (error) {
    console.error("Error fetching category by id: ", error);

    throw new Error("Failed to fetch category by id.");
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
const updateCategory = async (
  id: string,
  data: { name: string }
): Promise<Category> => {
  const existingCategory = await prisma.category.findFirst({ where: { id } });

  if (!existingCategory) {
    throw new Error(`No category with the id "${id}".`);
  }

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: { name: data.name },
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
  getCategoriesWithoutAll,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryServices;
