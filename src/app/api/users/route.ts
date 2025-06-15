import { getPrismaClient } from '../../../lib/database/prisma';
import { mockWalletAddress } from '../../../lib/solana-temp';

// GET /api/users - Get user profile or list users
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('wallet');
    
    const prisma = await getPrismaClient();

    if (walletAddress) {
      // Get specific user by wallet address
      const user = await prisma.user.findUnique({
        where: { walletAddress },
        include: {
          _count: {
            select: {
              charityRequests: true,
              halalProjects: true,
              donations: true,
            }
          }
        }
      });

      if (!user) {
        return Response.json({ error: 'User not found' }, { status: 404 });
      }

      return Response.json(user);
    } else {
      // List users (admin only)
      const users = await prisma.user.findMany({
        select: {
          id: true,
          walletAddress: true,
          name: true,
          avatar: true,
          location: true,
          isVerified: true,
          role: true,
          totalDonated: true,
          totalRequests: true,
          reputation: true,
          createdAt: true,
          lastLoginAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 50
      });

      return Response.json(users);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create or update user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { walletAddress, email, name, avatar, bio, location } = body;

    if (!walletAddress) {
      return Response.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const prisma = await getPrismaClient();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { walletAddress }
    });

    let user;
    if (existingUser) {
      // Update existing user
      user = await prisma.user.update({
        where: { walletAddress },
        data: {
          email,
          name,
          avatar,
          bio,
          location,
          lastLoginAt: new Date(),
        }
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          walletAddress,
          email,
          name,
          avatar,
          bio,
          location,
          lastLoginAt: new Date(),
        }
      });
    }

    return Response.json(user);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/users - Update user profile
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { walletAddress, ...updateData } = body;

    if (!walletAddress) {
      return Response.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const prisma = await getPrismaClient();

    const user = await prisma.user.update({
      where: { walletAddress },
      data: updateData
    });

    return Response.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}