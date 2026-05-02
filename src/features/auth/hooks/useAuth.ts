import { useNavigate } from 'react-router-dom'
import apiClient from '@/lib/axios'
import { useAuthStore } from '../store/authStore'
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth.types'

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore()
  const navigate = useNavigate()

  async function login(credentials: LoginCredentials): Promise<void> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    setAuth(response.data.user, response.data.token)
  }

  async function register(credentials: RegisterCredentials): Promise<void> {
    await apiClient.post('/auth/register', credentials)
  }

  async function logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } finally {
      clearAuth()
      navigate('/')
    }
  }

  return { user, token, isAuthenticated, setAuth, clearAuth, login, register, logout }
}
