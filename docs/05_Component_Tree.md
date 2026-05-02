# Component Tree
## Sistem Blog — Frontend

---

| Atribut | Detail |
|---|---|
| **Nama Proyek** | Blog Frontend |
| **Versi Dokumen** | 1.0 |
| **Tanggal Dibuat** | 2 Mei 2026 |
| **Dibuat Oleh** | System Analyst / Frontend Developer |
| **Referensi** | Wireframe v1.0, SAD Frontend v1.0 |

---

## 1. Apa itu Component Tree?

Component Tree adalah diagram yang menunjukkan **hierarki dan hubungan antar komponen** dalam aplikasi React. Dokumen ini menjawab pertanyaan:

- Komponen mana yang menjadi **induk (parent)**?
- Komponen mana yang menjadi **anak (child)**?
- Komponen mana yang **dipakai ulang (reusable)** di banyak tempat?
- **Data (props/state)** mengalir dari mana ke mana?

### Legenda

| Simbol | Arti |
|---|---|
| `[P]` | Page — komponen level halaman |
| `[C]` | Component — komponen UI biasa |
| `[R]` | Reusable — komponen yang dipakai di banyak tempat |
| `[L]` | Layout — komponen pembungkus tampilan |
| `[G]` | Guard — komponen untuk proteksi akses |
| `🔒` | Hanya tampil jika user sudah login |
| `👤` | Kondisional berdasarkan peran user |

---

## 2. Component Tree Lengkap

```
App
└── RouterProvider
    └── [L] Layout                          ← Pembungkus semua halaman
        ├── [C] Navbar                      ← Tampil di semua halaman
        │   ├── NavLogo                     [R] Link ke "/"
        │   └── NavMenu
        │       ├── (Jika belum login)
        │       │   ├── [C] NavLink → /login
        │       │   └── [C] NavLink → /register
        │       └── (Jika sudah login) 🔒
        │           ├── [C] NavLink → /dashboard
        │           └── [C] UserDropdown
        │               └── LogoutButton
        │
        ├── <Outlet />                      ← Konten halaman di-render di sini
        │   │
        │   ├── [P] HomePage (/)
        │   │   ├── [C] ArticleList         ← Ambil data GET /articles
        │   │   │   └── [R] ArticleCard     ← Dipakai juga di DashboardPage
        │   │   │       ├── ArticleTitle
        │   │   │       ├── ArticleMeta     (nama penulis, tanggal)
        │   │   │       └── ReadMoreButton
        │   │   └── [R] Pagination          ← Dipakai juga di DashboardPage
        │   │
        │   ├── [P] ArticleDetailPage (/articles/:id)
        │   │   ├── [C] ArticleContent      ← Ambil data GET /articles/:id
        │   │   │   ├── ArticleHeader       (judul, penulis, tanggal, status)
        │   │   │   └── ArticleBody         (konten artikel)
        │   │   └── [C] CommentSection
        │   │       ├── (Jika sudah login) 🔒
        │   │       │   └── [C] CommentForm ← POST /articles/:id/comments
        │   │       ├── (Jika belum login)
        │   │       │   └── [C] LoginPrompt ← "Login untuk berkomentar"
        │   │       └── [C] CommentList
        │   │           └── [R] CommentItem ← Dipakai berulang per komentar
        │   │               ├── CommentMeta (nama user, tanggal)
        │   │               ├── CommentBody (isi komentar)
        │   │               └── (Jika pemilik/admin) 🔒
        │   │                   └── DeleteCommentButton
        │   │
        │   ├── [P] LoginPage (/login)
        │   │   └── [C] LoginForm
        │   │       ├── [R] Input (email)
        │   │       ├── [R] Input (password)
        │   │       ├── [C] ErrorMessage    (pesan error inline)
        │   │       ├── [R] Button (submit)
        │   │       └── RegisterLink
        │   │
        │   ├── [P] RegisterPage (/register)
        │   │   └── [C] RegisterForm
        │   │       ├── [R] Input (name)
        │   │       ├── [R] Input (email)
        │   │       ├── [R] Input (password)
        │   │       ├── [C] ErrorMessage    (per field + error API)
        │   │       ├── [R] Button (submit)
        │   │       └── LoginLink
        │   │
        │   ├── [G] ProtectedRoute          ← Guard: cek isAuthenticated
        │   │   └── <Outlet />
        │   │       │
        │   │       ├── [P] DashboardPage (/dashboard) 🔒
        │   │       │   ├── DashboardHeader
        │   │       │   │   └── [R] Button → /articles/create
        │   │       │   └── [C] ArticleTable ← GET /articles (milik sendiri)
        │   │       │       └── ArticleTableRow (per artikel)
        │   │       │           ├── ArticleTitleCell
        │   │       │           ├── [R] Badge (status: Draft/Published)
        │   │       │           ├── DateCell
        │   │       │           └── ActionCell
        │   │       │               ├── EditButton → /articles/:id/edit
        │   │       │               └── DeleteButton
        │   │       │                   └── [R] Modal (konfirmasi hapus)
        │   │       │
        │   │       ├── [P] CreateArticlePage (/articles/create) 🔒
        │   │       │   └── [C] ArticleForm (mode: create)
        │   │       │       ├── [R] Input (title)
        │   │       │       ├── [C] Textarea (content)
        │   │       │       ├── [C] StatusDropdown (draft/published)
        │   │       │       ├── [R] Button (batal)
        │   │       │       └── [R] Button (simpan)
        │   │       │
        │   │       └── [P] EditArticlePage (/articles/:id/edit) 🔒
        │   │           └── [C] ArticleForm (mode: edit)
        │   │               ├── (data pre-filled dari GET /articles/:id)
        │   │               ├── [R] Input (title) ← terisi judul lama
        │   │               ├── [C] Textarea (content) ← terisi konten lama
        │   │               ├── [C] StatusDropdown ← terisi status lama
        │   │               ├── [R] Button (batal)
        │   │               └── [R] Button (simpan perubahan)
        │   │
        │   └── [P] NotFoundPage (*)
        │       └── NotFoundContent
        │           └── [R] Button → /
        │
        └── [L] Footer
```

---

## 3. Komponen Reusable (Shared UI)

Komponen-komponen ini berada di `src/shared/components/ui/` dan dipakai di banyak tempat:

| Komponen | Props Utama | Dipakai Di |
|---|---|---|
| `Button` | `variant`, `size`, `onClick`, `isLoading`, `disabled` | Semua form dan halaman |
| `Input` | `label`, `name`, `type`, `error`, `register` (RHF) | LoginForm, RegisterForm, ArticleForm |
| `Badge` | `status: 'draft' \| 'published'` | ArticleTableRow, ArticleHeader |
| `Modal` | `isOpen`, `onClose`, `title`, `children` | DeleteButton di Dashboard |
| `Spinner` | `size` | Semua state loading |
| `Pagination` | `currentPage`, `totalPages`, `onPageChange` | HomePage, DashboardPage |

---

## 4. Komponen `ArticleForm` — Dual Mode

Komponen ini dipakai untuk dua halaman sekaligus: **Create** dan **Edit**. Ini adalah contoh komponen reusable yang lebih kompleks.

```
ArticleForm
├── Props:
│   ├── mode: 'create' | 'edit'
│   └── initialData?: Article (hanya ada jika mode = 'edit')
│
├── Jika mode = 'create':
│   ├── Form kosong
│   ├── Submit → POST /articles
│   └── Judul halaman: "Buat Artikel Baru"
│
└── Jika mode = 'edit':
    ├── Form pre-filled dengan initialData
    ├── Submit → PUT /articles/:id
    └── Judul halaman: "Edit Artikel"
```

---

## 5. Aliran Data (Data Flow)

### 5.1 Data dari API ke Komponen

```
Axios (apiClient)
      |
      ▼
Custom Hook (misal: useArticles)
      |
      ├── loading state  → Spinner ditampilkan
      ├── error state    → ErrorMessage ditampilkan
      └── data state     → Diteruskan sebagai props ke komponen
                                |
                           ArticleList
                                |
                          ArticleCard (per item)
```

### 5.2 Data Auth dari Store ke Komponen

```
Zustand authStore
      |
      ├── isAuthenticated → ProtectedRoute (boleh render atau redirect)
      ├── user.name       → Navbar (tampilkan nama user)
      ├── user.role       → CommentItem (tampilkan tombol hapus atau tidak)
      └── token           → Axios interceptor (sisipkan di header)
```

---

## 6. Custom Hooks per Fitur

Custom hook memisahkan logika pemanggilan API dari komponen UI. Komponen hanya bertanggung jawab menampilkan data.

| Hook | Lokasi | Tanggung Jawab |
|---|---|---|
| `useAuth` | `features/auth/hooks/` | Login, logout, register — kelola authStore |
| `useArticles` | `features/articles/hooks/` | GET daftar artikel dengan paginasi |
| `useArticle` | `features/articles/hooks/` | GET satu artikel by ID |
| `useComments` | `features/comments/hooks/` | POST komentar, DELETE komentar |
| `usePagination` | `shared/hooks/` | Logika halaman prev/next |

**Contoh struktur hook:**
```typescript
// useArticles.ts
export function useArticles(page: number) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [meta, setMeta] = useState(null)

  useEffect(() => {
    // fetch dari apiClient
  }, [page])

  return { articles, loading, error, meta }
}
```
