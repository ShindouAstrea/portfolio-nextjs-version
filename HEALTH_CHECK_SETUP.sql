-- Health Check Monitoring Table
-- Esta tabla almacena los registros de health checks del servidor Supabase

-- Crear tabla health_checks
CREATE TABLE IF NOT EXISTS public.health_checks (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'inactive', 'error')),
    message TEXT NOT NULL,
    response_time INTEGER NOT NULL DEFAULT 0, -- en milisegundos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_health_checks_status 
    ON public.health_checks(status);

CREATE INDEX IF NOT EXISTS idx_health_checks_created_at 
    ON public.health_checks(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_health_checks_timestamp 
    ON public.health_checks(timestamp DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.health_checks ENABLE ROW LEVEL SECURITY;

-- Crear políticas de acceso
-- Permitir lectura a usuarios autenticados
CREATE POLICY "Allow read health checks for authenticated users"
    ON public.health_checks
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Permitir inserción desde la aplicación (usar anon key con cuidado)
CREATE POLICY "Allow insert health checks"
    ON public.health_checks
    FOR INSERT
    WITH CHECK (true);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_health_checks_updated_at ON public.health_checks;
CREATE TRIGGER update_health_checks_updated_at BEFORE UPDATE
    ON public.health_checks
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Crear vista para estadísticas rápidas
CREATE OR REPLACE VIEW public.health_check_stats AS
SELECT
    COUNT(*) as total_checks,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count,
    COUNT(CASE WHEN status = 'error' THEN 1 END) as error_count,
    ROUND(AVG(response_time)::numeric, 2) as avg_response_time,
    MAX(created_at) as last_check,
    MIN(created_at) as first_check
FROM public.health_checks
WHERE created_at > NOW() - INTERVAL '24 hours';

-- Comentarios en la tabla
COMMENT ON TABLE public.health_checks IS 'Registra los health checks automáticos del servidor Supabase';
COMMENT ON COLUMN public.health_checks.status IS 'Estado del servidor: active, inactive, error';
COMMENT ON COLUMN public.health_checks.response_time IS 'Tiempo de respuesta en milisegundos';
