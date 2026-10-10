# Guía de validación: Exámenes y entregas

**Fase 1** · 2026-10-10 · Con la app en la mano

## Preparación

Como en 001/002: Live Server, `http://localhost:8123` o la app publicada; incógnito para pruebas. Sembrar datos con DevTools (Local Storage → `mi-semana-v1`) si se quieren fechas concretas.

## Escenarios: "hecho cuando…"

### A. Cuenta atrás y urgencia (FR-002, FR-003, SC-002)

1. **Hecho cuando** apunto un examen dentro de 7 días: sale "7" días, sin tono de urgencia, colocado por fecha.
2. **Hecho cuando** queda a 3 días o menos: se ve urgente (marca y color).
3. **Hecho cuando** es hoy: cuenta "HOY" y fila destacada.
4. **Hecho cuando** apunto uno a 1 día: cuenta "1 día", no "1 días".

### B. Apuntar (FR-001, SC-001)

5. **Hecho cuando** apunto con el + asignatura y fecha: aparece al momento en su subpestaña.
6. **Hecho cuando** falta asignatura o fecha: no guarda y avisa.

### C. Editar y borrar (FR-006, FR-007, SC-003) — editar es nuevo

7. **Hecho cuando** edito un examen cambiando la fecha a más lejos: se recoloca y pierde urgencia al momento; cancelar no toca nada.
8. **Hecho cuando** edito un pasado poniendo fecha futura: vuelve a pendientes.
9. **Hecho cuando** borro (pendiente o pasado): la confirmación nombra la asignatura; cancelar no pasa nada.

### D. Hoy y pasados (FR-004, FR-005, SC-004)

10. **Hecho cuando** algo cae hoy: aviso tranquilo en exámenes ("Respira hondo…") y en entregas el suyo.
11. **Hecho cuando** pasa la fecha: el elemento se pliega en "Pasados (N)" con "ayer"/"hace N días" y no se borra solo.

### E. Vacíos y contadores (FR-008, FR-010, SC-005) — vacíos son nuevos

12. **Hecho cuando** no hay exámenes pendientes: la lista dice qué hacer ("Nada pendiente. Añade el examen con el +"), nunca blanco; igual en entregas.
13. **Hecho cuando** hay pendientes: el total sale en la pestaña; sin pendientes, sin número.

### F. El día cambia solo

14. **Hecho cuando** cambia el día con la app abierta: cuentas, urgencia, plegado y avisos se recalculan solos.

## Resultado esperado

Los 14 puntos en verde. Los fallos se anotan para /speckit-converge.
