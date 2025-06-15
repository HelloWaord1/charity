import { getPrismaClient } from '../../../lib/database/prisma';

// GET /api/requests - Get charity requests
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const urgency = searchParams.get('urgency');
    
    const prisma = await getPrismaClient();
    
    const where: any = {
      isPublic: true
    };
    
    if (category) where.category = category;
    if (status) where.status = status;
    if (urgency) where.urgency = urgency;

    const requests = await prisma.charityRequest.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            isVerified: true,
          }
        },
        _count: {
          select: {
            donations: true,
            documents: true,
            comments: true,
          }
        }
      },
      orderBy: [
        { urgency: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit
    });

    const total = await prisma.charityRequest.count({ where });

    return Response.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching charity requests:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/requests - Create charity request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      longDescription,
      category,
      targetAmount,
      urgency,
      deadline,
      beneficiaryName,
      beneficiaryLocation,
      beneficiaryPhone,
      beneficiaryEmail,
      personalStory,
      publicDescription,
      expectedImpact,
      additionalNotes,
      userId
    } = body;

    // Validation
    if (!title || !description || !category || !targetAmount || !urgency || !deadline || !userId) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prisma = await getPrismaClient();

    const charityRequest = await prisma.charityRequest.create({
      data: {
        title,
        description,
        longDescription,
        category,
        targetAmount: parseFloat(targetAmount),
        urgency,
        deadline: new Date(deadline),
        beneficiaryName,
        beneficiaryLocation,
        beneficiaryPhone,
        beneficiaryEmail,
        personalStory,
        publicDescription,
        expectedImpact,
        additionalNotes,
        userId,
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            isVerified: true,
          }
        }
      }
    });

    return Response.json(charityRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating charity request:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}