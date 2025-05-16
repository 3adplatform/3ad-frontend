import { create } from 'zustand';
import { PublicKey } from '@solana/web3.js';

interface WalletState {
  connected: boolean;
  publicKey: PublicKey | null;
  balance: number;
  isLoading: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshBalance: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  connected: false,
  publicKey: null,
  balance: 0,
  isLoading: false,
  
  connect: async () => {
    set({ isLoading: true });
    try {
      // TODO: Implement wallet connection logic
      set({ connected: true });
      await get().refreshBalance();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  disconnect: () => {
    set({ connected: false, publicKey: null, balance: 0 });
  },
  
  refreshBalance: async () => {
    if (!get().publicKey) return;
    try {
      // TODO: Implement balance fetching logic
      const balance = 0;
      set({ balance });
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  }
})); 