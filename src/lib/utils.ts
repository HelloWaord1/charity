import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num === 0) return '0';
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absNum >= 1000000) {
    return sign + (absNum / 1000000).toFixed(1) + 'M';
  } else if (absNum >= 1000) {
    return sign + (absNum / 1000).toFixed(1) + 'K';
  }
  
  return num.toString();
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

export function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Islamic utility functions
export function calculateZakat(wealth: number): number {
  const nisab = 85 * 3.5; // 85 grams of gold (approximate value in grams)
  const goldPricePerGram = 60; // USD per gram (approximate)
  const nisabValue = nisab * goldPricePerGram;
  
  if (wealth >= nisabValue) {
    return wealth * 0.025; // 2.5% of wealth
  }
  return 0;
}

export function getHijriDate(date: Date = new Date()): string {
  // Simplified Hijri date conversion (would need proper library in production)
  const hijriYear = Math.floor(date.getFullYear() - 622 + (date.getFullYear() - 622) / 33);
  const hijriMonth = date.getMonth() + 1;
  const hijriDay = date.getDate();
  
  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
    'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
  ];
  
  return `${hijriDay} ${hijriMonths[hijriMonth - 1]} ${hijriYear} AH`;
}

export function getPrayerTimes(latitude: number, longitude: number): Record<string, string> {
  // Simplified prayer times calculation (would need proper library in production)
  const now = new Date();
  const baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0);
  
  return {
    fajr: new Date(baseTime.getTime() + 0 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    dhuhr: new Date(baseTime.getTime() + 6 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    asr: new Date(baseTime.getTime() + 9 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    maghrib: new Date(baseTime.getTime() + 12 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    isha: new Date(baseTime.getTime() + 14 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
}

export function isHalal(item: string): boolean {
  const haramItems = ['pork', 'alcohol', 'gambling', 'interest', 'riba'];
  return !haramItems.some(haram => item.toLowerCase().includes(haram));
}

export function formatArabicNumber(num: number): string {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)] || digit).join('');
}