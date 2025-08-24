import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { createQuest } from "../../features/questSlice";
import MapRoutingControl from '../../components/MapRoutingControl';
import AdvancedMarker from '../../components/AdvancedMarker';
import SimpleMap from '../../components/SimpleMap';
import LazyAutocomplete, { AddressAutocomplete, EstablishmentAutocomplete } from '../../components/LazyAutocomplete';
import { getPreciseLocation } from '../../utils/locationUtils';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';

const QUEST_CATEGORIES = [
  "Art",
  "Food", 
  "History",
  "Culture",
  "Adventure",
  "HiddenGems",
];

const DIFFICULTY_LEVELS = [
  "Easy",
  "Medium",
  "Hard",
];

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '320px'
};

const DEFAULT_CENTER = {
  lat: 28.6139,
  lng: 77.2090
};

function CreateQuestPage() {
  const { isLoaded } = useGoogleMaps();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return <CreateQuestPageContent />;
}

function CreateQuestPageContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.quest);
  
  const [tasks, setTasks] = useState([""]);
  const [tips, setTips] = useState([""]);
  const [waypoints, setWaypoints] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    category: "",
    difficulty: "",
    description: "",
    address: "",
    city: "",
    pincode: "",
    startLocation: "",
    endLocation: "",
    xp: "",
    tags: "",
    proof: "",
    tasks: ["", ""],
    tips: [""],
    waypoints: [],
    photos: [],
  });
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const fileInputRef = useRef();
  const [geoLoading, setGeoLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(13);
  const [showRoutes, setShowRoutes] = useState(true);
  const [geoMessage, setGeoMessage] = useState("");
  const [shouldUpdateMap, setShouldUpdateMap] = useState(false);

  // Google Places Autocomplete refs - removing unused ones
  
  // Place search state
  // eslint-disable-next-line no-unused-vars
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showPlaceSearch, setShowPlaceSearch] = useState(false);
  // Simple location function
  const handleUseCurrentLocationForWaypoints = async () => {
    setGeoLoading(true);
    
    getPreciseLocation(
      (location, message) => {
        const newLocation = {
          lat: location.lat,
          lng: location.lng,
          id: location.timestamp
        };
        setWaypoints([newLocation]);
        setForm({ ...form, waypoints: [newLocation] });
        setMapCenter(newLocation);
        setMapZoom(16);
        setGeoMessage(`Location added! ${message}`);
        setGeoLoading(false);
        setTimeout(() => setGeoMessage(""), 5000);
      },
      (errorMessage) => {
        // Error: Could not get location
        setGeoMessage(errorMessage);
        setGeoLoading(false);
        setTimeout(() => setGeoMessage(""), 5000);
      },
      (progressMessage) => {
        setGeoMessage(progressMessage);
      }
    );
  };

  const handleManualWaypointAdd = () => {
    const latInput = document.getElementById('manual-lat');
    const lngInput = document.getElementById('manual-lng');
    const nameInput = document.getElementById('manual-name');
    
    const lat = parseFloat(latInput.value);
    const lng = parseFloat(lngInput.value);
    const name = nameInput.value.trim();
    
    if (isNaN(lat) || isNaN(lng)) {
      setGeoMessage("Please enter valid latitude and longitude values");
      setTimeout(() => setGeoMessage(""), 3000);
      return;
    }
    
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setGeoMessage("Please enter valid coordinate ranges (Lat: -90 to 90, Lng: -180 to 180)");
      setTimeout(() => setGeoMessage(""), 3000);
      return;
    }
    
    const newWaypoint = {
      lat,
      lng,
      id: Date.now(),
      name: name || `Custom Location`,
      address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    };
    
    const updatedWaypoints = [...waypoints, newWaypoint];
    setWaypoints(updatedWaypoints);
    setForm({ ...form, waypoints: updatedWaypoints });
    setMapCenter(newWaypoint);
    setMapZoom(16);
    
    // Clear inputs
    latInput.value = "";
    lngInput.value = "";
    nameInput.value = "";
    
    setGeoMessage(`Added custom waypoint: ${newWaypoint.name}`);
    setTimeout(() => setGeoMessage(""), 3000);
  };

  // Map click handler
  const onMapClick = useCallback((event) => {
    const newWaypoint = { 
      lat: event.latLng.lat(), 
      lng: event.latLng.lng(),
      id: Date.now()
    };
    const updatedWaypoints = [...waypoints, newWaypoint];
    setWaypoints(updatedWaypoints);
    setForm({ ...form, waypoints: updatedWaypoints });
  }, [waypoints, form]);

  // Map load handler
  const onLoad = useCallback((map) => {
    if (shouldUpdateMap) {
      map.setCenter(mapCenter);
      map.setZoom(mapZoom);
      setShouldUpdateMap(false);
    }
  }, [mapCenter, mapZoom, shouldUpdateMap]);

  const onMarkerDragEnd = useCallback((event, index) => {
    const updatedWaypoints = [...waypoints];
    updatedWaypoints[index] = {
      ...updatedWaypoints[index],
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setWaypoints(updatedWaypoints);
    setForm({ ...form, waypoints: updatedWaypoints });
  }, [waypoints, form]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = [];
    
    if (form.photos.length === 0) {
      errors.push("You must upload at least one quest photo.");
    }
    
    if (!form.title?.trim()) errors.push("Quest title is required.");
    if (!form.category) errors.push("Quest category is required.");
    if (!form.difficulty) errors.push("Difficulty level is required.");
    if (!form.description?.trim()) errors.push("Quest description is required.");
    if (!form.address?.trim()) errors.push("Address is required.");
    if (!form.city?.trim()) errors.push("City is required.");
    if (!form.pincode?.trim()) errors.push("Pincode is required.");
    
    // Validate start and end locations
    if (!form.startLocation || 
        (typeof form.startLocation === 'object' && !form.startLocation.lat) ||
        (typeof form.startLocation === 'string' && !form.startLocation.trim())) {
      errors.push("Start location is required.");
    }
    if (!form.endLocation || 
        (typeof form.endLocation === 'object' && !form.endLocation.lat) ||
        (typeof form.endLocation === 'string' && !form.endLocation.trim())) {
      errors.push("End location is required.");
    }

    const validTasks = tasks.filter(task => task.trim());
    if (validTasks.length === 0) {
      errors.push("Please add at least one quest task.");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);

    try {
      const formData = new FormData();
      
      formData.append('title', form.title);
      formData.append('subtitle', form.subtitle || '');
      formData.append('category', form.category);
      formData.append('difficulty', form.difficulty);
      formData.append('description', form.description);
      formData.append('address', form.address);
      formData.append('city', form.city);
      formData.append('pincode', form.pincode);

      if (typeof form.startLocation === 'object' && form.startLocation.lat) {
        formData.append('startLocation', JSON.stringify(form.startLocation));
      } else {
        formData.append('startLocation', form.startLocation || '');
      }
      
      if (typeof form.endLocation === 'object' && form.endLocation.lat) {
        formData.append('endLocation', JSON.stringify(form.endLocation));
      } else {
        formData.append('endLocation', form.endLocation || '');
      }
      
      formData.append('xp', form.xp || '0');
      formData.append('tags', form.tags || '');
      formData.append('proofInstructions', form.proof || '');
      
      formData.append('tasks', JSON.stringify(tasks.filter(task => task.trim())));
      formData.append('tips', JSON.stringify(tips.filter(tip => tip.trim())));

      if (waypoints.length > 0) {
        formData.append('waypoints', JSON.stringify(waypoints));
      }

      form.photos.forEach((photo) => {
        formData.append('photos', photo);
      });

      const result = await dispatch(createQuest(formData));
      
      if (createQuest.fulfilled.match(result)) {
        setSuccessMessage("Quest submitted for review successfully! You'll be redirected to your quests page.");

        setTimeout(() => {
          setForm({
            title: "",
            subtitle: "",
            category: "",
            difficulty: "",
            description: "",
            address: "",
            city: "",
            pincode: "",
            startLocation: "",
            endLocation: "",
            xp: "",
            tags: "",
            proof: "",
            tasks: ["", ""],
            tips: [""],
            waypoints: [],
            photos: [],
          });
          setTasks([""]);
          setTips([""]);
          setWaypoints([]);
          setPhotoPreviews([]);

          navigate("/my-quest");
        }, 2000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setValidationErrors(["Network error. Please check your connection and try again."]);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const PreviewModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Quest Preview</h2>
            <button
              onClick={() => setShowPreview(false)}
              className="text-slate-400 hover:text-slate-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">{form.title || "Quest Title"}</h3>
              {form.subtitle && <p className="text-slate-600 mb-2">{form.subtitle}</p>}
              <div className="flex gap-4 text-sm">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{form.category || "Category"}</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{form.difficulty || "Difficulty"}</span>
                {form.xp && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{form.xp} XP</span>}
              </div>
            </div>

            {photoPreviews.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Quest Photos</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {photoPreviews.map((src, idx) => (
                    <img key={idx} src={src} alt={`Quest ${idx + 1}`} className="w-full h-32 object-cover rounded-lg" />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-slate-700">{form.description || "No description provided"}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Location</h4>
              <p className="text-slate-700">{form.address}, {form.city} - {form.pincode}</p>
              {(form.startLocation || form.endLocation) && (
                <p className="text-sm text-slate-600 mt-1">
                  {form.startLocation && `Start: ${form.startLocation}`}
                  {form.startLocation && form.endLocation && " | "}
                  {form.endLocation && `End: ${form.endLocation}`}
                </p>
              )}
            </div>

            <div>
              <h4 className="font-medium mb-2">Quest Tasks</h4>
              <ol className="space-y-2">
                {tasks.filter(task => task.trim()).map((task, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-blue-600 font-medium">{idx + 1}.</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ol>
            </div>

            {tips.filter(tip => tip.trim()).length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Quest Tips</h4>
                <ul className="space-y-1">
                  {tips.filter(tip => tip.trim()).map((tip, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-teal-600">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {waypoints.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Waypoints ({waypoints.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {waypoints.map((waypoint, idx) => (
                    <div key={idx} className="bg-slate-50 p-2 rounded text-sm">
                      <span className="font-medium">Waypoint {idx + 1}:</span> {waypoint.lat.toFixed(6)}, {waypoint.lng.toFixed(6)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {form.proof && (
              <div>
                <h4 className="font-medium mb-2">Proof Instructions</h4>
                <p className="text-slate-700">{form.proof}</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setShowPreview(false)}
              className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Close Preview
            </button>
            <button
              onClick={() => {
                setShowPreview(false);
                handleSubmit({ preventDefault: () => {} });
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Quest"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {successMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9998] w-full max-w-md px-4">
          <div className="bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-in slide-in-from-top duration-300">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-sm sm:text-base font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {geoMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9998] w-full max-w-md px-4">
          <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-in slide-in-from-top duration-300">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <p className="text-sm sm:text-base font-medium">{geoMessage}</p>
          </div>
        </div>
      )}

      {validationErrors.length > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 text-center transform animate-in fade-in duration-300">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Validation Errors</h3>
              <div className="text-gray-600 text-left">
                <p className="mb-2">Please fix the following issues:</p>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              onClick={() => setValidationErrors([])}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <main className="w-full max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-0">
        <h1 className="text-center text-4xl font-extrabold text-slate-900 mb-2">Create Your Own Quest!</h1>
        <p className="text-center text-slate-500 mb-8">
          Share your unique local exploration ideas with the community! Follow the steps below to submit your quest for review.
        </p>
        <form className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8" onSubmit={handleSubmit}>
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

          <section className="mb-8">
            <h2 className="font-semibold text-lg text-slate-800 mb-3">Quest Route & Waypoints</h2>
            <p className="text-slate-600 text-sm mb-4">
              Add waypoints to create a route for your quest. Click on the map to add locations that questers should visit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="sm:w-1/2">
                <label className="block font-medium mb-1">Start Location</label>
                <LazyAutocomplete
                  onPlaceSelect={(place) => {
                    if (place.geometry) {
                      setForm({
                        ...form,
                        startLocation: place.name || place.formatted_address,
                        address: form.address || place.formatted_address || form.address,
                        city: form.city || (place.address_components?.find(comp => 
                          comp.types.includes('locality'))?.long_name) || form.city
                      });
                      
                      // Update map center to the selected place
                      const location = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                      };
                      setMapCenter(location);
                      setMapZoom(15);
                    }
                  }}
                  placeholder="Search for start location..."
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                  types={['establishment', 'geocode']}
                  componentRestrictions={{ country: 'in' }}
                  fields={['name', 'formatted_address', 'geometry', 'address_components']}
                  required
                />
                <div className="text-slate-400 text-xs mt-1">Where does the quest begin? (Start typing to search places)</div>
              </div>
              <div className="sm:w-1/2">
                <label className="block font-medium mb-1">End Location</label>
                <LazyAutocomplete
                  onPlaceSelect={(place) => {
                    if (place.geometry) {
                      setForm({
                        ...form,
                        endLocation: place.name || place.formatted_address,
                        address: form.address || place.formatted_address || form.address,
                        city: form.city || (place.address_components?.find(comp => 
                          comp.types.includes('locality'))?.long_name) || form.city
                      });
                      
                      // Update map center to the selected place
                      const location = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                      };
                      setMapCenter(location);
                      setMapZoom(15);
                    }
                  }}
                  placeholder="Search for end location..."
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                  types={['establishment', 'geocode']}
                  componentRestrictions={{ country: 'in' }}
                  fields={['name', 'formatted_address', 'geometry', 'address_components']}
                  required
                />
                <div className="text-slate-400 text-xs mt-1">Where does the quest end? (Start typing to search places)</div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                placeholder="e.g., 123 Main Street, Downtown"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                required
              />
              <div className="text-slate-400 text-xs mt-1">Full address or specific location of the quest</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="sm:w-2/3">
                <label className="block font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g., Springfield"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                  required
                />
                <div className="text-slate-400 text-xs mt-1">City where the quest takes place</div>
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
                <div className="text-slate-400 text-xs mt-1">Area pincode (max 10 digits)</div>
              </div>
            </div>

            <div className="mb-4">
              <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 focus:ring-2 focus:ring-blue-300 transition disabled:opacity-60`}
                onClick={handleUseCurrentLocationForWaypoints}
                disabled={geoLoading}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {geoLoading ? "Locating..." : "Get My Current Location"}
              </button>
              <div className="text-slate-400 text-xs mt-1">
                Click this button to center the map on your current location and automatically jump to your position.
              </div>
            </div>

            <div className="mb-6 bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-medium text-slate-700 mb-3">Add Waypoints</h3>
              <p className="text-slate-600 text-sm mb-4">
                Add places that questers should visit. You can search for places, add coordinates manually, or click on the map.
              </p>
              
              <div className="mb-4">
                <label className="block font-medium mb-2 text-sm">Search Places</label>
                <div className="flex gap-2">
                  <EstablishmentAutocomplete
                    onPlaceSelect={(place) => {
                      if (place.geometry) {
                        const newWaypoint = {
                          lat: place.geometry.location.lat(),
                          lng: place.geometry.location.lng(),
                          id: Date.now(),
                          name: place.name || place.formatted_address,
                          address: place.formatted_address
                        };
                        
                        const updatedWaypoints = [...waypoints, newWaypoint];
                        setWaypoints(updatedWaypoints);
                        setForm({ ...form, waypoints: updatedWaypoints });
                        
                        // Update map center and zoom to show the new waypoint
                        setMapCenter(newWaypoint);
                        setMapZoom(16);
                        setSelectedPlace(place);
                        setGeoMessage(`Added waypoint: ${place.name || place.formatted_address}`);
                        setTimeout(() => setGeoMessage(""), 3000);
                      }
                    }}
                    placeholder="Search for places, landmarks, attractions..."
                    className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-teal-100"
                    types={['establishment', 'tourist_attraction', 'point_of_interest', 'geocode']}
                    componentRestrictions={{ country: 'in' }}
                    fields={['name', 'formatted_address', 'geometry', 'address_components', 'types']}
                  />
                </div>
                <div className="text-slate-400 text-xs mt-1">
                  Start typing to search for places, landmarks, or attractions to add as waypoints.
                </div>
              </div>

              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setShowPlaceSearch(!showPlaceSearch)}
                  className="flex items-center gap-2 text-teal-600 hover:text-teal-800 text-sm font-medium mb-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPlaceSearch ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
                  </svg>
                  Add Coordinates Manually
                </button>
                
                {showPlaceSearch && (
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <label className="block font-medium mb-2 text-sm">Manual Coordinates</label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <input
                          type="number"
                          id="manual-lat"
                          placeholder="Latitude"
                          step="any"
                          min="-90"
                          max="90"
                          className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-100"
                        />
                        <div className="text-slate-400 text-xs mt-1">-90 to 90</div>
                      </div>
                      <div>
                        <input
                          type="number"
                          id="manual-lng"
                          placeholder="Longitude"
                          step="any"
                          min="-180"
                          max="180"
                          className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-100"
                        />
                        <div className="text-slate-400 text-xs mt-1">-180 to 180</div>
                      </div>
                      <div>
                        <input
                          type="text"
                          id="manual-name"
                          placeholder="Place name (optional)"
                          className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-100"
                        />
                        <div className="text-slate-400 text-xs mt-1">Custom name</div>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={handleManualWaypointAdd}
                          className="w-full bg-teal-100 text-teal-700 rounded px-3 py-2 text-sm font-medium hover:bg-teal-200 transition"
                        >
                          Add Point
                        </button>
                      </div>
                    </div>
                    <div className="text-slate-400 text-xs mt-2">
                      Enter exact latitude and longitude coordinates to add a custom waypoint.
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {waypoints.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium text-slate-700 mb-2">Added Waypoints ({waypoints.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {waypoints.map((waypoint, idx) => (
                    <div key={waypoint.id || idx} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <span className="font-semibold text-teal-600">Waypoint {idx + 1}</span>
                          {waypoint.name && (
                            <div className="text-sm font-medium text-slate-700 mt-1">{waypoint.name}</div>
                          )}
                          {waypoint.address && waypoint.address !== waypoint.name && (
                            <div className="text-xs text-slate-500 mt-1">{waypoint.address}</div>
                          )}
                          <div className="text-xs text-slate-500 mt-1">
                            Lat: {waypoint.lat.toFixed(6)}, Lng: {waypoint.lng.toFixed(6)}
                          </div>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <button
                            type="button"
                            onClick={() => {
                              setMapCenter({ lat: waypoint.lat, lng: waypoint.lng });
                              setMapZoom(18);
                            }}
                            className="text-blue-500 hover:text-blue-700 text-sm p-1"
                            title="Center map on this waypoint"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const newWaypoints = waypoints.filter((_, i) => i !== idx);
                              setWaypoints(newWaypoints);
                              setForm({ ...form, waypoints: newWaypoints });
                            }}
                            className="text-red-500 hover:text-red-700 text-sm p-1"
                            title="Remove waypoint"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium mb-1">Route Mapping</h3>
                <p className="text-slate-500 text-sm">Click on the map to add waypoints, drag to reposition them.</p>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showRoutes}
                    onChange={(e) => setShowRoutes(e.target.checked)}
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Show proper road routes</span>
                </label>
              </div>
            </div>

            {geoMessage && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">{geoMessage}</p>
              </div>
            )}

            <div className="quest-map-container bg-slate-100 rounded-lg h-80 border border-slate-200 overflow-hidden">
              <GoogleMap
                mapContainerStyle={{ height: "100%", width: "100%" }}
                center={mapCenter}
                zoom={mapZoom}
                onClick={onMapClick}
                    onLoad={onLoad}
                    options={{
                      zoomControl: true,
                      mapTypeControl: false,
                      streetViewControl: false,
                      fullscreenControl: false,
                      gestureHandling: 'greedy',
                      clickableIcons: false,
                      disableDoubleClickZoom: false,
                      keyboardShortcuts: true
                    }}
                  >
                    {waypoints.map((waypoint, idx) => (
                      <AdvancedMarker
                        key={waypoint.id || idx}
                        position={{ lat: waypoint.lat, lng: waypoint.lng }}
                        draggable={true}
                        onDragEnd={(event) => onMarkerDragEnd(event, idx)}
                        title={`Waypoint ${idx + 1} - Click to remove`}
                        label={`${idx + 1}`}
                      />
                    ))}
                    
                    {showRoutes && waypoints.length > 1 && (
                      <MapRoutingControl waypoints={waypoints} />
                    )}
                  </GoogleMap>
            </div>
            
            <div className="text-slate-400 text-xs mt-2">
              Click anywhere on the map to add a waypoint. Drag existing waypoints to reposition them.
              {waypoints.length > 0 && (
                <span className="block mt-1">
                  Current waypoints: {waypoints.length} | 
                  {waypoints.length > 1 && showRoutes && " Proper road routing enabled"} 
                  {waypoints.length > 1 && !showRoutes && " Road routing disabled"}
                </span>
              )}
            </div>
          </section>

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

          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={handlePreview}
              className="bg-white border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-50 transition"
              disabled={loading}
            >
              Preview Quest
            </button>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Quest for Review"}
            </button>
          </div>
        </form>

        {error && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9998] w-full max-w-md px-4">
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-sm sm:text-base font-medium">{error}</p>
            </div>
          </div>
        )}

        {showPreview && <PreviewModal />}
      </main>
    </div>
  );
}

export default CreateQuestPage;