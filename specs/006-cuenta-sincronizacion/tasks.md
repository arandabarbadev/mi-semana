---
description: "Lista de tareas de la función Cuenta y sincronización"
---

# Tareas: Cuenta y sincronización

**Entrada**: documentos de `/specs/006-cuenta-sincronizacion/`

**Requisitos previos**: plan.md ✔, spec.md ✔, research.md ✔, data-model.md ✔, quickstart.md ✔

**Tests**: manuales (quickstart; ⭐ = con la cuenta real de Rafa) + verificación en vivo sin sesión (VII, IX).

## Convención de rutas: app monolito en la raíz (index.html, app.js, firebase.js, styles.css)

---

## Fase 1: Arranque

- [x] T001 App sirviéndose en local o publicada según quickstart.md, sin errores en consola

## Fase 2: Verificación de lo existente (en código; sync en producción)

- [x] T002 Verificar en firebase.js `entrar()`: popup con caída a redirección si el navegador la bloquea (FR-001)
- [x] T003 Verificar en app.js `enCambiarSesion` + `dibujarCuenta()`: perfil, botones según sesión, nota de "solo navegador" (FR-001, FR-002)
- [x] T004 Verificar en app.js `programarNube`/`subirNube`: tanda de 3 s, un envío por ráfaga, estados y avisos de fallo (FR-003, FR-009)
- [x] T005 Verificar en app.js `escucharSemana` + comparación de `modificado`: última-escritura-gana, bajada, mudanza con nube vacía, aviso de 12 s (FR-004, FR-005, FR-006)
- [x] T006 Verificar en app.js `#btn-logout`: salir no toca `datos` ni localStorage (FR-008)
- [x] T007 Verificar en app.js `#btn-importar`: confirmación previa, dedupe por id, fusión de asignaturas por nombre con mapeo de notas (FR-007)

## Fase 3: Novedad — avisar vencidos descartados (Prioridad: P2) ⭐ trabajo nuevo

- [x] T008 [US4] En app.js `#btn-importar`: contar los deberes traidos con fecha pasada antes del filtrado, y añadir al resumen final "No se han traído N deber(es) vencido(s)…" cuando N > 0 (FR-007, decisión D2 de research.md)
- [x] T009 [US4] Verificar en código el cálculo y el texto (singular/plural); la prueba con datos reales queda para Rafa con su cuenta (quickstart punto 14 ⭐)

## Fase 4: Validación en vivo (sin sesión) y regresión

- [x] T010 Comprobar en vivo los puntos 1-3 de quickstart.md (estado "Sin sesión…", nota del panel, persistencia local) con captura
- [x] T011 Pase de regresión: las cinco secciones siguen pintando

---

## Dependencias y orden

- Fase 1 → Fase 2 → (T008 → T009) → Fase 4

## Estrategia

Verificar en código, implementar el aviso de vencidos, validar en vivo lo que no exige cuenta, dejar ⭐ para Rafa, luego /speckit-converge.

## Notas

- "Verificar" = leer el código citado, probarlo si hace falta y marcar. No genera cambios
