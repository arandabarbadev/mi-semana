# Plan de implementación: Notas y medias

**Rama**: `004-notas-medias` | **Fecha**: 2026-10-10 | **Spec**: [spec.md](spec.md)

**Entrada**: especificación de la función en `specs/004-notas-medias/spec.md`

## Resumen

Plan retrospectivo con **un cambio aprobado**: FR-006 — botón de editar nota en la pestaña Medias (el formulario emergente ya soporta editar notas: solo faltan botón, cableado y permitir cambiar la asignatura al editar). Medias, mensajes de objetivo, validación de rangos, edición de asignatura, borrados con confirmación y vacíos ya existen y se verifican.

## Contexto técnico

**Lenguaje/Versión**: JavaScript (módulos ES) + HTML5 + CSS3, sin build.

**Dependencias principales**: ninguna para esta función.

**Almacenamiento**: `localStorage` clave `mi-semana-v1`, arrays `datos.asignaturas` y `datos.notas`; la nube se gobierna en la spec 006.

**Testing**: manual (quickstart) + verificación en vivo con Chrome headless y CDP (Constituciones VII y IX).

**Plataforma objetivo**: PWA en navegador móvil; GitHub Pages.

**Tipo de proyecto**: web app estática monolito (index.html, app.js, styles.css).

**Objetivos de rendimiento**: recalcular y pintar al momento.

**Restricciones**: sin dependencias nuevas (III); móvil y español (IV); borrados confirmados (VI); evidencias visibles (IX).

**Escala/Alcance**: un usuario; ~10 asignaturas, ~100 notas por curso.

## Constitution Check

| Principio / lección | Estado | Nota |
|---|---|---|
| I. Spec antes que código | ✔ | Spec 004 creada y compartida |
| II. Privacidad | ✔ | Las notas del usuario no van al repo (Constitución II lo nombra expresamente) |
| III. Sin dependencias | ✔ | JS puro existente |
| IV. Móvil primero | ✔ | UI existente, español |
| V. Se entiende sin explicación | ✔ | Vacíos ya existen ("Añade tu primera asignatura…", "Sin notas todavía") |
| VI. No perder datos | ✔ | Borrar nota nombra; borrar asignatura avisa de sus notas |
| VII. Requisito comprobable | ✔ | quickstart con los 5 casos de objetivo |
| VIII. Todo en mi carpeta | ✔ | specs/ en el repo local |
| IX. Evidencias | ✔ | Verificación en vivo con capturas |
| L1 / L2 | ✔ | styles.css:31 / sw.js red primero |

**Puerta: PASA** — sin fricciones; el único cambio (FR-006) reduce una asimetría.

## Estructura del proyecto

### Documentación (esta función)

```text
specs/004-notas-medias/
├── plan.md · research.md · data-model.md · quickstart.md · tasks.md
└── checklists/requirements.md
```

*(Sin `contracts/`: sin interfaces externas, como en 001-003.)*

### Código fuente y puntos de contacto

```text
index.html   # Sección Notas: subpestañas Calculadora/Medias (sin cambios)
app.js       # notasDe, mediaExacta, mediaRedondeada, estadoObjetivo, dibujarNotas,
             # delegación en #lista-asignaturas y #medias-contenido,
             # abrirModal(campos nota/asignatura) y su submit
styles.css   # .nota-media .conseguida/.cerca, .chip-objetivo, .grupo-notas (sin cambios)
```

**El cambio (FR-006, editar nota)**:
- `dibujarNotas()` pestaña Medias (~líneas de `fila-nota`): botón de editar junto al de borrar en cada nota, con acción propia `editar-nota`.
- Delegación en `#medias-contenido`: `editar-nota` busca la nota y llama `abrirModal('nota', nota)`; el submit del modal ya distingue nuevo/existente para notas (~909-929), pero al editar mantiene la asignatura original — hay que dejar que la asignatura seleccionada en el formulario mande (permite mover la nota de asignatura).
- Título del modal: "Editar nota" (ya preparado en 003).

## Seguimiento de complejidad

> Sin entradas: no hay violaciones que justificar.
