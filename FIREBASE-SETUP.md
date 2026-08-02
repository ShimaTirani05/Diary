# ☁️ Firebase Cloud Sync (`diary-31f69`) - Terkonfigurasi 100%

Kredensial Firebase SDK untuk proyek **`diary-31f69`** Anda telah berhasil dipasang secara langsung ke dalam aplikasi **Shima Grows Up**.

---

## 📋 Konfigurasi Terpasang

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCLBwRc2CIszBEFuK0HnU3kz60s8Er4mDA",
  authDomain: "diary-31f69.firebaseapp.com",
  projectId: "diary-31f69",
  storageBucket: "diary-31f69.firebasestorage.app",
  messagingSenderId: "264534206338",
  appId: "1:264534206338:web:4f28ab55bbb81e073fd19b",
  measurementId: "G-W5C0E0GQ4L"
};
```

---

## ⚡ Langkah Terakhir di Console Firebase (Jika Belum)

Agar data dapat tersimpan & tersinkron secara real-time di Firestore Database Anda:

1. **Buka Console Firebase Firestore**:
   - [https://console.firebase.google.com/u/0/project/diary-31f69/firestore](https://console.firebase.google.com/u/0/project/diary-31f69/firestore)
2. **Aktifkan Firestore Database**:
   - Jika belum dibuat, klik **Create database** &rarr; Pilih lokasi (`asia-southeast1` / Singapore) &rarr; **Start in test mode**.
3. **Aktifkan Anonymous Authentication**:
   - Buka [https://console.firebase.google.com/u/0/project/diary-31f69/authentication/providers](https://console.firebase.google.com/u/0/project/diary-31f69/authentication/providers)
   - Pilih **Anonymous** &rarr; Aktifkan toggle **Enable** &rarr; **Save**.
4. **Cek Aturan Firestore Security Rules**:
   - Di tab **Rules** pada Firestore Database console, atur ke:
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

Selesai! Aplikasi Anda sekarang otomatis tersinkronisasi antar-device secara real-time! 🎉
