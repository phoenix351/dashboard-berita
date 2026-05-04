import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart as PieChartIcon, Search, Filter, Download } from 'lucide-react';

const Analysis = () => {
  return (
    <div className="flex-1 p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Analisis Mendalam</h2>
          <p className="text-slate-400 mt-1">Lakukan pemfilteran dan analisis data lebih spesifik.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/5 transition-all">
            <Download size={18} />
            <span>Ekspor Laporan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-6">Filter Data</h4>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 font-medium mb-1.5 block">Kategori Indikator</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                  <option>Semua Kategori</option>
                  <option>Ekspor-Impor</option>
                  <option>Pendidikan</option>
                  <option>Kesehatan</option>
                  <option>Inflasi</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-medium mb-1.5 block">Rentang Waktu</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                  <option>7 Hari Terakhir</option>
                  <option>30 Hari Terakhir</option>
                  <option>Bulan Ini</option>
                  <option>Tahun Ini</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-medium mb-1.5 block">Sumber Berita</label>
                <div className="space-y-2 mt-2">
                  {['Kompas', 'Detik', 'Antara', 'Republika'].map(source => (
                    <label key={source} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary-600 focus:ring-primary-500/50" />
                      <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{source}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full mt-4 bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary-600/20 transition-all">
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-400 mb-4">
                <BarChart3 size={32} />
              </div>
              <h5 className="text-white font-semibold">Visualisasi Lanjutan</h5>
              <p className="text-sm text-slate-500 mt-2 max-w-[200px]">Pilih kategori untuk melihat grafik perbandingan indikator.</p>
            </div>

            <div className="glass-card p-6 min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-4">
                <PieChartIcon size={32} />
              </div>
              <h5 className="text-white font-semibold">Distribusi Topik</h5>
              <p className="text-sm text-slate-500 mt-2 max-w-[200px]">Analisis kata kunci paling sering muncul dalam periode tertentu.</p>
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h4 className="text-lg font-semibold text-white">Tabel Data Mentah</h4>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input type="text" placeholder="Filter baris..." className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white focus:outline-none" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/2">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">No</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Judul Berita</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Sumber</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Sentimen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-400">{i}</td>
                      <td className="px-6 py-4 text-sm text-slate-200 font-medium">Contoh Judul Berita Analisis #{i}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">Kompas</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase">Positif</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
