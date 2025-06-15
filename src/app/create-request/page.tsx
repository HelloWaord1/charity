'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload,
  Heart,
  Users,
  AlertCircle,
  CheckCircle,
  FileText,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useWallet } from '@solana/wallet-adapter-react';

interface FormData {
  title: string;
  description: string;
  category: string;
  targetAmount: number;
  deadline: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  beneficiaryName: string;
  beneficiaryLocation: string;
  beneficiaryPhone: string;
  beneficiaryEmail: string;
  documents: File[];
  personalStory: string;
  publicDescription: string;
  expectedImpact: string;
  additionalNotes: string;
}

const categories = [
  { value: 'medical', label: 'Medical Emergency', icon: '🏥', description: 'Life-saving treatments and surgeries' },
  { value: 'education', label: 'Education', icon: '📚', description: 'School fees, supplies, and scholarships' },
  { value: 'housing', label: 'Housing & Shelter', icon: '🏠', description: 'Emergency accommodation and repairs' },
  { value: 'food', label: 'Food & Water', icon: '🥙', description: 'Meals, clean water, and nutrition' },
  { value: 'disaster', label: 'Disaster Relief', icon: '⛑️', description: 'Natural disaster emergency aid' },
  { value: 'orphan', label: 'Orphan Support', icon: '👶', description: 'Care for orphaned children' },
  { value: 'widow', label: 'Widow Support', icon: '👩‍👧‍👦', description: 'Support for widowed families' },
  { value: 'mosque', label: 'Mosque & Community', icon: '🕌', description: 'Religious and community projects' },
  { value: 'other', label: 'Other', icon: '💝', description: 'Other charitable causes' }
];

const urgencyLevels = [
  { value: 'low', label: 'Low Priority', color: 'text-green-600 bg-green-50 border-green-200', description: 'Can wait 30+ days' },
  { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600 bg-yellow-50 border-yellow-200', description: 'Needed within 2-4 weeks' },
  { value: 'high', label: 'High Priority', color: 'text-orange-600 bg-orange-50 border-orange-200', description: 'Urgent - within 1-2 weeks' },
  { value: 'urgent', label: 'Critical Emergency', color: 'text-red-600 bg-red-50 border-red-200', description: 'Life-threatening - immediate help needed' }
];

export default function CreateRequestPage() {
  const { publicKey, connected } = useWallet();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    targetAmount: 0,
    deadline: '',
    urgency: 'medium',
    beneficiaryName: '',
    beneficiaryLocation: '',
    beneficiaryPhone: '',
    beneficiaryEmail: '',
    documents: [],
    personalStory: '',
    publicDescription: '',
    expectedImpact: '',
    additionalNotes: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({ ...prev, documents: [...prev.documents, ...fileArray] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.targetAmount || formData.targetAmount <= 0) newErrors.targetAmount = 'Valid target amount is required';
        if (!formData.deadline) newErrors.deadline = 'Deadline is required';
        break;
      case 2:
        if (!formData.beneficiaryName.trim()) newErrors.beneficiaryName = 'Beneficiary name is required';
        if (!formData.beneficiaryLocation.trim()) newErrors.beneficiaryLocation = 'Location is required';
        if (!formData.personalStory.trim()) newErrors.personalStory = 'Personal story is required';
        break;
      case 3:
        if (!formData.publicDescription.trim()) newErrors.publicDescription = 'Public description is required';
        if (!formData.expectedImpact.trim()) newErrors.expectedImpact = 'Expected impact is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitRequest = async () => {
    if (!validateStep(3)) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically:
      // 1. Upload documents to IPFS or cloud storage
      // 2. Create blockchain transaction
      // 3. Save to database
      // 4. Send notifications
      
      alert('Request submitted successfully! It will be reviewed by our team.');
      
      // Redirect to dashboard or request details page
      // router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Charity Request</h1>
          <p className="text-gray-600 mb-6">Please connect your wallet to create a charity request</p>
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
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Charity Request</h1>
          <p className="text-gray-600 mb-4">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم - Help those in need through our community
          </p>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-12 h-0.5 ${
                      step < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-2 text-sm text-gray-500">
            Step {currentStep} of 4: {
              currentStep === 1 ? 'Basic Information' :
              currentStep === 2 ? 'Beneficiary Details' :
              currentStep === 3 ? 'Story & Impact' :
              'Review & Submit'
            }
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Brief, clear title describing the need"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {categories.map((category) => (
                      <div
                        key={category.value}
                        onClick={() => handleInputChange('category', category.value)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.category === category.value
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900">{category.label}</p>
                            <p className="text-xs text-gray-500">{category.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Amount (USD) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={formData.targetAmount || ''}
                        onChange={(e) => handleInputChange('targetAmount', Number(e.target.value))}
                        placeholder="0.00"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          errors.targetAmount ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.targetAmount && <p className="mt-1 text-sm text-red-600">{errors.targetAmount}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => handleInputChange('deadline', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          errors.deadline ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.deadline && <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {urgencyLevels.map((level) => (
                      <div
                        key={level.value}
                        onClick={() => handleInputChange('urgency', level.value)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.urgency === level.value
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{level.label}</p>
                            <p className="text-sm text-gray-600">{level.description}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full border ${level.color}`}>
                            {level.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Beneficiary Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Beneficiary Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beneficiary Name *
                    </label>
                    <input
                      type="text"
                      value={formData.beneficiaryName}
                      onChange={(e) => handleInputChange('beneficiaryName', e.target.value)}
                      placeholder="Full name of the person who will receive help"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.beneficiaryName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.beneficiaryName && <p className="mt-1 text-sm text-red-600">{errors.beneficiaryName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.beneficiaryLocation}
                        onChange={(e) => handleInputChange('beneficiaryLocation', e.target.value)}
                        placeholder="City, Country"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          errors.beneficiaryLocation ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.beneficiaryLocation && <p className="mt-1 text-sm text-red-600">{errors.beneficiaryLocation}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.beneficiaryPhone}
                        onChange={(e) => handleInputChange('beneficiaryPhone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.beneficiaryEmail}
                        onChange={(e) => handleInputChange('beneficiaryEmail', e.target.value)}
                        placeholder="email@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Story *
                  </label>
                  <textarea
                    value={formData.personalStory}
                    onChange={(e) => handleInputChange('personalStory', e.target.value)}
                    placeholder="Tell us about the situation, how it started, and why help is needed. This helps our community understand the urgency and importance of the request."
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      errors.personalStory ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.personalStory && <p className="mt-1 text-sm text-red-600">{errors.personalStory}</p>}
                  <p className="mt-1 text-sm text-gray-500">
                    This information will be kept private and only shared with verified donors and administrators.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drop files here or click to upload</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Medical reports, bills, photos, or other supporting documents
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="document-upload"
                    />
                    <label htmlFor="document-upload">
                      <Button type="button" variant="outline" className="cursor-pointer">
                        Choose Files
                      </Button>
                    </label>
                  </div>
                  
                  {formData.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.documents.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Story & Impact */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Public Story & Expected Impact</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Public Description *
                  </label>
                  <textarea
                    value={formData.publicDescription}
                    onChange={(e) => handleInputChange('publicDescription', e.target.value)}
                    placeholder="Write a compelling description that will be shown to potential donors. Focus on the impact and urgency while maintaining privacy."
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      errors.publicDescription ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.publicDescription && <p className="mt-1 text-sm text-red-600">{errors.publicDescription}</p>}
                  <p className="mt-1 text-sm text-gray-500">
                    This will be visible to all potential donors on the platform.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Impact *
                  </label>
                  <textarea
                    value={formData.expectedImpact}
                    onChange={(e) => handleInputChange('expectedImpact', e.target.value)}
                    placeholder="Describe the positive impact this funding will have. How many people will benefit? What specific outcomes do you expect?"
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      errors.expectedImpact ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.expectedImpact && <p className="mt-1 text-sm text-red-600">{errors.expectedImpact}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    placeholder="Any additional information you'd like to share with potential donors or administrators."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900">Review Process</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        All requests go through a verification process before being published. This typically takes 24-48 hours. 
                        You'll be notified via email once your request is approved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Review & Submit</h2>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Request Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Title</p>
                      <p className="font-medium">{formData.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium">
                        {categories.find(c => c.value === formData.category)?.label}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Target Amount</p>
                      <p className="font-medium">${formData.targetAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Deadline</p>
                      <p className="font-medium">{formData.deadline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Beneficiary</p>
                      <p className="font-medium">{formData.beneficiaryName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{formData.beneficiaryLocation}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-2">Public Description</p>
                    <p className="text-gray-900">{formData.publicDescription}</p>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Expected Impact</p>
                    <p className="text-gray-900">{formData.expectedImpact}</p>
                  </div>
                  
                  {formData.documents.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Documents</p>
                      <p className="text-gray-900">{formData.documents.length} file(s) uploaded</p>
                    </div>
                  )}
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-emerald-900">Terms & Conditions</h3>
                      <p className="text-sm text-emerald-700 mt-1">
                        By submitting this request, you confirm that all information provided is accurate and truthful. 
                        You understand that misrepresentation may result in removal from the platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="min-w-[120px]"
              >
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="min-w-[120px]"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={submitRequest}
                  disabled={loading}
                  className="min-w-[120px] bg-emerald-600 hover:bg-emerald-700"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Request'
                  )}
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}