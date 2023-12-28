import prisma from "@/app/_lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  const body = await request.json();

  const { name, email, password1, password2 } = body;

  if (password1 !== password2) {
    return NextResponse.error();
  }

  const hashedPassword = await bcrypt.hash(password1, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
};
