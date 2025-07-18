'use server'

import prisma from '@/lib/prisma'
import { Note } from '@/types/note'
import { auth } from '@clerk/nextjs/server'

export async function createNote(
  title: string,
  content: string,
): Promise<{ success: boolean; message: string; note?: Note }> {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, message: 'Unauthorized' }
    }

    // check user in db
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return { success: false, message: 'User not found in database' }
    }

    // create note
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId: user.id,
      },
    })

    return { success: true, message: 'Note created successfully!', note }
  } catch (error) {
    console.error('Error creating note:', error)
    return { success: false, message: 'Failed to create note' }
  }
}

export async function getNote() {
  try {
    const { userId } = await auth()

    if (!userId) {
      console.warn('No userId found during getNotes()')
      return []
    }

    // get notes
    const notes = await prisma.note.findMany({
      where: {
        User: {
          clerkId: userId,
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return notes
  } catch (error) {
    console.error('Error getting Notes: ', error)
    return []
  }
}

export async function deleteNote(id: string) {
  await prisma.note.delete({
    where: {
      id,
    },
  })
}

export async function updateNote(id: string, title: string, content: string) {
  try {
    await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    })
    return {
      success: true,
      message: 'Note updated successfully!',
    }
  } catch (error) {
    console.error('Update error: ', error)
    return { success: false, message: 'Failed to update note.' }
  }
}

// get note count and percent change
export async function getNoteCount() {
  const { userId } = await auth()
  if (!userId) {
    console.warn('No userId found during getNoteCount()')
    return { noteCount: 0, percentChangeNotes: 0 }
  }

  const today = new Date()
  const sevenDaysAgo = new Date(today.getDate() - 7)
  const fourteenDaysAgo = new Date(today.getDate() - 14)

  const [noteCount, thisWeekCount, lastWeekCount] = await Promise.all([
    prisma.note.count({
      where: {
        User: {
          clerkId: userId,
        },
      },
    }),
    prisma.note.count({
      where: {
        User: {
          clerkId: userId,
        },
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    }),
    prisma.note.count({
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
  let percentChangeNotes = 0
  if (lastWeekCount === 0 && thisWeekCount > 0) {
    percentChangeNotes = 100 // New snippets this week, no snippets last week
  } else if (lastWeekCount === 0 && thisWeekCount === 0) {
    percentChangeNotes = 0 // No snippets in both weeks
  } else {
    percentChangeNotes = ((thisWeekCount - lastWeekCount) / lastWeekCount) * 100
  }

  return {
    noteCount,
    percentChangeNotes,
  }
}
