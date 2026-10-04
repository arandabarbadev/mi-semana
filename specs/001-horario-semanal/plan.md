# Plan de implementación: Horario semanal

**Rama**: `001-horario-semanal` | **Fecha**: 2026-10-04 | **Spec**: [spec.md](spec.md)

**Entrada**: especificación de la función en `specs/001-horario-semanal/spec.md`

## Resumen

Plan **retrospectivo**: la función ya está construida y funcionando en producción. Este plan documenta cómo la implementa la app hoy (qué archivos, qué funciones, qué datos) y delimita el único hueco real frente a la spec: **FR-008**, un día laborable sin entradas debe decir qué hacer en vez de quedar en blanco (Constitución V). Todo lo demás se mantiene tal cual: HTML, CSS y JS puros, sin dependencias nuevas.

## Contexto técnico

**Lenguaje/Versión**: JavaScript (módulos ES, sin build) + HTML5 + CSS3. Navegadores actuales de móvil y escritorio.

**Dependencias principales**: ninguna para esta función. (La app usa Firebase y Google Fonts en otras partes — sincronización y tipografía global —, excepciones ya aprobadas de la Constitución III y fuera del alcance de esta spec.)

**Almacenamiento**: `localStorage` con la clave `mi-semana-v1`; el horario vive dentro del objeto `datos.horario`. La subida a la nube la gobierna la función "cuenta y sincronización" (spec aparte); aquí solo importa que `guardar()` ya se llama en cada cambio.

**Testing**: manual, con la app en la mano (Constitución VII). Los escenarios de validación están en [quickstart.md](quickstart.md). Sin framework de tests a propósito: añadirlo sería una dependencia nueva (Constitución III) desproporcionada para una app de un archivo.

**Plataforma objetivo**: PWA en el navegador del móvil (Chrome/Edge/Safari), publicada en GitHub Pages; también sirve en escritorio.

**Tipo de proyecto**: web app estática (PWA) monolito: un HTML, un JS, un CSS en la raíz del repo.

**Objetivos de rendimiento**: respuesta instantánea a añadir/editar/borrar (sin esperas perceptibles); la lista pinta en el mismo instante.

**Restricciones**: sin build ni dependencias nuevas (III); móvil primero y todo en español (IV); borrados siempre con confirmación (VI); el HTML se pide a la red primero (L2).

**Escala/Alcance**: datos de un solo usuario; decenas de entradas por semana; 5 días editables.

## Constitution Check

*Puerta: se evalúa antes de la Fase 0 y se re-evalúa tras la Fase 1.*

| Principio / lección | Estado | Nota |
|---|---|---|
| I. Spec antes que código | ✔ | Spec leída y aprobada por Rafa antes de este plan |
| II. Privacidad | ✔ | El horario son datos del usuario; nada personal va al repo |
| III. Sin dependencias por defecto | ✔ | Esta función no añade nada: JS/HTML/CSS puros ya existentes |
| IV. Móvil primero | ✔ | UI existente móvil-primero, todo en español |
| V. Se entiende sin explicación | ⚠ corregido en este plan | Carencia actual: día laborable vacío queda en blanco. El plan la cierra (FR-008) |
| VI. El usuario no pierde datos sin enterarse | ✔ | Borrar pide confirmación nombrando la entrada; editar se puede desistir |
| VII. Todo requisito se comprueba usándolo | ✔ | Criterios "hecho cuando" en quickstart.md |
| VIII. Todo lo generado en mi carpeta | ✔ | Specs y plan en `specs/` del repo local |
| L1. `[hidden]` siempre oculta | ✔ | Regla presente en `styles.css:31` |
| L2. HTML a la red primero | ✔ | `sw.js` responde con red primero, caché solo sin conexión |

**Resultado de la puerta: PASA.** La única fricción (principio V) no se justifica: se corrige dentro del alcance.

## Estructura del proyecto

### Documentación (esta función)

```text
specs/001-horario-semanal/
├── plan.md              # Este archivo
├── research.md          # Fase 0: decisiones
├── data-model.md        # Fase 1: modelo de datos
├── quickstart.md        # Fase 1: guía de validación manual
└── tasks.md             # Fase 2 (/speckit-tasks — no lo crea este plan)
```

*(Sin carpeta `contracts/`: la app no expone interfaces externas — ni API ni CLI —; su única cara visible es la propia UI, que ya describe la spec, y la forma de los datos, que describe `data-model.md`.)*

### Código fuente (raíz del repo)

```text
index.html    # Sección Horario: selector de días, listas, formularios de añadir
app.js        # Lógica completa del horario
styles.css    # Estilos: filas, listas, estados vacíos (.vacio)
```

**Puntos de contacto de la función en `app.js`** (referencia para tasks y convergencia):

| Bloque | Qué hace hoy |
|---|---|
| `estadoVacio()` / `CLAVE` | Forma inicial de `datos.horario`: 7 días con `clases: []` y `tarde: []` |
| `DIAS`, `DIAS_CORTO`, `diaDeHoy()`, `esFinde()` | Utilidades de días |
| `cargar()` | Lee `localStorage`; incluye la migración histórica de `tareasFinde` → deberes |
| `guardar()` | Persiste al momento y programa la subida a la nube |
| `dibujarDias()` | Pinta el selector Lu–Do y decide finde vs día laborable |
| `dibujarListaHorario(tipo)` | Pinta clases o tarde del día activo, ordenadas por hora |
| `añadirAHorario()` + formularios | Añadir entradas (hora + texto) |
| Delegación en `#lista-clases` / `#lista-tarde` | Editar en línea (con cancelar) y borrar con confirmación |
| `dibujarHoy()` | El resumen del día consume `datos.horario[diaDeHoy()]` (FR-007) |
| `setInterval` de 60 s | Cambio de día automático: fecha, exámenes, hoy y día activo (FR-009) |

**Decisión de estructura**: se mantiene la estructura actual de la app (archivos únicos en la raíz). No se crea ni un archivo de código nuevo: el arreglo de FR-008 cabe en los tres existentes.

## Seguimiento de complejidad

> Sin entradas: no hay violaciones de la constitución que justificar.
