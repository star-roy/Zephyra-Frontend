import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft, FaLock, FaCheck } from "react-icons/fa";
import { changeCurrentPassword, clearError } from "../../features/authSlice";

export default function ChangePasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters long";
    }

    if (!formData.confirmNewPassword) {
      errors.confirmNewPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match";
    }

    if (formData.currentPassword === formData.newPassword) {
      errors.newPassword = "New password must be different from current password";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await dispatch(changeCurrentPassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword
      })).unwrap();
      
      setSuccess(true);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      

      setTimeout(() => {
        navigate("/settings");
      }, 2000);
    } catch {
      // Error is handled by Redux
    }
  };

  const handleBack = () => {
    dispatch(clearError());
    navigate("/settings");
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zephyraLite to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheck className="text-green-600 text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-midnightIndigo mb-2">Password Changed Successfully!</h1>
            <p className="text-zephyraBlue mb-4">
              Your password has been updated successfully. You will be redirected to settings.
            </p>
            <div className="animate-pulse text-sm text-gray-500">Redirecting...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zephyraLite to-white p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-zephyraBlue hover:text-zephyraDark transition-colors mr-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Settings
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-zephyraLite rounded-full flex items-center justify-center mr-4">
                <FaLock className="text-zephyraBlue text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-midnightIndigo">Change Password</h1>
                <p className="text-zephyraBlue">Update your account password</p>
              </div>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-midnightIndigo mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.currentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-zephyraBlue focus:border-transparent transition-colors ${
                      validationErrors.currentPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("currentPassword")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.currentPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {validationErrors.currentPassword && (
                  <p className="text-red-600 text-xs mt-1">{validationErrors.currentPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-midnightIndigo mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-zephyraBlue focus:border-transparent transition-colors ${
                      validationErrors.newPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("newPassword")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {validationErrors.newPassword && (
                  <p className="text-red-600 text-xs mt-1">{validationErrors.newPassword}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-midnightIndigo mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirmNewPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-zephyraBlue focus:border-transparent transition-colors ${
                      validationErrors.confirmNewPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmNewPassword")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {validationErrors.confirmNewPassword && (
                  <p className="text-red-600 text-xs mt-1">{validationErrors.confirmNewPassword}</p>
                )}
              </div>

              <div className="bg-zephyraLite rounded-lg p-4">
                <h3 className="font-medium text-midnightIndigo mb-2">Password Security Tips:</h3>
                <ul className="text-sm text-zephyraBlue space-y-1">
                  <li>• Use a combination of letters, numbers, and symbols</li>
                  <li>• Avoid using personal information</li>
                  <li>• Don't reuse passwords from other accounts</li>
                  <li>• Consider using a password manager</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-zephyraBlue text-white font-medium rounded-lg hover:bg-zephyraDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Changing Password...
                    </div>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
