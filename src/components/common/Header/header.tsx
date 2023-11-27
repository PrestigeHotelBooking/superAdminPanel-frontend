import React, { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  className?: string; // Optional className prop
}

const H1: React.FC<HeadingProps> = ({ children, className }) => {
  return <h1 className={`font-bold text-4rem ${className}`}>{children}</h1>;
};

const H2: React.FC<HeadingProps> = ({ children, className }) => {
  return <h2 className={`font-bold text-3rem ${className}`}>{children}</h2>;
};

const H3: React.FC<HeadingProps> = ({ children, className }) => {
  return <h3 className={`font-bold text-2.5rem ${className}`}>{children}</h3>;
};

const H4: React.FC<HeadingProps> = ({ children, className }) => {
  return <h4 className={`font-bold text-2rem ${className}`}>{children}</h4>;
};

const H5: React.FC<HeadingProps> = ({ children, className }) => {
  return <h5 className={`font-bold text-1.5rem ${className}`}>{children}</h5>;
};

const H6: React.FC<HeadingProps> = ({ children, className }) => {
  return <h6 className={`font-bold text-1rem ${className}`}>{children}</h6>;
};

export { H1, H2, H3, H4, H5, H6 };
