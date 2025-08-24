import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, resendVerificationCode, clearError } from "../features/authSlice";

export default function VerifyEmail({ onVerify }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [successMessage, setSuccessMessage] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading, error, registrationEmail } = useSelector((state) => state.auth);
  const [isResending, setIsResending] = useState(false);


  const handleChange = (value, idx) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);


    if (value && idx < 3) {
      inputsRef.current[idx + 1].focus();
    }

    if (!value && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
    if (e.key === "ArrowRight" && idx < 3) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (paste.length === 4) {
      setOtp(paste.split(""));
      inputsRef.current[3].focus();
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.join("").length !== 4) {
      return;
    }
    
    dispatch(clearError());
    
    try {
      // Get email from localStorage or URL params (stored during registration)
      const email = registrationEmail || localStorage.getItem('verificationEmail') || new URLSearchParams(window.location.search).get('email');
      
      if (!email) {
        return;
      }

      const result = await dispatch(verifyEmail({ 
        email: email, 
        verificationCode: otp.join("") 
      }));

      if (verifyEmail.fulfilled.match(result)) {
        // Clear stored email
        localStorage.removeItem('verificationEmail');
        
        // Show success message
        setSuccessMessage("Email verified successfully! Redirecting to home...");
        
        // Redirect to home page on successful verification after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error("Verification error:", error);
    }

    if (onVerify) onVerify(otp.join(""));
  };

  // Handle resend OTP
  const handleResend = async () => {
    setIsResending(true);
    setResendSuccess("");
    
    try {
      const email = registrationEmail || localStorage.getItem('verificationEmail') || new URLSearchParams(window.location.search).get('email');
      
      if (!email) {
        setIsResending(false);
        return;
      }

      const result = await dispatch(resendVerificationCode(email));

      if (resendVerificationCode.fulfilled.match(result)) {
        setResendSuccess("Verification code sent successfully to your email!");
    
        setTimeout(() => {
          setResendSuccess("");
        }, 3000);
      }
    } catch (error) {
      console.error("Resend error:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      {successMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9998] w-full max-w-md px-4">
          <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-in slide-in-from-top duration-300">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-sm sm:text-base font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {resendSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9998] w-full max-w-md px-4">
          <div className="bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-in slide-in-from-top duration-300">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <p className="text-sm sm:text-base font-medium">{resendSuccess}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center">
        <div className="mb-6 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center">Verify Your Email</h2>
          <p className="text-sm sm:text-base text-gray-600 text-center px-2">
            Enter the 4-digit code sent to your email address.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div className="flex space-x-3 sm:space-x-4 mb-6">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                ref={(el) => (inputsRef.current[idx] = el)}
                value={otp[idx]}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={idx === 0 ? handlePaste : undefined}
                className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition bg-gray-50"
                aria-label={`OTP digit ${idx + 1}`}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm w-full text-center">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="shine-sweep w-full py-2.5 sm:py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 text-white text-base sm:text-lg transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm sm:text-base text-gray-500 mb-2">
            Didn't receive a code?
          </p>
          <button 
            onClick={handleResend}
            disabled={isResending}
            className="text-blue-500 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isResending ? "Resending..." : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
}