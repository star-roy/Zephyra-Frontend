import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestById, submitQuestProof } from "../../features/questSlice";
import { optimizedGeocode } from "../../utils/mapsOptimization";

export default function QuestProofUpload() {
  const { questId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const { currentQuest, loading, error } = useSelector((state) => state.quest);
  
  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [adventure, setAdventure] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLocation, setUserLocation] = useState("Getting location...");
  const [coordinates, setCoordinates] = useState(null); 
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const fileInputRef = useRef();

  useEffect(() => {
    if (questId) {
      dispatch(fetchQuestById(questId));
    }
  }, [dispatch, questId]);


  useEffect(() => {
 
    const cachedLocation = sessionStorage.getItem('userLocationData');
    const cacheTimestamp = sessionStorage.getItem('userLocationTimestamp');
    const CACHE_DURATION = 60 * 60 * 1000;
    
    if (cachedLocation && cacheTimestamp) {
      const age = Date.now() - parseInt(cacheTimestamp);
      if (age < CACHE_DURATION) {
        const cached = JSON.parse(cachedLocation);
        setUserLocation(cached.address);
        setCoordinates({ lat: cached.lat, lng: cached.lng });
        return;
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });

          try {
            const result = await optimizedGeocode(latitude, longitude);
            
            let finalLocation;
            if (result.source === 'nominatim-free') {
              finalLocation = result.formatted_address;
            } else if (result.source === 'google-paid') {
              finalLocation = result.formatted_address;
            } else {
              finalLocation = result.formatted_address;
            }
            
            setUserLocation(finalLocation);
  
            const locationData = {
              address: finalLocation,
              lat: latitude,
              lng: longitude,
              source: result.source
            };
            sessionStorage.setItem('userLocationData', JSON.stringify(locationData));
            sessionStorage.setItem('userLocationTimestamp', Date.now().toString());
          } catch (error) {
            console.warn('Optimized geocoding failed:', error);
            const coordLocation = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            setUserLocation(coordLocation);
            
            const locationData = {
              address: coordLocation,
              lat: latitude,
              lng: longitude,
              source: 'coordinates-only'
            };
            sessionStorage.setItem('userLocationData', JSON.stringify(locationData));
            sessionStorage.setItem('userLocationTimestamp', Date.now().toString());
          }
        },
        (error) => {
          console.warn('Geolocation failed:', error);
          setUserLocation("Location unavailable");
        },
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 3600000
        }
      );
    } else {
      setUserLocation("Location not supported");
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const location = userLocation + " (Automatically detected)";
  const time = currentTime + " (Automatically attached)";

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(URL.createObjectURL(file));
      setPhotoFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setPhoto(URL.createObjectURL(file));
      setPhotoFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!photoFile || !adventure.trim()) {
      alert('Please upload a photo and add a description of your adventure!');
      return;
    }

    setIsSubmitting(true);
    try {
      const proofData = {
        questId,
        description: adventure,
        file: photoFile
      };
      
      await dispatch(submitQuestProof(proofData)).unwrap();
      alert('Quest proof submitted successfully!');
      navigate(`/quest-in-progress/${questId}`);
    } catch (error) {
      console.error('Error submitting proof:', error);
      alert('Failed to submit quest proof. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-14 px-4 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading quest...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-slate-50 min-h-screen py-14 px-4 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading quest: {error}</p>
          <button 
            onClick={() => navigate('/quest')}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Back to Quests
          </button>
        </div>
      </div>
    );
  }

  // Show message if no quest data
  if (!currentQuest) {
    return (
      <div className="bg-slate-50 min-h-screen py-14 px-4 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Quest not found</p>
          <button 
            onClick={() => navigate('/quest')}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Back to Quests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-14 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-2 text-sm text-teal-600 font-semibold flex items-center gap-2">
          <span>Quest Details</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500">Proof Upload</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          Complete Quest: {currentQuest.title}
        </h1>
        <p className="text-slate-500 mb-8">
          Upload a photo demonstrating you completed this quest.
        </p>

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

        <div className="flex justify-center mb-6">
          <button
            type="button"
            className="bg-slate-100 text-slate-700 px-6 py-2 rounded-full font-semibold shadow hover:bg-teal-50 transition"
          >
            Take Photo
          </button>
        </div>

        <textarea
          className="w-full rounded-xl border border-slate-200 bg-white p-4 text-slate-700 mb-5 resize-none shadow focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
          rows={4}
          placeholder="Tell us about your adventure!"
          value={adventure}
          onChange={e => setAdventure(e.target.value)}
        />

        <div className="w-full mb-6">
          <div className="flex items-center py-2 text-slate-500 border-b border-slate-100">
            <span className="w-24 font-semibold text-slate-700">Location</span>
            <span className="ml-3">{location}</span>
          </div>
          {coordinates && (
            <div className="flex items-center py-2 text-slate-500 border-b border-slate-100">
              <span className="w-24 font-semibold text-slate-700">Coordinates</span>
              <span className="ml-3 text-blue-600 font-mono text-sm">
                {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </span>
            </div>
          )}
          <div className="flex items-center py-2 text-slate-500">
            <span className="w-24 font-semibold text-slate-700">Time</span>
            <span className="ml-3">{time}</span>
          </div>
        </div>

        <div className="flex gap-5 justify-center mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !photoFile || !adventure.trim()}
            className="bg-teal-500 hover:bg-teal-600 transition text-white px-8 py-3 rounded-full font-semibold shadow text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Proof'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/quest-in-progress/${questId}`)}
            className="bg-slate-100 text-slate-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-slate-200 transition text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}