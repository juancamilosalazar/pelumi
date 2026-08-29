# Pelumi — catálogo web

Sitio de catálogo de peluches Pelumi: vitrina pública con pedidos por WhatsApp
y un panel de administración simple para cargar el catálogo (sin base de datos).

## Cómo correrlo en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Configuración (`.env.local`)

Ya existe un `.env.local` con valores de arranque (ver `.env.example` como referencia).
Ajusta estos valores antes de usarlo en serio:

- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — credenciales del panel admin (`/admin`).
- `SESSION_SECRET` — clave para firmar la cookie de sesión. Cambiar en producción.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — número de WhatsApp para pedidos (formato
  internacional, solo dígitos, sin "+"). **Confirmar que sea el correcto.**
- `NEXT_PUBLIC_WHATSAPP_MESSAGE` — plantilla del mensaje prellenado (usa `{producto}`).
- `NEXT_PUBLIC_INSTAGRAM`, `NEXT_PUBLIC_ADDRESS` — datos de contacto en el footer y mayoreo.
- `NEXT_PUBLIC_SITE_URL` — URL pública del sitio (para SEO). Actualizar al desplegar.

## Cómo funciona el catálogo (sin base de datos)

- Los productos viven en `data/products.json` (un archivo plano).
- Las imágenes subidas por el admin se guardan en `uploads/products/<id>/` (fuera de
  `public`, a propósito) y se sirven en runtime vía `src/app/uploads/[...path]/route.ts`.
  Esto es necesario porque en producción Next.js no detecta archivos agregados a
  `public` después del build.
- Ninguna de las dos carpetas (`data/products.json`, `uploads/products/*`) está en
  git — se tratan como contenido/datos, no como código.

## Panel de administración

- `/admin/login` — login con usuario/contraseña del `.env.local`.
- `/admin` — listar, marcar como favorito (aparece en Inicio), editar y eliminar productos.
- `/admin/nuevo` — crear producto (nombre, precio, descripción, imágenes).

La autenticación es intencionalmente simple (cookie firmada, sin registro de usuarios)
porque el catálogo no maneja información sensible.

## Estructura relevante

```
src/app/(site)/        páginas públicas: inicio, catálogo, mayoreo
src/app/admin/          panel de administración
src/app/api/admin/      endpoints de login y CRUD de productos
src/app/uploads/        sirve las imágenes subidas en runtime
src/lib/products.ts     lectura/escritura de data/products.json + imágenes
src/lib/auth.ts         credenciales y firma de la cookie de sesión
```

## Antes de desplegar

- Cambiar `ADMIN_PASSWORD` y `SESSION_SECRET` por valores propios.
- Confirmar `NEXT_PUBLIC_WHATSAPP_NUMBER` y `NEXT_PUBLIC_SITE_URL`.
- El hosting debe correr un servidor Node.js persistente con disco propio (no
  hosting compartido solo-PHP), porque el catálogo escribe archivos en disco.
- Hacer backup periódico de `data/products.json` y `uploads/products/` — es toda
  la "base de datos" del sitio.
