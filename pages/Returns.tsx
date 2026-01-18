
import React, { useState } from 'react';
import { RefreshCw, Camera, AlertCircle, CheckCircle2 } from 'lucide-react';
import { POLICY_NOTE } from '../constants';

export const Returns: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-4xl font-black mb-4">Request Submitted</h2>
        <p className="text-gray-500 mb-8">Our team will review your opening video and get back to you within 24-48 hours via email/SMS.</p>
        <button onClick={() => setSubmitted(false)} className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold">Submit Another</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex p-6 bg-blue-100 text-blue-600 rounded-3xl mb-6">
          <RefreshCw size={48} />
        </div>
        <h1 className="text-4xl font-black text-gray-900">Returns & Exchanges</h1>
        <p className="text-gray-500 mt-4">We ensure a fair return process for all our customers.</p>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-3xl mb-12 flex items-start space-x-4">
        <div className="bg-yellow-400 p-2 rounded-xl mt-1 flex-shrink-0">
          <AlertCircle size={20} className="text-yellow-900" />
        </div>
        <div>
          <h4 className="font-black text-yellow-900 uppercase text-sm tracking-widest">Mandatory Policy Note</h4>
          <p className="text-yellow-800 font-medium mt-1 italic">"{POLICY_NOTE}"</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Order ID</label>
            <input required type="text" placeholder="e.g. ORD12345" className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-yellow-400" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Request Type</label>
            <select className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-yellow-400">
              <option>Exchange Item</option>
              <option>Refund Request</option>
              <option>Missing Item</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-gray-400">Reason for Request</label>
          <textarea required rows={4} placeholder="Describe the issue in detail..." className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-yellow-400"></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-gray-400">Upload Opening Video Proof</label>
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-yellow-400 transition-colors group">
            <Camera className="mx-auto text-gray-300 group-hover:text-yellow-400 mb-4" size={40} />
            <p className="text-sm font-bold text-gray-500">Click to upload or drag & drop video</p>
            <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase">MP4, MOV up to 50MB</p>
          </div>
        </div>

        <button type="submit" className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-yellow-400 hover:text-black transition-all shadow-xl shadow-gray-200">
          Submit Return Request
        </button>
      </form>
    </div>
  );
};
