"use client";

import { ReactNode } from "react";

type FeatureItemCompactProps = {
  icon: ReactNode;
  title: string;
};

export default function FeatureItemCompact({ icon, title }: FeatureItemCompactProps) {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-xl ring-1 ring-cream-50/15 bg-coffee-card hover:bg-coffee-700/40 transition-colors">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="text-coffee-500 flex-shrink-0 leading-none" aria-hidden="true">
          {icon}
        </span>
        <span className="text-cream-50 font-semibold text-xs md:text-sm leading-none">
          {title}
        </span>
      </div>
    </div>
  );
}

