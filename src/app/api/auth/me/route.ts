import { NextResponse } from 'next/server';
import { USERS_STORE, sanitizeUser } from '../users';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: missing bearer token' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '').trim();
    // In our mock, token is formatted like cratecraft-jwt-USER_ID-TIMESTAMP
    const match = token.match(/cratecraft-jwt-([^-]+(?:-[^-]+)*)-\d+/);
    const userId = match ? match[1] : null;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const user = USERS_STORE.find((u) => u.id === userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: sanitizeUser(user),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}
