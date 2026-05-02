import Badge from '@/shared/components/ui/Badge'
import { formatDate } from '@/shared/utils/formatDate'
import type { Article } from '../types/article.types'

interface ArticleContentProps {
  article: Article
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{article.title}</h1>
        <hr className="border-gray-200 mb-4" />
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span>Oleh: {article.author?.name ?? 'Anonim'}</span>
          <span>•</span>
          <span>{formatDate(article.createdAt)}</span>
          <span>•</span>
          <Badge status={article.status} />
        </div>
      </header>
      <div className="prose prose-gray max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
        {article.content}
      </div>
    </article>
  )
}
