import { NextResponse } from "next/server";
import { checkUnauthorizedUser } from "@/app/_utils/checkUnauthorizedUser";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { handleErrorResponse } from "@/app/_utils/handleErrorResponse";
import { handleSuccessResponse } from "@/app/_utils/handleSuccessResponse";
import prisma from "@/app/_lib/prismadb";
import profileServices from "@/server/services/profileServices";

export const PUT = async (request: Request) => {
  try {
    const unauthorizedResponse = await checkUnauthorizedUser();
    if (unauthorizedResponse) return unauthorizedResponse;

    const body: { name: string } = await request.json();

    const user = await profileServices.updateProfile(body);

    return handleSuccessResponse(200, "Profile information is updated.", user);
  } catch (error) {
    return handleErrorResponse(500, "Failed to update profile information.");
  }
};

/**
 * Change password of the current user
 * @param request
 * @returns Response function with NextResponse
 */
export const PATCH = async (request: Request) => {
  try {
    const unauthorizedResponse = await checkUnauthorizedUser();
    if (unauthorizedResponse) return unauthorizedResponse;

    const body: {
      confirmPassword: string;
      newPassword1: string;
      newPassword2: string;
    } = await request.json();

    const user = await profileServices.changePassword(body);

    return handleSuccessResponse(200, "Your password is changed.", user);
  } catch (error) {
    return handleErrorResponse(500, "Failed to change password.");
  }
};
