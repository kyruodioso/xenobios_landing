"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BetaForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [capacity, setCapacity] = useState(34);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCapacity(33);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="relative mt-12 p-[1px] max-w-lg mx-auto rounded-xl overflow-hidden group">
      {/* Borde luminoso animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      <div className="absolute inset-0 bg-[#050505] rounded-xl m-[1px] z-0" />

      <div className="relative z-10 p-8 rounded-xl bg-gradient-to-b from-[#0a0a0a]/80 to-[#050505]/80 backdrop-blur-sm border border-cyan-900/30">
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
            <p className="text-cyan-400 text-[10px] uppercase tracking-[0.3em] font-bold">
              Capacidad del Nexo:{" "}
              <span className="inline-block min-w-[2ch]">{capacity}</span>/50
              Ánimas restantes
            </p>
          </motion.div>
          <h3 className="font-cinzel text-2xl text-cyan-400 mb-2 font-bold text-center glow-text">
            Acceso Restringido: Beta Cerrada
          </h3>
          <p className="text-gray-400 text-sm text-center">
            Los Jardines del Génesis solo admitirán a los primeros 50 ánimas.
            Ingresa tu correo para reclamar un Fragmento Rúnico.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="tu@alma.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-black/50 border border-gray-800 rounded-md px-4 py-3 text-cyan-100 placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-700/50 hover:border-cyan-400 text-cyan-100 px-6 py-3 rounded-md font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]"
              >
                Solicitar Suscripción
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-3"
            >
              <p className="text-cyan-300 font-medium">
                Conectando con la Crisálida Rúnica... Revisa tu correo.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
