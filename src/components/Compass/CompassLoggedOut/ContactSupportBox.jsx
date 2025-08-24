import React from "react";
import { Link } from "react-router-dom";
import { Mail, Bug } from "lucide-react";

function ContactSupportBox() {
  return (
    <section className="w-full px-4 py-14 bg-[#EBF2FF]">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-[#CADCFC] via-[#EBF2FF] to-[#CADCFC] border border-[#CADCFC] rounded-2xl px-6 sm:px-10 py-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">

          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1B2A] mb-1">
              Need help? Contact us Directly
            </h2>
            <p className="text-[#2C3E50] text-sm sm:text-base">
              For any-specific issues, You can reach us here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-white/60 backdrop-blur-md text-[#2C3E50] font-semibold px-5 py-3 rounded-lg transition-all shadow border border-white/30 hover:bg-white/30 hover:text-[#4A90E2]"
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </Link>

            <a
              href="/report-bug"
              className="shine-sweep inline-flex items-center justify-center gap-2 bg-[#EBF2FF] border border-[#4A90E2]/50 text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white font-semibold px-5 py-3 rounded-lg transition-all shadow"
            >
              <Bug className="w-4 h-4" />
              Report a Public Bug
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSupportBox;
