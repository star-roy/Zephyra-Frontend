import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../features/authSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: authError } = useSelector((state) => state.auth);
  
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);
  const [showUnverifiedAccount, setShowUnverifiedAccount] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!emailOrUsername.trim()) {
      newErrors.emailOrUsername = "Email or username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    dispatch(clearError());
    setErrors({});

    try {
      // Determine if input is email or username
      const isEmail = emailOrUsername.includes('@');
      const loginData = isEmail 
        ? { email: emailOrUsername, password }
        : { username: emailOrUsername, password };

      const result = await dispatch(loginUser(loginData));
      
      if (loginUser.fulfilled.match(result)) {
        // Check if account is verified
        if (result.payload.user.accountVerified) {
          // Successful login - redirect to home (which will show logged-in version)
          navigate("/");
        } else {
          // Account not verified - show modal
          setShowUnverifiedAccount(true);
        }
      } else if (loginUser.rejected.match(result)) {
        const errorMsg = result.payload || result.error?.message || "";
        
        // Check if it's invalid credentials
        if (
          errorMsg.toLowerCase().includes("invalid credentials") ||
          errorMsg.toLowerCase().includes("invalid email or password") ||
          errorMsg.toLowerCase().includes("incorrect password") ||
          errorMsg.toLowerCase().includes("user not found") ||
          errorMsg.toLowerCase().includes("wrong password")
        ) {
          dispatch(clearError());
          setShowInvalidCredentials(true);
        } else if (
          errorMsg.toLowerCase().includes("not verified") ||
          errorMsg.toLowerCase().includes("verify your email") ||
          errorMsg.toLowerCase().includes("account not verified")
        ) {
          dispatch(clearError());
          setShowUnverifiedAccount(true);
        } else {
          // Handle other login errors
          setErrors({ general: errorMsg || "Login failed. Please try again." });
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ general: "Login failed. Please try again." });
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {/* Invalid Credentials Modal */}
      {showInvalidCredentials && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 text-center transform animate-in fade-in duration-300">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Invalid Credentials</h3>
              <p className="text-gray-600">
                The email or password you entered is incorrect. Please check your credentials and try again.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowInvalidCredentials(false)}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/forgot-password')}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unverified Account Modal */}
      {showUnverifiedAccount && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 text-center transform animate-in fade-in duration-300">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Verification Required</h3>
              <p className="text-gray-600">
                Your account exists but hasn't been verified yet. Please check your email for the verification code.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/verify-email')}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition"
              >
                Verify Email
              </button>
              <button
                onClick={() => setShowUnverifiedAccount(false)}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent text-center">
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Your next adventure awaits.
        </p>

        {(errors.general || authError) && (
          <div className="mb-6 w-full text-center text-red-500 font-medium text-base animate-fade-in">
            {errors.general || authError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* Email or Username */}
          <div>
            <input
              type="text"
              placeholder="Email or username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition bg-gray-50 text-base"
              autoFocus
            />
            {errors.emailOrUsername && <p className="text-red-500 text-xs mt-1">{errors.emailOrUsername}</p>}
          </div>
          
          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
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
            <div className="mt-1 text-xs text-gray-400 px-1">
              Must be at least 8 characters long.
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
            <Link to="/forgot-password" className="font-medium text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="shine-sweep w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 text-white text-lg transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
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
          <button
            className="text-blue-500 font-semibold hover:underline"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
