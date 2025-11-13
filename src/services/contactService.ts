import { supabase } from '@/lib/supabase'
import { ContactMessage } from '@/models/interfaces'

/**
 * Save a contact message to Supabase
 */
export async function saveContactMessage(message: ContactMessage) {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([message])
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error saving contact message:', error)
    return { success: false, error }
  }
}

/**
 * Get all contact messages (admin only)
 */
export async function getContactMessages() {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contact messages:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getContactMessages:', error)
    return []
  }
}

/**
 * Delete a contact message (admin only)
 */
export async function deleteContactMessage(id: string | number) {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error deleting contact message:', error)
    return { success: false, error }
  }
}
