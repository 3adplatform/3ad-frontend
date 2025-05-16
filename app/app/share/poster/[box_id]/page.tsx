'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { boxApi } from '@/lib/api';
import { BoxSummary } from '@/lib/types';
import { siteConfig } from '@/config/site';

interface PosterPageProps {
  params: {
    box_id: string;
  };
}

const PosterPage: FC<PosterPageProps> = ({ params }) => {
  const { box_id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [boxData, setBoxData] = useState<BoxSummary | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const posterRef = useRef<HTMLDivElement>(null);

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

  const handleDownload = async () => {
    if (!posterRef.current) return;

    try {
      const dataUrl = await toPng(posterRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      link.download = `3ad-box-${box_id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('生成海报失败:', error);
      alert('生成海报失败，请重试');
    }
  };

  const handleShare = async (platform: 'twitter' | 'telegram') => {
    const url = `${siteConfig.url}/app/blink/${box_id}`;
    const text = `${boxData?.title} - 来自3AD的神秘盲盒`;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    };

    window.open(shareUrls[platform], '_blank');
  };

  if (isLoading || !boxData) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">生成分享图</h1>

      {/* 模板选择 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">选择模板</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedTemplate('default')}
            className={`p-4 border rounded-lg ${
              selectedTemplate === 'default' ? 'border-primary bg-primary/5' : 'border-gray-200'
            }`}
          >
            默认模板
          </button>
          <button
            onClick={() => setSelectedTemplate('simple')}
            className={`p-4 border rounded-lg ${
              selectedTemplate === 'simple' ? 'border-primary bg-primary/5' : 'border-gray-200'
            }`}
          >
            简约模板
          </button>
        </div>
      </div>

      {/* 预览区域 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">预览</h2>
        <div
          ref={posterRef}
          className="bg-white p-8 rounded-lg shadow-lg"
          style={{ width: '600px', height: '800px' }}
        >
          {selectedTemplate === 'default' ? (
            <div className="space-y-8">
              <div className="text-4xl font-bold">{boxData.title}</div>
              <p className="text-lg text-gray-600">{boxData.description}</p>
              {boxData.rewardType !== 'none' && (
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-xl font-semibold mb-2">解锁奖励</div>
                  <div className="text-3xl font-bold text-primary">
                    {boxData.rewardAmount} {boxData.rewardType === 'sol' ? 'SOL' : boxData.rewardType.toUpperCase()}
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <QRCodeSVG
                  value={`${siteConfig.url}/app/blink/${box_id}`}
                  size={200}
                  level="H"
                  includeMargin
                />
              </div>
              <div className="text-center text-sm text-gray-500">
                扫描二维码解锁盲盒
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <div className="text-5xl">🎁</div>
              <div className="text-2xl font-bold">{boxData.title}</div>
              <QRCodeSVG
                value={`${siteConfig.url}/app/blink/${box_id}`}
                size={150}
                level="H"
                includeMargin
              />
              <div className="text-sm text-gray-500">
                扫描解锁
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleDownload}
          className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          下载图片
        </button>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleShare('twitter')}
            className="py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90"
          >
            分享到 Twitter
          </button>
          <button
            onClick={() => handleShare('telegram')}
            className="py-3 bg-[#0088cc] text-white rounded-lg hover:bg-[#0088cc]/90"
          >
            分享到 Telegram
          </button>
        </div>
      </div>
    </div>
  );
};

export default PosterPage; 