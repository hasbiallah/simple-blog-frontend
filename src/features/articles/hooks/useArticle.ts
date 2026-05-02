import { useReducer, useEffect } from 'react'
import apiClient from '@/lib/axios'
import type { Article } from '../types/article.types'

type State = {
  article: Article | null
  isLoading: boolean
  error: string | null
  notFound: boolean
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; article: Article }
  | { type: 'FETCH_ERROR'; error: string }
  | { type: 'NOT_FOUND' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { article: null, isLoading: true, error: null, notFound: false }
    case 'FETCH_SUCCESS':
      return { article: action.article, isLoading: false, error: null, notFound: false }
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.error, notFound: false }
    case 'NOT_FOUND':
      return { ...state, isLoading: false, error: null, notFound: true }
  }
}

const initialState: State = {
  article: null,
  isLoading: true,
  error: null,
  notFound: false,
}

export function useArticle(id: number) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let cancelled = false
    dispatch({ type: 'FETCH_START' })

    apiClient
      .get<Article>(`/articles/${id}`)
      .then((response) => {
        if (!cancelled) {
          dispatch({ type: 'FETCH_SUCCESS', article: response.data })
        }
      })
      .catch((err) => {
        if (!cancelled) {
          if (err.response?.status === 404) {
            dispatch({ type: 'NOT_FOUND' })
          } else {
            dispatch({ type: 'FETCH_ERROR', error: 'Gagal memuat artikel, coba lagi' })
          }
        }
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return state
}
