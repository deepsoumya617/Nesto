// 'use client'

export function GradientBlob() {
  return (
    <div
      className="absolute -top-64 left-1/2 transform -translate-x-1/2 h-[300px] max-w-[800px] w-full rounded-full pointer-events-none
      blur-[120px] opacity-30 -z-20 bg-[length:400%_400%] bg-[linear-gradient(to_right,_#ff0000,_#ff9900,_#ffff00,_#33cc33,_#3399ff,_#9900cc,_#ff3399)] animate-gradient-x"
    />
  )
}

// colors
// from-orange-400 via-pink-500 to-violet-600
// bg-gradient-to-r from-red-500 via-yellow-400 to-green-400
// bg-[linear-gradient(to_right,_#f87171,_#fb923c,_#facc15,_#4ade80,_#60a5fa,_#a78bfa,_#f472b6)]
// bg-gradient-to-r from-pink-500 via-red-400 to-yellow-300
