import React from 'react';

const Title = ({ children }: { children: string }) => {
  return <h1 className="text-8xl md:text-9xl text-brown-500 font-josefin">{children}</h1>;
};

export default Title;
