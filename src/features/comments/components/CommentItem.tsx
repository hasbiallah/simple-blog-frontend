import { useState } from 'react'
import { useAuthStore } from '@/features/auth/store/authStore'
import { formatDate } from '@/shared/utils/formatDate'
import Button from '@/shared/components/ui/Button'
import type { Comment } from '../types/comment.types'

interface CommentItemProps {
  comment: Comment
  onDelete: (comment: Comment) => Promise<void>
}

export default function CommentItem({ comment, onDelete }: CommentItemProps) {
  const { user } = useAuthStore()
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const canDelete =
    user !== null && (user.id === comment.authorId || user.role === 'admin')

  async function handleDelete() {
    setIsDeleting(true)
    setDeleteError(null)
    try {
      await onDelete(comment)
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Gagal menghapus komentar.'
      setDeleteError(message)
      setIsDeleting(false)
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">
            {comment.author?.name ?? 'Anonim'}
          </span>
          <span className="mx-1">•</span>
          <span>{formatDate(comment.createdAt)}</span>
        </div>
        {canDelete && (
          <Button
            variant="danger"
            size="sm"
            isLoading={isDeleting}
            onClick={handleDelete}
          >
            Hapus
          </Button>
        )}
      </div>
      <p className="text-gray-800 text-sm">{comment.content}</p>
      {deleteError && (
        <p className="mt-2 text-xs text-red-500">{deleteError}</p>
      )}
    </div>
  )
}
