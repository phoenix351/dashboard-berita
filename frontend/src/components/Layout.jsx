import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-50 selection:bg-primary-500/30">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen bg-transparent">
        <div className="fixed inset-0 z-[-1] opacity-30">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full" />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
