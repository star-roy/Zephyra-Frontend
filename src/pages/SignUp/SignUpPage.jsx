import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
    <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/>
    <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/>
    <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/>
    <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 340.1 0 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h5.713c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z"/>
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
  const [isLoading, setIsLoading] = useState(false);
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

    // Validation
    if (!username.trim()) newErrors.username = "Username is required";
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password || password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!document.getElementById("terms").checked) newErrors.terms = "You must accept the terms";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append('username', username);
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      
      if (avatarFile) formData.append('avatar', avatarFile);
      if (coverImageFile) formData.append('coverImage', coverImageFile);

      // Send registration request to backend using axios
      const res = await axios.post('/api/v1/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log("Registration successful:", res.data);
      
      // Store email for verification
      localStorage.setItem('verificationEmail', email);
      
      // Show success message and redirect after a short delay
      const message = res.data?.data?.requiresVerification 
        ? "Account created successfully! Verification code sent to your email."
        : "Account created successfully! Verification code sent to your email.";
      
      setSuccessMessage(message);
      
      setTimeout(() => {
        navigate('/verify-email');
      }, 2000);
      
    } catch (err) {
      console.log("Registration error:", err);
      console.log("Error response:", err.response);
      
      if (err.response && err.response.data) {
        const errorMessage = err.response.data.message || "Registration failed";
        
        // Check if user is already registered and verified
        if (errorMessage.toLowerCase().includes('already exists') || 
            err.response.status === 409) {
          setShowAlreadyRegistered(true);
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setErrors({ general: errorMessage });
        }
      } else {
        setErrors({ general: "Network error. Please try again." });
      }
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/hero5.jpeg')" }}
    >
      {/* Already Registered Modal */}
      {showAlreadyRegistered && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 text-center transform animate-in fade-in duration-300">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Account Already Exists!</h3>
              <p className="text-gray-600">
                It looks like you already have an account with us. You'll be redirected to the login page.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/login')}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
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

      <main className="min-h-screen flex flex-col items-center justify-center py-8 sm:py-12 w-full">
        {/* Header */}
        <section className="text-center mb-6 sm:mb-10 max-w-3xl px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-4">
            Join the Adventure!
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#2C3E50] font-medium">
            Discover hidden gems and connect with your city.
          </p>
        </section>

        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto bg-white/60 backdrop-blur-lg ring-1 ring-white/10 border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] p-4 sm:p-6 lg:p-8 rounded-2xl">
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {errors.general}
            </div>
          )}
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#2C3E50] mb-1.5">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="e.g. cityexplorer24"
                id="username"
                required
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2]/50 focus:border-[#4A90E2] transition"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#2C3E50] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                id="fullName"
                required
                autoComplete="off"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2]/50 focus:border-[#4A90E2] transition"
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2C3E50] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                id="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2]/50 focus:border-[#4A90E2] transition"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2C3E50] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="********"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2]/50 focus:border-[#4A90E2] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#2C3E50]"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 pl-1">
                Must be at least 8 characters long.
              </p>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2C3E50] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="********"
                  required
                  autoComplete="off"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2]/50 focus:border-[#4A90E2] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#2C3E50]"
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Avatar (Profile Photo) */}
            <div className="relative">
              <label htmlFor="avatar" className="block text-sm font-medium text-[#2C3E50] mb-1.5">
                Profile Photo (Avatar)
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  required
                  ref={avatarInputRef}
                  onChange={handleAvatarChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2]/50 focus:border-[#4A90E2] transition"
                />
                {avatarFile && (
                  <button
                    type="button"
                    onClick={handleDeleteAvatar}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                    title="Remove"
                  >
                    <CrossIcon />
                  </button>
                )}
              </div>
              {avatarFile && (
                <div className="flex items-center mt-2">
                  <span className="text-xs text-[#2C3E50] mr-2 truncate">{avatarFile.name}</span>
                </div>
              )}
            </div>

            {/* Cover Image */}
            <div className="relative">
              <label htmlFor="coverImage" className="block text-sm font-medium text-[#2C3E50] mb-1.5">
                Cover Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  accept="image/*"
                  required
                  ref={coverImageInputRef}
                  onChange={handleCoverImageChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2]/50 focus:border-[#4A90E2] transition"
                />
                {coverImageFile && (
                  <button
                    type="button"
                    onClick={handleDeleteCoverImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                    title="Remove"
                  >
                    <CrossIcon />
                  </button>
                )}
              </div>
              {coverImageFile && (
                <div className="flex items-center mt-2">
                  <span className="text-xs text-[#2C3E50] mr-2 truncate">{coverImageFile.name}</span>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start pt-2">
              <input type="checkbox" id="terms" className="h-4 w-4 mt-0.5 text-[#4A90E2] border-gray-300 rounded flex-shrink-0" />
              <label htmlFor="terms" className="ml-2 text-xs sm:text-sm text-[#2C3E50]">
                I agree to the{" "}
                <a href="#" className="font-medium text-[#4A90E2] hover:underline">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="font-medium text-[#4A90E2] hover:underline">Privacy Policy</a>.
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-xs mt-1 pl-6">{errors.terms}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}          
              className="shine-sweep w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md text-sm sm:text-base"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="flex items-center my-4 sm:my-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 text-xs sm:text-sm text-gray-600">Or sign up with</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button className="shine-sweep w-full flex items-center justify-center bg-white border border-gray-300 text-[#2C3E50] font-semibold py-2.5 sm:py-3 rounded-lg hover:bg-gray-50 transition">
              <GoogleIcon />
              <span className="text-xs sm:text-sm">Signup with Google</span>
            </button>
            <button className="shine-sweep w-full flex items-center justify-center bg-white border border-gray-300 text-[#2C3E50] font-semibold py-2.5 sm:py-3 rounded-lg hover:bg-gray-50 transition">
              <FacebookIcon />
              <span className="text-xs sm:text-sm">Signup with Facebook</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignUpPage;