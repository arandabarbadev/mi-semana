---
description: "Lista de tareas de la función Notas y medias"
---

# Tareas: Notas y medias

**Entrada**: documentos de `/specs/004-notas-medias/`

**Requisitos previos**: plan.md ✔, spec.md ✔, research.md ✔, data-model.md ✔, quickstart.md ✔

**Tests**: manuales (quickstart) + verificación en vivo con navegador (Constituciones VII y IX).

**Organización**: por historia; plan retrospectivo — solo FR-006 (editar nota) es código nuevo.

## Convención de rutas: app monolito en la raíz (index.html, app.js, styles.css)

---

## Fase 1: Arranque

- [x] T001 App sirviéndose en local o publicada según quickstart.md, sin errores en consola

## Fase 2: Verificación de lo existente

- [x] T002 Verificar en app.js `mediaExacta`/`mediaRedondeada`: media aritmética con máx. 2 decimales en formato es; redondeada entera con tope 10 (FR-003)
- [x] T003 Verificar en app.js `estadoObjetivo()`: los cinco mensajes de FR-004 y sus condiciones exactas (FR-004)
- [x] T004 Verificar en app.js `dibujarNotas()`: orden alfabético de asignaturas, chips de objetivo, pestaña Medias con notas en orden de alta y "media X → Y" (FR-005)
- [x] T005 Verificar el modal de asignatura/nota: validación 0-10 con mensaje, coma admitida, edición de asignatura existente (FR-001, FR-002, FR-007, FR-010)
- [x] T006 Verificar borrados: nota con confirmación nombrándola; asignatura con confirmación que avisa de sus notas; y las sugerencias cruzadas con deberes (FR-008, FR-009)
- [x] T007 Verificar vacíos: "Añade tu primera asignatura…" y "Sin notas todavía" (FR-011)

## Fase 3: Historia 4 - Corregir notas (Prioridad: P2) ⭐ trabajo nuevo

- [x] T008 [US4] En app.js `dibujarNotas()` (fila de nota en Medias): añadir botón de editar con acción `editar-nota`, junto al de borrar (FR-006, decisión D1 de research.md)
- [x] T009 [US4] En app.js, delegación de `#medias-contenido`: `editar-nota` abre `abrirModal('nota', nota)`; y en el submit del modal para notas existentes, la asignatura del formulario manda sobre la original (permite moverla) (FR-006, decisión D2)
- [x] T010 [US4] Comprobar en vivo los puntos 13 y 14 de quickstart.md (editar valor y mover de asignatura)

## Fase 4: Acabado

- [x] T011 Ejecutar el quickstart completo (18 puntos), en vivo donde se pueda; anotar fallos para converge
- [x] T012 Pase de regresión: Horario, Deberes y Exámenes siguen pintando tras el cambio

---

## Dependencias y orden

- Fase 1 → Fase 2 → (T008 → T009 → T010) → Fase 4
- Todo el código nuevo vive en app.js: secuencial

## Estrategia

Verificar lo existente, implementar editar nota, validar en vivo los 5 casos de objetivo con evidencias (IX), luego /speckit-converge.

## Notas

- "Verificar" = leer el código citado, probarlo si hace falta y marcar. No genera cambios
