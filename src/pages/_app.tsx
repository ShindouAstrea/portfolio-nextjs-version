import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // Inicializar el scheduler de health check automáticamente
  useEffect(() => {
    const initializeScheduler = async () => {
      try {
        // Solo en cliente, y solo una vez
        if (typeof window === 'undefined') return;

        // Obtener intervalo de la variable de entorno (default: 30 minutos)
        const interval = parseInt(
          process.env.NEXT_PUBLIC_HEALTH_CHECK_INTERVAL || '30',
          10
        );

        // Obtener estado del scheduler
        const statusResponse = await fetch('/api/scheduler', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'status' }),
        });

        const statusData = await statusResponse.json();

        // Si no está corriendo, iniciarlo
        if (!statusData.data?.isRunning) {
          console.log(`🚀 Iniciando Health Check Scheduler (intervalo: ${interval} min)...`);
          
          const startResponse = await fetch('/api/scheduler', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              action: 'start', 
              intervalMinutes: interval
            }),
          });

          const startData = await startResponse.json();
          if (startData.success) {
            console.log('✅ Health Check Scheduler iniciado exitosamente');
          }
        } else {
          console.log('✅ Health Check Scheduler ya está activo');
        }
      } catch (error) {
        console.error('❌ Error iniciando Health Check Scheduler:', error);
      }
    };

    // Ejecutar solo una vez cuando carga la aplicación
    initializeScheduler();
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
