# Plan de implementación: Cuenta y sincronización

**Rama**: `006-cuenta-sincronizacion` | **Fecha**: 2026-10-10 | **Spec**: [spec.md](spec.md)

**Entrada**: especificación de la función en `specs/006-cuenta-sincronizacion/spec.md`

## Resumen

Plan retrospectivo con **un cambio aprobado**: FR-007 — al importar de las otras apps, los deberes vencidos se descartan hoy en silencio y deben contarse y avisarse en el resumen. Login/salida, guardado agrupado, última-escritura-gana, mudanza, aviso de nube muda y deduplicación ya existen y se verifican (el login, en código y con la cuenta real de Rafa; el resto sin sesión, en vivo).

## Contexto técnico

**Lenguaje/Versión**: JavaScript (módulos ES) + HTML5 + CSS3, sin build.

**Dependencias principales**: **Firebase (Auth + Firestore) y Google Fonts — excepciones a la Constitución III, ya en producción y aprobadas por Rafa**:
- *Qué problema resuelve Firebase*: sincronizar la semana entre dispositivos con cuenta Google, sin mantener un servidor propio. *Alternativa sin dependencia descartada*: solo navegador (no sincroniza entre dispositivos) — insuficiente para el objetivo de la función; un backend propio exigiría hosting, dominio y mantenimiento desproporcionados para una app personal.
- *Qué problema resuelve Google Fonts (Outfit)*: tipografía de identidad legible. *Alternativa descartada*: fuentes del sistema — Rafa eligió Outfit (excepción preexistente, se deja por escrito aquí donde toca).
- Nada de esto se añade en esta feature: se documenta. **Cero dependencias nuevas.**

**Almacenamiento**: `localStorage["mi-semana-v1"]` (siempre) + un documento de Firestore por cuenta con la semana completa y `modificado` como árbitro.

**Testing**: manual (quickstart) + verificación en vivo sin sesión (VII, IX). El login con Google y la importación requieren la cuenta real: verificación en código + prueba de Rafa (anotado en tasks).

**Plataforma objetivo**: PWA en navegador móvil; GitHub Pages.

**Tipo de proyecto**: web app estática monolito (index.html, app.js, firebase.js, styles.css).

**Objetivos de rendimiento**: subida agrupada (tanda de ~3 s); bajada en tiempo real por escucha.

**Restricciones**: sin dependencias nuevas (III); móvil y español (IV); avisos de "solo navegador" (VI); evidencias (IX); ninguna clave secreta en el repo (VIII — las claves públicas de Firebase web son de uso público por diseño, no son secretas).

**Escala/Alcance**: una cuenta personal; una semana de datos (~decenas de KB).

## Constitution Check

| Principio / lección | Estado | Nota |
|---|---|---|
| I. Spec antes que código | ✔ | Spec 006 creada y compartida |
| II. Privacidad | ✔ | Ningún dato personal va al repo; la nube es la cuenta privada del usuario |
| III. Sin dependencias | ✔ documentado | Firebase y Google Fonts: excepciones preexistentes justificadas arriba; cero nuevas |
| IV. Móvil primero | ✔ | Login con redirección para móvil (popup bloqueado) |
| V. Se entiende sin explicación | ✔ | Estados y avisos en claro |
| VI. No perder datos | ✔ | Salir no borra; fallos avisan; sin sesión se declara |
| VII. Requisito comprobable | ✔ | quickstart; lo que exige cuenta, con la cuenta real |
| VIII. Todo en mi carpeta | ✔ | specs/ en el repo local; sin claves en archivos |
| IX. Evidencias | ✔ | Lo automatizable en vivo con capturas; el resto en código + Rafa |
| L1 / L2 | ✔ | Sin cambios |

**Puerta: PASA.**

## Estructura del proyecto

### Documentación (esta función)

```text
specs/006-cuenta-sincronizacion/
├── plan.md · research.md · data-model.md · quickstart.md · tasks.md
└── checklists/requirements.md
```

### Código fuente y puntos de contacto

```text
index.html   # Panel de cuenta (perfil, botones login/logout/importar, nota)
app.js       # enCambiarSesion, programarNube/subirNube, escucharSemana, dibujarCuenta,
             # btn-login/logout/importar (con la mudanza, dedupe y filtrado de vencidos)
firebase.js  # entrar (popup→redirect), salir, escucharSemana, subirSemana, leerOtrasApps
styles.css   # panel/modal (sin cambios)
```

**El cambio (FR-007, avisar vencidos descartados)** — en `#btn-importar` (app.js ~247-255):
- Antes del filtrado, contar los deberes importados con fecha pasada.
- El resumen final añade, si hay, "No se han traído N deber(es) vencido(s)".
- El filtrado en sí se queda igual (los vencidos no se traen, como ahora).

## Seguimiento de complejidad

> Sin entradas: no hay violaciones que justificar (las dependencias son excepciones preexistentes documentadas).
