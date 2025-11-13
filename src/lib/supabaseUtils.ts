/**
 * Supabase utility functions and helpers
 */

import { supabase } from '@/lib/supabase'

/**
 * Parse JSON field from Supabase
 * Supabase can return JSON fields as strings or objects
 */
export function parseJsonField(field: unknown): any {
  if (typeof field === 'string') {
    try {
      return JSON.parse(field)
    } catch {
      return field
    }
  }
  return field
}

/**
 * Handle Supabase errors with consistent format
 */
export function handleSupabaseError(error: any) {
  if (!error) return null

  return {
    message: error.message || 'Unknown error',
    code: error.code,
    status: error.status,
    details: error.details,
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user || null
}

/**
 * Safely execute Supabase queries with error handling
 */
export async function executeSupabaseQuery<T>(
  query: Promise<{ data: T; error: any }>
): Promise<[T | null, any]> {
  try {
    const { data, error } = await query
    if (error) throw error
    return [data, null]
  } catch (error) {
    return [null, handleSupabaseError(error)]
  }
}

/**
 * Retry logic for failed queries
 */
export async function retrySupabaseQuery<T>(
  query: () => Promise<{ data: T; error: any }>,
  retries = 3,
  delay = 1000
): Promise<[T | null, any]> {
  let lastError = null

  for (let i = 0; i < retries; i++) {
    try {
      const { data, error } = await query()
      if (!error) return [data, null]
      lastError = error

      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
      }
    } catch (error) {
      lastError = error
    }
  }

  return [null, handleSupabaseError(lastError)]
}
