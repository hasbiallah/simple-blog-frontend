# User Flow Diagram
## Sistem Blog — Frontend

---

| Atribut | Detail |
|---|---|
| **Nama Proyek** | Blog Frontend |
| **Versi Dokumen** | 1.0 |
| **Tanggal Dibuat** | 2 Mei 2026 |
| **Dibuat Oleh** | System Analyst |

---

## Perbedaan User Flow dengan Flowchart Backend

| Aspek | Flowchart Backend (sudah ada) | User Flow Frontend |
|---|---|---|
| **Fokus** | Alur logika sistem & database | Perjalanan pengguna di antarmuka |
| **Subjek** | Sistem, middleware, query | Pengguna — apa yang mereka lihat & lakukan |
| **Output** | Keputusan sistem (200, 401, 403) | Perpindahan halaman & interaksi UI |
| **Contoh** | "Sistem verifikasi JWT → cek role" | "User klik Login → redirect ke Dashboard" |

---

## UF-01 — Alur Guest: Pertama Kali Membuka Aplikasi

```
[ Buka URL Aplikasi ]
          |
          ▼
  [ Halaman Home (/) ]
  Daftar artikel published
          |
          ├──────────────────────────────────────────┐
          │                                          │
    Klik "Baca Artikel"                    Klik "Login" di Navbar
          │                                          │
          ▼                                          ▼
  [ Halaman Detail Artikel ]           [ Halaman Login (/login) ]
  Lihat konten + komentar
          │
          │
    Lihat area komentar
          │
          ▼
  [ Tampil teks:
    "Login untuk berkomentar" ]
          │
    Klik link "Login"
          │
          ▼
  [ Halaman Login (/login) ]
```

---

## UF-02 — Alur Register Akun Baru

```
[ Halaman Login ]
       |
  Klik "Daftar di sini"
       |
       ▼
[ Halaman Register (/register) ]
       |
  Isi form: nama, email, password
       |
  Klik tombol "Daftar"
       |
       ▼
  < Validasi client-side lulus? >
     /              \
   Tidak             Ya
    |                 |
    ▼                 ▼
[ Tampil pesan    [ Kirim request ke API ]
  error inline ]        |
                        ▼
               < API respons sukses? >
                  /           \
                Tidak          Ya
                 |              |
                 ▼              ▼
         [ Tampil pesan   [ Tampil notifikasi:
           error dari       "Registrasi berhasil!" ]
           API inline ]         |
                                ▼
                        [ Redirect ke /login ]
```

---

## UF-03 — Alur Login

```
[ Halaman Login (/login) ]
          |
  Isi email & password
          |
  Klik "Masuk"
          |
          ▼
  < API respons sukses? >
     /              \
   Tidak             Ya
    |                 |
    ▼                 ▼
[ Tampil pesan   [ Simpan token & user
  error inline ]   ke Zustand store ]
                        |
                        ▼
             < Ada URL tujuan sebelumnya? >
                (misal: user coba akses
                 /dashboard sebelum login)
                /                  \
              Ya                   Tidak
               |                     |
               ▼                     ▼
    [ Redirect ke URL          [ Redirect ke
      tujuan semula ]            /dashboard ]
```

---

## UF-04 — Alur Logout

```
[ Halaman mana saja (sudah login) ]
              |
    Klik nama user di Navbar
              |
              ▼
    [ Dropdown menu muncul ]
              |
    Klik "Logout"
              |
              ▼
    [ Hapus token & user dari
      Zustand store + localStorage ]
              |
              ▼
    [ Redirect ke Halaman Home (/) ]
              |
              ▼
    [ Navbar berubah: tampilkan
      tombol Login & Daftar ]
```

---

## UF-05 — Alur Author: Membuat Artikel Baru

```
[ Halaman Dashboard (/dashboard) ]
              |
   Klik "+ Buat Artikel Baru"
              |
              ▼
[ Halaman Create Article (/articles/create) ]
              |
   Isi judul, konten, pilih status
              |
   Klik "Simpan Artikel"
              |
              ▼
  < API respons sukses? >
     /              \
   Tidak             Ya
    |                 |
    ▼                 ▼
[ Tampil pesan   [ Tampil notifikasi:
  error ]          "Artikel berhasil dibuat!" ]
                        |
                        ▼
               [ Redirect ke /dashboard ]
                        |
                        ▼
          [ Artikel baru muncul di tabel
            dengan status sesuai pilihan ]
```

---

## UF-06 — Alur Author: Edit Artikel

```
[ Halaman Dashboard (/dashboard) ]
              |
   Klik ikon ✏️ pada baris artikel
              |
              ▼
[ Halaman Edit Article (/articles/:id/edit) ]
  Form sudah terisi data artikel saat ini
              |
   Ubah field yang ingin diubah
              |
              ▼
  < Klik tombol apa? >
       /            \
   "Batal"      "Simpan Perubahan"
     |                |
     ▼                ▼
[ Kembali ke     < API respons sukses? >
  Dashboard ]      /             \
                 Tidak            Ya
                  |                |
                  ▼                ▼
           [ Tampil error ]  [ Notifikasi sukses ]
                                   |
                                   ▼
                          [ Redirect ke /dashboard ]
```

---

## UF-07 — Alur Author: Hapus Artikel

```
[ Halaman Dashboard (/dashboard) ]
              |
   Klik ikon 🗑️ pada baris artikel
              |
              ▼
  [ Dialog konfirmasi muncul:
    "Hapus artikel ini?
     Tindakan ini tidak bisa diurungkan" ]
              |
              ▼
  < Klik tombol apa? >
       /            \
   "Batal"       "Ya, Hapus"
     |                |
     ▼                ▼
[ Dialog        [ Kirim request DELETE ke API ]
  tutup,              |
  tidak ada      < API respons sukses? >
  perubahan ]      /             \
                 Tidak            Ya
                  |                |
                  ▼                ▼
           [ Tampil error ]  [ Notifikasi sukses ]
                                   |
                                   ▼
                         [ Artikel hilang dari tabel
                           (tanpa reload halaman) ]
```

---

## UF-08 — Alur Reader: Memberikan Komentar

```
[ Halaman Detail Artikel (/articles/:id) ]
  (user sudah login)
              |
   Scroll ke bawah → section komentar
              |
   Isi teks di textarea komentar
              |
   Klik "Kirim Komentar"
              |
              ▼
  < API respons sukses? >
     /              \
   Tidak             Ya
    |                 |
    ▼                 ▼
[ Tampil error ]  [ Komentar baru langsung
                    muncul di daftar komentar ]
                        |
                        ▼
                  [ Textarea komentar
                    kembali kosong ]
```

---

## UF-09 — Alur: Akses Halaman Protected Tanpa Login

```
[ User mengetik URL /dashboard
  langsung di browser ]
          |
          ▼
  [ ProtectedRoute mendeteksi:
    tidak ada token / belum login ]
          |
          ▼
  [ Simpan URL tujuan: /dashboard ]
          |
          ▼
  [ Redirect otomatis ke /login ]
          |
   User melakukan login berhasil
          |
          ▼
  [ Redirect ke /dashboard
    (URL tujuan semula) ]
```

---

## UF-10 — Alur: Token Expired saat Menggunakan Aplikasi

```
[ User sedang menggunakan aplikasi
  (sudah login, token kadaluarsa) ]
          |
  Melakukan aksi apapun yang
  memanggil API (misal: buat komentar)
          |
          ▼
  [ API mengembalikan 401 Unauthorized ]
          |
          ▼
  [ Axios Response Interceptor
    menangkap error 401 ]
          |
          ▼
  [ Hapus token & user dari
    Zustand store + localStorage ]
          |
          ▼
  [ Redirect ke /login ]
          |
          ▼
  [ Tampil pesan:
    "Sesi kamu telah berakhir,
     silakan login kembali" ]
```
