declare module '@solana/wallet-adapter-base' {
  import { PublicKey } from '@solana/web3.js';

  export interface WalletAdapterProps {
    publicKey: PublicKey | null;
    connected: boolean;
    connecting: boolean;
    disconnect: () => Promise<void>;
    select: () => void;
    wallet: Wallet | null;
  }

  export interface Wallet {
    name: string;
    icon?: string;
    publicKey: PublicKey | null;
    connecting: boolean;
    connected: boolean;
    readyState: WalletReadyState;
    adapter: WalletAdapter;
  }

  export interface WalletAdapter extends WalletAdapterProps {
    name: string;
    url: string;
    icon: string;
    readyState: WalletReadyState;
    connecting: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
  }

  export enum WalletReadyState {
    Installed = 'Installed',
    NotDetected = 'NotDetected',
    Loadable = 'Loadable',
    Unsupported = 'Unsupported'
  }
}

declare module '@solana/wallet-adapter-react' {
  import { FC, ReactNode } from 'react';
  import { Connection, PublicKey, Transaction } from '@solana/web3.js';
  import { WalletAdapter, Wallet } from '@solana/wallet-adapter-base';

  export interface WalletContextState {
    autoConnect: boolean;
    wallets: Wallet[];
    wallet: Wallet | null;
    publicKey: PublicKey | null;
    connecting: boolean;
    connected: boolean;
    disconnecting: boolean;
    select(walletName: string): void;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction(
      transaction: Transaction,
      connection: Connection,
      options?: any
    ): Promise<string>;
  }

  export const WalletProvider: FC<{
    children: ReactNode;
    wallets: Wallet[];
    autoConnect?: boolean;
  }>;

  export function useWallet(): WalletContextState;
}

declare module '@solana/wallet-adapter-react-ui' {
  import { FC } from 'react';
  
  export const WalletModalProvider: FC<{
    children: React.ReactNode;
  }>;
  
  export const WalletMultiButton: FC<{
    className?: string;
  }>;
  
  export function useWalletModal(): {
    visible: boolean;
    setVisible: (open: boolean) => void;
  };
} 