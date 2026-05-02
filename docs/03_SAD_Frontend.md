# SAD Frontend — System Architecture Document
## Sistem Blog — Frontend

---

| Atribut | Detail |
|---|---|
| **Nama Proyek** | Blog Frontend |
| **Versi Dokumen** | 1.0 |
| **Tanggal Dibuat** | 2 Mei 2026 |
| **Dibuat Oleh** | System Analyst / Tech Lead |
| **Referensi** | SRS Frontend v1.0, API Documentation v1.0 |

---

## 1. Gambaran Arsitektur

### 1.1 Tipe Aplikasi

Aplikasi ini dibangun sebagai **Single Page Application (SPA)** menggunakan React.js. Artinya:

- Hanya ada **satu file HTML** yang diunduh browser di awal
- Perpindahan antar halaman terjadi di sisi client tanpa reload penuh
- Semua data diambil dari **Blog API** yang sudah berjalan secara terpisah

### 1.2 Gambaran Hubungan Sistem

```
┌─────────────────────────────────────────────────────┐
│                   Browser (Client)                   │
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │           React SPA (blog-frontend)          │   │
│   │                                             │   │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │   │
│   │  │  Pages   │  │Components│  │  State   │  │   │
│   │  └──────────┘  └──────────┘  │ (Zustand)│  │   │
│   │         │            │       └──────────┘  │   │
│   │         └────────────┘             │       │   │
│   │                  │                 │       │   │
│   │           ┌──────────────┐         │       │   │
│   │           │  Axios + JWT │◄────────┘       │   │
│   │           │  Interceptor │                 │   │
│   │           └──────────────┘                 │   │
│   └─────────────────────┬───────────────────────┘   │
└─────────────────────────┼───────────────────────────┘
                          │ HTTP/HTTPS (JSON)
                          ▼
              ┌───────────────────────┐
              │    Blog REST API      │
              │  (blog-api — repo     │
              │   terpisah)           │
              └───────────────────────┘
```

---

## 2. Pola Arsitektur

Proyek ini menggunakan **Feature-Based Architecture** — kode diorganisir berdasarkan **fitur**, bukan berdasarkan tipe file. Pendekatan ini lebih mudah di-maintain ketika proyek berkembang.

### Perbandingan Pendekatan

| Aspek | Type-Based (Tidak Dipakai) | Feature-Based (Dipakai) ✅ |
|---|---|---|
| Struktur | `/components/`, `/pages/`, `/hooks/` di root | Setiap fitur punya foldernya sendiri |
| Skalabilitas | Folder root membengkak seiring pertumbuhan fitur | Setiap fitur mandiri dan terisolasi |
| Navigasi kode | Harus lompat-lompat antar folder | Semua kode terkait fitur ada di satu tempat |
| Contoh | `components/ArticleCard.tsx` | `features/articles/components/ArticleCard.tsx` |

---

## 3. Struktur Folder

```
blog-frontend/
│
├── public/                         # File statis (favicon, robots.txt)
│
├── src/
│   │
│   ├── app/                        # Konfigurasi level aplikasi
│   │   ├── App.tsx                 # Root component, setup router
│   │   ├── router.tsx              # Definisi semua route
│   │   └── providers.tsx           # Wrapper global (QueryClient, dll)
│   │
│   ├── features/                   # Folder utama — semua fitur ada di sini
│   │   │
│   │   ├── auth/                   # Fitur autentikasi
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   └── RegisterPage.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts      # Custom hook: login, logout, register
│   │   │   ├── store/
│   │   │   │   └── authStore.ts    # Zustand store untuk state user & token
│   │   │   └── types/
│   │   │       └── auth.types.ts   # TypeScript types untuk auth
│   │   │
│   │   ├── articles/               # Fitur artikel
│   │   │   ├── components/
│   │   │   │   ├── ArticleCard.tsx
│   │   │   │   ├── ArticleList.tsx
│   │   │   │   ├── ArticleDetail.tsx
│   │   │   │   └── ArticleForm.tsx # Dipakai untuk Create & Edit
│   │   │   ├── pages/
│   │   │   │   ├── HomePage.tsx
│   │   │   │   ├── ArticleDetailPage.tsx
│   │   │   │   ├── CreateArticlePage.tsx
│   │   │   │   ├── EditArticlePage.tsx
│   │   │   │   └── DashboardPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useArticles.ts
│   │   │   │   └── useArticle.ts
│   │   │   └── types/
│   │   │       └── article.types.ts
│   │   │
│   │   └── comments/               # Fitur komentar
│   │       ├── components/
│   │       │   ├── CommentList.tsx
│   │       │   ├── CommentItem.tsx
│   │       │   └── CommentForm.tsx
│   │       ├── hooks/
│   │       │   └── useComments.ts
│   │       └── types/
│   │           └── comment.types.ts
│   │
│   ├── shared/                     # Kode yang dipakai lintas fitur
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Layout.tsx      # Wrapper Navbar + Footer + children
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx      # Komponen tombol reusable
│   │   │   │   ├── Input.tsx       # Komponen input reusable
│   │   │   │   ├── Spinner.tsx     # Loading indicator
│   │   │   │   ├── Modal.tsx       # Dialog / modal reusable
│   │   │   │   └── Badge.tsx       # Label status (Draft/Published)
│   │   │   └── ProtectedRoute.tsx  # Guard untuk route yang perlu login
│   │   ├── hooks/
│   │   │   └── usePagination.ts
│   │   └── utils/
│   │       ├── formatDate.ts       # Helper format tanggal
│   │       └── cn.ts               # Helper class merging (Tailwind)
│   │
│   ├── lib/                        # Konfigurasi library eksternal
│   │   └── axios.ts                # Instance Axios + interceptor JWT
│   │
│   └── types/                      # TypeScript types global
│       └── api.types.ts            # Tipe untuk format respons API
│
├── .env                            # Environment variables (tidak di-commit)
├── .env.example                    # Template .env untuk tim
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 4. State Management — Zustand

### 4.1 Mengapa Zustand?

| Aspek | Context API | Redux | Zustand ✅ |
|---|---|---|---|
| Boilerplate | Rendah | Sangat tinggi | Sangat rendah |
| Performa | Re-render berlebih | Baik | Baik |
| Bundle size | 0 (bawaan React) | ~50kb | ~1kb |
| Cocok untuk | State sederhana | Proyek sangat besar | Proyek kecil-menengah |
| Learning curve | Rendah | Tinggi | Sangat rendah |

### 4.2 Auth Store (`authStore.ts`)

Store ini menyimpan data pengguna yang sedang login dan token JWT.

```typescript
// src/features/auth/store/authStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'author' | 'reader'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({ user, token, isAuthenticated: true }),

      clearAuth: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'blog-auth', // key di localStorage
    }
  )
)
```

---

## 5. HTTP Client — Axios Interceptor

Semua pemanggilan API melewati satu instance Axios terpusat. Interceptor otomatis menyisipkan token di setiap request dan menangani error 401 secara global.

```typescript
// src/lib/axios.ts

import axios from 'axios'
import { useAuthStore } from '@/features/auth/store/authStore'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — sisipkan token otomatis
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor — tangani 401 secara global
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
```

---

## 6. Routing & Protected Route

### 6.1 Definisi Route (`router.tsx`)

```typescript
// src/app/router.tsx

import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/shared/components/layout/Layout'
import ProtectedRoute from '@/shared/components/ProtectedRoute'

import HomePage from '@/features/articles/pages/HomePage'
import ArticleDetailPage from '@/features/articles/pages/ArticleDetailPage'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import DashboardPage from '@/features/articles/pages/DashboardPage'
import CreateArticlePage from '@/features/articles/pages/CreateArticlePage'
import EditArticlePage from '@/features/articles/pages/EditArticlePage'
import NotFoundPage from '@/shared/components/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'articles/:id', element: <ArticleDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },

      // Protected routes — hanya bisa diakses jika sudah login
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'articles/create', element: <CreateArticlePage /> },
          { path: 'articles/:id/edit', element: <EditArticlePage /> },
        ],
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
```

### 6.2 Komponen ProtectedRoute

```typescript
// src/shared/components/ProtectedRoute.tsx

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    // Simpan URL tujuan agar setelah login bisa redirect ke sana
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
```

---

## 7. Environment Variables

File `.env` menyimpan konfigurasi yang bisa berbeda tiap environment.

**`.env.example` (di-commit ke repo sebagai template):**
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

**`.env` (tidak di-commit, dibuat manual oleh setiap developer):**
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

> **Penting:** Di Vite, semua environment variable yang ingin diakses di kode harus diawali dengan prefix `VITE_`. Variabel tanpa prefix tidak akan tersedia di browser.

---

## 8. Strategi Penyimpanan Token

Token JWT disimpan melalui **Zustand `persist` middleware** yang secara otomatis menyinkronkan state ke `localStorage`.

| Opsi | Keuntungan | Risiko | Keputusan |
|---|---|---|---|
| **localStorage** | Mudah diimplementasi, persisten | Rentan XSS | ✅ Dipakai (scope proyek sederhana) |
| **httpOnly Cookie** | Aman dari XSS | Rentan CSRF, butuh config server | Disarankan untuk production serius |
| **Memory only** | Paling aman | Token hilang saat refresh | Tidak cocok untuk UX yang baik |

> **Catatan Risiko:** Untuk proyek pembelajaran ini, localStorage sudah cukup. Untuk aplikasi production dengan data sensitif, migrasi ke httpOnly cookie sangat dianjurkan.
