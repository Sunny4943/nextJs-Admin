import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"
var token = ""
if (typeof window !== 'undefined') {
    const { localStorage, sessionStorage } = window;

    // token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : []
}
export async function middleware(req) {
    try {
        //  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
        try {
            const user = JSON.parse(localStorage.getItem("token"))
            // You could also check for any property on the session object,
            // like role === "admin" or name === "John Doe", etc.
            if (!user) { return NextResponse.redirect(new URL('/', req.url)) }
        }
        catch (err) {
            console.log(err)
            // return NextResponse.redirect(new URL('/', req.url))
        }

        // If user is authenticated, continue.
        //console.log(session)
        return NextResponse.next()
    }
    catch (err) {
        console.log(err)
        //return NextResponse.redirect(new URL('/', req.url))
    }

}

export const config = {
    matcher: '/src/:path*',
}
