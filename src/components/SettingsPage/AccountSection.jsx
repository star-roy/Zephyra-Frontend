import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

// Simulated taken usernames for demo purposes
const takenUsernames = ["LocalExplorer123", "ExplorerUser", "DemoUser"];

export default function AccountSection() {
  const [username, setUsername] = useState("LocalExplorer123");
  const [fullname, setFullname] = useState("Jane Explorer");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingFullname, setIsEditingFullname] = useState(false);
  const [profilePic, setProfilePic] = useState("/profile-default.png");
  const [coverImage, setCoverImage] = useState("/cover-default.jpg");
  const [usernameError, setUsernameError] = useState("");

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePic(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCoverImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleDeleteProfilePic = () => setProfilePic("/profile-default.png");
  const handleDeleteCoverImage = () => setCoverImage("/cover-default.jpg");

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (takenUsernames.includes(value) && value !== "LocalExplorer123") {
      setUsernameError("This username already exists. Please choose another.");
    } else {
      setUsernameError("");
    }
  };

  const handleUsernameSave = () => {
    if (usernameError || !username.trim()) return;
    setIsEditingUsername(false);
  };

  const handleFullnameChange = (e) => setFullname(e.target.value);
  const handleFullnameSave = () => setIsEditingFullname(false);

  return (
    <section className="bg-white rounded-xl border border-gray-200 mb-8 p-6">
      <h2 className="text-lg font-semibold text-midnightIndigo mb-1">Account</h2>
      <p className="text-sm text-zephyraBlue mb-5">Manage your account and profile information.</p>

      {/* Cover Image */}
      <div className="relative mb-7">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-32 object-cover rounded-xl border border-gray-300"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <label
            className="bg-teal-400 hover:bg-teal-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer"
            title="Change Cover Image"
            htmlFor="cover-image-upload"
            style={{ fontSize: "1.3rem" }}
          >
            <FaPen />
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
            className="bg-red-400 hover:bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition"
            title="Remove Cover Image"
            onClick={handleDeleteCoverImage}
            style={{ fontSize: "1.3rem" }}
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Profile Picture Update */}
      <div className="flex items-center gap-6 mb-7">
        <div className="relative w-16 h-16">
          <img
            src={profilePic}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
          />
          <label
            className="absolute bottom-0 right-0 bg-teal-400 hover:bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg cursor-pointer"
            title="Change Profile Picture"
            htmlFor="profile-pic-upload"
            style={{ fontSize: "1rem" }}
          >
            <FaPen />
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
            className="absolute -top-2 -right-2 bg-red-400 hover:bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition"
            title="Remove Profile Picture"
            onClick={handleDeleteProfilePic}
            style={{ fontSize: "1rem" }}
          >
            <FaTimes />
          </button>
        </div>
        <div>
          <div className="text-base font-semibold text-midnightIndigo">{username}</div>
          <div className="text-xs text-gray-400">Profile Picture</div>
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          value="explorer@email.com"
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

      {/* Username */}
      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2">Username</label>
        <div className="relative">
          <input
            type="text"
            value={username}
            readOnly={!isEditingUsername}
            onChange={handleUsernameChange}
            className={`w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 pr-10 ${
              isEditingUsername ? "focus:outline-teal-400 bg-white" : ""
            }`}
          />
          {!isEditingUsername ? (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-400"
              onClick={() => setIsEditingUsername(true)}
              title="Edit Username"
            >
              <FaPen />
            </button>
          ) : (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400 hover:text-teal-600 font-semibold"
              onClick={handleUsernameSave}
              disabled={!!usernameError || !username.trim()}
              title="Save Username"
            >
              Save
            </button>
          )}
        </div>
        {usernameError && (
          <p className="text-xs text-red-500 mt-2">{usernameError}</p>
        )}
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