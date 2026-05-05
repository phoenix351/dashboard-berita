# Dashboard Berita - Modern UI & Analytics

Aplikasi Dashboard Berita terintegrasi dengan analisis data menggunakan stack modern (React, Tailwind CSS) dan backend Python Flask.

## 🏗️ Arsitektur Proyek

Proyek ini terbagi menjadi dua bagian utama:
1.  **Backend (`berita-api`)**: Python Flask API untuk pengolahan data dan database.
2.  **Frontend (`dashboard-berita/frontend`)**: Aplikasi React (Vite) untuk visualisasi dashboard.
3.  **Proxy Server (`dashboard-berita`)**: Server Node.js/Express untuk penyatuan rute dan legacy views.

---

## 🚀 Cara Menjalankan Proyek

### 1. Menjalankan Backend (Python Flask)
Backend berada di direktori `../berita-api`.

1.  Buka terminal di folder `berita-api`.
2.  Aktifkan Virtual Environment:
    ```powershell
    .\venv\Scripts\activate
    ```
3.  Instal dependensi (jika belum):
    ```powershell
    pip install -r requirements.txt
    ```
4.  Jalankan server backend:
    ```powershell
    python main.py
    ```
    *Backend berjalan di `http://localhost:5000`.*

### 2. Menjalankan Frontend (React Vite)
Frontend berada di folder `frontend` dalam direktori ini.

1.  Buka terminal di folder `dashboard-berita/frontend`.
2.  Instal dependensi (jika belum):
    ```powershell
    npm install
    ```
3.  Jalankan server development:
    ```powershell
    npm run dev
    ```
    *Frontend berjalan di `http://localhost:5173`.*

### 3. Menjalankan Proxy Server (Opsional)
Untuk menjalankan server Express yang melayani rute gabungan:

1.  Buka terminal di root `dashboard-berita`.
2.  Jalankan:
    ```powershell
    npm start
    ```
    *Server berjalan di `http://localhost:8080`.*

---

## 🛠️ Teknologi yang Digunakan

-   **Frontend**: React.js, Vite, Tailwind CSS, Recharts, Framer Motion.
-   **Backend**: Python, Flask, Flask-Cors, SQLite.
-   **Proxy/Legacy**: Node.js, Express.

---

## 📝 Catatan Pengembangan
-   Pastikan Backend (Port 5000) sudah berjalan agar Frontend dapat mengambil data.
-   Konfigurasi Proxy untuk pengembangan diatur dalam `frontend/vite.config.js`.
