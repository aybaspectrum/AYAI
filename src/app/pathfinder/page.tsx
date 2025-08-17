"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PathMarker } from "~/components/ui/path-marker";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

// Define the structure of a suggestion
interface Suggestion {
  suggestion_text: string;
  count: number;
}

export default function PathfinderPage() {
  const [goal, setGoal] = useState("");
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetSuggestion = () => {
    if (!goal) return;

    setIsLoading(true);
    setSuggestion(null);
    setError(null);

    // TODO: Replace this with a real API call to the pathfinder-service
    // Example:
    // try {
    //   const response = await fetch(`/api/pathfinder?goal=${encodeURIComponent(goal)}`);
    //   if (!response.ok) {
    //     throw new Error('Suggestion not found.');
    //   }
    //   const data = await response.json();
    //   setSuggestion(data);
    // } catch (err) {
    //   setError(err.message);
    // } finally {
    //   setIsLoading(false);
    // }

    // --- MOCK API CALL ---
    console.log("Getting suggestion for:", goal);
    setTimeout(() => {
      const mockData: { [key: string]: Suggestion } = {
        "Learn Python": {
          suggestion_text: "Install Python & VS Code",
          count: 3,
        },
        "Run a Marathon": {
          suggestion_text: "Buy running shoes",
          count: 2,
        },
      };

      const foundSuggestion = mockData[goal];

      if (foundSuggestion) {
        setSuggestion(foundSuggestion);
      } else {
        setError(`Sorry, no suggestion found for "${goal}". Try "Learn Python" or "Run a Marathon".`);
      }
      setIsLoading(false);
    }, 1000);
    // --- END MOCK API CALL ---
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Goal Pathfinder
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Enter a goal and discover a proven first step to get you started.
          </p>
        </motion.div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
          <div className="w-full">
            <Label htmlFor="goal-input" className="text-lg font-semibold text-gray-800 mb-6">
              What do you want to achieve?
            </Label>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Input
                id="goal-input"
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Learn Python, Run a Marathon..."
                className="flex-grow text-base"
              />
              <Button
                onClick={handleGetSuggestion}
                disabled={isLoading || !goal}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Searching..." : "Find First Step"}
              </Button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center text-red-600 bg-red-100 border border-red-300 rounded-lg p-3"
            >
              {error}
            </motion.div>
          )}

          {suggestion && (
            <PathMarker
              suggestionText={suggestion.suggestion_text}
              count={suggestion.count}
            />
          )}
        </div>
      </div>
    </motion.main>
  );
}
