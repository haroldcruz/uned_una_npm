# Prueba de Render

Sitio estático mínimo para desplegar en Render.com.

## Estructura
- `index.html`: página principal

## Despliegue en Render (Static Site)
1. Crea un repositorio en GitHub y sube este archivo `index.html` a la raíz.
2. En Render, crea un servicio de tipo `Static Site`.
3. Conecta tu repositorio.
4. Configura:
 - `Build Command`: (vacío) o `echo "no build"`
 - `Publish Directory`: `/` (raíz)
5. Deploy.

## Opcional
- Agrega más páginas y recursos (`/assets`, imágenes, CSS).
- Usa un `favicon.ico` para el icono del sitio.
