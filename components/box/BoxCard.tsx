'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { BoxSummary } from '@/lib/types';

interface BoxCardProps extends BoxSummary {}

export const BoxCard: FC<BoxCardProps> = ({
  id,
  title,
  description,
  creator,
  creatorName,
  thumbnailUrl,
  createdAt,
  unlockCount,
  rewardType,
  rewardAmount
}) => {
  return (
    <Link href={`/app/blink/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
        <div className="relative h-48">
          <Image 
            src={thumbnailUrl || '/images/default-box-cover.jpg'} 
            alt={title}
            fill
            className="object-cover"
          />
          {rewardType && rewardAmount && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {rewardAmount} {rewardType === 'sol' ? 'SOL' : rewardType.toUpperCase()}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
              <span>{creatorName || creator.slice(0, 4)}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{formatDistanceToNow(createdAt, { locale: zhCN })}</span>
              <span>{unlockCount} 次解锁</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BoxCard; 