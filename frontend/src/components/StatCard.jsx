import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color }) => {
  const colorMap = {
    blue: 'bg-blue-500/20 text-blue-400 shadow-blue-500/10',
    indigo: 'bg-indigo-500/20 text-indigo-400 shadow-indigo-500/10',
    purple: 'bg-purple-500/20 text-purple-400 shadow-purple-500/10',
    emerald: 'bg-emerald-500/20 text-emerald-400 shadow-emerald-500/10',
    rose: 'bg-rose-500/20 text-rose-400 shadow-rose-500/10',
    amber: 'bg-amber-500/20 text-amber-400 shadow-amber-500/10',
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass-card p-6 flex flex-col gap-4"
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${selectedColor.split(' ')[0]} ${selectedColor.split(' ')[1]}`}>
          {icon}
        </div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md">Live</div>
      </div>
      <div>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1">
          {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
        </h3>
      </div>
      <div className="flex items-center gap-2 text-[10px] font-bold">
        <span className="text-emerald-400 flex items-center">↑ 12.5%</span>
        <span className="text-slate-600 uppercase">vs bulan lalu</span>
      </div>
    </motion.div>
  );
};

export default StatCard;
