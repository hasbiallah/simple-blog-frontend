import { useReducer, useEffect, useCallback } from 'react'
import apiClient from '@/lib/axios'
import type { Comment } from '../types/comment.types'

type State = {
  comments: Comment[]
  isLoading: boolean
  error: string | null
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; comments: Comment[] }
  | { type: 'FETCH_ERROR'; error: string }
  | { type: 'ADD_COMMENT'; comment: Comment }
  | { type: 'DELETE_COMMENT'; id: number }
  | { type: 'RESTORE_COMMENT'; comment: Comment }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null }
    case 'FETCH_SUCCESS':
      return { comments: action.comments, isLoading: false, error: null }
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.error }
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.comment] }
    case 'DELETE_COMMENT':
      return { ...state, comments: state.comments.filter((c) => c.id !== action.id) }
    case 'RESTORE_COMMENT': {
      const restored = [...state.comments, action.comment]
      restored.sort((a, b) => a.id - b.id)
      return { ...state, comments: restored }
    }
  }
}

const initialState: State = {
  comments: [],
  isLoading: true,
  error: null,
}

export function useComments(articleId: number) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let cancelled = false
    dispatch({ type: 'FETCH_START' })

    apiClient
      .get<Comment[]>(`/articles/${articleId}/comments`)
      .then((response) => {
        if (!cancelled) {
          const comments = Array.isArray(response.data)
            ? response.data
            : (Array.isArray((response.data as any).data) ? (response.data as any).data : [])
          dispatch({ type: 'FETCH_SUCCESS', comments })
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const axiosMessage = (
            err as { response?: { data?: { message?: string } } }
          )?.response?.data?.message
          dispatch({ type: 'FETCH_ERROR', error: axiosMessage ?? 'Gagal memuat komentar' })
        }
      })

    return () => {
      cancelled = true
    }
  }, [articleId])

  const addComment = useCallback(
    async (content: string): Promise<void> => {
      const response = await apiClient.post<Comment>(
        `/articles/${articleId}/comments`,
        { content }
      )
      dispatch({ type: 'ADD_COMMENT', comment: response.data })
    },
    [articleId]
  )

  const deleteComment = useCallback(async (comment: Comment): Promise<void> => {
    dispatch({ type: 'DELETE_COMMENT', id: comment.id })
    try {
      await apiClient.delete(`/comments/${comment.id}`)
    } catch {
      dispatch({ type: 'RESTORE_COMMENT', comment })
      throw new Error('Gagal menghapus komentar. Silakan coba lagi.')
    }
  }, [])

  return { ...state, addComment, deleteComment }
}
