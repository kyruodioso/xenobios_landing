"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BetaForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [capacity, setCapacity] = useState<number | null>(null);
  const [capacityLoading, setCapacityLoading] = useState(true);

  useEffect(() => {
    const fetchCapacity = async () => {
      try {
        const response = await fetch("/api/beta-claim");
        const data = await response.json();
        if (data.remaining !== undefined) {
          setCapacity(data.remaining);
        }
      } catch (err) {
        console.error("Error fetching capacity:", err);
      } finally {
        setCapacityLoading(false);
      }
    };

    fetchCapacity();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/beta-claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Algo salió mal");
      }

      setSuccessMessage(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
              <span className="inline-block min-w-[2ch]">
                {capacityLoading ? "..." : capacity ?? "??"}
              </span>/50
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
          {!successMessage ? (
            <motion.div key="form-container">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  placeholder="tu@alma.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="flex-1 bg-black/50 border border-gray-800 rounded-md px-4 py-3 text-cyan-100 placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-700/50 hover:border-cyan-400 text-cyan-100 px-6 py-3 rounded-md font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Reclamando..." : "Solicitar Suscripción"}
                </button>
              </form>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-3 text-center font-medium"
                >
                  {error}
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-center py-6"
            >
              <div className="mb-4 inline-block p-3 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                <svg
                  className="w-8 h-8 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-cyan-300 font-bold text-lg mb-1">
                ¡Fragmento Reclamado!
              </p>
              <p className="text-gray-400 text-sm">
                {successMessage}. Revisa la Crisálida (tu correo).
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>

  );
}
