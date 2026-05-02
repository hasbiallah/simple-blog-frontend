import { useReducer, useEffect } from 'react'
import apiClient from '@/lib/axios'
import type { Article, PaginationMeta, ArticlesResponse } from '../types/article.types'

type State = {
  articles: Article[]
  meta: PaginationMeta | null
  isLoading: boolean
  error: string | null
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; articles: Article[]; meta: PaginationMeta }
  | { type: 'FETCH_ERROR'; error: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null }
    case 'FETCH_SUCCESS':
      return { isLoading: false, error: null, articles: action.articles, meta: action.meta }
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.error }
  }
}

const initialState: State = {
  articles: [],
  meta: null,
  isLoading: true,
  error: null,
}

export function useArticles(page = 1, limit = 8) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let cancelled = false
    dispatch({ type: 'FETCH_START' })

    apiClient
      .get<ArticlesResponse>(`/articles?page=${page}&limit=${limit}`)
      .then((response) => {
        if (!cancelled) {
          dispatch({
            type: 'FETCH_SUCCESS',
            articles: response.data.data,
            meta: response.data.meta,
          })
        }
      })
      .catch(() => {
        if (!cancelled) {
          dispatch({ type: 'FETCH_ERROR', error: 'Gagal memuat artikel, coba lagi' })
        }
      })

    return () => {
      cancelled = true
    }
  }, [page, limit])

  return state
}
