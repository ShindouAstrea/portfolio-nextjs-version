import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function createClientServer() {
  const cookieStore = await cookies()

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      
    }
  )
}