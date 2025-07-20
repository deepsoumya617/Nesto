'use server'

import { AttachMentInput, sendEmailOptions } from '@/types/email'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export async function buildAttachments({ files }: AttachMentInput) {
  if (!files || files.length === 0) return []

  return await Promise.all(
    files
      .filter((file) => file && file.size > 0 && file.size <= MAX_FILE_SIZE)
      .map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()).toString('base64'),
        type: file.type,
        disposition: 'attachment',
      })),
  )
}

export async function sendEmail({
  to,
  from,
  subject,
  html,
  attachments = [],
}: sendEmailOptions) {
  try {
    await resend.emails.send({
      to,
      from,
      subject,
      html,
      attachments,
    })

    return {
      success: true,
      message: 'Email sent successfully! We will get back to you soon.',
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      success: false,
      message: 'Failed to send email. Please try again later.',
    }
  }
}
