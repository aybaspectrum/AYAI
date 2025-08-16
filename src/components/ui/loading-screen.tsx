"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Progress } from "~/components/ui/progress";

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const loadingStages = [
  { text: "Initializing SpectrumAI...", duration: 800 },
  { text: "Loading your profile...", duration: 600 },
  { text: "Preparing timeline...", duration: 700 },
  { text: "Almost ready...", duration: 500 },
];

export function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [stageText, setStageText] = useState(loadingStages[0]?.text ?? "Loading...");

  useEffect(() => {
    if (!isLoading) return;

    let progressInterval: NodeJS.Timeout | undefined;
    let stageTimeout: NodeJS.Timeout | undefined;
    let currentProgress = 0;
    let stageIndex = 0;

    const updateProgress = () => {
      progressInterval = setInterval(() => {
        currentProgress += Math.random() * 15 + 5; // Random increment between 5-20
        
        if (currentProgress >= 100) {
          currentProgress = 100;
          setProgress(100);
          clearInterval(progressInterval);
          
          // Complete loading after a brief delay
          setTimeout(() => {
            onComplete?.();
          }, 500);
          return;
        }

        setProgress(currentProgress);

        // Update stage based on progress
        const newStageIndex = Math.floor((currentProgress / 100) * loadingStages.length);
        if (newStageIndex !== stageIndex && newStageIndex < loadingStages.length) {
          stageIndex = newStageIndex;
          setCurrentStage(stageIndex);
          setStageText(loadingStages[stageIndex]?.text ?? "Loading...");
        }
      }, 100);
    };

    updateProgress();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (stageTimeout) clearTimeout(stageTimeout);
    };
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50"
      >
        <div className="text-center space-y-8 px-4">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-4 border-white border-t-transparent rounded-full"
              />
            </div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              SpectrumAI
            </motion.h1>
          </motion.div>

          {/* Progress Section */}
          <div className="w-80 max-w-sm mx-auto space-y-4">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-600 font-medium"
            >
              {stageText}
            </motion.div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="text-sm text-gray-500">
                {Math.round(progress)}%
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
