'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useSignUp } from '@clerk/nextjs'

interface SignUpFormProps extends React.ComponentProps<'div'> {
  signUpWithEmail: (data: { emailAddress: string; password: string }) => void
  clerkError?: string
}

export function SignupForm({
  signUpWithEmail,
  clerkError,
  className,
  ...props
}: SignUpFormProps) {
  const { signUp } = useSignUp()

  const handleOAuthSignIn = (provider: 'google' | 'github') => {
    if (!signUp) return
    signUp.authenticateWithRedirect({
      strategy: `oauth_${provider}`,
      redirectUrl: '/',
      redirectUrlComplete: '/',
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }

    const email = target.email.value
    const password = target.password.value

    signUpWithEmail({ emailAddress: email, password })
  }

  return (
    <div className={cn('flex flex-col gap-3', className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="font-geist flex flex-col gap-2 px-6 lg:px-0">
          <h1 className="text-center text-xl font-bold">
            Create your Nesto account.
          </h1>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              type="button"
              className="w-full cursor-pointer rounded-none"
              onClick={() => handleOAuthSignIn('github')}
            >
              <svg
                height="32"
                aria-hidden="true"
                viewBox="0 0 24 24"
                version="1.1"
                width="32"
                className="octicon octicon-mark-github v-align-middle"
              >
                <path d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z" />
              </svg>
              Github
            </Button>

            <Button
              variant="outline"
              type="button"
              className="w-full cursor-pointer rounded-none"
              onClick={() => handleOAuthSignIn('google')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Google
            </Button>
          </div>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                className="rounded-none"
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your secure password"
                className="rounded-none"
                required
              />
            </div>

            {clerkError && <p className="text-sm text-red-500">{clerkError}</p>}

            <Button type="submit" className="w-full cursor-pointer rounded-none">
              Create Account
            </Button>
          </div>
          <div className="text-center text-sm tracking-wide">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="underline-offset-6 hover:text-blue-600 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
