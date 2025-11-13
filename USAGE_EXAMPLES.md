# Ejemplos de Uso de Servicios Supabase

Este documento contiene ejemplos prácticos de cómo usar los nuevos servicios Supabase en tus componentes y páginas.

## 1. Obtener Aplicaciones en una Página

### Opción A: Usar Fetch en useEffect (Cliente)

```typescript
// pages/projects/index.tsx
import { useEffect, useState } from 'react'
import { Aplication } from '@/models/interfaces'

export default function ProjectsPage() {
  const [apps, setApps] = useState<Aplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/apps')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setApps(data.data)
        } else {
          setError(data.error || 'Error fetching applications')
        }
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Mis Proyectos</h1>
      {apps.map(app => (
        <div key={app.id}>
          <h2>{app.name}</h2>
          <p>{app.description}</p>
          <div>
            {Array.isArray(app.tags) && app.tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```

### Opción B: Usar getStaticProps (SSG con ISR)

```typescript
// pages/projects/index.tsx
import { getApplications } from '@/services/applicationService'
import { Aplication } from '@/models/interfaces'

interface Props {
  apps: Aplication[]
}

export default function ProjectsPage({ apps }: Props) {
  return (
    <div>
      <h1>Mis Proyectos</h1>
      {apps.map(app => (
        <div key={app.id}>
          <h2>{app.name}</h2>
          <p>{app.description}</p>
        </div>
      ))}
    </div>
  )
}

// Genera la página en build time y revalida cada hora
export async function getStaticProps() {
  const apps = await getApplications()
  
  return {
    props: { apps },
    revalidate: 3600, // Revalidar cada 60 minutos
  }
}
```

### Opción C: Usar getServerSideProps (SSR)

```typescript
// pages/projects/index.tsx
import { getApplications } from '@/services/applicationService'

export async function getServerSideProps() {
  const apps = await getApplications()
  
  return {
    props: { apps },
  }
}
```

## 2. Obtener Trabajos/Experiencias

```typescript
// pages/experiences/index.tsx
import { useEffect, useState } from 'react'
import { Job } from '@/models/interfaces'

export default function ExperiencesPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setJobs(data.data)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Experiencia</h1>
      {jobs.map(job => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.company} • {job.start} - {job.end}</p>
          <p>{job.description}</p>
          <div>
            {Array.isArray(job.tags) && job.tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```

## 3. Enviar Mensaje de Contacto

```typescript
// components/ContactForm.component.tsx
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Mensaje enviado correctamente')
        setFormData({ email: '', subject: '', message: '' })
      } else {
        toast.error(data.message || 'Error al enviar el mensaje')
      }
    } catch (error) {
      toast.error('Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Tu email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Asunto"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Tu mensaje"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
```

## 4. Usar Servicios Directamente en API Routes

```typescript
// pages/api/dashboard/stats.ts
import { getApplications } from '@/services/applicationService'
import { getJobs } from '@/services/jobService'
import { getContactMessages } from '@/services/contactService'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const [apps, jobs, messages] = await Promise.all([
      getApplications(),
      getJobs(),
      getContactMessages(),
    ])

    res.status(200).json({
      success: true,
      data: {
        totalApps: apps.length,
        totalJobs: jobs.length,
        totalMessages: messages.length,
      },
    })
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stats' })
  }
}
```

## 5. Hook Personalizado para Cargar Datos

```typescript
// src/hooks/useApplications.ts
import { useEffect, useState } from 'react'
import { Aplication, AppsApiResponse } from '@/models/interfaces'

export function useApplications() {
  const [apps, setApps] = useState<Aplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await fetch('/api/apps')
        const data: AppsApiResponse = await res.json()
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch applications')
        }
        
        setApps(data.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchApps()
  }, [])

  return { apps, loading, error }
}

// Uso:
// export default function Projects() {
//   const { apps, loading, error } = useApplications()
//   ...
// }
```

## 6. Actualizar Datos Después de Operaciones

```typescript
// components/AdminPanel.component.tsx
import { useState } from 'react'
import { createApplication, deleteApplication } from '@/services/applicationService'
import { toast } from 'react-toastify'

interface AdminPanelProps {
  onDataChanged?: () => void
}

export default function AdminPanel({ onDataChanged }: AdminPanelProps) {
  const [loading, setLoading] = useState(false)

  const handleDeleteApp = async (id: number) => {
    setLoading(true)
    try {
      const result = await deleteApplication(id)
      
      if (result.success) {
        toast.success('Aplicación eliminada')
        onDataChanged?.() // Notifica al padre para recargar datos
      } else {
        toast.error('Error al eliminar')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCreateApp = async (appData: any) => {
    setLoading(true)
    try {
      const result = await createApplication(appData)
      
      if (result.success) {
        toast.success('Aplicación creada')
        onDataChanged?.()
      } else {
        toast.error('Error al crear')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Form y botones aquí */}
    </div>
  )
}
```

## 7. Usar Realtime Subscriptions (Avanzado)

```typescript
// src/hooks/useApplicationsRealtime.ts
import { useEffect, useState } from 'react'
import { supabaseClient } from '@/lib/supabase'
import { Aplication } from '@/models/interfaces'

export function useApplicationsRealtime() {
  const [apps, setApps] = useState<Aplication[]>([])

  useEffect(() => {
    let subscription: any

    const setupSubscription = async () => {
      // Cargar datos iniciales
      const { data } = await supabaseClient
        .from('applications')
        .select('*')

      if (data) {
        setApps(data as Aplication[])
      }

      // Configurar suscripción en tiempo real
      subscription = supabaseClient
        .from('applications')
        .on('*', payload => {
          if (payload.eventType === 'INSERT') {
            setApps(prev => [...prev, payload.new as Aplication])
          } else if (payload.eventType === 'UPDATE') {
            setApps(prev =>
              prev.map(app => 
                app.id === payload.new.id ? payload.new : app
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setApps(prev =>
              prev.filter(app => app.id !== payload.old.id)
            )
          }
        })
        .subscribe()
    }

    setupSubscription()

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  return apps
}
```

## 8. Manejo de Errores Consistente

```typescript
// src/hooks/useApiData.ts
import { useState, useEffect } from 'react'
import { handleSupabaseError } from '@/lib/supabaseUtils'

interface UseApiDataOptions {
  url: string
  method?: 'GET' | 'POST'
  body?: any
}

export function useApiData<T>(options: UseApiDataOptions) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(options.url, {
          method: options.method || 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: options.body ? JSON.stringify(options.body) : undefined,
        })

        const result = await response.json()

        if (!result.success) {
          throw result.error || result.message || 'Unknown error'
        }

        setData(result.data)
        setError(null)
      } catch (err) {
        setError(handleSupabaseError(err))
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [options.url])

  return { data, loading, error }
}
```

---

**Nota**: Adapta estos ejemplos según tus necesidades específicas y estructura de componentes.
