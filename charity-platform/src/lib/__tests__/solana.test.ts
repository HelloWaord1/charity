import {
  formatLamports,
  parseTokenAmount,
  formatTokenAmount,
  isValidPublicKey,
  handleSolanaError,
  SolanaError,
} from '../solana';

// Mock @solana/web3.js
jest.mock('@solana/web3.js', () => ({
  ...jest.requireActual('@solana/web3.js'),
  PublicKey: jest.fn().mockImplementation((key) => {
    if (key === 'invalid') {
      throw new Error('Invalid public key');
    }
    return { toString: () => key };
  }),
}));

describe('Solana Utils', () => {
  describe('formatLamports', () => {
    test('formats lamports to SOL correctly', () => {
      expect(formatLamports(1000000000)).toBe('1.0000'); // 1 SOL
      expect(formatLamports(500000000)).toBe('0.5000'); // 0.5 SOL
      expect(formatLamports(0)).toBe('0.0000'); // 0 SOL
    });

    test('handles small amounts', () => {
      expect(formatLamports(1)).toBe('0.0000');
      expect(formatLamports(1000)).toBe('0.0000');
    });
  });

  describe('parseTokenAmount', () => {
    test('parses token amounts correctly', () => {
      expect(parseTokenAmount('1', 9)).toBe(1000000000); // 1 token with 9 decimals
      expect(parseTokenAmount('0.5', 9)).toBe(500000000); // 0.5 token
      expect(parseTokenAmount('10', 6)).toBe(10000000); // 10 tokens with 6 decimals
    });

    test('handles zero amount', () => {
      expect(parseTokenAmount('0', 9)).toBe(0);
    });
  });

  describe('formatTokenAmount', () => {
    test('formats token amounts correctly', () => {
      expect(formatTokenAmount(1000000000, 9)).toBe('1.0000'); // 1 token with 9 decimals
      expect(formatTokenAmount(500000000, 9)).toBe('0.5000'); // 0.5 token
      expect(formatTokenAmount(10000000, 6)).toBe('10.00'); // 10 tokens with 6 decimals
    });

    test('handles zero amount', () => {
      expect(formatTokenAmount(0, 9)).toBe('0.0000');
    });
  });

  describe('isValidPublicKey', () => {
    test('validates correct public keys', () => {
      expect(isValidPublicKey('11111111111111111111111111111112')).toBe(true);
      expect(isValidPublicKey('So11111111111111111111111111111111111111112')).toBe(true);
    });

    test('rejects invalid public keys', () => {
      expect(isValidPublicKey('invalid')).toBe(false);
      expect(isValidPublicKey('')).toBe(false);
      expect(isValidPublicKey('too-short')).toBe(false);
    });
  });

  describe('SolanaError', () => {
    test('creates error with message and code', () => {
      const error = new SolanaError('Test error', 'TEST_CODE');
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_CODE');
      expect(error.name).toBe('SolanaError');
    });
  });

  describe('handleSolanaError', () => {
    test('handles SolanaError instances', () => {
      const error = new SolanaError('Custom Solana error');
      expect(handleSolanaError(error)).toBe('Custom Solana error');
    });

    test('handles insufficient funds error', () => {
      const error = { message: 'insufficient funds for transaction' };
      expect(handleSolanaError(error)).toBe('Insufficient funds for transaction');
    });

    test('handles transaction confirmation error', () => {
      const error = { message: 'Transaction was not confirmed' };
      expect(handleSolanaError(error)).toBe('Transaction failed to confirm');
    });

    test('handles blockhash error', () => {
      const error = { message: 'Blockhash not found' };
      expect(handleSolanaError(error)).toBe('Transaction expired, please try again');
    });

    test('handles unknown errors', () => {
      const error = { message: 'Unknown error occurred' };
      expect(handleSolanaError(error)).toBe('An unexpected error occurred');
    });

    test('handles errors without message', () => {
      const error = {};
      expect(handleSolanaError(error)).toBe('An unexpected error occurred');
    });
  });
});