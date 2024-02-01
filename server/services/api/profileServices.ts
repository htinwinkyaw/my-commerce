import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { comparePassword } from "@/app/_utils/comparePassword";
import prisma from "@/app/_lib/prismadb";
import userServices from "./userServices";

/**
 * Update user information in the database
 * @param data
 * @returns Promise resolving user with updated information
 */
const updateProfile = async (data: {
  name: string;
  image: string;
}): Promise<User> => {
  const userId = await userServices.getCurrentUserId();

  try {
    const { name, image } = data;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, image },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user information: ", error);

    throw new Error("Failed to update user information.");
  }
};

/**
 * Change current user's password in the database.
 * @param data
 * @returns Promise resolving user with updated password
 */
const changePassword = async (data: {
  confirmPassword: string;
  newPassword1: string;
  newPassword2: string;
}): Promise<User> => {
  const { confirmPassword, newPassword1, newPassword2 } = data;

  try {
    // check new passwords
    if (newPassword1 !== newPassword2) {
      throw new Error("Unmatching new passwords.");
    }

    // check the existance of current user
    const userId = await userServices.getCurrentUserId();

    const user = await prisma.user.findUnique({ where: { id: userId } });

    // check the old password
    if (user?.hashedPassword) {
      const passwordCheck = await comparePassword(
        confirmPassword,
        user.hashedPassword
      );

      if (!passwordCheck) {
        throw new Error("Authentication failed.");
      }
    }

    // update password
    const hashedPassword = await bcrypt.hash(newPassword1, 10);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { hashedPassword },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error changing password: ", error);

    throw new Error("Failed to change password.");
  }
};

const profileServices = {
  updateProfile,
  changePassword,
};

export default profileServices;
