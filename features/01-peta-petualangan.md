# Peta Petualangan

Layar utama berisi peta dunia dengan area dan quest yang bisa dijelajahi anak.

## Spesifikasi

### Tujuan
Layar utama game yang menampilkan peta dunia berisi area-area petualangan, sehingga anak bisa melihat dan memilih tempat bermain.

### Selesai bila
- Anak membuka aplikasi dan langsung melihat peta dunia dengan beberapa area yang tampak jelas.
- Setiap area menampilkan nama dan status terkunci/terbuka.
- Anak bisa mengetuk area untuk melihat quest di dalamnya.

## Sub-fitur: Lihat Peta Dunia

Anak melihat peta dengan beberapa area petualangan yang tersedia.

### Tujuan
Anak melihat peta dengan beberapa area petualangan yang tersedia.

### Selesai bila
- Layar utama menampilkan peta dengan minimal 3 area yang bisa dilihat.
- Area yang terkunci terlihat berbeda (misal redup atau ada gembok) dari area terbuka.
- Peta bisa digulir/digeser jika areanya lebih dari satu layar.

## Sub-fitur: Pilih Area

Anak mengetuk area untuk melihat quest yang bisa dimainkan.

### Tujuan
Anak mengetuk area untuk melihat daftar quest yang bisa dimainkan.

### Selesai bila
- Saat area diketuk, muncul layar atau daftar quest milik area itu.
- Quest yang terkunci menunjukkan syaratnya (misal: selesaikan quest sebelumnya).
- Anak bisa kembali ke peta dunia dengan mudah.

## Sub-fitur: Buka Area Baru

Area baru terbuka setelah anak menyelesaikan quest sebelumnya.

### Tujuan
Area baru terbuka setelah anak menyelesaikan quest-quest sebelumnya.

### Selesai bila
- Setelah quest terakhir di suatu area selesai, area berikutnya otomatis terbuka.
- Muncul notifikasi atau animasi singkat bahwa area baru terbuka.
- Area yang baru terbuka bisa langsung diketuk untuk dimainkan.

## Sub-fitur: Lihat Progress

Anak melihat sejauh mana penyelesaian di setiap area.

### Tujuan
Anak melihat sejauh mana penyelesaian di setiap area.

### Selesai bila
- Setiap area menampilkan jumlah quest yang sudah diselesaikan (misal "2/5").
- Ada tanda centang atau bintang di area yang sudah 100% selesai.
- Progress tersimpan dan tetap terlihat saat anak membuka peta lagi.

## Task

### 1. Buat halaman peta dunia dengan area tiruan

### 2. Buat daftar quest saat area diketuk

### 3. Implementasikan pembukaan area baru dan notifikasi

### 4. Tampilkan progress quest dan simpan lokal

### 5. Buat migrasi tabel area dan quest

### 6. Buat endpoint API daftar area dan status

### 7. Buat endpoint API daftar quest per area

### 8. Buat endpoint API selesaikan quest dan buka area

### 9. Buat endpoint API progress penyelesaian area
