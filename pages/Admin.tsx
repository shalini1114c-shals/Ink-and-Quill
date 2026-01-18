
import React, { useState } from 'react';
import { 
  BarChart3, Package, Users, ShoppingCart, 
  Settings, Search, MoreVertical, CheckCircle, 
  XCircle, Clock, TrendingUp, DollarSign, ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../constants';

const statsData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export const Admin: React.FC = () => {
  const { orders } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products'>('dashboard');

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Control <span className="text-yellow-400">Panel</span></h1>
          <p className="text-gray-500 text-sm font-bold tracking-widest mt-1">SYSTEM VERSION 2.5 • OPERATIONAL</p>
        </div>
        <div className="flex space-x-4 bg-gray-900 p-1.5 rounded-2xl border border-gray-800">
           {(['dashboard', 'orders', 'products'] as const).map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Revenue', value: '₹12.4L', icon: <DollarSign />, trend: '+14%', color: 'border-yellow-400' },
              { label: 'Orders Today', value: '142', icon: <ShoppingCart />, trend: '+8%', color: 'border-blue-400' },
              { label: 'Active Users', value: '2.8k', icon: <Users />, trend: '+22%', color: 'border-purple-400' },
              { label: 'Returns', value: '3', icon: <Clock />, trend: '-2%', color: 'border-red-400' },
            ].map((stat, i) => (
              <div key={i} className={`bg-gray-900 border-l-4 ${stat.color} p-6 rounded-2xl shadow-xl hover:translate-y-[-4px] transition-transform`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-black rounded-lg text-yellow-400">{stat.icon}</div>
                  <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-full">{stat.trend}</span>
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-[2rem] border border-gray-800 h-[400px]">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold">Sales Overview</h3>
                  <button className="text-xs font-bold text-gray-500 uppercase flex items-center">Download CSV <ArrowUpRight size={14} className="ml-1"/></button>
               </div>
               <ResponsiveContainer width="100%" height="80%">
                 <BarChart data={statsData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                   <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                     itemStyle={{ color: '#FACC15' }}
                   />
                   <Bar dataKey="sales" fill="#FACC15" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="bg-gray-900 p-8 rounded-[2rem] border border-gray-800 h-[400px]">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold">Live Traffic</h3>
                  <div className="flex space-x-2">
                     <span className="w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
                     <span className="text-xs font-bold text-green-500 uppercase">Live</span>
                  </div>
               </div>
               <ResponsiveContainer width="100%" height="80%">
                 <LineChart data={statsData}>
                   <Line type="monotone" dataKey="sales" stroke="#FACC15" strokeWidth={4} dot={{ fill: '#FACC15', r: 4 }} />
                   <XAxis dataKey="name" hide />
                   <YAxis hide />
                   <Tooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                   />
                 </LineChart>
               </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-gray-900 rounded-[2rem] border border-gray-800 overflow-hidden animate-fade-in">
          <div className="p-8 border-b border-gray-800 flex justify-between items-center">
             <h3 className="text-xl font-bold">Recent Orders</h3>
             <div className="flex space-x-2">
                <div className="relative">
                   <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
                   <input 
                     type="text" 
                     placeholder="Search Order ID..." 
                     className="bg-black border-gray-800 rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-yellow-400"
                   />
                </div>
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/50 text-gray-400 uppercase text-[10px] font-bold tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-6">Order ID</th>
                  <th className="px-8 py-6">Customer</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Amount</th>
                  <th className="px-8 py-6">Date</th>
                  <th className="px-8 py-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {orders.length > 0 ? orders.map(order => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6 font-mono text-yellow-400">#{order.id}</td>
                    <td className="px-8 py-6">
                      <p className="font-bold">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.contactNumber}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        order.status === 'Delivered' ? 'bg-green-400/10 text-green-400' :
                        order.status === 'Cancelled' ? 'bg-red-400/10 text-red-400' :
                        'bg-yellow-400/10 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-bold">₹{order.total}</td>
                    <td className="px-8 py-6 text-gray-400">{order.date}</td>
                    <td className="px-8 py-6 text-right">
                       <button className="p-2 hover:bg-white/10 rounded-lg"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center text-gray-500">No orders found in database.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="animate-fade-in">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black">Live Inventory</h3>
              <button className="bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-yellow-300 transition-all">+ Add Product</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {PRODUCTS.map(p => (
               <div key={p.id} className="bg-gray-900 rounded-3xl p-6 border border-gray-800 flex items-center space-x-4">
                  <img src={p.image} className="w-20 h-20 rounded-2xl object-cover" alt={p.name} />
                  <div className="flex-1 min-w-0">
                     <h4 className="font-bold text-sm truncate">{p.name}</h4>
                     <p className="text-xs text-gray-500 mb-2">{p.brand} • {p.category}</p>
                     <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-yellow-400">₹{p.price}</span>
                        <span className={`text-[10px] font-bold uppercase ${p.stock < 100 ? 'text-red-400' : 'text-green-400'}`}>Stock: {p.stock}</span>
                     </div>
                  </div>
               </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
};
