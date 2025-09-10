# Task Log to Spreadsheet Converter

Ini adalah sebuah web tool sederhana yang dibuat dengan HTML, CSS, dan JavaScript murni untuk mengubah log tugas harian dari format teks biasa menjadi tabel yang terstruktur. Alat ini dirancang untuk mempercepat proses pelaporan dan pemantauan tugas dengan mengotomatiskan entri data ke dalam spreadsheet seperti Google Sheets.

[![Tampilan Aplikasi](https://github.com/fahroediin/Task-Converter/blob/main/Screenshot.png)](https://task-converter.vercel.app/)

## Fitur Utama

-   **Parsing Cerdas**: Secara otomatis membaca dan memisahkan tanggal, Penanggung Jawab (PIC), dan deskripsi tugas dari teks mentah.
-   **Penentuan Status Otomatis**: Menentukan status tugas sebagai `In Progress` atau `Done` berdasarkan kemunculannya di laporan hari berikutnya.
-   **Pelacakan Tanggal**: Mengidentifikasi `Start Date` dan `End Date` tugas.
-   **Ringkasan Tugas**: Membuat kolom "Task" yang ringkas, sambil mempertahankan deskripsi lengkap di kolom "Description".
-   **Preview Interaktif**: Menampilkan hasil konversi dalam bentuk tabel HTML yang rapi.
-   **Fungsi "Copy to Clipboard"**: Menyalin data dalam format *Tab-Separated Values* (TSV) yang siap untuk ditempelkan langsung ke Google Sheets.
-   **✨ Contoh Format Bawaan**: Menyediakan tombol "Sample text" untuk menyalin format input yang benar secara instan.
-   **Sepenuhnya Client-Side**: Semua proses terjadi di browser. Tidak ada data yang dikirim ke server, sehingga privasi dan keamanan data terjaga.

## Struktur Proyek

Proyek ini terdiri dari beberapa file utama:
```
/
├── index.html (Antarmuka web tool original)
├── sample.txt (Berisi teks contoh untuk format input)
├── google-apps-script.gs (Kode Google Apps Script untuk integrasi langsung)
└── dialog.html (Antarmuka dialog untuk Google Apps Script)
```

## Cara Penggunaan

Terdapat dua cara untuk menggunakan alat ini:

### 1. Menggunakan Web Tool (Cara Cepat)

Metode ini cocok untuk konversi cepat tanpa perlu instalasi apa pun.

1.  Buka aplikasi melalui [link demo](https://task-converter.vercel.app/) atau jalankan secara lokal.
2.  Untuk mencoba, klik tombol **Sample text** di sebelah kanan judul "Input Text". Ini akan menyalin format yang benar ke clipboard Anda.
3.  Tempelkan (Ctrl+V atau Cmd+V) teks sampel (atau teks laporan Anda sendiri) ke dalam kotak **"Input Text"**.
4.  Klik tombol biru **"Convert"**.
5.  Hasilnya akan langsung muncul dalam bentuk tabel di area **"Preview"**.
6.  Untuk menyalin data ke spreadsheet, klik **ikon copy** yang terletak di sebelah kanan judul "Preview".
7.  Buka Google Sheets, klik pada sel **A1** (atau sel pilihan Anda), dan tempel. Data akan terisi secara otomatis.

### 2. Integrasi Langsung ke Google Sheets (Fitur Baru)

Metode ini memungkinkan Anda memasukkan data langsung dari dalam Google Sheets, tanpa perlu copy-paste. Ini memerlukan penyiapan satu kali.

#### Penyiapan (Satu Kali)

1.  Buka file Google Sheets yang ingin Anda gunakan.
2.  Klik menu **Extensions** > **Apps Script**.
3.  Editor skrip akan terbuka. Hapus semua kode contoh di file `Code.gs`.
4.  Salin seluruh konten dari file `google-apps-script.gs` di proyek ini, lalu tempel ke dalam editor Apps Script yang kosong.
5.  Di editor Apps Script, klik ikon tambah (**+**) di sebelah "Files" dan pilih **HTML**.
6.  Beri nama file baru tersebut `dialog.html` (pastikan nama sama persis) dan klik OK.
7.  Hapus konten default dari file `dialog.html` yang baru dibuat.
8.  Salin seluruh konten dari file `dialog.html` di proyek ini, lalu tempel ke editor.
9.  Klik ikon **Save project** (gambar disket) di bagian atas.

#### Cara Menggunakan

1.  Setelah menyimpan, muat ulang (refresh) halaman Google Sheets Anda.
2.  Sebuah menu baru bernama **"Task Converter"** akan muncul di sebelah menu "Help".
3.  Klik **Task Converter** > **Import Task Log...**.
4.  Sebuah dialog akan muncul. Tempelkan teks laporan Anda ke dalam kotak teks.
5.  Tentukan sel target tempat data akan dimasukkan (misalnya, `A1`).
6.  Klik **"Convert and Insert"**. Skrip akan memproses data dan memasukkannya langsung ke dalam sheet.

## Menjalankan Secara Lokal

Karena aplikasi ini menggunakan `fetch()` API untuk memuat `sample.txt`, Anda tidak bisa hanya membuka `index.html` dengan klik dua kali karena akan terblokir oleh kebijakan CORS browser.

Cara termudah untuk menjalankannya secara lokal adalah dengan menggunakan server pengembangan. Jika Anda menggunakan Visual Studio Code, Anda bisa menggunakan ekstensi **"Live Server"**.

1.  Instal ekstensi [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) di VS Code.
2.  Buka folder proyek di VS Code.
3.  Klik kanan pada file `index.html` dan pilih "Open with Live Server".

## Format Input yang Diperlukan

Agar alat ini berfungsi dengan benar, teks input harus mengikuti struktur berikut:

-   **Tanggal**: Ditulis dalam format `DD - NamaBulan - YYYY` dan dipisahkan oleh baris kosong.
    -   Contoh: `17 - Juli - 2025`
-   **Penanggung Jawab (PIC)**: Ditulis dengan format `Nomor. Nama`.
    -   Contoh: `1. Stella`
-   **Tugas (Task)**: Setiap tugas diawali dengan tanda hubung (`-`) dan spasi.
    -   Contoh: `- Validasi tiap field currency/number tidak boleh minus (-)`

Contoh lengkap format ini bisa dilihat di file `sample.txt`.