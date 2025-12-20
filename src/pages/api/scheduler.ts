import type { NextApiRequest, NextApiResponse } from 'next';
import { healthCheckScheduler } from '@/lib/healthCheckScheduler';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
};

/**
 * Health check scheduler control endpoint
 * POST /api/scheduler - Controlar el scheduler de health checks
 * 
 * Body:
 * {
 *   "action": "start" | "stop" | "status",
 *   "intervalMinutes": number (opcional, default 30)
 * }
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use GET or POST.',
    });
  }

  try {
    const { action = 'status', intervalMinutes = 30 } = req.body || {};

    switch (action?.toLowerCase()) {
      case 'start':
        healthCheckScheduler.start(intervalMinutes);
        const startStatus = healthCheckScheduler.getStatus();
        return res.status(200).json({
          success: true,
          message: `Health check scheduler started (every ${intervalMinutes} minutes)`,
          data: startStatus,
        });

      case 'stop':
        healthCheckScheduler.stop();
        return res.status(200).json({
          success: true,
          message: 'Health check scheduler stopped',
          data: { isRunning: false },
        });

      case 'status':
      default:
        const status = healthCheckScheduler.getStatus();
        return res.status(200).json({
          success: true,
          message: 'Scheduler status retrieved',
          data: status,
        });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Scheduler control error:', error);

    return res.status(500).json({
      success: false,
      message: `Scheduler control failed: ${errorMessage}`,
    });
  }
}
