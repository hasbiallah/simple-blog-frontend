export interface Comment {
  id: number
  content: string
  articleId: number
  authorId: number
  author?: { id: number; name: string }
  createdAt: string
}

export interface CommentFormData {
  content: string
}
