import { Category, Product, Review, User } from "@prisma/client";

export type ExtendedProductType = Product & {
  category: Category;
  reviews: Review[];
};

export type ProductDetailType = Product & {
  category: Category;
  reviews: Review &
    {
      user: User;
    }[];
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

export type ProductParams = {
  category: string | null;
  searchTerm?: string;
};
