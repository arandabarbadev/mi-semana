# Guía de validación: Resumen del día (Hoy)

**Fase 1** · 2026-10-10 · Con la app en la mano

## Preparación

Como en las anteriores. Para la rama de día laborable, hacerla entre semana con el horario real.

## Escenarios: "hecho cuando…"

### A. Portada (FR-001, FR-002, FR-003, SC-001)

1. **Hecho cuando** abro la app en laborable: saludo según hora y fecha completa en español.
2. **Hecho cuando** es finde: saludo "Es finde" y el mensaje de motivación donde irían las clases.
3. **Hecho cuando** es laborable sin nada apuntado: me manda a Horario.
4. **Hecho cuando** tengo clases y tarde hoy (laborable): salen ordenadas por hora.

### B. Próximos (FR-004, SC-002)

5. **Hecho cuando** tengo un examen a 2 días: "2 días para <asignatura>"; con entrega a 1 día, su tarjeta con "1 día para".
6. **Hecho cuando** algo cae hoy: "¡HOY!" con su nombre.
7. **Hecho cuando** no hay pendientes: "Nada pendiente".

### C. Deberes que apremian (FR-005)

8. **Hecho cuando** un deber vence en 2 días o antes: sale en Hoy con su etiqueta; los de más días no.
9. **Hecho cuando** hay cosas sin fecha: salen todas tras los vencidos.
10. **Hecho cuando** no hay nada: mensaje de ánimo, nunca blanco.

### D. Mini-notas (FR-006)

11. **Hecho cuando** hay asignaturas con notas: media global arriba y un chip por asignatura, verde desde 5.
12. **Hecho cuando** no hay asignaturas: "Sin asignaturas aún. Añádelas en Notas".

### E. Siempre al día (FR-007, FR-009, SC-004)

13. **Hecho cuando** apunto algo en otra pestaña y vuelvo a Hoy: aparece al momento.
14. **Hecho cuando** pasa la medianoche con la app abierta: Hoy pasa solo al día nuevo.
15. **Hecho cuando** miro las pestañas: los contadores de deberes y exámenes+entregas están a la vista.

## Resultado esperado

Los 15 puntos en verde (los de día laborable, entre semana). Fallos → /speckit-converge.
