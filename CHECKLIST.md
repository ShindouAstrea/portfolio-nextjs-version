# 🚀 Checklist de Migración a Supabase

## ✅ Tareas Completadas

### Estructura de Código
- [x] Créado cliente Supabase configurado (`src/lib/supabase.ts`)
- [x] Creadas utilidades Supabase (`src/lib/supabaseUtils.ts`)
- [x] Creado servicio de aplicaciones (`src/services/applicationService.ts`)
- [x] Creado servicio de trabajos (`src/services/jobService.ts`)
- [x] Creado servicio de contactos (`src/services/contactService.ts`)
- [x] Actualizado tipos TypeScript (`src/models/interfaces.ts`)
- [x] Actualizado endpoint `/api/apps`
- [x] Actualizado endpoint `/api/jobs`
- [x] Actualizado endpoint `/api/contact`

### Documentación
- [x] Guía completa de setup (`SUPABASE_SETUP.md`)
- [x] Resumen de migración (`MIGRATION_SUMMARY.md`)
- [x] Ejemplos de uso (`USAGE_EXAMPLES.md`)
- [x] Template de variables de entorno (`.env.local.example`)
- [x] Actualización de instrucciones del proyecto

## 📋 Tareas Para el Usuario

### 1. Setup Inicial (5-10 minutos)
- [ ] Crear cuenta en [https://supabase.com](https://supabase.com)
- [ ] Crear un nuevo proyecto Supabase
- [ ] Guardar la contraseña de base de datos en lugar seguro
- [ ] Esperar a que se inicialice el proyecto (2-3 minutos)

### 2. Obtener Credenciales (2 minutos)
- [ ] Ir a **Settings > API** en dashboard de Supabase
- [ ] Copiar **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copiar **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Copiar **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY` (opcional, solo si necesitas admin)

### 3. Configurar Variables de Entorno (2 minutos)
```bash
# En la terminal, en la raíz del proyecto:
cp .env.local.example .env.local
```
- [ ] Editar `.env.local`
- [ ] Pegar las credenciales de Supabase
- [ ] Verificar que no hayas guardado `.env.local` en git

### 4. Crear Tablas en Supabase (5-10 minutos)
- [ ] Ir a **SQL Editor** en tu proyecto Supabase
- [ ] Copiar el SQL de `SUPABASE_SETUP.md` (tabla `applications`)
- [ ] Ejecutar el SQL
- [ ] Repetir para tabla `jobs`
- [ ] Repetir para tabla `contact_messages`

### 5. Importar Datos Iniciales (5 minutos, OPCIONAL)
- [ ] Copiar datos de tus aplicaciones al SQL de ejemplo
- [ ] Ejecutar el INSERT en SQL Editor
- [ ] Repetir para datos de trabajos
- [ ] Verificar que los datos aparezcan en el "Data Browser" de Supabase

### 6. Configurar Row Level Security (OPCIONAL pero RECOMENDADO)
- [ ] Ir a **Authentication > Policies**
- [ ] Crear políticas para lectura pública de `applications`
- [ ] Crear políticas para lectura pública de `jobs`
- [ ] Crear políticas para inserción en `contact_messages`

### 7. Probar en Desarrollo (5 minutos)
```bash
# En la terminal:
npm install  # Si no lo hiciste recientemente
npm run dev
```
- [ ] Abrir http://localhost:3000 en el navegador
- [ ] Verificar que la página carga sin errores
- [ ] Probar endpoint `/api/apps` en http://localhost:3000/api/apps
- [ ] Probar endpoint `/api/jobs` en http://localhost:3000/api/jobs
- [ ] Probar formulario de contacto (si existe)

### 8. Validación (5 minutos)
- [ ] Verificar que los datos se cargan correctamente
- [ ] Verificar que los endpoints responden con formato correcto
- [ ] Verificar que no hay errores en consola
- [ ] Probar con herramientas como Postman (opcional)

### 9. Actualizar Componentes (OPCIONAL)
- [ ] Revisar componentes que usan fetch de `/api/*`
- [ ] Considerar usar `getStaticProps` para mejor performance
- [ ] Actualizar hooks personalizados si existen
- [ ] Pruebas en navegadores diferentes

### 10. Preparar para Producción (ANTES DE DEPLOY)
- [ ] Verificar que `.env.local` está en `.gitignore`
- [ ] Configurar variables de entorno en tu hosting (Vercel, Netlify, etc.)
- [ ] Ejecutar `npm run build` sin errores
- [ ] Probar build de producción localmente (`npm run start`)
- [ ] Considerar usar `getStaticProps` con `revalidate` para ISR

## 📊 URLs de Referencia

| Recurso | URL |
|---------|-----|
| Dashboard Supabase | https://app.supabase.com |
| Documentación Supabase | https://supabase.com/docs |
| Cliente JS Supabase | https://supabase.com/docs/reference/javascript/introduction |
| Documentación Next.js | https://nextjs.org/docs |
| PostgreSQL Docs | https://www.postgresql.org/docs/ |

## 🆘 Si Tienes Problemas

### Error: "Cannot connect to Supabase"
- Verifica que `NEXT_PUBLIC_SUPABASE_URL` es correcto
- Verifica que `NEXT_PUBLIC_SUPABASE_ANON_KEY` es correcto
- Asegúrate de que el proyecto Supabase está iniciado (no pausado)

### Error: "Table does not exist"
- Verifica que creaste la tabla en SQL Editor
- Verifica el nombre de la tabla (case-sensitive)
- Refrescar la página

### Error: "No data returned"
- Verifica que la tabla tiene datos
- Verifica que la política de lectura está habilitada (RLS)
- Revisa la consola del navegador para detalles del error

### Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"
- Asegúrate de que `.env.local` existe en la raíz
- Asegúrate de que tiene el formato correcto
- Reinicia el servidor de desarrollo (`npm run dev`)

### Los datos no se guardan en contact
- Verifica que la tabla `contact_messages` existe
- Verifica que la política de inserción está habilitada
- Revisa los logs de Supabase

## 📚 Documentación Adicional

Todos estos archivos están en tu proyecto:

1. **SUPABASE_SETUP.md** - Guía paso a paso completa
2. **MIGRATION_SUMMARY.md** - Resumen de cambios realizados
3. **USAGE_EXAMPLES.md** - Ejemplos de cómo usar los servicios
4. **.env.local.example** - Template de variables de entorno
5. **.claude/instructions.md** - Instrucciones del proyecto
6. **README.md** - Información general del proyecto (actualizar después)

## 💡 Tips Útiles

### Performance
- Usa `getStaticProps` para páginas que no cambian frecuentemente
- Usa `revalidate: 3600` para revalidar cada hora
- Supabase cachea automáticamente

### Seguridad
- Nunca commites `.env.local`
- Usa `NEXT_PUBLIC_*` solo para variables públicas
- Service Role Key solo en servidor (`/pages/api`)
- Implementa RLS en Supabase para datos sensibles

### Debugging
- Abre DevTools en el navegador (F12)
- Pestaña "Network" para ver requests
- Pestaña "Console" para ver errores
- Usa `console.log()` en servicios

### Escalabilidad Futura
- Supabase soporta autenticación (no implementado aún)
- Supabase soporta Storage para archivos
- Supabase soporta Realtime para datos en vivo
- Supabase soporta Edge Functions para lógica sin servidor

## ✨ Una Vez Completado

Cuando termines con este checklist:

1. ✅ Tu aplicación usará una base de datos real
2. ✅ Los datos persistirán entre reinicios
3. ✅ Podrás agregar, editar o eliminar datos fácilmente
4. ✅ Podrás escalar a más usuarios
5. ✅ Tendrás mejor rendimiento
6. ✅ Podrás usar Supabase para futuras características

## 🎉 ¡Éxito!

Una vez que completes este checklist, tu proyecto estará completamente migrado a Supabase. 

**Próximos pasos recomendados:**
1. Implementar autenticación de usuarios (opcional)
2. Agregar administración de datos desde el frontend (opcional)
3. Configurar almacenamiento de imágenes (Storage)
4. Implementar búsqueda y filtros avanzados
5. Agregar paginación en listados grandes

---

**¿Necesitas ayuda?** Consulta la documentación o los archivos `SUPABASE_SETUP.md` y `USAGE_EXAMPLES.md`
