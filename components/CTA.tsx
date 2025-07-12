import { motion } from 'framer-motion'
import { Button } from './ui/button'

export default function CTA() {
  return (
    <section className="w-full px-4 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 className="text-3xl tracking-tighter md:text-5xl">
          Ready to boost <br />
          Your productivity?
        </h2>
        <p className="text-muted-foreground font-geist mx-auto mt-3 max-w-2xl text-[18px] tracking-tight">
          Start organizing your code, notes, and ideas — all in one place,
          powered by AI.
        </p>
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
    </section>
  )
}
