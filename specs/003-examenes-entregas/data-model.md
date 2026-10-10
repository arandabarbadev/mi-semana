# Modelo de datos: Exámenes y entregas

**Fase 1** · 2026-10-10

## Entidad: Examen / Entrega

(Idénticas en forma; listas separadas.)

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | texto | Único, inmutable (generado al crear) |
| `asignatura` | texto | Obligatoria, una línea, máx. 40 caracteres |
| `fecha` | texto `"AAAA-MM-DD"` | Obligatoria; pasada = plegado, hoy = HOY |

Sin más campos ni estados guardados: pendiente/pasado se **deriva** de comparar `fecha` con hoy, en días naturales.

## Derivados (calculados, no guardados)

- `diasQueFaltan(fecha)`: días hasta la fecha (negativo = pasado).
- Urgente: 0 ≤ días ≤ 3. HOY: días = 0. Pasado plegado con "ayer" (−1) o "hace N días".
- Contadores: pendientes por tipo; total de ambos en la pestaña solo si > 0.

## Contenedor

`datos.examenes` y `datos.entregas`, arrays dentro de `localStorage["mi-semana-v1"]`; viajan con la semana completa (spec 006).

## Cambios de este plan en el modelo

Ninguno. Los dos cambios son de UI: botón de editar (usa los campos existentes) y mensajes de lista vacía.
