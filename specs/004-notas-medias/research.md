# Investigación y decisiones: Notas y medias

**Fase 0** · 2026-10-10

## D1. Editar nota reutiliza el formulario de nueva nota

- **Decisión**: botón de editar en cada fila de nota (pestaña Medias) que abre el mismo formulario rellenado; guardar actualiza.
- **Por qué**: el submit ya soporta existentes para notas; como en 003, solo faltan botón, cableado y título (título ya puesto en 003).
- **Alternativas descartadas**: edición en línea (la fila de nota es corta y el formulario tiene select de asignatura que no cabe).

## D2. Al editar, la asignatura del formulario manda

- **Decisión**: al guardar una edición, la nota pasa a la asignatura seleccionada en el formulario (hoy se ignoraría y mantendría la original).
- **Por qué**: FR-006 pide poder mover la nota de asignatura (metida en la equivocada); el select ya viene rellenado, así que el flujo normal no cambia.
- **Alternativas descartadas**: bloquear el select al editar (menos útil, más código).

## D3. Los cinco mensajes de objetivo se quedan tal cual

- **Decisión**: sin objetivo→invitar; objetivo sin notas→"¡A por él!"; exacta llega→"¡Objetivo conseguido!"; solo redondeada→"¡Casi!" con exacta; ni con 10→"cada décima cuenta"; resto→"Necesitas un X".
- **Por qué**: cumplen FR-004 con el tono de la app; se verifican en vivo caso a caso.
- **Alternativas descartadas**: rediseñar los textos — sin requisito.

## D4. Medias y redondeo sin cambios

- **Decisión**: media exacta = media aritmética (2 decimales máx., formato es); redondeada = entero con tope 10. Igual que ahora.
- **Por qué**: es lo que la spec describe; verificado con cálculo a mano en la validación.
- **Alternativas descartadas**: ponderaciones — la spec asume que todas cuentan igual.

## D5. Sin tests automatizados

- Igual que 001-003 (Constitución III + VII): quickstart + evidencias en vivo (IX).
