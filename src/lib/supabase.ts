import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Client-side Supabase instance
 * Use this in React components and pages
 */
export const supabaseClient = supabase

/**
 * Server-side Supabase client for API routes
 * You can optionally use a service role key for admin operations
 */
import { createClient as createServerClient } from '@supabase/supabase-js'

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseServer = supabaseServiceRoleKey 
  ? createServerClient(supabaseUrl, supabaseServiceRoleKey)
  : supabase
