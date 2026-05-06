import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validación estricta: si no es un string con contenido, devolvemos null
  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return null as any
  }
  
  if (!key || typeof key !== 'string') {
    return null as any
  }

  return createBrowserClient(url, key)
}
