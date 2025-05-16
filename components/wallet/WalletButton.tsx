'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export const WalletButton: FC = () => {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  
  if (connected && publicKey) {
    return (
      <div className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg shadow-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <span className="text-sm font-medium">
          {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </span>
      </div>
    );
  }
  
  return (
    <button 
      onClick={() => setVisible(true)}
      className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white font-medium"
    >
      连接钱包
    </button>
  );
};

export default WalletButton; 