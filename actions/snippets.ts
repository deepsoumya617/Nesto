'use server'

import prisma from '@/lib/prisma'
import { Snippet } from '@/types/snippet'
import { auth } from '@clerk/nextjs/server'

export async function createSnippet(
  title: string,
  fileName: string,
  language: string,
  content: string,
  tags: string[] = [],
): Promise<{ success: boolean; message: string; snippet?: Snippet }> {
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

    // tags data
    const tagsData = tags.map((tag) => ({
      where: { name: tag },
      create: { name: tag },
    }))

    const snippet = await prisma.snippet.create({
      data: {
        title,
        fileName,
        language,
        content,
        userId: user.id,
        tags: {
          connectOrCreate: tagsData,
        },
      },
      include: {
        tags: true,
      },
    })

    return { success: true, message: 'Note created successfully!', snippet }
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
      include: {
        tags: true, // include tags
      },
    })

    return snippets
  } catch (error) {
    console.error('Error getting Snippets: ', error)
    return []
  }
}

export async function updateSnippet(
  id: string,
  title: string,
  content: string,
  fileName: string,
  language: string,
) {
  try {
    await prisma.snippet.update({
      where: { id },
      data: {
        title,
        content,
        fileName,
        language
      },
    })
    return {
      success: true,
      message: 'Snippet updated successfully!',
    }
  } catch (error) {
    console.error('Update error: ', error)
    return { success: false, message: 'Failed to update snippet.' }
  }
}

export async function deleteSnippet(id: string) {
  await prisma.snippet.delete({
    where: {
      id,
    },
  })
}

// get snippets count and also percentage of increase or decrease
export async function getSnippetCount() {
  const { userId } = await auth()
  if (!userId) {
    console.warn('No userId found during getSnippetCount()')
    return {
      snippetCount: 0,
      percentChangeSnippets: 0,
    }
  }

  const today = new Date()
  const sevenDaysAgo = new Date(today.getDate() - 7)
  const fourteenDaysAgo = new Date(today.getDate() - 14)

  const [snippetCount, thisWeekCount, lastWeekCount] = await Promise.all([
    prisma.snippet.count({
      where: {
        User: {
          clerkId: userId,
        },
      },
    }),
    prisma.snippet.count({
      where: {
        User: {
          clerkId: userId,
        },
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    }),
    prisma.snippet.count({
      where: {
        User: {
          clerkId: userId,
        },
        createdAt: {
          gte: fourteenDaysAgo,
          lt: sevenDaysAgo,
        },
      },
    }),
  ])

  // calculate percentage change
  let percentChangeSnippets = 0
  if (lastWeekCount === 0 && thisWeekCount > 0) {
    percentChangeSnippets = 100 // New snippets this week, no snippets last week
  } else if (lastWeekCount === 0 && thisWeekCount === 0) {
    percentChangeSnippets = 0 // No snippets in both weeks
  } else {
    percentChangeSnippets =
      ((thisWeekCount - lastWeekCount) / lastWeekCount) * 100
  }

  return {
    snippetCount,
    percentChangeSnippets,
  }
}

// get snippet language stats
export async function getSnippetLanguageStats() {
  const { userId } = await auth()
  if (!userId) {
    console.warn('No userId found during getSnippetLanguageStats()')
    return []
  }

  const stats = await prisma.snippet.groupBy({
    by: ['language'],
    where: {
      User: {
        clerkId: userId,
      },
    },
    _count: true,
  })

  return stats.map((stat) => ({
    name: stat.language,
    value: stat._count,
  }))
}
