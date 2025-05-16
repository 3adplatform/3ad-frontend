'use client';

import { FC, ReactNode } from 'react';
import Link from 'next/link';
import WalletButton from '@/components/wallet/WalletButton';
import { WalletConnectionProvider } from '@/components/WalletConnectionProvider';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <WalletConnectionProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/app" className="flex items-center">
                  <span className="text-xl font-bold text-primary">3AD</span>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/app/explore"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    发现
                  </Link>
                  <Link
                    href="/app/create"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    创建
                  </Link>
                  <Link
                    href="/app/my-box"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    我的盲盒
                  </Link>
                  <Link
                    href="/app/help"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    帮助
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <WalletButton />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Mobile Navigation */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="grid grid-cols-4 h-16">
            <Link href="/app/explore" className="flex flex-col items-center justify-center">
              <span className="text-xs">发现</span>
            </Link>
            <Link href="/app/create" className="flex flex-col items-center justify-center">
              <span className="text-xs">创建</span>
            </Link>
            <Link href="/app/my-box" className="flex flex-col items-center justify-center">
              <span className="text-xs">我的</span>
            </Link>
            <Link href="/app/help" className="flex flex-col items-center justify-center">
              <span className="text-xs">帮助</span>
            </Link>
          </div>
        </nav>
      </div>
    </WalletConnectionProvider>
  );
};

export default AppLayout; 