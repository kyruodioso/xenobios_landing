"use client";

import { CheckCircle2, Key, Gem, Scroll, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Acceso Vitalicio",
    desc: "Token para Epic Games Store.",
    icon: <Key className="w-6 h-6 text-cyan-400" />
  },
  {
    title: "Lúmenes Primordiales",
    desc: "Bono para el lanzamiento.",
    icon: <Gem className="w-6 h-6 text-cyan-400" />
  },
  {
    title: "Legado",
    desc: "Créditos especiales dentro del juego",
    icon: <Scroll className="w-6 h-6 text-cyan-400" />
  },
  {
    title: "Aura de Xora",
    desc: "Skin cosmética exclusiva.",
    icon: <Sparkles className="w-6 h-6 text-cyan-400" />
  }
];

export default function BenefitCards() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
            className="group relative p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              {item.icon}
              <CheckCircle2 className="w-5 h-5 text-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-gray-100 font-cinzel font-bold text-sm tracking-wider mb-1">
              {item.title}
            </h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              {item.desc}
            </p>
            {/* Sutil resplandor inferior */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
