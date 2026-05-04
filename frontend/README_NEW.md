# Modern News Dashboard Frontend

Aplikasi frontend baru yang dibangun menggunakan **React JS**, **Tailwind CSS**, dan **Vite**.

## ✨ Fitur Utama
- **Premium UI/UX**: Desain modern dengan efek *glassmorphism* dan mode gelap premium.
- **Responsive Layout**: Sidebar navigasi yang fleksibel untuk perangkat desktop dan tablet.
- **Interactive Charts**: Visualisasi data real-time menggunakan `recharts`.
- **Framer Motion**: Animasi halus untuk transisi antar halaman dan elemen UI.
- **Lucide Icons**: Set ikon modern dan konsisten.

## 🚀 Cara Menjalankan

### 1. Instalasi Dependensi
Jalankan perintah berikut di root folder atau folder `frontend`:
```bash
npm run frontend-install
```

### 2. Mode Pengembangan (Development)
Jalankan perintah berikut untuk memulai server development:
```bash
npm run frontend-dev
```
Aplikasi akan berjalan di `http://localhost:5173`.

### 3. Build untuk Produksi
Jika Anda ingin mem-build aplikasi untuk dideploy melalui Express server:
```bash
npm run frontend-build
```

## 🛠️ Struktur Teknologi
- **Framework**: React 18+
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Charts**: Recharts
- **Icons**: Lucide-React
- **Animations**: Framer Motion
- **HTTP Client**: Axios

## 📂 Struktur Folder
- `src/components`: Berisi komponen UI seperti Sidebar, StatCard, Layout, dll.
- `src/App.jsx`: Konfigurasi routing utama.
- `src/index.css`: Definisi Tailwind dan gaya global.
