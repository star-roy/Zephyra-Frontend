import React from "react";
import {
  FaMapSigns,
  FaUsers,
  FaTools,
  FaMobileAlt,
  FaComments,
  FaBug,
  FaTicketAlt,
  FaRegCommentDots,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function KnowledgeSupportSection() {
  const navigate = useNavigate();

  const guides = [
    { title: "Quests & Progression", icon: <FaMapSigns className="text-blue-500" /> },
    { title: "Community & Social", icon: <FaUsers className="text-blue-500" /> },
    { title: "Technical Help", icon: <FaTools className="text-blue-500" /> },
    { title: "App Features", icon: <FaMobileAlt className="text-blue-500" /> },
  ];

  const supportOptions = [
    { label: "Chat with Support", icon: <FaComments />, primary: true, path: "/chat-support" },
    { label: "Submit a Ticket", icon: <FaTicketAlt />, path: "/submit-ticket" },
    { label: "Report a Bug", icon: <FaBug />, path: "/report-bug" },
    { label: "Provide Feedback", icon: <FaRegCommentDots />, path: "/provide-feedback" },
  ];

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 py-10">
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">

        <div className="sm:col-span-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-midnightIndigo mb-4">
            Knowledge Base & Guides
          </h2>

          <div className="space-y-4">
            {guides.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition px-5 py-4 flex justify-between items-center group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl">{item.icon}</div>
                  <span className="text-sm sm:text-base text-midnightIndigo font-medium">
                    {item.title}
                  </span>
                </div>
                <FaArrowRight className="text-gray-400 group-hover:text-midnightIndigo text-xs sm:text-sm" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-midnightIndigo mb-4">
            Need More Help?
          </h2>

          {supportOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => navigate(option.path)}
              className={`shine-sweep w-full flex items-center justify-start gap-3 text-sm sm:text-base font-semibold px-4 py-3 rounded-lg transition ${
                option.primary
                  ? "bg-blue-500 text-white hover:bg-zephyraDark"
                  : "bg-white border border-gray-300 text-midnightIndigo hover:text-blue-500 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              {option.label}
            </button>
          ))}

          <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">
             System Status : All systems are Under Development.
          </p>
        </div>

      </div>
    </section>
  );
}

export default KnowledgeSupportSection;