# 📋 Panduan Aktivasi Firebase Cloud Sync (Sinkronisasi Antar Device)

Aplikasi **Shima Grows Up** mendukung sinkronisasi data otomatis secara real-time antar laptop, HP, dan tablet menggunakan **Firebase Firestore** (gratis dari Google).

---

## 🚀 Cara 1: Memasang Konfigurasi Langsung dari Menu App (Tanpa Edit Kode)

1. Buka aplikasi **Shima Grows Up** &rarr; Masuk ke tab **Settings**.
2. Gulir ke bagian **🔥 Konfigurasi Firebase Cloud Sync**.
3. Masukkan `API Key`, `Project ID`, `Auth Domain`, `Storage Bucket`, `Messaging Sender ID`, dan `App ID` (atau tempel JSON `firebaseConfig`).
4. Klik **Simpan & Aktifkan Firebase**.
5. Status Cloud Sync akan otomatis berubah menjadi: **☁️ Tersambung — sinkron antar device**.

---

## 🛠️ Cara 2: Mendapatkan Firebase Config Gratis dari Google Console (3 Menit)

Jika Anda belum memiliki project Firebase:

1. **Buka Firebase Console**:
   - Buka [https://console.firebase.google.com/](https://console.firebase.google.com/) dan login dengan akun Google Anda.
2. **Buat Project Baru**:
   - Klik **Add project** (Tambah proyek).
   - Beri nama proyek, misal: `shima-grows-up`.
   - Klik **Continue** (Google Analytics opsional, boleh dimatikan) &rarr; **Create project**.
3. **Aktifkan Database Firestore**:
   - Di menu sebelah kiri, pilih **Build** &rarr; **Firestore Database**.
   - Klik **Create database**.
   - Pada pilihan lokasi, pilih lokasi terdekat (misal: `asia-southeast1` / Singapore).
   - Pilih **Start in test mode** (Mode pengujian) agar dapat dibaca/ditulis &rarr; Klik **Create**.
4. **Aktifkan Anonymous Authentication**:
   - Di menu sebelah kiri, pilih **Build** &rarr; **Authentication**.
   - Klik **Get started** &rarr; Pilih tab **Sign-in method**.
   - Klik **Anonymous** (Anonim) &rarr; Aktifkan toggle **Enable** &rarr; Klik **Save**.
5. **Ambil Konfigurasi Web App**:
   - Klik ikon **Settings ⚙️** (di pojok kiri atas dekat "Project Overview") &rarr; **Project settings**.
   - Di bagian bawah halaman, pada "Your apps", klik ikon Web **`</>`**.
   - Beri nama app: `Shima App` &rarr; Klik **Register app**.
   - Salin objek `firebaseConfig` yang muncul. Tampilannya seperti ini:
     ```javascript
     const firebaseConfig = {
       apiKey: "AIzaSy...",
       authDomain: "shima-grows-up.firebaseapp.com",
       projectId: "shima-grows-up",
       storageBucket: "shima-grows-up.appspot.com",
       messagingSenderId: "123456789...",
       appId: "1:123456789:web:abcdef..."
     };
     ```
6. **Tempel di Aplikasi**:
   - Masukkan nilai-nilai tersebut ke tab **Settings** di aplikasi, atau tempelkan di file `index.html` pada bagian `firebaseConfig`.

---

## 🔒 Aturan Keamanan Firestore (Firestore Security Rules)
Agar database Firestore Anda dapat dibaca & ditulis dengan aman, buka tab **Rules** di Firestore Database console, lalu pastikan ketentuannya seperti berikut:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /kv/{document=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 💡 Catatan Penting
- Apabila Firebase belum dikonfigurasi, aplikasi akan **otomatis menyimpan data di penyimpanan lokal browser (`localStorage`)**, sehingga data Anda tetap aman dan tidak hilang saat halaman direfresh.
