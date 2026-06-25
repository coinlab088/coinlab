import { useId, type ReactNode } from 'react'

interface TextFieldProps {
  label: string
  type?: 'text' | 'email' | 'password'
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  helperText?: string
  suffix?: ReactNode
  autoComplete?: string
}

export function TextField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  suffix,
  autoComplete,
}: TextFieldProps) {
  const id = useId()

  return (
    <div className="mb-4">
      {label ? (
        <label htmlFor={id} className="mb-1 block text-body-sm text-secondary">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`h-12 w-full rounded-md border bg-sunken px-4 text-body text-primary outline-none transition-colors duration-200 placeholder:text-primary-muted ${
            suffix ? 'pr-14' : ''
          } ${error ? 'border-danger' : 'border-border focus:border-brand'}`}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-3 flex items-center">{suffix}</div>
        )}
      </div>
      {helperText && !error && (
        <p className="mt-1 text-caption text-secondary">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-body-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
