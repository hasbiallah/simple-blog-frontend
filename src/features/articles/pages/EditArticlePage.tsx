import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '@/shared/components/ui/Spinner'
import ArticleForm from '../components/ArticleForm'
import { useArticle } from '../hooks/useArticle'

export default function EditArticlePage() {
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
    return <p className="text-center text-red-500 py-12">{error}</p>
  }

  if (!article) return null

  return (
    <div className="max-w-3xl mx-auto">
      <ArticleForm mode="edit" initialData={article} />
    </div>
  )
}
