import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  TransactionInstruction,
} from '@solana/web3.js';
import { AnchorProvider, Program, web3 } from '@project-serum/anchor';
import { contractConfig } from '@/config/contracts';

// 导入合约 IDL
import { IDL } from './idl/box_program';

export class SolanaService {
  private connection: Connection;
  private provider: AnchorProvider | null = null;
  private program: Program | null = null;

  constructor() {
    this.connection = new Connection(
      process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com'
    );
  }

  /**
   * 初始化 Provider 和 Program
   */
  async initialize(wallet: any) {
    if (!wallet.publicKey) throw new Error('Wallet not connected');

    this.provider = new AnchorProvider(
      this.connection,
      wallet,
      AnchorProvider.defaultOptions()
    );

    this.program = new Program(
      IDL,
      new PublicKey(contractConfig.devnet.boxProgram),
      this.provider
    );
  }

  /**
   * 创建盲盒
   * @param content 加密后的内容
   * @param price 价格（SOL）
   * @param commissionRate 返佣比例
   */
  async createBox(
    content: string,
    price: number,
    commissionRate: number
  ): Promise<string> {
    if (!this.program || !this.provider) {
      throw new Error('Program not initialized');
    }

    try {
      // 创建盲盒账户
      const boxAccount = web3.Keypair.generate();
      
      // 计算所需空间
      const contentSize = Buffer.from(content).length;
      const space = 8 + 32 + 32 + 8 + 1 + contentSize; // discriminator + creator + mint + price + rate + content
      
      // 计算所需租金
      const rent = await this.connection.getMinimumBalanceForRentExemption(space);

      // 创建交易指令
      const createBoxIx = await this.program.methods
        .createBox(content, price * LAMPORTS_PER_SOL, commissionRate)
        .accounts({
          box: boxAccount.publicKey,
          creator: this.provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .instruction();

      // 创建并发送交易
      const transaction = new Transaction().add(createBoxIx);
      const signature = await this.provider.sendAndConfirm(transaction, [boxAccount]);

      return signature;
    } catch (error) {
      console.error('创建盲盒失败:', error);
      throw error;
    }
  }

  /**
   * 解锁盲盒
   * @param boxId 盲盒ID
   * @param creator 创建者地址
   */
  async openBox(boxId: string, creator: string): Promise<string> {
    if (!this.program || !this.provider) {
      throw new Error('Program not initialized');
    }

    try {
      const boxPubkey = new PublicKey(boxId);
      const creatorPubkey = new PublicKey(creator);

      // 创建解锁指令
      const openBoxIx = await this.program.methods
        .openBox()
        .accounts({
          box: boxPubkey,
          opener: this.provider.wallet.publicKey,
          creator: creatorPubkey,
          systemProgram: SystemProgram.programId,
        })
        .instruction();

      // 创建并发送交易
      const transaction = new Transaction().add(openBoxIx);
      const signature = await this.provider.sendAndConfirm(transaction);

      return signature;
    } catch (error) {
      console.error('解锁盲盒失败:', error);
      throw error;
    }
  }

  /**
   * 获取盲盒信息
   * @param boxId 盲盒ID
   */
  async getBoxInfo(boxId: string) {
    if (!this.program) {
      throw new Error('Program not initialized');
    }

    try {
      const boxPubkey = new PublicKey(boxId);
      const boxAccount = await this.program.account.box.fetch(boxPubkey);

      return {
        creator: boxAccount.creator.toString(),
        content: boxAccount.content,
        price: boxAccount.price.toNumber() / LAMPORTS_PER_SOL,
        commissionRate: boxAccount.commissionRate,
        isOpened: boxAccount.isOpened,
      };
    } catch (error) {
      console.error('获取盲盒信息失败:', error);
      throw error;
    }
  }
}

// 导出单例实例
export const solanaService = new SolanaService(); 