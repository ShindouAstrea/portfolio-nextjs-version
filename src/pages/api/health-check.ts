import type { NextApiRequest, NextApiResponse } from 'next';
import { performHealthCheck, getHealthStats } from '@/services/healthCheckService';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
};

/**
 * Health check endpoint
 * GET /api/health-check - Perform a health check
 * GET /api/health-check?stats=true - Get health statistics
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use GET.',
    });
  }

  try {
    // Si se pide estadísticas
    if (req.query.stats === 'true') {
      const stats = await getHealthStats();
      return res.status(200).json({
        success: true,
        message: 'Health statistics retrieved',
        data: stats,
      });
    }

    // Realizar health check
    const result = await performHealthCheck();

    return res.status(200).json({
      success: result.status === 'active',
      message: result.message,
      data: {
        status: result.status,
        timestamp: result.timestamp,
        response_time: result.response_time,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Health check error:', error);

    return res.status(500).json({
      success: false,
      message: `Health check failed: ${errorMessage}`,
    });
  }
}
