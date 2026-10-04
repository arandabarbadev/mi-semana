# Modelo de datos: Deberes y cosas que hacer

**Fase 1** · 2026-10-04

## Entidad: Deber

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | texto | Único, inmutable (generado al crear) |
| `asignatura` | texto | Opcional; máx. 30 caracteres; se sugiere desde lo ya usado |
| `fecha` | texto `"AAAA-MM-DD"` | Opcional; al crear no puede ser anterior a hoy (límite del formulario) |
| `texto` | texto | Obligatorio, una línea, máx. 140 caracteres |
| `hecha` | booleano | `false` al crear; alterna entre pendiente y completado |

## Estados

- **Pendiente** (`hecha: false`): visible en "Pendientes"; orden: con fecha por fecha ascendente, sin fecha al final bajo el grupo "Cosas que hacer".
- **Completado** (`hecha: true`): visible en "Completados"; se quita solo con el botón de quitar completadas (con confirmación).

Transiciones: pendiente ↔ completado (marcar/deshacer); cualquier estado → eliminado (confirmación). Sin más ciclos de vida.

## Derivados (calculados, no guardados)

- Etiqueta de urgencia a partir de `fecha` y hoy: "hoy" (0 días), "mañana" (1), "en N días" (≤3 urgente, resto calmado), "por hacer" (sin fecha).
- Contadores: pendientes, completados, total pendientes en pestaña si > 0.

## Contenedor

Array `datos.deberes` dentro del objeto `datos` de `localStorage["mi-semana-v1"]`, sincronizado con la semana completa (spec 006).

## Nota histórica

`cargar()` arrastra la migración one-shot `tareasFinde` → deberes sin fecha; ya ejecutada en la práctica, no genera trabajo.

## Cambios de este plan en el modelo

Ninguno en campos; solo comportamiento: los pendientes vencidos se quitan tras confirmación (antes, en silencio) y los completados vencidos ya no se quitan automáticamente.
