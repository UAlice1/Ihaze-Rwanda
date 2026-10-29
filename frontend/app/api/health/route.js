import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendUrl = 'http://localhost:8765';
    const response = await fetch(`${backendUrl}/api/health`);
    
    if (!response.ok) {
      throw new Error('Backend health check failed');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { status: 'error', error: error.message },
      { status: 500 }
    );
  }
}
