import React from 'react';
import { Navbar } from '..';
import './publicLayout.css';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="PublicLayout">
      <Navbar />

      {children}
    </div>
  );
};

export default PublicLayout;
