import { PublicKey } from '@solana/web3.js';

// User Types
export interface User {
  id: string;
  walletAddress: string;
  charityTokens: number;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  profile?: UserProfile;
}

export interface UserProfile {
  name?: string;
  email?: string;
  bio?: string;
  avatar?: string;
  verificationStatus: VerificationStatus;
  documents?: Document[];
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR'
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  NOT_SUBMITTED = 'NOT_SUBMITTED'
}

// Zakat & Sadaqah Request Types
export interface CharityRequest {
  id: string;
  userId: string;
  user?: User;
  type: CharityType;
  title: string;
  description: string;
  requestedAmount: number;
  receivedAmount: number;
  status: RequestStatus;
  documents: Document[];
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  approvedBy?: string;
  rejectionReason?: string;
  category: CharityCategory;
  urgency: UrgencyLevel;
  location?: Location;
  beneficiaryCount?: number;
  donationHistory: Donation[];
}

export enum CharityType {
  ZAKAT = 'ZAKAT',
  SADAQAH = 'SADAQAH'
}

export enum RequestStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  FUNDED = 'FUNDED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum CharityCategory {
  MEDICAL = 'MEDICAL',
  EDUCATION = 'EDUCATION',
  FOOD = 'FOOD',
  HOUSING = 'HOUSING',
  EMERGENCY = 'EMERGENCY',
  ORPHAN_CARE = 'ORPHAN_CARE',
  ELDERLY_CARE = 'ELDERLY_CARE',
  DISASTER_RELIEF = 'DISASTER_RELIEF',
  DEBT_RELIEF = 'DEBT_RELIEF',
  OTHER = 'OTHER'
}

export enum UrgencyLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

// Halal Project Types
export interface HalalProject {
  id: string;
  creatorId: string;
  creator?: User;
  title: string;
  description: string;
  totalFunding: number;
  raisedAmount: number;
  status: ProjectStatus;
  category: ProjectCategory;
  roadmap: ProjectRoadmap[];
  documents: Document[];
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  approvedBy?: string;
  startDate?: Date;
  endDate?: Date;
  location?: Location;
  team: TeamMember[];
  updates: ProjectUpdate[];
  fundingHistory: ProjectFunding[];
  currentStage: number;
}

export interface ProjectRoadmap {
  id: string;
  stage: number;
  title: string;
  description: string;
  fundingRequired: number;
  fundingReceived: number;
  estimatedDuration: number; // in days
  status: RoadmapStatus;
  deliverables: string[];
  completedAt?: Date;
  proofOfCompletion?: Document[];
}

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum ProjectCategory {
  TECHNOLOGY = 'TECHNOLOGY',
  EDUCATION = 'EDUCATION',
  HEALTHCARE = 'HEALTHCARE',
  FINANCE = 'FINANCE',
  FOOD_HALAL = 'FOOD_HALAL',
  FASHION_MODEST = 'FASHION_MODEST',
  ISLAMIC_MEDIA = 'ISLAMIC_MEDIA',
  COMMUNITY = 'COMMUNITY',
  ENVIRONMENT = 'ENVIRONMENT',
  OTHER = 'OTHER'
}

export enum RoadmapStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED'
}

export interface TeamMember {
  id: string;
  userId?: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
  skills: string[];
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  title: string;
  content: string;
  createdAt: Date;
  attachments?: Document[];
  stage?: number;
}

export interface ProjectFunding {
  id: string;
  projectId: string;
  donorId: string;
  amount: number;
  transactionHash: string;
  stage: number;
  createdAt: Date;
  message?: string;
}

// Donation & Transaction Types
export interface Donation {
  id: string;
  donorId: string;
  donor?: User;
  requestId?: string;
  projectId?: string;
  amount: number;
  charityTokenAmount: number;
  transactionHash: string;
  solanaSignature: string;
  status: TransactionStatus;
  createdAt: Date;
  message?: string;
  isAnonymous: boolean;
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

// Zakat Distribution & Voting Types
export interface ZakatPool {
  id: string;
  totalAmount: number;
  availableAmount: number;
  distributedAmount: number;
  lastUpdateAt: Date;
  exchangeCommissions: ExchangeCommission[];
}

export interface ExchangeCommission {
  id: string;
  exchangeName: string;
  amount: number;
  percentage: number;
  collectedAt: Date;
  transactionHash: string;
}

export interface ZakatVoting {
  id: string;
  requestId: string;
  request?: CharityRequest;
  votingPower: number; // based on charity tokens
  votes: Vote[];
  status: VotingStatus;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface Vote {
  id: string;
  votingId: string;
  userId: string;
  user?: User;
  votingPower: number;
  amount: number; // amount to allocate
  createdAt: Date;
}

export enum VotingStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface ZakatDistribution {
  id: string;
  requestId: string;
  amount: number;
  transactionHash: string;
  distributedAt: Date;
  distributedBy: string;
  votingId?: string;
}

// Document & Media Types
export interface Document {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
  documentType: DocumentType;
  verificationStatus: VerificationStatus;
}

export enum DocumentType {
  IDENTITY = 'IDENTITY',
  PROOF_OF_INCOME = 'PROOF_OF_INCOME',
  MEDICAL_REPORT = 'MEDICAL_REPORT',
  EDUCATIONAL_CERTIFICATE = 'EDUCATIONAL_CERTIFICATE',
  BUSINESS_PLAN = 'BUSINESS_PLAN',
  FINANCIAL_STATEMENT = 'FINANCIAL_STATEMENT',
  PROOF_OF_CONCEPT = 'PROOF_OF_CONCEPT',
  TEAM_PHOTO = 'TEAM_PHOTO',
  PROJECT_DEMO = 'PROJECT_DEMO',
  PROGRESS_REPORT = 'PROGRESS_REPORT',
  COMPLETION_PROOF = 'COMPLETION_PROOF',
  OTHER = 'OTHER'
}

// Location Types
export interface Location {
  country: string;
  state?: string;
  city?: string;
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Blockchain Types
export interface BlockchainTransaction {
  signature: string;
  from: PublicKey;
  to: PublicKey;
  amount: number;
  tokenMint?: PublicKey;
  blockTime?: number;
  slot?: number;
  status: 'confirmed' | 'finalized' | 'failed';
  logs?: string[];
}

export interface CharityToken {
  mint: PublicKey;
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  holders: number;
}

export interface WalletState {
  connected: boolean;
  publicKey: PublicKey | null;
  balance: number;
  charityTokenBalance: number;
  connecting: boolean;
  disconnecting: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

// Statistics Types
export interface PlatformStats {
  totalUsers: number;
  totalDonations: number;
  totalAmountDonated: number;
  totalCharityRequests: number;
  totalProjects: number;
  totalZakatDistributed: number;
  totalCharityTokens: number;
  activeRequests: number;
  activeProjects: number;
  completedRequests: number;
  completedProjects: number;
}

export interface UserStats {
  totalDonated: number;
  totalReceived: number;
  charityTokensHeld: number;
  requestsCreated: number;
  projectsCreated: number;
  votingPower: number;
  donationsCount: number;
  projectsFunded: number;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
}

export enum NotificationType {
  DONATION_RECEIVED = 'DONATION_RECEIVED',
  REQUEST_APPROVED = 'REQUEST_APPROVED',
  REQUEST_REJECTED = 'REQUEST_REJECTED',
  PROJECT_FUNDED = 'PROJECT_FUNDED',
  PROJECT_UPDATE = 'PROJECT_UPDATE',
  VOTING_STARTED = 'VOTING_STARTED',
  VOTING_ENDED = 'VOTING_ENDED',
  ZAKAT_DISTRIBUTED = 'ZAKAT_DISTRIBUTED',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT'
}

// Form Types
export interface CharityRequestForm {
  type: CharityType;
  title: string;
  description: string;
  requestedAmount: number;
  category: CharityCategory;
  urgency: UrgencyLevel;
  location?: Location;
  beneficiaryCount?: number;
  documents: File[];
}

export interface HalalProjectForm {
  title: string;
  description: string;
  totalFunding: number;
  category: ProjectCategory;
  location?: Location;
  roadmap: Omit<ProjectRoadmap, 'id' | 'status' | 'fundingReceived' | 'completedAt' | 'proofOfCompletion'>[];
  team: Omit<TeamMember, 'id'>[];
  documents: File[];
  startDate?: Date;
  endDate?: Date;
}