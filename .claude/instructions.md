# Instrucciones del proyecto — .claude/instructions.md

Este documento resume la estructura del proyecto, las prácticas de programación observadas, convenciones y flujos de trabajo recomendados para colaborar eficazmente en este repositorio Next.js.

## Resumen rápido
- Tipo de proyecto: Sitio web construido con Next.js (TypeScript) y Tailwind CSS.
- Base de datos: **Supabase** (PostgreSQL en la nube) para reemplazar datos JSON locales.
- Estructura principal: `src/` contiene componentes y páginas; `public/` activos estáticos; `backend/` server-side utilities; configuración de Docker y scripts en la raíz.
- Objetivo del documento: facilitar a un desarrollador (o a la IA) entender cómo está organizado el código, las decisiones de diseño y cómo contribuir respetando las prácticas del proyecto.

## 🗄️ Estructura Supabase (NUEVO)

El proyecto ahora usa **Supabase** en lugar de datos JSON locales:

- `src/lib/supabase.ts` — Cliente Supabase configurado
- `src/lib/supabaseUtils.ts` — Utilidades y helpers para Supabase
- `src/services/` — Capas de servicio para interact con Supabase:
  - `applicationService.ts` — CRUD para aplicaciones/proyectos
  - `jobService.ts` — CRUD para trabajos/experiencias
  - `contactService.ts` — Guardar mensajes de contacto

**Para instrucciones completas de setup**, consulta `SUPABASE_SETUP.md`

## Estructura observada (extracto)
- `src/components/` — componentes React funcionales en TypeScript (.tsx), reutilizables y construidos como piezas UI pequeñas (por ejemplo `NavBar.component.tsx`, `CardApp.component.tsx`).
- `src/pages/` — rutas y handlers API con la convención de Next.js (por ejemplo `pages/api/*.ts` para endpoints backend integrados). También vistas por ruta (`index.tsx`, `projects/index.tsx`, `contact/index.tsx`).
- `src/models/` — definiciones e interfaces TypeScript compartidas (`interfaces.ts`).
- `src/services/` — capas de servicio para interactuar con Supabase.
- `src/lib/` — librerías y configuración (cliente Supabase, utilidades).
- `public/` — assets estáticos organizados en subcarpetas (`assets/icons`, `assets/pictures`, `assets/projects`).
- `backend/` — utilidades y servidor (ej. `server.ts`) para tareas server-side, posiblemente para desarrollo local o microservicios.
- Archivos de configuración: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `Dockerfile`, `docker-compose*.yml`.

## Prácticas y convenciones observadas
- TypeScript estricto en todo el código fuente; se usan interfaces para definir shapes de datos en `src/models/interfaces.ts`.
- Componentes con sufijo `.component.tsx` para distinguirlos de páginas y utilidades.
- Servicios en `src/services/` para encapsular la lógica de datos y Supabase.
- Organización por dominio (components, pages, models, services) siguiendo patrones convencionales de Next.js.
- Uso de `public/assets` para recursos estáticos y de `pages/api` para endpoints serverless.
- Archivos relacionados con redes sociales, iconos y proyectos centralizados en `public/assets/*` con `index.ts` para exportar rutas/constantes.
- El proyecto incluye Docker y docker-compose, lo que sugiere soporte para desarrollo aislado y despliegue reproducible.
- **Variables de entorno**: Los datos sensibles de Supabase se guardan en `.env.local` (nunca se commiten a git).

## Contrato mínimo (entrada / salida / errores)
- Entradas: peticiones HTTP a rutas en `src/pages` y `src/pages/api/*`, props pasadas a los componentes desde páginas padre.
- Salidas: HTML/JS/CSS renderizado por Next.js y JSON desde endpoints API.
- Modo error: las APIs retornan respuestas HTTP con códigos adecuados (200/4xx/5xx). Las interfaces TypeScript ayudan a detectar inconsistencias en tiempo de compilación.
- **Datos**: se obtienen desde Supabase a través de los servicios en `src/services/`.

## Flujo de trabajo recomendado
1. Configurar Supabase: crea cuenta y obtén credenciales (ver `SUPABASE_SETUP.md`).
2. Configurar variables de entorno: copia `.env.local.example` a `.env.local` y rellena tus credenciales.
3. Crear tablas en Supabase: ejecuta el SQL desde `SUPABASE_SETUP.md`.
4. Instalar dependencias: `npm install` o `pnpm install`.
5. Ejecutar en modo desarrollo: `npm run dev`.
6. Usar Docker si se requiere: `docker-compose up --build` para replicar el entorno consistente.
7. Antes de PR: ejecutar linters y compilación TypeScript (`npm run build` y `npm run lint` si existen).

## Estilo de código y buenas prácticas
- Preferir componentes funcionales y hooks.
- Mantener componentes pequeños, con responsabilidad única. Extraer lógica reusable a hooks o utilidades.
- Tipar todas las props y respuestas de API con interfaces compartidas en `src/models/interfaces.ts`.
- **Usar servicios en `src/services/`** para toda interacción con Supabase, nunca llamar directamente a Supabase desde componentes.
- Hacer importaciones relativas desde la raíz o configurar `paths` en `tsconfig.json` para evitar rutas largas.
- Agrupar assets por tipo y exponerlos mediante `index.ts` para cambios fáciles.
- Nunca hacer commit de `.env.local`; usar `.env.local.example` como template.

## Edge cases y consideraciones
- Rutas dinámicas: validar props y manejar 404s en páginas que dependan de parámetros.
- Carga de imágenes grandes: usar `next/image` cuando sea apropiado para optimización.
- Concurrencia en APIs: proteger recursos compartidos y validar inputs.
- Internacionalización: si se añadiera i18n, centralizar textos en archivos locales y preferir `next-i18next` o `next` i18n integrado.
- **Datos sensibles**: nunca expongas Service Role Key en cliente; úsalo solo en `/pages/api` si es necesario.

## Ejemplos de tareas comunes y cómo realizarlas
- Añadir un nuevo componente:
  1. Crear `src/components/MyNew.component.tsx`.
  2. Tipar las props en `src/models/interfaces.ts` si serán compartidas.
  3. Importarlo en la página correspondiente y revisar en `localhost:3000`.

- Crear un endpoint API:
  1. Añadir `src/pages/api/new-endpoint.ts`.
  2. Exportar handler con `export default function handler(req: NextApiRequest, res: NextApiResponse)`.
  3. Tipar request/response con las interfaces apropiadas.

## Scripts detectados (extraídos de `package.json`)
He detectado los siguientes scripts en `package.json`:

- `initial`: `npm ci && next dev` — instala dependencias con `npm ci` y arranca Next en modo desarrollo.
- `dev`: `npm i next dev` — nota: este script parece incorrecto; probablemente la intención fue `next dev`. Ejecutar `npm i next dev` tratará de instalar paquetes en cada inicio.
- `build`: `next build`
- `start`: `next start`
- `lint`: `next lint`

Recomendaciones inmediatas:

- Corregir el script `dev` a `next dev` (o a `npm run dev` si se usa otro comando) para evitar reinstalaciones cada vez que se arranque el entorno de desarrollo.
- Mantener `initial` sólo si se desea un paso de bootstrap que ejecute `npm ci` y luego `next dev` en una sola orden; de lo contrario separar instalación y arranque en comandos distintos.
- Considerar añadir `test` y/o `format` si se integran pruebas y formateo automático.

Comandos útiles (PowerShell / Windows):
```powershell
npm install
npm run dev
npm run build
npm run start
npm run lint
```

Notas sobre lint y dependencias:
- El repositorio incluye `eslint` y `eslint-config-next` en `dependencies`, por lo que `next lint` está disponible.
- Para CI, usar `npm ci` en lugar de `npm install` para instalaciones reproducibles.

Revisa `package.json` y ajusta los scripts según el package manager preferido (npm, pnpm, yarn) y las necesidades de CI.

## Checklist para Pull Requests
- Código compila sin errores TypeScript.
- Nuevo código tiene tipos y, cuando aplica, tests mínimos.
- Lint y formateo aplicados.
- Documentación o comentarios añadidos para lógica no trivial.

## Notas finales y próximos pasos sugeridos
- Añadir un `README` o ampliar el existente con comandos de desarrollo y despliegue específicos.
- Añadir un `CONTRIBUTING.md` para normas de PR y revisión de código.
- Para integraciones automáticas, añadir GitHub Actions o pipeline CI que ejecute lint, build y tests.

---
Generado automáticamente en base a la estructura del repositorio y prácticas comunes de Next.js.
