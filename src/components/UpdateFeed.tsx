"use client"

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { Calendar, Tag, Loader2, Sparkles } from 'lucide-react'

// Definimos la interfaz localmente para los updates
interface UpdateRecord {
  id: string
  title: string
  content: string
  image_url: string | null
  version: string
  created_at: string
}

const POSTS_PER_PAGE = 3

export default function UpdateFeed() {
  const [posts, setPosts] = useState<UpdateRecord[]>([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUpdates = useCallback(async (pageNum: number) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const from = pageNum * POSTS_PER_PAGE
      const to = from + POSTS_PER_PAGE - 1

      const supabase = createClient()
      
      if (!supabase) {
        setError('Error de conexión: Faltan las llaves del Génesis (Environment Variables).')
        setIsLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from('updates')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to)

      if (fetchError) throw fetchError
      
      const newPosts = data || []
      
      if (pageNum === 0) {
        setPosts(newPosts)
      } else {
        setPosts(prev => [...prev, ...newPosts])
      }

      if (newPosts.length < POSTS_PER_PAGE) {
        setHasMore(false)
      }
    } catch (err: any) {
      console.error('Error fetching updates:', err)
      setError('Los archivos se han corrompido temporalmente. Intenta más tarde.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Carga inicial
  useEffect(() => {
    if (page === 0) {
      fetchUpdates(0)
    }
  }, [page, fetchUpdates])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchUpdates(nextPage)
  }

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto relative z-10">
      {/* Cabecera */}
      <div className="text-center mb-16">
        <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 inline-block drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          Ecos del Desarrollo
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto font-sans">
          El Valle del Despertar muta constantemente. Conoce los últimos avances técnicos y visuales de la Estasis.
        </p>
      </div>

      {/* Estados de Carga inicial y Error */}
      {isLoading && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 opacity-50">
          <Loader2 className="w-8 h-8 text-cyan-500 animate-spin mb-4" />
          <p className="text-cyan-400/80 font-cinzel tracking-widest text-sm uppercase">Sincronizando Crónicas...</p>
        </div>
      )}

      {error && posts.length === 0 && (
        <div className="text-center py-12 text-red-400/80 font-sans bg-red-900/10 border border-red-500/20 rounded-xl max-w-lg mx-auto">
          {error}
        </div>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 font-cinzel italic tracking-wider">
            &quot;Los registros de la Crisálida están en silencio por ahora.&quot;
          </p>
        </div>
      )}

      {/* Grilla de Actualizaciones */}
      {posts.length > 0 && (
        <div className="grid grid-cols-1 gap-10">
          {posts.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % POSTS_PER_PAGE) * 0.1, ease: "easeOut" }}
              className="group relative bg-white/5 backdrop-blur-md border border-[#333] rounded-2xl overflow-hidden transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_30px_-10px_rgba(0,255,255,0.15)] flex flex-col md:flex-row"
            >
              {/* Imagen Superior / Lateral */}
              {update.image_url && (
                <div className="w-full md:w-5/12 h-56 md:h-auto relative shrink-0 overflow-hidden">
                  <img
                    src={update.image_url}
                    alt={update.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradiente oscuro hacia abajo (en móvil) o hacia la derecha (en desktop) para integrar el texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent md:bg-gradient-to-r" />
                </div>
              )}

              {/* Contenido de la Tarjeta */}
              <div className="p-8 md:p-10 flex-1 flex flex-col justify-center relative">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {/* Badge de Versión estilo Neón */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DEFF9A]/10 text-[#DEFF9A] border border-[#DEFF9A]/30 tracking-widest shadow-[0_0_10px_rgba(222,255,154,0.1)]">
                    <Tag className="w-3.5 h-3.5" />
                    {update.version}
                  </span>
                  
                  {/* Fecha de Creación */}
                  <span className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                    <Calendar className="w-4 h-4" />
                    {new Date(update.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <h3 className="font-cinzel text-3xl font-bold text-gray-100 mb-4 group-hover:text-white transition-colors">
                  {update.title}
                </h3>
                
                <p className="text-gray-400 text-base leading-relaxed font-sans whitespace-pre-wrap">
                  {update.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Botón Cargar Más */}
      {hasMore && posts.length > 0 && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="group relative px-8 py-4 bg-transparent border border-cyan-500/50 rounded-xl font-cinzel font-bold tracking-[0.2em] text-cyan-400 hover:text-white transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]"
          >
            {/* Hover Background Glow */}
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative flex items-center gap-3">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sintonizando...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Descifrar Ecos Antiguos
                </>
              )}
            </span>
          </button>
        </div>
      )}
    </section>
  )
}
