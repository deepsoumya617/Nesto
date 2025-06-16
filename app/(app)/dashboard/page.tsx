'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import Container from '@/components/Container'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

const Page = () => {
  const { user } = useUser()

  return (
    <Container>
      <div className="flex items-center space-x-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
        </Avatar>
        <h1 className="text-3xl font-bold">Welcome, {user?.firstName}!</h1>
      </div>
    </Container>
  )
}

export default Page
