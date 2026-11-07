import { NextResponse } from 'next/server';
import { PRODUCTS, BOX_TIERS, FREQUENCY_OPTIONS } from '@/data/mockData';
import type { BoxTierId, DeliveryFrequency, Currency } from '@/types';

interface CalculateRequest {
  itemIds: string[];
  tierId: BoxTierId;
  frequency: DeliveryFrequency;
  currency?: Currency;
  redeemedPoints?: number;
}

export async function POST(request: Request) {
  try {
    const body: CalculateRequest = await request.json();
    const { itemIds, tierId, frequency, currency = 'USD', redeemedPoints = 0 } = body;

    // Retrieve items from server-side database
    const items = itemIds
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter(Boolean) as typeof PRODUCTS;

    const tier = BOX_TIERS[tierId] || BOX_TIERS['curated'];
    const freqOption = FREQUENCY_OPTIONS.find(f => f.id === frequency) || FREQUENCY_OPTIONS[0];

    // Check Auto-Upgrade Eligibility on Backend
    let recommendedTierId = tierId;
    let autoUpgraded = false;
    let upgradeNotice = '';

    if (tierId === 'starter' && items.length > 4) {
      recommendedTierId = 'curated';
      autoUpgraded = true;
      upgradeNotice = 'Auto-upgraded to Curated Box (6 slots, 15% discount unlocked).';
    } else if (tierId === 'curated' && items.length > 6) {
      recommendedTierId = 'sanctuary';
      autoUpgraded = true;
      upgradeNotice = 'Auto-upgraded to Ultimate Sanctuary (8 slots, 25% discount unlocked).';
    }

    const effectiveTier = BOX_TIERS[recommendedTierId];

    // Subtotal Calculations
    const rawSubtotalUSD = items.reduce((sum, item) => sum + item.priceUSD, 0);
    const rawSubtotalBDT = items.reduce((sum, item) => sum + item.priceBDT, 0);

    const tierDiscountPercent = effectiveTier.discountPercentage;
    const frequencyDiscountPercent = freqOption.extraDiscountPercent;
    const totalDiscountPercent = tierDiscountPercent + frequencyDiscountPercent;

    const discountAmountUSD = rawSubtotalUSD * (totalDiscountPercent / 100);
    const discountAmountBDT = Math.round(rawSubtotalBDT * (totalDiscountPercent / 100));

    // Points Voucher Deduction (100 pts = $1 = 120 BDT)
    const pointsDiscountUSD = redeemedPoints > 0 ? redeemedPoints / 100 : 0;
    const pointsDiscountBDT = Math.round(pointsDiscountUSD * 120);

    const finalUSD = Math.max(0, rawSubtotalUSD - discountAmountUSD - pointsDiscountUSD);
    const finalBDT = Math.max(0, rawSubtotalBDT - discountAmountBDT - pointsDiscountBDT);

    return NextResponse.json({
      success: true,
      calculation: {
        itemCount: items.length,
        tier: effectiveTier,
        frequency: freqOption,
        rawSubtotalUSD: +rawSubtotalUSD.toFixed(2),
        rawSubtotalBDT,
        tierDiscountPercent,
        frequencyDiscountPercent,
        totalDiscountPercent,
        discountAmountUSD: +discountAmountUSD.toFixed(2),
        discountAmountBDT,
        redeemedPoints,
        pointsDiscountUSD: +pointsDiscountUSD.toFixed(2),
        pointsDiscountBDT,
        finalUSD: +finalUSD.toFixed(2),
        finalBDT,
        currency,
        freeShippingUnlocked: true,
        autoUpgraded,
        upgradeNotice,
        isBoxFull: items.length === effectiveTier.slots,
        remainingSlots: Math.max(0, effectiveTier.slots - items.length),
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Invalid calculation payload' },
      { status: 400 }
    );
  }
}
