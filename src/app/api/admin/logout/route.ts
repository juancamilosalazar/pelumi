import { SESSION_COOKIE } from "@/lib/auth";
import { redirectTo } from "@/lib/redirect";

export async function POST() {
  const response = redirectTo("/admin/login");
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
