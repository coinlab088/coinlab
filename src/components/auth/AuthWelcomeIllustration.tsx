import { Check, Smartphone } from 'lucide-react'

export function AuthWelcomeIllustration() {
  return (
    <div
      className="relative flex h-28 w-28 items-center justify-center rounded-full border border-border-subtle bg-elevated"
      aria-hidden
    >
      <div className="absolute inset-3 rounded-full border border-border-subtle/60" />
      <Smartphone className="h-10 w-10 text-brand" strokeWidth={1.25} />
      <span className="absolute -bottom-0.5 -right-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-brand-dark shadow-sm">
        <Check className="h-4 w-4" strokeWidth={2.5} />
      </span>
    </div>
  )
}
