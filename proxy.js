import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/",
    },
  },
);

export const config = {
  matcher: ["/profile", "/properties/add", "/properties/saved", "/messages"],
};
