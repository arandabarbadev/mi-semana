# Investigación y decisiones: Exámenes y entregas

**Fase 0** · 2026-10-10

## D1. Editar reutiliza el formulario emergente existente

- **Decisión**: el botón de editar abre el mismo formulario que el +, ya rellenado; guardar actualiza el elemento.
- **Por qué**: el código del submit ya distingue nuevo de existente (app.js ~886-894); solo faltan botón, cableado y título correcto. Cero arquitectura nueva.
- **Alternativas descartadas**: edición en línea como la del horario/deberes (dos filas de campos no caben bien en la fila de cuenta atrás); un formulario aparte (más código sin beneficio).

## D2. Editar también los pasados

- **Decisión**: el botón de editar va en todas las filas, pendientes y plegadas.
- **Por qué**: arreglar una fecha mal puesta de algo "pasado" es justo el caso real; al cambiarla a futuro vuelve a pendientes solo.
- **Alternativas descartadas**: editar solo pendientes (obliga a borrar y re apuntar el pasado).

## D3. Vacíos con el patrón `.vacio` de toda la app

- **Decisión**: mismo patrón que 001: párrafo oculto en el HTML que el pintado enseña u oculta.
- **Por qué**: consistencia y cero CSS nuevo (Constitución III y V).
- **Alternativas descartadas**: texto generado solo desde JS (rompe el patrón del resto de secciones).

## D4. Sin cambios en cuenta atrás, urgencia ni plegado

- **Decisión**: `filaCuenta`, umbrales (≤3 días urgente), "ayer/hace N días" y el aviso de hoy se quedan tal cual: cumplen FR-002…FR-005 y FR-007…FR-009.
- **Por qué**: verificados en código y en vivo en la fase de implementación; converge auditará.
- **Alternativas descartadas**: refactors del render — sin requisito que lo pida.

## D5. Sin tests automatizados

- Igual que 001/002 (Constitución III + VII): quickstart + evidencias en vivo (IX).
