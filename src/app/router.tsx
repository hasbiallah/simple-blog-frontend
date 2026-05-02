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
