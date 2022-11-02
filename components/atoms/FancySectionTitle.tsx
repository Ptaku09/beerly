import React from 'react';

const FancySectionTitle = ({ children }: { children: string }) => {
  return (
    <p className="relative inline-block text-lg mb-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-500">
      <span className="relative text-white text-2xl font-bold">{children}</span>
    </p>
  );
};

export default FancySectionTitle;
