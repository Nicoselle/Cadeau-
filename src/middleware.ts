import { NextResponse, type NextRequest } from "next/server";
import { authorizeSafe } from "@/lib/safe-auth";

export function middleware(request: NextRequest) {
  const password = process.env.SAFE_PASSWORD;
  if (authorizeSafe(request.headers.get("authorization"), password)) {
    return NextResponse.next();
  }

  return new NextResponse("Niet geautoriseerd.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Safe Capital"',
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/safe", "/safe/:path*"],
};
