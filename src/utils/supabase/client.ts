import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Debug log para Vercel
  if (typeof window !== 'undefined') {
    console.log('Supabase Config Check:', { 
      hasUrl: !!url, 
      hasKey: !!key,
      urlPrefix: url ? url.substring(0, 10) + '...' : 'none'
    })
  }

  if (!url || !key) {
    return null as any
  }

  return createBrowserClient(url, key)
}
