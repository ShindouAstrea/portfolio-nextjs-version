import React, { useState, useEffect } from 'react';

interface HealthStats {
  total: number;
  active: number;
  errors: number;
  lastCheck: string | null;
  avgResponseTime: number;
}

interface SchedulerStatus {
  isRunning: boolean;
  intervalMinutes: number;
}

export default function HealthCheckDashboard() {
  const [stats, setStats] = useState<HealthStats | null>(null);
  const [schedulerStatus, setSchedulerStatus] = useState<SchedulerStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [intervalMinutes, setIntervalMinutes] = useState(30);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStats();
    fetchSchedulerStatus();
    const interval = setInterval(() => {
      fetchStats();
    }, 60000); // Actualizar cada minuto
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/health-check?stats=true');
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchSchedulerStatus = async () => {
    try {
      const res = await fetch('/api/scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'status' }),
      });
      const data = await res.json();
      if (data.success) {
        setSchedulerStatus(data.data);
      }
    } catch (error) {
      console.error('Error fetching scheduler status:', error);
    }
  };

  const handleStartScheduler = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start', intervalMinutes }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`✅ Scheduler iniciado cada ${intervalMinutes} minutos`);
        setSchedulerStatus(data.data);
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    }
    setLoading(false);
  };

  const handleStopScheduler = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'stop' }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('✅ Scheduler detenido');
        setSchedulerStatus(data.data);
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    }
    setLoading(false);
  };

  const handleManualCheck = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/health-check');
      const data = await res.json();
      if (data.success) {
        setMessage(`✅ Health check exitoso - ${data.data.response_time}ms`);
        fetchStats();
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="w-full p-4 bg-gradient-to-br from-[#0F1424] to-[#1A1F3A] rounded-xl border border-[#3B9DD9]/20 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">🔍 Health Check Dashboard</h2>

      {/* Status Scheduler */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Estado del Scheduler */}
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#142847] p-4 rounded-lg border border-[#3B9DD9]/30">
          <h3 className="text-lg font-semibold text-[#60D5FF] mb-4">📊 Estado del Scheduler</h3>
          <div className="space-y-2">
            <p className="text-gray-300">
              Estado: 
              <span className={`ml-2 font-bold ${schedulerStatus?.isRunning ? 'text-green-400' : 'text-red-400'}`}>
                {schedulerStatus?.isRunning ? '🟢 ACTIVO' : '🔴 INACTIVO'}
              </span>
            </p>
            <p className="text-gray-300">
              Intervalo: <span className="text-[#60D5FF] font-semibold">{schedulerStatus?.intervalMinutes || 0} min</span>
            </p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#142847] p-4 rounded-lg border border-[#3B9DD9]/30">
          <h3 className="text-lg font-semibold text-[#60D5FF] mb-4">📈 Estadísticas</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-gray-300">Total: <span className="text-[#60D5FF] font-bold">{stats?.total || 0}</span></p>
            <p className="text-gray-300">Exitosos: <span className="text-green-400 font-bold">{stats?.active || 0}</span></p>
            <p className="text-gray-300">Errores: <span className="text-red-400 font-bold">{stats?.errors || 0}</span></p>
            <p className="text-gray-300">Resp. Promedio: <span className="text-[#60D5FF] font-bold">{stats?.avgResponseTime || 0}ms</span></p>
          </div>
          {stats?.lastCheck && (
            <p className="text-xs text-gray-400 mt-2">
              Último check: {new Date(stats.lastCheck).toLocaleString('es-ES')}
            </p>
          )}
        </div>
      </div>

      {/* Controles */}
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#142847] p-4 rounded-lg border border-[#3B9DD9]/30 mb-6">
        <h3 className="text-lg font-semibold text-[#60D5FF] mb-4">⚙️ Controles</h3>
        
        <div className="space-y-4">
          {/* Intervalo */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">Intervalo de verificación (minutos):</label>
            <input
              type="number"
              min="5"
              max="1440"
              value={intervalMinutes}
              onChange={(e) => setIntervalMinutes(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-[#0F1424] border border-[#3B9DD9]/40 rounded text-white focus:border-[#60D5FF] outline-none"
              disabled={loading}
            />
          </div>

          {/* Botones */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleStartScheduler}
              disabled={loading || schedulerStatus?.isRunning}
              className="px-4 py-2 bg-gradient-to-r from-[#60D5FF] to-[#3B9DD9] text-[#0F1424] font-semibold rounded hover:shadow-lg hover:shadow-[#60D5FF]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ▶️ Iniciar
            </button>
            <button
              onClick={handleStopScheduler}
              disabled={loading || !schedulerStatus?.isRunning}
              className="px-4 py-2 bg-red-600/70 hover:bg-red-600 text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ⏹️ Detener
            </button>
            <button
              onClick={handleManualCheck}
              disabled={loading}
              className="px-4 py-2 bg-[#3B9DD9]/70 hover:bg-[#3B9DD9] text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              🔄 Verificar Ahora
            </button>
          </div>
        </div>
      </div>

      {/* Mensaje */}
      {message && (
        <div className="p-3 bg-[#1E3A5F]/50 border border-[#3B9DD9]/40 rounded text-gray-200 text-sm mb-4">
          {message}
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-gray-400 bg-[#0F1424]/50 p-3 rounded border border-[#3B9DD9]/20">
        <p>💡 El scheduler ejecutará automáticamente health checks a Supabase en el intervalo especificado.</p>
        <p>📝 Cada verificación se registra en la tabla 'health_checks' de Supabase.</p>
      </div>
    </div>
  );
}
