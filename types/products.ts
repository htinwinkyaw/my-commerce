import { Category, Product, Review } from "@prisma/client";

export type ExtendedProductType = Product & {
  category: Category;
  reviews: Review[];
};

export type CartProductType = {
  id: string;
  name: string;
  price: number;
  description: string;
  brand: string;
  quantity: number;
  image: string;
};
