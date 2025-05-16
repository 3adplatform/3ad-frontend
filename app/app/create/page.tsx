'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { boxApi, contractApi } from '@/lib/api';
import { CreateBoxData } from '@/lib/types';

const CreatePage: FC = () => {
  const router = useRouter();
  const { connected } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateBoxData>({
    title: '',
    description: '',
    content: '',
    rewardType: 'none',
    unlockMethod: 'free',
    commissionRate: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) {
      alert('请先连接钱包');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload content to chain
      const contentBytes = new TextEncoder().encode(formData.content);
      const txSignature = await contractApi.createBoxOnChain(contentBytes);

      // 2. Create box in backend
      const response = await boxApi.createBox({
        ...formData,
        transactionSignature: txSignature
      });

      // 3. Redirect to the share page
      router.push(`/app/share/poster/${response.data.id}`);
    } catch (error) {
      console.error('创建盲盒失败:', error);
      alert('创建失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">创建新盲盒</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            标题
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            简介
          </label>
          <textarea
            id="description"
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            内容
          </label>
          <textarea
            id="content"
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="unlockMethod" className="block text-sm font-medium text-gray-700">
            解锁方式
          </label>
          <select
            id="unlockMethod"
            value={formData.unlockMethod}
            onChange={(e) => setFormData({ ...formData, unlockMethod: e.target.value as any })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="free">免费</option>
            <option value="pay">付费</option>
            <option value="follow">关注</option>
            <option value="refer">推荐</option>
          </select>
        </div>

        <div>
          <label htmlFor="rewardType" className="block text-sm font-medium text-gray-700">
            奖励类型
          </label>
          <select
            id="rewardType"
            value={formData.rewardType}
            onChange={(e) => setFormData({ ...formData, rewardType: e.target.value as any })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="none">无奖励</option>
            <option value="sol">SOL</option>
            <option value="spl">SPL Token</option>
            <option value="nft">NFT</option>
          </select>
        </div>

        {formData.rewardType !== 'none' && (
          <div>
            <label htmlFor="rewardAmount" className="block text-sm font-medium text-gray-700">
              奖励数量
            </label>
            <input
              type="number"
              id="rewardAmount"
              value={formData.rewardAmount || ''}
              onChange={(e) => setFormData({ ...formData, rewardAmount: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              min="0"
              step="0.01"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700">
            返佣比例 (%)
          </label>
          <input
            type="number"
            id="commissionRate"
            value={formData.commissionRate}
            onChange={(e) => setFormData({ ...formData, commissionRate: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            min="0"
            max="100"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !connected}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '创建中...' : '创建盲盒'}
        </button>
      </form>
    </div>
  );
};

export default CreatePage; 