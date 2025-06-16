'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { percent } from 'motion/react'

export async function createSnippet(
  title: string,
  fileName: string,
  language: string,
  content: string,
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

export async function getSnippetFromSlug(slug: string) {
  const snippet = await prisma.snippet.findUnique({
    where: { slug },
  })

  if (!snippet) return null
  return {
    title: snippet.title,
    content: snippet.content,
    fileName: snippet.fileName,
    language: snippet.language,
  }
}

export async function updateSnippet(
  slug: string,
  title: string,
  content: string,
) {
  const newSLug = title.replace(/\s+/g, '-').toLowerCase()

  try {
    await prisma.snippet.update({
      where: { slug },
      data: {
        title,
        content,
        slug: newSLug,
      },
    })
    return {
      success: true,
      slug: newSLug,
      message: 'Snippet updated successfully!',
    }
  } catch (error) {
    console.error('Update error: ', error)
    return { success: false, message: 'Failed to update snippet.' }
  }
}

export async function deleteSnippet(slug: string) {
  await prisma.snippet.delete({
    where: {
      slug,
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
