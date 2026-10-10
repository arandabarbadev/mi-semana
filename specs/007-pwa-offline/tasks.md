---
description: "Lista de tareas de la función Instalación y uso sin conexión"
---

# Tareas: Instalación y uso sin conexión

**Entrada**: documentos de `/specs/007-pwa-offline/`

**Requisitos previos**: plan.md ✔, spec.md ✔, research.md ✔, data-model.md ✔, quickstart.md ✔

**Tests**: verificación en vivo (offline real emulado) + móvil de Rafa (⭐). Sin código nuevo.

## Convención de rutas: app monolito en la raíz (index.html, sw.js, manifest.webmanifest, app.js)

---

## Fase 1: Arranque

- [x] T001 App sirviéndose por http (localhost:8123 o publicada): el fondo solo registra por http/https

## Fase 2: Verificación de lo existente

- [x] T002 Verificar manifest.webmanifest: nombre, iconos 192/512 + 512 adaptable, color de tema, idioma es; y que index.html lo enlaza junto a theme-color y apple-touch-icon (FR-001)
- [x] T003 Verificar sw.js: precarga de la carcasa; fetch GET = red primero con caída a caché; copia al vuelo de módulos y fuente; borrado de cachés viejos al activar (FR-003, L2)
- [x] T004 Verificar app.js: registro del fondo solo en http/https con `updateViaCache: 'none'`, y recarga única con bandera antirrebote en `controllerchange` (FR-004)

## Fase 3: Validación en vivo

- [x] T005 Comprobar en vivo: manifiesto e iconos responden 200 con su tipo (quickstart punto 8)
- [x] T006 Comprobar en vivo el offline real: fondo registrado → red cortada desde el navegador → recargar → la app pinta entera con datos sembrados (punto 4), con captura
- [x] T007 ⭐ (Rafa, con el móvil): instalación en pantalla de inicio y apertura a pantalla completa (puntos 1-2)

---

## Dependencias y orden

- Fase 1 → Fase 2 → Fase 3 (T005 y T006 en la misma sesión de navegador)

## Estrategia

Verificar en código, validar offline en vivo con evidencia (IX), dejar la instalación para el móvil de Rafa, luego /speckit-converge.

## Notas

- "Verificar" = leer el código citado, probarlo si hace falta y marcar. No genera cambios
