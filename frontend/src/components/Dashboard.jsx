import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  Target, 
  Globe, 
  Smile, 
  Frown, 
  Meh, 
  Calendar,
  RefreshCw,
  TrendingUp,
  ArrowUpRight,
  MoreVertical,
  Search,
  Filter
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import StatCard from './StatCard';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBerita: 12450,
    beritaBps: 3200,
    totalSumber: 15,
    positif: 5600,
    negatif: 1200,
    netral: 5650
  });

  const [loading, setLoading] = useState(false);

  const sumberData = [
    { name: 'Kompas', value: 450 },
    { name: 'Detik', value: 380 },
    { name: 'Antara', value: 310 },
    { name: 'Republika', value: 240 },
    { name: 'Okezone', value: 190 },
    { name: 'Bisnis', value: 150 },
  ];

  const timelineData = [
    { date: '01 Mei', news: 120, bps: 45 },
    { date: '02 Mei', news: 150, bps: 55 },
    { date: '03 Mei', news: 180, bps: 80 },
    { date: '04 Mei', news: 140, bps: 60 },
    { date: '05 Mei', news: 210, bps: 95 },
    { date: '06 Mei', news: 190, bps: 85 },
    { date: '07 Mei', news: 230, bps: 110 },
  ];

  const recentNews = [
    { id: 1, title: 'BPS Laporkan Pertumbuhan Ekonomi Sulut Kuartal I', source: 'Kompas', time: '2 jam yang lalu', sentiment: 'Positif' },
    { id: 2, title: 'Harga Pangan di Manado Stabil Menjelang Libur', source: 'Detik', time: '4 jam yang lalu', sentiment: 'Netral' },
    { id: 3, title: 'Sektor Pariwisata Sulut Meningkat Tajam', source: 'Antara', time: '6 jam yang lalu', sentiment: 'Positif' },
    { id: 4, title: 'Inflasi Daerah Terkendali dengan Baik', source: 'Bisnis', time: '8 jam yang lalu', sentiment: 'Positif' },
  ];

  const sentimentData = [
    { name: 'Positif', value: stats.positif, color: '#10b981' },
    { name: 'Netral', value: stats.netral, color: '#f59e0b' },
    { name: 'Negatif', value: stats.negatif, color: '#ef4444' },
  ];

  return (
    <div className="flex-1 p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto">
      {/* Top Navbar / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-white tracking-tight"
          >
            Dashboard Utama
          </motion.h2>
          <p className="text-slate-400 mt-1">Selamat datang kembali, berikut adalah ringkasan hari ini.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Cari berita..." 
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 w-64 transition-all"
            />
          </div>
          <button className="p-2 glass rounded-xl border border-white/10 text-slate-300 hover:bg-white/10 transition-all">
            <Filter size={20} />
          </button>
          <div className="h-8 w-[1px] bg-white/10 mx-1" />
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/10 text-sm font-medium text-slate-300 cursor-pointer hover:bg-white/5 transition-all">
            <Calendar size={18} className="text-primary-400" />
            <span>07 Mei 2024</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard title="Total Berita" value={stats.totalBerita} icon={<Newspaper size={24} />} color="blue" />
        <StatCard title="Berita BPS" value={stats.beritaBps} icon={<Target size={24} />} color="indigo" />
        <StatCard title="Sumber Aktif" value={stats.totalSumber} icon={<Globe size={24} />} color="purple" />
        <StatCard title="Positif" value={stats.positif} icon={<Smile size={24} />} color="emerald" />
        <StatCard title="Negatif" value={stats.negatif} icon={<Frown size={24} />} color="rose" />
        <StatCard title="Netral" value={stats.netral} icon={<Meh size={24} />} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Timeline Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-8 glass-card p-6"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-lg font-semibold text-white">Tren Berita Mingguan</h4>
              <p className="text-xs text-slate-500">Perbandingan total berita vs berita terkait indikator BPS</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                <span className="text-xs text-slate-400">Total</span>
              </div>
              <div className="flex items-center gap-1.5 ml-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="text-xs text-slate-400">Indikator BPS</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorNews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="news" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorNews)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="bps" 
                  stroke="#22d3ee" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorBps)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sentiment Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 glass-card p-6"
        >
          <h4 className="text-lg font-semibold text-white mb-2">Analisis Sentimen</h4>
          <p className="text-xs text-slate-500 mb-6">Proporsi sentimen dari seluruh berita</p>
          
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white">100%</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Total</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {sentimentData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-white">
                  {Math.round((item.value / stats.totalBerita) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-lg font-semibold text-white">Produktivitas Sumber</h4>
            <button className="text-xs text-primary-400 font-medium hover:underline">Lihat Semua</button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sumberData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar 
                  dataKey="value" 
                  fill="#8b5cf6" 
                  radius={[0, 4, 4, 0]} 
                  barSize={20}
                >
                  {sumberData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={1 - (index * 0.1)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent News List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-semibold text-white">Berita Terbaru</h4>
            <button className="p-1 hover:bg-white/5 rounded-lg transition-colors">
              <MoreVertical size={18} className="text-slate-400" />
            </button>
          </div>
          <div className="space-y-4">
            {recentNews.map((news) => (
              <div key={news.id} className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer">
                <div className="mt-1 w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                  <Newspaper size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-semibold text-slate-100 truncate group-hover:text-primary-400 transition-colors">{news.title}</h5>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-primary-500">{news.source}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-500">{news.time}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    news.sentiment === 'Positif' ? 'bg-emerald-500/10 text-emerald-400' : 
                    news.sentiment === 'Negatif' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {news.sentiment}
                  </span>
                  <ArrowUpRight size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl border border-white/5 bg-white/5 text-sm font-medium text-slate-300 hover:bg-white/10 transition-all">
            Muat Lebih Banyak
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
