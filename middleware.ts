import { UserRole } from "@prisma/client";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { authRoutes } from "./routes";

export default withAuth(
  // Protecting Pages - Middleware
  // https://next-auth.js.org/configuration/nextjs#advanced-usage
  // You can use a Next.js Middleware with NextAuth.js to protect your site.

  function middleware(req, event) {
    const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);

    if (isAuthRoute) {
      return null;
    }

    if (
      req.nextUrl.pathname.startsWith("/CreateUser") &&
      req.nextauth.token.role !== UserRole.ADMIN
    ) {
      // login page yollayabildi ama zaten üye girişi olmuştu sadece admin rolünde değil.
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }
  },
  {
    callbacks: {
      // Kullanıcının bir tokena sahip olup olmadığını kontrol eder. Eğer token varsa, kullanıcı yetkilendirilmiş kabul edilir.
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/CreateUser"] };
