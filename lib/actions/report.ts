'use server'

import { buildAttachments, sendEmail } from '@/lib/sendEmail'

export async function sendReportEmail(formData: FormData) {
  // get form data
  const title = formData.get('title')?.toString() || 'No title provided'
  const description =
    formData.get('description')?.toString() || 'No description provided'
  const email = formData.get('email')?.toString() || 'Not provided'
  const type = formData.get('type')?.toString() || 'Not specified'

  const screenshots = formData.getAll('screenshots') as File[]
  console.log('Screenshots:', screenshots)

  const attachments = await buildAttachments({ files: screenshots })
  console.log(attachments)

  // send email using Resend
  const html = `
    <h2>${title}</h2>
    <p><strong>Type:</strong> ${type}</p>
    <p><strong>Description:</strong><br/>${description}</p>
    <p><strong>Contact Email:</strong> ${email}</p>
  `

  return sendEmail({
    to: 'soumyadeepghosh617@gmail.com',
    from: 'Report Bot <report@resend.dev>',
    subject: `Issue Reported: ${title}`,
    html,
    attachments,
  })
}
