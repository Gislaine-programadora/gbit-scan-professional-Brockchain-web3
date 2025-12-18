
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icons, generateAddress, generateHash } from '../constants';
import { Block, Transaction } from '../types';

interface DashboardProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ searchQuery, setSearchQuery }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [txs, setTxs] = useState<Transaction[]>([]);

  useEffect(() => {
    const initialBlocks: Block[] = Array.from({ length: 6 }, (_, i) => ({
      number: 15234567 - i,
      hash: generateHash(),
      parentHash: generateHash(),
      timestamp: Date.now() - i * 15000,
      transactions: Array(Math.floor(Math.random() * 50) + 20).fill(''),
      miner: generateAddress(),
      size: '24 KB',
      gasUsed: '1.2M',
      gasLimit: '30M',
      reward: '2.5 GBIT'
    }));

    const initialTxs: Transaction[] = Array.from({ length: 6 }, (_, i) => ({
      hash: generateHash(),
      blockNumber: 15234567 - Math.floor(i/2),
      from: generateAddress(),
      to: generateAddress(),
      value: (Math.random() * 5).toFixed(4) + ' GBIT',
      fee: '0.00042',
      status: 'Success',
      timestamp: Date.now() - i * 5000,
      nonce: i,
      gasPrice: '12 Gwei',
      gasLimit: '21000',
      method: 'Transfer'
    }));

    setBlocks(initialBlocks);
    setTxs(initialTxs);

    const interval = setInterval(() => {
      setBlocks(prev => {
        const nextNum = prev[0].number + 1;
        const newBlock: Block = {
          ...prev[0],
          number: nextNum,
          hash: generateHash(),
          timestamp: Date.now(),
        };
        return [newBlock, ...prev.slice(0, 5)];
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="relative pt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Explore the GBIT Blockchain
            </h1>
            <p className="text-slate-400 text-lg">
              Search for transactions, addresses, blocks, and more
            </p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.length > 50) window.location.hash = `#/tx/${searchQuery}`;
            else if (searchQuery.length > 30) window.location.hash = `#/address/${searchQuery}`;
            else if (!isNaN(Number(searchQuery))) window.location.hash = `#/block/${searchQuery}`;
          }} className="relative group max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Search by Address / Txn Hash / Block / Token" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f172a] border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-2xl"
            />
            <div className="absolute left-4 top-4.5 text-slate-500">
              <Icons.Search />
            </div>
          </form>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Block Height" value="15,234,567" icon={<PulseIcon />} />
        <StatCard label="Transactions (24h)" value="1,234,567" icon={<PulseIcon />} />
        <StatCard label="TPS" value="45.2" icon={<FlashIcon />} />
        <StatCard label="Avg Block Time" value="12.3s" icon={<ClockIcon />} />
        <StatCard label="Active Addresses" value="234,567" icon={<PulseIcon />} />
        <StatCard label="Market Cap" value="$1.2B" icon={<ChartIcon />} />
      </div>

      {/* Tabs / Feeds Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8 border-b border-slate-800/50 mb-8">
          <button className="pb-4 text-[#0ea5e9] border-b-2 border-[#0ea5e9] font-bold text-sm uppercase tracking-wider">Latest Blocks</button>
          <button className="pb-4 text-slate-500 font-bold text-sm uppercase tracking-wider hover:text-slate-300">Latest Transactions</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Latest Blocks Column */}
          <div className="bg-[#0f172a]/40 border border-slate-800/50 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-800/50 flex items-center space-x-2">
              <div className="text-[#0ea5e9]"><Icons.Block /></div>
              <h3 className="font-bold text-white uppercase text-xs tracking-widest">Latest Blocks</h3>
            </div>
            <div className="divide-y divide-slate-800/50">
              {blocks.map((block) => (
                <div key={block.hash} className="px-6 py-5 flex items-center hover:bg-slate-800/20 transition-colors">
                  <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400 mr-4 border border-slate-700/50">
                    <Icons.Block />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/block/${block.number}`} className="text-[#0ea5e9] hover:underline font-bold text-sm block">
                      {block.number}
                    </Link>
                    <p className="text-[10px] text-slate-500 font-medium">12 secs ago</p>
                  </div>
                  <div className="flex-1 text-xs text-slate-400 px-2 truncate">
                    Miner: <span className="text-[#0ea5e9] font-mono">0x742d35Cc...5f4e8b9c</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-300 whitespace-nowrap">234 txns</p>
                    <p className="text-[10px] text-emerald-400 font-bold">{block.reward}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Transactions Column */}
          <div className="bg-[#0f172a]/40 border border-slate-800/50 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-800/50 flex items-center space-x-2">
              <div className="text-[#0ea5e9]"><PulseIcon /></div>
              <h3 className="font-bold text-white uppercase text-xs tracking-widest">Latest Transactions</h3>
            </div>
            <div className="divide-y divide-slate-800/50">
              {txs.map((tx) => (
                <div key={tx.hash} className="px-6 py-5 flex items-center hover:bg-slate-800/20 transition-colors">
                  <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400 mr-4 border border-slate-700/50">
                    <PulseIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/tx/${tx.hash}`} className="text-[#0ea5e9] hover:underline font-bold text-sm block truncate max-w-[140px]">
                      {tx.hash}
                    </Link>
                    <p className="text-[10px] text-slate-500 font-medium">5 secs ago</p>
                  </div>
                  <div className="ml-4 flex flex-col space-y-1">
                    <div className="flex items-center text-[10px]">
                      <span className="text-slate-500 w-8">From</span>
                      <span className="text-[#0ea5e9] font-mono">0x742d35Cc...5f4e8b9c</span>
                    </div>
                    <div className="flex items-center text-[10px]">
                      <span className="text-slate-500 w-8">To</span>
                      <span className="text-[#0ea5e9] font-mono">0x742d35Cc...5f4e8b9c</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-[#0f172a]/60 border border-slate-800/50 rounded-xl p-4 flex flex-col justify-between hover:border-blue-500/30 transition-all group">
    <div className="flex items-center space-x-2 mb-4">
      <div className="text-[#0ea5e9] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-lg font-extrabold text-white tracking-tight">
      {value}
    </div>
  </div>
);

const PulseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const FlashIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

export default Dashboard;
