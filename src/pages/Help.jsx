import React, { useState } from "react";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  Map, 
  Trophy, 
  Users, 
  Settings, 
  Shield, 
  Mail,
  MessageSquare,
  Compass,
  Star,
  BookOpen,
  Lightbulb,
  Heart
} from "lucide-react";

export default function Help() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Getting Started",
      description: "Learn the basics of using Zephyra",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: "Quests & Adventures",
      description: "Everything about finding and completing quests",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Achievements & Rewards",
      description: "Understanding badges, XP, and progression",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social Features",
      description: "Connect with friends and the community",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Account & Settings",
      description: "Manage your profile and preferences",
      color: "from-gray-500 to-slate-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety & Privacy",
      description: "Stay safe while adventuring",
      color: "from-red-500 to-rose-500"
    }
  ];

  const faqs = [
    {
      category: "Getting Started",
      question: "How do I create my first quest?",
      answer: "To create your first quest, navigate to the 'Create Quest' section from your dashboard. Choose a quest type (exploration, cultural, adventure, etc.), add a compelling title and description, set your location, and define the tasks participants need to complete. Don't forget to add photos and tips to make your quest engaging!"
    },
    {
      category: "Getting Started",
      question: "What is XP and how do I earn it?",
      answer: "XP (Experience Points) are earned by completing quests, discovering hidden gems, helping other adventurers, and contributing to the community. The more challenging the quest, the more XP you'll earn. XP helps you level up and unlock new badges and achievements."
    },
    {
      category: "Quests",
      question: "How do I find quests near me?",
      answer: "Use the 'Explore' feature on your dashboard. You can filter quests by location, category, difficulty level, and estimated time. The map view shows all available quests in your area, and you can use the search function to find specific types of adventures."
    },
    {
      category: "Quests",
      question: "Can I do quests with friends?",
      answer: "Absolutely! You can invite friends to join your quest adventures. Some quests are specifically designed for groups, while others can be completed solo or with friends. Use the 'Invite Friends' feature when starting a quest to share the adventure."
    },
    {
      category: "Achievements",
      question: "How do I unlock badges?",
      answer: "Badges are earned by reaching specific milestones, completing certain types of quests, or demonstrating particular skills. Check your 'Achievements' page to see available badges and their requirements. Some badges are earned automatically, while others require specific actions."
    },
    {
      category: "Social",
      question: "How do I add friends on Zephyra?",
      answer: "You can add friends by searching for their username in the 'Friends' section, by meeting them during quests, or by sharing your unique friend code. Once connected, you can see their adventures, compete on leaderboards, and join quests together."
    },
    {
      category: "Account",
      question: "How do I change my profile information?",
      answer: "Go to 'Settings' from your profile menu. Here you can update your display name, bio, profile picture, privacy settings, and notification preferences. Some changes may require email verification for security."
    },
    {
      category: "Safety",
      question: "What safety measures should I take during quests?",
      answer: "Always inform someone of your quest plans, carry a fully charged phone, follow local laws and regulations, respect private property, and trust your instincts. If a quest location feels unsafe, don't hesitate to skip it. Your safety is more important than completing any quest."
    },
    {
      category: "Account",
      question: "I forgot my password. How do I reset it?",
      answer: "Click 'Forgot Password' on the login page and enter your email address. We'll send you a secure reset link. Follow the instructions in the email to create a new password. Make sure to choose a strong, unique password for your account security."
    },
    {
      category: "Quests",
      question: "What happens if I can't complete a quest task?",
      answer: "Don't worry! You can pause a quest at any time and return to it later. Some tasks might have alternative completion methods, and you can always ask for help in the quest comments. If a quest becomes impossible due to circumstances beyond your control, contact our support team."
    }
  ];

  const filteredFAQs = faqs;

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <HelpCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
              Help Center
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know to make the most of your Zephyra adventures
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Browse Help Topics</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers organized by topic
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="flex items-center mb-4">
                <div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl text-white mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Quick answers to common questions
          </p>
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-2">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  {openFAQ === index ? (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </div>
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12 border border-blue-100">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Popular Help Articles</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Most viewed articles by our community</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                <span className="text-sm text-blue-600 font-medium">Getting Started</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Creating Your First Quest</h4>
              <p className="text-gray-600 text-sm">Step-by-step guide to creating engaging quests for other adventurers.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                <span className="text-sm text-blue-600 font-medium">Quests</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Finding Nearby Adventures</h4>
              <p className="text-gray-600 text-sm">Discover amazing quests and hidden gems in your local area.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                <span className="text-sm text-blue-600 font-medium">Safety</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Adventure Safety Tips</h4>
              <p className="text-gray-600 text-sm">Essential safety guidelines for exploring and completing quests.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">Still Need Help?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you with any questions or issues.
          </p>
          <div className="space-y-4">
            <a 
              href="mailto:zephyra.usercontact@gmail.com" 
              className="shine-sweep inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support Team
            </a>
            <p className="text-sm text-blue-200">
              Or email us directly at: <span className="font-sans text-base font-semibold text-white">zephyra.usercontact@gmail.com</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 lg:p-12 border border-green-100">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                <Lightbulb className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Pro Tips for Better Adventures</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Expert advice from seasoned adventurers</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">📱</span>
                <h4 className="font-bold text-gray-900">Use the Mobile App</h4>
              </div>
              <p className="text-gray-600">Download our mobile app for the best quest experience with offline maps and real-time updates.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">🗺️</span>
                <h4 className="font-bold text-gray-900">Plan Your Route</h4>
              </div>
              <p className="text-gray-600">Group nearby quests together to maximize your adventure time and discover more hidden gems.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">📸</span>
                <h4 className="font-bold text-gray-900">Share Your Journey</h4>
              </div>
              <p className="text-gray-600">Take photos and write reviews to help other adventurers and earn bonus XP for quality contributions.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">👥</span>
                <h4 className="font-bold text-gray-900">Join the Community</h4>
              </div>
              <p className="text-gray-600">Connect with fellow adventurers, share tips, and participate in community events for exclusive rewards.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 lg:p-12 border border-purple-100">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                <Heart className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Community & Resources</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Connect with fellow adventurers and access additional resources</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Community Forum</h4>
              <p className="text-gray-600 mb-4">Connect with other adventurers, share experiences, and get help from the community.</p>
              <button className="shine-sweep px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                Join Community
              </button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Adventure Guide</h4>
              <p className="text-gray-600 mb-4">Comprehensive guides on quest creation, safety tips, and advanced features.</p>
              <button className="shine-sweep px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                Read Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}