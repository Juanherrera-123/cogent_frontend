import React from "react";

export default function WrenchIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path
        d="M21.6 20.3l-7.2-7.2a4 4 0 0 1-4.7-6.1c.4-.4.3-1-.2-1.3A7 7 0 0 0 3.2 17l8.6 8.6a7 7 0 0 0 11.3-6.3c0-.5-.5-.6-.9-.2a4 4 0 0 1-4.6.2z"
        fill="url(#wrench-gradient)"
      />
      <circle cx="22.5" cy="5.5" r="2.5" fill="#fff" />
      <defs>
        <linearGradient id="wrench-gradient" x1="3" y1="17" x2="25" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2EC4FF" />
          <stop offset="1" stopColor="#005DFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
