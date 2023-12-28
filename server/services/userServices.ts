import prisma from "@/app/_lib/prismadb";
import bcrypt from "bcrypt";

const authenticate = async (email?: string, password?: string) => {
  if (!email) {
    throw new Error("Email cannot be empty.");
  }

  if (!password) {
    throw new Error("Password cannot be empty.");
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error("Email is not registered.");
  }

  let isCorrectPassword;

  if (user.hashedPassword) {
    isCorrectPassword = await bcrypt.compare(password, user.hashedPassword);
  }

  if (!isCorrectPassword) {
    throw new Error("Incorrect password.");
  }

  return user;
};

const userServices = { authenticate };

export default userServices;
