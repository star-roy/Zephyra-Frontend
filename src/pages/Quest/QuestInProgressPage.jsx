import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const zephyraBlue = "#7F56D9";
const zephyraGold = "#FDB022";

// --- Quest Tips & Safety Card ---
function QuestTipsCard() {
  return (
    <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-7 w-full max-w-[340px] flex flex-col gap-2 self-start">
      <div className="font-bold text-[#22223B] text-lg mb-2">Quest Tips & Safety</div>
      <ul className="list-disc ml-4 text-[#667085] text-base mb-2">
        <li>Stay hydrated and wear comfortable shoes.</li>
        <li>Be mindful of traffic when exploring urban areas.</li>
        <li>Ask locals for recommendations—they know the hidden gems!</li>
        <li>Respect public spaces and preserve the environment.</li>
      </ul>
      <div className="mt-3 text-sm text-[#7F56D9] font-semibold">
        Need help? <a href="/support" className="underline hover:text-[#5d3bb2]">Contact support</a>
      </div>
    </div>
  );
}

export default function QuestInProgressPage() {
  const [objectives, setObjectives] = useState([
    {
      label: "Visit the historic Delton Clock Tower and take a photo.",
      completed: true
    },
    {
      label: "Find the hidden mural in the alley behind Main Street Cafe.",
      completed: false
    },
    {
      label: "Enjoy a pastry at the local bakery, 'Sweet Delights'.",
      completed: false
    }
  ]);
  const [hintRevealed, setHintRevealed] = useState(false);
  const navigate = useNavigate();

  // Height sync refs
  const proofRef = useRef(null);
  const rewardsRef = useRef(null);
  const [proofHeight, setProofHeight] = useState();

  useEffect(() => {
    // Sync heights after mount and on window resize
    function syncHeights() {
      if (proofRef.current && rewardsRef.current) {
        const proofBoxHeight = proofRef.current.offsetHeight;
        const rewardsBoxHeight = rewardsRef.current.offsetHeight;
        const maxHeight = Math.max(proofBoxHeight, rewardsBoxHeight);
        setProofHeight(maxHeight);
      }
    }
    syncHeights();
    window.addEventListener("resize", syncHeights);
    return () => window.removeEventListener("resize", syncHeights);
  }, []);

  const progressPercent = Math.round(
    (objectives.filter((o) => o.completed).length / objectives.length) * 100
  );

  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.800283801106!2d-78.60498768476413!3d34.6290504804516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89aa2acbb7e5c3f9%3A0x46e0e5b2ac1e9b1e!2sElizabethtown%2C%20NC%2028327!5e0!3m2!1sen!2sus!4v1659557566468!5m2!1sen!2sus";

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-12">
      <div className="mx-auto max-w-6xl px-2 sm:px-4 py-8 flex flex-col gap-8">
        {/* Quest Title + Progress */}
        <div className="bg-white border rounded-2xl shadow-sm border-[#F2F4F7] px-7 py-8 flex flex-wrap gap-8 items-center justify-between">
          <div className="flex-1 min-w-[260px]">
            <div className="text-base font-medium text-[#667085] mb-2">
              Quest in Progress
            </div>
            <div className="text-[2rem] font-bold text-[#22223B] mb-2 leading-tight">
              Discover Downtown Delton
            </div>
            <div className="text-[#667085] text-[1.08rem]">
              Embark on an urban adventure through the heart of Delton, uncovering hidden gems and local favorites.
            </div>
          </div>
          <div className="flex items-center gap-4 min-w-[220px] justify-end flex-none">
            <span className="text-[#667085] font-semibold text-[1rem]">Progress</span>
            <div className="w-[110px] h-[7px] bg-[#F2F4F7] rounded-lg relative overflow-hidden">
              <div
                className="h-full rounded-lg absolute top-0 left-0"
                style={{
                  width: `${progressPercent}%`,
                  background: zephyraBlue,
                  transition: "width 0.4s"
                }}
              ></div>
            </div>
            <span className="text-[#667085] font-medium text-[1rem] min-w-[34px] text-right">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Directions/Map */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Tools box */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-6 flex-1 min-w-[260px] max-w-md">
            <div className="font-semibold text-[#22223B] text-lg mb-4">Tools</div>
            <div className="text-[#667085] font-medium mb-2">Directions:</div>
            <ol className="list-decimal text-[#667085] text-base ml-5 mb-0">
              <li>Head east on Main St toward Central Ave.</li>
              <li>Turn right onto Central Ave.</li>
              <li>The Delton Clock Tower will be on your left.</li>
            </ol>
          </div>
          {/* Google Embedded Map */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 flex-2 flex items-center justify-center min-w-0 w-full">
            <iframe
              title="Delton Map"
              src={mapEmbedUrl}
              width="100%"
              height="300"
              className="rounded-xl border-0 w-full min-w-[350px] max-w-full"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ minWidth: "350px", maxWidth: "100%" }}
            ></iframe>
          </div>
        </div>

        {/* Objectives and Hints */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Objectives */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-6 flex-1 min-w-[220px] max-w-[340px]">
            <div className="font-semibold text-[#22223B] text-lg mb-4">Objectives</div>
            <ol className="pl-0 flex flex-col gap-4 mb-0">
              {objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3 list-none">
                  <span
                    className={`inline-block w-5 h-5 rounded-md border-[1.5px] border-[#F2F4F7] mt-1 transition`}
                    style={{ background: obj.completed ? zephyraBlue : "#fff" }}
                  >
                    {obj.completed && (
                      <svg width={16} height={16} className="block mx-auto my-[2px]" fill="none">
                        <polyline
                          points="3,8 7,12 13,5"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className={`text-[#22223B] font-medium text-base ${obj.completed ? "opacity-100" : "opacity-85"}`}>
                    {obj.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {/* Hints */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-6 flex-1 min-w-[180px]">
            <div className="font-semibold text-[#22223B] text-lg mb-4">Hints</div>
            <div className="text-[#667085] text-base mb-4">
              Need a little help? Click below to reveal a hint for your current objective.
            </div>
            <button
              className="border-none bg-[#F2F4F7] text-[#667085] font-semibold px-5 py-2 rounded-lg text-base cursor-pointer hover:bg-[#e0e6ee] transition"
              onClick={() => setHintRevealed(!hintRevealed)}
            >
              {hintRevealed ? "Clock Tower is near the Town Square!" : "Reveal Hint"}
            </button>
          </div>
        </div>

        {/* Main bottom section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Proof of Completion */}
          <div
            ref={proofRef}
            className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-7 flex-3 min-w-0 flex flex-col justify-between"
            style={proofHeight ? { height: proofHeight } : {}}
          >
            <div>
              <div className="font-bold text-[#22223B] text-lg mb-1">Proof of Completion</div>
              <div className="text-[#667085] text-base mb-8">
                Submit your proof of completion for this quest.
              </div>
            </div>
            {/* Upload File button only */}
            <div className="flex justify-center mb-8">
              <button
                className="px-7 py-3 bg-[#7F56D9] text-white font-semibold rounded-xl text-base border-none cursor-pointer hover:bg-[#632bb5] shadow transition"
                onClick={() => navigate("/quest-proof-upload")}
              >
                Upload File
              </button>
            </div>
          </div>

          {/* Rewards + Tips - X axis alignment */}
          <div className="flex gap-8 flex-2 min-w-[220px]">
            {/* Rewards Upon Completion */}
            <div
              ref={rewardsRef}
              className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-7 flex flex-col gap-2 self-start w-full max-w-[340px]"
              style={proofHeight ? { height: proofHeight } : {}}
            >
              <div className="font-bold text-[#22223B] text-lg mb-2">Rewards Upon Completion</div>
              <ul className="list-none p-0 m-0 mb-2 text-[#22223B] text-base">
                <li className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#F2F4F7] flex items-center justify-center">
                    <span style={{ color: zephyraGold, fontWeight: 700, fontSize: "1.12rem" }}>✪</span>
                  </span>
                  100 Points
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#F2F4F7] flex items-center justify-center">
                    <span style={{ color: zephyraBlue, fontWeight: 700, fontSize: "1.12rem" }}>🏅</span>
                  </span>
                  "Delton Explorer" Badge
                </li>
              </ul>
              <div className="text-[#667085] text-sm mt-2">
                Complete all objectives to claim your rewards and boost your standing on the leaderboard!
              </div>
            </div>
            {/* Quest Tips & Safety Card */}
            <QuestTipsCard />
          </div>
        </div>
      </div>
    </div>
  );
}