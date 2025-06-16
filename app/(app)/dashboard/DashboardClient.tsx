'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import Container from '@/components/Container'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
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
  ArrowUpRight,
  ChartPie,
  CreditCard,
  FileChartColumn,
  FileJson2,
  Notebook,
  NotebookPen,
} from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Note, Snippet } from '@/lib/generated/prisma'

const geist = Geist({
  subsets: ['latin'],
  preload: true,
})

const COLORS = ['#4ade80', '#22d3ee', '#a78bfa', '#f472b6', '#facc15']

export default function DashboardClient({
  snippetCount,
  percentChangeSnippets,
  noteCount,
  percentChangeNotes,
  snippets,
  notes,
  languageData,
}: {
  snippetCount: number
  percentChangeSnippets: number
  noteCount: number
  percentChangeNotes: number
  snippets: Pick<Snippet, 'title' | 'id'>[]
  notes: Pick<Note, 'title' | 'id'>[]
  languageData: { name: string; value: number }[]
}) {
  const { user } = useUser()

  return (
    <Container>
      {/* avatar */}
      <div className="-mt-2 flex items-center space-x-3">
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
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* snippets card */}
        <Card className="bg-transparent shadow-none">
          <CardHeader className="-mb-2">
            <CardTitle className="flex items-center gap-1 text-xl font-bold">
              <FileJson2 size={22} />
              Snippets
            </CardTitle>
            <CardDescription className="text-md ml-1 tracking-wide">
              Total Snippets ~{' '}
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {snippetCount}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="-mb-2">
            <p className="text-muted-foreground flex items-center gap-1 text-[16px]">
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
                variant="outline"
                className="flex cursor-pointer items-center gap-1 tracking-wide"
              >
                View Snippets
                <ArrowRight />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* notes card */}
        <Card className="bg-transparent shadow-none">
          <CardHeader className="-mb-2">
            <CardTitle className="flex items-center gap-1 text-xl font-bold">
              <NotebookPen size={22} />
              Notes
            </CardTitle>
            <CardDescription className="text-md ml-1 tracking-wide">
              Total Notes ~{' '}
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {noteCount}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="-mb-2">
            <p className="text-muted-foreground flex items-center gap-1 text-[16px]">
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
                variant="outline"
                className="flex cursor-pointer items-center gap-1 tracking-wide"
              >
                View Notes
                <ArrowRight />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* ai overview card */}
        <Card className="bg-transparent shadow-none">
          <CardHeader className="-mb-4">
            <CardTitle className="flex items-center gap-1 text-xl font-bold">
              <CreditCard size={22} />
              Account Usage
            </CardTitle>
            <CardDescription className="text-md text-muted-foreground ml-1 tracking-wide">
              Free Plan ~ Credits reset on 1 July!
            </CardDescription>
          </CardHeader>
          <CardContent className="-mb-2 flex flex-col gap-2">
            <div className="flex w-full items-center gap-1.5 pl-1">
              <span className="text-muted-foreground">AI Credits Used ~ </span>
              <span className="font-bold">12 / 50</span>
            </div>
            <Progress value={12} />
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="flex cursor-pointer items-center gap-1 tracking-wide"
            >
              Upgrade to Pro
              <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* 2nd row */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* snippets */}
        <Card className="bg-transparent shadow-none">
          <CardHeader className="-mb-4">
            <CardTitle className="flex items-center gap-1 text-xl font-bold">
              <FileChartColumn size={22} />
              Recent Snippets
            </CardTitle>
            <CardDescription className="text-md text-muted-foreground ml-1 tracking-wide">
              Your latest code snippets ~ updated in real-time.
            </CardDescription>
            {/* <div className="border"></div> */}
          </CardHeader>
          <CardContent className="-mb-2">
            <ul className="divide-border ml-1.5 divide-y">
              {snippets.length > 0 ? (
                snippets.slice(0, 5).map((snippet) => (
                  <div
                    className="group flex items-center gap-1"
                    key={snippet.id}
                  >
                    <li className="cursor-pointer py-2 text-base text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-200">
                      {snippet.title}
                    </li>
                    <ArrowUpRight
                      size={14}
                      className="translate-y-0 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </div>
                ))
              ) : (
                <p className="py-2 text-sm text-zinc-500">No snippets yet.</p>
              )}
            </ul>
          </CardContent>
        </Card>
        {/* notes */}
        <Card className="bg-transparent shadow-none">
          <CardHeader className="-mb-4">
            <CardTitle className="flex items-center gap-1 text-xl font-bold">
              <Notebook size={22} />
              Recent Notes
            </CardTitle>
            <CardDescription className="text-md text-muted-foreground ml-1 tracking-wide">
              Your latest Notes ~ updated in real-time.
            </CardDescription>
          </CardHeader>
          <CardContent className="-mb-2">
            <ul className="divide-border ml-1.5 divide-y">
              {notes.length > 0 ? (
                notes.slice(0, 5).map((note) => (
                  <div className="group flex items-center gap-1" key={note.id}>
                    <li className="cursor-pointer py-2 text-base text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-200">
                      {note.title}
                    </li>
                    <ArrowUpRight
                      size={14}
                      className="translate-y-0 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </div>
                ))
              ) : (
                <p className="py-2 text-sm text-zinc-500">No notes yet.</p>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 3rd row */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="bg-transparent shadow-none">
          <CardHeader className="-mb-4">
            <CardTitle className="flex items-center gap-1 text-xl font-bold">
              <ChartPie size={20} />
              Language Usage
            </CardTitle>
            <CardDescription className="text-md text-muted-foreground ml-1 tracking-wide">
              Tracks your most recent snippet languages.
            </CardDescription>
          </CardHeader>
          <CardContent className="-mb-2">
            {languageData.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No snippets yet. Create some to see language stats.
              </p>
            ) : (
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={languageData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={40}
                      isAnimationActive={true}
                      animationDuration={800}
                      labelLine={false}
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        percent,
                        index,
                      }) => {
                        const RADIAN = Math.PI / 180
                        const radius =
                          25 + innerRadius + (outerRadius - innerRadius)
                        const x = cx + radius * Math.cos(-midAngle * RADIAN)
                        const y = cy + radius * Math.sin(-midAngle * RADIAN)

                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#888"
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                            fontSize={14}
                            fontWeight={500}
                          >
                            {`${languageData[index].name} (${(percent * 100).toFixed(0)}%)`}
                          </text>
                        )
                      }}
                    >
                      {languageData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      wrapperStyle={{ fontSize: '0.85rem' }}
                      formatter={(value: number, name: string) => [
                        `${value}`,
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
