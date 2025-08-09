import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearError } from "../features/authSlice";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    dispatch(clearError());
    
    try {
      const result = await dispatch(forgotPassword(email));
      
      if (forgotPassword.fulfilled.match(result)) {
        setMessage("Reset code sent to your email.");
        setTimeout(() => navigate("/reset-password?email=" + encodeURIComponent(email)), 2000);
      }
    } catch (err) {
      console.error("Forgot password error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent text-center pb-2">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Enter your email address and we'll send you a code to reset your password.
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
          <button
            type="submit"
            disabled={loading}
            className="shine-sweep w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 text-white text-lg transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Code"}
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

export default ForgotPasswordPage;