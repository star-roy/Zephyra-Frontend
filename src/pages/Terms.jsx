import React from "react";
import { FileText, Users, Shield, AlertTriangle, Scale, Mail, Calendar, CheckCircle } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Account & User Conduct",
      content: [
        "You must be at least 13 years old to create an account on Zephyra",
        "Provide accurate and complete information during registration",
        "Keep your account credentials secure and don't share them with others",
        "Respect other users and maintain a positive community environment",
        "Do not use Zephyra for any illegal, harmful, or inappropriate activities"
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Quest Participation",
      content: [
        "Participate in quests at your own risk and follow all local laws and regulations",
        "Respect private property and public spaces during quest activities",
        "Complete quest tasks honestly and accurately",
        "Report any safety concerns or inappropriate content immediately",
        "Quest completion rewards and achievements are at Zephyra's discretion"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Intellectual Property",
      content: [
        "All Zephyra content, including logos, text, and graphics, is our property",
        "You retain rights to content you create, but grant us license to use it",
        "Do not copy, modify, or redistribute our content without permission",
        "Respect third-party intellectual property rights in your submissions",
        "We may use your quest reviews and tips to improve our platform"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Limitation of Liability",
      content: [
        "Zephyra is provided 'as is' without warranties of any kind",
        "We are not liable for injuries or damages occurring during quests",
        "Use of our platform is at your own risk and discretion",
        "We are not responsible for third-party content or external websites",
        "Our total liability is limited to the amount you've paid for our services"
      ]
    }
  ];

  const highlights = [
    {
      icon: <Scale className="w-5 h-5" />,
      title: "Fair Play",
      description: "We believe in honest quest completion and fair recognition for all adventurers."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Community First",
      description: "Respectful behavior and positive interactions make adventures better for everyone."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Safety Matters",
      description: "Your safety is paramount. We provide guidelines, but you make the smart choices."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <FileText className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              The guidelines that keep our adventure community safe, fair, and exciting for everyone.
            </p>
            <div className="flex items-center justify-center mt-8 text-blue-200">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Last updated: August 15, 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Principles</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do at Zephyra
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white">
                  {highlight.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{highlight.title}</h3>
              <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Agreement to Terms</h2>
            <div className="prose lg:prose-lg text-gray-600 leading-relaxed">
              <p className="mb-4">
                Welcome to Zephyra! By accessing and using our platform, you agree to be bound by these Terms and Conditions. These terms create a legal agreement between you and Zephyra, governing your use of our quest platform and services.
              </p>
              <p className="mb-4">
                If you disagree with any part of these terms, please do not use our service. We may update these terms from time to time, and continued use of Zephyra constitutes acceptance of any changes.
              </p>
              <p className="font-semibold text-blue-600">
                Please read these terms carefully before embarking on your adventure journey with us.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8 lg:p-10">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white mr-4">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{section.title}</h3>
                </div>
                <ul className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-600 text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 lg:p-12 border border-red-100">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Account Termination</h3>
          <div className="prose lg:prose-lg text-gray-600 leading-relaxed">
            <p className="mb-4">
              We reserve the right to suspend or terminate accounts that violate these terms or engage in behavior that harms our community. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Providing false information or impersonating others</li>
              <li>Harassment, bullying, or inappropriate behavior toward other users</li>
              <li>Attempting to cheat or manipulate quest completion systems</li>
              <li>Violating intellectual property rights or posting inappropriate content</li>
              <li>Any illegal activity or violation of local laws during quests</li>
            </ul>
            <p>
              You may delete your account at any time through your profile settings. Upon termination, your access to Zephyra will cease, though some information may be retained as required by law.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12 border border-blue-100">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Changes to These Terms</h3>
          <div className="prose lg:prose-lg text-gray-600 leading-relaxed">
            <p className="mb-4">
              As Zephyra grows and evolves, we may need to update these Terms and Conditions. When we make significant changes, we will:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Notify you via email or through our platform</li>
              <li>Update the "Last Modified" date at the top of this page</li>
              <li>Provide a reasonable notice period before changes take effect</li>
              <li>Highlight major changes in our communication</li>
            </ul>
            <p>
              Your continued use of Zephyra after any changes indicates your acceptance of the new terms.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white">
              <Mail className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Questions About These Terms?</h3>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            We want to make sure you understand your rights and responsibilities. If you have any questions about these Terms and Conditions, we're here to help.
          </p>
          <div className="space-y-4">
            <a 
              href="mailto:zephyra.usercontact@gmail.com" 
              className="shine-sweep inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Legal Team
            </a>
            <p className="text-sm text-gray-500">
              Or email us directly at: <span className="font-sans text-base font-semibold text-blue-600">zephyra.usercontact@gmail.com</span>
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-2xl p-8 lg:p-12 border border-gray-200">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Governing Law</h3>
          <div className="prose lg:prose-lg text-gray-600 leading-relaxed">
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction where Zephyra is incorporated. Any disputes arising from these terms will be resolved through the appropriate legal channels in that jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}