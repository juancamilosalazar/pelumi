# Desplegar Pelumi en internet (prueba gratuita)

Guía para poner el sitio en línea rápido, gratis y sin tarjeta de crédito,
solo para probarlo. **No es para producción todavía** (ver limitaciones al final).

## Por qué Render y no Vercel

Pelumi guarda el catálogo, las imágenes y las métricas **en archivos dentro del
servidor**. Eso obliga a usar un hosting que ejecute un servidor Node de verdad:

| Hosting | ¿Sirve para probar Pelumi? |
|---|---|
| **Render (plan Free)** | ✅ **Recomendado.** Servidor Node real: el panel admin, subir imágenes y las métricas funcionan. |
| Vercel | ⚠️ El catálogo se ve bien, pero **subir imágenes falla** (su sistema de archivos es de solo lectura). |
| Railway / Fly.io | ✅ Funcionan y guardan datos permanentemente, pero piden tarjeta y son más complejos. |
| Hostinger VPS | ✅ El destino final planeado (de pago). |

---

## Paso a paso (unos 15 minutos)

### 1. Subir el código a GitHub

El repositorio de git ya está creado y con el primer commit hecho. Solo falta
enviarlo a GitHub:

1. Entra a [github.com/new](https://github.com/new) y crea un repositorio
   llamado `pelumi`.
   - Déjalo **privado** si prefieres.
   - **No** marques "Add a README" ni ninguna otra casilla (el proyecto ya los trae).
2. Copia la URL que te muestra (algo como `https://github.com/tu-usuario/pelumi.git`).
3. En la terminal, dentro de la carpeta del proyecto:

```bash
git remote add origin https://github.com/TU-USUARIO/pelumi.git
git branch -M main
git push -u origin main
```

> Si te pide contraseña, GitHub ya no acepta la de tu cuenta: usa un
> **Personal Access Token** (Settings → Developer settings → Tokens) o instala
> [GitHub CLI](https://cli.github.com) y corre `gh auth login`.

### 2. Crear la cuenta en Render

1. Entra a [render.com](https://render.com) → **Get Started**.
2. Regístrate con tu cuenta de **GitHub** (es lo más rápido: así Render ve tus
   repositorios directamente).

### 3. Crear el servicio web

1. En el panel de Render: **Add new** → **Web Service**.
2. Elige el repositorio `pelumi` y dale **Connect**.
3. Render leerá el archivo `render.yaml` del proyecto y llenará casi todo solo.
   Verifica que quede así:
   - **Language / Runtime**: `Node`
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: **Free**
4. **Aún no le des "Deploy"** — primero las variables (paso 4).

### 4. Configurar las variables de entorno

> ⚠️ **Importante**: las variables que empiezan por `NEXT_PUBLIC_` se incrustan
> en la página **al compilar**. Si las cambias después, hay que volver a
> desplegar para que surtan efecto.

En la sección **Environment Variables**, agrega:

| Variable | Valor |
|---|---|
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | **una clave nueva y distinta** (el sitio será público) |
| `SESSION_SECRET` | déjalo que Render lo genere solo |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `573127196657` |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE` | `Hola, quiero más información sobre {producto} 🧸` |
| `NEXT_PUBLIC_INSTAGRAM` | `distripeluches` |
| `NEXT_PUBLIC_ADDRESS` | `Cl 45 # 54-414, El Santuario, Antioquia` |
| `NEXT_PUBLIC_SITE_URL` | `https://pelumi.onrender.com` (ajústalo al nombre real que te dé Render) |

### 5. Desplegar

Dale **Deploy Web Service**. El primer despliegue tarda unos 3–5 minutos
(instala dependencias y compila). Cuando termine verás la URL arriba:

```
https://pelumi.onrender.com
```

Ábrela: ya está en internet 🎉

### 6. Verificar que todo funcione

- [ ] La página de inicio carga con el carrusel de favoritos
- [ ] El catálogo muestra los 50 peluches con sus fotos
- [ ] Agregar al carrito y el botón de WhatsApp abre el chat con el pedido
- [ ] `/admin/login` entra con las credenciales del paso 4
- [ ] `/admin/metricas` muestra el tablero
- [ ] Subir un producto nuevo desde el panel funciona

Si `NEXT_PUBLIC_SITE_URL` quedó con la URL equivocada, corrígela en
**Environment** y dale **Manual Deploy → Deploy latest commit**.

---

## Limitaciones del plan gratuito (importante)

1. **El sitio se "duerme"**: tras 15 minutos sin visitas, Render apaga el
   servicio. La siguiente visita tarda **~1 minuto** en cargar mientras
   despierta. Es normal en el plan gratis.

2. **Las imágenes nuevas no sobreviven un reinicio** ⚠️
   El plan Free tiene sistema de archivos temporal. Cuando el servicio se
   duerme, se reinicia o se redespliega, **vuelve al estado del repositorio**:
   - Los 50 peluches del repositorio: **siempre están** ✅
   - Los productos que subas desde el panel en vivo: **se pierden** al reiniciar ❌

   Perfecto para *probar y mostrar*, pero no para cargar el catálogo real.

3. **750 horas gratis al mes** por cuenta (suficiente para un servicio).

### Cómo quitar esas limitaciones más adelante

- **En Render**: subir a plan pago (~7 USD/mes) y añadir un **Persistent Disk**
  montado en `/opt/render/project/src/uploads`. Con eso todo persiste.
- **En Hostinger VPS** (el plan original): al ser un servidor propio con disco
  real, no tiene ninguna de estas limitaciones.

---

## Actualizar el sitio después

Cada vez que hagas cambios:

```bash
git add -A
git commit -m "descripción del cambio"
git push
```

Render detecta el push y redespliega solo.
