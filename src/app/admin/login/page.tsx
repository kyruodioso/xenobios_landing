"use client"

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Lock, Mail, Loader2, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  
  // Lazy initialization
  const supabase = typeof window !== 'undefined' ? createClient() : null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) {
      setError('Error de configuración: Faltan las claves de Supabase.')
      return
    }
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    // Refresh so middleware can process the cookie
    router.refresh()
    // It will be redirected to /admin/updates by middleware if email is correct
  }

  return (
    <div className="min-h-screen bg-[#020202] text-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 shadow-[0_0_50px_-12px_rgba(0,255,255,0.15)] relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-cyan-400">
          <Sparkles className="w-10 h-10 animate-pulse" />
        </div>
        
        <h1 className="font-cinzel text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2">
          XENOBIOS
        </h1>
        <p className="text-center text-gray-500 mb-8 font-sans text-sm tracking-wide uppercase">
          Nexus de Administración
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold text-cyan-500/80 uppercase tracking-widest ml-1">
              Identificador (Email)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="arquitecto@genesis.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-cyan-500/80 uppercase tracking-widest ml-1">
              Clave de Acceso
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative group overflow-hidden rounded-xl bg-cyan-950/40 border border-cyan-500/30 py-3 font-cinzel font-bold tracking-widest text-cyan-100 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 via-cyan-500/20 to-cyan-600/0 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
            <span className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sincronizando...
                </>
              ) : (
                'Iniciar Conexión'
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}
