import React, { useState, useRef } from "react";

const QUEST_CATEGORIES = [
  "Nature",
  "History",
  "Culture",
  "Adventure",
  "Food & Drink",
  "Art",
];

const DIFFICULTY_LEVELS = [
  "Easy",
  "Medium",
  "Hard",
];

function CreateQuestPage() {
  const [tasks, setTasks] = useState(["Describe the first task", "Describe the second task"]);
  const [tips, setTips] = useState([""]); // Tips state
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    category: "",
    difficulty: "",
    description: "",
    address: "",
    city: "",
    pincode: "",
    xp: "",
    tags: "",
    proof: "",
    tasks: ["", ""],
    tips: [""], // Add tips to form state
    photos: [],
  });
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const fileInputRef = useRef();
  const [geoLoading, setGeoLoading] = useState(false);
  const [mapEmbedUrl, setMapEmbedUrl] = useState("");
  const [mapZoom, setMapZoom] = useState(16);

  // Update Google Map embed URL
  const updateMapEmbed = (address, city, lat = null, lng = null, zoom = mapZoom) => {
    let query = "";
    if (lat && lng) {
      query = `${lat},${lng}`;
    } else if (address || city) {
      query = encodeURIComponent([address, city].filter(Boolean).join(", "));
    }
    if (query) {
      setMapEmbedUrl(
        `https://www.google.com/maps?q=${query}&z=${zoom}&output=embed`
      );
    } else {
      setMapEmbedUrl("");
    }
  };

  // Handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (
      e.target.name === "address" ||
      e.target.name === "city"
    ) {
      const address = e.target.name === "address" ? e.target.value : form.address;
      const city = e.target.name === "city" ? e.target.value : form.city;
      updateMapEmbed(address, city, null, null, mapZoom);
    }
  };

  const handleTaskChange = (idx, value) => {
    const newTasks = [...tasks];
    newTasks[idx] = value;
    setTasks(newTasks);
    setForm({ ...form, tasks: newTasks });
  };

  const handleAddTask = () => {
    setTasks([...tasks, ""]);
    setForm({ ...form, tasks: [...tasks, ""] });
  };

  // Quest Tips handlers
  const handleTipChange = (idx, value) => {
    const newTips = [...tips];
    newTips[idx] = value;
    setTips(newTips);
    setForm({ ...form, tips: newTips });
  };

  const handleAddTip = () => {
    setTips([...tips, ""]);
    setForm({ ...form, tips: [...tips, ""] });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const newPhotos = [...form.photos, ...files];
    setForm({ ...form, photos: newPhotos });
    const newPreviews = [
      ...photoPreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ];
    setPhotoPreviews(newPreviews);
  };

  const removePhoto = (idx) => {
    const newPhotos = [...form.photos];
    const newPreviews = [...photoPreviews];
    newPhotos.splice(idx, 1);
    newPreviews.splice(idx, 1);
    setForm({ ...form, photos: newPhotos });
    setPhotoPreviews(newPreviews);
    if (newPhotos.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.photos.length === 0) {
      alert("You must upload at least one quest photo.");
      return;
    }
    alert("Quest submitted for review!");
  };

  const handlePreview = () => {
    alert("Preview Not Implemented");
  };

  // Geolocation handler for autofilling address
  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const addressString = data.display_name || "";
          const cityString =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.region ||
            "";
          const pincodeString =
            data.address.postcode || "";
          setForm({
            ...form,
            address: addressString,
            city: cityString,
            pincode: pincodeString,
          });
          updateMapEmbed(addressString, cityString, latitude, longitude, mapZoom);
        } catch (error) {
          alert("Could not fetch location details. Please try again.");
        }
        setGeoLoading(false);
      },
      (error) => {
        alert("Unable to retrieve your location.");
        setGeoLoading(false);
      }
    );
  };

  // Update map when address/city/zoom changes
  React.useEffect(() => {
    if (form.address || form.city) {
      updateMapEmbed(form.address, form.city, null, null, mapZoom);
    }
    // eslint-disable-next-line
  }, [form.address, form.city, mapZoom]);

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <main className="w-full max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-0">
        <h1 className="text-center text-4xl font-extrabold text-slate-900 mb-2">Create Your Own Quest!</h1>
        <p className="text-center text-slate-500 mb-8">
          Share your unique local exploration ideas with the community! Follow the steps below to submit your quest for review.
        </p>
        <form className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8" onSubmit={handleSubmit}>
          {/* Quest Details */}
          <section className="mb-8">
            <h2 className="font-semibold text-lg text-slate-800 mb-3">Quest Details</h2>
            <div className="mb-4">
              <label className="block font-medium mb-1">Quest Title</label>
              <input
                type="text"
                name="title"
                maxLength={80}
                placeholder="e.g., The Secret Gardens of downtown"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                required
              />
              <div className="text-slate-400 text-xs mt-1">A catchy and descriptive title. (Max 80 characters)</div>
            </div>
            {/* Subtitle Field */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                maxLength={120}
                placeholder="A short subtitle to give more context (Max 120 characters)"
                value={form.subtitle}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              <div className="text-slate-400 text-xs mt-1">Optional: Add a subtitle for extra context.</div>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Quest Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                required
              >
                <option value="">Select a category</option>
                {QUEST_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {/* Difficulty Dropdown */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Difficulty Level</label>
              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                required
              >
                <option value="">Select difficulty</option>
                {DIFFICULTY_LEVELS.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <div className="text-slate-400 text-xs mt-1">Select how challenging this quest will be.</div>
            </div>
            <div>
              <label className="block font-medium mb-1">Quest Description</label>
              <textarea
                name="description"
                rows={4}
                placeholder="Describe the story and purpose of your quest..."
                value={form.description}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                required
              />
              <div className="text-slate-400 text-xs mt-1">Provide a compelling narrative for your quest.</div>
            </div>
            {/* Quest Photo Upload (after description) */}
            <div className="mt-6 mb-4">
              <label className="block font-medium mb-1">Quest Photos <span className="text-red-500">*</span></label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
                <div className="flex gap-4 flex-wrap">
                  {photoPreviews.map((src, idx) => (
                    <div key={idx} className="relative">
                      <img src={src} alt={`Quest ${idx + 1}`} className="w-32 h-32 object-cover rounded-lg border" />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 text-xs"
                        title="Remove photo"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id="photo-upload"
                    ref={fileInputRef}
                    multiple
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 cursor-pointer hover:bg-slate-100 transition"
                  >
                    <svg className="w-5 h-5 mr-2 text-teal-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 9.828M7 17a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7z" />
                    </svg>
                    {photoPreviews.length === 0 ? "Upload Photo(s)" : "Add More Photo(s)"}
                  </label>
                </div>
                <span className="text-slate-400 text-xs ml-2">
                  You must upload at least one quest photo. You can add multiple images.
                </span>
              </div>
            </div>
          </section>

          {/* Location Information */}
          <section className="mb-8">
            <h2 className="font-semibold text-lg text-slate-800 mb-3">Location Information</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="sm:w-1/3">
                <label className="block font-medium mb-1">Address / Landmark</label>
                <input
                  type="text"
                  name="address"
                  placeholder="123 Main Street"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                  required
                />
                {/* Location Button */}
                <button
                  type="button"
                  className={`mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-100 text-teal-700 font-semibold hover:bg-teal-200 focus:ring-2 focus:ring-teal-300 transition disabled:opacity-60`}
                  onClick={handleUseCurrentLocation}
                  disabled={geoLoading}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  </svg>
                  {geoLoading ? "Locating..." : "Use Current Location"}
                </button>
                <div className="text-slate-400 text-xs mt-1">
                  Optionally, use your device location to autofill.
                </div>
              </div>
              <div className="sm:w-1/3">
                <label className="block font-medium mb-1">City / Region</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Springfield"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                  required
                />
              </div>
              <div className="sm:w-1/3">
                <label className="block font-medium mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="e.g., 123456"
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                  required
                  maxLength={10}
                  pattern="\d*"
                />
                <div className="text-slate-400 text-xs mt-1">Enter the area pincode.</div>
              </div>
            </div>
            {/* Google Map Embed with Zoom Controls */}
            <div className="bg-slate-100 rounded-lg h-64 flex flex-col items-center justify-center text-slate-400 text-base border border-slate-200 overflow-hidden relative">
              {mapEmbedUrl ? (
                <>
                  <iframe
                    title="Quest Location"
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "230px", minWidth: "100%" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                    <button
                      type="button"
                      aria-label="Zoom in"
                      className="bg-white shadow rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-teal-100 transition"
                      onClick={() => setMapZoom((z) => Math.min(z + 1, 21))}
                    >
                      <span className="text-xl font-bold">+</span>
                    </button>
                    <button
                      type="button"
                      aria-label="Zoom out"
                      className="bg-white shadow rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-teal-100 transition"
                      onClick={() => setMapZoom((z) => Math.max(z - 1, 1))}
                    >
                      <span className="text-xl font-bold">−</span>
                    </button>
                  </div>
                </>
              ) : (
                <span>Interactive Map Component Placeholder</span>
              )}
            </div>
          </section>

          {/* Quest Objectives / Tasks */}
          <section className="mb-8">
            <h2 className="font-semibold text-lg text-slate-800 mb-3">Quest Objectives / Tasks</h2>
            <div className="space-y-4">
              {tasks.map((task, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-teal-500 font-bold">{idx + 1}.</span>
                  <textarea
                    value={task}
                    onChange={(e) => handleTaskChange(idx, e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                    placeholder={`Describe task ${idx + 1}`}
                    rows={1}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddTask}
              className="mt-4 flex items-center gap-2 text-teal-600 hover:text-teal-800 text-base font-medium px-2 py-1 rounded transition"
            >
              <span className="text-xl font-bold leading-[0]">+</span>
              Add Another Task
            </button>
          </section>

          {/* Quest Tips Section */}
          <section className="mb-8">
            <h2 className="font-semibold text-lg text-slate-800 mb-3">Quest Tips</h2>
            <div className="space-y-4">
              {tips.map((tip, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-teal-400 font-bold">{idx + 1}.</span>
                  <textarea
                    value={tip}
                    onChange={(e) => handleTipChange(idx, e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                    placeholder={`Add a tip for this quest (e.g. best time to visit, nearby amenities)`}
                    rows={1}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddTip}
              className="mt-4 flex items-center gap-2 text-teal-600 hover:text-teal-800 text-base font-medium px-2 py-1 rounded transition"
            >
              <span className="text-xl font-bold leading-[0]">+</span>
              Add Another Tip
            </button>
            <div className="text-slate-400 text-xs mt-1">
              Share helpful advice or insider tips to help questers succeed!
            </div>
          </section>

          {/* Reward & Verification */}
          <section className="mb-8">
            <h2 className="font-semibold text-lg text-slate-800 mb-3">Reward & Verification</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="sm:w-1/2">
                <label className="block font-medium mb-1">XP Reward Suggestion</label>
                <input
                  type="number"
                  name="xp"
                  min="0"
                  placeholder="e.g., 100"
                  value={form.xp}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                />
                <div className="text-slate-400 text-xs mt-1">Suggest a fair XP reward for the effort required.</div>
              </div>
              <div className="sm:w-1/2">
                <label className="block font-medium mb-1">Tags / Keywords (Optional)</label>
                <input
                  type="text"
                  name="tags"
                  placeholder="history, outdoors, photo"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                />
                <div className="text-slate-400 text-xs mt-1">Comma-separated tags for better searchability.</div>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Proof / Verification Instructions</label>
              <textarea
                name="proof"
                rows={2}
                placeholder="e.g., Take a photo of the plaque on the old oak tree."
                value={form.proof}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              <div className="text-slate-400 text-xs mt-1">
                Clearly explain what users need to do to prove they've completed the quest.
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={handlePreview}
              className="bg-white border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-50 transition"
            >
              Preview
            </button>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Submit Quest for Review
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateQuestPage;