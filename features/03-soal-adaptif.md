# Soal Adaptif

Sistem menyesuaikan soal dan tingkat kesulitan sesuai kemampuan anak.

## Spesifikasi

### Tujuan
Sistem menyesuaikan soal yang diberikan kepada anak berdasarkan kemampuan belajarnya, sehingga anak selalu mendapat latihan yang tepat—tidak terlalu mudah atau terlalu sulit—dan terus berkembang.

### Selesai bila
- Setiap jawaban anak (benar/salah, waktu menjawab, dan riwayat per topik) tersimpan dan bisa dianalisis untuk menentukan kekuatan serta kelemahan anak.
- Saat anak membuka misi atau latihan, sistem memilih topik, tingkat kesulitan, dan bentuk soal yang berbeda-beda sesuai performa anak sebelumnya.
- Anak yang lemah di suatu topik mendapat lebih banyak soal topik itu; anak yang sudah menguasai mendapat soal lebih menantang dan jarang mengulang soal dasar.
- Tampilan soal menunjukkan tingkat kesulitan/adaptasi secara halus (misalnya pesan "Soal sedikit lebih sulit!" atau "Kamu hebat, ini tantangan baru!") tanpa membingungkan anak.
- Semua soal yang diberikan tetap mengikuti kelas, mata pelajaran, topik, dan tingkat kesulitan yang sudah ditentukan sistem.

## Sub-fitur: Analisis Performa

Sistem belajar dari jawaban anak untuk mengetahui kekuatan dan kelemahan.

### Tujuan
Sistem mempelajari dari setiap jawaban anak untuk mengetahui topik mana yang sudah dikuasai dan mana yang masih lemah.

### Selesai bila
- Setiap jawaban anak tercatat dengan status benar/salah, waktu pengerjaan, dan topik soalnya.
- Untuk setiap topik yang pernah dikerjakan, sistem menyimpan skor penguasaan (misalnya 0–100) yang diperbarui setelah anak menjawab soal.
- Anak (atau orang tua) dapat melihat ringkasan sederhana kekuatan dan kelemahan, misalnya daftar topik dengan label "Kuat" atau "Perlu Latihan".

## Sub-fitur: Soal Disesuaikan

Tingkat kesulitan, jenis soal, dan topik latihan berubah sesuai kemampuan anak.

### Tujuan
Tingkat kesulitan, topik, dan jenis soal pada setiap misi/latihan berubah mengikuti hasil analisis kemampuan anak.

### Selesai bila
- Saat anak akan mengerjakan soal, sistem memilih topik yang paling perlu dilatih berdasarkan skor penguasaan terbaru.
- Soal yang muncul menyesuaikan tingkat kesulitan: jika anak sering benar, kesulitan naik; jika sering salah, kesulitan turun atau muncul soal penguatan.
- Jika anak sudah menguasai suatu topik, soal topik itu muncul lebih jarang dan diganti dengan topik lain atau soal dengan tingkat lebih tinggi.

## Sub-fitur: Variasi Bentuk Soal

Anak mendapat soal dalam bentuk pilihan ganda, isian, mencocokkan, dan lainnya.

### Tujuan
Anak tidak bosan karena soal yang muncul berganti-ganti bentuk, seperti pilihan ganda, isian, benar/salah, mencocokkan, dan tarik-lepas.

### Selesai bila
- Sistem dapat menampilkan minimal 5 bentuk soal: pilihan ganda, isian jawaban, benar/salah, mencocokkan, dan tarik-lepas.
- Bentuk soal dipilih secara bergantian/adaptif sesuai preferensi dan performa anak, tidak selalu pilihan ganda.
- Setiap bentuk soal memiliki tampilan dan cara menjawab yang jelas bagi anak, dengan instruksi singkat di layar.

## Sub-fitur: Materi Terstruktur

Soal selalu mengikuti mata pelajaran, topik, dan kelas yang sudah ditentukan.

### Tujuan
Soal yang diberikan tidak pernah keluar dari struktur kurikulum yang sudah ditetapkan (kelas, mata pelajaran, topik, dan tingkat kesulitan).

### Selesai bila
- Setiap soal yang muncul selalu berasal dari daftar topik yang sudah terdaftar untuk kelas anak (SD 2 atau SMP 3) dan mata pelajaran yang tersedia.
- Pilihan tingkat kesulitan soal (mudah/sedang/sulit) selalu mengacu pada pengaturan kurikulum, bukan ditentukan bebas oleh AI.
- Terdapat cara memeriksa bahwa soal yang dibuat AI selalu disertai keterangan kelas, mapel, topik, dan tingkat kesulitan yang valid.

## Task

### 1. Buat halaman utama latihan adaptif

### 2. Buat ringkasan kekuatan dan kelemahan topik

### 3. Buat komponen soal pilihan ganda dan isian

### 4. Buat komponen soal mencocokkan dan tarik lepas

### 5. Buat pemilihan topik dan kesulitan adaptif

### 6. Buat siklus pergiliran bentuk soal

### 7. Tampilkan pesan adaptasi tingkat kesulitan

### 8. Tampilkan metadata kurikulum pada soal

### 9. Buat tabel riwayat jawaban dan migrasi

### 10. Buat tabel skor penguasaan topik

### 11. Buat API simpan jawaban dan skor

### 12. Buat API rekomendasi soal adaptif

### 13. Buat validasi metadata kurikulum soal

### 14. Buat seeder kurikulum dan soal contoh
