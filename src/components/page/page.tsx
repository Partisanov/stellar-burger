import React, { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export const Page: React.FC<MainProps> = ({ children }) => (
  <main className='main mb-10'>
    <section>
      <div className='container'>{children}</div>
    </section>
  </main>
);
