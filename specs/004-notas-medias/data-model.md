# Modelo de datos: Notas y medias

**Fase 1** · 2026-10-10

## Entidad: Asignatura

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | texto | Único, inmutable |
| `nombre` | texto | Obligatorio, una línea, máx. 40 |
| `objetivo` | número o nulo | Opcional; 0-10 en pasos de 0,5; nulo = sin objetivo |
| `createdAt` | número | Fecha de alta en ms; ordena las notas nuevas |

## Entidad: Nota

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | texto | Único, inmutable |
| `asignaturaId` | texto | Referencia a Asignatura; obligatoria (select) |
| `examen` | texto | Concepto ("Examen 1", "Trabajo mapas"…), una línea, máx. 60 |
| `nota` | número | 0-10; se admite coma al escribirla |
| `createdAt` | número | Fecha de alta; ordena la lista de la asignatura |

## Derivados (calculados, no guardados)

- `mediaExacta(asignaturaId)`: media aritmética de sus notas; se muestra con máx. 2 decimales y formato español (coma).
- `mediaRedondeada(asignaturaId)`: `min(10, round(exacta))` — entero con tope.
- Nota necesaria para el objetivo: `objetivo × (n+1) − suma` sobre las notas actuales; decide el mensaje de FR-004.

## Relaciones

- Una asignatura tiene N notas (por `asignaturaId`). Borrar la asignatura borra sus notas (con confirmación que lo avisa).
- Las asignaturas alimentan las sugerencias de deberes (spec 002) y el resumen del día (spec 005).
- La importación de otras apps mapea por nombre (spec 006).

## Contenedor

`datos.asignaturas` y `datos.notas` en `localStorage["mi-semana-v1"]`; viajan con la semana (spec 006).

## Cambios de este plan en el modelo

Ninguno en campos. Solo comportamiento: al editar una nota, `asignaturaId` puede cambiar (antes se mantenía el original).
