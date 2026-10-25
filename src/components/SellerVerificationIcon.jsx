import React from 'react';
import { CheckCircle2, Star, Shield } from 'lucide-react';

export default function SellerVerificationIcon({ badge = 'new', showLabel = false, size = 15 }) {
  if (badge === 'trusted') {
    return (
      <span 
        className="inline-flex items-center gap-1 text-amber-500 font-semibold"
        title="Trusted Seller: 100% Verified Profile with Business Credentials"
      >
        <span className="w-4 h-4 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shadow-xs">
          <Star size={size - 2} className="fill-amber-400 text-amber-500" />
        </span>
        {showLabel && <span className="text-[11px] text-amber-600 font-bold">Trusted Seller</span>}
      </span>
    );
  }

  if (badge === 'verified') {
    return (
      <span 
        className="inline-flex items-center gap-1 text-blue-600 font-semibold"
        title="Verified Seller: Photo, Name, Phone & Location Verified"
      >
        <span className="w-4 h-4 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
          <CheckCircle2 size={size} className="fill-blue-500 text-white" />
        </span>
        {showLabel && <span className="text-[11px] text-blue-600 font-bold">Verified Seller</span>}
      </span>
    );
  }

  // Default: New Seller
  return (
    <span 
      className="inline-flex items-center gap-1 text-slate-400"
      title="New Seller: Incomplete Profile"
    >
      <span className="w-4 h-4 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
        <Shield size={size - 3} />
      </span>
      {showLabel && <span className="text-[11px] text-slate-500 font-medium">New Seller</span>}
    </span>
  );
}
