import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export const checkUnauthorizedAdmin: () => Promise<
  NextResponse | undefined
> = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.json({ status: 401, message: "Unauthorized user." });
  }
  return;
};
