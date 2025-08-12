import React, { useRef, useState } from "react";
import axiosConfig from "../utils/axiosConfig";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function ReportBug() {
  const fileInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    description: '',
    stepsToReproduce: '',
    expectedBehavior: '',
    actualBehavior: '',
    attachments: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    
    // Validation
    if (!formData.email.trim()) {
      setSubmitStatus("error");
      setStatusMessage("Please provide your email address");
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus("error");
      setStatusMessage("Please provide a valid email address");
      return;
    }
    
    if (!formData.subject.trim()) {
      setSubmitStatus("error");
      setStatusMessage("Please provide a subject for the bug report");
      return;
    }
    if (!formData.description.trim()) {
      setSubmitStatus("error");
      setStatusMessage("Please provide a description of the bug");
      return;
    }
    if (!formData.stepsToReproduce.trim()) {
      setSubmitStatus("error");
      setStatusMessage("Please provide steps to reproduce the bug");
      return;
    }

    try {
      setIsLoading(true);
      
      // Create FormData for file uploads
      const submitData = new FormData();
      submitData.append('email', formData.email);
      submitData.append('subject', formData.subject);
      submitData.append('description', formData.description);
      submitData.append('stepsToReproduce', formData.stepsToReproduce);
      submitData.append('expectedBehavior', formData.expectedBehavior);
      submitData.append('actualBehavior', formData.actualBehavior);
      
      // Add attachments
      formData.attachments.forEach((file) => {
        submitData.append(`attachments`, file);
      });

      const response = await axiosConfig.post('/users/report-bug', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSubmitStatus("success");
        setStatusMessage(response.data.message || "Bug report submitted successfully! Thank you for helping us improve Zephyra.");
        
        // Reset form
        setFormData({
          email: '',
          subject: '',
          description: '',
          stepsToReproduce: '',
          expectedBehavior: '',
          actualBehavior: '',
          attachments: []
        });
        
        // Clear file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }

    } catch (error) {
      console.error('Bug report submission error:', error);
      setSubmitStatus("error");
      setStatusMessage(
        error.response?.data?.message || 
        "Failed to submit bug report. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FBFA] min-h-screen flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-extrabold text-midnightIndigo text-center mb-3">Report a Bug</h1>
        <p className="text-center text-lg text-blue-500 mb-8">
          We appreciate your help in making <b>Zephyra</b> better. Please be as detailed as possible.
        </p>
        
        <form onSubmit={handleSubmit}>
          {/* Status Messages */}
          <div className="mb-6">
            {submitStatus === "success" && (
              <div className="p-4 bg-blue-100 border border-blue-300 text-blue-700 rounded-lg">
                {statusMessage}
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {statusMessage}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">Your Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g., your.email@example.com"
              className="w-full rounded-lg px-5 py-3 text-blue-700 bg-blue-100/65 placeholder-blue-400 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
              required
            />
            <p className="text-sm text-gray-500 mt-1">We'll use this email to send you updates about your bug report</p>
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="e.g., Map doesn't load on mobile"
              className="w-full rounded-lg px-5 py-3 text-blue-700 bg-blue-100/65 placeholder-blue-400 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="A clear and concise description of what the bug is."
              className="w-full rounded-lg px-5 py-3 text-blue-700 bg-blue-100/65 placeholder-blue-400 border-none shadow-sm focus:ring-2 focus:ring-blue-200 resize-none"
              required
            />
          </div>

          {/* Steps to Reproduce */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">Steps to Reproduce *</label>
            <textarea
              name="stepsToReproduce"
              value={formData.stepsToReproduce}
              onChange={handleInputChange}
              rows={3}
              placeholder={`1. Go to '...'\n2. Click on '...'\n3. Scroll down to '...'`}
              className="w-full rounded-lg px-5 py-3 text-blue-700 bg-blue-100/65 placeholder-blue-400 border-none shadow-sm focus:ring-2 focus:ring-blue-200 resize-none"
              required
            />
          </div>

          {/* Expected vs Actual */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block font-medium text-gray-700 mb-2">Expected Behavior</label>
              <textarea
                name="expectedBehavior"
                value={formData.expectedBehavior}
                onChange={handleInputChange}
                rows={2}
                placeholder="What did you expect to happen?"
                className="w-full rounded-lg px-5 py-3 text-blue-700 bg-blue-100/65 placeholder-blue-400 border-none shadow-sm focus:ring-2 focus:ring-blue-200 resize-none"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium text-gray-700 mb-2">Actual Behavior</label>
              <textarea
                name="actualBehavior"
                value={formData.actualBehavior}
                onChange={handleInputChange}
                rows={2}
                placeholder="What actually happened?"
                className="w-full rounded-lg px-5 py-3 text-blue-700 bg-blue-100/65 placeholder-blue-400 border-none shadow-sm focus:ring-2 focus:ring-blue-200 resize-none"
              />
            </div>
          </div>

          {/* Attachment Upload */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">Attachments (Optional)</label>
            <div
              className="w-full bg-blue-100/65 border-2 border-dashed border-blue-300 rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer transition hover:border-blue-400"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="4" y="14" width="32" height="18" rx="4" fill="#beddff" />
                <path d="M20 27V11M20 11l-5 5.5M20 11l5 5.5" stroke="#2896f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="20" r="19" stroke="#2896f8" strokeWidth="2" opacity="0.13" />
              </svg>
              <div className="mt-3 text-center text-blue-500 font-semibold">
                Click to upload <span className="font-normal text-gray-400">or drag and drop<br />PNG, JPG, GIF up to 10MB</span>
              </div>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/png, image/jpeg, image/gif"
              />
            </div>
            
            {/* Display uploaded files */}
            {formData.attachments.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Uploaded files:</p>
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded mb-2">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`shine-sweep w-full py-3 rounded-full font-bold text-lg shadow-md transition ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-400 hover:bg-blue-500'
            } text-white`}
          >
            {isLoading ? 'Submitting Report...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}