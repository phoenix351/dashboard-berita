import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Bird, 
  Download, 
  BookOpen, 
  LogOut,
  Newspaper
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Analisis', icon: <BarChart3 size={20} />, path: '/analisis' },
    { name: 'Twitter', icon: <Bird size={20} />, path: '/twitter' },
    { name: 'Unduh Data', icon: <Download size={20} />, path: '/unduh' },
    { name: 'Panduan', icon: <BookOpen size={20} />, path: '/panduan' },
  ];

  return (
    <div className="w-64 h-screen glass border-r border-white/10 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/40">
          <Newspaper className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Twitta<span className="text-primary-400">Dash</span>
        </h1>
      </div>

      <div className="flex-1 px-4 py-6 flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive 
                ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30' 
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}
            `}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 mb-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 p-[2px]">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ponimin" 
              alt="Avatar" 
              className="w-full h-full rounded-full bg-slate-900"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">Ponimin</p>
            <p className="text-xs text-slate-500 truncate">Administrator</p>
          </div>
        </div>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300">
          <LogOut size={20} />
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
