import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/app/_lib/prismadb";
import { NextResponse } from "next/server";

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

export const PUT = async (request: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, inStock } = body;

  try {
    const product = await prisma.product.update({
      where: { id: id },
      data: { inStock: !inStock },
    });

    if (!product) return NextResponse.error();

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.error();
  }
};
