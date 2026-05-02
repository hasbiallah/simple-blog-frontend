export interface Article {
  id: number
  title: string
  content: string
  excerpt: string
  status: 'draft' | 'published'
  authorId: number
  author?: { id: number; name: string }
  createdAt: string
  updatedAt: string
}

export interface ArticleFormData {
  title: string
  content: string
  excerpt: string
  status: 'draft' | 'published'
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ArticlesResponse {
  data: Article[]
  meta: PaginationMeta
}
