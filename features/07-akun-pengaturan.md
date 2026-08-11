# Akun & Pengaturan

Anak dan orang tua mengelola akun serta pengaturan aplikasi.

## Spesifikasi

### Tujuan
Mengelola akun dan pengaturan agar anak dan orang tua bisa memakai Questly dengan data pribadi yang tersimpan aman.
### Selesai bila
- Pengguna dapat membuat akun baru atau masuk ke akun yang sudah ada.
- Profil anak berisi nama, kelas, dan karakter awal dapat dibuat dan dipakai bermain.
- Pengaturan suara, notifikasi, dan ukuran teks dapat diubah sesuai keinginan dan tetap tersimpan.

## Sub-fitur: Daftar dan Masuk

Anak membuat akun atau masuk ke akun yang sudah ada.

### Tujuan
Membuat akun baru atau masuk ke akun yang sudah ada agar progres anak tersimpan dan bisa dilanjutkan.
### Selesai bila
- Pengguna bisa mendaftar menggunakan email dan kata sandi.
- Pengguna bisa masuk kembali dengan email dan kata sandi yang terdaftar.
- Muncul pesan yang jelas saat email sudah terpakai atau kata sandi salah.

## Sub-fitur: Profil Anak

Anak mengisi nama, kelas, dan memilih karakter awal.

### Tujuan
Mengisi data diri anak berupa nama, kelas, dan karakter awal sebelum mulai bermain.
### Selesai bila
- Tersedia formulir profil dengan kolom nama, pilihan kelas (SD 2 / SMP 3), dan pilihan karakter awal.
- Profil yang sudah dibuat langsung digunakan sebagai identitas pemain di dalam game.
- Nama dan kelas anak terlihat di halaman profil atau karakter.

## Sub-fitur: Pengaturan Aplikasi

Mengatur suara, notifikasi, dan ukuran teks sesuai kenyamanan.

### Tujuan
Mengatur suara, notifikasi, dan ukuran teks agar aplikasi nyaman digunakan anak.
### Selesai bila
- Ada halaman pengaturan berisi sakelar suara, sakelar notifikasi, dan pengatur ukuran teks.
- Perubahan pengaturan langsung terasa (misalnya suara mati, notifikasi berhenti, teks lebih besar).
- Pengaturan tetap sama saat aplikasi ditutup lalu dibuka lagi.

## Task

### 1. Buat halaman masuk dan daftar dengan mock

### 2. Buat formulir profil anak dan pilihan karakter

### 3. Buat halaman profil menampilkan identitas anak

### 4. Buat halaman pengaturan suara notifikasi dan teks

### 5. Terapkan perubahan pengaturan dan simpan secara lokal

### 6. Buat skema database tabel pengguna

### 7. Buat endpoint daftar dan masuk pengguna

### 8. Buat skema database tabel profil anak

### 9. Buat endpoint simpan dan ambil profil anak

### 10. Buat skema database tabel pengaturan aplikasi

### 11. Buat endpoint simpan dan ambil pengaturan aplikasi

### 12. Initial Setup Tech Stack & Project Structure

Lakukan inisialisasi dasar proyek menggunakan React Native Expo untuk aplikasi mobile, Drizzle ORM dengan SQLite untuk database, dan Tailwind CSS (NativeWind) untuk styling sesuai rekomendasi Tech Stack di PRD. Buat struktur folder awal yang rapi.

**Prompt:**

```
Inisialisasi proyek Questly dengan React Native Expo. Setup Drizzle ORM dengan SQLite, pasang NativeWind untuk styling, dan buat struktur folder (components, hooks, screens, db, services). Pastikan file konfigurasi awal sudah siap digunakan.
```
