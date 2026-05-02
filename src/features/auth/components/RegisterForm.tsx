import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { RegisterCredentials } from '../types/auth.types'
import Button from '@/shared/components/ui/Button'
import Input from '@/shared/components/ui/Input'

export default function RegisterForm() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>()

  async function onSubmit(data: RegisterCredentials) {
    setApiError(null)
    try {
      await registerUser(data)
      navigate('/login')
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status
      if (status === 409) {
        setError('email', { message: 'Email sudah digunakan.' })
      } else if (status === 400) {
        setApiError('Data yang dimasukkan tidak valid. Periksa kembali form.')
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
        label="Nama"
        type="text"
        placeholder="Nama lengkap"
        register={register('name', {
          required: 'Nama wajib diisi.',
          minLength: { value: 2, message: 'Nama minimal 2 karakter.' },
        })}
        error={errors.name?.message}
      />

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
        placeholder="Buat password (min. 6 karakter)"
        register={register('password', {
          required: 'Password wajib diisi.',
          minLength: { value: 6, message: 'Password minimal 6 karakter.' },
        })}
        error={errors.password?.message}
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Daftar
      </Button>

      <p className="text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Masuk di sini
        </Link>
      </p>
    </form>
  )
}
