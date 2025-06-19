import React from "react";

export default function BriefcaseIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="4" y="9" width="20" height="13" rx="3" fill="url(#briefcase-gradient)" />
      <rect x="10" y="5" width="8" height="5" rx="2" fill="#fff" />
      <rect x="10" y="2" width="8" height="4" rx="2" fill="#192048" />
      <defs>
        <linearGradient id="briefcase-gradient" x1="4" y1="9" x2="24" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2EC4FF" />
          <stop offset="1" stopColor="#005DFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
