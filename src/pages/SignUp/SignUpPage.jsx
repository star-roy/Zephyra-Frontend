import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError, setRegistrationEmail } from "../../features/authSlice";

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

const CrossIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: authError } = useSelector((state) => state.auth);
  
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showAlreadyRegistered, setShowAlreadyRegistered] = useState(false);

  const avatarInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files && e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImageFile(e.target.files && e.target.files[0]);
  };

  const handleDeleteAvatar = () => {
    setAvatarFile(null);
    if (avatarInputRef.current) avatarInputRef.current.value = "";
  };

  const handleDeleteCoverImage = () => {
    setCoverImageFile(null);
    if (coverImageInputRef.current) coverImageInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password || password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!avatarFile) newErrors.avatar = "Profile photo is required";
    if (!coverImageFile) newErrors.coverImage = "Cover image is required";
    if (!document.getElementById("terms").checked) newErrors.terms = "You must accept the terms";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    dispatch(clearError());
    setErrors({});
    
    try {
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append('username', username);
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('avatar', avatarFile);
      formData.append('coverImage', coverImageFile);

      const result = await dispatch(registerUser(formData));
      
      if (registerUser.fulfilled.match(result)) {
        dispatch(setRegistrationEmail(email));
        setSuccessMessage("Registration successful! Please check your email for verification.");
        setTimeout(() => {
          navigate("/verify-email");
        }, 2000);
      } else if (registerUser.rejected.match(result)) {
        const errorMsg = result.payload || result.error?.message || "";
        
        if (
          errorMsg.toLowerCase().includes("already exists") ||
          errorMsg.toLowerCase().includes("already registered") ||
          errorMsg.toLowerCase().includes("user already exists") ||
          errorMsg.toLowerCase().includes("email already exists") ||
          errorMsg.toLowerCase().includes("username already exists") ||
          errorMsg.toLowerCase().includes("username or email already exists") ||
          errorMsg.toLowerCase().includes("duplicate") ||
          errorMsg.toLowerCase().includes("conflict")
        ) {
          // Clear Redux error since we're showing the modal instead
          dispatch(clearError());
          setShowAlreadyRegistered(true);
          // Remove auto-redirect - let user choose
        } else {
          setErrors({ general: errorMsg || "Registration failed. Please try again." });
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
      setErrors({ general: "Registration failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      {showAlreadyRegistered && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 text-center transform animate-in fade-in duration-300">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Username or Email Already Exists!</h3>
              <p className="text-gray-600">
                The username or email you entered is already registered. Would you like to login with this account or try different details?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/login')}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition"
              >
                Go to Login
              </button>
              <button
                onClick={() => setShowAlreadyRegistered(false)}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition"
              >
                Try Different Details
              </button>
            </div>
          </div>
        </div>
      )}

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

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent text-center">
          Join the Adventure!
        </h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Discover hidden gems and connect with your city.
        </p>

        {(errors.general || authError) && (
          <div className="mb-6 w-full text-center text-red-500 font-medium text-base animate-fade-in">
            {errors.general || authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition bg-gray-50 text-base"
          />
          {errors.username && <p className="text-red-500 text-xs -mt-2">{errors.username}</p>}

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition bg-gray-50 text-base"
          />
          {errors.fullName && <p className="text-red-500 text-xs -mt-2">{errors.fullName}</p>}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition bg-gray-50 text-base"
          />
          {errors.email && <p className="text-red-500 text-xs -mt-2">{errors.email}</p>}

          <div className="relative flex flex-col">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="mt-1 text-xs text-gray-400 px-1">
              Must be at least 8 characters long.
            </div>
          </div>
          {errors.password && <p className="text-red-500 text-xs -mt-2">{errors.password}</p>}

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          {errors.confirmPassword && <p className="text-red-500 text-xs -mt-2">{errors.confirmPassword}</p>}

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              required
              ref={avatarInputRef}
              onChange={handleAvatarChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition bg-gray-50 text-base file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {avatarFile && (
              <button
                type="button"
                onClick={handleDeleteAvatar}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                title="Remove"
              >
                <CrossIcon className="w-5 h-5" />
              </button>
            )}
            <div className="mt-1 text-xs text-gray-400 px-1">
              Profile photo (required)
            </div>
          </div>
          {errors.avatar && <p className="text-red-500 text-xs -mt-2">{errors.avatar}</p>}

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              required
              ref={coverImageInputRef}
              onChange={handleCoverImageChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition bg-gray-50 text-base file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {coverImageFile && (
              <button
                type="button"
                onClick={handleDeleteCoverImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                title="Remove"
              >
                <CrossIcon className="w-5 h-5" />
              </button>
            )}
            <div className="mt-1 text-xs text-gray-400 px-1">
              Cover image (required)
            </div>
          </div>
          {errors.coverImage && <p className="text-red-500 text-xs -mt-2">{errors.coverImage}</p>}

          <div className="flex items-start pt-2">
            <input type="checkbox" id="terms" className="h-4 w-4 mt-0.5 text-blue-500 border-gray-300 rounded flex-shrink-0" />
            <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
              I agree to the{" "}
              <Link to="/terms" className="font-medium text-blue-500 hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link to="/privacy" className="font-medium text-blue-500 hover:underline">Privacy Policy</Link>.
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-xs mt-1 pl-6">{errors.terms}</p>}

          <button
            type="submit"
            disabled={loading}          
            className="shine-sweep w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 text-white text-lg transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="flex items-center my-6 w-full">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">Or sign up with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button 
            disabled
            className="flex-1 flex items-center justify-center bg-gray-100 border border-gray-200 text-gray-400 font-medium py-3 rounded-lg cursor-not-allowed shadow-sm"
            title="OAuth not configured"
          >
            <GoogleIcon />
            Google
          </button>
          <button 
            disabled
            className="flex-1 flex items-center justify-center bg-gray-100 border border-gray-200 text-gray-400 font-medium py-3 rounded-lg cursor-not-allowed shadow-sm"
            title="OAuth not configured"
          >
            <FacebookIcon />
            Facebook
          </button>
        </div>

        {/* OAuth Notice */}
        <div className="mt-2 text-xs text-gray-500 text-center">
          <span>OAuth registration is currently unavailable. Please use manual registration.</span>
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center">
          <span>Already have an account?</span>{" "}
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

export default SignUpPage;
