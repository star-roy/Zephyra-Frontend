import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearError } from "../features/authSlice";

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

function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const initialEmail = query.get("email") || "";
  const [email, setEmail] = useState(initialEmail);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { loading, error } = useSelector((state) => state.auth);


  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    dispatch(clearError());
    
    try {
      const result = await dispatch(resetPassword({
        email,
        resetCode,
        newPassword,
        confirmPassword,
      }));
      
      if (resetPassword.fulfilled.match(result)) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("Reset password error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent text-center">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Enter the reset code sent to your email and set a new password.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition bg-gray-50 text-base"
            autoFocus
          />
          <input
            type="text"
            placeholder="Reset code"
            value={resetCode}
            onChange={e => setResetCode(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition bg-gray-50 text-base"
          />
          <div className="relative flex flex-col">
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition bg-gray-50 text-base pr-12"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute top-1/2 right-3 -translate-y-1/2 p-1 rounded-md hover:bg-blue-50 focus:bg-blue-100 focus:outline-none transition-colors"
                onClick={() => setShowNewPassword((show) => !show)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <EyeOffIcon className="w-5 h-5 text-blue-500 hover:text-blue-600" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-600" />
                )}
              </button>
            </div>
            <div className="mt-1 text-xs text-gray-400 px-1">
              Must be at least 8 characters long.
            </div>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition bg-gray-50 text-base pr-12"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-1 rounded-md hover:bg-blue-50 focus:bg-blue-100 focus:outline-none transition-colors"
              onClick={() => setShowConfirmPassword((show) => !show)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="w-5 h-5 text-blue-500 hover:text-blue-600" />
              ) : (
                <EyeIcon className="w-5 h-5 text-blue-500 hover:text-blue-600" />
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="shine-sweep w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 text-white text-lg transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {message && (
          <div className="mt-6 w-full text-center text-green-600 font-medium text-base animate-fade-in">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-6 w-full text-center text-red-500 font-medium text-base animate-fade-in">
            {error}
          </div>
        )}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <span>Remembered your password?</span>{" "}
          <button
            className="text-blue-500 font-semibold hover:underline"
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;