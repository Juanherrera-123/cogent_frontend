import React from "react";

export default function RhomboidBackground() {
  return (
    <div className="fixed top-[7vh] right-[8vw] w-[450px] h-[450px] pointer-events-none z-0">
      <div className="absolute top-0 left-1/2 w-[160px] h-[160px] -translate-x-1/2 rotate-45 bg-gradient-to-br from-blue-600 to-blue-200 opacity-20 rounded-3xl shadow-lg"></div>
      <div className="absolute top-1/2 right-0 w-[160px] h-[160px] -translate-y-1/2 rotate-45 bg-gradient-to-br from-blue-600 to-blue-200 opacity-20 rounded-3xl shadow-lg"></div>
      <div className="absolute bottom-0 left-1/2 w-[160px] h-[160px] -translate-x-1/2 rotate-45 bg-gradient-to-br from-blue-600 to-blue-200 opacity-20 rounded-3xl shadow-lg"></div>
      <div className="absolute top-1/2 left-0 w-[160px] h-[160px] -translate-y-1/2 rotate-45 bg-gradient-to-br from-blue-600 to-blue-200 opacity-20 rounded-3xl shadow-lg"></div>
    </div>
  );
}
