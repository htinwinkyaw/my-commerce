import { Address, Order, User as PrismaUser, Review } from "@prisma/client";

export type User = {
  id: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
};

export type CurrentUserDetail = PrismaUser & {
  orders: Order[];
  address: Address[];
  reviews: Review[];
};
