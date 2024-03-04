import {NextResponse} from "next/server";

const protectedRoutes: string[] = ["/"];

export const middleware = (req: any) => {
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteUrl = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl);
    }
}

// Without a defined matcher, this one line applies next-auth
// to the entire project
export { default } from "next-auth/middleware"

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/extra", "/dashboard"] }