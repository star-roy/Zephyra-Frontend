import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await axios.post("/api/v1/users/request-password-reset", { email });
      setMessage("Reset code sent to your email.");
      setTimeout(() => navigate("/reset-password?email=" + encodeURIComponent(email)), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent text-center">
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