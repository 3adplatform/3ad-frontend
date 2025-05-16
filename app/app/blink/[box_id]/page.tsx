'use client';

import {
  FC,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import {
  boxApi,
  contractApi,
} from '@/lib/api';
import { BoxSummary } from '@/lib/types';
import { useWallet } from '@solana/wallet-adapter-react';

interface BlinkPageProps {
  params: {
    box_id: string;
  };
}

const BlinkPage: FC<BlinkPageProps> = ({ params }) => {
  const router = useRouter();
  const { box_id } = params;
  const { connected } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [boxData, setBoxData] = useState<BoxSummary | null>(null);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    loadBoxData();
  }, [box_id]);

  const loadBoxData = async () => {
    try {
      const response = await boxApi.getBox(box_id);
      setBoxData(response.data);
    } catch (error) {
      console.error('加载盲盒数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = async () => {
    if (!connected) {
      alert('请先连接钱包');
      return;
    }

    setIsUnlocking(true);
    try {
      // 1. Call contract to unlock
      const txSignature = await contractApi.openBoxOnChain(
        parseInt(box_id),
        boxData?.creator || ''
      );

      // 2. Call backend to unlock
      const response = await boxApi.unlockBox(box_id);
      setContent(response.data.content);
    } catch (error) {
      console.error('解锁失败:', error);
      alert('解锁失败，请重试');
    } finally {
      setIsUnlocking(false);
    }
  };

  const handleShare = () => {
    router.push(`/app/share/poster/${box_id}`);
  };

  if (isLoading || !boxData) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">{boxData.title}</h1>
      
      <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
          <div className="text-left">
            <div className="font-medium">{boxData.creatorName || boxData.creator.slice(0, 8)}</div>
            <div className="text-sm text-gray-500">创建者</div>
          </div>
        </div>

        <p className="text-gray-600 mb-8">{boxData.description}</p>

        {content ? (
          <>
            <div className="text-left mb-8">
              <h2 className="text-xl font-semibold mb-4">盲盒内容</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="whitespace-pre-wrap">{content}</pre>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="w-full flex justify-center py-3 px-4 border-2 border-primary text-primary rounded-md hover:bg-primary/5 font-medium"
            >
              生成分享图
            </button>
          </>
        ) : (
          <div>
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-4xl">🎁</span>
            </div>
            <button
              onClick={handleUnlock}
              disabled={isUnlocking || !connected}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUnlocking ? '解锁中...' : '解锁盲盒'}
            </button>
          </div>
        )}
      </div>

      {boxData.rewardType !== 'none' && (
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-lg font-semibold mb-2">解锁奖励</h2>
          <div className="text-2xl font-bold text-primary">
            {boxData.rewardAmount} {boxData.rewardType === 'sol' ? 'SOL' : boxData.rewardType?.toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlinkPage; 