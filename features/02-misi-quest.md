# Misi Quest

Anak menyelesaikan misi petualangan berisi tantangan soal untuk maju.

## Spesifikasi

### Tujuan
Misi Quest adalah inti petualangan: anak menyelesaikan rangkaian tantangan soal untuk maju, merasa seperti sedang bermain game.

### Selesai bila
- Anak dapat memilih misi yang tersedia di suatu area dan melihat alur cerita singkat sebelum tantangan.
- Misi menampilkan serangkaian soal yang harus dijawab; misi tidak bisa diselesaikan tanpa menjawab semua soal.
- Setiap jawaban langsung mendapat umpan balik benar/salah beserta penjelasan singkat.
- Setelah semua soal selesai, anak menerima hadiah XP, koin, dan item, dan progress misi tersimpan.

## Sub-fitur: Mulai Misi

Anak membuka misi di area tertentu dan mengikuti alur cerita singkat.

### Tujuan
Anak dapat membuka misi di area tertentu dan mengikuti alur cerita singkat sebelum memulai tantangan.

### Selesai bila
- Anak mengetuk quest yang terbuka dan layar berpindah ke tampilan misi.
- Muncul teks cerita pembuka singkat dengan tombol untuk melanjutkan atau melewati.
- Setelah cerita selesai, tombol "Mulai Tantangan" muncul untuk masuk ke soal pertama.

## Sub-fitur: Tantangan Soal

Anak menjawab soal yang muncul sebagai rintangan dalam misi.

### Tujuan
Anak menjawab soal yang menjadi rintangan dalam misi untuk melanjutkan petualangan.

### Selesai bila
- Soal muncul satu per satu sesuai bentuk (pilihan ganda, isian, benar/salah, mencocokkan, drag-and-drop).
- Ada indikator kemajuan seperti "Soal 1 dari 5" dan tombol untuk menjawab.
- Anak tidak bisa lanjut ke soal berikutnya sebelum menjawab soal saat ini.

## Sub-fitur: Umpan Balik Jawaban

Anak langsung melihat jawaban benar atau salah beserta penjelasan singkat.

### Tujuan
Anak langsung mendapat konfirmasi benar/salah dan penjelasan singkat setiap kali selesai menjawab soal.

### Selesai bila
- Setelah menekan jawab, muncul panel umpan balik: benar berwarna hijau/centang, salah berwarna merah/silang.
- Jika jawaban salah, jawaban yang benar ditampilkan.
- Penjelasan singkat muncul dan bisa ditutup dengan tombol "Lanjut" untuk ke soal berikutnya.

## Sub-fitur: Hadiah Misi

Anak menerima XP, koin, dan item setelah misi berhasil.

### Tujuan
Anak menerima XP, koin, dan item sebagai hadiah setelah berhasil menyelesaikan seluruh tantangan misi.

### Selesai bila
- Setelah soal terakhir dijawab, muncul layar hadiah yang menampilkan jumlah XP, koin, dan item yang diperoleh.
- Jumlah hadiah sesuai dengan info yang terlihat sebelum misi dimulai.
- Ada tombol untuk menutup layar hadiah dan kembali ke peta, lalu total XP dan koin karakter sudah bertambah.

## Task

### 1. Buat halaman daftar misi area

### 2. Buat layar cerita pembuka dan tombol mulai

### 3. Buat layar soal dengan indikator progres

### 4. Buat panel umpan balik jawaban dengan penjelasan

### 5. Buat layar hadiah misi dan perbarui XP

### 6. Buat skema database misi dan progress

### 7. Buat API daftar misi di area

### 8. Buat API detail misi dan cerita

### 9. Buat API daftar soal misi

### 10. Buat API kirim jawaban dan umpan balik

### 11. Buat API selesaikan misi dan beri hadiah
