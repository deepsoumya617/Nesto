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
  ChartBarStacked,
  ChartPie,
  CreditCard,
  FileChartColumn,
  FileJson2,
  Notebook,
  NotebookPen,
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Note, Snippet } from '@/lib/generated/prisma'
import { useTheme } from 'next-themes'
import { Badge } from '@/components/ui/badge'

const geist = Geist({
  subsets: ['latin'],
  preload: true,
})

// for pie chart
const COLORS = [
  '#22c55e', // green
  '#0ea5e9', // blue
  '#8b5cf6', // purple
  '#f472b6', // pink
  '#facc15', // yellow
  '#f97316', // orange
  '#e11d48', // rose
  '#14b8a6', // teal
  // '#6366f1', // Indigo
  // '#10b981', // Emerald
  // '#f59e0b', // Amber
  // '#ef4444', // Red
  // '#14b8a6', // Teal
  // '#8b5cf6', // Violet
  // '#f43f5e', // Rose
  // '#0ea5e9', // Sky
]

// for bar chart
const tagsChartData = [
  { tag: 'auth', count: 10 },
  { tag: 'api', count: 11 },
  { tag: 'hooks', count: 9 },
  { tag: 'utils', count: 14 },
  { tag: 'typescript', count: 5 },
  { tag: 'nextjs', count: 4 },
]

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
  const { resolvedTheme } = useTheme()

  // full language name and icons
  const fullLanguageNamesWithIcons = languageData.map((lang) => {
    switch (lang.name) {
      case 'js':
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2500"
              height="2500"
              viewBox="0 0 1052 1052"
            >
              <path fill="#f0db4f" d="M0 0h1052v1052H0z" />
              <path
                d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z"
                fill="#323330"
              />
            </svg>
          ),
          label: 'JavaScript',
        }
      case 'ts':
        return {
          icon: (
            <svg
              viewBox="0 0 256 256"
              width="256"
              height="256"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
                fill="#3178C6"
              />
              <path
                d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
                fill="#FFF"
              />
            </svg>
          ),
          label: 'Typescript',
        }
      case 'py':
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="16 16 32 32"
            >
              <path
                fill="url(#a)"
                d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"
              />
              <path
                fill="url(#b)"
                d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"
              />
              <defs>
                <linearGradient
                  id="a"
                  x1="19.075"
                  x2="34.898"
                  y1="18.782"
                  y2="34.658"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#387EB8" />
                  <stop offset="1" stopColor="#366994" />
                </linearGradient>
                <linearGradient
                  id="b"
                  x1="28.809"
                  x2="45.803"
                  y1="28.882"
                  y2="45.163"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFE052" />
                  <stop offset="1" stopColor="#FFC331" />
                </linearGradient>
              </defs>
            </svg>
          ),
          label: 'Python',
        }
      case 'java':
        return {
          icon: (
            <svg
              viewBox="0 0 256 256"
              width="256"
              height="256"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
                fill="#3178C6"
              />
              <path
                d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
                fill="#FFF"
              />
            </svg>
          ),
          label: 'Java',
        }
      case 'cpp':
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="256"
              height="288"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 288"
            >
              <path
                fill="#649AD2"
                d="M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781-2.054-3.608-5.133-6.632-9.261-9.023-34.08-19.651-68.195-39.242-102.264-58.913-9.185-5.303-18.09-5.11-27.208.27-13.565 8-81.48 46.91-101.719 58.632C4.071 67.6.015 74.984.013 84.58 0 124.101.013 163.62 0 203.141c0 4.73.993 8.923 2.993 12.537 2.056 3.717 5.177 6.824 9.401 9.269 20.24 11.722 88.164 50.63 101.726 58.631 9.121 5.382 18.027 5.575 27.215.27 34.07-19.672 68.186-39.262 102.272-58.913 4.224-2.444 7.345-5.553 9.401-9.267 1.997-3.614 2.992-7.806 2.992-12.539 0 0 0-79.018-.013-118.539"
              />
              <path
                fill="#004482"
                d="m128.392 143.476-125.4 72.202c2.057 3.717 5.178 6.824 9.402 9.269 20.24 11.722 88.164 50.63 101.726 58.631 9.121 5.382 18.027 5.575 27.215.27 34.07-19.672 68.186-39.262 102.272-58.913 4.224-2.444 7.345-5.553 9.401-9.267l-124.616-72.192"
              />
              <path
                fill="#1A4674"
                d="M91.25 164.863c7.297 12.738 21.014 21.33 36.75 21.33 15.833 0 29.628-8.7 36.888-21.576l-36.496-21.141-37.142 21.387"
              />
              <path
                fill="#01589C"
                d="M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781l-124.465 71.667 124.616 72.192c1.997-3.614 2.99-7.806 2.992-12.539 0 0 0-79.018-.013-118.539"
              />
              <path
                fill="#FFF"
                d="M249.135 148.636h-9.738v9.74h-9.74v-9.74h-9.737V138.9h9.737v-9.738h9.74v9.738h9.738v9.737ZM128 58.847c31.135 0 58.358 16.74 73.17 41.709l.444.759-37.001 21.307c-7.333-12.609-20.978-21.094-36.613-21.094-23.38 0-42.333 18.953-42.333 42.332a42.13 42.13 0 0 0 5.583 21.003c7.297 12.738 21.014 21.33 36.75 21.33 15.659 0 29.325-8.51 36.647-21.153l.241-.423 36.947 21.406c-14.65 25.597-42.228 42.851-73.835 42.851-31.549 0-59.084-17.185-73.754-42.707-7.162-12.459-11.26-26.904-11.26-42.307 0-46.95 38.061-85.013 85.014-85.013Zm75.865 70.314v9.738h9.737v9.737h-9.737v9.74h-9.738v-9.74h-9.738V138.9h9.738v-9.738h9.738Z"
              />
            </svg>
          ),
          label: 'C++',
        }
      case 'go':
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 100 100"
            >
              <path
                fill="#00ACD7"
                d="M7.547 42.312c-.195 0-.243-.097-.146-.243l1.022-1.315c.098-.146.341-.243.536-.243H26.34c.194 0 .243.146.146.292l-.828 1.266c-.097.146-.34.292-.487.292zm-7.352 4.48c-.195 0-.243-.098-.146-.244l1.022-1.314c.098-.146.341-.244.536-.244h22.202c.195 0 .292.146.243.292l-.39 1.169c-.048.195-.243.292-.437.292zm11.783 4.48c-.195 0-.244-.147-.146-.293l.681-1.217c.098-.146.292-.292.487-.292h9.738c.195 0 .292.146.292.34l-.098 1.169c0 .195-.194.34-.34.34zm50.538-9.836c-3.067.779-5.16 1.363-8.18 2.142-.73.195-.779.244-1.411-.487-.73-.827-1.266-1.363-2.289-1.85-3.067-1.51-6.037-1.07-8.812.73-3.311 2.143-5.015 5.308-4.967 9.251.05 3.895 2.727 7.109 6.573 7.645 3.311.438 6.086-.73 8.277-3.214.439-.535.828-1.12 1.315-1.801h-9.397c-1.022 0-1.266-.633-.925-1.461.633-1.51 1.801-4.041 2.483-5.307.146-.292.487-.78 1.217-.78h17.723c-.098 1.316-.098 2.63-.292 3.945-.536 3.505-1.85 6.719-3.993 9.543-3.505 4.625-8.082 7.498-13.876 8.277-4.771.632-9.202-.293-13.097-3.214-3.603-2.726-5.648-6.33-6.184-10.809-.632-5.307.926-10.078 4.139-14.265 3.457-4.528 8.034-7.401 13.633-8.423 4.576-.828 8.958-.293 12.902 2.385 2.58 1.704 4.43 4.041 5.648 6.865.292.439.097.682-.487.828"
              />
              <path
                fill="#00ACD7"
                d="M78.632 68.36c-4.43-.097-8.472-1.362-11.88-4.284-2.872-2.483-4.674-5.648-5.258-9.397-.877-5.501.633-10.37 3.944-14.704 3.554-4.674 7.838-7.108 13.632-8.13 4.966-.877 9.64-.39 13.876 2.483 3.847 2.629 6.233 6.183 6.865 10.857.828 6.573-1.07 11.929-5.599 16.505-3.213 3.263-7.157 5.308-11.685 6.233-1.314.243-2.63.292-3.895.438M90.22 48.69c-.049-.632-.049-1.12-.146-1.606-.877-4.82-5.307-7.547-9.933-6.476-4.528 1.023-7.449 3.896-8.52 8.472-.876 3.798.974 7.644 4.48 9.202 2.677 1.169 5.355 1.023 7.936-.292 3.846-1.996 5.94-5.112 6.183-9.3"
              />
            </svg>
          ),
          label: 'Go',
        }
    }
  })

  return (
    <Container>
      {/* avatar */}
      <div className="-mt-1 flex items-center space-x-3">
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
                  <li
                    className="group flex cursor-pointer items-center gap-1 py-2 text-base text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-200"
                    key={snippet.id}
                  >
                    <span>{snippet.title}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </li>
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
                  <li
                    className="group flex cursor-pointer items-center gap-1 py-2 text-base text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-200"
                    key={note.id}
                  >
                    <span>{note.title}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </li>
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
        {/* language pie chart */}
        <Card className="bg-transparent shadow-none">
          <CardHeader className="-mb-4">
            <CardTitle className="flex items-center gap-1 text-xl font-bold">
              <ChartPie size={20} />
              Language Usage
            </CardTitle>
            <CardDescription className="text-md text-muted-foreground ml-1 tracking-wide">
              Most used snippet languages.
            </CardDescription>
          </CardHeader>
          <CardContent className="-mb-2">
            {languageData.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No snippets yet. Create some to see language stats.
              </p>
            ) : (
              <ChartContainer
                className="[&_.recharts-pie-label-text]:fill-foreground mx-auto my-3 aspect-square max-h-[250px] pb-0"
                config={{}}
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={languageData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={40}
                    isAnimationActive
                    animationDuration={800}
                    // labelLine={false}
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
                          fill={
                            resolvedTheme === 'dark' ? '#d1d5db' : '#374151'
                          }
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          fontSize={13}
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
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
          <CardFooter className="-mt-2 ml-1 flex flex-wrap items-center gap-2">
            {fullLanguageNamesWithIcons.map((lang, index) => {
              return (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center justify-center gap-1 px-3.5 py-2"
                >
                  <span className="h-4 w-4 [&>svg]:h-full [&>svg]:w-full">
                    {lang?.icon}
                  </span>
                  <span
                    className={`${geist.className} text-[12px] font-semibold tracking-wide`}
                  >
                    {lang?.label}
                  </span>
                </Badge>
              )
            })}
          </CardFooter>
        </Card>

        {/* top tags chart */}
        <Card className="bg-transparent shadow-none">
          <CardHeader className="-mb-4">
            <CardTitle className="flex items-center gap-1 text-xl font-bold">
              <ChartBarStacked size={20} />
              Popular Tags
            </CardTitle>
            <CardDescription className="text-md text-muted-foreground ml-1 tracking-wide">
              Explore your most commonly used tags in snippets.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <ChartContainer config={{ count: { label: 'snippets' } }}>
              <BarChart accessibilityLayer data={tagsChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="tag"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    value.charAt(0).toUpperCase() + value.slice(1)
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="count" fill="#f43f5e" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
