# Wireframe / Mockup
## Sistem Blog — Frontend

---

| Atribut | Detail |
|---|---|
| **Nama Proyek** | Blog Frontend |
| **Versi Dokumen** | 1.0 |
| **Tanggal Dibuat** | 2 Mei 2026 |
| **Dibuat Oleh** | System Analyst / UI Designer |
| **Tipe** | Low-fidelity Wireframe (ASCII) |

---

## Catatan Pembacaan Wireframe

Wireframe ini menggunakan format teks/ASCII untuk keperluan dokumentasi awal. Simbol yang digunakan:

| Simbol | Artinya |
|---|---|
| `[ ]` | Tombol (Button) |
| `[________]` | Input field / Text field |
| `(o)` / `( )` | Radio button |
| `[v]` | Dropdown |
| `░░░░░░░░` | Gambar / placeholder image |
| `▓▓▓▓▓▓▓▓` | Elemen aktif / terpilih |
| `--- ---` | Garis pemisah / divider |

---

## WF-01 — Navbar (Komponen Global)

Navbar muncul di semua halaman.

**Kondisi: Belum Login**
```
┌─────────────────────────────────────────────────────────────────┐
│  📝 BlogApp                              [ Login ]  [ Daftar ]  │
└─────────────────────────────────────────────────────────────────┘
```

**Kondisi: Sudah Login**
```
┌─────────────────────────────────────────────────────────────────┐
│  📝 BlogApp                    [ Dashboard ]  Halo, Budi  [ ▼ ] │
│                                                     ┌──────────┐│
│                                                     │ Logout   ││
│                                                     └──────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## WF-02 — Halaman Home (`/`)

```
┌─────────────────────────────────────────────────────────────────┐
│  📝 BlogApp                              [ Login ]  [ Daftar ]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                      Artikel Terbaru                            │
│                                                                 │
│  ┌───────────────────────────┐  ┌───────────────────────────┐  │
│  │                           │  │                           │  │
│  │  Belajar Node.js Dasar    │  │  Tips Menulis API Bagus   │  │
│  │  ─────────────────────    │  │  ─────────────────────    │  │
│  │  Oleh: Budi Santoso       │  │  Oleh: Budi Santoso       │  │
│  │  1 Mei 2026               │  │  2 Mei 2026               │  │
│  │                           │  │                           │  │
│  │           [ Baca Artikel ]│  │           [ Baca Artikel ]│  │
│  └───────────────────────────┘  └───────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────┐  ┌───────────────────────────┐  │
│  │  Judul Artikel Ketiga     │  │  Judul Artikel Keempat    │  │
│  │  ─────────────────────    │  │  ─────────────────────    │  │
│  │  Oleh: Ani Rahayu         │  │  Oleh: Citra Dewi         │  │
│  │  30 Apr 2026              │  │  29 Apr 2026               │  │
│  │                           │  │                           │  │
│  │           [ Baca Artikel ]│  │           [ Baca Artikel ]│  │
│  └───────────────────────────┘  └───────────────────────────┘  │
│                                                                 │
│              [ ← Prev ]   Halaman 1 dari 3   [ Next → ]        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                    © 2026 BlogApp                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## WF-03 — Halaman Detail Artikel (`/articles/:id`)

```
┌─────────────────────────────────────────────────────────────────┐
│  📝 BlogApp                              [ Login ]  [ Daftar ]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ← Kembali ke Daftar Artikel                                    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │   Belajar Node.js Dasar                                 │   │
│  │   ──────────────────────────────────────────────────    │   │
│  │   Oleh: Budi Santoso  |  1 Mei 2026  |  Published      │   │
│  │                                                         │   │
│  │   Lorem ipsum dolor sit amet, consectetur adipiscing   │   │
│  │   elit. Sed do eiusmod tempor incididunt ut labore et   │   │
│  │   dolore magna aliqua. Ut enim ad minim veniam, quis   │   │
│  │   nostrud exercitation ullamco laboris...               │   │
│  │                                                         │   │
│  │   ...konten artikel berlanjut...                        │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ─────────────────── Komentar (3) ───────────────────────────  │
│                                                                 │
│  [Kondisi: Sudah Login]                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Tulis komentar kamu...                                 │   │
│  │  [___________________________________________________]  │   │
│  │                                    [ Kirim Komentar ]  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Kondisi: Belum Login]                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │   Login untuk memberikan komentar → [ Login ]           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Ani Rahayu  •  1 Mei 2026                    [ Hapus ] │   │
│  │  Artikel yang sangat membantu!                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Citra Dewi  •  2 Mei 2026                              │   │
│  │  Terima kasih, sangat informatif.                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

> **Catatan:** Tombol `[ Hapus ]` di samping komentar hanya muncul jika komentar tersebut milik pengguna yang sedang login, atau jika pengguna adalah Admin.

---

## WF-04 — Halaman Login (`/login`)

```
┌─────────────────────────────────────────────────────────────────┐
│  📝 BlogApp                                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│              ┌────────────────────────────────┐                 │
│              │                                │                 │
│              │    Masuk ke Akun Kamu          │                 │
│              │    ──────────────────          │                 │
│              │                                │                 │
│              │    Email                       │                 │
│              │    [__________________________]│                 │
│              │                                │                 │
│              │    Password                    │                 │
│              │    [__________________________]│                 │
│              │                                │                 │
│              │  ✕ Email atau password salah   │  ← Pesan error  │
│              │    (muncul jika login gagal)   │                 │
│              │                                │                 │
│              │    [       Masuk        ]       │                 │
│              │                                │                 │
│              │    Belum punya akun?            │                 │
│              │    Daftar di sini →             │                 │
│              │                                │                 │
│              └────────────────────────────────┘                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## WF-05 — Halaman Register (`/register`)

```
┌─────────────────────────────────────────────────────────────────┐
│  📝 BlogApp                                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│              ┌────────────────────────────────┐                 │
│              │                                │                 │
│              │    Buat Akun Baru              │                 │
│              │    ──────────────             │                 │
│              │                                │                 │
│              │    Nama Lengkap                │                 │
│              │    [__________________________]│                 │
│              │                                │                 │
│              │    Email                       │                 │
│              │    [__________________________]│                 │
│              │  ✕ Email sudah digunakan       │  ← Error API    │
│              │                                │                 │
│              │    Password                    │                 │
│              │    [__________________________]│                 │
│              │  ✕ Minimal 8 karakter          │  ← Error client │
│              │                                │                 │
│              │    [       Daftar       ]       │                 │
│              │                                │                 │
│              │    Sudah punya akun?            │                 │
│              │    Masuk di sini →              │                 │
│              │                                │                 │
│              └────────────────────────────────┘                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## WF-06 — Halaman Dashboard (`/dashboard`)

```
┌─────────────────────────────────────────────────────────────────┐
│  📝 BlogApp                    [ Dashboard ]  Halo, Budi  [ ▼ ] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Dashboard Artikel                    [ + Buat Artikel Baru ]  │
│   ──────────────────                                            │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Judul                   │ Status      │ Tanggal  │ Aksi  │  │
│  ├──────────────────────────┼─────────────┼──────────┼───────┤  │
│  │  Belajar Node.js Dasar   │ ● Published │ 1 Mei 26 │ [✏️][🗑️]│  │
│  ├──────────────────────────┼─────────────┼──────────┼───────┤  │
│  │  Tips TypeScript         │ ○ Draft     │ 2 Mei 26 │ [✏️][🗑️]│  │
│  ├──────────────────────────┼─────────────┼──────────┼───────┤  │
│  │  Panduan Express.js      │ ○ Draft     │ 2 Mei 26 │ [✏️][🗑️]│  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  [Dialog Konfirmasi Hapus — muncul saat klik 🗑️]               │
│  ┌───────────────────────────────────┐                          │
│  │  Hapus artikel ini?               │                          │
│  │  Tindakan ini tidak bisa diurungkan│                         │
│  │                                   │                          │
│  │      [ Batal ]   [ Ya, Hapus ]    │                          │
│  └───────────────────────────────────┘                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## WF-07 — Halaman Buat Artikel (`/articles/create`)

```
┌─────────────────────────────────────────────────────────────────┐
│  📝 BlogApp                    [ Dashboard ]  Halo, Budi  [ ▼ ] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ← Kembali ke Dashboard                                        │
│                                                                 │
│   Buat Artikel Baru                                             │
│   ──────────────────                                            │
│                                                                 │
│   Judul Artikel                                                 │
│   [_____________________________________________________________]│
│                                                                 │
│   Konten                                                        │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                                                         │  │
│   │  Tulis konten artikel di sini...                        │  │
│   │                                                         │  │
│   │                                                         │  │
│   │                                                         │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   Status                                                        │
│   [Draft          ▼]                                            │
│    - Draft                                                      │
│    - Published                                                  │
│                                                                 │
│   [ Batal ]                          [ Simpan Artikel ]         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## WF-08 — Halaman Edit Artikel (`/articles/:id/edit`)

```
┌─────────────────────────────────────────────────────────────────┐
│  📝 BlogApp                    [ Dashboard ]  Halo, Budi  [ ▼ ] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ← Kembali ke Dashboard                                        │
│                                                                 │
│   Edit Artikel                                                  │
│   ─────────────                                                 │
│                                                                 │
│   Judul Artikel                                                 │
│   [Belajar Node.js Dasar_______________________________________]│
│                                 ← Form sudah terisi data lama   │
│   Konten                                                        │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │  Node.js adalah runtime JavaScript yang berjalan        │  │
│   │  di sisi server...                                      │  │
│   │                                 ← Konten lama terisi    │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   Status                                                        │
│   [Published      ▼]            ← Status lama terisi           │
│                                                                 │
│   [ Batal ]                        [ Simpan Perubahan ]         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## WF-09 — Halaman 404 Not Found

```
┌─────────────────────────────────────────────────────────────────┐
│  📝 BlogApp                              [ Login ]  [ Daftar ]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                                                                 │
│                         404                                     │
│                  Halaman Tidak Ditemukan                        │
│                                                                 │
│          Halaman yang kamu cari tidak ada atau                  │
│          sudah dipindahkan.                                     │
│                                                                 │
│                  [ Kembali ke Beranda ]                         │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
