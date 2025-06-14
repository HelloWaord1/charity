// Temporary Solana utilities without problematic PublicKey

// Utility functions
export function isValidPublicKey(publicKey: string): boolean {
  if (!publicKey || publicKey.length === 0) {
    return false;
  }
  
  // Basic validation for base58 string
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
  return base58Regex.test(publicKey) && publicKey.length >= 32 && publicKey.length <= 44;
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

// Mock functions for demonstration
export function validateSolanaAddress(address: string): boolean {
  return isValidPublicKey(address);
}

export function mockTransactionHash(): string {
  return Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

export function mockWalletAddress(): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  return Array.from({ length: 44 }, () => 
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

// Constants
export const MOCK_CHARITY_TOKEN_MINT = 'So11111111111111111111111111111111111111112';
export const LAMPORTS_PER_SOL = 1000000000;