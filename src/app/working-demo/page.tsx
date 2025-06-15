'use client';

import { useState } from 'react';

export default function WorkingDemoPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleConnect = () => {
    setIsConnected(true);
    setBalance(5.23);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setBalance(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🕌</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Islamic Charity Platform
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {isConnected ? (
                <>
                  <div className="text-sm text-gray-600">
                    Balance: {balance} SOL
                  </div>
                  <button 
                    onClick={handleDisconnect}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleConnect}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            بسم الله الرحمن الرحيم
          </h1>
          <h2 className="text-3xl font-bold text-emerald-600 mb-6">
            Islamic Charity Platform on Solana
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent Zakat and Sadaqah distribution with full Islamic compliance on the Solana blockchain
          </p>
          
          {/* Status Indicator */}
          <div className="mt-8 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
            Platform Status: Fully Operational
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-emerald-600 mb-2">1,247</div>
            <div className="text-gray-600">Total Users</div>
            <div className="text-sm text-gray-500 mt-1">+12% this month</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-100 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">$85,623</div>
            <div className="text-gray-600">Total Donations</div>
            <div className="text-sm text-gray-500 mt-1">+8% this week</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-100 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-amber-600 mb-2">89</div>
            <div className="text-gray-600">Active Requests</div>
            <div className="text-sm text-gray-500 mt-1">Review pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">$12,450</div>
            <div className="text-gray-600">Zakat Distributed</div>
            <div className="text-sm text-gray-500 mt-1">This year</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💚</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Zakat Distribution</h3>
            <p className="text-gray-600 mb-4">
              Automated Zakat distribution according to Islamic principles with community verification
            </p>
            <div className="text-sm text-emerald-600 font-semibold">
              8 eligible categories • Sharia compliant
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Halal Projects</h3>
            <p className="text-gray-600 mb-4">
              Community-funded projects that comply with Islamic values and benefit the Ummah
            </p>
            <div className="text-sm text-blue-600 font-semibold">
              Community voting • Transparent funding
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Blockchain Transparency</h3>
            <p className="text-gray-600 mb-4">
              Full transparency through Solana blockchain ensuring trust and accountability
            </p>
            <div className="text-sm text-amber-600 font-semibold">
              Immutable records • Public verification
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
            <div className="text-sm text-gray-500">Live updates</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">💰</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Donation Received</div>
                  <div className="text-sm text-gray-600">Emergency Medical Fund</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-emerald-600">$250.00</div>
                <div className="text-sm text-gray-500">15 min ago</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✅</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Request Approved</div>
                  <div className="text-sm text-gray-600">Surgery for Ahmad (7 years old)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-blue-600">$5,000.00</div>
                <div className="text-sm text-gray-500">45 min ago</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🕌</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Zakat Distribution</div>
                  <div className="text-sm text-gray-600">8 recipients in Al-Fuqara category</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-purple-600">$1,200.00</div>
                <div className="text-sm text-gray-500">2 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-sm p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Make a Donation</h3>
            <p className="mb-6">Support those in need through our transparent donation system</p>
            <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Donate Now
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Create Request</h3>
            <p className="mb-6">Submit a charity request for review by our Islamic council</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Submit Request
            </button>
          </div>
        </div>

        {/* Islamic Compliance */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl shadow-sm p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Full Islamic Compliance</h3>
          <p className="text-lg mb-8 opacity-90">Our platform operates according to Islamic principles</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl mb-2">🤲</div>
              <div className="font-semibold">Amanah</div>
              <div className="text-sm opacity-90">Trust & Transparency</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl mb-2">⚖️</div>
              <div className="font-semibold">Adl</div>
              <div className="text-sm opacity-90">Justice & Fairness</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl mb-2">🌟</div>
              <div className="font-semibold">Maslaha</div>
              <div className="text-sm opacity-90">Public Benefit</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl mb-2">🚫</div>
              <div className="font-semibold">La Riba</div>
              <div className="text-sm opacity-90">No Interest</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                  <span className="text-white text-sm">🕌</span>
                </div>
                <span className="font-bold">Islamic Charity Platform</span>
              </div>
              <p className="text-gray-400">
                Transparent blockchain-based charity distribution following Islamic principles
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Dashboard</li>
                <li>Create Request</li>
                <li>Halal Projects</li>
                <li>Zakat Calculator</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Islamic Guidelines</li>
                <li>FAQ</li>
                <li>Documentation</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 mb-2">
              "And whoever saves a life, it is as if he has saved all of mankind." - Quran 5:32
            </p>
            <p className="text-sm text-gray-500">
              Built with ❤️ for the Ummah • Powered by Solana Blockchain • © 2024 Islamic Charity Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}