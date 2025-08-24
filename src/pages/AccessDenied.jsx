import React from "react";
import { Lock, UserPlus, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-lg w-full">
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-2xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-2xl shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Access Restricted
          </h1>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            This area is for registered adventurers only. Join Zephyra to unlock exclusive quests, earn XP, and start your journey!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="shine-sweep inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </Link>
            
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Log In
            </Link>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-indigo-600">Join thousands</span> of adventurers exploring amazing quests and discovering hidden gems in their cities.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-gray-500 hover:text-indigo-600 transition-colors duration-200 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AccessDenied;
