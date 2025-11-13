// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getApplications } from '@/services/applicationService'
import { AppsApiResponse } from '@/models/interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AppsApiResponse>
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
    const apps = await getApplications()
    
    res.status(200).json({
      success: true,
      data: apps,
      message: 'Aplicaciones obtenidas exitosamente'
    })
  } catch (error) {
    console.error('Error in /api/apps:', error)
    res.status(500).json({
      success: false,
      message: 'Error al obtener las aplicaciones',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
