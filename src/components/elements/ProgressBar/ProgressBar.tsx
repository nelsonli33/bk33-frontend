import React from "react";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
      <div
        className="bg-green-600 h-1.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
