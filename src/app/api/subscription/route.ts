import { NextResponse } from 'next/server';
import { INITIAL_SUBSCRIPTION, PRODUCTS } from '@/data/mockData';

let currentSubscription = { ...INITIAL_SUBSCRIPTION };

export async function GET() {
  return NextResponse.json({
    success: true,
    subscription: currentSubscription
  });
}

export async function POST(request: Request) {
  try {
    const { action, payload } = await request.json();

    if (action === 'skip_month') {
      currentSubscription.status = 'skipped';
      currentSubscription.skippedMonth = 'Next Scheduled Drop';
      currentSubscription.nextRenewalDate = 'December 15, 2026';
    } else if (action === 'pause') {
      const months = payload?.months || 1;
      currentSubscription.status = 'paused';
      currentSubscription.pauseUntilMonth = `${months} month(s)`;
      currentSubscription.nextRenewalDate = `Paused for ${months} month(s)`;
    } else if (action === 'resume') {
      currentSubscription.status = 'active';
      currentSubscription.nextRenewalDate = 'November 15, 2026';
    } else if (action === 'update_frequency') {
      currentSubscription.frequency = payload.frequency;
    } else if (action === 'swap_items') {
      if (Array.isArray(payload.items)) {
        currentSubscription.items = payload.items;
        currentSubscription.fulfillmentStage = 1; // Resets to curating for next drop
      }
    } else if (action === 'simulate_stage') {
      currentSubscription.fulfillmentStage = payload.stage;
    }

    return NextResponse.json({
      success: true,
      subscription: currentSubscription,
      message: `Subscription successfully updated (${action})`
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Subscription update failed' },
      { status: 500 }
    );
  }
}
