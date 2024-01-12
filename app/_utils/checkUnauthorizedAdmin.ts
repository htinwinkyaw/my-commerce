import { NextResponse } from "next/server";
import userServices from "@/server/services/userServices";

export const checkUnauthorizedAdmin: () => Promise<
  NextResponse | undefined
> = async () => {
  const currentUser = await userServices.getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.json({ status: 401, message: "Unauthorized user." });
  }
  return;
};
