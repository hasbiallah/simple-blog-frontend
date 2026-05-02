export interface Article {
  id: number
  title: string
  content: string
  excerpt: string
  status: 'draft' | 'published'
  authorId: number
  createdAt: string
  updatedAt: string
}

export interface ArticleFormData {
  title: string
  content: string
  excerpt: string
  status: 'draft' | 'published'
}
