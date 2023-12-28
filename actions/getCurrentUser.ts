import prisma from "@/app/_lib/prismadb";
import authOptions from "@/server/authOptions";
import { getServerSession } from "next-auth";

const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  const session = await getSession();

  if (!session?.user.email) return null;

  const currentUser = await prisma.user.findFirst({
    where: { email: session.user.email },
    // include: { orders: true },
  });

  if (!currentUser) return null;

  return {
    ...currentUser,
    // createdAt: currentUser.createdAt.toISOString(),
    // updatedAt: currentUser.updatedAt.toISOString(),
    // emailVerified: currentUser.emailVerified?.toISOString() || null,
  };
};
