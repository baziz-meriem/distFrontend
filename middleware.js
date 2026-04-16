import { NextResponse, NextRequest } from "next/server";
import { hasAccesss } from "./utils/accessControl";

export async function middleware(req, res) {
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
    } else {
      // if (!hasAccesss(loggedinUser.role, "createAgent")) {
      //   const loginUrl = new URL("/not-authorized", req.url);
      //   return NextResponse.redirect(loginUrl);
      // }
    }
  }
}
