import { Link } from 'react-router-dom'
import { formatDate } from '@/shared/utils/formatDate'
import Badge from '@/shared/components/ui/Badge'
import Button from '@/shared/components/ui/Button'
import type { Article } from '../types/article.types'

interface ArticleTableProps {
  articles: Article[]
  onDeleteClick: (article: Article) => void
}

export default function ArticleTable({ articles, onDeleteClick }: ArticleTableProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="mb-4">Kamu belum punya artikel. Buat sekarang!</p>
        <Link
          to="/articles/create"
          className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
        >
          Buat Artikel
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Judul
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {articles.map((article) => (
            <tr key={article.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <Link
                  to={`/articles/${article.id}`}
                  className="text-gray-900 font-medium hover:text-blue-600 line-clamp-2"
                >
                  {article.title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge status={article.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(article.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={`/articles/${article.id}/edit`}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDeleteClick(article)}
                  >
                    Hapus
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
