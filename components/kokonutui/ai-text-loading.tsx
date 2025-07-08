'use client'

/**
 * @author: @kokonutui
 * @description: AI Text Loading
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

interface AITextLoadingProps {
  texts?: string[]
  className?: string
  interval?: number
}

export default function AITextLoading({
  texts = [
    'Reading your snippet...',
    'Analyzing logic...',
    'Response incoming...',
  ],
  className,
  interval = 700,
}: AITextLoadingProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [interval, texts.length])

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="relative w-full px-4 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTextIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundPosition: ['200% center', '-200% center'],
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              opacity: { duration: 0.15 },
              y: { duration: 0.15 },
              backgroundPosition: {
                duration: 2.5,
                ease: 'linear',
                repeat: Infinity,
              },
            }}
            className={cn(
              'flex min-w-max justify-center bg-gradient-to-r from-neutral-950 via-neutral-400 to-neutral-950 bg-[length:200%_100%] bg-clip-text text-2xl font-bold whitespace-nowrap text-transparent dark:from-white dark:via-neutral-600 dark:to-white',
              className,
            )}
          >
            {texts[currentTextIndex]}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
