import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/app/_lib/prismadb";
import { NextResponse } from "next/server";
import { FieldValues } from "react-hook-form";

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, price, category, description, brand, inStock } = body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        price: parseInt(price),
        categoryId: category,
        description,
        brand,
        inStock,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.error();
  }
};
