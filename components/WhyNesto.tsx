import { Check, X } from 'lucide-react'

export default function WhyNesto() {
  return (
    <section className="w-full px-4 py-24 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl tracking-tighter md:text-4xl">
          Why Choose Nesto?
        </h2>
        <p className="text-muted-foreground mx-auto mt-2 max-w-2xl text-[16px] leading-5 tracking-tight font-geist">
          Traditional tools scatter your thinking and your code.
          <br /> Nesto brings everything you need into one focused space.
        </p>
      </div>
      <div className="relative mx-auto mt-10 w-[90%] tracking-tight sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[55%]">
        <div className="w-full border-t border-black/30" />
        <div className="lg relative mx-4 -mt-4 h-fit border-x border-black/30">
          <div className="absolute top-0 left-1/2 mt-4 hidden xl:h-[89%] w-px bg-black/30 lg:block lg:h-[92%]" />
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Problems */}
            <div className="border-black/30 py-7 font-geist">
              <div className="flex items-center justify-center gap-0.5">
                <X size={20} />
                <h1>Problems</h1>
              </div>
              <div className="mt-2 divide-y divide-black/10 text-[15px] leading-relaxed font-medium tracking-tight text-neutral-800 text-center lg:text-left">
                <p className="px-3 py-2">
                  Creating extra files just to store a small snippet.
                </p>
                <p className="px-3 py-2">
                  Hunting for old code in past projects or folders.
                </p>
                <p className="px-3 py-2">
                  No simple way to save AI-generated snippets.
                </p>
                <p className="px-3 py-2">
                  Code and notes scattered across different apps.
                </p>
                <p className="px-3 py-2">
                  Forgetting reusable patterns or edge cases.
                </p>
              </div>
            </div>

            {/* Solutions */}
            <div className="border-t border-black/30 py-7 lg:border-t-0 font-geist">
              <div className="flex items-center justify-center gap-0.5">
                <Check size={20} />
                <h1>Solutions</h1>
              </div>
              <div className="mt-2 divide-y divide-black/10 text-[15px] leading-relaxed font-medium tracking-tight text-neutral-800 text-center lg:text-left font-geist">
                <p className="px-3 py-2">
                  Save any snippet instantly — no extra files.
                </p>
                <p className="px-3 py-2">
                  Search snippets by name, tag, or content.
                </p>
                <p className="px-3 py-2">
                  Save AI output directly into your snippet list.
                </p>
                <p className="px-3 py-2">
                  Unify code, notes, and AI in one workspace.
                </p>
                <p className="px-3 py-2">
                  Keep reusable logic and patterns organized.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="-mt-4 w-full border-b border-black/30" />
      </div>
    </section>
  )
}
