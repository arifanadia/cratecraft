import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, pin, amount, currency } = body;

    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!phone || !bdPhoneRegex.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 11-digit Nagad mobile number' },
        { status: 400 }
      );
    }

    if (!pin || pin.length < 4) {
      return NextResponse.json(
        { success: false, error: 'Invalid Nagad 4-digit PIN' },
        { status: 400 }
      );
    }

    const trxId = 'NGD-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    return NextResponse.json({
      success: true,
      action: 'payment_completed',
      trxId,
      paymentMethod: 'nagad',
      amount,
      currency,
      phone,
      timestamp: new Date().toISOString(),
      status: 'COMPLETED'
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Nagad transaction failed' },
      { status: 500 }
    );
  }
}
