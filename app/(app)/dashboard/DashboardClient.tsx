'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import Container from '@/components/Container'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ActivityCalendar } from 'react-activity-calendar'
import { Geist } from 'next/font/google'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ArrowDownIcon,
  ArrowRight,
  ArrowUpIcon,
  CreditCard,
  FileJson2,
  NotebookPen,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const geist = Geist({
  subsets: ['latin'],
  preload: true,
})

// Generate full year activity data
const generateYearData = () => {
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 365)

  const data = []
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    data.push({
      date: d.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 20),
      level: Math.floor(Math.random() * 5),
    })
  }
  return data
}

const data = generateYearData()

export default function DashboardClient({
  snippetCount,
  percentChangeSnippets,
  noteCount,
  percentChangeNotes,
}: {
  snippetCount: number
  percentChangeSnippets: number
  noteCount: number
  percentChangeNotes: number
}) {
  const { user } = useUser()

  return (
    <Container>
      {/* avatar */}
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
        </Avatar>
        <h1 className={`${geist.className} text-2xl font-medium`}>
          Welcome,{' '}
          <span className="font-bold underline underline-offset-[5px]">
            {user?.firstName}!
          </span>
        </h1>
      </div>

      {/* top stats card */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* snippets card */}
        <Card className="bg-accent-background border-2 border-slate-200 shadow-none dark:border-slate-600">
          <CardHeader className="-mb-2">
            <CardTitle className="flex items-center gap-1 text-xl font-bold">
              <FileJson2 size={22} />
              Snippets
            </CardTitle>
            <CardDescription className="text-md ml-1 tracking-wide text-slate-500 dark:text-slate-300">
              Total Snippets ~{' '}
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {snippetCount}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="-mb-2">
            <p className="flex items-center gap-1 text-[16px] text-slate-400 dark:text-slate-400">
              {percentChangeSnippets >= 0 ? (
                <>
                  <ArrowUpIcon className="h-5 w-5 text-green-500" />
                  {percentChangeSnippets}% increase this week!
                </>
              ) : (
                <>
                  <ArrowDownIcon className="h-4 w-4 text-red-500" />
                  {Math.abs(percentChangeSnippets).toFixed(1)}% decrease this
                  week!
                </>
              )}
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/snippets">
              <Button
                variant={'outline'}
                className="flex cursor-pointer items-center gap-1 tracking-wide text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
              >
                View Snippets
                <ArrowRight />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* notes card */}
        <Card className="bg-accent-background border-2 border-slate-200 shadow-none dark:border-slate-600">
          <CardHeader className="-mb-2">
            <CardTitle className="flex items-center gap-1 text-xl font-bold">
              <NotebookPen size={22} />
              Notes
            </CardTitle>
            <CardDescription className="text-md ml-1 tracking-wide text-slate-500 dark:text-slate-300">
              Total Notes ~{' '}
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {noteCount}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="-mb-2">
            <p className="flex items-center gap-1 text-[16px] text-slate-400 dark:text-slate-400">
              {percentChangeNotes >= 0 ? (
                <>
                  <ArrowUpIcon className="h-5 w-5 text-green-500" />
                  {percentChangeNotes}% increase this week!
                </>
              ) : (
                <>
                  <ArrowDownIcon className="h-4 w-4 text-red-500" />
                  {Math.abs(percentChangeNotes).toFixed(1)}% decrease this week!
                </>
              )}
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/notes">
              <Button
                variant={'outline'}
                className="flex cursor-pointer items-center gap-1 tracking-wide text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
              >
                View Notes
                <ArrowRight />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* ai overview card */}
        <Card className="bg-accent-background border-2 border-slate-200 shadow-none dark:border-slate-600">
          <CardHeader className="-mb-4">
            <CardTitle className="flex items-center gap-1 text-xl font-bold">
              <CreditCard size={22} />
              Account Usage
            </CardTitle>
            <CardDescription className="text-md ml-1 tracking-wide text-slate-500 dark:text-slate-300">
              Free Plan ~ Credits reset on 1 July!
            </CardDescription>
          </CardHeader>
          <CardContent className="-mb-2 flex flex-col gap-2">
            <div className="flex w-full items-center gap-1.5 pl-1">
              <span className="text-slate-500">AI Credits Used ~ </span>
              <span className="font-bold text-slate-900 dark:text-slate-400">
                12 / 50
              </span>
            </div>
            <Progress value={12} />
          </CardContent>
          <CardFooter>
            <Button
              variant={'outline'}
              className="flex cursor-pointer items-center gap-1 tracking-wide text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            >
              Upgrade to Pro
              <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* full year activity calendar */}
      <div className="mb-6 h-48 rounded-lg border">
        <ActivityCalendar
          blockMargin={4}
          blockRadius={2}
          blockSize={12}
          colorScheme="dark"
          fontSize={14}
          maxLevel={4}
          weekStart={0}
          data={data}
        />
      </div>
    </Container>
  )
}
