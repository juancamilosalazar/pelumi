import { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { redirectTo } from "@/lib/redirect";

export async function POST(_request: NextRequest) {
  const response = redirectTo("/admin/login");
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
