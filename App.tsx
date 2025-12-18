
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Icons } from './constants';
import Dashboard from './pages/Dashboard';
import TransactionDetail from './pages/TransactionDetail';
import BlockDetail from './pages/BlockDetail';
import AddressDetail from './pages/AddressDetail';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans bg-[#020617] text-slate-200">
        {/* Navigation */}
        <nav className="z-50 border-b border-slate-800/50 px-4 py-4 bg-[#020617]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#0ea5e9] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                  <path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.43c-.16.09-.33.14-.5.14s-.34-.05-.5-.14l-7.97-4.43c-.32-.17-.53-.5-.53-.88V7.5c0-.38.21-.71.53-.88l7.97-4.43c.16-.09.33-.14.5-.14s.34.05.5.14l7.97 4.43c.32.17.53.5.53.88v9zM12 4.14L5.21 7.91 12 11.68l6.79-3.77L12 4.14zM4.5 17.14l6.75 3.75V13.2l-6.75-3.75v7.69zm15 0v-7.69l-6.75 3.75v7.69l6.75-3.75z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-tight">
                  GBIT-Scan
                </span>
                <span className="text-[10px] text-[#0ea5e9] font-medium tracking-wide uppercase">
                  Blockchain Explorer
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
              <Link to="/" className="text-[#0ea5e9] hover:text-white transition-colors">Home</Link>
              <a href="#" className="hover:text-white transition-colors">Blockchain</a>
              <a href="#" className="hover:text-white transition-colors">Tokens</a>
              <a href="#" className="hover:text-white transition-colors">Resources</a>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/tx/:hash" element={<TransactionDetail />} />
            <Route path="/block/:number" element={<BlockDetail />} />
            <Route path="/address/:address" element={<AddressDetail />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-[#020617] border-t border-slate-800/50 py-12 px-4 mt-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                   <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <span className="font-bold text-lg text-white">GBIT Scan</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm">
                The leading professional explorer for the GBIT ecosystem. Real-time data, deep analytics, and AI-powered forensics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200">Company</h4>
              <ul className="text-sm text-slate-500 space-y-2">
                <li><a href="#" className="hover:text-[#0ea5e9]">About Us</a></li>
                <li><a href="#" className="hover:text-[#0ea5e9]">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200">Support</h4>
              <ul className="text-sm text-slate-500 space-y-2">
                <li><a href="#" className="hover:text-[#0ea5e9]">API Docs</a></li>
                <li><a href="#" className="hover:text-[#0ea5e9]">Knowledge Base</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
