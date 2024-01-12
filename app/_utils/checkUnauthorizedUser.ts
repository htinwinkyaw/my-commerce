import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export const checkUnauthorizedUser: () => Promise<
  NextResponse | undefined
> = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ status: 401, messag: "Unauthorized user." });
  }
  return;
};
