import React, { useState } from "react";

const EyeIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
    <path fill="#4285f4" d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" />
    <path fill="#34a853" d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" />
    <path fill="#fbbc04" d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" />
    <path fill="#ea4335" d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 340.1 0 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h5.713c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z" />
  </svg>
);

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/hero1.png')" }}
    >
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg -mt-8">
        {/* Header */}
        <section className="text-center mb-8 px-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0D1B2A] mb-2 drop-shadow-sm">
            Welcome Back!
          </h1>
          <p className="text-lg text-[#2C3E50] font-medium">
            Your next adventure awaits.
          </p>
        </section>

        {/* Login Card */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/30 ring-1 ring-white/10 shadow-2xl p-6 sm:p-8 rounded-2xl w-full animate-fadeIn">
          <form className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2C3E50] mb-1.5">
                Email or Username
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/90 focus:ring-2 focus:ring-[#4A90E2]/60 focus:border-[#4A90E2] transition-all duration-200 placeholder-gray-400"
                placeholder="Enter your email or username"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2C3E50] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white/90 focus:ring-2 focus:ring-[#4A90E2]/60 focus:border-[#4A90E2] transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5 text-gray-400 hover:text-[#2C3E50] transition-colors duration-150" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-400 hover:text-[#2C3E50] transition-colors duration-150" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-[#2C3E50]">
                <input
                  type="checkbox"
                  className="h-4 w-4 mr-2 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
                />
                Remember me
              </label>
              <a href="#" className="font-medium text-[#2C3E50] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="shine-sweep w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 animate-bounce-once"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-sm text-gray-500 bg-white/80 px-2 rounded-full">Or continue with</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-[#2C3E50] font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all duration-150 shadow-sm">
              <GoogleIcon />
              Google
            </button>
            <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-[#2C3E50] font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all duration-150 shadow-sm">
              <FacebookIcon />
              Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-[#2C3E50] mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="font-bold text-[#4A90E2] hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both; }
        @keyframes bounceOnce {
          0% { transform: scale(1); }
          20% { transform: scale(1.08); }
          40% { transform: scale(0.97); }
          60% { transform: scale(1.03); }
          80% { transform: scale(0.99); }
          100% { transform: scale(1); }
        }
        .animate-bounce-once { animation: bounceOnce 0.7s 1; }
      `}</style>
    </div>
  );
}

export default LoginPage;
