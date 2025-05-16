'use client';

import { FC } from 'react';
import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const Navbar: FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-primary">
                3AD
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/create"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Create Box
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <WalletMultiButton className="!bg-primary hover:!bg-primary/90" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 