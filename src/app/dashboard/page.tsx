'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Heart, 
  Users, 
  TrendingUp, 
  Calendar, 
  Gift,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useWallet } from '@solana/wallet-adapter-react';
import { formatNumber, formatCurrency, formatRelativeTime } from '@/lib/utils';

interface DashboardStats {
  totalDonated: number;
  totalRequests: number;
  peopleHelped: number;
  zakatPaid: number;
  activeProjects: number;
  completedProjects: number;
}

interface RecentActivity {
  id: string;
  type: 'donation' | 'zakat' | 'request' | 'vote';
  title: string;
  amount?: number;
  date: Date;
  status: 'pending' | 'completed' | 'approved' | 'rejected';
}

interface ActiveRequest {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  isVerified: boolean;
}

export default function DashboardPage() {
  const { publicKey, connected } = useWallet();
  const [stats, setStats] = useState<DashboardStats>({
    totalDonated: 0,
    totalRequests: 0,
    peopleHelped: 0,
    zakatPaid: 0,
    activeProjects: 0,
    completedProjects: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [activeRequests, setActiveRequests] = useState<ActiveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (connected && publicKey) {
      loadDashboardData();
    }
  }, [connected, publicKey]);

  const loadDashboardData = async () => {
    setLoading(true);
    
    // Simulate API calls - replace with actual backend calls
    setTimeout(() => {
      setStats({
        totalDonated: 12500.75,
        totalRequests: 8,
        peopleHelped: 45,
        zakatPaid: 3200.50,
        activeProjects: 3,
        completedProjects: 12
      });

      setRecentActivities([
        {
          id: '1',
          type: 'donation',
          title: 'Emergency Medical Aid for Fatima',
          amount: 250,
          date: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'completed'
        },
        {
          id: '2',
          type: 'zakat',
          title: 'Zakat Distribution - Ramadan 2024',
          amount: 1500,
          date: new Date(Date.now() - 5 * 60 * 60 * 1000),
          status: 'pending'
        },
        {
          id: '3',
          type: 'vote',
          title: 'Voted for Education Project in Syria',
          date: new Date(Date.now() - 12 * 60 * 60 * 1000),
          status: 'approved'
        },
        {
          id: '4',
          type: 'request',
          title: 'Created request for Mosque Construction',
          date: new Date(Date.now() - 24 * 60 * 60 * 1000),
          status: 'pending'
        }
      ]);

      setActiveRequests([
        {
          id: '1',
          title: 'Emergency Surgery for Ahmed',
          description: 'Urgent medical assistance needed for life-saving surgery',
          targetAmount: 5000,
          currentAmount: 3200,
          deadline: new Date('2024-02-15'),
          category: 'Medical',
          urgency: 'urgent',
          isVerified: true
        },
        {
          id: '2',
          title: 'School Supplies for Orphanage',
          description: 'Educational materials for 50 children in Gaza',
          targetAmount: 2000,
          currentAmount: 800,
          deadline: new Date('2024-03-01'),
          category: 'Education',
          urgency: 'medium',
          isVerified: true
        },
        {
          id: '3',
          title: 'Clean Water Project - Yemen',
          description: 'Building water wells for remote villages',
          targetAmount: 15000,
          currentAmount: 7500,
          deadline: new Date('2024-04-30'),
          category: 'Infrastructure',
          urgency: 'high',
          isVerified: false
        }
      ]);

      setLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-gray-600 mb-6">Please connect your wallet to access your dashboard</p>
          <Button className="w-full">Connect Wallet</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم - Track your charitable impact
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6 islamic-gradient border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Total Donated</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalDonated)}
                </p>
              </div>
              <Heart className="w-8 h-8 text-emerald-500" />
            </div>
          </Card>

          <Card className="p-6 islamic-gradient border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Zakat Paid</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.zakatPaid)}
                </p>
              </div>
              <Star className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 islamic-gradient border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">People Helped</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(stats.peopleHelped)}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6 islamic-gradient border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-medium">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeProjects}
                </p>
              </div>
              <Target className="w-8 h-8 text-amber-500" />
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                Recent Activity
              </h2>
              
              {loading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(activity.status)}
                        <div>
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-500">
                            {formatRelativeTime(activity.date)}
                          </p>
                        </div>
                      </div>
                      {activity.amount && (
                        <span className="font-semibold text-emerald-600">
                          {formatCurrency(activity.amount)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Active Requests */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Gift className="w-5 h-5 mr-2 text-blue-600" />
                Active Requests
              </h2>
              
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {activeRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 text-sm leading-tight">
                          {request.title}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {request.isVerified && (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full border ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {request.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">
                            {Math.round((request.currentAmount / request.targetAmount) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min((request.currentAmount / request.targetAmount) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{formatCurrency(request.currentAmount)}</span>
                          <span>{formatCurrency(request.targetAmount)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 space-y-2">
                <Button className="w-full">
                  Create New Request
                </Button>
                <Button variant="outline" className="w-full">
                  View All Requests
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}