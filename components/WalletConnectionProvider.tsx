'use client';

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
} from 'react';

import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  clusterApiUrl,
  Commitment,
  Connection,
  ConnectionConfig,
} from '@solana/web3.js';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

// 创建连接上下文
type ConnectionContextState = {
  connection: Connection;
};

const ConnectionContext = createContext<ConnectionContextState>({} as ConnectionContextState);

export function useConnection(): ConnectionContextState {
  return useContext(ConnectionContext);
}

type CustomConnectionProviderProps = {
  children: ReactNode;
  endpoint: string;
  config?: ConnectionConfig;
};

// 自定义连接提供器组件
const CustomConnectionProvider: FC<CustomConnectionProviderProps> = ({
  children,
  endpoint,
  config = { commitment: 'confirmed' as Commitment }
}) => {
  const connection = useMemo(() => new Connection(endpoint, config), [endpoint, config]);

  return (
    <ConnectionContext.Provider value={{ connection }}>
      {children}
    </ConnectionContext.Provider>
  );
};

interface Props {
  children: ReactNode;
}

export const WalletConnectionProvider: FC<Props> = ({ children }) => {
  // 连接端点
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('devnet');

  // 支持的钱包列表
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <CustomConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets as any} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </CustomConnectionProvider>
  );
};

export default WalletConnectionProvider; 