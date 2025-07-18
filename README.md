# Task Log to Spreadsheet Converter

Ini adalah sebuah web tool sederhana yang dibuat dengan HTML, CSS, dan JavaScript murni untuk mengubah log tugas harian dari format teks biasa menjadi tabel yang terstruktur. Alat ini dirancang untuk mempercepat proses pelaporan dan pemantauan tugas dengan mengotomatiskan entri data ke dalam spreadsheet seperti Google Sheets.

## Fitur Utama

-   **Parsing Cerdas**: Secara otomatis membaca dan memisahkan tanggal, Penanggung Jawab (PIC), dan deskripsi tugas dari teks mentah.
-   **Penentuan Status Otomatis**: Menentukan status tugas sebagai `In Progress` atau `Done` berdasarkan kemunculannya di laporan hari berikutnya.
-   **Pelacakan Tanggal**: Mengidentifikasi `Start Date` (kapan tugas pertama kali muncul) dan `End Date` (kapan tugas selesai).
-   **Ringkasan Tugas**: Membuat kolom "Task" yang ringkas dan mudah dibaca, sambil mempertahankan deskripsi lengkap di kolom "Description".
-   **Preview Interaktif**: Menampilkan hasil konversi dalam bentuk tabel HTML yang rapi langsung di halaman web.
-   **Fungsi "Copy to Clipboard"**: Menghasilkan output *Tab-Separated Values* (TSV) yang siap disalin dengan satu klik untuk ditempelkan langsung ke Google Sheets.
-   **Sepenuhnya Client-Side**: Semua proses terjadi di browser Anda. Tidak ada data yang dikirim ke server, sehingga privasi Anda terjaga.

## Tampilan Aplikasi



## Cara Penggunaan

1.  Buka file `converter.html` di browser web pilihan Anda (Chrome, Firefox, Edge, dll.).
2.  Siapkan teks laporan harian Anda sesuai dengan format yang ditentukan di bawah.
3.  Tempelkan (paste) seluruh teks laporan ke dalam kotak **"Input Text"**.
4.  Klik tombol biru **"Convert"**.
5.  Hasilnya akan langsung muncul dalam bentuk tabel di area **"Preview"**.
6.  Untuk menyalin data ke spreadsheet, klik **ikon copy** yang terletak di sebelah kanan judul "Preview".
7.  Buka Google Sheets, klik pada sel **A1** (atau sel awal lainnya), dan tempel (Ctrl+V atau Cmd+V). Data akan terisi secara otomatis ke dalam kolom yang benar.

## Format Input yang Diperlukan

Agar alat ini berfungsi dengan benar, teks input harus mengikuti struktur berikut:

-   **Tanggal**: Ditulis dalam format `DD - NamaBulan - YYYY` dan dipisahkan oleh baris kosong dari konten sebelumnya.
    -   Contoh: `17 - Juli - 2025`
-   **Penanggung Jawab (PIC)**: Ditulis dengan format `Nomor. Nama`.
    -   Contoh: `1. Stella`
-   **Tugas (Task)**: Setiap tugas untuk seorang PIC diawali dengan tanda hubung (`-`) dan spasi.
    -   Contoh: `- Validasi tiap field currency/number tidak boleh minus (-)`

## Contoh Teks Input

Anda bisa menggunakan contoh di bawah ini untuk menguji alat ini.

```

17 - Juli - 2025

1. Stella
- Validasi tiap field currency/number tidak boleh minus (-)
- Validasi semua date/time di Application LKN form tidak boleh mundur ke belakang
- Ubah sub menu tidak perlu ada "Application LKN"
- Create fungsi add count di SP3KCounter
- Create fungsi generate dokumen SP3K, sample template/format dokumen ada di LOS KP3 v3 hal. terakhir

2. Sandi
- Refactor client side validation application order web
- Pindahkan business logic di LOSCS ke LOSFunction dan cek di module lain, semisal cycle.

3. Aditya
- Buat screen "Verification Documents" mengecek data dari table ApplicationDocuments (buat indexnya di Bawah menu Application Order Web) 
(detail :1. tampilkan berupa list document, tombol untuk menampilkan document (pop-up), Status Verifikasi dengan dropdown [Sesuai, Tidak Sesuai], Remarks (Catatan), tombol Submit (jika ada 1 dokumen dengan status verifikasi Tidak Sesuai, kembalikan ke state Entry Data, jika seluruh dokumen sesuai, lanjutkan ke Survey jika produk NeedSurvey, 2. Simpan ke ApplicationVerification)
- CreatedBy dan ModifiedBy di ApplicationDocument dari channel Upload, assign sesuai dgn user yg login

4. Jody
- Validasi tiap field currency/number tidak boleh minus (-)
- Validasi semua date/time di Application LKN form tidak boleh mundur ke belakang
- Buat Form berdasarkan ApplicationLKNKPR, Jika applicant product IsKPR maka isi Form LKNKPR tersebut, jika product nya bukan IsKPR arahkan ke form ApplicationLKN
untuk data document samakan isi ke ApplicationLKNData
Income + OtherIncome = Total Income
UtilityExpense + EducationExpense + BasicExpense + OtherExpense = TotalExpense
- Buat form untuk ApplicationAppraisal, letakkan di sebelah kanan stepper Survey

5. Pak IB
- Pindahkan Business Logic yang ada di LOSHome ke LOSFunction

6. Bu Fini
- Buat dokumen flow proses masing-masing produk (Kredit Tanpa Agunan, Kredit Agunan, KUR Kecil, Mikro dan KPR)


18 - Juli - 2025

1. Stella
- Create fungsi generate dokumen SP3K, sample template/format dokumen ada di LOS KP3 v3 hal. terakhir
- Tambahkan/assign CreatedBy dan ModifiedBy di ApplicationAppraisal

2. Sandi
- Pindahkan business logic di LOSCS ke LOSFunction dan cek di module lain, semisal cycle.
- Ubah Ketika submit application order (API) dari state survey ke state verification JIKA produk IsKPR (v1 dan v2)
- Penyusaian dari free text ke ENUM untuk field Tenureat, validasi nya + unit testing keduanya

3. Aditya
- Buat screen "Verification Documents" mengecek data dari table ApplicationDocuments (buat indexnya di Bawah menu Application Order Web)
(detail :1. tampilkan berupa list document, tombol untuk menampilkan document (pop-up), Status Verifikasi dengan dropdown [Sesuai, Tidak Sesuai], Remarks (Catatan), tombol Submit (jika ada 1 dokumen dengan status verifikasi Tidak Sesuai, kembalikan ke state Entry Data, jika seluruh dokumen sesuai, lanjutkan ke Survey jika produk NeedSurvey, 2. Simpan ke ApplicationVerification)
- CreatedBy dan ModifiedBy di ApplicationDocument dari channel Upload, assign sesuai dgn user yg login

4. Jody
- Validasi tiap field currency/number tidak boleh minus (-)
- Validasi semua date/time di Application LKN form tidak boleh mundur ke belakang
- Buat Form berdasarkan ApplicationLKNKPR, Jika applicant product IsKPR maka isi Form LKNKPR tersebut, jika product nya bukan IsKPR arahkan ke form ApplicationLKN
untuk data document samakan isi ke ApplicationLKNData
Income + OtherIncome = Total Income
UtilityExpense + EducationExpense + BasicExpense + OtherExpense = TotalExpense
- Tambahkan/assign CreatedBy dan ModifiedBy di ApplicationAppraisal

5. Bu Fini
- Buat dokumen flow proses masing-masing produk (Kredit Tanpa Agunan, Kredit Agunan, KUR Kecil, Mikro dan KPR)

6. Mas Piki
- Create desain figma untuk screen verifikasi dokumen

7. Pak IB
- Create dokumen third-party
```