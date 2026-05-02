import { useState } from 'react'

export function usePagination(initialPage = 1, initialPerPage = 10) {
  const [page, setPage] = useState(initialPage)
  const [perPage] = useState(initialPerPage)

  const nextPage = () => setPage((p) => p + 1)
  const prevPage = () => setPage((p) => Math.max(1, p - 1))
  const goToPage = (p: number) => setPage(p)

  return { page, perPage, nextPage, prevPage, goToPage }
}
