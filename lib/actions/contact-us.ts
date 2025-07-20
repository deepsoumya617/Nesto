'use server'

import { sendEmail } from '../sendEmail'

export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name')?.toString() || 'Anonymous'
  const email = formData.get('email')?.toString() || 'Not provided'
  const description =
    formData.get('description')?.toString() || 'No description provided'

  const htmlContent = `
        <h1>New Contact Message</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
    `

  return sendEmail({
    to: 'soumyadeepghosh617@gmail.com',
    from: 'Contact Form <contact@resend.dev>',
    subject: `New message from ${name}`,
    html: htmlContent,
  })
}
