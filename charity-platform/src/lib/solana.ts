import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  Keypair,
  clusterApiUrl,
} from '@solana/web3.js';
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

// Solana Configuration
export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
export const RPC_ENDPOINT = process.env.NEXT_PUBLIC_RPC_ENDPOINT || clusterApiUrl(SOLANA_NETWORK as any);

// Charity Token Configuration
export const CHARITY_TOKEN_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_CHARITY_TOKEN_MINT || 'ChAr1TyT0k3nM1nT1234567890123456789012345678'
);

export const ZAKAT_POOL_ADDRESS = new PublicKey(
  process.env.NEXT_PUBLIC_ZAKAT_POOL_ADDRESS || 'Zak4tP001Add7355123456789012345678901234567'
);

// Create Solana connection
export const connection = new Connection(RPC_ENDPOINT, 'confirmed');

// Utility Functions
export const formatLamports = (lamports: number): string => {
  return (lamports / LAMPORTS_PER_SOL).toFixed(4);
};

export const parseTokenAmount = (amount: string, decimals: number): number => {
  return parseFloat(amount) * Math.pow(10, decimals);
};

export const formatTokenAmount = (amount: number, decimals: number): string => {
  return (amount / Math.pow(10, decimals)).toFixed(decimals === 9 ? 4 : 2);
};

// Wallet Functions
export const getWalletBalance = async (publicKey: PublicKey): Promise<number> => {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance;
  } catch (error) {
    console.error('Error getting wallet balance:', error);
    throw error;
  }
};

export const getTokenBalance = async (
  walletAddress: PublicKey,
  tokenMint: PublicKey
): Promise<number> => {
  try {
    const tokenAccount = await getAssociatedTokenAddress(tokenMint, walletAddress);
    const account = await getAccount(connection, tokenAccount);
    return Number(account.amount);
  } catch (error) {
    console.error('Error getting token balance:', error);
    return 0;
  }
};

export const getCharityTokenBalance = async (walletAddress: PublicKey): Promise<number> => {
  return getTokenBalance(walletAddress, CHARITY_TOKEN_MINT);
};

// Transaction Functions
export const createSolTransferTransaction = async (
  from: PublicKey,
  to: PublicKey,
  amount: number
): Promise<Transaction> => {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: to,
      lamports: amount,
    })
  );
  
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = from;
  
  return transaction;
};

export const createTokenTransferTransaction = async (
  from: PublicKey,
  to: PublicKey,
  tokenMint: PublicKey,
  amount: number,
  decimals: number = 9
): Promise<Transaction> => {
  const transaction = new Transaction();
  
  const fromTokenAccount = await getAssociatedTokenAddress(tokenMint, from);
  const toTokenAccount = await getAssociatedTokenAddress(tokenMint, to);
  
  // Check if destination token account exists
  try {
    await getAccount(connection, toTokenAccount);
  } catch (error) {
    // Create associated token account if it doesn't exist
    transaction.add(
      createAssociatedTokenAccountInstruction(
        from, // payer
        toTokenAccount, // associated token account
        to, // owner
        tokenMint // mint
      )
    );
  }
  
  // Add transfer instruction
  transaction.add(
    createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      from,
      amount * Math.pow(10, decimals)
    )
  );
  
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = from;
  
  return transaction;
};

export const createCharityTokenTransferTransaction = async (
  from: PublicKey,
  to: PublicKey,
  amount: number
): Promise<Transaction> => {
  return createTokenTransferTransaction(from, to, CHARITY_TOKEN_MINT, amount, 9);
};

// Donation Functions
export const createDonationTransaction = async (
  donor: PublicKey,
  recipient: PublicKey,
  amount: number,
  isCharityToken: boolean = true
): Promise<Transaction> => {
  if (isCharityToken) {
    return createCharityTokenTransferTransaction(donor, recipient, amount);
  } else {
    return createSolTransferTransaction(donor, recipient, amount * LAMPORTS_PER_SOL);
  }
};

// Zakat Pool Functions
export const getZakatPoolBalance = async (): Promise<number> => {
  try {
    const balance = await getCharityTokenBalance(ZAKAT_POOL_ADDRESS);
    return balance;
  } catch (error) {
    console.error('Error getting Zakat pool balance:', error);
    return 0;
  }
};

export const createZakatDistributionTransaction = async (
  authority: PublicKey,
  recipient: PublicKey,
  amount: number
): Promise<Transaction> => {
  return createCharityTokenTransferTransaction(ZAKAT_POOL_ADDRESS, recipient, amount);
};

// Transaction Confirmation
export const confirmTransaction = async (
  signature: string,
  commitment: 'processed' | 'confirmed' | 'finalized' = 'confirmed'
): Promise<boolean> => {
  try {
    const result = await connection.confirmTransaction(signature, commitment);
    return !result.value.err;
  } catch (error) {
    console.error('Error confirming transaction:', error);
    return false;
  }
};

export const waitForConfirmation = async (
  signature: string,
  maxRetries: number = 30,
  delayMs: number = 1000
): Promise<boolean> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const confirmed = await confirmTransaction(signature);
      if (confirmed) return true;
      
      await new Promise(resolve => setTimeout(resolve, delayMs));
    } catch (error) {
      console.error(`Confirmation attempt ${i + 1} failed:`, error);
    }
  }
  return false;
};

// Account Information
export const getAccountInfo = async (publicKey: PublicKey) => {
  try {
    const accountInfo = await connection.getAccountInfo(publicKey);
    return accountInfo;
  } catch (error) {
    console.error('Error getting account info:', error);
    return null;
  }
};

export const isValidPublicKey = (address: string): boolean => {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
};

// Transaction History
export const getTransactionHistory = async (
  publicKey: PublicKey,
  limit: number = 10
): Promise<any[]> => {
  try {
    const signatures = await connection.getSignaturesForAddress(publicKey, { limit });
    const transactions = await Promise.all(
      signatures.map(async (sig) => {
        const tx = await connection.getTransaction(sig.signature);
        return {
          ...tx,
          signature: sig.signature,
          blockTime: sig.blockTime,
        };
      })
    );
    return transactions.filter(tx => tx !== null);
  } catch (error) {
    console.error('Error getting transaction history:', error);
    return [];
  }
};

// Token Information
export const getTokenSupply = async (tokenMint: PublicKey): Promise<number> => {
  try {
    const supply = await connection.getTokenSupply(tokenMint);
    return Number(supply.value.amount);
  } catch (error) {
    console.error('Error getting token supply:', error);
    return 0;
  }
};

export const getCharityTokenSupply = async (): Promise<number> => {
  return getTokenSupply(CHARITY_TOKEN_MINT);
};

// Program Interaction
export const getProgramAccounts = async (programId: PublicKey) => {
  try {
    const accounts = await connection.getProgramAccounts(programId);
    return accounts;
  } catch (error) {
    console.error('Error getting program accounts:', error);
    return [];
  }
};

// Airdrop for Development
export const requestAirdrop = async (
  publicKey: PublicKey,
  amount: number = 1
): Promise<string> => {
  try {
    if (SOLANA_NETWORK !== 'devnet' && SOLANA_NETWORK !== 'testnet') {
      throw new Error('Airdrop only available on devnet/testnet');
    }
    
    const signature = await connection.requestAirdrop(
      publicKey,
      amount * LAMPORTS_PER_SOL
    );
    
    await confirmTransaction(signature);
    return signature;
  } catch (error) {
    console.error('Error requesting airdrop:', error);
    throw error;
  }
};

// Fee Calculation
export const estimateTransactionFee = async (transaction: Transaction): Promise<number> => {
  try {
    const feeCalculator = await connection.getFeeForMessage(transaction.compileMessage());
    return feeCalculator?.value || 5000; // fallback fee
  } catch (error) {
    console.error('Error estimating transaction fee:', error);
    return 5000; // fallback fee in lamports
  }
};

// Utility for creating keypairs from private key
export const createKeypairFromPrivateKey = (privateKeyString: string): Keypair => {
  const privateKeyBytes = Uint8Array.from(
    privateKeyString.split(',').map(num => parseInt(num.trim()))
  );
  return Keypair.fromSecretKey(privateKeyBytes);
};

// Constants for UI
export const SOLANA_EXPLORER_URL = 
  SOLANA_NETWORK === 'mainnet-beta' 
    ? 'https://explorer.solana.com' 
    : `https://explorer.solana.com?cluster=${SOLANA_NETWORK}`;

export const getExplorerUrl = (signature: string, type: 'tx' | 'address' = 'tx'): string => {
  return `${SOLANA_EXPLORER_URL}/${type}/${signature}`;
};

// Error Handling
export class SolanaError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'SolanaError';
  }
}

export const handleSolanaError = (error: any): string => {
  if (error instanceof SolanaError) {
    return error.message;
  }
  
  if (error.message) {
    // Common Solana error messages
    if (error.message.includes('insufficient funds')) {
      return 'Insufficient funds for transaction';
    } else if (error.message.includes('Transaction was not confirmed')) {
      return 'Transaction failed to confirm';
    } else if (error.message.includes('Blockhash not found')) {
      return 'Transaction expired, please try again';
    }
  }
  
  return 'An unexpected error occurred';
};