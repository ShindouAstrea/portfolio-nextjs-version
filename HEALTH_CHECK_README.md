# 🚀 Health Check Automation System

## Descripción

Sistema automatizado para mantener activo el servidor de Supabase mediante health checks periódicos. Cada verificación se registra automáticamente en la base de datos.

## Características

- ✅ Health checks automáticos periódicos
- 📊 Dashboard de monitoreo en tiempo real
- 📈 Estadísticas de rendimiento
- 🎛️ Control total desde la interfaz web
- 💾 Registro permanente en Supabase
- ⚙️ Intervalo configurable (mínimo 5 minutos)

## Instalación

### 1. Crear la tabla en Supabase

1. Ve a **Supabase Dashboard** → **SQL Editor**
2. Abre el archivo `HEALTH_CHECK_SETUP.sql`
3. Copia y pega el contenido en el SQL Editor
4. Ejecuta el script

Esto creará:
- Tabla `health_checks` para almacenar registros
- Índices para mejor rendimiento
- Políticas de seguridad (RLS)
- Vista `health_check_stats` para estadísticas

### 2. Acceder al Panel de Control

Navega a: `http://localhost:3000/admin`

## Uso

### Panel de Control

El dashboard te permite:

1. **Ver Estado del Scheduler**
   - Estado actual (activo/inactivo)
   - Intervalo configurado

2. **Estadísticas en Tiempo Real**
   - Total de checks
   - Checks exitosos
   - Errores detectados
   - Tiempo de respuesta promedio
   - Último check realizado

3. **Controles**
   - Establecer intervalo de verificación
   - Iniciar el scheduler
   - Detener el scheduler
   - Ejecutar health check manual

### Configuración Recomendada

- **Para desarrollo**: 30-60 minutos
- **Para producción**: 15-30 minutos
- **Mínimo**: 5 minutos
- **Máximo**: 24 horas (1440 minutos)

## Endpoints de API

### GET `/api/health-check`
Ejecuta un health check manual.

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Supabase connection active",
  "data": {
    "status": "active",
    "timestamp": "2025-12-20T10:30:00Z",
    "response_time": 245
  }
}
```

### GET `/api/health-check?stats=true`
Obtiene estadísticas de los últimos 100 checks.

**Respuesta:**
```json
{
  "success": true,
  "message": "Health statistics retrieved",
  "data": {
    "total": 48,
    "active": 47,
    "errors": 1,
    "lastCheck": "2025-12-20T10:30:00Z",
    "avgResponseTime": 250
  }
}
```

### POST `/api/scheduler`
Controla el scheduler de health checks.

**Body:**
```json
{
  "action": "start|stop|status",
  "intervalMinutes": 30
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Health check scheduler started (every 30 minutes)",
  "data": {
    "isRunning": true,
    "intervalMinutes": 30
  }
}
```

## Estructura de la Tabla

```sql
health_checks:
- id (BIGSERIAL PRIMARY KEY)
- timestamp (TIMESTAMP): Hora de la verificación
- status (VARCHAR): 'active', 'inactive', 'error'
- message (TEXT): Descripción del resultado
- response_time (INTEGER): Tiempo en ms
- created_at (TIMESTAMP): Timestamp de creación
- updated_at (TIMESTAMP): Timestamp de última actualización
```

## Vistas Disponibles

### `health_check_stats`
Estadísticas de las últimas 24 horas:
- Total de checks
- Cantidad de exitosos
- Cantidad de errores
- Tiempo de respuesta promedio
- Último check realizado
- Primer check realizado

**Consulta:**
```sql
SELECT * FROM public.health_check_stats;
```

## Logs

Los logs se mostrarán en:
- **Desarrollo**: Consola del servidor
- **Producción**: Logs de Vercel / tu proveedor de hosting

Ejemplo de log:
```
[20/12/2025, 10:30:00] Running health check...
[20/12/2025, 10:30:02] Health check result: {
  status: 'active',
  message: 'Supabase connection active',
  responseTime: 245
}
```

## Troubleshooting

### "Error: File 'health_checks' is not a module"
- Asegúrate de ejecutar el SQL para crear la tabla
- Verifica que RLS esté habilitado correctamente

### Scheduler no inicia
- Revisa los logs del servidor
- Verifica la conexión a Supabase
- Comprueba que las claves de API sean válidas

### Timestamps incorrectos
- Verifica la zona horaria del servidor
- Los timestamps se almacenan en UTC por defecto

## Notas de Seguridad

- El endpoint `/admin` es público. Considera protegerlo con:
  - Autenticación
  - IP whitelist
  - Rate limiting
  
Ejemplo de protección con middleware:
```typescript
// Agregar verificación de autenticación en pages/admin.tsx
if (!user || user.email !== 'admin@example.com') {
  return <Redirect to="/" />;
}
```

## Mejoras Futuras

- [ ] Autenticación para panel /admin
- [ ] Alertas por email cuando hay errores
- [ ] Histórico gráfico de disponibilidad
- [ ] Webhooks para notificaciones
- [ ] Export de reportes

## Soporte

Para más información:
- 📖 [Documentación de Supabase](https://supabase.com/docs)
- 🔧 [API de Next.js](https://nextjs.org/docs/api-routes/introduction)
- 💬 Issues en GitHub
