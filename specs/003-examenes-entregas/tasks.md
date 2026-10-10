---
description: "Lista de tareas de la función Exámenes y entregas"
---

# Tareas: Exámenes y entregas

**Entrada**: documentos de `/specs/003-examenes-entregas/`

**Requisitos previos**: plan.md ✔, spec.md ✔, research.md ✔, data-model.md ✔, quickstart.md ✔

**Tests**: manuales (quickstart) + verificación en vivo con navegador (Constituciones VII y IX).

**Organización**: por historia; plan retrospectivo — FR-006 (editar) y FR-010 (vacíos) son código nuevo.

## Convención de rutas: app monolito en la raíz (index.html, app.js, styles.css)

---

## Fase 1: Arranque

- [x] T001 App sirviéndose en local o publicada según quickstart.md, sin errores en consola

## Fase 2: Verificación de lo existente

- [x] T002 Verificar en app.js `filaCuenta()` y `dibujarExamenes()`: orden por fecha, cuenta "HOY/1 día/N días", urgente ≤3 días, pasados plegados con "ayer/hace N días", contadores por subpestaña y pestaña (solo si >0) (FR-002, FR-003, FR-004, FR-008)
- [x] T003 Verificar en app.js el aviso "es hoy" para ambas subpestañas (FR-005)
- [x] T004 Verificar en app.js el borrado con `confirm()` que nombra la asignatura en las 4 listas (FR-007)
- [x] T005 Verificar que exámenes y entregas persisten en `mi-semana-v1` y viajan con la semana (FR-009)

## Fase 3: Historia 3 - Corregir (Prioridad: P2) ⭐ trabajo nuevo

- [x] T006 [US3] En app.js `filaCuenta()` (~610-626): añadir el botón de editar a cada fila (pendientes y pasados), junto al de borrar (FR-006, decisión D1/D2 de research.md)
- [x] T007 [US3] En app.js, delegación de las 4 listas (~660-674): la acción `editar` busca el elemento y abre `abrirModal('examen'|'entrega', elemento)`; y en `abrirModal`, títulos "Editar examen/entrega" cuando llega un existente (el submit ya actualiza existentes, ~886-894)
- [x] T008 [US3] Comprobar en vivo los puntos 7 y 8 de quickstart.md (editar pendiente y pasado)

## Fase 4: Historia 4 - Vacíos (Prioridad: P2) ⭐ trabajo nuevo

- [x] T009 [US4] Añadir en index.html (~145 y ~160) un aviso `<p class="vacio" hidden>` por lista: "Nada pendiente. Añade el examen con el +" / "Nada pendiente. Añade la entrega con el +"
- [x] T010 [US4] En app.js `dibujarExamenes()`: mostrar el aviso cuando no hay pendientes, ocultarlo cuando hay (patrón de 001) (FR-010)
- [x] T011 [US4] Comprobar en vivo el punto 12 de quickstart.md

## Fase 5: Acabado

- [x] T012 Ejecutar el quickstart completo (14 puntos) con la app en la mano; anotar fallos para converge
- [x] T013 Pase de regresión: Horario, Deberes y Notas siguen pintando tras los cambios

---

## Dependencias y orden

- Fase 1 → Fase 2 → (T006 → T007 → T008) y (T009 → T010 → T011) → Fase 5
- T006-T007 y T009 tocan archivos distintos pero T007 y T010 ambos app.js: secuencial

## Estrategia

Verificar lo existente, implementar editar + vacíos, validar en vivo con evidencias (IX), luego /speckit-converge.

## Notas

- "Verificar" = leer el código citado, probarlo si hace falta y marcar. No genera cambios
- Números de línea aproximados sobre app.js actual
