# Modelo de datos: Resumen del día (Hoy)

**Fase 1** · 2026-10-10

## Sin entidades propias

Hoy es una vista de solo lectura. No guarda nada; calcula a partir de:

| Qué muestra | De dónde sale | Spec |
|---|---|---|
| Clases y tarde de hoy | `horario[día actual]`, orden por hora | 001 |
| Próximo examen / próxima entrega | el más cercano con fecha ≥ hoy | 003 |
| Deberes que apremian | pendientes con fecha a ≤2 días (por fecha) + sin fecha | 002 |
| Mini-notas | media global y redondeadas por asignatura | 004 |
| Saludo y fecha | reloj del dispositivo | — |

## Derivados propios de Hoy

- Saludo: "Buenos días" (<13 h), "Buenas tardes" (<20 h), "Buenas noches"; "Es finde" en S/D.
- Deber de Hoy: mismo cálculo de etiqueta de urgencia que 002.
- Media global: media de las medias exactas de las asignaturas con notas (2 decimales).

## Cambios de este plan en el modelo

Ninguno.
