import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import Spinner from '@/shared/components/ui/Spinner'
import ArticleContent from '../components/ArticleContent'
import { useArticle } from '../hooks/useArticle'
import { useComments } from '@/features/comments/hooks/useComments'
import CommentList from '@/features/comments/components/CommentList'
import CommentForm from '@/features/comments/components/CommentForm'

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const articleId = Number(id)
  const { article, isLoading, error, notFound } = useArticle(articleId)
  const {
    comments,
    isLoading: commentsLoading,
    error: commentsError,
    addComment,
    deleteComment,
  } = useComments(articleId)

  useEffect(() => {
    if (notFound) {
      navigate('/404', { replace: true })
    }
  }, [notFound, navigate])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-12">{error}</p>
    )
  }

  if (!article) return null

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-6"
      >
        ← Kembali ke Daftar Artikel
      </Link>
      <ArticleContent article={article} />

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Komentar ({commentsLoading ? '...' : comments.length})
        </h2>
        <div className="mb-6">
          <CommentForm onSubmit={addComment} />
        </div>
        <CommentList
          comments={comments}
          isLoading={commentsLoading}
          error={commentsError}
          onDelete={deleteComment}
        />
      </section>
    </div>
  )
}
