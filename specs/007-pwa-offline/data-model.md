# Modelo de datos: Instalación y uso sin conexión

**Fase 1** · 2026-10-10

## Sin entidades de datos

Es la carcasa. Lo único que "guarda" es la caché del navegador, y guarda **aplicación, no datos**:

| Caché (`mi-semana-v2`) | Qué | Cuándo |
|---|---|---|
| Carcasa | HTML, CSS, JS, manifiesto, iconos | Al instalar el fondo (primera visita) |
| Piezas externas | Módulos de Firebase y la fuente | Al usarlas por primera vez (se copian al vuelo) |

Nunca entran en la caché: los datos de la semana (`localStorage`, spec 006) ni nada del usuario.

## Ciclo de vida del fondo (service worker)

1. **Instala**: precarga la carcasa y pasa a esperar.
2. **Activa**: borra las cachés de versiones anteriores y toma el control.
3. **Atiende**: cada petición GET sale a la red; si hay respuesta, se sirve (y las piezas externas se copian); sin red, se sirve la copia guardada (lección L2).
4. **Actualiza**: al llegar versión nueva, instala en segundo plano; al tomar el control, la app se recarga una vez (bandera antirrebote en app.js).

## Cambios de este plan

Ninguno.
