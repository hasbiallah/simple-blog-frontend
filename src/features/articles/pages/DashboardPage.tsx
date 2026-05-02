import { useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '@/lib/axios'
import Spinner from '@/shared/components/ui/Spinner'
import Button from '@/shared/components/ui/Button'
import Modal from '@/shared/components/ui/Modal'
import Pagination from '@/shared/components/ui/Pagination'
import { usePagination } from '@/shared/hooks/usePagination'
import ArticleTable from '../components/ArticleTable'
import { useArticles } from '../hooks/useArticles'
import type { Article } from '../types/article.types'

export default function DashboardPage() {
  const { page, goToPage } = usePagination(1, 10)
  const { articles: fetchedArticles, meta, isLoading, error } = useArticles(page, 10)

  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set())
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const articles = fetchedArticles.filter((a) => !deletedIds.has(a.id))

  function handleDeleteClick(article: Article) {
    setDeleteTarget(article)
    setDeleteError(null)
  }

  function handleCloseModal() {
    if (isDeleting) return
    setDeleteTarget(null)
    setDeleteError(null)
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return
    setIsDeleting(true)
    setDeleteError(null)
    try {
      await apiClient.delete(`/articles/${deleteTarget.id}`)
      setDeletedIds((prev) => new Set([...prev, deleteTarget.id]))
      setDeleteTarget(null)
    } catch {
      setDeleteError('Gagal menghapus artikel. Silakan coba lagi.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Saya</h1>
        <Link to="/articles/create">
          <Button>+ Buat Artikel Baru</Button>
        </Link>
      </div>

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
          <ArticleTable articles={articles} onDeleteClick={handleDeleteClick} />
          {meta && meta.totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
                onPageChange={goToPage}
              />
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={deleteTarget !== null}
        onClose={handleCloseModal}
        title="Hapus Artikel"
      >
        <p className="text-gray-700 mb-2">
          Apakah kamu yakin ingin menghapus artikel ini?
        </p>
        {deleteTarget && (
          <p className="text-sm font-medium text-gray-900 mb-4 bg-gray-50 px-3 py-2 rounded border border-gray-200">
            &ldquo;{deleteTarget.title}&rdquo;
          </p>
        )}
        {deleteError && (
          <p className="text-sm text-red-500 mb-4">{deleteError}</p>
        )}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={handleCloseModal} disabled={isDeleting}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} isLoading={isDeleting}>
            Ya, Hapus
          </Button>
        </div>
      </Modal>
    </div>
  )
}
