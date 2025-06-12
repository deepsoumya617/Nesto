'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@clerk/nextjs'
import { SigninForm } from '@/components/SignInForm'

export default function Signin() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [clerkError, setClerkError] = useState('')
  const router = useRouter()

  const signInWithEmail = async ({
    emailAddress,
    password,
  }: {
    emailAddress: string
    password: string
  }) => {
    if (!isLoaded) return

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/')
      } else {
        console.log('Incomplete sign-in:', result)
      }
    } catch (err: any) {
      console.error('Sign-in error:', err)
      setClerkError(err.errors?.[0]?.message || 'Unknown error')
    }
  }
  return (
    <div>
      <SigninForm signInWithEmail={signInWithEmail} clerkError={clerkError} />
    </div>
  )
}
