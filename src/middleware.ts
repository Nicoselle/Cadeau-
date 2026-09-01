import { NextResponse, type NextRequest } from "next/server";
import {
  authorizeSafeRequest,
  unauthorizedSafeResponse,
} from "@/lib/safe-gate";

export function middleware(request: NextRequest) {
  if (authorizeSafeRequest(request.headers.get("authorization"))) {
    return NextResponse.next();
  }
  return unauthorizedSafeResponse();
}

export const config = {
  matcher: [
    "/safe",
    "/safe/:path*",
    "/piramide",
    "/piramide/:path*",
    "/volgen",
    "/volgen/:path*",
    "/onderzoek",
    "/onderzoek/:path*",
    "/smc",
    "/smc/:path*",
    "/api/v1/volgen",
    "/api/v1/volgen/:path*",
    "/api/v1/onderzoek",
    "/api/v1/onderzoek/:path*",
    "/api/v1/smc",
    "/api/v1/smc/:path*",
  ],
};
