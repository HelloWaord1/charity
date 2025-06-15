'use client';

import React, { createContext, useContext, useState } from 'react';

interface WalletState {
  isConnected: boolean;
  publicKey: string | null;
  balance: number;
  tokenBalance: number;
  loading: boolean;
  error: string | null;
}

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshBalances: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function CustomWalletProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    publicKey: null,
    balance: 0,
    tokenBalance: 0,
    loading: false,
    error: null,
  });

  // Mock wallet functions for demo
  const connect = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAddress = 'So11111111111111111111111111111111111111112';
      setState(prev => ({
        ...prev,
        isConnected: true,
        publicKey: mockAddress,
        balance: 5.23,
        tokenBalance: 1250.50,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to connect wallet',
      }));
    }
  };

  const disconnect = () => {
    setState({
      isConnected: false,
      publicKey: null,
      balance: 0,
      tokenBalance: 0,
      loading: false,
      error: null,
    });
  };

  const refreshBalances = async () => {
    if (!state.isConnected) return;

    setState(prev => ({ ...prev, loading: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setState(prev => ({
        ...prev,
        balance: 5.23 + (Math.random() - 0.5),
        tokenBalance: 1250.50 + (Math.random() - 0.5) * 100,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to refresh balances',
      }));
    }
  };

  const value: WalletContextType = {
    ...state,
    connect,
    disconnect,
    refreshBalances,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a CustomWalletProvider');
  }
  return context;
}