// import { DM_Mono } from 'next/font/google'

// const dmMono = DM_Mono({
//   subsets: ['latin'],
//   weight: '400',
//   preload: true,
// })

type UserProps = {
  user: {
    name: string
    email: string
    imageUrl: string
    joinedAt: string
  }
}

// shadow-[5px_7px_0px_rgba(0,0,0,1)]

export function UserCard({ user }: UserProps) {
  return (
    <div
      className='border px-4 py-3 max-w-3xl mx-auto rounded-md bg-background text-sm text-muted-foreground'
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-1 tracking-wider">
        <p className="font-medium text-primary">👨‍💻{user.name}</p>
        <span className="hidden sm:inline">|</span>
        <p>📩{user.email}</p>
        <span className="hidden sm:inline">|</span>
        <p>⏳Joined At: {user.joinedAt}</p>
      </div>
    </div>
  )
}
