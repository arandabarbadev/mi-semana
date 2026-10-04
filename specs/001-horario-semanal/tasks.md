---
description: "Lista de tareas de la función Horario semanal"
---

# Tareas: Horario semanal

**Entrada**: documentos de diseño de `/specs/001-horario-semanal/`

**Requisitos previos**: plan.md ✔, spec.md ✔, research.md ✔, data-model.md ✔, quickstart.md ✔ (sin `contracts/`, justificado en plan.md)

**Tests**: sin framework de tests a propósito (Constitución III; decisión D3 de research.md). La validación es manual con quickstart.md (Constitución VII).

**Organización**: por historia de usuario. Plan retrospectivo: 9 de 10 requisitos ya están construidos — esas tareas son de **verificación** (se marcan al confirmar el comportamiento en el código y en la app); solo FR-008 es código nuevo.

## Formato: `[ID] [P?] [Story] Descripción`

- **[P]**: ejecutable en paralelo (archivos distintos, sin dependencias)
- **[Story]**: historia de usuario (US1–US4)
- Siempre con ruta de archivo exacta

## Convención de rutas

App monolito en la raíz del repo: `index.html`, `app.js`, `styles.css` (sin `src/`).

---

## Fase 1: Arranque

**Propósito**: la app funcionando en local antes de tocar nada

- [x] T001 Arrancar la app en local siguiendo la "Preparación" de specs/001-horario-semanal/quickstart.md (`py -m http.server 8000` o Live Server) y comprobar que abre sin errores en consola (F12)

---

## Fase 2: Base existente (verificación)

**Propósito**: confirmar el modelo de datos y la persistencia sobre los que se apoya todo

- [x] T002 Verificar en app.js el modelo del horario (FR-010): `estadoVacio()` crea los 7 días con `clases: []` y `tarde: []`; la entrada solo tiene día + grupo + hora + texto, sin fechas; clave de guardado `mi-semana-v1` (specs/001-horario-semanal/data-model.md)
- [x] T003 Verificar en app.js la persistencia al momento (FR-005): `guardar()` se llama tras cada añadir/editar/borrar y escribe en `localStorage` sin acción extra del usuario

**Punto de control**: base confirmada; las historias pueden verificarse en cualquier orden

---

## Fase 3: Historia de usuario 1 - Consultar mi día (Prioridad: P1) ⭐ MVP

**Objetivo**: ver cualquier día laborable ordenado y con guía, y el finde de descanso

**Prueba independiente**: escenarios 1–2 y 8–9 de quickstart.md

### Implementación

- [x] T004 [US1] Verificar en app.js `dibujarListaHorario()` (líneas ~382–391): pinta clases y tarde del día activo, ordenadas por hora y en grupos separados (FR-002)
- [x] T005 [US1] Verificar en app.js `dibujarDias()` (líneas ~370–380): sábado y domingo muestran el mensaje de descanso y ocultan la edición de horario (FR-006)
- [x] T006 [US1] **NUEVO** Añadir en index.html, dentro de las tarjetas "Clases" y "Por la tarde" de la sección Horario (~líneas 84–102), un aviso de lista vacía por tarjeta (`<p class="vacio" …>`) inicialmente oculto (FR-008)
- [x] T007 [US1] **NUEVO** En app.js `dibujarListaHorario()`: cuando el día activo no tiene filas, mostrar el aviso de index.html con texto que diga qué hacer (p. ej. "Nada apuntado. Añade la primera aquí abajo."); cuando hay filas, ocultarlo. Reutilizar la clase `.vacio` de styles.css:167, sin CSS nuevo (FR-008, decisión D2 de research.md)
- [x] T008 [US1] Comprobar a mano los puntos 8 y 9 de quickstart.md: día laborable vacío muestra la indicación, y al borrar la última entrada vuelve a mostrarse

**Punto de control**: US1 completa — consultar, finde y días vacíos

---

## Fase 4: Historia de usuario 2 - Apuntar mi día (Prioridad: P1)

**Objetivo**: añadir entradas de clase y de tarde con hora y descripción

**Prueba independiente**: escenarios 3–5 de quickstart.md (A1–A3)

### Implementación

- [x] T009 [US2] Verificar en app.js los formularios `#form-clases` y `#form-tarde` → `añadirAHorario()` (líneas ~400–416): piden hora y descripción obligatorias, la descripción admite máx. 40 caracteres (data-model.md: "descripción de una línea, máx. 40 caracteres"), la entrada aparece al momento en su grupo (FR-001) y dos entradas a la misma hora se mantienen ambas

**Punto de control**: US2 completa — apuntar funciona sin recargar

---

## Fase 5: Historia de usuario 3 - Corregir y borrar (Prioridad: P2)

**Objetivo**: editar entradas y borrarlas sin miedo

**Prueba independiente**: escenarios 4–6 de quickstart.md (B4–B6)

### Implementación

- [x] T010 [US3] Verificar en app.js la delegación de edición en `#lista-clases`/`#lista-tarde` (líneas ~418–457): editar cambia hora/texto al momento y se reordena; cancelar restaura la entrada sin cambios (FR-003)
- [x] T011 [US3] Verificar en app.js el borrado (líneas ~429–432): `confirm()` nombra la entrada antes de borrar; cancelar no toca nada (FR-004, Constitución VI)

**Punto de control**: US3 completa — corregir y borrar seguros

---

## Fase 6: Historia de usuario 4 - Que Hoy lo refleje (Prioridad: P2)

**Objetivo**: el resumen del día siempre refleja el horario, y el día cambia solo

**Prueba independiente**: escenarios 10–13 de quickstart.md (E10–E11, F12–F13)

### Implementación

- [x] T012 [US4] Verificar en app.js `dibujarHoy()` (líneas ~285–311): el resumen pinta las clases y la tarde de `datos.horario[diaDeHoy()]`, y en finde muestra el mensaje de motivación en lugar de clases (FR-007)
- [x] T013 [US4] Verificar en app.js el `setInterval` de 60 s (líneas ~963–975): al cambiar de día se actualizan solos la fecha, el resumen y el día activo del horario (FR-009)

**Punto de control**: US4 completa — el horario alimenta Hoy sin intervención

---

## Fase 7: Acabado y transversales

**Propósito**: validación completa y regresión tras el único cambio de código

*Verificadas 2026-10-04 con la app real en Chrome headless (clics reales). Puntos 10 y 13 del quickstart quedan verificados en código: hoy es domingo y no se pueden comprobar en vivo hasta un día laborable.*

- [x] T014 Ejecutar la validación completa de specs/001-horario-semanal/quickstart.md (13 puntos "hecho cuando") con la app en la mano; cualquier fallo se anota y lo recogerá /speckit-converge
- [x] T015 Pase de regresión tras FR-008: abrir Hoy, Cosas que hacer, Exámenes y Notas y comprobar que siguen pintando con normalidad

---

## Dependencias y orden de ejecución

### Dependencias entre fases

- **Fase 1 (Arranque)**: sin dependencias; bloquea todo lo demás
- **Fase 2 (Base)**: depende de Fase 1; sus dos verificaciones bloquean US1–US4
- **Fases 3–6 (historias)**: en orden de prioridad US1 → US2 → US3 → US4. US1 primero porque contiene el único trabajo de código nuevo (T006–T007)
- **Fase 7 (Acabado)**: al final, con todo verificado

### Dependencias dentro de cada historia

- US1: T006 (index.html) → T007 (app.js) → T008 (comprobación manual)
- US2, US3, US4: tareas de verificación independientes entre sí

### Oportunidades paralelas

- Ninguna marcada [P]: casi todo verifica o modifica app.js, y el único trabajo nuevo (T006/T007) es secuencial (el JS de T007 usa los elementos de T006)

## Estrategia de implementación

1. Fase 1 + Fase 2 → base confirmada
2. **US1 (MVP)**: verificación + el arreglo de FR-008 → parada y validación con quickstart D8–D9
3. US2 → US3 → US4: verificaciones rápidas en orden
4. Fase 7: quickstart completo de punta a punta
5. Después: `/speckit-converge` compara código ↔ spec/plan/tareas y añade lo que falte; `/speckit-implement` ejecuta lo pendiente

## Notas

- Tareas "Verificar" = leer el código citado, probarlo en la app si hace falta, y marcar el checkbox. No generan cambios
- Commit tras cada hito (especificación → ya hecho; plan → ya hecho; tareas; implementación)
- Los números de línea son aproximados y corresponden a app.js actual (2026-10-04)
