import { Separator } from '@/components/ui/separator'
import { NotepadText } from 'lucide-react'
import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8 lg:px-8">
      <div className="flex items-center gap-1">
        <NotepadText />
        <h1 className="text-3xl font-bold">Terms of Service</h1>
      </div>
      <p className="text-muted-foreground mt-2 text-sm">
        Last updated: July 20, 2025
      </p>

      <Separator className="my-6" />

      <section className="text-muted-foreground space-y-6 text-sm leading-relaxed px-2">
        <div>
          <h2 className="text-foreground text-base font-semibold">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Nesto, you agree to be bound by these Terms of
            Service and our Privacy Policy. If you do not agree, please do not
            use our service.
          </p>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            2. Description of Service
          </h2>
          <p>
            Nesto is a cloud-based platform for managing code snippets, notes,
            and other personal content. Features may evolve over time and may
            require a user account to access.
          </p>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            3. User Accounts
          </h2>
          <ul className="list-disc pl-5">
            <li>
              You must provide accurate and complete registration information.
            </li>
            <li>
              You are responsible for safeguarding your login credentials.
            </li>
            <li>
              You must be at least 13 years old or meet the legal age in your
              country.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            4. Acceptable Use
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5">
            <li>Upload harmful, illegal, or abusive content</li>
            <li>Attempt to hack or reverse-engineer the platform</li>
            <li>Violate any applicable laws</li>
          </ul>
          <p>
            Abuse or misuse of the service may result in suspension or
            termination of your account.
          </p>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            5. Content Ownership
          </h2>
          <p>
            You retain ownership of content you create and upload (notes,
            snippets, etc.). By using our service, you grant us a limited
            license to store and display your content solely to provide the
            service.
          </p>
          <p>
            All platform code and design remain the intellectual property of
            Next Drive and its creators.
          </p>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            6. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate your account at any
            time, especially in cases of abuse, legal violations, or
            non-compliance with these terms. You may also delete your account at
            any time.
          </p>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            7. Disclaimer & Limitation of Liability
          </h2>
          <p>
            The service is provided “as is” without warranties of any kind. We
            are not liable for any data loss, downtime, or indirect damages
            resulting from the use or inability to use the service.
          </p>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            8. Changes to Terms
          </h2>
          <p>
            We may update these terms occasionally. Continued use after changes
            implies acceptance. You are encouraged to review this page
            periodically.
          </p>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            9. Contact
          </h2>
          <p>
            For questions about these terms, please contact us:{' '}
            <Link
              href="/contact"
              className="text-primary underline hover:text-blue-500"
            >
              here!
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
