import type { User } from '@/types';

export interface StoredUser extends User {
  passwordHash: string; // Plain/simple hash for mock/demo purposes
}

// In-memory persistent array for the server lifetime
export const USERS_STORE: StoredUser[] = [
  {
    id: 'user-emir-001',
    name: 'Emir Abiyyu',
    email: 'emir@cratecraft.com',
    passwordHash: 'password123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    phone: '+880 1712-345678',
    address: {
      fullName: 'Emir Abiyyu',
      street: 'House 42, Road 11, Banani',
      city: 'Dhaka',
      country: 'Bangladesh',
    },
    dietaryPreference: 'Specialty Coffee & Organic',
    memberSince: 'March 2026',
    subscriptionTier: 'curated',
    rewardPoints: 450,
  },
  {
    id: 'user-sophia-002',
    name: 'Sophia Rahman',
    email: 'sophia@example.com',
    passwordHash: 'password123',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    phone: '+880 1819-876543',
    address: {
      fullName: 'Sophia Rahman',
      street: 'Flat 4B, Road 27, Gulshan 1',
      city: 'Dhaka',
      country: 'Bangladesh',
    },
    dietaryPreference: 'Herbal Botanicals & Vegan',
    memberSince: 'January 2026',
    subscriptionTier: 'sanctuary',
    rewardPoints: 820,
  }
];

export function sanitizeUser(user: StoredUser): User {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
