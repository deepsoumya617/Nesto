'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function createNote(
  title: string,
  content: string
): Promise<{ success: boolean; message: string }> {
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
    await prisma.note.create({
      data: {
        title,
        content,
        slug: title.replace(/\s+/g, '-').toLowerCase(),
        User: {
          connect: { clerkId: userId },
        },
      },
    })

    return { success: true, message: 'Note created successfully!' }
  } catch (error) {
    console.error('Error creating post:', error)
    return { success: false, message: 'Failed to create post' }
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
