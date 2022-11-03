import React from 'react';

const BeerComponentSkeleton = () => {
  return (
    <div className="grid grid-cols-[50px_0.5fr_1fr] py-2 border-2 rounded-xl font-poppins shadow-md">
      <div className="flex items-center justify-center">
        <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse" />
      </div>
      <div className="w-[7.5rem] h-[7.5rem] border-4 border-white shadow-lg bg-slate-300 animate-pulse" />
      <div className="flex items-start justify-center flex-col px-2 gap-2">
        <div className="w-36 h-3 rounded-full bg-slate-300 animate-pulse" />
        <div className="w-16 h-3 rounded-full bg-slate-300 animate-pulse" />
        <div className="w-28 h-3 rounded-full bg-slate-300 animate-pulse" />
        <div className="w-24 h-3 rounded-full bg-slate-300 animate-pulse" />
      </div>
    </div>
  );
};

export default BeerComponentSkeleton;
