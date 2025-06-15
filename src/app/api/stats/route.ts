// GET /api/stats - Get platform statistics
export async function GET() {
  try {
    // Mock statistics for demonstration
    const stats = {
      totalUsers: 1247,
      totalDonations: 85623.45,
      totalRequests: 89,
      activeProjects: 23,
      zakatDistributed: 12450.00,
      completedRequests: 156,
      totalTransactions: 445,
      averageDonation: 192.35,
      recentActivity: [
        {
          id: '1',
          type: 'donation',
          amount: 250.0,
          donor: 'Anonymous',
          recipient: 'Emergency Medical Fund',
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          transactionHash: '3K8Q7mF9pN2xR5vB1wE6jH4sG8tL0nA7dC9fM2qP4rT6'
        },
        {
          id: '2',
          type: 'request_approved',
          title: 'Surgery for Ahmad (7 years old)',
          amount: 5000.0,
          category: 'MEDICAL',
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        },
        {
          id: '3',
          type: 'zakat_distribution',
          amount: 1200.0,
          recipients: 8,
          category: 'POOR',
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        },
        {
          id: '4',
          type: 'project_milestone',
          title: 'Mosque Construction - Phase 2 Complete',
          progress: 65,
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        },
        {
          id: '5',
          type: 'donation',
          amount: 100.0,
          donor: 'Fatima A.',
          recipient: 'Orphan Support Program',
          timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
          transactionHash: '7L2M9pQ4rT6xB5nC8vE1jF3gH0sA9dL6fM4qP7rT3K8Q'
        }
      ],
      categories: {
        MEDICAL: { count: 23, amount: 15234.50 },
        EDUCATION: { count: 18, amount: 8745.00 },
        HOUSING: { count: 12, amount: 22150.00 },
        FOOD: { count: 31, amount: 6890.25 },
        DISASTER: { count: 8, amount: 18500.00 },
        ORPHAN: { count: 15, amount: 12456.70 },
        WIDOW: { count: 9, amount: 7834.00 },
        MOSQUE: { count: 6, amount: 35600.00 }
      },
      zakatCategories: {
        POOR: { recipients: 45, amount: 4500.00 },
        NEEDY: { recipients: 23, amount: 3200.00 },
        DEBTORS: { recipients: 12, amount: 2800.00 },
        FISABILILLAH: { recipients: 8, amount: 1950.00 }
      },
      monthlyTrends: [
        { month: 'Jan', donations: 8234.50, requests: 12 },
        { month: 'Feb', donations: 9876.25, requests: 15 },
        { month: 'Mar', donations: 12456.75, requests: 18 },
        { month: 'Apr', donations: 15234.00, requests: 22 },
        { month: 'May', donations: 18765.50, requests: 28 },
        { month: 'Jun', donations: 21056.95, requests: 32 }
      ]
    };

    return Response.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
      message: 'Islamic Charity Platform Statistics - Barak Allahu feeki'
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return Response.json(
      { 
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch statistics'
      },
      { status: 500 }
    );
  }
}