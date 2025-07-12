import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Ripple } from './magicui/ripple'

export default function CTA() {
  return (
    <section className="w-full">
      <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Ripple numCircles={5} />
        </div>
        <div className="z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="font-geist text-3xl tracking-tighter md:text-5xl">
            Ready to boost <br />
            Your productivity?
          </h2>
          {/* <p className="text-muted-foreground font-geist mx-auto mt-3 max-w-2xl text-[16px] tracking-tight">
            Start organizing your code, notes, <br />
            and ideas — all in one place, powered by AI.
          </p> */}
          <motion.div
            className="mt-6"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Button
              className="font-geist cursor-pointer rounded-md px-5 py-5"
              onClick={() => window.open('/sign-in', '_blank')}
            >
              Try Nesto Now!
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
