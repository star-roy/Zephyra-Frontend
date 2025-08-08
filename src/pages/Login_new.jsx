import React, { useState } from "react";

const EyeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent text-center">
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Your next adventure awaits.
        </p>
        
        <form className="w-full flex flex-col gap-5">
          {/* Email */}
          <input
            type="email"
            placeholder="Email or username"
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition bg-gray-50 text-base"
            autoFocus
          />
          
          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition bg-gray-50 text-base pr-12"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-1 rounded-md hover:bg-blue-50 focus:bg-blue-100 focus:outline-none transition-colors"
              onClick={() => setShowPassword((show) => !show)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5 text-blue-500 hover:text-blue-600" />
              ) : (
                <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-600" />
              )}
            </button>
          </div>
          
          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 mr-2 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
              />
              Remember me
            </label>
            <a href="/forgot-password" className="font-medium text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          
          {/* Submit */}
          <button
            type="submit"
            className="shine-sweep w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 text-white text-lg transition hover:scale-105"
          >
            Login
          </button>
        </form>
        
        {/* Divider */}
        <div className="flex items-center my-6 w-full">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-sm text-gray-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        
        {/* Social Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button className="shine-sweep flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition shadow-sm">
            <GoogleIcon />
            Google
          </button>
          <button className="shine-sweep flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition shadow-sm">
            <FacebookIcon />
            Facebook
          </button>
        </div>
        
        {/* Sign Up Link */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <span>Don't have an account?</span>{" "}
          <a
            href="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
