import { NextResponse } from 'next/server';
import { USERS_STORE, sanitizeUser, StoredUser } from '../users';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, dietaryPreference } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = USERS_STORE.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists. Please sign in.' },
        { status: 409 }
      );
    }

    const newUser: StoredUser = {
      id: `user-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: password,
      phone: phone?.trim() || '',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80`,
      dietaryPreference: dietaryPreference || 'Artisanal Selection',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      subscriptionTier: 'starter',
      rewardPoints: 100, // Welcome bonus points!
    };

    USERS_STORE.push(newUser);

    const token = `cratecraft-jwt-${newUser.id}-${Date.now()}`;
    const safeUser = sanitizeUser(newUser);

    return NextResponse.json({
      success: true,
      message: 'Account registered successfully! Welcome to CrateCraft.',
      user: safeUser,
      token,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error during registration' },
      { status: 500 }
    );
  }
}
