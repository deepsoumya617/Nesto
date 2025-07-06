import { NextResponse } from 'next/server'
import { openai } from '@/lib/openai'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!
const MAX_DAILY_USAGE = 10

export async function POST(req: Request) {
  try {
    const { task, language, codeInput, convertTo, additionalInfo } =
      await req.json()

    // check if user is authenticated
    const { userId } = await auth()
    if (!userId)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // check if user exists on the database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })
    if (!user)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // check if user is an admin
    const isAdmin = user.email === ADMIN_EMAIL
    const lastUsed = user.lastUsedAt ?? new Date(0)
    const now = new Date()
    const isSameDay = lastUsed.toDateString() === now.toDateString()
    const usage = isSameDay ? user.dailyUsageCount : 0

    // check if user has exceeded daily usage limit
    if (!isAdmin && usage >= MAX_DAILY_USAGE) {
      return NextResponse.json(
        { error: 'Daily usage limit exceeded' },
        { status: 429 },
      )
    }

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
        return NextResponse.json({ error: 'Invalid task' }, { status: 400 })
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

    // return the stream as a response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('[ASK_AI_ERROR]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
