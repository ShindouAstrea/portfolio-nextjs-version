import { supabase } from '@/lib/supabase'
import { Job } from '@/models/interfaces'
import { start } from 'repl'

/**
 * Fetch all jobs/experiences from Supabase
 */
export async function getJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('start_date', { ascending: false })

    if (error) {
      console.error('Error fetching jobs:', error)
      return []
    }

    // Parse tags if they come as JSON string from database
    return (data || []).map((job: any) => ({
      ...job,
      start_date: job?.start_date!=null ? new Date(job.start_date).toLocaleDateString(): '',
      end_date: job?.end_date!=null ? new Date(job.end_date).toLocaleDateString(): ' Actualmente',
      tags: typeof job.tags === 'string' ? JSON.parse(job.tags) : job.tags
    }))
  } catch (error) {
    console.error('Error in getJobs:', error)
    return []
  }
}

/**
 * Fetch a single job by ID
 */
export async function getJobById(id: string | number): Promise<Job | null> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching job:', error)
      return null
    }

    return {
      ...data,
      tags: typeof data.tags === 'string' ? JSON.parse(data.tags) : data.tags
    }
  } catch (error) {
    console.error('Error in getJobById:', error)
    return null
  }
}

/**
 * Fetch all jobs by company
 */
export async function getJobsByCompany(company: string): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('company', company)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching jobs by company:', error)
      return []
    }

    return (data || []).map((job: any) => ({
      ...job,
      tags: typeof job.tags === 'string' ? JSON.parse(job.tags) : job.tags
    }))
  } catch (error) {
    console.error('Error in getJobsByCompany:', error)
    return []
  }
}

/**
 * Create a new job (admin only)
 */
export async function createJob(job: Omit<Job, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .insert([
        {
          ...job,
          tags: typeof job.tags === 'string' ? job.tags : JSON.stringify(job.tags)
        }
      ])
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error creating job:', error)
    return { success: false, error }
  }
}

/**
 * Update a job (admin only)
 */
export async function updateJob(id: string | number, updates: Partial<Job>) {
  try {
    const { data, error } = await supabase
      .from('jobs')
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
    console.error('Error updating job:', error)
    return { success: false, error }
  }
}

/**
 * Delete a job (admin only)
 */
export async function deleteJob(id: string | number) {
  try {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error deleting job:', error)
    return { success: false, error }
  }
}
