import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Keypair
} from '@solana/web3.js';
import { 
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getMint
} from '@solana/spl-token';

// Utility functions
export function isValidPublicKey(publicKey: string): boolean {
  if (!publicKey || publicKey.length === 0) {
    return false;
  }
  
  try {
    new PublicKey(publicKey);
    return true;
  } catch {
    return false;
  }
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function lamportsToSol(lamports: number): number {
  return lamports / LAMPORTS_PER_SOL;
}

export function solToLamports(sol: number): number {
  return sol * LAMPORTS_PER_SOL;
}

// Connection functions
export function createConnection(endpoint: string): Connection {
  return new Connection(endpoint, 'confirmed');
}

export async function getBalance(connection: Connection, publicKey: PublicKey): Promise<number> {
  try {
    const balance = await connection.getBalance(publicKey);
    return lamportsToSol(balance);
  } catch (error) {
    console.error('Error getting balance:', error);
    return 0;
  }
}

export async function getTokenBalance(
  connection: Connection, 
  tokenAccountAddress: PublicKey
): Promise<number> {
  try {
    const tokenAccount = await connection.getTokenAccountBalance(tokenAccountAddress);
    return parseFloat(tokenAccount.value.amount) / Math.pow(10, tokenAccount.value.decimals);
  } catch (error) {
    console.error('Error getting token balance:', error);
    return 0;
  }
}

// Transaction functions
export async function sendSol(
  connection: Connection,
  fromKeypair: Keypair,
  toPublicKey: PublicKey,
  amount: number
): Promise<string> {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPublicKey,
        lamports: solToLamports(amount),
      })
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [fromKeypair]
    );

    return signature;
  } catch (error) {
    console.error('Error sending SOL:', error);
    throw error;
  }
}

export async function sendToken(
  connection: Connection,
  fromKeypair: Keypair,
  toPublicKey: PublicKey,
  tokenMintAddress: PublicKey,
  amount: number,
  decimals: number = 9
): Promise<string> {
  try {
    const fromTokenAddress = await getAssociatedTokenAddress(
      tokenMintAddress,
      fromKeypair.publicKey
    );

    const toTokenAddress = await getAssociatedTokenAddress(
      tokenMintAddress,
      toPublicKey
    );

    const transaction = new Transaction();

    // Check if recipient token account exists, create if not
    const toTokenAccountInfo = await connection.getAccountInfo(toTokenAddress);
    if (!toTokenAccountInfo) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          fromKeypair.publicKey,
          toTokenAddress,
          toPublicKey,
          tokenMintAddress
        )
      );
    }

    // Add transfer instruction
    transaction.add(
      createTransferInstruction(
        fromTokenAddress,
        toTokenAddress,
        fromKeypair.publicKey,
        amount * Math.pow(10, decimals)
      )
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [fromKeypair]
    );

    return signature;
  } catch (error) {
    console.error('Error sending token:', error);
    throw error;
  }
}

// Charity-specific functions
export async function donateToCharity(
  connection: Connection,
  donorKeypair: Keypair,
  charityPublicKey: PublicKey,
  amount: number,
  tokenMintAddress?: PublicKey
): Promise<string> {
  if (tokenMintAddress) {
    return sendToken(connection, donorKeypair, charityPublicKey, tokenMintAddress, amount);
  } else {
    return sendSol(connection, donorKeypair, charityPublicKey, amount);
  }
}

export async function createCharityPool(
  connection: Connection,
  adminKeypair: Keypair,
  initialAmount: number = 0
): Promise<{ poolPublicKey: PublicKey; signature: string }> {
  try {
    const poolKeypair = Keypair.generate();
    
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: adminKeypair.publicKey,
        newAccountPubkey: poolKeypair.publicKey,
        lamports: solToLamports(initialAmount),
        space: 0,
        programId: SystemProgram.programId,
      })
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [adminKeypair, poolKeypair]
    );

    return {
      poolPublicKey: poolKeypair.publicKey,
      signature
    };
  } catch (error) {
    console.error('Error creating charity pool:', error);
    throw error;
  }
}

export async function distributeFromZakatPool(
  connection: Connection,
  adminKeypair: Keypair,
  zakatPoolKeypair: Keypair,
  recipients: { publicKey: PublicKey; amount: number }[]
): Promise<string[]> {
  try {
    const signatures: string[] = [];

    for (const recipient of recipients) {
      const signature = await sendSol(
        connection,
        zakatPoolKeypair,
        recipient.publicKey,
        recipient.amount
      );
      signatures.push(signature);
    }

    return signatures;
  } catch (error) {
    console.error('Error distributing from Zakat pool:', error);
    throw error;
  }
}

// Token-specific functions for charity token
export async function mintCharityTokens(
  connection: Connection,
  mintAuthority: Keypair,
  tokenMintAddress: PublicKey,
  recipientPublicKey: PublicKey,
  amount: number,
  decimals: number = 9
): Promise<string> {
  try {
    const recipientTokenAddress = await getAssociatedTokenAddress(
      tokenMintAddress,
      recipientPublicKey
    );

    const transaction = new Transaction();

    // Check if recipient token account exists, create if not
    const recipientTokenAccountInfo = await connection.getAccountInfo(recipientTokenAddress);
    if (!recipientTokenAccountInfo) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          mintAuthority.publicKey,
          recipientTokenAddress,
          recipientPublicKey,
          tokenMintAddress
        )
      );
    }

    // For minting, we would need to add mint instruction here
    // This requires additional setup with mint authority

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [mintAuthority]
    );

    return signature;
  } catch (error) {
    console.error('Error minting charity tokens:', error);
    throw error;
  }
}

export async function getTokenInfo(
  connection: Connection,
  tokenMintAddress: PublicKey
) {
  try {
    const mintInfo = await getMint(connection, tokenMintAddress);
    return {
      decimals: mintInfo.decimals,
      supply: mintInfo.supply.toString(),
      mintAuthority: mintInfo.mintAuthority?.toString(),
      freezeAuthority: mintInfo.freezeAuthority?.toString(),
    };
  } catch (error) {
    console.error('Error getting token info:', error);
    return null;
  }
}

// Transaction history functions
export async function getTransactionHistory(
  connection: Connection,
  publicKey: PublicKey,
  limit: number = 10
): Promise<any[]> {
  try {
    const signatures = await connection.getSignaturesForAddress(publicKey, { limit });
    const transactions = await Promise.all(
      signatures.map(sig => connection.getTransaction(sig.signature))
    );
    
    return transactions.filter(tx => tx !== null);
  } catch (error) {
    console.error('Error getting transaction history:', error);
    return [];
  }
}

// Error handling utilities
export function handleSolanaError(error: any): string {
  if (error.message) {
    if (error.message.includes('insufficient')) {
      return 'Insufficient funds for this transaction';
    } else if (error.message.includes('blockhash')) {
      return 'Transaction expired. Please try again';
    } else if (error.message.includes('signature')) {
      return 'Invalid signature or unauthorized transaction';
    }
  }
  
  return 'Transaction failed. Please try again';
}

// Network detection
export function getNetworkFromEndpoint(endpoint: string): string {
  if (endpoint.includes('devnet')) return 'devnet';
  if (endpoint.includes('testnet')) return 'testnet';
  if (endpoint.includes('mainnet')) return 'mainnet-beta';
  return 'unknown';
}