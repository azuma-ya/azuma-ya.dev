import authConfig from "auth.config";
import NextAuth from "next-auth";
import type { MiddlewareConfig, NextRequest } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiHonoPrefix,
  authRoutes,
  publicRoutes,
} from "./route";

const { auth } = NextAuth(authConfig);

export default auth(async (req: NextRequest) => {
  const { nextUrl } = req;
  const isLoggedIn = !!(await auth());

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiHonoRoute = nextUrl.pathname.startsWith(apiHonoPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isApiHonoRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }

  return;
}) as MiddlewareConfig;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
