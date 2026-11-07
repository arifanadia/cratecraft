'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BOX_TIERS, FREQUENCY_OPTIONS } from '../../data/mockData';
import confetti from 'canvas-confetti';
import { 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  ArrowLeft, 
  Truck, 
  Phone, 
  KeyRound, 
  Tag,
  Package
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    boxItems, 
    selectedTier, 
    selectedFrequency, 
    currency, 
    formatPrice, 
    placeOrder, 
    setActiveTab, 
    subscription,
    redeemedPoints,
    setRedeemedPoints,
    showToast,
    user,
    isAuthenticated,
    openLoginModal
  } = useApp();

  const tier = BOX_TIERS[selectedTier];
  const freqOption = FREQUENCY_OPTIONS.find(f => f.id === selectedFrequency);

  // Math calculation
  const rawSubtotalUSD = boxItems.reduce((sum, item) => sum + item.priceUSD, 0);
  const rawSubtotalBDT = boxItems.reduce((sum, item) => sum + item.priceBDT, 0);

  const tierDiscountPercent = tier.discountPercentage;
  const freqDiscountPercent = freqOption ? freqOption.extraDiscountPercent : 0;
  const totalPercentDiscount = tierDiscountPercent + freqDiscountPercent;

  const discountAmountUSD = rawSubtotalUSD * (totalPercentDiscount / 100);
  const discountAmountBDT = Math.round(rawSubtotalBDT * (totalPercentDiscount / 100));

  const isPointsApplied = redeemedPoints > 0;
  const pointsDiscountUSD = isPointsApplied ? redeemedPoints / 100 : 0;
  const pointsDiscountBDT = Math.round(pointsDiscountUSD * 120);

  const finalUSD = Math.max(0, rawSubtotalUSD - discountAmountUSD - pointsDiscountUSD);
  const finalBDT = Math.max(0, rawSubtotalBDT - discountAmountBDT - pointsDiscountBDT);

  // Payment Form States
  const [paymentGateway, setPaymentGateway] = useState<'card' | 'bkash' | 'nagad'>('card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);

  // Address State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || 'Sophia Rahman',
    email: user?.email || 'sophia.rahman@example.com',
    address: user?.address?.street || 'Flat 4B, Road 27, Gulshan 1',
    city: user?.address?.city || 'Dhaka',
    country: user?.address?.country || (currency === 'BDT' ? 'Bangladesh' : 'United States'),
  });

  useEffect(() => {
    if (user) {
      setShippingAddress({
        fullName: user.name || '',
        email: user.email || '',
        address: user.address?.street || '',
        city: user.address?.city || 'Dhaka',
        country: user.address?.country || (currency === 'BDT' ? 'Bangladesh' : 'United States'),
      });
    }
  }, [user, currency]);

  // Card State
  const [cardData, setCardData] = useState({
    number: '4242 •••• •••• 4242',
    name: 'Sophia Rahman',
    expiry: '08/28',
    cvv: '849'
  });

  // bKash Multi-Step State
  const [bkashStep, setBkashStep] = useState<1 | 2 | 3>(1);
  const [bkashPhone, setBkashPhone] = useState('01712345678');
  const [bkashOtp, setBkashOtp] = useState('');
  const [bkashPin, setBkashPin] = useState('');

  // Nagad State
  const [nagadPhone, setNagadPhone] = useState('01898765432');

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  const handleApplyPoints = () => {
    if (isPointsApplied) {
      setRedeemedPoints(0);
      showToast('Points voucher removed', undefined, 'info');
    } else {
      setRedeemedPoints(Math.min(subscription.rewardPoints, 850));
      showToast('850 CratePoints Redeemed! 🎉', `Applied discount of ${formatPrice(8.5, 1020)}`, 'success');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      let ref = 'CARD-AUTH-' + Math.floor(100000 + Math.random() * 900000);
      if (paymentGateway === 'bkash') {
        ref = 'TRX-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      } else if (paymentGateway === 'nagad') {
        ref = 'NGD-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      }

      const createdOrder = placeOrder({
        tier: selectedTier,
        frequency: selectedFrequency,
        items: boxItems,
        totalUSD: finalUSD,
        totalBDT: finalBDT,
        currency: currency,
        paymentMethod: paymentGateway,
        paymentRef: ref,
        shippingAddress: shippingAddress
      });

      setIsProcessing(false);
      setOrderComplete(createdOrder);
      triggerCelebration();
    }, 1800);
  };

  // If Order is Completed successfully
  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-[#8B6E4A] font-bold">
            Order Confirmed • Subscription Activated
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#16221A]">
            Your Ritual Journey Begins
          </h2>
          <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
            Thank you, {orderComplete.shippingAddress.fullName}! We have charged{' '}
            <strong className="text-stone-900 font-mono">
              {formatPrice(orderComplete.totalUSD, orderComplete.totalBDT)}
            </strong>{' '}
            via {orderComplete.paymentMethod.toUpperCase()} (Ref: {orderComplete.paymentRef}).
          </p>
        </div>

        {/* Order Card Preview */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 border-2 border-[#E4D8C5] shadow-sm text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8] text-xs">
            <div>
              <span className="text-stone-500 block">Order Reference</span>
              <span className="font-mono font-bold text-stone-800">{orderComplete.id}</span>
            </div>
            <div className="text-right">
              <span className="text-stone-500 block">Delivery Frequency</span>
              <span className="font-bold text-stone-800 uppercase">{orderComplete.frequency}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              Curated Provisions ({orderComplete.items.length} items)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {orderComplete.items.map((it: any, i: number) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-[#F4EFE6] border border-[#DECFC0]">
                  <img src={it.imageUrl} alt={it.name} className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-[11px] font-bold text-stone-800 truncate">{it.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E8DEC8] flex items-center justify-between text-xs text-stone-600">
            <span>Delivering to: {orderComplete.shippingAddress.address}, {orderComplete.shippingAddress.city}</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              <span>Carbon-Neutral Dispatch</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('subscription')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#283E2E] hover:bg-[#1C2C20] text-white font-bold text-xs tracking-wider uppercase shadow-md transition-all"
          >
            Track in Subscriber Portal
          </button>
          <button
            onClick={() => {
              setOrderComplete(null);
              setActiveTab('builder');
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#F2EAE0] hover:bg-[#EAE0D2] text-stone-800 font-semibold text-xs border border-[#DECFC0]"
          >
            Curate Another Box
          </button>
        </div>
      </div>
    );
  }

  if (boxItems.length === 0 && !orderComplete) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4 bg-white rounded-3xl border border-stone-200 shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-stone-100 flex items-center justify-center text-[#FF5B26]">
          <Package className="w-8 h-8" />
        </div>
        <h3 className="font-extrabold text-2xl text-[#111827]">Your Crate is Currently Empty</h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          Please pack artisan provisions into your visual box tray or run our 60-second quiz to curate your box before proceeding to checkout.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('builder')}
            className="px-6 py-3 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-bold shadow-sm"
          >
            Start Building Crate
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className="px-5 py-3 rounded-full bg-[#F4F5F7] hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-200"
          >
            Take 60s Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <button
        onClick={() => setActiveTab('builder')}
        className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#111827] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Interactive Box Builder</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Checkout Details & Gateways */}
        <div className="lg:col-span-7 space-y-6">
          {/* Auth Status Notification in Checkout */}
          {!isAuthenticated ? (
            <div className="bg-[#FFF4EE] border border-[#FF5B26]/30 rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-[#111827]">
                  Have a CrateCraft Account?
                </p>
                <p className="text-[11px] text-stone-600">
                  Sign in to auto-fill your delivery address and earn 150 Ritual reward points with this order.
                </p>
              </div>
              <button
                type="button"
                onClick={openLoginModal}
                className="shrink-0 px-4 py-2 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-bold transition-all shadow-xs"
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className="bg-[#F0FDF4] border border-emerald-200 rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-950">
                    Logged in as {user?.name}
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    {user?.email} • Destination auto-filled from your profile
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                {user?.rewardPoints || 0} pts available
              </span>
            </div>
          )}

          {/* Shipping Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-xl text-[#111827]">
              1. Sanctuary Shipping Destination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700">Full Name</label>
                <input
                  type="text"
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-full bg-[#F8F9FA] border border-stone-200 focus:outline-none focus:border-[#FF5B26]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700">Email Address</label>
                <input
                  type="email"
                  value={shippingAddress.email}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-full bg-[#F8F9FA] border border-stone-200 focus:outline-none focus:border-[#FF5B26]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-stone-700">Street Address / Apartment</label>
                <input
                  type="text"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-full bg-[#F8F9FA] border border-stone-200 focus:outline-none focus:border-[#FF5B26]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700">City / District</label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-full bg-[#F8F9FA] border border-stone-200 focus:outline-none focus:border-[#FF5B26]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700">Country</label>
                <input
                  type="text"
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-full bg-[#F8F9FA] border border-stone-200 focus:outline-none focus:border-[#FF5B26]"
                />
              </div>
            </div>
          </div>

          {/* Payment Gateway Selector */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xl text-[#111827]">
                2. Select Payment Method
              </h3>
              <span className="flex items-center gap-1 text-[11px] text-stone-500 font-mono">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted</span>
              </span>
            </div>

            {/* Gateway Tabs */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentGateway('card')}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentGateway === 'card'
                    ? 'bg-[#111827] text-white border-[#111827] shadow-sm'
                    : 'bg-[#F8F9FA] text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#FF5B26]" />
                <span className="text-xs font-bold">Credit / Debit</span>
                <span className="text-[10px] opacity-75">Global Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentGateway('bkash')}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentGateway === 'bkash'
                    ? 'bg-[#E2136E] text-white border-[#C00E5C] shadow-sm'
                    : 'bg-[#FDF2F7] text-[#E2136E] border-[#F8CCD5] hover:bg-[#FCE7EB]'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  bK
                </div>
                <span className="text-xs font-bold">bKash</span>
                <span className="text-[10px] opacity-80">Instant MFS</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentGateway('nagad')}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentGateway === 'nagad'
                    ? 'bg-[#F7941D] text-white border-[#D87D10] shadow-sm'
                    : 'bg-[#FEF7EC] text-[#D87D10] border-[#FCE2C1] hover:bg-[#FDEFD9]'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  NG
                </div>
                <span className="text-xs font-bold">Nagad</span>
                <span className="text-[10px] opacity-80">Direct Wallet</span>
              </button>
            </div>

            {/* FORM 1: Credit Card */}
            {paymentGateway === 'card' && (
              <div className="space-y-4 pt-2 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-[#1C2920] text-white flex flex-col justify-between aspect-[2.6/1] shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-stone-300">
                    <span className="font-mono">CrateCraft Ritual Member</span>
                    <span className="font-bold tracking-wider text-[#E5A93C]">VISA / MASTERCARD</span>
                  </div>
                  <div className="font-mono text-lg tracking-widest text-stone-100">
                    {cardData.number}
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-300">
                    <span>{cardData.name}</span>
                    <span>EXP {cardData.expiry}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="col-span-2 space-y-1">
                    <label className="font-semibold text-stone-700">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F3EFE7] border border-[#DECFC0]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Expiry Date</label>
                    <input
                      type="text"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 rounded-xl bg-[#F3EFE7] border border-[#DECFC0]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Security CVV</label>
                    <input
                      type="password"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      placeholder="3 digits"
                      maxLength={4}
                      className="w-full px-3 py-2 rounded-xl bg-[#F3EFE7] border border-[#DECFC0]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FORM 2: bKash Payment Simulation */}
            {paymentGateway === 'bkash' && (
              <div className="bg-[#FFF4F7] p-5 rounded-2xl border-2 border-[#D12053]/30 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#D12053] text-white flex items-center justify-center font-bold text-xs">
                      bK
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#D12053]">bKash Seamless Gateway</h4>
                      <p className="text-[10px] text-stone-600">Enter your bKash mobile account number</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-xs text-[#D12053]">
                    {formatPrice(finalUSD, finalBDT)}
                  </span>
                </div>

                {bkashStep === 1 && (
                  <div className="space-y-3">
                    <div className="space-y-1 text-xs">
                      <label className="font-semibold text-stone-700 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#D12053]" />
                        <span>bKash Account Number</span>
                      </label>
                      <input
                        type="text"
                        value={bkashPhone}
                        onChange={(e) => setBkashPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#F4BAC7] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#D12053]/40"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setBkashStep(2);
                        setBkashOtp('482910');
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#D12053] hover:bg-[#B51743] text-white font-bold text-xs uppercase tracking-wide transition-colors"
                    >
                      Send Verification Code (OTP)
                    </button>
                  </div>
                )}

                {bkashStep === 2 && (
                  <div className="space-y-3">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between items-center">
                        <label className="font-semibold text-stone-700">Verification Code (SMS OTP)</label>
                        <span className="text-[10px] text-stone-500 font-mono">Demo OTP: 482910</span>
                      </div>
                      <input
                        type="text"
                        value={bkashOtp}
                        onChange={(e) => setBkashOtp(e.target.value)}
                        placeholder="6-digit OTP"
                        maxLength={6}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#F4BAC7] font-mono text-sm text-center tracking-widest"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setBkashStep(1)}
                        className="px-3 py-2 rounded-xl text-xs text-stone-600 bg-white border border-stone-200"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setBkashStep(3);
                          setBkashPin('•••••');
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-[#D12053] text-white font-bold text-xs uppercase"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </div>
                )}

                {bkashStep === 3 && (
                  <div className="space-y-3">
                    <div className="space-y-1 text-xs">
                      <label className="font-semibold text-stone-700 flex items-center gap-1">
                        <KeyRound className="w-3.5 h-3.5 text-[#D12053]" />
                        <span>bKash 5-Digit PIN</span>
                      </label>
                      <input
                        type="password"
                        value={bkashPin}
                        onChange={(e) => setBkashPin(e.target.value)}
                        placeholder="5-digit PIN"
                        maxLength={5}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#F4BAC7] font-mono text-sm text-center tracking-widest"
                      />
                      <span className="text-[10px] text-stone-500 block text-center">
                        Simulated secure sandbox PIN verification
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FORM 3: Nagad Payment Simulation */}
            {paymentGateway === 'nagad' && (
              <div className="bg-[#FFF9F2] p-5 rounded-2xl border-2 border-[#F7941D]/30 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#F7941D] text-white flex items-center justify-center font-bold text-xs">
                      NG
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#D87D10]">Nagad Digital Payment</h4>
                      <p className="text-[10px] text-stone-600">Enter Nagad Registered Account</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-xs text-[#D87D10]">
                    {formatPrice(finalUSD, finalBDT)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1 text-xs">
                    <label className="font-semibold text-stone-700">Nagad Account Number</label>
                    <input
                      type="text"
                      value={nagadPhone}
                      onChange={(e) => setNagadPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#FCD8A9] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#F7941D]/40"
                    />
                  </div>
                  <div className="space-y-1 text-xs">
                    <label className="font-semibold text-stone-700">Nagad 4-Digit PIN</label>
                    <input
                      type="password"
                      placeholder="••••"
                      maxLength={4}
                      defaultValue="7192"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#FCD8A9] font-mono text-center tracking-widest"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Discount Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF5B26]">
              Subscription Summary
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <h3 className="font-extrabold text-2xl text-[#111827]">
                {tier.name}
              </h3>
              <span className="text-xs font-bold font-mono text-[#111827] bg-[#F4F5F7] px-2.5 py-0.5 rounded-full">
                {tier.slots} slots
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Cadence: <strong className="capitalize text-stone-800">{selectedFrequency}</strong> delivery drops
            </p>
          </div>

          {/* Items In Box Mini-List */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {boxItems.map((item, idx) => (
              <div key={item.id} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span className="w-5 h-5 rounded-full bg-[#F4F5F7] text-stone-600 font-mono text-[10px] flex items-center justify-center shrink-0 font-bold">
                    {idx + 1}
                  </span>
                  <span className="truncate text-stone-800 font-medium">{item.name}</span>
                </div>
                <span className="font-mono text-stone-600 shrink-0">
                  {formatPrice(item.priceUSD, item.priceBDT)}
                </span>
              </div>
            ))}
          </div>

          {/* Points Loyalty Voucher */}
          <div className="bg-[#F8F9FA] p-3.5 rounded-2xl border border-stone-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FF5B26]" />
              <div>
                <span className="font-bold text-stone-800 block">Redeem CratePoints</span>
                <span className="text-[10px] text-stone-500">
                  Balance: {subscription.rewardPoints} pts
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleApplyPoints}
              className={`px-3 py-1.5 rounded-full font-bold text-xs transition-colors ${
                isPointsApplied
                  ? 'bg-[#111827] text-white'
                  : 'bg-white text-stone-800 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {isPointsApplied ? 'Redeemed (-850 pts)' : 'Apply 850 pts'}
            </button>
          </div>

          {/* Detailed Price Breakdown */}
          <div className="space-y-2.5 pt-3 border-t border-stone-100 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Provisions Subtotal</span>
              <span className="font-mono">{formatPrice(rawSubtotalUSD, rawSubtotalBDT)}</span>
            </div>

            <div className="flex justify-between text-[#FF5B26] font-medium">
              <span>Tier Discount ({tierDiscountPercent}%)</span>
              <span className="font-mono">
                -{formatPrice(rawSubtotalUSD * (tierDiscountPercent / 100), Math.round(rawSubtotalBDT * (tierDiscountPercent / 100)))}
              </span>
            </div>

            {freqDiscountPercent > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Frequency Reward ({freqDiscountPercent}%)</span>
                <span className="font-mono">
                  -{formatPrice(rawSubtotalUSD * (freqDiscountPercent / 100), Math.round(rawSubtotalBDT * (freqDiscountPercent / 100)))}
                </span>
              </div>
            )}

            {isPointsApplied && (
              <div className="flex justify-between text-purple-700 font-medium">
                <span>Loyalty Points Voucher</span>
                <span className="font-mono">
                  -{formatPrice(pointsDiscountUSD, pointsDiscountBDT)}
                </span>
              </div>
            )}

            <div className="flex justify-between text-stone-600">
              <span>Climate-Neutral Shipping</span>
              <span className="font-semibold text-emerald-700 uppercase text-[10px]">FREE</span>
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-baseline justify-between text-sm">
              <span className="font-extrabold text-[#111827]">Total Due Today</span>
              <span className="font-extrabold text-2xl text-[#111827]">
                {formatPrice(finalUSD, finalBDT)}
              </span>
            </div>
          </div>

          {/* Checkout Submit Button */}
          <button
            onClick={handleSubmitOrder}
            disabled={isProcessing || boxItems.length === 0}
            className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 ${
              isProcessing || boxItems.length === 0
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-[#FF5B26] hover:bg-[#E04D1D] text-white active:scale-95 shadow-orange-500/20'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authorizing {paymentGateway.toUpperCase()}...</span>
              </div>
            ) : (
              <>
                <Lock className="w-4 h-4 text-white" />
                <span>Confirm & Activate Drop ({formatPrice(finalUSD, finalBDT)})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
