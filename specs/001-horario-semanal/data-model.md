# Modelo de datos: Horario semanal

**Fase 1 del plan** · 2026-10-04

## Entidad: Entrada de horario

Una cosa que pasa a una hora, en un día de la semana, en un grupo (clase de mañana o actividad de tarde).

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | texto | Único, inmutable; se genera al crear (`idNuevo()`) |
| `hora` | texto `"HH:MM"` | Obligatorio; orden lexicográfico == orden cronológico |
| `texto` | texto | Obligatorio, sin espacios sobrantes; descripción de una línea, máx. 40 caracteres (límite del formulario) |

Validación (viene de la spec): sin hora o sin descripción no se apunta; no hay más restricciones (dos entradas a la misma hora son legales y visibles).

## Entidad: Semana (contenedora)

```text
datos.horario = {
  lunes:    { clases: Entrada[], tarde: Entrada[] },
  martes:   { clases: Entrada[], tarde: Entrada[] },
  miercoles:{ clases: Entrada[], tarde: Entrada[] },
  jueves:   { clases: Entrada[], tarde: Entrada[] },
  viernes:  { clases: Entrada[], tarde: Entrada[] },
  sabado:   { clases: [], tarde: [] },   // siempre vacíos: el finde no se apunta
  domingo:  { clases: [], tarde: [] }
}
```

- Vive dentro del objeto `datos` persistido en `localStorage` bajo la clave **`mi-semana-v1`**, junto a `deberes`, `examenes`, `entregas`, `asignaturas`, `notas` y `modificado`.
- `sabado` y `domingo` existen en el modelo (los crea `estadoVacio()`) pero la UI nunca los edita (FR-006).
- Sin fechas: la misma semana vale para todas (FR-010).

## Relación con otras funciones

- **Hoy (spec 002)**: lee `datos.horario[diaDeHoy()]` para pintar el resumen; en finde lo ignora y muestra el mensaje de descanso.
- **Cuenta y sincronización (spec 006)**: `guardar()` actualiza `datos.modificado` y sube la semana completa; el horario viaja dentro. Nada específico del horario en la nube.
- **Persistencia**: cada cambio llama `guardar()` → escritura inmediata en `localStorage` (FR-005).

## Notas de migración (histórico, no tocar)

`cargar()` arrastra una migración one-shot de la app antigua: las `tareasFinde` se convirtieron en deberes sin fecha. Se documenta aquí para que tareas/convergencia sepan que existe, pero no genera trabajo.

## Cambios que este plan hace al modelo

Ninguno. FR-008 es solo presentación (mensaje cuando una lista está vacía); no toca datos.
