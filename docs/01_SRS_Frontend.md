# SRS Tambahan — UI Requirements (Frontend)
## Sistem Blog — Frontend

---

| Atribut | Detail |
|---|---|
| **Nama Proyek** | Blog Frontend |
| **Versi Dokumen** | 1.0 |
| **Tanggal Dibuat** | 2 Mei 2026 |
| **Dibuat Oleh** | System Analyst |
| **Referensi** | SRS Backend v1.0, API Documentation v1.0 |
| **Repository** | blog-frontend (terpisah dari blog-api) |

---

## 1. Pendahuluan

### 1.1 Tujuan Dokumen

Dokumen ini adalah **tambahan dari SRS Backend v1.0** yang sudah ada. Fokusnya adalah kebutuhan teknis dan fungsional dari sisi **antarmuka pengguna (frontend)**. Backend API yang sudah berjalan menjadi acuan kontrak data untuk dokumen ini.

### 1.2 Teknologi yang Digunakan

| Komponen | Teknologi | Alasan |
|---|---|---|
| **Framework** | React.js (Vite) | Ekosistem besar, performa baik, populer |
| **Bahasa** | TypeScript | Type safety, mencegah bug di runtime |
| **Styling** | Tailwind CSS | Utility-first, cepat untuk prototyping |
| **HTTP Client** | Axios | Interceptor untuk token otomatis |
| **State Management** | Zustand | Ringan, cocok untuk skala proyek ini |
| **Routing** | React Router v6 | Standar de facto untuk React SPA |
| **Form Handling** | React Hook Form | Performa baik, validasi mudah |

---

## 2. Daftar Halaman (Pages)

Berikut semua halaman yang perlu dibangun beserta hak aksesnya:

| # | Path | Nama Halaman | Akses | Deskripsi |
|---|---|---|---|---|
| 1 | `/` | Home | Publik | Daftar semua artikel published |
| 2 | `/articles/:id` | Detail Artikel | Publik | Isi artikel + komentar |
| 3 | `/login` | Login | Publik (tamu saja) | Form login |
| 4 | `/register` | Register | Publik (tamu saja) | Form daftar akun |
| 5 | `/dashboard` | Dashboard | 🔒 Author, Admin | Daftar artikel milik sendiri |
| 6 | `/articles/create` | Buat Artikel | 🔒 Author, Admin | Form buat artikel baru |
| 7 | `/articles/:id/edit` | Edit Artikel | 🔒 Author, Admin | Form edit artikel |
| 8 | `*` | 404 Not Found | Publik | Halaman error jika URL tidak ditemukan |

> **Catatan "Publik (tamu saja)":** Halaman Login dan Register hanya bisa diakses oleh pengguna yang **belum** login. Jika pengguna sudah login lalu mencoba mengakses `/login`, sistem harus redirect ke `/dashboard`.

---

## 3. Kebutuhan Fungsional Frontend

### FR-FE-01 — Sistem Autentikasi di Sisi Client

- Setelah login berhasil, token JWT dari API harus disimpan di **`localStorage`** dengan key `blog_token`
- Data user (id, name, email, role) disimpan di **global state (Zustand)**
- Setiap HTTP request ke endpoint yang membutuhkan autentikasi harus **otomatis menyertakan token** di header `Authorization: Bearer <token>` melalui Axios interceptor
- Ketika token expired (API mengembalikan `401`), sistem harus:
  - Menghapus token dari localStorage
  - Menghapus state user
  - Redirect pengguna ke halaman `/login`
  - Menampilkan pesan: *"Sesi kamu telah berakhir, silakan login kembali"*

### FR-FE-02 — Protected Route

- Halaman yang membutuhkan login (`/dashboard`, `/articles/create`, `/articles/:id/edit`) harus dijaga oleh komponen **ProtectedRoute**
- Jika pengguna yang belum login mencoba mengakses halaman tersebut, sistem harus redirect ke `/login`
- Setelah login berhasil, sistem harus redirect pengguna **kembali ke halaman yang semula ingin dikunjungi** (tidak selalu ke dashboard)

### FR-FE-03 — Halaman Home (`/`)

- Menampilkan daftar artikel published dalam format **kartu (card)**
- Setiap kartu menampilkan: judul, nama penulis, dan tanggal dibuat
- Mendukung **paginasi** — tombol halaman sebelumnya dan berikutnya
- Jika tidak ada artikel, tampilkan pesan kosong yang informatif

### FR-FE-04 — Halaman Detail Artikel (`/articles/:id`)

- Menampilkan judul, nama penulis, tanggal, dan konten artikel
- Menampilkan daftar komentar di bawah konten artikel
- Jika pengguna sudah login, tampilkan **form komentar**
- Jika pengguna belum login, tampilkan teks: *"Login untuk memberikan komentar"* dengan link ke halaman login
- Pengguna yang login bisa menghapus **komentarnya sendiri** dengan tombol hapus di samping komentar miliknya

### FR-FE-05 — Halaman Login (`/login`)

- Form dengan field: email dan password
- Tombol submit dengan label "Masuk"
- Menampilkan pesan error inline jika login gagal (bukan alert browser)
- Terdapat link ke halaman register: *"Belum punya akun? Daftar di sini"*
- Setelah login berhasil, redirect ke `/dashboard`

### FR-FE-06 — Halaman Register (`/register`)

- Form dengan field: nama lengkap, email, dan password
- Validasi di sisi client sebelum dikirim ke API:
  - Nama: minimal 2 karakter
  - Email: format valid
  - Password: minimal 8 karakter
- Menampilkan pesan error inline dari API (misal: email sudah terdaftar)
- Terdapat link ke halaman login: *"Sudah punya akun? Masuk di sini"*
- Setelah register berhasil, redirect ke `/login` dengan pesan sukses

### FR-FE-07 — Halaman Dashboard (`/dashboard`)

- Menampilkan daftar artikel **milik pengguna yang sedang login** dalam format tabel
- Setiap baris tabel menampilkan: judul, status (Draft/Published), tanggal dibuat, dan aksi (Edit, Hapus)
- Terdapat tombol **"Buat Artikel Baru"** yang mengarah ke `/articles/create`
- Tombol Hapus menampilkan **konfirmasi dialog** sebelum eksekusi
- Status artikel ditampilkan dengan label berwarna: Draft (abu-abu), Published (hijau)

### FR-FE-08 — Halaman Buat & Edit Artikel

- Form dengan field: judul, konten (textarea), dan status (dropdown: Draft / Published)
- Halaman **Buat** (`/articles/create`) diawali dengan form kosong
- Halaman **Edit** (`/articles/:id/edit`) diawali dengan form yang sudah terisi data artikel saat ini
- Setelah berhasil submit (buat atau edit), redirect ke `/dashboard`
- Tombol "Batal" yang kembali ke halaman sebelumnya tanpa menyimpan perubahan

---

## 4. Kebutuhan Non-Fungsional Frontend

### 4.1 Penanganan State Loading & Error

- Setiap operasi yang melibatkan pemanggilan API harus menampilkan **indikator loading** (spinner atau skeleton)
- Setiap error dari API harus ditampilkan kepada pengguna dalam format yang ramah — bukan pesan teknis
- Operasi yang berhasil (buat artikel, hapus, komentar) menampilkan **notifikasi sukses** singkat

### 4.2 Responsivitas

- Antarmuka harus berfungsi dengan baik di **desktop (>= 1024px)** dan **mobile (>= 375px)**
- Navbar harus berubah menjadi **hamburger menu** di tampilan mobile

### 4.3 Keamanan Sisi Client

- Token tidak boleh dicetak ke console di environment production
- Halaman yang membutuhkan autentikasi tidak boleh me-render kontennya bahkan sedetik pun sebelum verifikasi token selesai (hindari **flash of unauthorized content**)

### 4.4 Konsistensi UI

- Semua tombol, warna, dan tipografi mengikuti satu design system yang konsisten
- Pesan error menggunakan warna merah, pesan sukses menggunakan warna hijau, secara konsisten di seluruh aplikasi
