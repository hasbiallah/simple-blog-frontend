export interface Comment {
  id: number
  content: string
  articleId: number
  authorId: number
  createdAt: string
}

export interface CommentFormData {
  content: string
}
