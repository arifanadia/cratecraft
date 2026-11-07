'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode,
    login,
    register,
    isLoadingAuth,
    showToast
  } = useApp();

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRemember, setLoginRemember] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regDietary, setRegDietary] = useState('Specialty Coffee & Organic');
  const [regAgreeTerms, setRegAgreeTerms] = useState(true);
  const [regError, setRegError] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        setIsAuthModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  // Reset errors when mode changes
  useEffect(() => {
    setLoginError(null);
    setRegError(null);
  }, [authModalMode]);

  if (!isAuthModalOpen) return null;

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: 'None', color: 'bg-stone-200' };
    if (pwd.length < 6) return { score: 1, label: 'Too short', color: 'bg-red-400' };
    let score = 1;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd) && pwd.length >= 8) score++;

    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-400' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-emerald-400' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-600' };
  };

  const strength = getPasswordStrength(regPassword);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginEmail.trim()) {
      setLoginError('Please enter your email address.');
      return;
    }
    if (!loginPassword) {
      setLoginError('Please enter your password.');
      return;
    }

    const res = await login({
      email: loginEmail,
      password: loginPassword,
      rememberMe: loginRemember,
    });

    if (!res.success) {
      setLoginError(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regName.trim()) {
      setRegError('Please provide your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError('Please enter a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password must contain at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }
    if (!regAgreeTerms) {
      setRegError('Please accept the membership terms and conditions.');
      return;
    }

    const res = await register({
      name: regName,
      email: regEmail,
      password: regPassword,
      phone: regPhone,
      dietaryPreference: regDietary,
    });

    if (!res.success) {
      setRegError(res.error || 'Registration failed. Please try another email.');
    }
  };

  // Demo fill helper
  const fillDemoAccount = (account: 'emir' | 'sophia') => {
    if (account === 'emir') {
      setLoginEmail('emir@cratecraft.com');
      setLoginPassword('password123');
    } else {
      setLoginEmail('sophia@example.com');
      setLoginPassword('password123');
    }
    setLoginError(null);
  };

  const handleForgotPassword = () => {
    showToast(
      'Password Reset Link Sent',
      `A password reset verification email has been dispatched to ${loginEmail || 'your email'}. Check your inbox.`,
      'info'
    );
  };

  const handleSocialLogin = (provider: string) => {
    // Quick demo social sign in
    showToast(
      `${provider} Authentication`,
      `Signed in securely using your ${provider} account. Welcome to CrateCraft!`,
      'success'
    );
    login({
      email: 'emir@cratecraft.com',
      password: 'password123',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Close Button */}
        <div className="relative bg-gradient-to-br from-[#111827] via-[#1a2333] to-[#111827] text-white p-6 sm:p-8">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF5B26] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF5B26]">
              CrateCraft Ritual Sanctuary
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {authModalMode === 'login' ? 'Welcome Back' : 'Join CrateCraft'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-sm">
            {authModalMode === 'login' 
              ? 'Access your curated monthly ritual box, swap items, and track doorstep deliveries.'
              : 'Create your account to curate bespoke harvest boxes, earn reward points, and support artisan farms.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center mt-6 p-1 bg-neutral-900/80 rounded-2xl border border-neutral-700/60 max-w-xs">
            <button
              type="button"
              onClick={() => setAuthModalMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                authModalMode === 'login'
                  ? 'bg-[#FF5B26] text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthModalMode('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                authModalMode === 'register'
                  ? 'bg-[#FF5B26] text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick Demo Credentials Banner (For easy user testing) */}
          <div className="bg-[#F8F9FA] border border-stone-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs">⚡</span>
              <div>
                <p className="text-xs font-bold text-[#111827]">Quick Demo Logins</p>
                <p className="text-[11px] text-stone-500">Test login immediately with 1-click</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  fillDemoAccount('emir');
                }}
                className="flex-1 sm:flex-none text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white border border-stone-300 hover:border-[#FF5B26] hover:text-[#FF5B26] text-stone-700 transition-colors shadow-2xs"
              >
                Emir (Curated)
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  fillDemoAccount('sophia');
                }}
                className="flex-1 sm:flex-none text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white border border-stone-300 hover:border-[#FF5B26] hover:text-[#FF5B26] text-stone-700 transition-colors shadow-2xs"
              >
                Sophia (Sanctuary)
              </button>
            </div>
          </div>

          {/* MODE 1: SIGN IN FORM */}
          {authModalMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FA] border border-stone-200 rounded-2xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5B26]/30 focus:border-[#FF5B26] transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] font-semibold text-[#FF5B26] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#F8F9FA] border border-stone-200 rounded-2xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5B26]/30 focus:border-[#FF5B26] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600"
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={loginRemember}
                    onChange={(e) => setLoginRemember(e.target.checked)}
                    className="rounded text-[#FF5B26] focus:ring-[#FF5B26] h-4 w-4 border-stone-300"
                  />
                  <span className="text-xs text-stone-600">Remember me for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoadingAuth}
                className="w-full py-3 px-4 rounded-2xl bg-[#111827] hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {isLoadingAuth ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in to Sanctuary...
                  </span>
                ) : (
                  <>
                    <span>Sign In to CrateCraft</span>
                    <ArrowRight className="w-4 h-4 text-[#FF5B26]" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative py-2 flex items-center justify-center">
                <div className="border-t border-stone-200 w-full" />
                <span className="bg-white px-3 text-[11px] uppercase font-bold text-stone-400 absolute">
                  or continue with
                </span>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border border-stone-200 hover:bg-stone-50 text-xs font-bold text-stone-700 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border border-stone-200 hover:bg-stone-50 text-xs font-bold text-stone-700 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current text-[#111827]" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.62-.75 1.04-1.8 0.93-2.86-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.74 1.01.08 2.02-.48 2.63-1.23z" />
                  </svg>
                  <span>Apple ID</span>
                </button>
              </div>

              {/* Bottom prompt to register */}
              <div className="text-center pt-2">
                <span className="text-xs text-stone-500">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthModalMode('register')}
                    className="font-bold text-[#FF5B26] hover:underline"
                  >
                    Create Account
                  </button>
                </span>
              </div>
            </form>
          )}

          {/* MODE 2: REGISTRATION FORM */}
          {authModalMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {regError && (
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{regError}</span>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Maya Chen"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FA] border border-stone-200 rounded-2xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5B26]/30 focus:border-[#FF5B26] transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="maya@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FA] border border-stone-200 rounded-2xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5B26]/30 focus:border-[#FF5B26] transition-all"
                  />
                </div>
              </div>

              {/* Phone (Optional) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 flex items-center justify-between">
                  <span>Phone Number</span>
                  <span className="text-[10px] font-normal text-stone-400">Optional for SMS drop alerts</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+880 1700-000000"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FA] border border-stone-200 rounded-2xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5B26]/30 focus:border-[#FF5B26] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Create Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#F8F9FA] border border-stone-200 rounded-2xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5B26]/30 focus:border-[#FF5B26] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600"
                    aria-label={showRegPassword ? 'Hide password' : 'Show password'}
                  >
                    {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {regPassword && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-stone-500 font-medium">Strength:</span>
                      <span className="font-bold text-stone-700">{strength.label}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden flex gap-1">
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 1 ? strength.color : 'bg-transparent'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 2 ? strength.color : 'bg-stone-200'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 3 ? strength.color : 'bg-stone-200'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 4 ? strength.color : 'bg-stone-200'}`} />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#F8F9FA] border border-stone-200 rounded-2xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5B26]/30 focus:border-[#FF5B26] transition-all"
                  />
                  {regConfirmPassword && regConfirmPassword === regPassword && (
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-500">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* Ritual / Dietary Focus Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Preferred Ritual Specialty
                </label>
                <select
                  value={regDietary}
                  onChange={(e) => setRegDietary(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-stone-200 rounded-2xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5B26]/30 focus:border-[#FF5B26] transition-all"
                >
                  <option value="Specialty Coffee & Organic">Specialty Coffee & Organic Pantry</option>
                  <option value="Ceremonial Matcha & Botanicals">Ceremonial Matcha & High-Mountain Teas</option>
                  <option value="Plant-Based & Superfoods">100% Plant-Based & Superfoods</option>
                  <option value="Artisanal Honey & Dark Chocolates">Raw Wild Harvest Honeys & Chocolates</option>
                  <option value="Mindful Apothecary & Rituals">Mindful Apothecary & Self-Care</option>
                </select>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={regAgreeTerms}
                  onChange={(e) => setRegAgreeTerms(e.target.checked)}
                  className="rounded text-[#FF5B26] focus:ring-[#FF5B26] h-4 w-4 border-stone-300 mt-0.5"
                />
                <label htmlFor="agree-terms" className="text-[11px] text-stone-500 cursor-pointer leading-relaxed">
                  I agree to the CrateCraft Membership Terms, 100% Zero-Waste Ritual Pledge, and receive 100 bonus Ritual Points upon joining.
                </label>
              </div>

              {/* Submit Registration */}
              <button
                type="submit"
                disabled={isLoadingAuth}
                className="w-full py-3 px-4 rounded-2xl bg-[#FF5B26] hover:bg-[#e04815] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {isLoadingAuth ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Sanctuary Account...
                  </span>
                ) : (
                  <>
                    <span>Create Free Account & Claim 100 Points</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Bottom prompt to login */}
              <div className="text-center pt-2">
                <span className="text-xs text-stone-500">
                  Already have a CrateCraft membership?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthModalMode('login')}
                    className="font-bold text-[#FF5B26] hover:underline"
                  >
                    Sign In
                  </button>
                </span>
              </div>
            </form>
          )}

          {/* Secure Trust Badge */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-center gap-2 text-stone-400 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted Ritual Data • Fair Trade Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
