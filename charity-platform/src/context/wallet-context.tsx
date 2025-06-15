'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { PublicKey } from '@solana/web3.js';
import { clusterApiUrl } from '@solana/web3.js';

import {
  getWalletBalance,
  getCharityTokenBalance,
  formatLamports,
  formatTokenAmount,
  SOLANA_NETWORK,
  RPC_ENDPOINT,
} from '@/lib/solana';
import { WalletState } from '@/types';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

interface WalletContextType extends WalletState {
  solBalance: number;
  charityTokenBalance: number;
  formattedSolBalance: string;
  formattedCharityTokenBalance: string;
  refreshBalances: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

// Inner component that uses wallet hooks
const WalletStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  
  const [solBalance, setSolBalance] = useState<number>(0);
  const [charityTokenBalance, setCharityTokenBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshBalances = async () => {
    if (!wallet.publicKey) {
      setSolBalance(0);
      setCharityTokenBalance(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [solBal, charityBal] = await Promise.all([
        getWalletBalance(wallet.publicKey),
        getCharityTokenBalance(wallet.publicKey),
      ]);

      setSolBalance(solBal);
      setCharityTokenBalance(charityBal);
    } catch (err) {
      console.error('Error refreshing balances:', err);
      setError('Failed to fetch wallet balances');
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh balances when wallet connects/disconnects
  useEffect(() => {
    refreshBalances();
  }, [wallet.publicKey, wallet.connected]);

  // Auto-refresh balances every 30 seconds
  useEffect(() => {
    if (!wallet.connected) return;

    const interval = setInterval(refreshBalances, 30000);
    return () => clearInterval(interval);
  }, [wallet.connected]);

  const contextValue: WalletContextType = {
    connected: wallet.connected,
    publicKey: wallet.publicKey,
    balance: solBalance,
    charityTokenBalance: charityTokenBalance,
    connecting: wallet.connecting,
    disconnecting: wallet.disconnecting,
    solBalance,
    formattedSolBalance: formatLamports(solBalance),
    formattedCharityTokenBalance: formatTokenAmount(charityTokenBalance, 9),
    refreshBalances,
    isLoading,
    error,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

// Main provider component
export const CustomWalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  // Configure network
  const network = SOLANA_NETWORK as WalletAdapterNetwork;
  const endpoint = RPC_ENDPOINT;

  // Configure supported wallets
  const wallets = React.useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter(),
  ], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletStateProvider>
            {children}
          </WalletStateProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

// Hook to use wallet context
export const useWalletContext = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a CustomWalletProvider');
  }
  return context;
};

// Re-export wallet adapter hooks for convenience
export { useWallet, useConnection } from '@solana/wallet-adapter-react';
export { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';