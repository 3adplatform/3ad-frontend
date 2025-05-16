declare module '@project-serum/anchor' {
  import { Connection, PublicKey, Transaction } from '@solana/web3.js';

  export class Provider {
    readonly connection: Connection;
    readonly wallet: any;
    readonly opts: any;
    static defaultOptions(): any;
  }

  export class Program {
    readonly programId: PublicKey;
    readonly provider: Provider;

    constructor(idl: any, programId: PublicKey, provider: Provider);

    account: {
      [key: string]: {
        fetch(address: PublicKey): Promise<any>;
      };
    };

    methods: {
      [key: string]: (...args: any[]) => {
        accounts(accounts: any): any;
        signers(signers: any[]): any;
        remainingAccounts(accounts: any[]): any;
        preInstructions(ixs: any[]): any;
        postInstructions(ixs: any[]): any;
        rpc(): Promise<string>;
        instruction(): Promise<any>;
      };
    };
  }

  export class web3 {
    static Keypair: {
      generate(): any;
    };
  }

  export class AnchorProvider extends Provider {
    static defaultOptions(): any;
    static local(
      url?: string,
      opts?: any
    ): AnchorProvider;
  }
} 