# Guía de Migración a Supabase

## 📋 Descripción General

Este documento te guía a través del proceso de migración de datos locales (JSON) a Supabase para tu portfolio. Supabase proporciona:

- **Base de datos PostgreSQL** en la nube
- **API REST/GraphQL** automática
- **Autenticación** integrada
- **Almacenamiento de archivos** (Storage)
- **Realtime subscriptions** opcionales

## 🚀 Pasos de Setup

### 1. Crear Cuenta Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Registrate con GitHub o correo
3. Crea un nuevo proyecto
   - **Project name**: tu preferencia (ej: "portfolio-db")
   - **Database Password**: guarda esta contraseña en lugar seguro
   - **Region**: selecciona la más cercana a tus usuarios
4. Espera a que se inicialice el proyecto (2-3 minutos)

### 2. Obtener Credenciales

En el panel de Supabase:

1. Ve a **Settings > API**
2. Copia y guarda:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY` (solo si necesitas operaciones admin)

### 3. Configurar Variables de Entorno

```bash
# Copia el archivo de ejemplo
cp .env.local.example .env.local
```

Edita `.env.local` y reemplaza con tus valores reales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxx... # opcional
```

⚠️ **Importante**: Nunca hagas commit de `.env.local` a git. Asegúrate de que está en `.gitignore`.

### 4. Crear Tablas en Supabase

Ve al **SQL Editor** en tu proyecto Supabase y ejecuta el siguiente SQL:

#### Tabla: `applications`

```sql
create table applications (
  id bigint primary key generated always as identity,
  name varchar(255) not null,
  description text not null,
  tags jsonb default '[]',
  imgSrc varchar(512),
  github varchar(512),
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

-- Índices opcionales para mejor rendimiento
create index idx_applications_created_at on applications(created_at);
```

#### Tabla: `jobs`

```sql
create table jobs (
  id bigint primary key generated always as identity,
  title varchar(255) not null,
  company varchar(255) not null,
  start varchar(50),
  end varchar(50),
  tags jsonb default '[]',
  description text,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

-- Índices opcionales
create index idx_jobs_company on jobs(company);
create index idx_jobs_created_at on jobs(created_at);
```

#### Tabla: `contact_messages`

```sql
create table contact_messages (
  id bigint primary key generated always as identity,
  email varchar(255) not null,
  subject varchar(255) not null,
  message text not null,
  created_at timestamp default current_timestamp
);

-- Índice para ordenamiento
create index idx_contact_messages_created_at on contact_messages(created_at);
```

### 5. Importar Datos Iniciales (Opcional)

Puedes insertar tus datos manualmente o copiarlos desde el antiguo JSON:

```sql
-- Ejemplo de inserción de aplicaciones
insert into applications (name, description, tags, imgSrc, github) values
  (
    'Itsuki Engine',
    'App movil que ocupa api trace.moe para el reconocimiento de imágenes',
    '["Android", "React Native"]'::jsonb,
    '/assets/projects/itsukiEngine.png',
    'https://github.com/ShindouAstrea/itsuki-engine-app'
  ),
  (
    'Portafolio personal',
    'Página web personal que muestra información sobre mi y de mis experiencia como desarrollador.',
    '["Web", "NextJs", "TypeScript"]'::jsonb,
    '/assets/projects/portafolio.png',
    'https://github.com/ShindouAstrea/portfolio-nextjs-version'
  );

-- Ejemplo de inserción de trabajos
insert into jobs (title, company, start, end, tags, description) values
  (
    'Ingeniero de Desarrollo',
    'CDGO',
    'Agosto 2023',
    'Actualmente',
    '["Javascript", "Php", "SQL", "Jquery"]'::jsonb,
    'Encargado del desarrollo de proyectos en Php junto con Javascript...'
  );
```

### 6. Habilitar Row Level Security (RLS) - Opcional pero Recomendado

En el panel de Supabase, en **Authentication > Policies**:

```sql
-- Permitir lectura pública de applications
alter table applications enable row level security;
create policy "applications_select" on applications
  for select using (true);

-- Permitir lectura pública de jobs
alter table jobs enable row level security;
create policy "jobs_select" on jobs
  for select using (true);

-- Permitir inserción en contact_messages (sin autenticación)
alter table contact_messages enable row level security;
create policy "contact_messages_insert" on contact_messages
  for insert with check (true);
```

## 📁 Estructura de Archivos

```
src/
├── lib/
│   └── supabase.ts              # Configuración del cliente Supabase
├── services/
│   ├── applicationService.ts    # Funciones para CRUD de aplicaciones
│   ├── jobService.ts            # Funciones para CRUD de trabajos
│   └── contactService.ts        # Funciones para guardar mensajes
├── models/
│   └── interfaces.ts            # Tipos TypeScript actualizados
└── pages/
    └── api/
        ├── apps.ts              # Endpoint GET /api/apps
        ├── jobs.ts              # Endpoint GET /api/jobs
        └── contact.ts           # Endpoint POST /api/contact (usar contactService)
```

## 🔧 Usando los Servicios

### En API Routes

```typescript
// pages/api/apps.ts
import { getApplications } from '@/services/applicationService'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false })
    return
  }
  
  const apps = await getApplications()
  res.status(200).json({ success: true, data: apps })
}
```

### En Componentes React

```typescript
// pages/projects/index.tsx
import { useEffect, useState } from 'react'
import { Aplication } from '@/models/interfaces'

export default function Projects() {
  const [apps, setApps] = useState<Aplication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/apps')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setApps(data.data)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Cargando...</div>

  return (
    <div>
      {apps.map(app => (
        <div key={app.id}>{app.name}</div>
      ))}
    </div>
  )
}
```

## 🔐 Seguridad

1. **Nunca commiteals secrets**:
   ```bash
   # .gitignore
   .env.local
   .env.*.local
   ```

2. **Service Role Key** - Solo en servidor:
   - Úsalo en `/pages/api` para operaciones admin
   - NO lo uses en componentes cliente
   - NO lo commiteals a git

3. **Anon Key** - Segura en cliente:
   - Usa esta en navegadores
   - Protege con RLS si es necesario

4. **Validar inputs** siempre en servidor

## 🚦 Pasos Siguientes

1. ✅ Crear cuenta Supabase
2. ✅ Crear tablas
3. ✅ Importar datos
4. ✅ Configurar `.env.local`
5. ✅ Probar endpoints en `http://localhost:3000/api/apps`
6. ⚠️ Actualizar componentes para usar nuevos servicios
7. 🧪 Hacer pruebas en desarrollo
8. 📦 Hacer deploy

## 🆘 Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"
```bash
npm install
```

### Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"
- Asegúrate de que `.env.local` existe
- Reinicia el servidor de desarrollo
- El archivo debe estar en la raíz del proyecto

### Datos no aparecen
- Verifica que las tablas existan en Supabase
- Comprueba RLS policies
- Mira la consola del navegador para errores

### Tabla no existe
- En Supabase SQL Editor, verifica que creaste la tabla
- Ejecuta el SQL desde la sección "SQL Editor"

## 📚 Recursos Útiles

- [Documentación Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

## 💡 Tips Avanzados

### Revalidar datos con ISR (Incremental Static Regeneration)

```typescript
// pages/projects/index.tsx
export async function getStaticProps() {
  const apps = await getApplications()
  return {
    props: { apps },
    revalidate: 3600, // Revalidar cada hora
  }
}
```

### Usar Supabase Realtime para actualizaciones en vivo

```typescript
import { useEffect } from 'react'
import { supabaseClient } from '@/lib/supabase'

export function useApplicationsRealtime() {
  const [apps, setApps] = useState([])

  useEffect(() => {
    const subscription = supabaseClient
      .from('applications')
      .on('*', payload => {
        // Manejar cambios en tiempo real
        console.log('Cambio detectado:', payload)
      })
      .subscribe()

    return () => {
      supabaseClient.removeAllChannels()
    }
  }, [])

  return apps
}
```

---

**Versión**: 1.0  
**Última actualización**: Noviembre 2025  
**Mantenedor**: ShindouAstrea
