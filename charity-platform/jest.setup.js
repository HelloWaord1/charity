// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom');

// Mock Solana web3.js for testing environment
jest.mock('@solana/web3.js', () => ({
  Connection: jest.fn().mockImplementation(() => ({
    getBalance: jest.fn().mockResolvedValue(1000000),
    getTokenSupply: jest.fn().mockResolvedValue({ value: { amount: '1000000' } }),
    getAccountInfo: jest.fn().mockResolvedValue(null),
    confirmTransaction: jest.fn().mockResolvedValue({ value: { err: null } }),
    getLatestBlockhash: jest.fn().mockResolvedValue({ blockhash: 'test-blockhash' }),
  })),
  PublicKey: jest.fn().mockImplementation((key) => ({ toString: () => key })),
  Transaction: jest.fn().mockImplementation(() => ({
    add: jest.fn().mockReturnThis(),
    recentBlockhash: '',
    feePayer: null,
    compileMessage: jest.fn().mockReturnValue({}),
  })),
  SystemProgram: {
    transfer: jest.fn().mockReturnValue({}),
  },
  LAMPORTS_PER_SOL: 1000000000,
  clusterApiUrl: jest.fn().mockReturnValue('https://api.devnet.solana.com'),
}));

// Mock wallet adapter
jest.mock('@solana/wallet-adapter-react', () => ({
  useWallet: () => ({
    publicKey: null,
    connected: false,
    connecting: false,
    disconnecting: false,
    wallet: null,
    wallets: [],
    select: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    sendTransaction: jest.fn(),
  }),
  useConnection: () => ({
    connection: {
      getBalance: jest.fn().mockResolvedValue(1000000),
      confirmTransaction: jest.fn().mockResolvedValue({ value: { err: null } }),
    },
  }),
  ConnectionProvider: ({ children }) => children,
  WalletProvider: ({ children }) => children,
}));

// Mock wallet adapter UI
jest.mock('@solana/wallet-adapter-react-ui', () => ({
  WalletMultiButton: () => ({ type: 'button', children: 'Connect Wallet' }),
  WalletDisconnectButton: () => ({ type: 'button', children: 'Disconnect' }),
  WalletModalProvider: ({ children }) => children,
}));

// Mock framer-motion for testing
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => ({ type: 'div', props, children }),
    section: ({ children, ...props }) => ({ type: 'section', props, children }),
    h1: ({ children, ...props }) => ({ type: 'h1', props, children }),
    p: ({ children, ...props }) => ({ type: 'p', props, children }),
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return { type: 'a', props: { href }, children };
  };
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SOLANA_NETWORK = 'devnet';
process.env.NEXT_PUBLIC_RPC_ENDPOINT = 'https://api.devnet.solana.com';

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});