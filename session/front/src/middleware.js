import { NextResponse } from "next/server";
import validateSession from "./utils/auth/validateSession";

export async function middleware(req) {
    // get the login path
    const isLoginPath = req.nextUrl.pathname === "/auth";

    // validate the session
    const session = await validateSession();

    // if the session was refreshed, set the cookies
    if (session.success && session.cookies) {
        let response = NextResponse.redirect(req.nextUrl);
        response.cookies.set(session.cookies.accessCookie);
        response.cookies.set(session.cookies.refreshCookie);
        return response;
    }

    // if the session is valid, and the page is the login page, redirect to dashboard
    if (session.success && isLoginPath) {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    // if the session is invalid, and the page is not the login page, redirect to login
    if (!session.success && !isLoginPath) {
        let response = NextResponse.redirect(new URL("/auth", req.url));
        response.cookies.delete("refreshToken");
        response.cookies.delete("accessToken");
        return response;
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};
