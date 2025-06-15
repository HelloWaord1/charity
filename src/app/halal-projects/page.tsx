'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2,
  Users,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Target,
  Award,
  Calendar,
  MapPin,
  DollarSign,
  Vote,
  Eye,
  Heart,
  Filter,
  Search,
  ChevronDown,
  Play,
  Pause,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useWallet } from '@solana/wallet-adapter-react';
import { formatNumber, formatCurrency, formatRelativeTime } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'mosque' | 'school' | 'hospital' | 'orphanage' | 'water' | 'housing' | 'business';
  totalFunding: number;
  currentFunding: number;
  completedStages: number;
  totalStages: number;
  currentStage: ProjectStage;
  stages: ProjectStage[];
  location: string;
  organizer: string;
  organizerWallet: string;
  createdAt: Date;
  deadline: Date;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  isVerified: boolean;
  communityRating: number;
  voterCount: number;
  images: string[];
  updates: ProjectUpdate[];
  supporters: number;
  estimatedCompletion: Date;
  halalCertification: boolean;
  islamicCompliance: {
    noInterest: boolean;
    halalBusiness: boolean;
    communityBenefit: boolean;
    transparentFunding: boolean;
  };
}

interface ProjectStage {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  isCompleted: boolean;
  isCurrent: boolean;
  milestones: string[];
  completedDate?: Date;
  documentsRequired: string[];
  communityApproval: {
    votesFor: number;
    votesAgainst: number;
    totalVoters: number;
    isApproved: boolean;
  };
}

interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  images: string[];
  date: Date;
  type: 'progress' | 'milestone' | 'completion' | 'issue';
}

const projectCategories = [
  { value: 'all', label: 'All Projects', icon: '🌟' },
  { value: 'mosque', label: 'Mosques', icon: '🕌' },
  { value: 'school', label: 'Schools', icon: '🏫' },
  { value: 'hospital', label: 'Hospitals', icon: '🏥' },
  { value: 'orphanage', label: 'Orphanages', icon: '🏠' },
  { value: 'water', label: 'Water Wells', icon: '💧' },
  { value: 'housing', label: 'Housing', icon: '🏘️' },
  { value: 'business', label: 'Halal Business', icon: '🏪' }
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'progress', label: 'Most Progress' },
  { value: 'funding', label: 'Most Funded' },
  { value: 'ending', label: 'Ending Soon' },
  { value: 'rating', label: 'Highest Rated' }
];

export default function HalalProjectsPage() {
  const { publicKey, connected } = useWallet();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    filterAndSortProjects();
  }, [projects, selectedCategory, sortBy, searchQuery]);

  const loadProjects = async () => {
    setLoading(true);
    
    // Simulate API call - replace with actual backend calls
    setTimeout(() => {
      const mockProjects: Project[] = [
        {
          id: '1',
          title: 'New Mosque Construction in Refugee Camp',
          description: 'Building a community mosque to serve 500+ refugee families',
          longDescription: 'This project aims to construct a mosque in the Al-Zaatari refugee camp to serve over 500 families who currently have no proper place for prayer. The mosque will include prayer halls, ablution facilities, and a community center for educational activities.',
          category: 'mosque',
          totalFunding: 50000,
          currentFunding: 32500,
          completedStages: 2,
          totalStages: 4,
          currentStage: {
            id: 'stage3',
            title: 'Foundation & Structure',
            description: 'Laying foundation and building main structure',
            targetAmount: 20000,
            currentAmount: 12500,
            isCompleted: false,
            isCurrent: true,
            milestones: ['Foundation completed', 'Walls construction', 'Roof installation'],
            documentsRequired: ['Construction permits', 'Engineering reports'],
            communityApproval: {
              votesFor: 145,
              votesAgainst: 12,
              totalVoters: 157,
              isApproved: true
            }
          },
          stages: [],
          location: 'Jordan - Al-Zaatari Camp',
          organizer: 'Islamic Relief Foundation',
          organizerWallet: 'ABC123...XYZ789',
          createdAt: new Date('2024-01-15'),
          deadline: new Date('2024-12-31'),
          status: 'active',
          isVerified: true,
          communityRating: 4.8,
          voterCount: 234,
          images: [],
          updates: [],
          supporters: 456,
          estimatedCompletion: new Date('2024-10-15'),
          halalCertification: true,
          islamicCompliance: {
            noInterest: true,
            halalBusiness: true,
            communityBenefit: true,
            transparentFunding: true
          }
        },
        {
          id: '2',
          title: 'Water Well Project - Remote Village Mali',
          description: 'Providing clean water access for 200 families in rural Mali',
          longDescription: 'Installing a deep water well with solar-powered pumps to provide clean drinking water to a remote village in Mali. This will eliminate the need for families to walk 5km daily for water.',
          category: 'water',
          totalFunding: 25000,
          currentFunding: 18750,
          completedStages: 3,
          totalStages: 4,
          currentStage: {
            id: 'stage4',
            title: 'Installation & Testing',
            description: 'Installing pumps and testing water quality',
            targetAmount: 8000,
            currentAmount: 6250,
            isCompleted: false,
            isCurrent: true,
            milestones: ['Pump installation', 'Water quality testing', 'Community training'],
            documentsRequired: ['Water quality reports', 'Installation certificates'],
            communityApproval: {
              votesFor: 89,
              votesAgainst: 3,
              totalVoters: 92,
              isApproved: true
            }
          },
          stages: [],
          location: 'Mali - Sikasso Region',
          organizer: 'Water for Life Initiative',
          organizerWallet: 'DEF456...ABC123',
          createdAt: new Date('2023-11-20'),
          deadline: new Date('2024-06-30'),
          status: 'active',
          isVerified: true,
          communityRating: 4.9,
          voterCount: 178,
          images: [],
          updates: [],
          supporters: 298,
          estimatedCompletion: new Date('2024-05-20'),
          halalCertification: true,
          islamicCompliance: {
            noInterest: true,
            halalBusiness: true,
            communityBenefit: true,
            transparentFunding: true
          }
        },
        {
          id: '3',
          title: 'Islamic School Expansion - Indonesia',
          description: 'Expanding classrooms to accommodate 200 more students',
          longDescription: 'Expanding our Islamic school in Jakarta to add 6 new classrooms, a library, and a computer lab to serve 200 additional students from low-income families.',
          category: 'school',
          totalFunding: 75000,
          currentFunding: 28500,
          completedStages: 1,
          totalStages: 5,
          currentStage: {
            id: 'stage2',
            title: 'Site Preparation',
            description: 'Preparing construction site and obtaining permits',
            targetAmount: 15000,
            currentAmount: 8500,
            isCompleted: false,
            isCurrent: true,
            milestones: ['Permits obtained', 'Site clearing', 'Utility planning'],
            documentsRequired: ['Building permits', 'Environmental clearance'],
            communityApproval: {
              votesFor: 203,
              votesAgainst: 15,
              totalVoters: 218,
              isApproved: true
            }
          },
          stages: [],
          location: 'Jakarta, Indonesia',
          organizer: 'Al-Falah Education Trust',
          organizerWallet: 'GHI789...DEF456',
          createdAt: new Date('2024-02-01'),
          deadline: new Date('2025-01-31'),
          status: 'active',
          isVerified: true,
          communityRating: 4.7,
          voterCount: 312,
          images: [],
          updates: [],
          supporters: 542,
          estimatedCompletion: new Date('2024-12-15'),
          halalCertification: true,
          islamicCompliance: {
            noInterest: true,
            halalBusiness: true,
            communityBenefit: true,
            transparentFunding: true
          }
        }
      ];

      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  };

  const filterAndSortProjects = () => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query)
      );
    }

    // Sort projects
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'progress':
        filtered.sort((a, b) => 
          (b.currentFunding / b.totalFunding) - (a.currentFunding / a.totalFunding)
        );
        break;
      case 'funding':
        filtered.sort((a, b) => b.currentFunding - a.currentFunding);
        break;
      case 'ending':
        filtered.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.communityRating - a.communityRating);
        break;
    }

    setFilteredProjects(filtered);
  };

  const getProgressPercentage = (project: Project) => {
    return Math.round((project.currentFunding / project.totalFunding) * 100);
  };

  const getStageProgress = (project: Project) => {
    return Math.round((project.completedStages / project.totalStages) * 100);
  };

  const getCategoryIcon = (category: string) => {
    const cat = projectCategories.find(c => c.value === category);
    return cat ? cat.icon : '🌟';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'paused':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'completed':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'cancelled':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleDonate = (project: Project) => {
    // Open donation modal or redirect to donation page
    console.log('Donate to project:', project.id);
  };

  const handleVote = (project: Project, vote: 'for' | 'against') => {
    // Handle community voting
    console.log('Vote for project:', project.id, vote);
  };

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
            Halal Community Projects
          </h1>
          <p className="text-gray-600 mb-6">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم - Support transparent, Sharia-compliant community projects
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 text-center">
              <Building2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-xl font-bold text-gray-900">{projects.filter(p => p.status === 'active').length}</p>
            </Card>
            <Card className="p-4 text-center">
              <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Funded</p>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(projects.reduce((sum, p) => sum + p.currentFunding, 0))}
              </p>
            </Card>
            <Card className="p-4 text-center">
              <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Community Members</p>
              <p className="text-xl font-bold text-gray-900">
                {formatNumber(projects.reduce((sum, p) => sum + p.supporters, 0))}
              </p>
            </Card>
            <Card className="p-4 text-center">
              <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-gray-900">
                {projects.filter(p => p.status === 'completed').length}
              </p>
            </Card>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {projectCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </Card>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <Card className="p-12 text-center">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-emerald-500">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getCategoryIcon(project.category)}</span>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {project.isVerified && (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        )}
                        {project.halalCertification && (
                          <Star className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      {/* Funding Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Funding Progress</span>
                          <span className="font-medium">{getProgressPercentage(project)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(getProgressPercentage(project), 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{formatCurrency(project.currentFunding)}</span>
                          <span>{formatCurrency(project.totalFunding)}</span>
                        </div>
                      </div>

                      {/* Stage Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Stage Progress</span>
                          <span className="font-medium">
                            {project.completedStages}/{project.totalStages}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getStageProgress(project)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{formatNumber(project.supporters)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium">{project.communityRating}</span>
                        <span className="text-sm text-gray-500">({project.voterCount} votes)</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Ends {formatRelativeTime(project.deadline)}
                      </div>
                    </div>

                    {/* Islamic Compliance Indicators */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center space-x-1 text-xs text-emerald-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>No Interest</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-emerald-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>Transparent</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-emerald-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>Community Benefit</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleDonate(project)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        size="sm"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Support
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedProject(project);
                          setShowProjectModal(true);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleVote(project, 'for')}
                        variant="outline"
                        size="sm"
                      >
                        <Vote className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Create Project Button */}
        {connected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="fixed bottom-8 right-8"
          >
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full shadow-lg"
              size="lg"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Create Project
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}