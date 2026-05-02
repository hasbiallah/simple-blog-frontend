import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { LoginCredentials } from '../types/auth.types'
import Button from '@/shared/components/ui/Button'
import Input from '@/shared/components/ui/Input'

export default function LoginForm() {
  const { login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard'
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>()

  async function onSubmit(data: LoginCredentials) {
    setApiError(null)
    try {
      await login(data)
      navigate(from, { replace: true })
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status
      if (status === 401) {
        setApiError('Email atau password salah.')
      } else {
        setApiError('Terjadi kesalahan. Silakan coba lagi.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      {apiError && (
        <div className="rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-600">
          {apiError}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        placeholder="nama@email.com"
        register={register('email', {
          required: 'Email wajib diisi.',
          pattern: { value: /\S+@\S+\.\S+/, message: 'Format email tidak valid.' },
        })}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Masukkan password"
        register={register('password', {
          required: 'Password wajib diisi.',
          minLength: { value: 6, message: 'Password minimal 6 karakter.' },
        })}
        error={errors.password?.message}
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Masuk
      </Button>

      <p className="text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </form>
  )
}
