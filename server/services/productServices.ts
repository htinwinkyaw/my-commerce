import { ExtendedProductType, IProductParams } from "@/types/product";

import { Product } from "@prisma/client";
import prisma from "@/app/_lib/prismadb";

/**
 * Creating new product in the database.
 * @param data
 * @returns Promise resolving newly created product
 */
const createProduct = async (data: {
  name: string;
  price: string;
  category: string;
  description: string;
  brand: string;
  inStock: boolean;
}): Promise<Product> => {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: parseInt(data.price),
        categoryId: data.category,
        description: data.description,
        brand: data.brand,
        inStock: data.inStock,
      },
    });

    return product;
  } catch (error) {
    console.error("Error creating product: ", error);

    throw new Error("Failed to create product. (Internal Server Error)");
  }
};

/**
 * Fetching products in the database.
 * @returns Promise resolving the array of products
 */
const getProducts = async ({
  category,
  searchTerm = "",
}: IProductParams): Promise<ExtendedProductType[]> => {
  try {
    let whereClause: any = {};

    if (category) {
      const res = await prisma.category.findFirst({
        where: { name: category },
      });

      if (!res?.id) throw new Error(`No category with ${category} name.`);

      whereClause.categoryId = res.id;
    }

    const products = await prisma.product.findMany({
      where: {
        ...whereClause,
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      include: {
        category: true,
        reviews: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);

    throw new Error("Failed to fetch PRODUCTS.");
  }
};

/**
 * Fetching a single prouct by productId in the database.
 * @param id productId for fetching product
 * @returns Promise resolving the existing product
 */
const getProductById = async (id: string): Promise<Product> => {
  try {
    const product = await prisma.product.findFirst({ where: { id } });

    if (!product) {
      throw new Error(`No product is found with ${id} id.`);
    }

    return product;
  } catch (error) {
    console.error(error);

    throw new Error("Failed to fetch product by id. (Internal server error)");
  }
};

/**
 * Fetch product with detail information from the database.
 * @param productId
 * @returns Promise resolving product with detail information
 */
const getProductDetailById = async (productId: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: { category: true, reviews: { include: { user: true } } },
    });

    if (!product) {
      throw new Error(`No product is found with ${productId} id.`);
    }

    return product;
  } catch (error) {
    console.error(error);

    throw new Error(
      "Failed to fetch PRODUCT DETAIL BY ID. (Internal server error)"
    );
  }
};

/**
 * Updating product info by productId in the database.
 * @param id productId for updating product
 * @param data product data for updating
 * @returns Promise resolving updated product
 */
const updateProduct = async (
  id: string,
  data: {
    name: string;
    price: string;
    category: string;
    description: string;
    brand: string;
    inStock: boolean;
  }
) => {
  try {
    const existingProduct = await prisma.product.findFirst({ where: { id } });

    if (!existingProduct) throw new Error(`No product with ${id} id.`);

    const { name, price, category, description, brand, inStock } = data;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: parseInt(price),
        categoryId: category,
        description,
        brand,
        inStock,
      },
    });

    return product;
  } catch (error) {
    throw new Error("Failed to update product. (Internal server error)");
  }
};

/**
 * Change PRODUCT STOCK STATUS in database.
 * @param data
 * @returns Promise resolving stock status changed product
 */
const updateProductStockStatus = async (data: {
  id: string;
  inStock: boolean;
}): Promise<Product> => {
  const { id, inStock } = data;
  try {
    const existingProduct = await prisma.product.findFirst({ where: { id } });

    if (!existingProduct) throw new Error(`No product with ${id} id.`);

    const changedProduct = await prisma.product.update({
      where: { id },
      data: { inStock: !inStock },
    });

    return changedProduct;
  } catch (error) {
    console.error("Error changing PRODUCT STOCK STATUS: ", error);

    throw new Error(
      "Failed to change PRODUCT STOCK STATUS. (Internal Server Error)"
    );
  }
};

/**
 * Delete product by productId from the database.
 * @param id productId for deleting
 * @returns Promise resolving deleted product
 */
const deleteProduct = async (id: string): Promise<Product> => {
  try {
    const existingProduct = await prisma.product.findFirst({ where: { id } });

    if (!existingProduct) {
      throw new Error(`No product is found with ${id} id.`);
    }

    const deletedProduct = await prisma.product.delete({ where: { id } });

    return deletedProduct;
  } catch (error) {
    throw new Error("Failed to fetch the product by id.");
  }
};

const productServices = {
  createProduct,
  getProducts,
  getProductById,
  getProductDetailById,
  updateProduct,
  updateProductStockStatus,
  deleteProduct,
};

export default productServices;
