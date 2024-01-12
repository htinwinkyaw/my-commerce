import { NextResponse } from "next/server";

export const handleSuccessResponse = (
  status: number,
  message: string,
  data?: any
): NextResponse => {
  return NextResponse.json({ status, message, data });
};
