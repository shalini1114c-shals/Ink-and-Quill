
import React from 'react';
import { ShieldCheck, Truck, Lock, FileText } from 'lucide-react';

interface PolicyProps {
  type: 'shipping' | 'privacy' | 'terms';
}

const POLICY_CONTENT = {
  shipping: {
    title: 'Shipping Policy',
    icon: <Truck size={48} />,
    content: `
      <h3 class="text-xl font-bold mb-4">India-Wide Delivery</h3>
      <p class="mb-6 text-gray-600">We offer standard delivery across all major cities and towns in India. Most orders are processed within 24 hours of placement.</p>
      
      <h3 class="text-xl font-bold mb-4">Shipping Times</h3>
      <ul class="list-disc ml-6 mb-6 text-gray-600 space-y-2">
        <li>Metro Cities: 2-3 Business Days</li>
        <li>Other Cities: 3-5 Business Days</li>
        <li>Remote Areas: 5-7 Business Days</li>
      </ul>

      <h3 class="text-xl font-bold mb-4">Charges</h3>
      <p class="mb-6 text-gray-600">Enjoy FREE delivery on all orders above ₹500. For orders below ₹500, a flat shipping fee of ₹50 is applicable.</p>
    `
  },
  privacy: {
    title: 'Privacy Policy',
    icon: <Lock size={48} />,
    content: `
      <h3 class="text-xl font-bold mb-4">Data Protection</h3>
      <p class="mb-6 text-gray-600">At Stationary Things, we take your privacy seriously. Your personal information is encrypted and never shared with third parties without your consent.</p>
      
      <h3 class="text-xl font-bold mb-4">Information We Collect</h3>
      <p class="mb-6 text-gray-600">We collect your name, contact number, and delivery address solely for the purpose of fulfilling your orders and providing customer support.</p>
    `
  },
  terms: {
    title: 'Terms of Service',
    icon: <FileText size={48} />,
    content: `
      <h3 class="text-xl font-bold mb-4">Usage Terms</h3>
      <p class="mb-6 text-gray-600">By using our website, you agree to comply with our purchasing policies. Prices are subject to change without notice.</p>
      
      <h3 class="text-xl font-bold mb-4">Refunds & Returns</h3>
      <p class="mb-6 text-gray-600">As per our policy, returns or exchanges are only accepted if a proper product opening video is provided as proof of damage or wrong item.</p>
    `
  }
};

export const Policy: React.FC<PolicyProps> = ({ type }) => {
  const policy = POLICY_CONTENT[type];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex p-6 bg-yellow-100 text-yellow-600 rounded-3xl mb-6">
          {policy.icon}
        </div>
        <h1 className="text-4xl font-black text-gray-900">{policy.title}</h1>
      </div>
      <div 
        className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 prose prose-yellow max-w-none"
        dangerouslySetInnerHTML={{ __html: policy.content }}
      />
    </div>
  );
};
