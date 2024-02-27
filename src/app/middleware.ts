import {NextResponse} from "next/server";

const protectedRoutes: string[] = ["/"];

export const middleware = (req: any) => {
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteUrl = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl);
    }
}