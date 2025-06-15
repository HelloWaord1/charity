// Mock Solana utilities for demo
export const CHARITY_TOKEN_MINT = "MockCharityTokenMint123";
export const SOLANA_NETWORK = "devnet";
export const RPC_ENDPOINT = "https://api.devnet.solana.com";

export function isValidPublicKey(publicKey: string): boolean {
  return Boolean(publicKey && publicKey.length > 0);
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function lamportsToSol(lamports: number): number {
  return lamports / 1000000000;
}

export function solToLamports(sol: number): number {
  return sol * 1000000000;
}

export async function getWalletBalance(): Promise<number> {
  return 5.23;
}

export async function getCharityTokenBalance(): Promise<number> {
  return 1250.50;
}

export function formatLamports(lamports: number): string {
  return (lamports / 1000000000).toFixed(2) + " SOL";
}

export function formatTokenAmount(amount: number, decimals = 9): string {
  return (amount / Math.pow(10, decimals)).toFixed(2);
}

export function createConnection(endpoint: string) {
  return {
    endpoint,
    getBalance: async () => 5.23,
    getTokenAccountBalance: async () => ({ value: { amount: "1250500000000", decimals: 9 } })
  };
}

export async function getBalance(): Promise<number> {
  return 5.23;
}

export async function getTokenBalance(): Promise<number> {
  return 1250.50;
}

export function handleSolanaError(error: any): string {
  return error?.message || "Transaction failed. Please try again";
}

export function getNetworkFromEndpoint(endpoint: string): string {
  if (endpoint.includes("devnet")) return "devnet";
  if (endpoint.includes("testnet")) return "testnet";
  if (endpoint.includes("mainnet")) return "mainnet-beta";
  return "unknown";
}

export async function sendSol(): Promise<string> {
  return "mock-transaction-signature-" + Date.now();
}

export async function sendToken(): Promise<string> {
  return "mock-token-transaction-" + Date.now();
}

export async function donateToCharity(): Promise<string> {
  return "mock-donation-transaction-" + Date.now();
}

export async function getTransactionHistory(): Promise<any[]> {
  return [
    {
      signature: "mock-signature-1",
      blockTime: Date.now() / 1000,
      meta: { fee: 5000 }
    }
  ];
}