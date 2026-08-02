# Cara Deploy "Shima Grows Up" ke GitHub Pages (Gratis)

## 1. Siapkan akun & repo
1. Buat akun di https://github.com kalau belum punya.
2. Klik **New repository** → beri nama, misal `shima-grows-up` → set **Public** → klik **Create repository**.

## 2. Upload file
Cara paling mudah (tanpa command line):
1. Di halaman repo yang baru dibuat, klik **Add file → Upload files**.
2. Drag & drop **4 item ini** (jaga strukturnya persis seperti ini):
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - folder `icons` (berisi `icon-192.png` dan `icon-512.png`)
3. Scroll ke bawah → klik **Commit changes**.

> Struktur akhir di repo harus seperti ini:
> ```
> shima-grows-up/
> ├── index.html
> ├── manifest.json
> ├── sw.js
> └── icons/
>     ├── icon-192.png
>     └── icon-512.png
> ```

## 3. Aktifkan GitHub Pages
1. Di repo, klik tab **Settings**.
2. Di sidebar kiri, klik **Pages**.
3. Di bagian **Build and deployment → Source**, pilih **Deploy from a branch**.
4. Branch: pilih **main**, folder: pilih **/ (root)** → klik **Save**.
5. Tunggu 1–2 menit, lalu refresh halaman ini — akan muncul link seperti:
   `https://username-kamu.github.io/shima-grows-up/`

## 4. Install di HP (Android)
1. Buka link di atas pakai **Chrome**.
2. Ketuk menu titik tiga (⋮) → **Install app** / **Add to Home screen**.
3. Buka dari home screen — akan tampil seperti aplikasi biasa (tanpa address bar browser).

## 5. Install di iPhone/iPad
1. Buka link di atas pakai **Safari** (wajib Safari, bukan Chrome).
2. Ketuk tombol **Share** (kotak dengan panah ke atas).
3. Pilih **Add to Home Screen** → **Add**.

## 6. Install di Laptop/Desktop (Chrome/Edge)
1. Buka link di atas.
2. Klik ikon **install** (bentuk layar dengan panah) di address bar sebelah kanan,
   atau klik tombol **"📲 Install App"** di pojok kanan atas aplikasi.
3. Aplikasi akan terbuka di window terpisah seperti app native.

## 7. Aktifkan notifikasi
1. Setelah install, buka aplikasi → tab **Settings**.
2. Nyalakan toggle **Aktifkan Pengingat**.
3. Browser akan meminta izin notifikasi → klik **Allow/Izinkan**.
4. Atur jam pagi & malam sesuai kebutuhan.

## ⚠️ Batasan yang perlu dipahami
- Notifikasi bunyi otomatis **selama aplikasi ini terbuka** (foreground atau background yang belum di-suspend OS). Ini standar untuk PWA statis tanpa server.
- Untuk notifikasi yang tetap bunyi walau aplikasi **benar-benar ditutup total berhari-hari**, dibutuhkan server push (misal Firebase Cloud Messaging) — ini di luar cakupan situs statis GitHub Pages gratis.
- Kalau butuh alarm yang 100% pasti bunyi tanpa syarat apapun, tetap sandingkan dengan Google Tasks/Calendar sebagai cadangan.

## Update aplikasi di kemudian hari
Setiap kali ada revisi file `index.html`, `manifest.json`, atau `sw.js`, tinggal upload ulang
file yang sama ke repo (Add file → Upload files → pilih file → Commit). GitHub Pages otomatis
update dalam 1–2 menit.
