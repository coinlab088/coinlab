import { useId } from 'react'

interface TextFieldProps {
  label: string
  type?: 'text' | 'email' | 'password'
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  autoComplete?: string
}

export function TextField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}: TextFieldProps) {
  const id = useId()

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 block text-body-sm text-secondary">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`h-12 w-full rounded-md border bg-sunken px-4 text-body text-primary outline-none transition-colors duration-200 placeholder:text-primary-muted ${
          error ? 'border-danger' : 'border-border focus:border-brand'
        }`}
      />
      {error && (
        <p className="mt-1 text-body-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
