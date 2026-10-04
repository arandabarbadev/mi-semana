# Investigación y decisiones: Horario semanal

**Fase 0 del plan** · 2026-10-04

Plan retrospectivo: no hay decisiones tecnológicas abiertas ni [NEEDS CLARIFICATION] del contexto técnico. Lo que habría que "investigar" en un plan normal aquí es inventariar lo ya construido y decidir cómo cerrar el único hueco. Decisiones:

## D1. Cero código nuevo fuera de los archivos existentes

- **Decisión**: la función se mantiene en `index.html` + `app.js` + `styles.css` tal y como están estructurados.
- **Por qué**: el patrón actual (render con plantillas de texto + delegación de eventos) funciona, se entiende y cumple la Constitución III.
- **Alternativas descartadas**: reescribir con framework o dividir en módulos por función — rechazadas: añaden dependencia o refactor sin beneficio para una app de este tamaño.

## D2. Cómo se cierra FR-008 (día vacío con indicación)

- **Decisión**: cuando la lista de clases o la de tarde de un día laborable esté vacía, pintar un mensaje que diga qué hacer (p. ej. "Nada apuntado. Añade la clase de abajo."), reutilizando la clase `.vacio` que ya existe en `styles.css`.
- **Por qué**: es el mismo patrón que ya usan Deberes y Notas para sus estados vacíos; guía concreta por grupo (clases / tarde) y cero CSS nuevo.
- **Alternativas descartadas**: un único mensaje para todo el día — pierde la guía específica de cada lista; ocultar las listas vacías — peor, no dice qué hacer (violaría el principio V igual que ahora).

## D3. Verificación manual, sin framework de tests

- **Decisión**: validar con los escenarios de [quickstart.md](quickstart.md), con la app en la mano.
- **Por qué**: Constitución VII pide criterios comprobables usándolo; Constitución III prohíbe dependencias por defecto, y un framework de tests sería una nueva.
- **Alternativas descartadas**: Vitest/Playwright — dependencia nueva desproporcionada.

## D4. Qué NO se toca (delimitación del alcance)

- **Decisión**: sin cambios en el modelo de datos, en la ordenación (estable por hora), en la confirmación de borrado, en el finde sin horario, ni en el `setInterval` de cambio de día: hoy cumplen FR-001…FR-007, FR-009 y FR-010 tal como exige la spec.
- **Por qué**: la comparación formal código↔spec la hará `/speckit-converge`; si encuentra algo más, lo añadirá como tarea. Este plan solo compromete el cambio de FR-008.
- **Alternativas descartadas**: reordenar o "limpiar" código que ya funciona — riesgo sin requisito que lo pida.
