interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getPageRange(currentPage: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | '...')[] = [1]

  const rangeStart = Math.max(2, currentPage - 2)
  const rangeEnd = Math.min(totalPages - 1, currentPage + 2)

  if (rangeStart > 2) pages.push('...')

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }

  if (rangeEnd < totalPages - 1) pages.push('...')

  pages.push(totalPages)

  return pages
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageRange(currentPage, totalPages)

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2 py-1 text-sm text-gray-500">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`px-3 py-1 rounded border text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  )
}
