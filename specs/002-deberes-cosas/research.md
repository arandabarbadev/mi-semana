# Investigación y decisiones: Deberes y cosas que hacer

**Fase 0** · 2026-10-04

## D1. Vencidas: confirmación al abrir, no aviso con deshacer

- **Decisión**: `quitarPasadas()` pregunta con `confirm()` contando los pendientes vencidos; al cancelar no toca nada.
- **Por qué**: decisión de Rafa (2026-10-04); reutiliza el patrón de confirmación ya presente en toda la app y cuesta tres líneas.
- **Alternativas descartadas**: aviso con deshacer (más estado y UI nueva); borrar en silencio (viola Constitución VI).

## D2. Completados vencidos se quedan

- **Decisión**: el filtrado post-confirmación solo quita pendientes vencidos; los completados con fecha pasada permanecen hasta el botón "Quitar todas las completadas" (que ya pide confirmación).
- **Por qué**: VI puro — nada desaparece sin pregunta; el historial de lo hecho no molesta en su pestaña.
- **Alternativas descartadas**: mantener el borrado de completados vencidos (pérdida silenciosa).

## D3. Pregunta también al cambiar de día a medianoche

- **Decisión**: `quitarPasadas()` se sigue llamando igual (arranque + medianoche); donde toque preguntar, pregunta.
- **Por qué**: un solo camino de código; el comportamiento es el mismo por día que por apertura.
- **Alternativas descartadas**: solo preguntar al abrir (dos caminos, más lío).

## D4. Lo demás se verifica, no se toca

- **Decisión**: orden (fecha primero, "Cosas que hacer" al final), etiquetas de urgencia, tachar/deshacer, editar con desistir, borrados con confirmación, sugerencias de asignatura y vacíos ya cumplen la spec.
- **Por qué**: verificados en el código y en el navegador en la fase de implementación; la convergencia auditará.
- **Alternativas descartadas**: refactorizar el render de deberes — sin requisito que lo pida.

## D5. Sin tests automatizados

- Igual que 001 (Constitución III + VII): validación manual quickstart + evidencias en vivo (IX).
