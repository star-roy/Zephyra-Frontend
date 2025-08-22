import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPen, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { 
  fetchCurrentUserProfile, 
  updateAccountDetails, 
  updateUserAvatar, 
  updateUserCoverImage,
  deleteUserAccount
} from "../../features/userSlice";

export default function AccountSection() {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.auth);
  const { userProfile, loading, error } = useSelector(state => state.user);

  const user = userData || userProfile;
  
  const [username] = useState(user?.username || "LocalExplorer123");
  const [fullname, setFullname] = useState(user?.fullName || "Jane Explorer");
  const [isEditingFullname, setIsEditingFullname] = useState(false);

  const [profilePic, setProfilePic] = useState(user?.avatar || "/profile-default.png");
  const [tempProfilePic, setTempProfilePic] = useState(profilePic);
  const [isEditingProfilePic, setIsEditingProfilePic] = useState(false);

  const [coverImage, setCoverImage] = useState(user?.coverImage || "/cover-default.jpg");
  const [tempCoverImage, setTempCoverImage] = useState(coverImage);
  const [isEditingCoverImage, setIsEditingCoverImage] = useState(false);

  const [bio, setBio] = useState(user?.bio || "Explorer, traveler, and demo user.");
  const [isEditingBio, setIsEditingBio] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");
  const [showDeletePassword, setShowDeletePassword] = useState(false);

  useEffect(() => {
    if (userData?._id && !userProfile) {
      dispatch(fetchCurrentUserProfile());
    }
  }, [dispatch, userData?._id, userProfile]);

  useEffect(() => {
    setSuccessMessage("");
  }, [isEditingProfilePic, isEditingCoverImage, isEditingFullname, isEditingBio]);

  useEffect(() => {
    if (user) {
      setFullname(user.fullName || "Jane Explorer");
      setProfilePic(user.avatar || "/profile-default.webp");
      setTempProfilePic(user.avatar || "/profile-default.webp");
      setCoverImage(user.coverImage || "/default-cover.webp");
      setTempCoverImage(user.coverImage || "/default-cover.webp");
      setBio(user.bio || "On a journey to discover quests and stories around me.");
    }
  }, [user]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (ev) => setTempProfilePic(ev.target.result);
    reader.readAsDataURL(file);
  };
  
  const handleDeleteProfilePic = () => {
    setTempProfilePic("/profile-default.webp");
    const fileInput = document.getElementById('profile-pic-upload');
    if (fileInput) fileInput.value = '';
  };
  
  const handleSaveProfilePic = async () => {
    const fileInput = document.getElementById('profile-pic-upload');
    const file = fileInput?.files[0];
    
    if (file) {
      try {
        const result = await dispatch(updateUserAvatar(file)).unwrap();
        
        setProfilePic(result.avatar);
        setTempProfilePic(result.avatar);
        setIsEditingProfilePic(false);
        setSuccessMessage("Profile picture updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);

        fileInput.value = '';
      } catch (error) {
        console.error('Failed to update avatar:', error);
        setTempProfilePic(profilePic);
        alert('Failed to update profile picture. Please try again.');
      }
    } else {
      if (tempProfilePic === "/profile-default.webp" && profilePic !== "/profile-default.webp") {
        try {
          const defaultFile = new File([""], "/profile-default.webp", { type: "image/webp" });
          setProfilePic(defaultFile);
          setIsEditingProfilePic(false);
          setSuccessMessage("Profile picture removed successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
          console.error('Failed to remove avatar:', error);
          setTempProfilePic(profilePic);
          alert('Failed to remove profile picture. Please try again.');
        }
      } else {
        setIsEditingProfilePic(false);
      }
    }
  };
  
  const handleCancelProfilePic = () => {
    setTempProfilePic(profilePic);
    setIsEditingProfilePic(false);
    const fileInput = document.getElementById('profile-pic-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (ev) => setTempCoverImage(ev.target.result);
    reader.readAsDataURL(file);
  };
  
  const handleDeleteCoverImage = () => {
    setTempCoverImage("/cover-default.webp");
    const fileInput = document.getElementById('cover-image-upload');
    if (fileInput) fileInput.value = '';
  };
  
  const handleSaveCoverImage = async () => {
    const fileInput = document.getElementById('cover-image-upload');
    const file = fileInput?.files[0];
    
    if (file) {
      try {
        const result = await dispatch(updateUserCoverImage(file)).unwrap();
        
        setCoverImage(result.coverImage);
        setTempCoverImage(result.coverImage);
        setIsEditingCoverImage(false);
        setSuccessMessage("Cover image updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        
        fileInput.value = '';
      } catch (error) {
        console.error('Failed to update cover image:', error);
        setTempCoverImage(coverImage);
        alert('Failed to update cover image. Please try again.');
      }
    } else {
      if (tempCoverImage === "/cover-default.webp" && coverImage !== "/cover-default.webp") {
        try {
          const defaultFile = new File([""], "/cover-default.webp", { type: "image/webp" });
          setCoverImage(defaultFile);
          setIsEditingCoverImage(false);
          setSuccessMessage("Cover image removed successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
          console.error('Failed to remove cover image:', error);
          setTempCoverImage(coverImage);
          alert('Failed to remove cover image. Please try again.');
        }
      } else {
        setIsEditingCoverImage(false);
      }
    }
  };
  
  const handleCancelCoverImage = () => {
    setTempCoverImage(coverImage);
    setIsEditingCoverImage(false);
    const fileInput = document.getElementById('cover-image-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleFullnameChange = (e) => setFullname(e.target.value);
  const handleFullnameSave = async () => {
    if (fullname.trim()) {
      try {
        await dispatch(updateAccountDetails({ 
          fullName: fullname.trim(), 
          bio: bio || user?.bio || ''
        })).unwrap();
        
        setIsEditingFullname(false);
        setSuccessMessage("Full name updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error('Failed to update account details:', error);
        setFullname(user?.fullName || "Jane Explorer");
      }
    }
  };
  
  const handleFullnameCancel = () => {
    setFullname(user?.fullName || "Jane Explorer");
    setIsEditingFullname(false);
  };

  const handleBioChange = (e) => {
    if (e.target.value.length <= 200) setBio(e.target.value);
  };
  const handleBioSave = async () => {
    try {
      await dispatch(updateAccountDetails({ 
        fullName: fullname || user?.fullName || '',
        bio: bio.trim() 
      })).unwrap();
      
      setIsEditingBio(false);
      setSuccessMessage("Bio updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error('Failed to update account details:', error);
      setBio(user?.bio || "Explorer, traveler, and demo user.");
    }
  };
  
  const handleBioCancel = () => {
    setBio(user?.bio || "Explorer, traveler, and demo user.");
    setIsEditingBio(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      alert('Please enter your password to delete your account.');
      return;
    }
    
    if (deleteConfirmationText !== 'DELETE_MY_ACCOUNT') {
      alert('Please type "DELETE_MY_ACCOUNT" to confirm account deletion.');
      return;
    }

    try {
      await dispatch(deleteUserAccount({
        password: deletePassword,
        confirmDeletion: deleteConfirmationText
      })).unwrap();

      setSuccessMessage("Account deleted successfully. Redirecting...");
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      console.error('Failed to delete account:', error);
      alert('Failed to delete account. Please check your password and try again.');
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteConfirmation(false);
    setDeletePassword("");
    setDeleteConfirmationText("");
  };

  return (
    <section className="bg-white rounded-xl border border-gray-200 mb-8 p-6">
      <h2 className="text-lg font-semibold text-midnightIndigo mb-1">Account</h2>
      <p className="text-sm text-zephyraBlue mb-5">Manage your account and profile information.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm">{successMessage}</p>
        </div>
      )}

      <div className="mb-2">
        <img
          src={isEditingCoverImage ? tempCoverImage : coverImage}
          alt="Cover"
          className="w-full h-32 object-cover rounded-xl border border-gray-300"
        />
        <div className="flex gap-2 mt-3">
          {!isEditingCoverImage ? (
            <button
              type="button"
              className="bg-blue-400 hover:bg-blue-500 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg cursor-pointer"
              title="Edit Cover Image"
              onClick={() => setIsEditingCoverImage(true)}
            >
              <FaPen /> Edit
            </button>
          ) : (
            <>
              <label
                className="bg-blue-400 hover:bg-blue-500 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg cursor-pointer"
                title="Change Cover Image"
                htmlFor="cover-image-upload"
              >
                <FaPen /> Change
                <input
                  id="cover-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverImageChange}
                />
              </label>
              <button
                type="button"
                className="bg-red-400 hover:bg-red-500 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition"
                title="Remove Cover Image"
                onClick={handleDeleteCoverImage}
              >
                <FaTimes /> Remove
              </button>
              <button
                type="button"
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition font-semibold disabled:opacity-50"
                title="Save Cover Image"
                onClick={handleSaveCoverImage}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition font-semibold"
                title="Cancel"
                onClick={handleCancelCoverImage}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6 mb-2">
        <div className="relative w-16 h-16">
          <img
            src={isEditingProfilePic ? tempProfilePic : profilePic}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
          />
        </div>
        <div>
          <div className="text-base font-semibold text-midnightIndigo">{username}</div>
          <div className="text-xs text-gray-400">Profile Picture</div>
        </div>
      </div>
      <div className="flex gap-2 mb-7 ml-1">
        {!isEditingProfilePic ? (
          <button
            type="button"
            className="bg-blue-400 hover:bg-blue-500 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg cursor-pointer"
            title="Edit Profile Picture"
            onClick={() => setIsEditingProfilePic(true)}
          >
            <FaPen /> Edit
          </button>
        ) : (
          <>
            <label
              className="bg-blue-400 hover:bg-blue-500 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg cursor-pointer"
              title="Change Profile Picture"
              htmlFor="profile-pic-upload"
            >
              <FaPen /> Change
              <input
                id="profile-pic-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </label>
            <button
              type="button"
              className="bg-red-400 hover:bg-red-500 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition"
              title="Remove Profile Picture"
              onClick={handleDeleteProfilePic}
            >
              <FaTimes /> Remove
            </button>
            <button
              type="button"
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition font-semibold disabled:opacity-50"
              title="Save Profile Picture"
              onClick={handleSaveProfilePic}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition font-semibold"
              title="Cancel"
              onClick={handleCancelProfilePic}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          value={user?.email || "explorer@email.com"}
          readOnly
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800"
        />
        <p className="text-xs text-red-500 mt-2">You cannot change the email address.</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2">Full Name</label>
        <div className="relative">
          <input
            type="text"
            value={fullname}
            readOnly={!isEditingFullname}
            onChange={handleFullnameChange}
            className={`w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 pr-10 ${
              isEditingFullname ? "focus:outline-blue-400 bg-white" : ""
            }`}
          />
          {!isEditingFullname ? (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400"
              onClick={() => setIsEditingFullname(true)}
              title="Edit Full Name"
            >
              <FaPen />
            </button>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
                onClick={handleFullnameCancel}
                title="Cancel"
              >
                Cancel
              </button>
              <button
                type="button"
                className="text-blue-400 hover:text-blue-600 font-semibold disabled:opacity-50"
                onClick={handleFullnameSave}
                disabled={!fullname.trim() || loading}
                title="Save Full Name"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2">Username</label>
        <input
          type="text"
          value={username}
          readOnly
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800"
        />
        <p className="text-xs text-gray-400 mt-2">Username cannot be changed.</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2">
          Bio <span className="text-xs text-gray-400">(max 200 characters)</span>
        </label>
        <div className="relative">
          {isEditingBio ? (
            <>
              <textarea
                value={bio}
                onChange={handleBioChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-800 pr-10 focus:outline-blue-400 resize-none"
                maxLength={200}
              />
              <div className="absolute right-3 bottom-12 text-xs text-gray-400">
                {bio.length}/200 characters
              </div>
              <div className="absolute right-3 top-3 flex gap-2">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
                  onClick={handleBioCancel}
                  title="Cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-600 font-semibold disabled:opacity-50"
                  onClick={handleBioSave}
                  disabled={bio.length === 0 || bio.length > 200 || loading}
                  title="Save Bio"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 min-h-[64px]">
                {bio || <span className="text-gray-400">No bio added.</span>}
              </div>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400"
                onClick={() => setIsEditingBio(true)}
                title="Edit Bio"
              >
                <FaPen />
              </button>
              <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                {bio.length}/200 characters
              </div>
            </>
          )}
        </div>
      </div>

      <hr className="my-6" />

      <div>
        <h3 className="text-base text-midnightIndigo font-medium mb-1">Delete Account</h3>
        <p className="text-sm text-zephyraBlue mb-3">
          Permanently delete your account and all of your content.
        </p>
        
        {!showDeleteConfirmation ? (
          <button 
            className="px-5 py-2 text-red-600 border border-red-300 rounded-full font-semibold hover:bg-red-50 transition"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 mb-4 font-medium">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your password to confirm:
                </label>
                <div className="relative">
                  <input
                    type={showDeletePassword ? "text" : "password"}
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowDeletePassword(!showDeletePassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showDeletePassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type "DELETE_MY_ACCOUNT" to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmationText}
                  onChange={(e) => setDeleteConfirmationText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="DELETE_MY_ACCOUNT"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={confirmDeleteAccount}
                disabled={!deletePassword.trim() || deleteConfirmationText !== 'DELETE_MY_ACCOUNT'}
              >
                Yes, Delete Account
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-400 transition"
                onClick={cancelDeleteAccount}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}