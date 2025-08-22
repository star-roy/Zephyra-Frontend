import React from "react";
import { Link } from "react-router-dom";
import UpcomingEventCard from "../../Cards/EventCard";

function UpcomingEventsSection({ events }) {
  return (
    <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 py-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-midnightIndigo">
            Upcoming Events & Challenges
          </h2>
          <Link
            to="/events"
            className="hidden sm:block text-zephyraBlue bg-zephyraLite font-semibold px-4 py-2 rounded-full hover:bg-duskHaze hover:text-[#236ef3] transition"
          >
            View All
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 justify-between">
          {events.map((event) => (
            <UpcomingEventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-6 sm:hidden flex justify-center">
          <Link
            to="/events"
            className="text-sm font-semibold text-zephyraBlue border border-zephyraBlue bg-white px-6 py-2 rounded-full hover:bg-duskHaze transition"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}

export default UpcomingEventsSection;
