# Health Check Scheduler - Configuración de Auto-inicio

## 📋 Resumen

El **Health Check Scheduler** ahora se **inicia automáticamente** cuando la aplicación carga, sin necesidad de activación manual. Esto es ideal para Vercel con auto-deploys.

## ⚙️ Configuración

### Ubicación del código
- **Archivo**: `src/pages/_app.tsx`
- **Hook**: `useEffect` que se ejecuta una sola vez en el cliente
- **Timing**: Se ejecuta cuando el navegador carga la aplicación

### Intervalo predeterminado
```typescript
intervalMinutes: 30  // 30 minutos entre checks
```

## 🔄 Flujo de auto-inicio

1. **Usuario accede a la aplicación** (primer page load o cualquier navegación)
2. **useEffect en _app.tsx se ejecuta**
3. **Verifica estado del scheduler** - POST a `/api/scheduler?action=status`
4. **Si no está activo**: Inicia con intervalo de 30 minutos
5. **Si ya está activo**: Confirma el estado sin hacer nada
6. **Logs en consola**: Mensajes de inicio para debugging

## 📊 Logs generados

```
🚀 Iniciando Health Check Scheduler...
✅ Health Check Scheduler iniciado exitosamente

ó

✅ Health Check Scheduler ya está activo
```

## 🚀 Comportamiento en Vercel

| Evento | Comportamiento |
|--------|---|
| **Primer deploy** | Scheduler se inicia automáticamente en el primer usuario |
| **New deployment** | Scheduler se reinicia automáticamente |
| **Auto-redeploy** | Scheduler se reinicia en el siguiente page load |
| **User refresh** | Verifica si está activo, no reinicia si ya corre |

## 🛠️ Cambiar el intervalo

Editar en `src/pages/_app.tsx`:

```typescript
body: JSON.stringify({ 
  action: 'start', 
  intervalMinutes: 60  // Cambiar aquí (en minutos)
}),
```

## 🔗 Variables de entorno (Opcional)

Para hacerlo más flexible, puedes usar una variable de entorno:

### Paso 1: Agregar a `.env.local`
```
NEXT_PUBLIC_HEALTH_CHECK_INTERVAL=30
```

### Paso 2: Usar en `_app.tsx`
```typescript
const interval = parseInt(process.env.NEXT_PUBLIC_HEALTH_CHECK_INTERVAL || '30', 10);
body: JSON.stringify({ 
  action: 'start', 
  intervalMinutes: interval
}),
```

### Paso 3: Configurar en Vercel
1. Ve a **Settings** → **Environment Variables**
2. Agrega: `NEXT_PUBLIC_HEALTH_CHECK_INTERVAL` = `30`
3. Redeploy

## ⚠️ Consideraciones

- **Cliente vs Servidor**: El scheduler se ejecuta en el backend de Next.js (API routes), no en el navegador
- **SSR Safety**: El código incluye `if (typeof window === 'undefined') return` para evitar ejecutarse en SSR
- **Error Handling**: Los errores se loguean en consola sin romper la aplicación
- **Singleton Pattern**: healthCheckScheduler es un singleton, múltiples llamadas no crean instancias duplicadas

## 🔧 Modo Manual

El panel de admin en `/admin` sigue permitiendo:
- ▶️ **Iniciar** scheduler manualmente
- ⏹️ **Detener** scheduler manualmente
- 📊 **Ver estadísticas** en tiempo real
- 🔄 **Ejecutar check manual** bajo demanda

## 📝 Checklist de Deploy

Antes de hacer deploy a Vercel:

- [ ] `npm run build` compila sin errores
- [ ] No hay errores TypeScript
- [ ] Los logs de consola muestran ✅ Health Check Scheduler iniciado
- [ ] Verificar en `/api/health-check?stats=true` que hay registros nuevos

## ❓ Solución de problemas

### El scheduler no inicia
1. Verifica los logs de navegador (F12 → Console)
2. Verifica que `/api/scheduler` devuelve una respuesta válida
3. Comprueba que la variable `intervalMinutes` es correcta

### El scheduler se inicia pero no hace checks
1. Verifica que la base de datos Supabase está disponible
2. Revisa `/admin` para ver estadísticas en tiempo real
3. Comprueba `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en `.env.local`

### Múltiples instancias del scheduler
Esto no debe ocurrir (singleton pattern), pero si pasa:
1. Verifica que `healthCheckScheduler` en `src/lib/healthCheckScheduler.ts` es una instancia única
2. Reinicia el servidor (`npm run dev`)
