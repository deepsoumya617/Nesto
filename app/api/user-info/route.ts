import { getUser } from '@/lib/actions/user'

export async function GET() {
  try {
    const data = await getUser()
    return Response.json(data)
  } catch {
    return new Response('Unauthorized', { status: 401 })
  }
}
