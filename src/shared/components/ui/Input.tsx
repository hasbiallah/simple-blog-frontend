import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  register?: UseFormRegisterReturn
}

export default function Input({ label, error, register, className = '', ...props }: InputProps) {
  const inputId = register?.name ?? props.id

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...props}
        {...register}
        id={inputId}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
