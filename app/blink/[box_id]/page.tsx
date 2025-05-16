'use client';

import { FC, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface BoxPageProps {
  params: {
    box_id: string;
  };
}

const BoxPage: FC<BoxPageProps> = ({ params }) => {
  const { box_id } = params;
  const { connected } = useWallet();
  const [boxContent, setBoxContent] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    // TODO: Fetch box data from contract
    console.log('Fetching box data for:', box_id);
  }, [box_id]);

  const handleOpenBox = async () => {
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }
    // TODO: Implement open_box contract call
    console.log('Opening box:', box_id);
    setIsOpened(true);
    setBoxContent('Sample box content - replace with actual content from contract');
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8">Mystery Box #{box_id}</h1>
      <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
        {isOpened ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Box Content</h2>
            <p className="text-gray-700">{boxContent}</p>
          </div>
        ) : (
          <div>
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">🎁</span>
            </div>
            <button
              onClick={handleOpenBox}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Open Box
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxPage; 