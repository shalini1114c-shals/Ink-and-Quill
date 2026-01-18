
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, MessageSquare, Phone } from 'lucide-react';
import { generateSupportResponse } from '../services/geminiService';

export const Support: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Namaste! How can I help you today with your stationery orders?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await generateSupportResponse(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[700px]">
        {/* Header */}
        <div className="bg-gray-900 p-8 text-white flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-400 text-black rounded-2xl">
              <MessageSquare size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black">24/7 AI Support</h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Usually replies instantly</p>
            </div>
          </div>
          <a href="tel:+919XXXXXXXXX" className="hidden sm:flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/20">
            <Phone size={16} />
            <span>Call Support</span>
          </a>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 bg-gray-50/50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-xl h-fit mt-1 ${msg.role === 'user' ? 'bg-gray-900 text-white' : 'bg-yellow-400 text-yellow-900'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' ? 'bg-white text-gray-800' : 'bg-yellow-100 text-yellow-900'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="bg-white p-4 rounded-2xl flex space-x-1">
                 <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                 <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
               </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-6 border-t bg-white">
          <div className="flex items-center space-x-4">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your query here..." 
              className="flex-1 bg-gray-100 border-none p-4 rounded-2xl focus:ring-2 focus:ring-yellow-400 text-sm font-medium"
            />
            <button 
              type="submit"
              disabled={loading}
              className="p-4 bg-gray-900 text-white rounded-2xl hover:bg-yellow-500 hover:text-black transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              <Send size={24} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
