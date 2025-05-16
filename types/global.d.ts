declare module '@mdx-js/react';

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

// Solana 钱包类型扩展
interface Window {
  solana?: {
    isPhantom?: boolean;
    publicKey?: { toString(): string };
    signMessage?: (message: Uint8Array) => Promise<Uint8Array>;
    signTransaction?: (transaction: any) => Promise<any>;
    connect?: () => Promise<void>;
    disconnect?: () => Promise<void>;
  };
}

// 环境变量类型声明
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SOLANA_RPC_URL: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_SOLANA_NETWORK: 'mainnet-beta' | 'testnet' | 'devnet';
  }
} 