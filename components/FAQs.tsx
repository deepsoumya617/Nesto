import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

const faqs = [
  {
    question: 'What is the daily AI limit?',
    answer: 'Free users can use the AI assistant up to 10 times per day.',
  },
  {
    question: 'Can I use this without an account?',
    answer:
      'Currently, you need to sign in to manage your snippets and notes securely.',
  },
  {
    question: 'Can I self-host Nesto?',
    answer: 'Absolutely. It’s fully open source on GitHub.',
  },
  {
    question: 'Can I contribute to this project?',
    answer: 'Yes! Nesto is open source on GitHub. PRs are always welcome.',
  },
  {
    question: 'Will there be a pro version?',
    answer:
      "We're exploring it! But the core features will always stay free and open.",
  },
  {
    question: 'Is my data private?',
    answer:
      'Yes. Your notes and snippets are tied to your account and not shared.',
  },
]

export default function FAQs() {
  return (
    <section className="w-full px-5 py-24 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl tracking-tighter md:text-4xl">FAQs.</h2>
        <p className="text-muted-foreground font-geist mx-auto mt-1 max-w-2xl text-[16px] tracking-tight">
          Got questions? We’ve got answers.
        </p>
      </div>
      <Accordion
        type="single"
        collapsible
        className="font-geist mx-auto mt-8 w-full max-w-lg text-center"
        defaultValue="item-1"
      >
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="cursor-pointer text-base font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-left text-sm">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
