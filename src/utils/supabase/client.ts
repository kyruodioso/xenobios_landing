import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Durante el build de Next.js (prerendering), las variables de entorno pueden no estar disponibles.
  // @supabase/ssr lanza un error si se intenta crear el cliente sin ellas.
  // Devolvemos null para evitar que el build falle; en el navegador las variables estarán presentes.
  if (!url || !key) {
    return null as any
  }

  return createBrowserClient(url, key)
}
