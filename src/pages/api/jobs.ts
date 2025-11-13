// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getJobs } from '@/services/jobService'
import { JobsApiResponse } from '@/models/interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JobsApiResponse>
) {
  // Only GET method is allowed
  if (req.method !== 'GET') {
    res.status(405).json({
      success: false,
      message: 'Método no permitido. Utiliza GET.',
      error: 'Method not allowed'
    })
    return
  }

  try {
    const jobs = await getJobs()
    
    res.status(200).json({
      success: true,
      data: jobs,
      message: 'Experiencias obtenidas exitosamente'
    })
  } catch (error) {
    console.error('Error in /api/jobs:', error)
    res.status(500).json({
      success: false,
      message: 'Error al obtener las experiencias',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
