import { Category, Product } from "@prisma/client";

export type ExtendedProductType = Product & {
  category: Category;
};
