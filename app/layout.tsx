'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import WalletConnectionProvider from '@/components/WalletConnectionProvider';
import Navbar from '@/components/Navbar';
import ToastContainer from '@/components/ui/ToastContainer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletConnectionProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <ToastContainer />
        </WalletConnectionProvider>
      </body>
    </html>
  );
} 