# 🐛 Bug & Issue Report - Dashboard Berita

Berdasarkan analisis mendalam terhadap codebase **Dashboard Berita** (Python Backend & JS Frontend), berikut adalah temuan kritis terkait performa, keamanan, dan stabilitas sistem.

---

## Issue [1]: Data Dashboard Palsu (Hardcoded Totals)

📍 **Lokasi:** `berita-api/api/analisis_berita.py` L-187 s/d L-203

❗ **Deskripsi:** Fungsi `gettotal()` yang seharusnya menghitung jumlah berita dari database justru mengembalikan nilai statis (hardcoded).

💥 **Dampak:** Data yang ditampilkan di dashboard ("Total Berita", "Total Sumber", dll) tidak akurat dan tidak pernah berubah meskipun ada data baru masuk.

🔍 **Analisis Teknis:** Developer meninggalkan placeholder objek dan menutup koneksi database tanpa mengeksekusi query yang valid.

🛠️ **Solusi Rekomendasi:**
```python
def gettotal():
    db = db_()
    query = """
    select 
        (select count(*) from berita_detail) as totalberita,
        (select count(distinct id_berita) from ner_output) as totalberita_bps,
        (select count(distinct sumber) from berita_detail) as totalsumber
    """
    db.kursor.execute(query)
    baris = db.kursor.fetchone()
    objek = {
        'totalberita': baris[0],
        'totalberita_bps': baris[1],
        'totalsumber': baris[2]
    }
    db.tutup()
    return objek
```

---

## Issue [2]: Potensi Crash Akibat "Cartesian Product" Query

📍 **Lokasi:** `berita-api/api/analisis_berita.py` L-190

❗ **Deskripsi:** Query SQL di `gettotal` menggunakan implicit join tanpa klausa `WHERE` atau `JOIN ON` antara `berita_detail` dan `ner_output`.

💥 **Dampak:** Jika database memiliki banyak baris, query ini akan mencoba memproses perkalian jumlah baris (misal 100k * 10k = 1 Miliar), yang akan menyebabkan database *hang*.

🔍 **Analisis Teknis:** `from berita_detail b, ner_output n` tanpa kondisi join menghasilkan CROSS JOIN.

🛠️ **Solusi Rekomendasi:** Gunakan subquery terpisah atau join yang eksplisit.

---

## Issue [3]: Kerentanan Keamanan (Hardcoded Credentials & No Auth)

📍 **Lokasi:** `berita-api/Database_connection.py` & `api/main.py`

❗ **Deskripsi:** Kredensial database (host, user, password) ditulis langsung di kode sumber. Seluruh endpoint API terbuka untuk publik tanpa autentikasi.

💥 **Dampak:** Kebocoran akses database utama dan manipulasi data oleh pihak luar.

🔍 **Analisis Teknis:** Kurangnya penggunaan `.env` untuk konfigurasi dan absennya middleware autentikasi.

🛠️ **Solusi Rekomendasi:**
1. Gunakan `python-dotenv`.
2. Implementasikan API Key check.

---

## Issue [4]: Frontend Crash (Null/Undefined Safety)

📍 **Lokasi:** `dashboard-berita/js/myLib.js` (Fungsi `set_line`, `set_score_board`)

❗ **Deskripsi:** Kode JavaScript langsung memproses `result` dari API tanpa melakukan validasi apakah data tersebut ada.

💥 **Dampak:** Jika API mengembalikan error, frontend akan "freeze" atau crash (Error: `Cannot read property 'filter' of undefined`).

🔍 **Analisis Teknis:** Penggunaan method berantai tanpa pengecekan null-safety.

🛠️ **Solusi Rekomendasi:** Gunakan validasi eksplisit atau Optional Chaining.

---

## Issue [5]: Logic Error - KeyError pada Backend

📍 **Lokasi:** `berita-api/api/main.py` L-169 & L-302

❗ **Deskripsi:** Pengambilan parameter dari `flask.request.args` dilakukan secara langsung tanpa pengecekan.

💥 **Dampak:** API akan melempar Internal Server Error (HTTP 500) jika parameter tidak dikirim.

🔍 **Analisis Teknis:** `args_['ind']` akan melempar `KeyError`. Seharusnya menggunakan `args_.get('ind')`.

🛠️ **Solusi Rekomendasi:** Gunakan `.get()` dan berikan error message yang jelas.

---

## 🛠️ Rekomendasi Migrasi Library (Tech Debt)

| Library | Versi Saat Ini | Saran Migrasi | Alasan |
| :--- | :--- | :--- | :--- |
| **Flask** | 1.0.2 | **3.0.x** | Keamanan dan performa. |
| **Moment.js** | 2.24.0 | **Day.js** | Lebih ringan dan modern. |
| **Chart.js** | v2 | **v4.x** | Fitur baru dan performa. |
