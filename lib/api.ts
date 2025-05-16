import axios from 'axios';
import { CreateBoxData, ExploreParams } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.3ad.xyz',
  timeout: 10000
});

// Add wallet signature verification for axios requests
api.interceptors.request.use(async (config) => {
  if (config.requiresAuth) {
    const { publicKey, signMessage } = window.solana;
    if (publicKey && signMessage) {
      const message = `3AD Auth ${Date.now()}`;
      const signedMessage = await signMessage(new TextEncoder().encode(message));
      config.headers.Authorization = `Solana ${publicKey.toString()}.${Buffer.from(signedMessage).toString('base64')}`;
    }
  }
  return config;
});

export const boxApi = {
  // Get box details
  getBox: (boxId: string) => api.get(`/boxes/${boxId}`),
  
  // Create box
  createBox: (data: CreateBoxData) => api.post('/boxes', data, { requiresAuth: true }),
  
  // Unlock box
  unlockBox: (boxId: string) => api.post(`/boxes/${boxId}/unlock`, {}, { requiresAuth: true }),
  
  // Get user created boxes
  getUserCreatedBoxes: () => api.get('/user/boxes/created', { requiresAuth: true }),
  
  // Get user unlocked boxes
  getUserUnlockedBoxes: () => api.get('/user/boxes/unlocked', { requiresAuth: true }),
  
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