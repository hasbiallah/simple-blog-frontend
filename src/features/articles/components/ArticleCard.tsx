import { Link } from 'react-router-dom'
import { formatDate } from '@/shared/utils/formatDate'
import type { Article } from '../types/article.types'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 flex flex-col gap-3 hover:shadow-md transition-shadow bg-white">
      <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{article.title}</h2>
      <hr className="border-gray-200" />
      {article.excerpt && (
        <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
      )}
      <div className="text-sm text-gray-500">
        <span>Oleh: {article.author?.name ?? 'Anonim'}</span>
        <span className="mx-2">•</span>
        <span>{formatDate(article.createdAt)}</span>
      </div>
      <div className="mt-auto pt-2">
        <Link
          to={`/articles/${article.id}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
        >
          Baca Artikel
        </Link>
      </div>
    </div>
  )
}
