# Backup dan Restore Log – Database SIKA

## 1. Informasi Database
| Item | Keterangan |
|---|---|
| Database sumber | `sika_db` |
| DBMS | MariaDB |
| Tools | XAMPP dan phpMyAdmin |
| Database tujuan pengujian restore | `sika_db_uji` |

## 2. Prosedur Backup (Export)
1. Buka phpMyAdmin melalui XAMPP.
2. Pilih database `sika_db`.
3. Buka menu Export.
4. Pilih format SQL.
5. Jalankan export dan simpan file backup.
6. Catat nama file dan tanggal backup pada log.

## 3. Prosedur Restore (Import)
1. Buat atau pilih database pengujian `sika_db_uji`.
2. Buka menu Import di phpMyAdmin.
3. Pilih file backup SQL.
4. Jalankan import.
5. Periksa tabel menggunakan `SHOW TABLES;`.
6. Verifikasi jumlah data setiap tabel dan bandingkan dengan database sumber.

## 4. Log Pelaksanaan
| Kegiatan | Tanggal/Waktu | Hasil | Bukti |
|---|---|---|---|
| Export database `sika_db` | Isi setelah dilakukan | Belum dicatat | Screenshot export |
| Menyiapkan database `sika_db_uji` | Isi setelah dilakukan | Belum dicatat | Screenshot database tujuan |
| Import file backup SQL | Isi setelah dilakukan | Belum dicatat | Screenshot import |
| Menjalankan `SHOW TABLES;` | Isi setelah dilakukan | Belum diverifikasi | Screenshot hasil |
| Verifikasi jumlah data tiap tabel | Isi setelah dilakukan | Belum diverifikasi | Screenshot hasil |

## 5. Kesimpulan
Isi setelah proses backup, restore, dan verifikasi selesai. Nyatakan keberhasilan berdasarkan bukti pengujian.

**Catatan:** Jangan menyatakan backup atau restore berhasil sebelum proses dilakukan dan diverifikasi.
