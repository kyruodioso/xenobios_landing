"use client"

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Upload, Plus, Loader2, Info } from 'lucide-react'

export default function UpdatesAdminPage() {
  const [title, setTitle] = useState('')
  const [version, setVersion] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) {
      setError('Error de configuración: Faltan las claves de Supabase.')
      return
    }
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      if (!imageFile) {
        throw new Error('La imagen es obligatoria.')
      }

      // 1. Subir la imagen al Bucket
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Math.random()}-${Date.now()}.${fileExt}`
      const filePath = `updates/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('updates-images')
        .upload(filePath, imageFile)

      if (uploadError) throw uploadError

      // 2. Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('updates-images')
        .getPublicUrl(filePath)

      // 3. Insertar en base de datos
      const { error: dbError } = await supabase
        .from('updates')
        .insert({
          title,
          version,
          content,
          image_url: publicUrl,
        })

      if (dbError) throw dbError

      // Limpiar formulario
      setSuccess(true)
      setTitle('')
      setVersion('')
      setContent('')
      setImageFile(null)
      // Resetear el input file (no controlado)
      const fileInput = document.getElementById('image-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''

    } catch (err: any) {
      setError(err.message || 'Error desconocido al subir la actualización.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020202] text-gray-100 p-6 md:p-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <h1 className="font-cinzel text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
            Gestor de Crónicas
          </h1>
          <p className="text-gray-400 font-sans">
            Añade nuevas notas de parche y actualizaciones al universo de Xenobios.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-4 rounded-xl">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-sm p-4 rounded-xl flex items-center gap-2">
              <Info className="w-5 h-5" />
              La crónica ha sido registrada en los Archivos del Génesis.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Título */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-cyan-500/80 uppercase tracking-widest ml-1">
                Título de la Actualización
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="Ej. El Despertar del Flujo"
              />
            </div>

            {/* Versión */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-cyan-500/80 uppercase tracking-widest ml-1">
                Versión
              </label>
              <input
                type="text"
                required
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="Ej. v1.2.0"
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-cyan-500/80 uppercase tracking-widest ml-1">
              Descripción detallada
            </label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
              placeholder="Detalla las mejoras, arreglos y balances..."
            />
          </div>

          {/* Imagen */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-cyan-500/80 uppercase tracking-widest ml-1">
              Imagen Representativa
            </label>
            <div className="relative border-2 border-dashed border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-colors bg-black/20 group">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                required
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImageFile(e.target.files[0])
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center text-center space-y-2 pointer-events-none">
                <Upload className="w-8 h-8 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                <span className="text-sm text-gray-400">
                  {imageFile ? imageFile.name : 'Arrastra una imagen o haz clic para subir'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden rounded-xl bg-cyan-600/20 border border-cyan-500/50 py-4 font-cinzel font-bold tracking-widest text-cyan-100 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 via-cyan-500/20 to-cyan-600/0 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Forjando Crónica...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Publicar Actualización
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
