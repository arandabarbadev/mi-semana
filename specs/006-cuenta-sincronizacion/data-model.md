# Modelo de datos: Cuenta y sincronización

**Fase 1** · 2026-10-10

## Entidad: Cuenta (sesión)

Quién eres, fuera del modelo de la semana:

| Campo | Tipo | Notas |
|---|---|---|
| identificador de usuario (`uid`) | texto | Clave de todo lo de la nube; nulo = sin sesión |
| nombre / correo / foto | texto | Solo para pintar el panel; la app no los guarda |

No se persisten en el navegador: los da la sesión al arrancar.

## Entidad: Semana en la nube

Una copia **completa** de la semana por cuenta:

```text
users/{uid}/semana/datos = { horario, deberes, examenes, entregas,
                             asignaturas, notas, modificado }
```

- `modificado` (ms): árbitro de conflictos — gana el más reciente (FR-004).
- Escucha en tiempo real: los cambios remotos bajan solos.
- Subida agrupada: tanda de ~3 s por ráfaga de cambios.

## Datos de las otras apps (solo lectura al importar)

| App antigua | Dónde vive | Qué se trae |
|---|---|---|
| Deberes | documento del usuario, campo `tareas` | deberes completos (id, asignatura, fecha, texto) |
| Exámenes / entregas | colecciones por usuario | pares id+asignatura+fecha |
| Notas | colecciones de asignaturas y notas | asignaturas (con objetivo) y notas |

Reglas de la importación: sin duplicar por id; asignaturas con el mismo nombre se funden y sus notas se mapean al id local; los deberes con fecha pasada **no** se traen (y se avisa de cuántos).

## Relación con las demás funciones

La semana completa (specs 001-005) viaja siempre junta: no hay sincronización parcial.

## Cambios de este plan en el modelo

Ninguno en campos. Solo comportamiento: la importación cuenta los vencidos descartados y los muestra en el resumen.
