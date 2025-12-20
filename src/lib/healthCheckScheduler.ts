/**
 * Health check scheduler service
 * Ejecuta verificaciones periódicas del servidor de Supabase
 */

import { performHealthCheck } from '@/services/healthCheckService';

class HealthCheckScheduler {
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private checkIntervalMs: number = 30 * 60 * 1000; // 30 minutos por defecto

  /**
   * Inicia el scheduler de health checks
   * @param intervalMinutes Intervalo en minutos entre checks (default: 30)
   */
  start(intervalMinutes: number = 30): void {
    if (this.isRunning) {
      console.log('Health check scheduler is already running');
      return;
    }

    this.checkIntervalMs = intervalMinutes * 60 * 1000;
    this.isRunning = true;

    console.log(`Starting health check scheduler (every ${intervalMinutes} minutes)`);

    // Ejecutar inmediatamente la primera vez
    this.runCheck();

    // Luego ejecutar periódicamente
    this.intervalId = setInterval(() => {
      this.runCheck();
    }, this.checkIntervalMs);
  }

  /**
   * Detiene el scheduler
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('Health check scheduler stopped');
  }

  /**
   * Ejecuta un health check
   */
  private async runCheck(): Promise<void> {
    const currentTime = new Date().toLocaleString('es-ES');
    console.log(`[${currentTime}] Running health check...`);

    try {
      const result = await performHealthCheck();
      console.log(`[${currentTime}] Health check result:`, {
        status: result.status,
        message: result.message,
        responseTime: result.response_time,
      });
    } catch (error) {
      console.error(`[${currentTime}] Health check error:`, error);
    }
  }

  /**
   * Retorna si el scheduler está activo
   */
  getStatus(): {
    isRunning: boolean;
    intervalMinutes: number;
  } {
    return {
      isRunning: this.isRunning,
      intervalMinutes: this.checkIntervalMs / (60 * 1000),
    };
  }
}

// Exportar singleton
export const healthCheckScheduler = new HealthCheckScheduler();
