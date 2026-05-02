# Frontend API Integration Map
## Sistem Blog — Frontend

---

| Atribut | Detail |
|---|---|
| **Nama Proyek** | Blog Frontend |
| **Versi Dokumen** | 1.0 |
| **Tanggal Dibuat** | 2 Mei 2026 |
| **Dibuat Oleh** | System Analyst / Frontend Developer |
| **Referensi** | API Documentation v1.0, Component Tree v1.0 |

---

## 1. Tujuan Dokumen

Dokumen ini memetakan secara eksplisit **komponen atau halaman frontend mana** yang memanggil **endpoint backend mana**, beserta:
- Kapan pemanggilan terjadi (trigger)
- Data apa yang dikirim (request)
- Data apa yang diharapkan (response)
- Bagaimana hasilnya ditampilkan di UI

Dokumen ini mencegah situasi di mana developer frontend tidak tahu endpoint mana yang harus dipanggil untuk setiap interaksi.

---

## 2. Peta Integrasi Lengkap

### 2.1 Modul Auth

---

#### INT-01 — Register

| Atribut | Detail |
|---|---|
| **Halaman** | `RegisterPage` |
| **Komponen** | `RegisterForm` |
| **Method** | `POST` |
| **Endpoint** | `/auth/register` |
| **Trigger** | User klik tombol "Daftar" |
| **Butuh Token** | Tidak |

**Data yang Dikirim (Request Body):**
```json
{
  "name": "value dari input nama",
  "email": "value dari input email",
  "password": "value dari input password"
}
```

**Penanganan Respons di UI:**

| Kondisi API | Yang Terjadi di UI |
|---|---|
| ✅ `201 Created` | Tampil notifikasi sukses → redirect ke `/login` |
| ❌ `400 Bad Request` | Tampil pesan validasi di bawah field terkait |
| ❌ `409 Conflict` | Tampil pesan "Email sudah digunakan" di bawah field email |

---

#### INT-02 — Login

| Atribut | Detail |
|---|---|
| **Halaman** | `LoginPage` |
| **Komponen** | `LoginForm` |
| **Method** | `POST` |
| **Endpoint** | `/auth/login` |
| **Trigger** | User klik tombol "Masuk" |
| **Butuh Token** | Tidak |

**Data yang Dikirim:**
```json
{
  "email": "value dari input email",
  "password": "value dari input password"
}
```

**Penanganan Respons di UI:**

| Kondisi API | Yang Terjadi di UI |
|---|---|
| ✅ `200 OK` | Simpan `token` dan `user` ke Zustand store → redirect ke `/dashboard` (atau URL tujuan sebelumnya) |
| ❌ `401 Unauthorized` | Tampil pesan "Email atau password salah" di atas form |
| ❌ `400 Bad Request` | Tampil pesan validasi inline |

**Data yang Disimpan ke Store Setelah Berhasil:**
```typescript
authStore.setAuth(
  response.data.user,   // { id, name, email, role }
  response.data.token   // JWT string
)
```

---

#### INT-03 — Logout

| Atribut | Detail |
|---|---|
| **Halaman** | Semua halaman (via Navbar) |
| **Komponen** | `UserDropdown → LogoutButton` |
| **Method** | `POST` |
| **Endpoint** | `/auth/logout` |
| **Trigger** | User klik "Logout" di dropdown navbar |
| **Butuh Token** | Ya (otomatis via Axios interceptor) |

**Penanganan Respons di UI:**

| Kondisi API | Yang Terjadi di UI |
|---|---|
| ✅ `200 OK` | Hapus data dari Zustand store → redirect ke `/` |
| ❌ `401` | Tetap hapus store & redirect (token sudah tidak valid) |

> **Catatan:** Bahkan jika API mengembalikan error, store tetap dibersihkan. Pengguna harus selalu bisa keluar dari aplikasi.

---

### 2.2 Modul Artikel

---

#### INT-04 — Ambil Daftar Artikel (Home)

| Atribut | Detail |
|---|---|
| **Halaman** | `HomePage` |
| **Komponen** | `ArticleList` via hook `useArticles` |
| **Method** | `GET` |
| **Endpoint** | `/articles?page={page}&limit=8` |
| **Trigger** | Saat halaman pertama kali dimuat, atau saat `page` berubah |
| **Butuh Token** | Tidak |

**Penanganan Respons di UI:**

| Kondisi API | Yang Terjadi di UI |
|---|---|
| ✅ `200 OK` | Render daftar `ArticleCard` + komponen `Pagination` |
| Data kosong (`data: []`) | Tampil teks "Belum ada artikel yang dipublikasikan" |
| Loading | Tampil skeleton card |
| ❌ Error | Tampil pesan "Gagal memuat artikel, coba lagi" |

---

#### INT-05 — Ambil Detail Artikel

| Atribut | Detail |
|---|---|
| **Halaman** | `ArticleDetailPage` |
| **Komponen** | `ArticleContent` + `CommentSection` via hook `useArticle` |
| **Method** | `GET` |
| **Endpoint** | `/articles/:id` |
| **Trigger** | Saat halaman dimuat (ambil `:id` dari URL params) |
| **Butuh Token** | Tidak |

**Penanganan Respons di UI:**

| Kondisi API | Yang Terjadi di UI |
|---|---|
| ✅ `200 OK` | Render `ArticleContent` + `CommentList` |
| ❌ `404 Not Found` | Redirect ke halaman 404 |
| Loading | Tampil spinner di tengah halaman |

---

#### INT-06 — Ambil Artikel Milik Sendiri (Dashboard)

| Atribut | Detail |
|---|---|
| **Halaman** | `DashboardPage` |
| **Komponen** | `ArticleTable` via hook `useArticles` |
| **Method** | `GET` |
| **Endpoint** | `/articles` |
| **Trigger** | Saat halaman Dashboard dimuat |
| **Butuh Token** | Ya |

> **Catatan Penting:** Endpoint ini sama dengan INT-04, tetapi karena menyertakan token, backend hanya mengembalikan artikel milik user yang sedang login. Pastikan backend sudah mengimplementasikan filter ini.

**Penanganan Respons di UI:**

| Kondisi API | Yang Terjadi di UI |
|---|---|
| ✅ `200 OK` | Render tabel artikel dengan kolom: judul, status, tanggal, aksi |
| Data kosong | Tampil teks "Kamu belum punya artikel. Buat sekarang!" |

---

#### INT-07 — Buat Artikel Baru

| Atribut | Detail |
|---|---|
| **Halaman** | `CreateArticlePage` |
| **Komponen** | `ArticleForm` (mode: create) |
| **Method** | `POST` |
| **Endpoint** | `/articles` |
| **Trigger** | User klik "Simpan Artikel" |
| **Butuh Token** | Ya |

**Data yang Dikirim:**
```json
{
  "title": "value dari input judul",
  "content": "value dari textarea konten",
  "status": "draft" | "published"
}
```

**Penanganan Respons di UI:**

| Kondisi API | Yang Terjadi di UI |
|---|---|
| ✅ `201 Created` | Notifikasi sukses → redirect ke `/dashboard` |
| ❌ `400 Bad Request` | Tampil error validasi di bawah field |
| ❌ `401 Unauthorized` | Axios interceptor redirect ke `/login` |
| ❌ `403 Forbidden` | Tampil pesan "Kamu tidak memiliki izin" |

---

#### INT-08 — Edit Artikel

| Atribut | Detail |
|---|---|
| **Halaman** | `EditArticlePage` |
| **Komponen** | `ArticleForm` (mode: edit) |
| **Method (1)** | `GET` — untuk pre-fill form |
| **Endpoint (1)** | `/articles/:id` |
| **Trigger (1)** | Saat halaman dimuat |
| **Method (2)** | `PUT` — untuk simpan perubahan |
| **Endpoint (2)** | `/articles/:id` |
| **Trigger (2)** | User klik "Simpan Perubahan" |
| **Butuh Token** | Ya |

**Data yang Dikirim (PUT):**
```json
{
  "title": "judul yang sudah diubah",
  "content": "konten yang sudah diubah",
  "status": "published"
}
```

**Penanganan Respons PUT di UI:**

| Kondisi API | Yang Terjadi di UI |
|---|---|
| ✅ `200 OK` | Notifikasi sukses → redirect ke `/dashboard` |
| ❌ `403 Forbidden` | Tampil pesan "Kamu tidak memiliki izin mengubah artikel ini" |
| ❌ `404 Not Found` | Redirect ke halaman 404 |

---

#### INT-09 — Hapus Artikel

| Atribut | Detail |
|---|---|
| **Halaman** | `DashboardPage` |
| **Komponen** | `ArticleTableRow → DeleteButton → Modal` |
| **Method** | `DELETE` |
| **Endpoint** | `/articles/:id` |
| **Trigger** | User klik "Ya, Hapus" di dalam dialog konfirmasi |
| **Butuh Token** | Ya |

**Penanganan Respons di UI:**

| Kondisi API | Yang Terjadi di UI |
|---|---|
| ✅ `200 OK` | Modal tutup → baris artikel hilang dari tabel tanpa reload |
| ❌ `403 Forbidden` | Modal tutup → tampil notifikasi error |
| ❌ `404 Not Found` | Modal tutup → tampil notifikasi error |

---

### 2.3 Modul Komentar

---

#### INT-10 — Tambah Komentar

| Atribut | Detail |
|---|---|
| **Halaman** | `ArticleDetailPage` |
| **Komponen** | `CommentForm` |
| **Method** | `POST` |
| **Endpoint** | `/articles/:id/comments` |
| **Trigger** | User klik "Kirim Komentar" |
| **Butuh Token** | Ya |

**Data yang Dikirim:**
```json
{
  "content": "value dari textarea komentar"
}
```

**Penanganan Respons di UI:**

| Kondisi API | Yang Terjadi di UI |
|---|---|
| ✅ `201 Created` | Komentar baru langsung muncul di daftar (tanpa reload) → textarea dikosongkan |
| ❌ `400 Bad Request` | Tampil pesan error di bawah textarea |
| ❌ `404 Not Found` | Tampil notifikasi "Artikel tidak ditemukan" |

---

#### INT-11 — Hapus Komentar

| Atribut | Detail |
|---|---|
| **Halaman** | `ArticleDetailPage` |
| **Komponen** | `CommentItem → DeleteCommentButton` |
| **Method** | `DELETE` |
| **Endpoint** | `/comments/:id` |
| **Trigger** | User klik tombol hapus di samping komentarnya |
| **Butuh Token** | Ya |

**Penanganan Respons di UI:**

| Kondisi API | Yang Terjadi di UI |
|---|---|
| ✅ `200 OK` | Komentar langsung hilang dari daftar (tanpa reload) |
| ❌ `403 Forbidden` | Tampil notifikasi error |

---

## 3. Ringkasan Tabel Integrasi

| ID | Komponen / Halaman | Method | Endpoint | Token | Trigger |
|---|---|---|---|---|---|
| INT-01 | `RegisterForm` | POST | `/auth/register` | ❌ | Submit form |
| INT-02 | `LoginForm` | POST | `/auth/login` | ❌ | Submit form |
| INT-03 | `LogoutButton` | POST | `/auth/logout` | ✅ | Klik logout |
| INT-04 | `ArticleList` (Home) | GET | `/articles` | ❌ | Page mount / page berubah |
| INT-05 | `ArticleContent` | GET | `/articles/:id` | ❌ | Page mount |
| INT-06 | `ArticleTable` (Dashboard) | GET | `/articles` | ✅ | Page mount |
| INT-07 | `ArticleForm` (create) | POST | `/articles` | ✅ | Submit form |
| INT-08a | `ArticleForm` (edit) — load | GET | `/articles/:id` | ✅ | Page mount |
| INT-08b | `ArticleForm` (edit) — save | PUT | `/articles/:id` | ✅ | Submit form |
| INT-09 | `DeleteButton` (Dashboard) | DELETE | `/articles/:id` | ✅ | Konfirmasi hapus |
| INT-10 | `CommentForm` | POST | `/articles/:id/comments` | ✅ | Submit form |
| INT-11 | `DeleteCommentButton` | DELETE | `/comments/:id` | ✅ | Klik hapus |

---

## 4. Catatan Penting untuk Developer

- **Semua pemanggilan API** harus menggunakan instance `apiClient` dari `src/lib/axios.ts` — bukan `fetch` atau instance Axios baru — agar interceptor JWT berjalan
- **Jangan pernah** menyimpan token secara manual di komponen; selalu gunakan `authStore.setAuth()` dan biarkan Zustand persist yang menangani localStorage
- **Optimistic update** (mengubah UI sebelum API konfirmasi) hanya boleh dilakukan untuk operasi hapus komentar — operasi lain tunggu respons API terlebih dahulu
- Setiap pemanggilan API harus memiliki **tiga state**: `loading`, `success`, dan `error` — tidak boleh ada pemanggilan tanpa penanganan loading dan error
