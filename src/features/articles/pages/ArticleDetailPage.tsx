import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import Spinner from '@/shared/components/ui/Spinner'
import ArticleContent from '../components/ArticleContent'
import { useArticle } from '../hooks/useArticle'

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const articleId = Number(id)
  const { article, isLoading, error, notFound } = useArticle(articleId)

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
    </div>
  )
}
