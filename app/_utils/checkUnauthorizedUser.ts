import { NextResponse } from "next/server";
import userServices from "@/server/services/userServices";

export const checkUnauthorizedUser: () => Promise<
  NextResponse | undefined
> = async () => {
  const currentUser = await userServices.getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ status: 401, messag: "Unauthorized user." });
  }
  return;
};
