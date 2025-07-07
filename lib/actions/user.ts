'use server'

import { auth } from '@clerk/nextjs/server'
import prisma from '../prisma'
import { User } from '../generated/prisma'

export async function getUser(): Promise<
  Pick<User, 'dailyUsageCount' | 'lastUsedAt'>
> {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!user) {
    throw new Error('User not found in database')
  }

  return {
    dailyUsageCount: user.dailyUsageCount,
    lastUsedAt: user.lastUsedAt,
  }
}
