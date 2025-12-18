
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icons, generateAddress, generateHash } from '../constants';
import { getAIInsight } from '../geminiService';

const TransactionDetail: React.FC = () => {
  const { hash } = useParams<{ hash: string }>();
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const res = await getAIInsight('transaction', hash || '');
      setInsight(res || 'No analysis available.');
      setLoadingInsight(false);
    };
    fetchInsight();
  }, [hash]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center space-x-2 text-slate-400 text-sm">
        <Link to="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <span className="text-slate-100">Transaction Details</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Transaction Details</h1>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm border border-slate-700">Share</button>
          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20">Explorer v2</button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 space-y-6">
          <DetailRow label="Transaction Hash" value={hash} isHash />
          <DetailRow label="Status" value="Success" isStatus />
          <DetailRow label="Block" value="18452902" isLink={`/block/18452902`} />
          <DetailRow label="Timestamp" value="12 mins ago (Jan-28-2025 10:24:00 AM +UTC)" />
          
          <div className="border-t border-slate-800 pt-6">
            <DetailRow label="From" value={generateAddress()} isLink={`/address/${generateAddress()}`} isHash />
            <DetailRow label="To" value={generateAddress()} isLink={`/address/${generateAddress()}`} isHash />
          </div>

          <div className="border-t border-slate-800 pt-6">
            <DetailRow label="Value" value="1.42 GBIT ($176.82)" />
            <DetailRow label="Transaction Fee" value="0.000421 GBIT ($0.05)" />
            <DetailRow label="Gas Price" value="12 Gwei" />
          </div>
        </div>
      </div>

      {/* AI Insight Panel */}
      <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-indigo-500/5 shadow-inner">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
            <Icons.Sparkles />
          </div>
          <h3 className="font-bold text-lg text-indigo-100">GBIT AI Security Insight</h3>
        </div>
        
        {loadingInsight ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-slate-800 rounded w-3/4"></div>
            <div className="h-4 bg-slate-800 rounded w-1/2"></div>
            <div className="h-4 bg-slate-800 rounded w-2/3"></div>
          </div>
        ) : (
          <div className="text-slate-300 text-sm leading-relaxed prose prose-invert">
            {insight}
          </div>
        )}
        
        <div className="mt-6 flex items-center space-x-2 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
          <span>Powered by Gemini 3 Flash</span>
          <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
          <span>Safety Audit: Passed</span>
        </div>
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: any; isHash?: boolean; isStatus?: boolean; isLink?: string }> = ({ label, value, isHash, isStatus, isLink }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-center">
    <div className="text-sm font-medium text-slate-400 flex items-center">
      {label}
      <div className="ml-2 text-slate-600 cursor-help"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg></div>
    </div>
    <div className="md:col-span-3">
      {isStatus ? (
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">
          ✓ {value}
        </span>
      ) : isLink ? (
        <Link to={isLink} className="text-blue-400 hover:text-blue-300 font-mono text-sm break-all">{value}</Link>
      ) : (
        <span className={`text-slate-200 text-sm break-all ${isHash ? 'font-mono' : ''}`}>{value}</span>
      )}
    </div>
  </div>
);

export default TransactionDetail;
