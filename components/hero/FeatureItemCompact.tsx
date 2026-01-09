"use client";

import { ReactNode } from "react";

type FeatureItemCompactProps = {
  icon: ReactNode;
  title: string;
};

export default function FeatureItemCompact({ icon, title }: FeatureItemCompactProps) {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-xl ring-1 ring-cream-50/15 bg-coffee-card hover:bg-coffee-700/40 transition-colors">
      <div className="flex items-center gap-2 sm:gap-2 px-2.5 sm:px-3 py-2 sm:py-2 min-w-0">
        <span className="text-coffee-500 flex-shrink-0 leading-none" aria-hidden="true">
          {icon}
        </span>
        <span className="font-inter font-normal tracking-wide text-cream-50 text-[0.65rem] sm:text-xs md:text-sm leading-tight sm:leading-none whitespace-nowrap min-w-0 flex-1 overflow-hidden text-ellipsis">
          {title}
        </span>
      </div>
    </div>
  );
}

