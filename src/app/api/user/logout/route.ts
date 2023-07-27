import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: 'Logout successfuk',
      status: true,
    });
    response.cookies.set('token', '', { expires: new Date(0) });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
