export interface BoxSummary {
  id: string;
  title: string;
  description: string;
  creator: string;
  creatorName?: string;
  thumbnailUrl?: string;
  createdAt: Date;
  unlockCount: number;
  rewardType?: 'none' | 'sol' | 'spl' | 'nft';
  rewardAmount?: number;
}

export interface CreateBoxData {
  title: string;
  description: string;
  content: string;
  rewardType: 'none' | 'sol' | 'spl' | 'nft';
  rewardAmount?: number;
  unlockMethod: 'free' | 'pay' | 'follow' | 'refer';
  commissionRate: number;
  transactionSignature?: string;
}

export interface ExploreParams {
  filter?: 'hot' | 'new' | 'trending';
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// 避免修改全局接口来防止冲突
export interface SolanaWallet {
  publicKey: { toString: () => string };
  signMessage: (message: Uint8Array) => Promise<Uint8Array>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
} 