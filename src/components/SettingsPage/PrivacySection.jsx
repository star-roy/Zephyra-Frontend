import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserSettings, updateUserSettings } from "../../features/userSlice";

export default function PrivacySection() {
  const dispatch = useDispatch();
  const { preferences, loading } = useSelector(state => state.user);
  
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [dataSharing, setDataSharing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

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
        setProfileVisibility(preferences.privacy || 'public');
        setDataSharing(preferences.dataSharing || false);
      }
    } catch (error) {
      console.error('Failed to set preferences:', error);
    }
  }, [preferences]);

  const handleProfileVisibilityChange = (e) => {
    setProfileVisibility(e.target.value);
    setHasChanges(true);
  };

  const handleDataSharingChange = (e) => {
    setDataSharing(e.target.checked);
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateUserSettings({
        privacy: {
          profileVisibility,
          dataSharing
        }
      })).unwrap();
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to update privacy settings:', error);
    }
  };

  return (
    <section className="bg-white rounded-xl border border-gray-200 mb-8 p-6">
      <h2 className="text-lg font-semibold text-midnightIndigo mb-1">Privacy</h2>
      <p className="text-sm text-zephyraBlue mb-5">Control your privacy settings.</p>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2">Profile Visibility</label>
        <select 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800"
          value={profileVisibility}
          onChange={handleProfileVisibilityChange}
          disabled={loading}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <p className="text-xs text-zephyraBlue mt-1">Control who can see your profile.</p>
      </div>
      
      <div className="mb-6">
        <label className="flex items-center gap-3 mb-2 text-sm text-gray-700">
          <input 
            type="checkbox" 
            className="accent-zephyraBlue"
            checked={dataSharing}
            onChange={handleDataSharingChange}
            disabled={loading}
          />
          Data Sharing
        </label>
        <p className="text-xs text-zephyraBlue">
          Allow us to share your data with partners.
        </p>
      </div>

      {hasChanges && (
        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 rounded-full bg-teal-400 text-white font-semibold hover:bg-teal-500 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </section>
  );
}