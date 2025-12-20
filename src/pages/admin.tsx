import React from 'react';
import HealthCheckDashboard from '@/components/HealthCheckDashboard.component';

export default function AdminPage() {
  return (
    <div className="w-full min-h-screen p-4 md:p-8 bg-gradient-to-br from-[#0F1424] via-[#1A1F3A] to-[#0D1428]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            ⚙️ Panel de Administración
          </h1>
          <p className="text-gray-400">
            Gestiona y monitorea el estado del servidor Supabase
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#60D5FF] via-[#3B9DD9] to-[#2563EB] mt-4"></div>
        </div>

        {/* Health Check Dashboard */}
        <HealthCheckDashboard />

        {/* Información adicional */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#142847] p-6 rounded-lg border border-[#3B9DD9]/20">
            <h3 className="text-lg font-semibold text-[#60D5FF] mb-3">📋 Qué es el Health Check?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              El health check es un proceso automatizado que verifica periódicamente la conexión y disponibilidad del servidor Supabase. 
              Cada verificación se registra con su estado, tiempo de respuesta y detalles del resultado.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#142847] p-6 rounded-lg border border-[#3B9DD9]/20">
            <h3 className="text-lg font-semibold text-[#60D5FF] mb-3">🚀 Cómo usar?</h3>
            <ol className="text-gray-300 text-sm space-y-2">
              <li>1. Crea la tabla 'health_checks' ejecutando el SQL</li>
              <li>2. Configura el intervalo en minutos</li>
              <li>3. Haz clic en "Iniciar" para activar el scheduler</li>
              <li>4. Monitorea el estado en tiempo real</li>
            </ol>
          </div>
        </div>

        {/* SQL Setup */}
        <div className="mt-8 bg-[#0F1424] p-6 rounded-lg border border-[#3B9DD9]/20">
          <h3 className="text-lg font-semibold text-[#60D5FF] mb-3">📝 Setup de la Base de Datos</h3>
          <p className="text-gray-300 text-sm mb-3">
            Antes de usar el health check, ejecuta el siguiente SQL en Supabase Dashboard → SQL Editor:
          </p>
          <a
            href="/HEALTH_CHECK_SETUP.sql"
            download
            className="inline-block px-4 py-2 bg-gradient-to-r from-[#60D5FF] to-[#3B9DD9] text-[#0F1424] font-semibold rounded hover:shadow-lg hover:shadow-[#60D5FF]/50 transition-all"
          >
            📥 Descargar archivo SQL
          </a>
          <p className="text-gray-400 text-xs mt-3">
            O copia y ejecuta manualmente el contenido del archivo HEALTH_CHECK_SETUP.sql
          </p>
        </div>
      </div>
    </div>
  );
}
