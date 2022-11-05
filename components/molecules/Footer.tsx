import React from 'react';

const Footer = () => {
  return (
    <div className="w-screen h-16 pb-4 absolute bottom-0 left-0 rounded-t-[70%50px] shadow-[0_-8px_6px_-4px_rgba(0,0,0,0.1)] font-poppins">
      <div className="h-full flex items-end justify-center w-full text-sm text-brown-500 font-bold">
        <p>
          <span className="after:content-['❤'] after:font-sans after:mx-1">Created with</span>
          by{' '}
          <a className="text-blue-500" href="https://github.com/Ptaku09" target="_blank" rel="noreferrer">
            Ptaku09
          </a>{' '}
          ©2022
        </p>
      </div>
    </div>
  );
};

export default Footer;
