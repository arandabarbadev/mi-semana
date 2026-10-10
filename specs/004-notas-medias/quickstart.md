# Guía de validación: Notas y medias

**Fase 1** · 2026-10-10 · Con la app en la mano

## Preparación

Como en las anteriores: Live Server, `http://localhost:8123` o la app publicada; incógnito para pruebas. Sembrar con DevTools si se quieren casos exactos.

## Escenarios: "hecho cuando…"

### A. Llevar las notas (FR-001, FR-002, FR-003, FR-010, SC-001, SC-002)

1. **Hecho cuando** añado "Mates" con objetivo 7: aparece al momento, orden alfabético, con su etiqueta de objetivo.
2. **Hecho cuando** le apunto un 6,5 en "Examen 1": media 6,5 exacta y 7 redondeada al momento.
3. **Hecho cuando** escribo "7,5" con coma: se guarda como 7,5.
4. **Hecho cuando** escribo un 12 o un objetivo de 15: no se guarda y avisa del rango.

### B. Qué necesito — los 5 casos (FR-004, SC-003)

5. Sin notas → "Sin notas aún"; con notas pero sin objetivo → "Ponle un objetivo para ver qué necesitas".
6. Objetivo 7, sin notas → "Objetivo: 7. ¡A por él!".
7. Objetivo 7, media exacta 7 o más → "¡Objetivo conseguido!".
8. Objetivo 7, exacta 6,5 (redondeada 7) → "¡Casi! Media: 6,5".
9. Objetivo 9, notas 6 y 7 → ni con un 10 llega → mensaje de "cada décima cuenta".
10. Objetivo 8, notas 7 y 7,5 → "Necesitas un 9,5 en el próximo examen para llegar a 8".

### C. Medias de grupo (FR-005)

11. **Hecho cuando** abro Medias: notas por asignatura en orden de apuntado y "media 7,25 → 7" debajo.
12. Asignatura sin notas → "Sin notas todavía".

### D. Corregir y borrar (FR-006, FR-007, FR-008, SC-004) — editar nota es nuevo

13. **Hecho cuando** edito la nota de 6,5 a 8: medias y mensajes saltan al momento; cancelar no toca nada.
14. **Hecho cuando** edito una nota cambiándola a otra asignatura: se va a su nueva asignatura.
15. **Hecho cuando** edito el objetivo de una asignatura: los mensajes se recalculan.
16. **Hecho cuando** borro una nota: confirmación nombrándola.
17. **Hecho cuando** borro una asignatura con notas: la confirmación avisa de que sus notas se van con ella.

### E. Vacíos (FR-011, SC-005)

18. Sin asignaturas → "Añade tu primera asignatura para empezar a llevar las notas".

## Resultado esperado

Los 18 puntos en verde. Los fallos se anotan para /speckit-converge.
