import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET

export async function POST(req: Request) {
  if (!SIGNING_SECRET) {
    throw new Error(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  // Validate Clerk webhook signature
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id') as string
  const svix_timestamp = headerPayload.get('svix-timestamp') as string
  const svix_signature = headerPayload.get('svix-signature') as string

  // No headers found
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Missing Clerk webhook headers.', { status: 400 })
  }

  // Get body + verify headers
  const body = await req.text()
  const wh = new Webhook(SIGNING_SECRET)

  let evt: any

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return new NextResponse('Invalid webhook', { status: 400 })
  }

  // Handle user.created event
  const { type: eventType, data } = evt

  if (eventType === 'user.created') {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { clerkId: data.id },
      })

      if (existingUser) {
        return NextResponse.json({
          success: true,
          message: 'User already exists in DB.',
        })
      }

      // If not, create
      await prisma.user.create({
        data: {
          clerkId: data.id,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'User created in DB.',
      })
    } catch (error) {
      console.error('Error creating user: ', error)
      return new NextResponse('Database error', { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}