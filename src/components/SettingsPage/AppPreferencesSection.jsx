import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserSettings, updateUserSettings } from "../../features/userSlice";

export default function AppPreferencesSection() {
  const dispatch = useDispatch();
  const { preferences, loading } = useSelector(state => state.user);
  
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
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
        setLanguage(preferences.language || 'en');
        setTheme(preferences.theme || 'light');
      }
    } catch (error) {
      console.error('Failed to set preferences:', error);
    }
  }, [preferences]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setHasChanges(true);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateUserSettings({
        appPreferences: {
          language,
          theme
        }
      })).unwrap();
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to update app preferences:', error);
    }
  };

  return (
    <section className="bg-white rounded-xl border border-gray-200 mb-8 p-6">
      <h2 className="text-lg font-semibold text-midnightIndigo mb-1">App Preferences</h2>
      <p className="text-sm text-zephyraBlue mb-5">Customize your app experience.</p>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2">Language</label>
        <select 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800"
          value={language}
          onChange={handleLanguageChange}
          disabled={loading}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2">Theme</label>
        <select 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800"
          value={theme}
          onChange={handleThemeChange}
          disabled={loading}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
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