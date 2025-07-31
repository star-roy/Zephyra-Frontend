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
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I start a quest?",
      answer: "You can start a quest by exploring the map and tapping on any available adventure listed in your city zone.",
    },
    {
      question: "What are the rewards for completing quests?",
      answer: "Completing quests rewards you with XP and collectible badges. Some premium quests may offer real-world rewards.",
    },
    {
      question: "How do I report a problem with a quest?",
      answer: "Go to the Compass page, select 'Report Issue' under the quest card, and describe the problem you're facing.",
    },
  ];

  return (
    <div className="bg-[#F9FBFF] px-4 sm:px-6 lg:px-16 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Get in Touch</h1>
        <p className="text-[#4A90E2] mt-2 max-w-2xl mx-auto">
          We’re here to help! Whether you have a question, feedback, or need assistance, our team is ready to answer all your questions.
        </p>
      </div>

      {/* Form + Contact Info */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {/* Form */}
        <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-xl  border-2 border-[#CADCFC]/60 shadow-lg shadow-[#CADCFC]">
          <h2 className="text-2xl font-semibold text-[#0D1B2A] mb-6">Send us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-[#CADCFC] rounded-lg px-4 py-3 text-sm outline-[#4A90E2]"
            />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-[#CADCFC] rounded-lg px-4 py-3 text-sm outline-[#4A90E2]"
            />
            <select
              className="w-full border border-[#CADCFC] rounded-lg px-4 py-3 text-sm outline-[#4A90E2]"
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
              className="w-full border border-[#CADCFC] rounded-lg px-4 py-3 text-sm outline-[#4A90E2]"
            ></textarea>
            <button
              type="submit"
              className="bg-[#4A90E2] hover:bg-[#2C3E50] text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info + Socials */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border-2 border-[#CADCFC]/60 shadow-lg shadow-[#CADCFC]"> 
            <h3 className="text-lg font-semibold text-[#0D1B2A] mb-4">Other Ways to Reach Us</h3>
            <div className="space-y-4 text-sm text-[#2C3E50]">
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
          <div className="bg-white p-6 rounded-xl shadow-md border-2 border-[#CADCFC]/60 shadow-[#CADCFC]">
            <h3 className="text-lg font-semibold text-[#0D1B2A] mb-6">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#4A90E2] bg-[#EAF2FF] hover:bg-[#4A90E2] hover:text-white transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://facebook.com"
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#4A90E2] bg-[#EAF2FF] hover:bg-[#4A90E2] hover:text-white transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#4A90E2] bg-[#EAF2FF] hover:bg-[#4A90E2] hover:text-white transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#0D1B2A] mb-2">Frequently Asked Questions</h2>
        <p className="text-[#4A90E2] mb-6 text-sm">
          Find quick answers to common questions about Zephyra.
        </p>

        <div className="space-y-3 text-left">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#CADCFC] rounded-lg p-4 transition hover:shadow cursor-pointer shadow-sm shadow-[#CADCFC]"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-[#0D1B2A]">{item.question}</p>
                <FaChevronDown
                  className={`transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openIndex === i && (
                <p className="text-sm text-[#2C3E50] mt-2">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
