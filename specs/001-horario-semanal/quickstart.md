# Guía de validación: Horario semanal

**Fase 1 del plan** · 2026-10-04 · Con la app en la mano (Constitución VII)

## Preparación

1. Publicar/servir la app por http (el service worker no funciona en `file://`):
   - rápido en local: `py -m http.server 8000` en la carpeta del repo → http://localhost:8000
   - o la extensión Live Server de VS Code
   - o la versión publicada: https://arandabarbadev.github.io/mi-semana/
2. **Para probar sin miedo**: usa una ventana de incógnito (sus datos son de usar y tirar). Si pruebas en tu navegador de verdad, no borres `mi-semana-v1` en DevTools: es TU semana real.

## Escenarios: "hecho cuando…"

### A. Apuntar y consultar (FR-001, FR-002, SC-001)

1. **Hecho cuando** apunto en un día laborable una clase (hora + descripción) y aparece al momento, en su sitio por hora, sin recargar.
2. **Hecho cuando** apunto en Lunes "08:00 Mates" y "14:30 Entrenamiento" (tarde) y ambos salen en sus grupos, ordenados por hora.
3. **Hecho cuando** apunto dos cosas a la misma hora y se ven las dos.

### B. Corregir y borrar (FR-003, FR-004, SC-002, SC-003)

4. **Hecho cuando** edito una entrada (cambio hora o texto), acepto, y se guarda y reordena al momento.
5. **Hecho cuando** empiezo a editar y desisto: la entrada queda exactamente como estaba.
6. **Hecho cuando** pido borrar y sale una confirmación **que nombra la entrada**; al cancelar no pasa nada; al confirmar desaparece y las demás siguen.

### C. Finde (FR-006)

7. **Hecho cuando** abro Horario en sábado o domingo: mensaje de descanso, y no hay forma de apuntar ni borrar horario.

### D. Día vacío (FR-008, SC-005) — la novedad de este plan

8. **Hecho cuando** un día laborable no tiene clases ni tarde: la pantalla dice qué hacer (p. ej. "Nada apuntado…"), nunca queda en blanco.
9. **Hecho cuando** borro la última entrada de un día: vuelve a salir la indicación.

### E. Hoy lo refleja (FR-007, SC-004)

10. **Hecho cuando** apunto algo para hoy en Horario y voy a Hoy: aparece en el resumen sin hacer nada más.
11. **Hecho cuando** es finde: Hoy muestra el mensaje de motivación, no clases.

### F. El día cambia solo (FR-005, FR-009)

12. **Hecho cuando** recargo la app: todo lo apuntado sigue ahí (nada que "guardar").
13. **Hecho cuando** deja la app abierta al pasar de día (o cambias la hora del sistema para probar): el resumen y el horario pasan solos al nuevo día.

## Resultado esperado

Los 13 puntos en verde con la app publicada. Cualquier punto que falle es una tarea de `/speckit-converge`.
