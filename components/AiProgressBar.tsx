'use client'

type AiProgressBarProps = {
  value: number
  max: number
}

export default function AiProgressBar({ value, max }: AiProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className="h-2 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
      <div
        className="bg-primary h-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
