'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function createSnippet(
  title: string,
  fileName: string,
  language: string,
  content: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, message: 'Unauthorized' }
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return { success: false, message: 'User not found in database' }
    }

    await prisma.snippet.create({
      data: {
        title,
        slug: title.replace(/\s+/g, '-').toLowerCase(),
        fileName,
        language,
        content,
        userId: user.id,
      },
    })

    return { success: true, message: 'Note created successfully!' }
  } catch (error) {
    console.error('Error creating snippet:', error)
    return { success: false, message: 'Failed to create note' }
  }
}

export async function getSnippets() {
  try {
    const { userId } = await auth()

    if (!userId) {
      console.warn('No userId found during getSnippets()')
      return []
    }

    // get snippets
    const snippets = await prisma.snippet.findMany({
      where: {
        User: {
          clerkId: userId,
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return snippets
  } catch (error) {
    console.error('Error getting Snippets: ', error)
    return []
  }
}

export async function deleteSnippet(slug: string) {
  await prisma.snippet.delete({
    where: {
      slug,
    },
  })
}
