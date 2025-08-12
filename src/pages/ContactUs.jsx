import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaChevronDown,
} from "react-icons/fa";
import api from "../utils/axiosConfig";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [submitMessage, setSubmitMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus("error");
      setSubmitMessage("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (formData.message.trim().length < 10) {
      setSubmitStatus("error");
      setSubmitMessage("Message must be at least 10 characters long.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await api.post("/users/contact-us", formData);
      
      if (response.data.success) {
        setSubmitStatus("success");
        setSubmitMessage(response.data.message);
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        error.response?.data?.message || 
        "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  // FAQ data
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the Sign Up button and fill in your details to create a new account."
    },
    {
      question: "How can I reset my password?",
      answer: "Use the Forgot Password link on the login page to reset your password via email."
    },
    {
      question: "Where can I find support?",
      answer: "You can contact us via email, phone, or the contact form on this page."
    },
    {
      question: "Is Zephyra free to use?",
      answer: "Yes, Zephyra offers free access to all core features. Premium features may be available in the future."
    }
  ];

  // FAQ accordion state
  const [openIndex, setOpenIndex] = React.useState(null);
  return (
    <div>
      <div className="relative min-h-screen px-4 sm:px-6 lg:px-16 py-16 flex items-center justify-center">
        {/* Foreground Content */}
        <div className="relative w-full z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-4xl font-bold text-[#0D1B2A] drop-shadow">Get in Touch</h1>
            <p className="text-[#4A90E2] font-medium mt-2 max-w-2xl mx-auto text-base sm:text-lg">
              We’re here to help! Whether you have a question, feedback, or need assistance, our team is ready to answer all your questions.
            </p>
          </div>
          {/* Form + Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Form */}
            <div className="md:col-span-2 bg-white/90 p-8 rounded-2xl border-2 border-[#CADCFC]/60 shadow-2xl shadow-[#CADCFC]/30 backdrop-blur-lg flex flex-col justify-center min-h-[520px]">
              <h2 className="text-3xl font-bold text-[#0D1B2A] mb-6">Send us a Message</h2>
              
              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  {submitMessage}
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {submitMessage}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full border border-[#CADCFC] rounded-lg px-4 py-3 text-base outline-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/30 focus:border-[#4A90E2] transition"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full border border-[#CADCFC] rounded-lg px-4 py-3 text-base outline-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/30 focus:border-[#4A90E2] transition"
                  required
                />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full border border-[#CADCFC] rounded-lg px-4 py-3 text-base outline-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/30 focus:border-[#4A90E2] transition"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Support">Support</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Feedback">Feedback</option>
                </select>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full border border-[#CADCFC] rounded-lg px-4 py-3 text-base outline-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/30 focus:border-[#4A90E2] transition"
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`shine-sweep bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-[#4A90E2]/30 transition-all duration-200 ${
                    isSubmitting 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:scale-105"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
            {/* Contact Info + Socials */}
            <div className="space-y-6">
              <div className="bg-white/90 p-6 rounded-2xl border-2 border-[#CADCFC]/60 shadow-2xl shadow-[#CADCFC]/30 backdrop-blur-lg"> 
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-4">Other Ways to Reach Us</h3>
                <div className="space-y-4 text-base text-[#2C3E50]">
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-[#4A90E2]" /> zephyra.usercontact@gmail.com
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhoneAlt className="text-[#4A90E2]" /> +91 99999 99999<br />
                    <span className="ml-6 text-xs text-[#4A90E2]">Mon - Fri, 10am - 5pm</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#4A90E2]" />
                     ITER College, Jagamohan Nagar, Bhubaneswar, IN 751030
                  </p>
                </div>
              </div>
              {/* Social Links */}
              <div className="bg-white/90 p-6 rounded-2xl shadow-2xl border-2 border-[#CADCFC]/60 shadow-[#CADCFC]/30 backdrop-blur-lg">
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/star-roy"
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full text-[#4A90E2] bg-[#EAF2FF] hover:bg-[#4A90E2] hover:text-white transition-all duration-150 shadow"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://x.com/dibyar4j?t=BLzRJmCVaW-Xfi2dY27W9A&s=09"
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full text-[#4A90E2] bg-[#EAF2FF] hover:bg-[#4A90E2] hover:text-white transition-all duration-150 shadow"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full text-[#4A90E2] bg-[#EAF2FF] hover:bg-[#4A90E2] hover:text-white transition-all duration-150 shadow"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>

              {/* Image Section */}
              <div className="bg-white/90 p-6 rounded-2xl shadow-2xl border-2 border-[#CADCFC]/60 shadow-[#CADCFC]/30 backdrop-blur-lg mt-6 flex flex-col items-center">
                <img src="/team1.webp" alt="Zephyra Team" className="w-32 h-32 rounded-full object-cover border-4 border-[#CADCFC] mb-4" />
                <h4 className="text-[#0D1B2A] font-semibold text-base mb-2">Meet Our Team</h4>
                <p className="text-[#2C3E50] text-sm text-center">We're a group of passionate explorers and creators. Reach out and connect with us!</p>
              </div>
            </div>
          </div>
          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#0D1B2A] mb-2 drop-shadow">Frequently Asked Questions</h2>
            <p className="text-[#4A90E2] mb-6 text-base">
              Find quick answers to common questions about Zephyra.
            </p>
            <div className="space-y-3 text-left">
              {faqs.map((item, i) => (
                <div
                  key={i}
                  className={`bg-white/90 border border-[#CADCFC] rounded-xl p-5 transition-all duration-200 hover:shadow-lg cursor-pointer shadow-sm shadow-[#CADCFC]/30 backdrop-blur-lg ${openIndex === i ? 'ring-2 ring-[#4A90E2]/30' : ''}`}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-[#0D1B2A]">{item.question}</p>
                    <FaChevronDown
                      className={`transition-transform duration-300 ${openIndex === i ? "rotate-180 text-[#4A90E2]" : "text-[#CADCFC]"}`}
                    />
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-base text-[#2C3E50]">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
