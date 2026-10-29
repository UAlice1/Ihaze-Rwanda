import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Backend is on the same machine, use localhost
    const backendUrl = 'http://localhost:8765';
    
    const response = await fetch(`${backendUrl}/api/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': request.headers.get('origin') || 'http://localhost:8080',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Backend error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: `Failed to connect to backend: ${error.message}` },
      { status: 500 }
    );
  }
}
