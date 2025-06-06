'use client'

import { SignIn } from '@clerk/nextjs'

export default function signInPage() {
  return (
    <div className="mt-16 flex items-center justify-center">
      <SignIn signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL} />
    </div>
  )
}
