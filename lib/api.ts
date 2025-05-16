import axios from 'axios';

import {
  CreateBoxData,
  ExploreParams,
} from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.3ad.xyz',
  timeout: 10000
});

// Add wallet signature verification for axios requests
api.interceptors.request.use(async (config) => {
  // 使用类型断言解决类型问题
  const customConfig = config as any;
  if (customConfig.requiresAuth) {
    const solana = window.solana as any;
    if (solana?.publicKey && solana?.signMessage) {
      const message = `3AD Auth ${Date.now()}`;
      const signedMessage = await solana.signMessage(new TextEncoder().encode(message));
      config.headers.Authorization = `Solana ${solana.publicKey.toString()}.${Buffer.from(signedMessage).toString('base64')}`;
    }
  }
  return config;
});

export const boxApi = {
  // Get box details
  getBox: (boxId: string) => api.get(`/boxes/${boxId}`),
  
  // Create box
  createBox: (data: CreateBoxData) => api.post('/boxes', data, { requiresAuth: true } as any),
  
  // Unlock box
  unlockBox: (boxId: string) => api.post(`/boxes/${boxId}/unlock`, {}, { requiresAuth: true } as any),
  
  // Get user created boxes
  getUserCreatedBoxes: () => api.get('/user/boxes/created', { requiresAuth: true } as any),
  
  // Get user unlocked boxes
  getUserUnlockedBoxes: () => api.get('/user/boxes/unlocked', { requiresAuth: true } as any),
  
  // Get explore boxes list
  getExploreBoxes: (params: ExploreParams) => api.get('/boxes', { params })
};

// Contract interactions using SDK
export const contractApi = {
  // Create box on chain
  createBoxOnChain: async (content: Uint8Array): Promise<string> => {
    // TODO: Implement contract call
    return 'transaction signature';
  },
  
  // Open box on chain
  openBoxOnChain: async (boxId: number, creator: string): Promise<string> => {
    // TODO: Implement contract call
    return 'transaction signature';
  }
}; 