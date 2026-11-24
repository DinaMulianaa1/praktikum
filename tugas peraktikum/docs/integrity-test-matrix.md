# Integrity Test Matrix – Database SIKA

| No. | Pengujian | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| 1 | Menambahkan mahasiswa valid | Data tersimpan | Belum diuji | Belum diuji |
| 2 | Memasukkan NIM duplikat | Ditolak oleh aturan primary key/keunikan | Belum diuji | Belum diuji |
| 3 | Memasukkan `id_prodi` yang tidak tersedia | Ditolak oleh foreign key | Belum diuji | Belum diuji |
| 4 | Menghapus prodi yang masih digunakan mahasiswa | Ditolak sesuai aturan foreign key yang diterapkan | Belum diuji | Belum diuji |
| 5 | Memasukkan KRS dengan mahasiswa dan mata kuliah valid | Data tersimpan | Belum diuji | Belum diuji |

## Petunjuk Pengujian
1. Jalankan setiap skenario pada database pengujian.
2. Catat hasil aktual pada kolom `Actual Result`.
3. Isi status `PASS` jika hasil aktual sesuai harapan atau `FAIL` jika tidak sesuai.
4. Simpan screenshot query atau pesan hasil dari MariaDB/phpMyAdmin.

**Penting:** Jangan mengisi PASS/FAIL sebelum pengujian benar-benar dilakukan.
