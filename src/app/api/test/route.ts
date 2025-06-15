export async function GET() {
  return Response.json({ 
    message: 'Islamic Charity Platform API работает!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: [
      '/api/test',
      '/api/users', 
      '/api/requests',
      '/api/projects',
      '/api/zakat'
    ]
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return Response.json({ 
      message: 'Данные получены успешно',
      received: body,
      timestamp: new Date().toISOString()
    });
  } catch {
    return Response.json({ 
      error: 'Ошибка парсинга JSON',
      timestamp: new Date().toISOString() 
    }, { status: 400 });
  }
}