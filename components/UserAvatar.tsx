'use client'

import { useClerk, useUser } from '@clerk/nextjs'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from './ui/dropdown-menu'
import Image from 'next/image'
import { Mail, LogOut } from 'lucide-react'
import ModeToggle from './themes/mode-toggle'

export function UserAvatar() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  if (!isLoaded || !user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer focus:outline-none shrink-0">
        <Image
          src={user.imageUrl}
          alt="user avatar"
          width={44}
          height={44}
          quality={100}
          priority
          unoptimized
          className="w-11 h-11 rounded-full border object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 rounded-sm pl-1">
        <DropdownMenuLabel>
          <p className="font-medium text-[15px]">{user.fullName}</p>
          <div className="flex items-center gap-1 pl-0.5">
            <Mail size={14} />
            <p className="text-xs tracking-wide text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="tracking-wide">
          <DropdownMenuItem className="hover:cursor-pointer">
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:cursor-pointer">
              Appearence
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <ModeToggle />
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut size={16} className="text-black dark:text-white" />
          <span className="text-sm tracking-wide">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}