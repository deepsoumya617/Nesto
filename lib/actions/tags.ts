'use server'

import { auth } from '@clerk/nextjs/server'
import prisma from '../prisma'

export async function getTagFrequency() {
  try {
    // Get the authenticated user
    const { userId } = await auth()
    if (!userId) {
      throw new Error('User not authenticated')
    }
    // Check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })
    if (!user) {
      throw new Error('User not found in the database')
    }

    // Fetch tag frequency for the user
    const tags = await prisma.tag.findMany({
      where: {
        snippets: {
          some: {
            userId: user.clerkId,
          },
        },
      },
      include: {
        _count: {
          select: {
            snippets: true,
          },
        },
      },
    })

    const tagFrequency = tags.map((tag) => ({
      name: tag.name,
      count: tag._count.snippets,
    }))

    return tagFrequency
  } catch (error) {
    console.error('Error fetching tag frequency:', error)
    throw new Error('Failed to fetch tag frequency')
  }
}
