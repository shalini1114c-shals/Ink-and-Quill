
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Twitter } from 'lucide-react';

export const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-black text-gray-900 mb-8 leading-tight">Get in <span className="text-yellow-500">Touch</span></h1>
          <p className="text-gray-500 text-lg mb-12 leading-relaxed">
            Have questions about a bulk order or a specific product? We're here to help you choose the right tools for your creativity.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-yellow-100 text-yellow-600 rounded-2xl">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Call or WhatsApp</h4>
                <p className="text-gray-500">+91 9XXXXXXXXX</p>
                <p className="text-xs text-gray-400 uppercase font-black mt-1">Mon - Sat, 10am - 7pm</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Email Us</h4>
                <p className="text-gray-500">hello@stationarythings.com</p>
                <p className="text-xs text-gray-400 uppercase font-black mt-1">24-hour response time</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="p-4 bg-green-100 text-green-600 rounded-2xl">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Headquarters</h4>
                <p className="text-gray-500">Creative Hub, Sector 45, Gurgaon, Haryana, India</p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h4 className="font-black uppercase tracking-[0.2em] text-xs text-gray-400 mb-6">Socials</h4>
            <div className="flex space-x-6">
              <Instagram className="cursor-pointer hover:text-yellow-500 transition-colors" />
              <Facebook className="cursor-pointer hover:text-yellow-500 transition-colors" />
              <Twitter className="cursor-pointer hover:text-yellow-500 transition-colors" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-xl border border-gray-100">
          {!sent ? (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
              <h3 className="text-2xl font-black mb-8">Send a Message</h3>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Your Name</label>
                <input required type="text" className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                <input required type="email" className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Subject</label>
                <select className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-yellow-400">
                  <option>General Inquiry</option>
                  <option>Bulk Order / Corporate</option>
                  <option>Order Issue</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Message</label>
                <textarea required rows={5} className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-yellow-400"></textarea>
              </div>
              <button type="submit" className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-yellow-500 hover:text-black transition-all shadow-xl flex items-center justify-center space-x-3">
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          ) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-8">
                <Send size={32} className="text-black ml-1" />
              </div>
              <h3 className="text-3xl font-black mb-4">Message Sent!</h3>
              <p className="text-gray-500 mb-8">We've received your inquiry and will reach out to you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="text-yellow-600 font-bold underline">Send another</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
