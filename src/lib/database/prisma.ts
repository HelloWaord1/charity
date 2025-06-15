// Database utilities without external dependencies

let prismaClient: any = null;

export async function getPrismaClient() {
  if (!prismaClient) {
    try {
      // Dynamic import to avoid build-time issues
      const { PrismaClient } = await import('@prisma/client');
      prismaClient = new PrismaClient();
    } catch (error) {
      console.error('Error initializing Prisma client:', error);
      // Return a mock client for development
      prismaClient = createMockClient();
    }
  }
  return prismaClient;
}

// Mock Prisma client for fallback
function createMockClient() {
  return {
    user: {
      findUnique: async (params: any) => null,
      findMany: async (params: any) => [],
      create: async (params: any) => ({ id: 'mock-id', ...params.data }),
      update: async (params: any) => ({ id: 'mock-id', ...params.data }),
    },
    charityRequest: {
      findMany: async (params: any) => [],
      findUnique: async (params: any) => null,
      create: async (params: any) => ({ id: 'mock-id', ...params.data }),
      update: async (params: any) => ({ id: 'mock-id', ...params.data }),
    },
    halalProject: {
      findMany: async (params: any) => [],
      findUnique: async (params: any) => null,
      create: async (params: any) => ({ id: 'mock-id', ...params.data }),
      update: async (params: any) => ({ id: 'mock-id', ...params.data }),
    },
    donation: {
      findMany: async (params: any) => [],
      create: async (params: any) => ({ id: 'mock-id', ...params.data }),
    },
    notification: {
      findMany: async (params: any) => [],
      create: async (params: any) => ({ id: 'mock-id', ...params.data }),
    },
    $disconnect: async () => {}
  };
}