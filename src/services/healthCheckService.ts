import { supabase } from '@/lib/supabase';

/**
 * Health check record interface
 */
export interface HealthCheckRecord {
  id?: number;
  timestamp: string;
  status: 'active' | 'inactive' | 'error';
  message: string;
  response_time: number;
  created_at?: string;
}

/**
 * Perform a health check on Supabase and log the result
 */
export async function performHealthCheck(): Promise<HealthCheckRecord> {
  const startTime = Date.now();
  
  try {
    // Realizar una consulta simple para verificar conexión
    const { data, error, status } = await supabase
      .from('health_checks')
      .select('count')
      .limit(1);

    const responseTime = Date.now() - startTime;

    if (error) {
      console.error('Health check failed:', error);
      
      // Registrar el fallo
      const failRecord: HealthCheckRecord = {
        timestamp: new Date().toISOString(),
        status: 'error',
        message: `Error: ${error.message}`,
        response_time: responseTime,
      };

      await logHealthCheck(failRecord);
      return failRecord;
    }

    const successRecord: HealthCheckRecord = {
      timestamp: new Date().toISOString(),
      status: 'active',
      message: 'Supabase connection active',
      response_time: responseTime,
    };

    await logHealthCheck(successRecord);
    return successRecord;

  } catch (error) {
    const responseTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    const errorRecord: HealthCheckRecord = {
      timestamp: new Date().toISOString(),
      status: 'error',
      message: `Exception: ${errorMessage}`,
      response_time: responseTime,
    };

    await logHealthCheck(errorRecord);
    return errorRecord;
  }
}

/**
 * Log health check result to Supabase
 */
async function logHealthCheck(record: HealthCheckRecord): Promise<void> {
  try {
    const { error } = await supabase
      .from('health_checks')
      .insert([
        {
          timestamp: record.timestamp,
          status: record.status,
          message: record.message,
          response_time: record.response_time,
        }
      ]);

    if (error) {
      console.error('Failed to log health check:', error);
    } else {
      console.log(`Health check logged: ${record.status} - ${record.message}`);
    }
  } catch (error) {
    console.error('Error logging health check:', error);
  }
}

/**
 * Get recent health check records
 */
export async function getHealthCheckHistory(limit: number = 10): Promise<HealthCheckRecord[]> {
  try {
    const { data, error } = await supabase
      .from('health_checks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching health checks:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getHealthCheckHistory:', error);
    return [];
  }
}

/**
 * Get server status statistics
 */
export async function getHealthStats(): Promise<{
  total: number;
  active: number;
  errors: number;
  lastCheck: string | null;
  avgResponseTime: number;
}> {
  try {
    const { data, error } = await supabase
      .from('health_checks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error || !data) {
      return {
        total: 0,
        active: 0,
        errors: 0,
        lastCheck: null,
        avgResponseTime: 0,
      };
    }

    const total = data.length;
    const active = data.filter((record: any) => record.status === 'active').length;
    const errors = data.filter((record: any) => record.status === 'error').length;
    const avgResponseTime = total > 0 
      ? data.reduce((sum: number, record: any) => sum + (record.response_time || 0), 0) / total 
      : 0;

    return {
      total,
      active,
      errors,
      lastCheck: data[0]?.created_at || null,
      avgResponseTime: Math.round(avgResponseTime),
    };
  } catch (error) {
    console.error('Error in getHealthStats:', error);
    return {
      total: 0,
      active: 0,
      errors: 0,
      lastCheck: null,
      avgResponseTime: 0,
    };
  }
}
