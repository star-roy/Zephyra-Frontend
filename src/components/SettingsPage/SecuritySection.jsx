import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserSettings, updateUserSettings } from "../../features/userSlice";

export default function SecuritySection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { preferences, loading } = useSelector(state => state.user);
  
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  useEffect(() => {
    try {
      dispatch(getUserSettings());
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      if (preferences) {
        setTwoFactorAuth(preferences.twoFactorAuth || false);
      }
    } catch (error) {
      console.error('Failed to set preferences:', error);
    }
  }, [preferences]);

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleToggle2FA = async () => {
    try {
      const newValue = !twoFactorAuth;
      await dispatch(updateUserSettings({
        security: {
          twoFactorAuth: newValue
        }
      })).unwrap();
      setTwoFactorAuth(newValue);
    } catch (error) {
      console.error('Failed to update 2FA setting:', error);
    }
  };

  return (
    <section className="bg-white rounded-xl border border-gray-200 mb-8 p-6">
      <h2 className="text-lg font-semibold text-midnightIndigo mb-1">Security</h2>
      <p className="text-sm text-zephyraBlue mb-5">
        Manage your account's security.
      </p>
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="font-medium text-midnightIndigo">Change Password</div>
          <div className="text-xs text-zephyraBlue">
            It's a good idea to use a strong password that you're not using elsewhere.
          </div>
        </div>
        <button 
          onClick={handleChangePassword}
          className="text-zephyraBlue font-semibold px-4 py-2 rounded-lg hover:bg-zephyraLite transition"
        >
          &gt;
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-midnightIndigo">Two-Factor Authentication (2FA)</div>
          <div className="text-xs text-zephyraBlue">
            Add an extra layer of security to your account.
          </div>
        </div>
        <button 
          onClick={handleToggle2FA}
          disabled={loading}
          className={`font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50 ${
            twoFactorAuth 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-zephyraBlue text-white hover:bg-zephyraDark'
          }`}
        >
          {loading ? 'Updating...' : (twoFactorAuth ? 'Disable' : 'Enable')}
        </button>
      </div>
    </section>
  );
}