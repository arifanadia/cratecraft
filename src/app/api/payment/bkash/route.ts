import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, phone, otp, pin, amount, currency } = body;

    // Validate Bangladesh mobile number format (e.g. 017XXXXXXXX)
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!phone || !bdPhoneRegex.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 11-digit Bangladeshi mobile number (e.g. 017XXXXXXXX)' },
        { status: 400 }
      );
    }

    if (action === 'send_otp') {
      const generatedOtp = '482910'; // Demo sandbox verification code
      return NextResponse.json({
        success: true,
        action: 'otp_sent',
        message: `Verification code sent to ${phone}`,
        demoOtp: generatedOtp,
        expiresInSeconds: 120
      });
    }

    if (action === 'verify_and_pay') {
      if (!otp || otp.length < 4) {
        return NextResponse.json(
          { success: false, error: 'Invalid verification code' },
          { status: 400 }
        );
      }

      if (!pin || pin.length < 4) {
        return NextResponse.json(
          { success: false, error: 'Invalid bKash 5-digit PIN' },
          { status: 400 }
        );
      }

      // Generate realistic bKash transaction receipt
      const trxId = 'TRX-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      
      return NextResponse.json({
        success: true,
        action: 'payment_completed',
        trxId,
        paymentMethod: 'bkash',
        amount,
        currency,
        phone,
        timestamp: new Date().toISOString(),
        status: 'COMPLETED'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Unknown action specified' },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'bKash gateway communication failed' },
      { status: 500 }
    );
  }
}
