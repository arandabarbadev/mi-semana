# Plan de implementación: Instalación y uso sin conexión (PWA)

**Rama**: `007-pwa-offline` | **Fecha**: 2026-10-10 | **Spec**: [spec.md](spec.md)

**Entrada**: especificación de la función en `specs/007-pwa-offline/spec.md`

## Resumen

Plan retrospectivo **sin cambios de código**: manifiesto + iconos + service worker (red primero, L2) + autorecarga única ya existen y funcionan en producción. Se documentan y se verifican — el modo offline, en vivo con el navegador de pruebas; la instalación, con el móvil de Rafa.

## Contexto técnico

**Lenguaje/Versión**: JavaScript (módulos ES) + HTML5 + CSS3, sin build. Service worker propio.

**Dependencias principales**: ninguna nueva. Las piezas externas cacheables (módulos de Firebase y la fuente) ya cuentan como excepciones documentadas en la spec 006.

**Almacenamiento**: caché del navegador para la carcasa (HTML/CSS/JS/iconos/módulos/fuente); los datos, en `localStorage` (nunca en caché).

**Testing**: verificación en vivo: manifiesto e iconos servidos, service worker registrado, y **modo sin conexión real** simulado desde el navegador de pruebas. Instalación: con el móvil de Rafa (anotado).

**Plataforma objetivo**: Chrome/Safari/Edge móvil y escritorio; GitHub Pages.

**Tipo de proyecto**: web app estática monolito (index.html, app.js, firebase.js, sw.js, styles.css, manifest.webmanifest, iconos).

**Objetivos de rendimiento**: apertura offline inmediata (<3 s).

**Restricciones**: red primero para el HTML (L2); sin dependencias nuevas (III); evidencias (IX).

**Escala/Alcance**: una carcasa; caché de una versión vigente.

## Constitution Check

| Principio / lección | Estado | Nota |
|---|---|---|
| I. Spec antes que código | ✔ | No hay código nuevo |
| II. Privacidad | ✔ | La caché guarda la app, nunca datos personales |
| III. Sin dependencias | ✔ | Nada nuevo |
| IV. Móvil primero | ✔ | Es la razón de ser de la función |
| V. Se entiende sin explicación | ✔ | La instalación sigue el flujo del sistema |
| VI. No perder datos | ✔ | Los datos jamás viven en la caché |
| VII. Requisito comprobable | ✔ | quickstart (offline verificable en vivo) |
| VIII. Todo en mi carpeta | ✔ | specs/ en el repo local |
| IX. Evidencias | ✔ | Offline verificado en vivo con captura |
| L1 | ✔ | styles.css:31 |
| **L2. HTML a la red primero** | ✔ | **Es el corazón de esta función**: sw.js responde con red y cae a caché solo sin conexión |

**Puerta: PASA.**

## Estructura del proyecto

### Documentación (esta función)

```text
specs/007-pwa-offline/
├── plan.md · research.md · data-model.md · quickstart.md · tasks.md
└── checklists/requirements.md
```

### Código fuente y puntos de contacto (sin cambios)

```text
index.html            # <link rel="manifest">, theme-color, iconos
manifest.webmanifest  # nombre, iconos (192/512 + 512 adaptable), color, idioma
sw.js                 # precarga de la carcasa; fetch = red primero, caché sin conexión;
                      # al activar, borra cachés viejos
app.js                # registro del SW (solo en http/https) y recarga única al cambiar controlador
```

## Seguimiento de complejidad

> Sin entradas: no hay violaciones que justificar.
