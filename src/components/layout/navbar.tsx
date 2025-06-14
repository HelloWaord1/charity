'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart,
  Building2,
  BarChart3,
  Settings,
  Menu,
  X,
  User,
  Wallet,
  LogOut,
  Bell,
  Search,
  Star,
  Gift,
  Shield,
  Home,
  Plus,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { formatCurrency } from '@/lib/utils';

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
  description?: string;
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    description: 'Platform overview and statistics'
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: BarChart3,
    description: 'Your charitable activities',
    requiresAuth: true
  },
  {
    href: '/create-request',
    label: 'Create Request',
    icon: Plus,
    description: 'Submit a charity request',
    requiresAuth: true
  },
  {
    href: '/halal-projects',
    label: 'Halal Projects',
    icon: Building2,
    description: 'Community-funded projects'
  },
  {
    href: '/zakat',
    label: 'Zakat',
    icon: Star,
    description: 'Zakat pool and distribution'
  },
  {
    href: '/admin',
    label: 'Admin',
    icon: Shield,
    description: 'Platform administration',
    requiresAuth: true,
    adminOnly: true
  }
];

export default function Navbar() {
  const { connected, publicKey, disconnect } = useWallet();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    if (connected && publicKey) {
      // Load user balance and notifications
      loadUserData();
    }
  }, [connected, publicKey]);

  const loadUserData = async () => {
    // Simulate loading user data
    setTimeout(() => {
      setUserBalance(1250.75);
      setNotifications(3);
    }, 1000);
  };

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const isAdminUser = () => {
    // In production, check against admin wallet addresses or backend role
    return connected && publicKey;
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-lg">Islamic Charity</span>
              <span className="text-xs text-gray-500 -mt-1">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              // Skip admin routes for non-admin users
              if (item.adminOnly && !isAdminUser()) return null;
              
              // Skip auth-required routes for non-connected users
              if (item.requiresAuth && !connected) return null;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive(item.href)
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  
                  {/* Tooltip */}
                  {item.description && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                      {item.description}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <Search className="w-4 h-4 text-gray-600" />
            </button>

            {/* Notifications */}
            {connected && (
              <button className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <Bell className="w-4 h-4 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            )}

            {/* Wallet Connection */}
            {!connected ? (
              <WalletMultiButton className="!bg-emerald-600 hover:!bg-emerald-700 !rounded-lg !h-9 !px-4 !text-sm !font-medium transition-colors" />
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200"
                >
                  <Wallet className="w-4 h-4 text-emerald-600" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-emerald-900">
                      {shortenAddress(publicKey?.toString() || '')}
                    </span>
                    <span className="text-xs text-emerald-600">
                      {formatCurrency(userBalance)}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-emerald-600" />
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Connected Wallet</p>
                        <p className="text-xs text-gray-500 mt-1">{publicKey?.toString()}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-gray-600">Balance:</span>
                          <span className="text-sm font-semibold text-emerald-600">
                            {formatCurrency(userBalance)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        
                        <Link
                          href="/profile"
                          className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Profile Settings</span>
                        </Link>
                        
                        <button
                          onClick={handleDisconnect}
                          className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Disconnect Wallet</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="py-4 space-y-2">
                {navigationItems.map((item) => {
                  // Skip admin routes for non-admin users
                  if (item.adminOnly && !isAdminUser()) return null;
                  
                  // Skip auth-required routes for non-connected users
                  if (item.requiresAuth && !connected) return null;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'text-emerald-600 bg-emerald-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <div>
                        <p className="font-medium">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-gray-500">{item.description}</p>
                        )}
                      </div>
                    </Link>
                  );
                })}
                
                {/* Mobile Search */}
                <div className="px-4 pt-4 border-t border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(isMenuOpen || isUserMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
}