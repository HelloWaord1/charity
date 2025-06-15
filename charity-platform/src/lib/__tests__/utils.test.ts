import {
  formatNumber,
  formatDate,
  formatTimeAgo,
  calculatePercentage,
  generateId,
  truncateString,
  isValidEmail,
  isValidUrl,
  calculateZakat,
  formatFileSize,
  getUrgencyColor,
  getStatusColor,
  formatHijriDate,
  formatPrayerTime,
} from '../utils';

describe('Utils Functions', () => {
  describe('formatNumber', () => {
    test('formats numbers with appropriate suffixes', () => {
      expect(formatNumber(500)).toBe('500');
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(1500000)).toBe('1.5M');
      expect(formatNumber(1500000000)).toBe('1.5B');
    });

    test('handles zero and negative numbers', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(-1500)).toBe('-1.5K');
    });
  });

  describe('formatDate', () => {
    test('formats date correctly', () => {
      const testDate = new Date('2024-01-15');
      const formatted = formatDate(testDate);
      expect(formatted).toContain('January');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });

    test('handles string dates', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).toContain('January');
    });
  });

  describe('formatTimeAgo', () => {
    test('formats time correctly', () => {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 3600000);
      
      expect(formatTimeAgo(oneHourAgo)).toBe('1 hour ago');
    });

    test('handles just now case', () => {
      const now = new Date();
      expect(formatTimeAgo(now)).toBe('just now');
    });
  });

  describe('calculatePercentage', () => {
    test('calculates percentage correctly', () => {
      expect(calculatePercentage(25, 100)).toBe(25);
      expect(calculatePercentage(1, 3)).toBe(33);
    });

    test('handles zero total', () => {
      expect(calculatePercentage(10, 0)).toBe(0);
    });
  });

  describe('generateId', () => {
    test('generates ID of correct length', () => {
      expect(generateId()).toHaveLength(8);
      expect(generateId(12)).toHaveLength(12);
    });

    test('generates unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('truncateString', () => {
    test('truncates long strings', () => {
      const longString = 'This is a very long string that should be truncated';
      const truncated = truncateString(longString, 20);
      expect(truncated).toBe('This is a very long ...');
    });

    test('does not truncate short strings', () => {
      const shortString = 'Short';
      expect(truncateString(shortString, 20)).toBe('Short');
    });
  });

  describe('isValidEmail', () => {
    test('validates correct emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    test('rejects invalid emails', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    test('validates correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
    });

    test('rejects invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('ftp://invalid')).toBe(false);
    });
  });

  describe('calculateZakat', () => {
    test('calculates zakat correctly for assets above nisab', () => {
      const assets = 10000; // Above nisab threshold
      const zakat = calculateZakat(assets);
      expect(zakat).toBe(250); // 2.5% of 10000
    });

    test('returns 0 for assets below nisab', () => {
      const assets = 1000; // Below nisab threshold
      const zakat = calculateZakat(assets);
      expect(zakat).toBe(0);
    });
  });

  describe('formatFileSize', () => {
    test('formats file sizes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1048576)).toBe('1 MB');
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });
  });

  describe('getUrgencyColor', () => {
    test('returns correct colors for urgency levels', () => {
      expect(getUrgencyColor('critical')).toContain('text-red-600');
      expect(getUrgencyColor('high')).toContain('text-orange-600');
      expect(getUrgencyColor('medium')).toContain('text-yellow-600');
      expect(getUrgencyColor('low')).toContain('text-green-600');
      expect(getUrgencyColor('unknown')).toContain('text-gray-600');
    });
  });

  describe('getStatusColor', () => {
    test('returns correct colors for status values', () => {
      expect(getStatusColor('approved')).toContain('text-green-600');
      expect(getStatusColor('pending')).toContain('text-yellow-600');
      expect(getStatusColor('rejected')).toContain('text-red-600');
      expect(getStatusColor('draft')).toContain('text-gray-600');
    });
  });

  describe('formatHijriDate', () => {
    test('formats Hijri date', () => {
      const testDate = new Date('2024-01-15');
      const hijriDate = formatHijriDate(testDate);
      expect(hijriDate).toContain('AH');
      expect(hijriDate).toContain('15');
    });
  });

  describe('formatPrayerTime', () => {
    test('formats prayer times correctly', () => {
      expect(formatPrayerTime(13, 30)).toBe('1:30 PM');
      expect(formatPrayerTime(5, 45)).toBe('5:45 AM');
      expect(formatPrayerTime(0, 0)).toBe('12:00 AM');
      expect(formatPrayerTime(12, 0)).toBe('12:00 PM');
    });
  });
});