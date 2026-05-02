export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'author' | 'reader'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}
