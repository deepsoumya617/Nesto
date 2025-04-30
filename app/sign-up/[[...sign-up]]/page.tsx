'use client'

import { SignUp } from '@clerk/nextjs'

export default function signUpPage() {
  return (
    <div className="mt-auto flex items-center justify-center">
      <SignUp signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} />
    </div>
  )
}
