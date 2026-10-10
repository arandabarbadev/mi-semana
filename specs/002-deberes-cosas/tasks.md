---
description: "Lista de tareas de la función Deberes y cosas que hacer"
---

# Tareas: Deberes y cosas que hacer

**Entrada**: documentos de `/specs/002-deberes-cosas/`

**Requisitos previos**: plan.md ✔, spec.md ✔, research.md ✔, data-model.md ✔, quickstart.md ✔

**Tests**: manuales (quickstart) + verificación en vivo con navegador (Constituciones VII y IX).

**Organización**: por historia de usuario; plan retrospectivo — solo FR-008 es código nuevo.

## Formato: `[ID] [P?] [Story] Descripción`

## Convención de rutas: app monolito en la raíz (index.html, app.js, styles.css)

---

## Fase 1: Arranque

- [x] T001 Tener la app sirviéndose en local o publicada según quickstart.md, sin errores en consola

## Fase 2: Verificación de lo existente

- [x] T002 Verificar en app.js el modelo (data-model.md): `datos.deberes` con `id/asignatura/fecha/texto/hecha`, dentro de `mi-semana-v1`
- [x] T003 Verificar en app.js `dibujarDeberes()`: pendientes con fecha primero (ascendente), sin fecha al final bajo "Cosas que hacer"; completados en su pestaña; contadores (pestaña solo si >0) (FR-002, FR-005)
- [x] T004 Verificar en app.js `etiquetaCuando()`: hoy/mañana/en N días/por hacer con clases de urgencia (FR-003)
- [x] T005 Verificar en app.js el flujo tachar/deshacer por delegación `change` en las dos listas (FR-004)
- [x] T006 Verificar en app.js la edición en línea de deberes con cancelar, y el borrado con `confirm()` que nombra; y "Quitar todas las completadas" con confirmación (FR-006, FR-007)
- [x] T007 Verificar en app.js las sugerencias de asignatura (deberes + notas) en el `datalist` y los vacíos con mensaje (FR-010, FR-011)

## Fase 3: Historia 4 - Lo vencido no se acumula (Prioridad: P2) ⭐ trabajo nuevo

**Objetivo**: FR-008 — preguntar antes de quitar pendientes vencidos; completados quietos

### Implementación

- [x] T008 [US4] Reescribir `quitarPasadas()` en app.js (~líneas 601-606): contar pendientes con `fecha` pasada y sin hacer; si hay, `confirm()` con el número en singular/plural correcto ("Tienes 1 deber vencido… ¿Lo quito?" / "Tienes 3 deberes vencidos… ¿Los quito?"); al aceptar, quitar solo esos (los completados y los sin fecha se quedan); al cancelar, no tocar nada (FR-008, FR-009, decisión D1/D2 de research.md)
- [x] T009 [US4] Comprobar en vivo los puntos 11-14 de quickstart.md con un deber vencido sembrado y respondiendo a la pregunta en ambos sentidos

## Fase 4: Acabado

- [x] T010 Ejecutar el quickstart completo (17 puntos) con la app en la mano; anotar fallos para converge
- [x] T011 Pase de regresión: Horario, Exámenes y Notas siguen pintando tras el cambio

---

## Dependencias y orden

- Fase 1 → Fase 2 (verificaciones independientes) → Fase 3 (T008 → T009) → Fase 4
- Sin paralelismo marcado: el único código nuevo vive en app.js

## Estrategia

Verificar lo existente, implementar FR-008, validar con quickstart y evidencias (IX), luego /speckit-converge.

## Notas

- "Verificar" = leer el código citado, probarlo si hace falta y marcar. No genera cambios
- Números de línea aproximados sobre app.js actual
