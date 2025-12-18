
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icons, generateAddress, generateHash } from '../constants';

const BlockDetail: React.FC = () => {
  const { number } = useParams<{ number: string }>();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center space-x-2 text-slate-400 text-sm">
        <Link to="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <span className="text-slate-100">Block Detail</span>
      </div>

      <h1 className="text-2xl font-bold">Block <span className="text-slate-400">#{number}</span></h1>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <span className="text-sm font-medium text-slate-400">Block Height</span>
            <div className="md:col-span-3 flex items-center space-x-2">
              <span className="text-slate-100 font-bold">{number}</span>
              <button className="text-slate-500 hover:text-white"><Icons.Sparkles /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <span className="text-sm font-medium text-slate-400">Timestamp</span>
            <span className="md:col-span-3 text-sm text-slate-200">12 mins ago (Jan-28-2025 10:24:00 AM +UTC)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <span className="text-sm font-medium text-slate-400">Transactions</span>
            <span className="md:col-span-3 text-sm text-blue-400 hover:underline cursor-pointer">42 transactions in this block</span>
          </div>

          <div className="border-t border-slate-800 pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <span className="text-sm font-medium text-slate-400">Fee Recipient</span>
                <Link to={`/address/${generateAddress()}`} className="md:col-span-3 text-sm text-blue-400 font-mono break-all">{generateAddress()}</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <span className="text-sm font-medium text-slate-400">Block Reward</span>
                <span className="md:col-span-3 text-sm text-slate-100">2.1481239 GBIT</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <span className="text-sm font-medium text-slate-400">Size</span>
                <span className="md:col-span-3 text-sm text-slate-100">24,512 bytes</span>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <span className="text-sm font-medium text-slate-400">Hash</span>
                <span className="md:col-span-3 text-xs text-slate-100 font-mono break-all">{generateHash()}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <span className="text-sm font-medium text-slate-400">Parent Hash</span>
                <span className="md:col-span-3 text-xs text-blue-400 font-mono break-all">{generateHash()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockDetail;
