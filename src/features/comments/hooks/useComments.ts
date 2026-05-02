export function useComments(articleId: number) {
  void articleId
  return { comments: [], isLoading: false, error: null }
}
