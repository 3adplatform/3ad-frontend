export const contractConfig = {
  // Devnet addresses
  devnet: {
    boxProgram: 'YOUR_PROGRAM_ID',
    boxMint: 'YOUR_MINT_ADDRESS',
  },
  // Mainnet addresses
  mainnet: {
    boxProgram: 'YOUR_PROGRAM_ID',
    boxMint: 'YOUR_MINT_ADDRESS',
  },
  // Current network
  network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet',
}; 