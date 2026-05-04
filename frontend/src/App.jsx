import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Analysis from './components/Analysis';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analisis" element={<Analysis />} />
          <Route path="twitter" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Halaman Twitter (Segera Datang)</h2></div>} />
          <Route path="unduh" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Halaman Unduh Data (Segera Datang)</h2></div>} />
          <Route path="panduan" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Halaman Panduan (Segera Datang)</h2></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
