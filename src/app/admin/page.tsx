'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  Star,
  Heart,
  Building2,
  Gift,
  Search,
  Filter,
  Download,
  Upload,
  Bell,
  Mail,
  Flag,
  Award,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useWallet } from '@solana/wallet-adapter-react';
import { formatNumber, formatCurrency, formatRelativeTime } from '@/lib/utils';

interface AdminStats {
  totalUsers: number;
  activeRequests: number;
  pendingRequests: number;
  totalDonations: number;
  zakatPool: number;
  totalProjects: number;
  flaggedContent: number;
  revenueThisMonth: number;
}

interface PendingRequest {
  id: string;
  title: string;
  description: string;
  requestor: string;
  requestorWallet: string;
  amount: number;
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  submittedAt: Date;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  documents: string[];
  notes: string;
  reviewedBy?: string;
  reviewedAt?: Date;
}

interface FlaggedContent {
  id: string;
  type: 'request' | 'project' | 'comment' | 'user';
  title: string;
  description: string;
  reportedBy: string;
  reportReason: string;
  flaggedAt: Date;
  status: 'open' | 'reviewing' | 'resolved' | 'dismissed';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ZakatDistribution {
  id: string;
  title: string;
  description: string;
  amount: number;
  recipients: number;
  status: 'pending' | 'active' | 'completed';
  votesFor: number;
  votesAgainst: number;
  totalVoters: number;
  createdAt: Date;
  distributionDate?: Date;
}

export default function AdminDashboard() {
  const { publicKey, connected } = useWallet();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeRequests: 0,
    pendingRequests: 0,
    totalDonations: 0,
    zakatPool: 0,
    totalProjects: 0,
    flaggedContent: 0,
    revenueThisMonth: 0
  });
  
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [flaggedContent, setFlaggedContent] = useState<FlaggedContent[]>([]);
  const [zakatDistributions, setZakatDistributions] = useState<ZakatDistribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null);

  // Check if user is admin
  const isAdmin = () => {
    // In production, this would check against a list of admin wallets
    // or verify admin roles from the backend
    return connected && publicKey;
  };

  useEffect(() => {
    if (isAdmin()) {
      loadAdminData();
    }
  }, [connected, publicKey]);

  const loadAdminData = async () => {
    setLoading(true);
    
    // Simulate API calls - replace with actual backend calls
    setTimeout(() => {
      setStats({
        totalUsers: 12450,
        activeRequests: 89,
        pendingRequests: 15,
        totalDonations: 2350000,
        zakatPool: 145000,
        totalProjects: 67,
        flaggedContent: 3,
        revenueThisMonth: 28500
      });

      setPendingRequests([
        {
          id: '1',
          title: 'Emergency Surgery for Child',
          description: 'Urgent medical assistance needed for 8-year-old with heart condition',
          requestor: 'Ahmed Hassan',
          requestorWallet: 'ABC123...XYZ789',
          amount: 15000,
          category: 'medical',
          urgency: 'urgent',
          submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'pending',
          documents: ['medical_report.pdf', 'hospital_bill.pdf'],
          notes: 'Verified medical documents provided. Hospital confirmed urgency.'
        },
        {
          id: '2',
          title: 'School Supplies for Orphanage',
          description: 'Educational materials needed for 50 children',
          requestor: 'Fatima Al-Zahra',
          requestorWallet: 'DEF456...ABC123',
          amount: 3000,
          category: 'education',
          urgency: 'medium',
          submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
          status: 'under_review',
          documents: ['orphanage_cert.pdf', 'supply_list.pdf'],
          notes: 'Need to verify orphanage registration.'
        }
      ]);

      setFlaggedContent([
        {
          id: '1',
          type: 'request',
          title: 'Suspicious donation request',
          description: 'Request contains inconsistent information and suspicious documents',
          reportedBy: 'Community Member',
          reportReason: 'Fraudulent documents',
          flaggedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
          status: 'open',
          severity: 'high'
        }
      ]);

      setZakatDistributions([
        {
          id: '1',
          title: 'Ramadan 2024 Zakat Distribution',
          description: 'Distribution of Zakat funds to verified recipients during Ramadan',
          amount: 50000,
          recipients: 200,
          status: 'active',
          votesFor: 450,
          votesAgainst: 23,
          totalVoters: 473,
          createdAt: new Date('2024-03-01'),
          distributionDate: new Date('2024-04-15')
        }
      ]);

      setLoading(false);
    }, 1000);
  };

  const handleApproveRequest = async (requestId: string) => {
    try {
      // API call to approve request
      setPendingRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { ...req, status: 'approved', reviewedBy: publicKey?.toString(), reviewedAt: new Date() }
            : req
        )
      );
      alert('Request approved successfully!');
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Error approving request');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      // API call to reject request
      setPendingRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { ...req, status: 'rejected', reviewedBy: publicKey?.toString(), reviewedAt: new Date() }
            : req
        )
      );
      alert('Request rejected');
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Error rejecting request');
    }
  };

  const handleCreateZakatDistribution = () => {
    // Open modal for creating new Zakat distribution
    console.log('Create Zakat distribution');
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'under_review':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-amber-600 bg-amber-50 border-amber-200';
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Access Required</h1>
          <p className="text-gray-600 mb-6">Please connect your admin wallet to access the dashboard</p>
          <Button className="w-full">Connect Wallet</Button>
        </Card>
      </div>
    );
  }

  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <Lock className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access the admin dashboard</p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
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
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم - Platform Management & Oversight
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(stats.totalUsers)}
                </p>
              </div>
              <Users className="w-8 h-8 text-emerald-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalDonations)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Zakat Pool</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.zakatPool)}
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-medium">Pending Reviews</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingRequests}
                </p>
              </div>
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
          </Card>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-2">
            <div className="flex space-x-1">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'requests', label: 'Pending Requests', icon: Clock },
                { id: 'flagged', label: 'Flagged Content', icon: Flag },
                { id: 'zakat', label: 'Zakat Management', icon: Star },
                { id: 'users', label: 'User Management', icon: Users },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                  Platform Analytics
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Requests</span>
                    <span className="font-semibold">{stats.activeRequests}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Projects</span>
                    <span className="font-semibold">{stats.totalProjects}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Revenue This Month</span>
                    <span className="font-semibold text-emerald-600">
                      {formatCurrency(stats.revenueThisMonth)}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-amber-600" />
                  Attention Required
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <span className="text-amber-800">Pending Requests</span>
                    <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-sm">
                      {stats.pendingRequests}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-red-800">Flagged Content</span>
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm">
                      {stats.flaggedContent}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Pending Requests Tab */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Pending Requests</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {request.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{request.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>By: {request.requestor}</span>
                          <span>Amount: {formatCurrency(request.amount)}</span>
                          <span>Submitted: {formatRelativeTime(request.submittedAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 text-xs rounded-full border ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {request.documents.length} document(s)
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRejectRequest(request.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApproveRequest(request.id)}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Flagged Content Tab */}
          {activeTab === 'flagged' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Flagged Content</h2>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Severity
                </Button>
              </div>

              <div className="space-y-4">
                {flaggedContent.map((item) => (
                  <Card key={item.id} className="p-6 border-l-4 border-red-500">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Type: {item.type}</span>
                          <span>Reported by: {item.reportedBy}</span>
                          <span>Reason: {item.reportReason}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full border ${
                        item.severity === 'critical' ? 'text-red-600 bg-red-50 border-red-200' :
                        item.severity === 'high' ? 'text-orange-600 bg-orange-50 border-orange-200' :
                        'text-yellow-600 bg-yellow-50 border-yellow-200'
                      }`}>
                        {item.severity}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Investigate
                      </Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Take Action
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Zakat Management Tab */}
          {activeTab === 'zakat' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Zakat Pool Management</h2>
                <Button
                  onClick={handleCreateZakatDistribution}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Create Distribution
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 text-center">
                  <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Total Zakat Pool</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.zakatPool)}
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Eligible Recipients</p>
                  <p className="text-2xl font-bold text-gray-900">1,240</p>
                </Card>
                <Card className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Next Distribution</p>
                  <p className="text-2xl font-bold text-gray-900">15 days</p>
                </Card>
              </div>

              <div className="space-y-4">
                {zakatDistributions.map((distribution) => (
                  <Card key={distribution.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {distribution.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{distribution.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Amount: {formatCurrency(distribution.amount)}</span>
                          <span>Recipients: {distribution.recipients}</span>
                          <span>Distribution: {distribution.distributionDate ? 
                            formatRelativeTime(distribution.distributionDate) : 'TBD'}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full border ${
                        distribution.status === 'active' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' :
                        distribution.status === 'completed' ? 'text-blue-600 bg-blue-50 border-blue-200' :
                        'text-amber-600 bg-amber-50 border-amber-200'
                      }`}>
                        {distribution.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Community Approval</span>
                        <span>{Math.round((distribution.votesFor / distribution.totalVoters) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${(distribution.votesFor / distribution.totalVoters) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{distribution.votesFor} for</span>
                        <span>{distribution.votesAgainst} against</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit Distribution
                      </Button>
                      {distribution.status === 'pending' && (
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          Start Distribution
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}