import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'
import Button from '@/shared/components/ui/Button'

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const { isAuthenticated } = useAuthStore()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600 text-center">
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Login
        </Link>{' '}
        untuk berkomentar
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setError(null)
    setIsSubmitting(true)
    try {
      await onSubmit(content.trim())
      setContent('')
    } catch {
      setError('Gagal mengirim komentar. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis komentar kamu..."
        rows={3}
        className={`border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={!content.trim()}
        >
          Kirim Komentar
        </Button>
      </div>
    </form>
  )
}
