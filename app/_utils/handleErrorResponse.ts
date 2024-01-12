import { NextResponse } from "next/server";

export const handleErrorResponse = (
  status: number,
  message: string
): NextResponse => {
  return NextResponse.json({ status, message });
};
