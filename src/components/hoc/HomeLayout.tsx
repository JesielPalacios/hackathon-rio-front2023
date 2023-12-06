import React from 'react';
import { Navbar } from '..';
import './homeLayout.css';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="homeLayout">
      <Navbar />

      {children}
    </div>
  );
};

export default HomeLayout;
