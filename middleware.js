import { NextResponse } from "next/server";

export async function middleware(req) {
  const { cookies } = req;

  // Legacy typo: old links used /singup
  if (req.nextUrl.pathname === "/singup") {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  const loggedinUser = cookies.get("user");

  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup")
  ) {
    if (loggedinUser) {
      const dashboardUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!loggedinUser) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  if (req.nextUrl.pathname.startsWith("/createAgent")) {
    if (!loggedinUser) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
