import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server' // Import NextResponse

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/notes(.*)',
  '/snippets(.*)',
  '/import(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()
  const pathname = req.nextUrl.pathname

  // Redirect authenticated user away from landing page
  if (userId && pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = '/dashboard'
    // Use NextResponse.redirect instead of Response.redirect
    return NextResponse.redirect(url)
  }

  // If not authenticated and trying to access protected route, redirect to sign-in
  if (!userId && isProtectedRoute(req)) {
    // redirectToSignIn typically returns a NextResponse.redirect internally,
    // so this line is likely not the direct cause of the immutable error.
    // The issue usually comes from Response.redirect.
    return redirectToSignIn({ returnBackUrl: req.url })
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next() // Explicitly return NextResponse.next() for clarity
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}