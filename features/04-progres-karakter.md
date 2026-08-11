# Progres Karakter

Karakter anak tumbuh dengan XP, level, dan item yang membuat progres terasa seru.

## Spesifikasi

### Tujuan
Karakter anak tumbuh seiring bermain: XP dan level naik, item terkumpul, dan penampilan bisa diubah sehingga progres terasa seru.

### Selesai bila
- Anak bisa melihat XP dan level karakter di layar; XP bertambah setelah menyelesaikan misi dan level naik otomatis saat XP cukup.
- Ada halaman karakter yang menampilkan level, XP, dan progres menuju level berikutnya.
- Item hasil misi masuk ke inventori; anak bisa melihat daftar item dan memakainya.
- Anak bisa mengganti penampilan karakter dengan item yang dimiliki dan perubahannya langsung terlihat.
- Semua perubahan tersimpan, jadi saat aplikasi dibuka lagi progres dan penampilan tetap ada.

## Sub-fitur: Naik Level

Karakter naik level setiap kali XP mencukupi.

### Tujuan
Karakter naik level setiap kali XP mencukupi, sebagai tanda perkembangan anak.

### Selesai bila
- Level tampil di profil karakter dan bertambah otomatis saat XP mencapai batas level berikutnya.
- Saat naik level muncul animasi/notifikasi singkat dan XP berlebih tetap dihitung.
- Jumlah XP dan target XP untuk level berikutnya ditampilkan dengan jelas (contoh: 120/200).

## Sub-fitur: Inventori Item

Anak melihat dan memakai item/cosmetic miliknya.

### Tujuan
Anak dapat melihat semua item/cosmetic yang dimiliki dan memakainya.

### Selesai bila
- Ada halaman inventori yang menampilkan daftar item milik anak, termasuk item yang sedang dipakai.
- Item yang didapat dari misi muncul di inventori; item bisa dipilih untuk dipakai atau dilepas.
- Item yang dipakai ditandai jelas (misal label "Dipakai") dan langsung tercermin di tampilan karakter.

## Sub-fitur: Ubah Penampilan

Anak mengganti tampilan karakter dengan item yang dimiliki.

### Tujuan
Anak dapat mengganti tampilan karakter menggunakan item yang dimiliki.

### Selesai bila
- Dari halaman karakter atau inventori, anak memilih item dan melihat karakter berubah sesuai item itu.
- Ada cara mudah untuk melepas item dan kembali ke penampilan awal.
- Perubahan penampilan tersimpan dan tetap terlihat di halaman karakter dan saat bermain.

## Task

### 1. Buat halaman karakter dengan data tiruan

### 2. Buat animasi dan notifikasi naik level

### 3. Buat halaman inventori dengan data tiruan

### 4. Tambahkan aksi pakai dan lepas item

### 5. Buat preview perubahan penampilan karakter

### 6. Simpan progres dan penampilan ke localStorage

### 7. Buat skema database karakter dan item

### 8. Buat endpoint API profil karakter

### 9. Buat endpoint API update XP level

### 10. Buat endpoint API daftar item karakter

### 11. Buat endpoint API setel status item
