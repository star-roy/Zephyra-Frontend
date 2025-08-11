import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPen, FaTimes } from "react-icons/fa";
import { fetchUserProfile } from "../../features/userSlice";

export default function AccountSection() {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.auth);
  const { userProfile } = useSelector(state => state.user);
  
  // Use auth data as primary source
  const user = userData || userProfile;
  
  const [username] = useState(user?.username || "LocalExplorer123");
  const [fullname, setFullname] = useState(user?.fullName || "Jane Explorer");
  const [isEditingFullname, setIsEditingFullname] = useState(false);

  // Avatar (profile pic) states
  const [profilePic, setProfilePic] = useState(user?.avatar || "/profile-default.png");
  const [tempProfilePic, setTempProfilePic] = useState(profilePic);
  const [isEditingProfilePic, setIsEditingProfilePic] = useState(false);

  // Cover image states
  const [coverImage, setCoverImage] = useState(user?.coverImage || "/cover-default.jpg");
  const [tempCoverImage, setTempCoverImage] = useState(coverImage);
  const [isEditingCoverImage, setIsEditingCoverImage] = useState(false);

  // Bio (max 200 characters)
  const [bio, setBio] = useState(user?.bio || "Explorer, traveler, and demo user.");
  const [isEditingBio, setIsEditingBio] = useState(false);

  // Fetch user profile if not available
  useEffect(() => {
    if (userData?._id && !userProfile) {
      dispatch(fetchUserProfile(userData._id));
    }
  }, [dispatch, userData?._id, userProfile]);

  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      setFullname(user.fullName || "Jane Explorer");
      setProfilePic(user.avatar || "/profile-default.png");
      setTempProfilePic(user.avatar || "/profile-default.png");
      setCoverImage(user.coverImage || "/cover-default.jpg");
      setTempCoverImage(user.coverImage || "/cover-default.jpg");
      setBio(user.bio || "Explorer, traveler, and demo user.");
    }
  }, [user]);

  // Avatar handlers
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setTempProfilePic(ev.target.result);
    reader.readAsDataURL(file);
  };
  const handleDeleteProfilePic = () => setTempProfilePic("/profile-default.png");
  const handleSaveProfilePic = () => {
    setProfilePic(tempProfilePic);
    setIsEditingProfilePic(false);
  };
  const handleCancelProfilePic = () => {
    setTempProfilePic(profilePic);
    setIsEditingProfilePic(false);
  };

  // Cover image handlers
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setTempCoverImage(ev.target.result);
    reader.readAsDataURL(file);
  };
  const handleDeleteCoverImage = () => setTempCoverImage("/cover-default.jpg");
  const handleSaveCoverImage = () => {
    setCoverImage(tempCoverImage);
    setIsEditingCoverImage(false);
  };
  const handleCancelCoverImage = () => {
    setTempCoverImage(coverImage);
    setIsEditingCoverImage(false);
  };

  // Full name handlers
  const handleFullnameChange = (e) => setFullname(e.target.value);
  const handleFullnameSave = () => setIsEditingFullname(false);

  // Bio handlers (max 200 characters)
  const handleBioChange = (e) => {
    if (e.target.value.length <= 200) setBio(e.target.value);
  };
  const handleBioSave = () => setIsEditingBio(false);

  return (
    <section className="bg-white rounded-xl border border-gray-200 mb-8 p-6">
      <h2 className="text-lg font-semibold text-midnightIndigo mb-1">Account</h2>
      <p className="text-sm text-zephyraBlue mb-5">Manage your account and profile information.</p>

      {/* Cover Image */}
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
              className="bg-teal-400 hover:bg-teal-500 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg cursor-pointer"
              title="Edit Cover Image"
              onClick={() => setIsEditingCoverImage(true)}
            >
              <FaPen /> Edit
            </button>
          ) : (
            <>
              <label
                className="bg-teal-400 hover:bg-teal-500 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg cursor-pointer"
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
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition font-semibold"
                title="Save Cover Image"
                onClick={handleSaveCoverImage}
              >
                Save
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

      {/* Profile Picture Update */}
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
            className="bg-teal-400 hover:bg-teal-500 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg cursor-pointer"
            title="Edit Profile Picture"
            onClick={() => setIsEditingProfilePic(true)}
          >
            <FaPen /> Edit
          </button>
        ) : (
          <>
            <label
              className="bg-teal-400 hover:bg-teal-500 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg cursor-pointer"
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
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition font-semibold"
              title="Save Profile Picture"
              onClick={handleSaveProfilePic}
            >
              Save
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

      {/* Email */}
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

      {/* Full Name */}
      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2">Full Name</label>
        <div className="relative">
          <input
            type="text"
            value={fullname}
            readOnly={!isEditingFullname}
            onChange={handleFullnameChange}
            className={`w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 pr-10 ${
              isEditingFullname ? "focus:outline-teal-400 bg-white" : ""
            }`}
          />
          {!isEditingFullname ? (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-400"
              onClick={() => setIsEditingFullname(true)}
              title="Edit Full Name"
            >
              <FaPen />
            </button>
          ) : (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400 hover:text-teal-600 font-semibold"
              onClick={handleFullnameSave}
              disabled={!fullname.trim()}
              title="Save Full Name"
            >
              Save
            </button>
          )}
        </div>
      </div>

      {/* Username (read-only, no edit) */}
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

      {/* Bio Section - max 200 characters */}
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-800 pr-10 focus:outline-teal-400 resize-none"
                maxLength={200}
              />
              <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                {bio.length}/200 characters
              </div>
              <button
                type="button"
                className="absolute right-3 top-3 text-teal-400 hover:text-teal-600 font-semibold"
                onClick={handleBioSave}
                disabled={bio.length === 0 || bio.length > 200}
                title="Save Bio"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <div className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 min-h-[64px]">
                {bio || <span className="text-gray-400">No bio added.</span>}
              </div>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-400"
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

      {/* Delete Account */}
      <div>
        <h3 className="text-base text-midnightIndigo font-medium mb-1">Delete Account</h3>
        <p className="text-sm text-zephyraBlue mb-3">
          Permanently delete your account and all of your content.
        </p>
        <button className="px-5 py-2 text-red-600 border border-red-300 rounded-full font-semibold hover:bg-red-50 transition">
          Delete Account
        </button>
      </div>
    </section>
  );
}