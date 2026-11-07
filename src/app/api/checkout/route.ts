import { NextResponse } from 'next/server';
import { PRODUCTS, BOX_TIERS, FREQUENCY_OPTIONS } from '@/data/mockData';
import type { Order } from '@/types';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    const { 
      tier, 
      frequency, 
      items, 
      totalUSD, 
      totalBDT, 
      currency, 
      paymentMethod, 
      paymentRef, 
      shippingAddress 
    } = orderData;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot checkout an empty box' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.address) {
      return NextResponse.json(
        { success: false, error: 'Incomplete shipping destination' },
        { status: 400 }
      );
    }

    const orderId = `CRATE-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tier,
      frequency,
      items,
      totalUSD,
      totalBDT,
      currency,
      paymentMethod,
      paymentRef: paymentRef || `AUTH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: 'Processing',
      shippingAddress
    };

    return NextResponse.json({
      success: true,
      message: 'Subscription box order successfully authorized & placed',
      order: createdOrder,
      fulfillment: {
        stage: 1,
        stageName: 'Curating Ritual',
        trackingNumber: `CRATE-${Math.floor(1000 + Math.random() * 9000)}-EXP`,
        carrier: currency === 'BDT' ? 'Sundarban Express Climate-Safe' : 'FedEx EcoGreen Express',
        estimatedDeliveryDate: 'November 22, 2026'
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Checkout processing failed' },
      { status: 500 }
    );
  }
}
