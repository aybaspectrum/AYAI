"use client";

import { motion } from "framer-motion";

interface PathMarkerProps {
  suggestionText: string;
  count: number;
}

export function PathMarker({ suggestionText, count }: PathMarkerProps) {
  if (!suggestionText) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-8 rounded-xl bg-teal-50/50 border border-teal-200 p-6 shadow-sm"
    >
      <div className="flex items-start">
        <div className="bg-teal-500 flex-shrink-0 p-3 rounded-xl mr-4 mt-1">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-grow">
          <h3 className="text-base font-semibold text-gray-600">
            Suggested First Step
          </h3>
          <p className="text-xl text-teal-800 font-semibold mt-1">
            {suggestionText}
          </p>
          {count > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              ✨ Based on the journey of {count} other users.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
