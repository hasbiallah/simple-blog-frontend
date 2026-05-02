import Spinner from '@/shared/components/ui/Spinner'
import type { Comment } from '../types/comment.types'
import CommentItem from './CommentItem'

interface CommentListProps {
  comments: Comment[]
  isLoading: boolean
  error: string | null
  onDelete: (comment: Comment) => Promise<void>
}

export default function CommentList({
  comments = [],
  isLoading,
  error,
  onDelete,
}: CommentListProps) {
  if (isLoading) {
    return (
      <div className="py-6">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>
  }

  if (!comments || comments.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Belum ada komentar. Jadilah yang pertama!
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onDelete={onDelete} />
      ))}
    </div>
  )
}
