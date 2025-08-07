import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaFacebookF,
  FaInstagram,
  FaChevronDown,
} from "react-icons/fa";

const Contact = () => {
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
            <div className="md:col-span-2 bg-white/90 p-8 rounded-2xl border-2 border-[#CADCFC]/60 shadow-2xl shadow-[#CADCFC]/30 backdrop-blur-lg">
              <h2 className="text-2xl font-bold text-[#0D1B2A] mb-6">Send us a Message</h2>
              <form className="space-y-5">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-[#CADCFC] rounded-lg px-4 py-3 text-base outline-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/30 focus:border-[#4A90E2] transition"
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-[#CADCFC] rounded-lg px-4 py-3 text-base outline-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/30 focus:border-[#4A90E2] transition"
                />
                <select
                  className="w-full border border-[#CADCFC] rounded-lg px-4 py-3 text-base outline-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/30 focus:border-[#4A90E2] transition"
                  defaultValue="General Inquiry"
                >
                  <option>General Inquiry</option>
                  <option>Support</option>
                  <option>Partnership</option>
                  <option>Feedback</option>
                </select>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full border border-[#CADCFC] rounded-lg px-4 py-3 text-base outline-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/30 focus:border-[#4A90E2] transition"
                ></textarea>
                <button
                  type="submit"
                  className="shine-sweep bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-[#4A90E2]/30 transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
            {/* Contact Info + Socials */}
            <div className="space-y-6">
              <div className="bg-white/90 p-6 rounded-2xl border-2 border-[#CADCFC]/60 shadow-2xl shadow-[#CADCFC]/30 backdrop-blur-lg"> 
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-4">Other Ways to Reach Us</h3>
                <div className="space-y-4 text-base text-[#2C3E50]">
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-[#4A90E2]" /> support@zephyra.com
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhoneAlt className="text-[#4A90E2]" /> +91 99999 99999<br />
                    <span className="ml-6 text-xs text-[#4A90E2]">Mon - Fri, 9am - 5pm</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#4A90E2]" />
                    45 Zephyra Street, Wonder City, IN 123456
                  </p>
                </div>
              </div>
              {/* Social Links */}
              <div className="bg-white/90 p-6 rounded-2xl shadow-2xl border-2 border-[#CADCFC]/60 shadow-[#CADCFC]/30 backdrop-blur-lg">
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com"
                    className="w-10 h-10 flex items-center justify-center rounded-full text-[#4A90E2] bg-[#EAF2FF] hover:bg-[#4A90E2] hover:text-white transition-all duration-150 shadow"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://facebook.com"
                    className="w-10 h-10 flex items-center justify-center rounded-full text-[#4A90E2] bg-[#EAF2FF] hover:bg-[#4A90E2] hover:text-white transition-all duration-150 shadow"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://instagram.com"
                    className="w-10 h-10 flex items-center justify-center rounded-full text-[#4A90E2] bg-[#EAF2FF] hover:bg-[#4A90E2] hover:text-white transition-all duration-150 shadow"
                  >
                    <FaInstagram />
                  </a>
                </div>
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
