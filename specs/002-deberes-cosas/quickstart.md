# Guía de validación: Deberes y cosas que hacer

**Fase 1** · 2026-10-04 · Con la app en la mano

## Preparación

Como en 001: Live Server o `http://localhost:8123` (servidor casero), o la app publicada. Para datos de prueba sin miedo: ventana de incógnito. Para el escenario de vencidos: con DevTools (F12 → Application → Local Storage) cambia la `fecha` de un deber a ayer, o siembra directamente.

## Escenarios: "hecho cuando…"

### A. Apuntar y ver (FR-001, FR-002, FR-003, FR-010, SC-001)

1. **Hecho cuando** apunto "Estudiar tema 3" con asignatura Mates y fecha en 2 días: sale entre pendientes, antes que los de 5 días, con etiqueta "en 2 días".
2. **Hecho cuando** apunto "Llamar al abuelo" sin fecha: sale al final, bajo el título "Cosas que hacer", con etiqueta "por hacer".
3. **Hecho cuando** un deber vence hoy: su etiqueta dice "hoy"; mañana dirá "mañana".
4. **Hecho cuando** vuelvo a apuntar con asignatura: al escribirla, se me sugiere.

### B. Tachar (FR-004, FR-005, SC-002)

5. **Hecho cuando** marco un deber: pasa de pendientes a completados al momento y los contadores cambian.
6. **Hecho cuando** lo desmarco en completados: vuelve a pendientes.
7. **Hecho cuando** no hay pendientes: la pestaña no muestra número; en cuanto hay uno, sí.

### C. Corregir y borrar (FR-006, FR-007, SC-003)

8. **Hecho cuando** edito fecha/texto/asignatura de un pendiente: se guarda y reordena al momento; con cancelar queda como estaba.
9. **Hecho cuando** borro un deber: la confirmación lo nombra; cancelar no toca nada.
10. **Hecho cuando** pido "Quitar todas las completadas": pide confirmación antes de vaciar.

### D. Vencidos — la novedad (FR-008, FR-009, SC-004)

11. **Hecho cuando** tengo un deber pendiente con fecha de ayer y abro la app: pregunta cuántos hay y si quiero quitarlos.
12. **Hecho cuando** respondo que no: el deber se queda en pendientes.
13. **Hecho cuando** respondo que sí: desaparecen solo los pendientes vencidos.
14. **Hecho cuando** tengo un deber **completado** con fecha pasada y abro la app: sigue en completados, no se borra solo.
15. **Hecho cuando** una cosa sin fecha lleva semanas: nunca se quita sola.

### E. Vacíos (FR-011, SC-005)

16. **Hecho cuando** no hay pendientes: mensaje de ánimo, nunca blanco.
17. **Hecho cuando** no hay completados: "Nada completado aún.".

## Resultado esperado

Los 17 puntos en verde. Los fallos se anotan para /speckit-converge.
