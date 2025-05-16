'use client';

import './globals.css';

import { Inter } from 'next/font/google';

import Navbar from '@/components/Navbar';
import ToastContainer from '@/components/ui/ToastContainer';
import WalletConnectionProvider from '@/components/WalletConnectionProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>3AD - 链上交互式广告协议</title>
        <meta name="description" content="The On-chain Interactive Ads Protocol" />
      </head>
      <body className={`${inter.className} min-h-full bg-gray-50`}>
        <WalletConnectionProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <footer className="bg-white shadow-inner py-4 mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} 3AD Protocol. All rights reserved.
              </div>
            </footer>
          </div>
          <ToastContainer />
        </WalletConnectionProvider>
      </body>
    </html>
  );
} 