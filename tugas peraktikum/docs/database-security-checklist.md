# Database Security Checklist – SIKA

Checklist ini digunakan untuk memeriksa keamanan database `sika_db`.

| No. | Aspek | Penerapan/Pemeriksaan | Status | Bukti/Catatan |
|---|---|---|---|---|
| 1 | Data minimization | Menyimpan data sesuai kebutuhan sistem | Belum diverifikasi | Isi setelah pemeriksaan |
| 2 | Constraint | Menggunakan primary key, foreign key, dan unique sesuai rancangan | Belum diverifikasi | Lampirkan struktur tabel |
| 3 | Least privilege | User `sika_app` memiliki hak SELECT, INSERT, UPDATE, DELETE pada database `sika_db` | Belum diverifikasi | Lampirkan bukti hak akses |
| 4 | Credential handling | Tidak menampilkan password dalam laporan atau repository | Belum diverifikasi | Jangan unggah password |
| 5 | Safe mutation | Menggunakan kondisi WHERE saat menjalankan UPDATE dan DELETE | Belum diverifikasi | Lampirkan contoh query |

## Catatan
- Ubah status setelah pemeriksaan benar-benar dilakukan.
- Gunakan status `Sesuai`, `Tidak sesuai`, atau `Belum diverifikasi`.
- Jangan mencantumkan password, token, atau kredensial database di repository.
