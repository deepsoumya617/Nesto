import { Separator } from '@/components/ui/separator'
import { Shield } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="font-geist mx-auto flex w-full max-w-4xl flex-col px-10 py-9 tracking-tight">
      <div className="flex items-center gap-1">
        <Shield />
        <h1 className="text-3xl">Privacy Policy</h1>
      </div>
      <p className="text-muted-foreground ml-1 text-[14px] tracking-tight">
        Last updated: July 20, 2025
      </p>

      <Separator className="my-6" />

      <section className="text-muted-foreground space-y-6 text-sm leading-relaxed">
        <div>
          <h2 className="text-foreground text-base font-semibold">
            1. Introduction
          </h2>
          <p>
            This Privacy Policy explains how we collect, use, and protect your
            personal information when you use our service (Next Drive). By using
            our application, you agree to the terms outlined here.
          </p>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-5">
            <li>
              Email address and authentication data (via Clerk)
            </li>
            <li>Snippets, notes, and file metadata you save</li>
            <li>Usage data (analytics, click paths, feature use)</li>
            <li>IP address, device, and browser info (for security)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc pl-5">
            <li>To provide and improve the core functionality</li>
            <li>To respond to support queries or bug reports</li>
            <li>To analyze usage patterns and enhance UX</li>
            <li>To prevent abuse and ensure security</li>
          </ul>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            4. Sharing & Disclosure
          </h2>
          <p>We never sell your personal data. We only share it with:</p>
          <ul className="list-disc pl-5">
            <li>Service providers (like database, hosting, AI tools)</li>
            <li>Law enforcement if legally required</li>
            <li>Other users only if you explicitly share content</li>
          </ul>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            5. Cookies & Tracking
          </h2>
          <p>
            We use cookies to keep you logged in and to remember preferences.
            Some third-party analytics tools may also store cookies for
            measuring app performance.
          </p>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            6. Data Retention
          </h2>
          <p>
            We retain your content (notes, snippets) until you delete it
            or your account. Inactive accounts may be removed after a prolonged
            period, with prior notice.
          </p>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            7. Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5">
            <li>Access or export your data</li>
            <li>Delete your account and content</li>
            <li>Withdraw consent for processing</li>
          </ul>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Major changes
            will be announced via in-app notification or email.
          </p>
        </div>

        <div>
          <h2 className="text-foreground text-base font-semibold">
            9. Contact Us
          </h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please
            contact us{' '}
            <Link
              href="/contact"
              className="text-primary underline hover:text-blue-500"
            >here!</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
