import Spinner from '@/shared/components/ui/Spinner'
import Pagination from '@/shared/components/ui/Pagination'
import { usePagination } from '@/shared/hooks/usePagination'
import ArticleList from '../components/ArticleList'
import { useArticles } from '../hooks/useArticles'

export default function HomePage() {
  const { page, goToPage } = usePagination(1, 8)
  const { articles, meta, isLoading, error } = useArticles(page, 8)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Artikel Terbaru</h1>

      {isLoading && (
        <div className="py-16">
          <Spinner size="lg" />
        </div>
      )}

      {error && !isLoading && (
        <p className="text-center text-red-500 py-12">{error}</p>
      )}

      {!isLoading && !error && (
        <>
          <ArticleList articles={articles} />
          {meta && meta.totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
                onPageChange={goToPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
