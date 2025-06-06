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
        userId: user.id,
      },
    })

    return { success: true, message: 'Note created successfully!' }
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

export async function getFullNote(slug: string) {
  const note = await prisma.note.findUnique({
    where: { slug },
  })

  if (!note) return null
  return {
    title: note.title,
    content: note.content,
  }
}

export async function deleteNote(slug: string) {
  await prisma.note.delete({
    where: {
      slug,
    },
  })
}

export async function updateNote(slug: string, title: string, content: string) {
  const newSLug = title.replace(/\s+/g, '-').toLowerCase()

  try {
    await prisma.note.update({
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
      message: 'Note updated successfully!',
    }
  } catch (error) {
    console.error('Update error: ', error)
    return { success: false, message: 'Failed to update note.' }
  }
}
