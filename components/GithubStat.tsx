'use client'

import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { GitGraph, GitMerge } from 'lucide-react'
import Link from 'next/link'
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
} from 'date-fns'

export function formatShortTimeAgo(date: string) {
  const parsed = new Date(date)
  const now = new Date()

  const minutes = differenceInMinutes(now, parsed)
  if (minutes < 60) return `${minutes}m`

  const hours = differenceInHours(now, parsed)
  if (hours < 24) return `${hours}h`

  const days = differenceInDays(now, parsed)
  if (days < 7) return `${days}d`

  const weeks = differenceInWeeks(now, parsed)
  return `${weeks}w`
}

export default function GithubStat() {
  // fetch stars and recent commits from GitHub API
  const [stars, setStars] = useState<number | null>(null)
  const [commits, setCommits] = useState<{ message: string; date: string }[]>(
    [],
  )

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const repoRes = await fetch(
          'https://api.github.com/repos/deepsoumya617/nesto',
        )
        if (!repoRes.ok) throw new Error('Failed to fetch stars')
        const data = await repoRes.json()
        setStars(data.stargazers_count)

        const commitsRes = await fetch(
          'https://api.github.com/repos/deepsoumya617/nesto/commits',
        )
        if (!commitsRes.ok) throw new Error('Failed to fetch commits')
        const commitsData = await commitsRes.json()
        const messages = commitsData.slice(0, 6).map((commit: any) => ({
          message: commit.commit.message,
          date: commit.commit.author.date,
        }))
        setCommits(messages)
      } catch (err) {
        console.error(err)
      }
    }
    fetchGithubData()
  }, [])

  return (
    <section className="w-full px-4 py-24 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl tracking-tighter md:text-4xl">
          Open Source. Forever!
        </h2>
        <p className="text-muted-foreground font-geist mx-auto mt-2 max-w-2xl text-[16px] tracking-tight">
          Star us, fork us, or contribute to make it better.
        </p>
        {/* github star */}
        <Link
          href="https://github.com/deepsoumya617/nesto"
          target="_blank"
          className="group"
        >
          <Badge
            variant="outline"
            className="mt-5 gap-1.5 rounded-none border-black/30 px-7 py-3"
          >
            <img src="/GitHub_light.svg" className="size-3.5" />
            <p className="font-geist text-sm">Star on GitHub</p>
            <div className="ml-2 flex items-center gap-2 text-sm md:flex">
              <svg
                className="h-4 w-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300"
                data-slot="icon"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span className="inline-block font-mono font-medium tracking-wider text-black tabular-nums">
                {stars}
              </span>
            </div>
          </Badge>
        </Link>
        {/* recent commits */}
        <div className="pointer-events-none mt-8">
          <div className="flex items-center justify-center gap-1">
            <h3 className="font-geist text-lg font-semibold tracking-tight">
              Recent Commits
            </h3>
            <GitGraph size={18} />
          </div>
          <ul className="font-geist mx-auto mt-3 max-w-[375px] divide-y divide-black/10 border border-black/10 bg-white/80 text-left sm:max-w-[455px]">
            {commits.map((commit, idx) => (
              <li key={idx} className="flex items-start gap-3 px-4 py-4">
                <span className="mt-1 text-black/50">
                  <GitMerge className="h-4 w-4" />
                </span>
                <p className="line-clamp-2 text-sm leading-5 font-medium text-black">
                  {commit.message}
                </p>
                <span className="text-muted-foreground ml-4 mr-2 text-xs whitespace-nowrap font-medium">
                  {formatShortTimeAgo(commit.date)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
