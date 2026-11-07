import { NextResponse } from 'next/server';
import { USERS_STORE, sanitizeUser } from '../users';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = USERS_STORE.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Account not found with this email. Please register.' },
        { status: 401 }
      );
    }

    if (user.passwordHash !== password) {
      return NextResponse.json(
        { success: false, error: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    // Generate mock token
    const token = `cratecraft-jwt-${user.id}-${Date.now()}`;
    const safeUser = sanitizeUser(user);

    return NextResponse.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      user: safeUser,
      token,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error during login' },
      { status: 500 }
    );
  }
}
