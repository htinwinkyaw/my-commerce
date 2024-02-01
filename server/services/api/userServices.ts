import { Address, Order, Review, User } from "@prisma/client";

import { CurrentUserDetail } from "@/types/user";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import prisma from "@/app/_lib/prismadb";

const getSession = async () => {
  return await getServerSession();
};

/** Fetch Current Session User from database.
 * Getting session user who is currently using
 * @returns Session User or NULL
 */
const getCurrentUser = async (): Promise<User | null> => {
  const session = await getSession();

  if (!session?.user.email) return null;

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) return null;

  return { ...currentUser };
};

/**
 * Get the current signed in userId
 * @returns current signed in userId
 */
const getCurrentUserId = async (): Promise<string> => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized user.");
  }
  return currentUser.id;
};

/**
 * Fetch current user with related database fileds.
 * @returns Promise resolving user with CurrentUserDetail type
 */
const getCurrentUserDetail = async (): Promise<CurrentUserDetail> => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Unauthorized user.");
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: { address: true, reviews: true, orders: true },
    });

    if (!user) {
      throw new Error(`No user with ${currentUser.id} id.`);
    }

    return user;
  } catch (error) {
    console.error("Error fetching CURRENT USER DETAIL: ", error);

    throw new Error("Failed to fetch CURRENT USER DETAIL.");
  }
};

/**
 * Fetching all users from the database
 * @returns
 */
const getAllUsers = async (): Promise<Array<User>> => {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    throw new Error("Something went wrong in getting users.");
  }
};

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

const userServices = {
  authenticate,
  getCurrentUser,
  getCurrentUserId,
  getCurrentUserDetail,
  getAllUsers,
};

export default userServices;
