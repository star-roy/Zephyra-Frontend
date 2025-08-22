import React from "react";
import { Shield, Eye, Lock, UserCheck, Mail, Calendar } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal information you provide (name, email, username) during registration",
        "Quest completion data and progress tracking",
        "User-generated content such as quest reviews and tips", 
        "Device information and usage analytics to improve our service",
        "Location data for location-based quests (with your permission)"
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Provide personalized quest recommendations and experiences",
        "Track your adventure progress and award achievements",
        "Enable social features like friend connections and leaderboards",
        "Send important updates and notifications about your quests",
        "Improve our platform and develop new features"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Data Protection & Security",
      content: [
        "We use industry-standard encryption to protect your data",
        "Your password is securely hashed and never stored in plain text",
        "We implement regular security audits and updates",
        "Access to your data is strictly limited to authorized personnel",
        "We comply with international data protection regulations"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Your Privacy Rights",
      content: [
        "Access and download your personal data at any time",
        "Update or correct your profile information",
        "Delete your account and associated data",
        "Control your privacy settings and data sharing preferences",
        "Opt out of non-essential communications"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Your privacy is at the heart of everything we do. Learn how Zephyra protects and respects your personal information.
            </p>
            <div className="flex items-center justify-center mt-8 text-indigo-200">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Last updated: August 15, 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Welcome to Zephyra</h2>
            <div className="prose lg:prose-lg text-gray-600 leading-relaxed">
              <p className="mb-4">
                At Zephyra, we believe that epic adventures should come with complete peace of mind. This Privacy Policy explains how we collect, use, and protect your information when you embark on quests through our platform.
              </p>
              <p className="mb-4">
                By using Zephyra, you agree to the collection and use of information in accordance with this policy. We will never sell your personal data to third parties, and we're committed to being transparent about our practices.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8 lg:p-10">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white mr-4">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{section.title}</h3>
                </div>
                <ul className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-600 text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 lg:p-12 border border-indigo-100">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Third-Party Services</h3>
          <div className="prose lg:prose-lg text-gray-600 leading-relaxed">
            <p className="mb-4">
              Zephyra integrates with select third-party services to enhance your experience:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li><strong>Cloudinary:</strong> For secure image and file storage</li>
              <li><strong>Email Services:</strong> For account verification and notifications</li>
              <li><strong>Analytics:</strong> To understand how our platform is used (anonymized data only)</li>
            </ul>
            <p>
              These services have their own privacy policies, and we ensure they meet our high standards for data protection.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white">
              <Mail className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Questions About Your Privacy?</h3>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            We're here to help! If you have any questions about this Privacy Policy or how we handle your data, don't hesitate to reach out.
          </p>
          <div className="space-y-4">
            <a 
              href="mailto:zephyra.usercontact@gmail.com" 
              className="shine-sweep inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Privacy Team
            </a>
            <p className="text-sm text-gray-500">
              Or email us directly at: <span className="font-sans text-base font-semibold text-indigo-600">zephyra.usercontact@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}