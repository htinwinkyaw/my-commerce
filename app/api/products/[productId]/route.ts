import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/app/_lib/prismadb";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  params: { params: { productId: string } }
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const productId = params.params.productId;

  try {
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product) return NextResponse.error();

    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    return NextResponse.error();
  }
};
