---
description: "Lista de tareas de la función Resumen del día (Hoy)"
---

# Tareas: Resumen del día (Hoy)

**Entrada**: documentos de `/specs/005-resumen-hoy/`

**Requisitos previos**: plan.md ✔, spec.md ✔, research.md ✔, data-model.md ✔, quickstart.md ✔

**Tests**: manuales (quickstart) + verificación en vivo (VII, IX). Sin código nuevo.

## Convención de rutas: app monolito en la raíz (index.html, app.js, styles.css)

---

## Fase 1: Arranque

- [x] T001 App sirviéndose en local o publicada según quickstart.md, sin errores en consola

## Fase 2: Verificación (todo existente)

- [x] T002 Verificar en app.js `saludo()` y `dibujarFecha()`: franjas de hora, "Es finde", fecha larga capitalizada (FR-001, FR-002)
- [x] T003 Verificar en app.js `dibujarHoy()`: clases/tarde del día del horario, motivación en finde, guía a Horario en vacío (FR-003)
- [x] T004 Verificar en app.js `dibujarProxima()`: el más cercano no vencido, días o ¡HOY!, "Nada pendiente" (FR-004)
- [x] T005 Verificar en app.js `dibujarHoy()`: deberes ≤2 días + sin fecha con etiquetas, vacío con ánimo (FR-005)
- [x] T006 Verificar en app.js `dibujarHoy()`: media global y chips por asignatura (verde ≥5), guía a Notas (FR-006)
- [x] T007 Verificar el `setInterval` de 60 s y las llamadas a `dibujarHoy()` tras cada cambio en otras secciones (FR-007, FR-009)

## Fase 3: Validación en vivo

- [x] T008 Comprobar en vivo (finde): saludo "Es finde", motivación, próximos con días y ¡HOY!, deberes cercanos y mini-notas — puntos 2, 5-12 de quickstart.md, con captura
- [x] T009 Pase de regresión: las cuatro secciones siguen pintando

---

## Dependencias y orden

- Fase 1 → Fase 2 → Fase 3. Sin paralelismo (verificación en un solo navegador).

## Estrategia

Verificar en código, validar en vivo lo que el sábado permita, dejar anotado lo laborable para Rafa, luego /speckit-converge.

## Notas

- "Verificar" = leer el código citado, probarlo si hace falta y marcar. No genera cambios
