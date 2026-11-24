# Data Requirement – Sistem Informasi Akademik (SIKA)

## 1. Gambaran Umum
Database SIKA digunakan untuk mengelola data program studi, mahasiswa, mata kuliah, dan pengambilan mata kuliah melalui Kartu Rencana Studi (KRS). Database praktikum menggunakan MariaDB melalui XAMPP dan phpMyAdmin dengan nama `sika_db`.

## 2. Kebutuhan Data
### 2.1 Program Studi
- `id_prodi`: identitas program studi.
- `kode_prodi`: kode program studi.
- `nama_prodi`: nama program studi.

### 2.2 Mahasiswa
- `nim`: nomor induk mahasiswa.
- `nama`: nama mahasiswa.
- `email`: alamat email mahasiswa.
- `angkatan`: tahun masuk mahasiswa.
- `id_prodi`: identitas program studi mahasiswa.
- `created_at`: waktu data dibuat.

### 2.3 Mata Kuliah
- `kode_mk`: kode mata kuliah.
- `nama_mk`: nama mata kuliah.
- `sks`: jumlah satuan kredit semester.
- `semester`: semester mata kuliah.

### 2.4 KRS
- `id_krs`: identitas data KRS.
- `nim`: identitas mahasiswa.
- `kode_mk`: identitas mata kuliah.
- `tahun_akademik`: tahun akademik pengambilan mata kuliah.
- `semester_ambil`: semester pengambilan mata kuliah.

## 3. Kebutuhan Fungsional
1. Menyimpan data program studi.
2. Menyimpan data mahasiswa sesuai program studinya.
3. Menyimpan informasi mata kuliah.
4. Mencatat pengambilan mata kuliah mahasiswa pada tahun akademik dan semester tertentu.
5. Menampilkan data dari beberapa tabel menggunakan query SQL dan `JOIN`.

## 4. Kebutuhan Integritas
1. Setiap tabel memiliki primary key sesuai rancangan.
2. Relasi antartabel dijaga menggunakan foreign key.
3. Data penting yang bersifat unik tidak boleh tersimpan secara duplikat.
4. `mahasiswa.id_prodi` harus merujuk ke `prodi.id_prodi`.
5. `krs.nim` dan `krs.kode_mk` harus merujuk ke data pada tabel `mahasiswa` dan `mata_kuliah`.

## 5. Entitas dan Kunci
| Entitas | Primary Key | Foreign Key |
|---|---|---|
| `prodi` | `id_prodi` | - |
| `mahasiswa` | `nim` | `id_prodi` |
| `mata_kuliah` | `kode_mk` | - |
| `krs` | `id_krs` | `nim`, `kode_mk` |
