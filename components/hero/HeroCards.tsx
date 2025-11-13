"use client";

import { Coffee, Sparkles, Users } from "lucide-react";

export default function HeroCards() {
  return (
    <section className="py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Bullets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-coffee-700/40 border border-coffee-500/20 hover:border-coffee-500/50 transition-colors">
            <Users className="w-8 h-8 text-coffee-500" />
            <span className="font-sans font-semibold text-cream-50">Baristas Profissionais</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-coffee-700/40 border border-coffee-500/20 hover:border-coffee-500/50 transition-colors">
            <Sparkles className="w-8 h-8 text-coffee-500" />
            <span className="font-sans font-semibold text-cream-50">Personalização com sua Marca</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-coffee-700/40 border border-coffee-500/20 hover:border-coffee-500/50 transition-colors">
            <Coffee className="w-8 h-8 text-coffee-500" />
            <span className="font-sans font-semibold text-cream-50">Alto Fluxo de Atendimento</span>
          </div>
        </div>
      </div>
    </section>
  );
}

