
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icons, generateAddress, generateHash } from '../constants';
import { getAIInsight } from '../geminiService';

const AddressDetail: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const res = await getAIInsight('address', address || '');
      setInsight(res);
      setLoadingInsight(false);
    };
    fetchInsight();
  }, [address]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
                Address 
                <span className="text-slate-400 font-mono text-sm break-all font-normal">{address}</span>
            </h1>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-400 transition-colors"><Icons.Wallet /></button>
            <button className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-400 transition-colors"><Icons.Search /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Card */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="font-bold text-slate-100 mb-6">Overview</h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold mb-1 tracking-wider">GBIT BALANCE</p>
              <p className="text-lg font-bold">1,245.92 GBIT</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold mb-1 tracking-wider">GBIT VALUE</p>
              <p className="text-slate-100">$155,142.12 <span className="text-xs text-slate-500">(@ $124.52/GBIT)</span></p>
            </div>
            <div className="pt-6 border-t border-slate-800">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1 tracking-wider">TOKEN HOLDINGS</p>
              <button className="w-full flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                <span className="text-sm font-medium">$42,501.92</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded">12 Assets</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Analysis Panel */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-6 bg-indigo-500/5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                   <Icons.Sparkles />
                   <h3 className="font-bold">AI Wallet Forensics</h3>
                </div>
                <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">EXPERIMENTAL</span>
            </div>
            <div className="p-6 flex-grow">
               {loadingInsight ? (
                 <div className="space-y-4 animate-pulse">
                   <div className="h-4 bg-slate-800 rounded w-full"></div>
                   <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                   <div className="h-4 bg-slate-800 rounded w-2/3"></div>
                 </div>
               ) : (
                 <div className="prose prose-invert text-sm text-slate-300">
                   <p className="font-medium text-slate-100 mb-2">Automated account assessment based on on-chain behavior:</p>
                   {insight || "No abnormal behavior detected. This address shows patterns consistent with an active retail user."}
                 </div>
               )}
            </div>
            <div className="p-4 bg-slate-950/50 border-t border-slate-800 text-[10px] text-slate-500 text-center">
                Disclaimer: AI insights are for informational purposes only and do not constitute financial advice.
            </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800">
          <h3 className="font-bold">Latest 25 Transactions</h3>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Txn Hash</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Block</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">From</th>
                <th className="px-6 py-4"></th>
                <th className="px-6 py-4">To</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4 text-right">Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[...Array(8)].map((_, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <Link to={`/tx/${generateHash()}`} className="text-blue-400 font-mono text-xs hover:underline">
                        {generateHash().slice(0, 12)}...
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold">Transfer</span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to="/block/18452902" className="text-blue-400 hover:underline">18452902</Link>
                  </td>
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">2 hrs 40 mins ago</td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300 font-mono text-xs">0x721...a12</span>
                  </td>
                  <td className="px-2 py-4">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300 font-mono text-xs">Self</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-200">
                    {(Math.random() * 10).toFixed(4)} GBIT
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 text-xs">
                    0.0004
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddressDetail;
