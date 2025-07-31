import React, { useRef, useState } from "react";

export default function QuestProofUpload() {
  const [photo, setPhoto] = useState(null);
  const [adventure, setAdventure] = useState("");
  const fileInputRef = useRef();

  // Dummy location and time, replace with your actual logic
  const location = "Bhubaneswar, Odisha, India (Automatically attached)";
  const time = "2024-01-20 14:30 (Automatically attached)";

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPhoto(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-14 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-2 text-sm text-teal-600 font-semibold flex items-center gap-2">
          <span>Quest Details</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500">Proof Upload</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          Complete Quest: Explore the Ancient Caves
        </h1>
        <p className="text-slate-500 mb-8">
          Upload a photo demonstrating you completed this quest.
        </p>

        {/* Upload Box */}
        <div
          className="border-2 border-dashed border-slate-200 rounded-xl py-12 px-4 mb-5 flex flex-col items-center justify-center cursor-pointer transition hover:border-teal-400 bg-white"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {photo ? (
            <img
              src={photo}
              alt="Uploaded Proof"
              className="w-52 h-52 object-cover rounded-xl shadow mb-4"
            />
          ) : (
            <>
              <div className="font-semibold text-slate-700 text-lg mb-2">
                Drag & Drop Your Photo Here
              </div>
              <div className="text-slate-400 mb-3">Or click to upload</div>
              <button
                type="button"
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-semibold shadow hover:bg-teal-50 transition mb-2"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current && fileInputRef.current.click();
                }}
              >
                Browse Files
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </>
          )}
        </div>

        {/* Take Photo */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            className="bg-slate-100 text-slate-700 px-6 py-2 rounded-full font-semibold shadow hover:bg-teal-50 transition"
          >
            Take Photo
          </button>
        </div>

        {/* Adventure Textarea */}
        <textarea
          className="w-full rounded-xl border border-slate-200 bg-white p-4 text-slate-700 mb-5 resize-none shadow focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
          rows={4}
          placeholder="Tell us about your adventure!"
          value={adventure}
          onChange={e => setAdventure(e.target.value)}
        />

        {/* Location & Time */}
        <div className="w-full mb-6">
          <div className="flex items-center py-2 text-slate-500 border-b border-slate-100">
            <span className="w-24 font-semibold text-slate-700">Location</span>
            <span className="ml-3">{location}</span>
          </div>
          <div className="flex items-center py-2 text-slate-500">
            <span className="w-24 font-semibold text-slate-700">Time</span>
            <span className="ml-3">{time}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-5 justify-center mt-6">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 transition text-white px-8 py-3 rounded-full font-semibold shadow text-lg"
          >
            Submit Proof
          </button>
          <button
            type="button"
            className="bg-slate-100 text-slate-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-slate-200 transition text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}