import { supabase } from '@/lib/supabase'
import { Aplication } from '@/models/interfaces'

/**
 * Fetch all applications/projects from Supabase
 */
export async function getApplications(): Promise<Aplication[]> {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching applications:', error)
      return []
    }else{
      console.log('Fetched applications:', data)
    }

    // Parse tags if they come as JSON string from database
    return (data || []).map((app: any) => ({
      ...app,
      imgSrc: app.imgsrc || app.imgSrc, // Normalize property name
      tags: typeof app.tags === 'string' ? JSON.parse(app.tags) : app.tags
    }))
  } catch (error) {
    console.error('Error in getApplications:', error)
    return []
  }
}

/**
 * Fetch a single application by ID
 */
export async function getApplicationById(id: string | number): Promise<Aplication | null> {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching application:', error)
      return null
    }

    return {
      ...data,
      imgSrc: data.imgsrc || data.imgSrc, // Normalize property name
      tags: typeof data.tags === 'string' ? JSON.parse(data.tags) : data.tags
    }
  } catch (error) {
    console.error('Error in getApplicationById:', error)
    return null
  }
}

/**
 * Create a new application (admin only)
 */
export async function createApplication(app: Omit<Aplication, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          ...app,
          tags: typeof app.tags === 'string' ? app.tags : JSON.stringify(app.tags)
        }
      ])
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error creating application:', error)
    return { success: false, error }
  }
}

/**
 * Update an application (admin only)
 */
export async function updateApplication(id: string | number, updates: Partial<Aplication>) {
  try {
    const { data, error } = await supabase
      .from('applications')
      .update({
        ...updates,
        tags: typeof updates.tags === 'string' ? updates.tags : JSON.stringify(updates.tags || [])
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error updating application:', error)
    return { success: false, error }
  }
}

/**
 * Delete an application (admin only)
 */
export async function deleteApplication(id: string | number) {
  try {
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error deleting application:', error)
    return { success: false, error }
  }
}
