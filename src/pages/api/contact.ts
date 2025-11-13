// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { saveContactMessage } from '@/services/contactService'
import { ApiResponse } from '@/models/interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only POST method is allowed
  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      message: 'Método no permitido. Utiliza POST.',
      error: 'Method not allowed'
    })
    return
  }

  const { email, subject, message } = req.body

  // Validate inputs
  if (
    !email ||
    typeof email !== 'string' ||
    !subject ||
    typeof subject !== 'string' ||
    !message ||
    typeof message !== 'string'
  ) {
    res.status(400).json({
      success: false,
      message: 'Petición inválida. Verifica los campos enviados.',
      error: 'Invalid request body'
    })
    return
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Email inválido.',
      error: 'Invalid email format'
    })
    return
  }

  try {
    // Save message to Supabase
    const result = await saveContactMessage({
      email,
      subject,
      message
    })

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Mensaje enviado exitosamente',
        data: result.data
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Error al guardar el mensaje',
        error: result.error instanceof Error ? result.error.message : String(result.error)
      })
    }
  } catch (error) {
    console.error('Error in /api/contact:', error)
    res.status(500).json({
      success: false,
      message: 'Error al procesar tu solicitud',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
