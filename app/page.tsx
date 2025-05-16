'use client';

import { FC } from 'react';
import Link from 'next/link';

const HomePage: FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to 3AD</h1>
      <p className="text-xl text-gray-600 mb-8">
        The On-chain Interactive Ads Protocol
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Create Box</h2>
          <p className="text-gray-600 mb-6">
            Create your own mystery box with content and set a price.
          </p>
          <Link
            href="/create"
            className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90"
          >
            Create Now
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Open Box</h2>
          <p className="text-gray-600 mb-6">
            Discover and open mystery boxes from other creators.
          </p>
          <button
            disabled
            className="inline-block bg-gray-400 text-white px-6 py-3 rounded-md cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 