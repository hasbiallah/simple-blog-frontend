import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import apiClient from '@/lib/axios'
import Input from '@/shared/components/ui/Input'
import Button from '@/shared/components/ui/Button'
import type { Article, ArticleFormData } from '../types/article.types'

interface ArticleFormProps {
  mode: 'create' | 'edit'
  initialData?: Article
}

export default function ArticleForm({ mode, initialData }: ArticleFormProps) {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    defaultValues: initialData
      ? {
          title: initialData.title,
          content: initialData.content,
          excerpt: initialData.excerpt,
          status: initialData.status,
        }
      : { status: 'draft' },
  })

  async function onSubmit(data: ArticleFormData) {
    setApiError(null)
    try {
      if (mode === 'create') {
        await apiClient.post('/articles', data)
      } else {
        await apiClient.put(`/articles/${initialData!.id}`, data)
      }
      navigate('/dashboard')
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status
      if (status === 403) {
        setApiError(
          mode === 'edit'
            ? 'Kamu tidak memiliki izin mengubah artikel ini.'
            : 'Kamu tidak memiliki izin.'
        )
      } else {
        setApiError('Terjadi kesalahan. Silakan coba lagi.')
      }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {mode === 'create' ? 'Buat Artikel Baru' : 'Edit Artikel'}
      </h1>

      {apiError && (
        <div className="rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-600 mb-4">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="Judul"
          placeholder="Judul artikel"
          register={register('title', { required: 'Judul wajib diisi.' })}
          error={errors.title?.message}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="content">
            Konten
          </label>
          <textarea
            id="content"
            placeholder="Tulis konten artikel di sini..."
            rows={10}
            className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('content', { required: 'Konten wajib diisi.' })}
          />
          {errors.content && (
            <span className="text-sm text-red-500">{errors.content.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="excerpt">
            Ringkasan <span className="text-gray-400 font-normal">(opsional)</span>
          </label>
          <textarea
            id="excerpt"
            placeholder="Ringkasan singkat artikel..."
            rows={3}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            {...register('excerpt')}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('status')}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/dashboard')}
          >
            Batal
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {mode === 'create' ? 'Simpan Artikel' : 'Simpan Perubahan'}
          </Button>
        </div>
      </form>
    </div>
  )
}
