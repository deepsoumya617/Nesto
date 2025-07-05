'use server'

import { auth } from '@clerk/nextjs/server'
import { openai } from '../openai'
import prisma from '@/lib/prisma'
import { AskAiInput } from '@/types/askAiInput'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!
const MAX_DAILY_USAGE = 10

export async function askAi(data: AskAiInput) {
  // check if user is authenticated
  const { userId } = await auth()
  if (!userId) throw new Error('User not authenticated')

  // check if user exists on the database
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })
  if (!user) throw new Error('User not found in the database')

  // check if user is an admin
  const isAdmin = user.email === ADMIN_EMAIL
  const lastUsed = user.lastUsedAt ?? new Date(0)
  const now = new Date()
  const isSameDay = lastUsed.toDateString() === now.toDateString()
  const usage = isSameDay ? user.dailyUsageCount : 0

  // check if user has exceeded daily usage limit
  if (!isAdmin && usage >= MAX_DAILY_USAGE) {
    throw new Error('Daily usage limit exceeded')
  }

  // destructure input data
  const {
    task,
    language,
    codeInput = '',
    convertTo = '',
    additionalInfo = '',
  } = data

  // prompt for each task
  let systemPrompt = ''
  let userPrompt = ''

  switch (task) {
    case 'generate':
      systemPrompt = `You are a code generator. Generate a clean, idiomatic ${language} snippet.`
      userPrompt = `Instructions: ${additionalInfo}`
      break
    case 'explain':
      systemPrompt = `You are a senior developer who explains ${language} code clearly.`
      userPrompt = `Code:\n${codeInput}\n\nExtra info:\n${additionalInfo}`
      break
    case 'debug':
      systemPrompt = `You are a code reviewer. Find bugs and suggest improvements in this ${language} code.`
      userPrompt = `Code:\n${codeInput}\n\nExtra info:\n${additionalInfo}`
      break
    case 'convert':
      systemPrompt = `You are a code converter. Convert code from ${language} to ${convertTo}.`
      userPrompt = `Code:\n${codeInput}\n\nExtra info:\n${additionalInfo}`
      break
    default:
      throw new Error('Invalid task')
  }

  // Stream Request to OpenAI
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  })

  // Update user usage count
  if (!isAdmin) {
    await prisma.user.update({
      where: { clerkId: userId },
      data: {
        dailyUsageCount: isSameDay ? usage + 1 : 1,
        lastUsedAt: now,
      },
    })
  }

  // Stream Response to Client
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      for await (const part of response) {
        const text = part.choices?.[0]?.delta?.content
        if (text) {
          controller.enqueue(encoder.encode(text))
        }
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
