# Investigación y decisiones: Cuenta y sincronización

**Fase 0** · 2026-10-10

## D1. Firebase se queda; excepción documentada, no nueva

- **Decisión**: mantener Auth + Firestore tal cual; se deja por escrito en el plan el porqué y la alternativa descartada (Constitución III exige justificar por escrito las excepciones).
- **Por qué**: la función entera es "mi semana en todos mis dispositivos"; sin servicio de nube no existe. Firebase con cuenta Google es la vía de menor mantenimiento para una app personal.
- **Alternativas descartadas**: sin nube (no sincroniza); backend propio (hosting y mantenimiento desproporcionados); WebDAV/sync de archivos (no hay infraestructura personal que lo sirva de forma fiable multiplataforma).

## D2. Vencidos al importar: contar y avisar, no preguntar uno a uno

- **Decisión**: los deberes vencidos de las otras apps no se importan (igual que ahora) pero el resumen final dice cuántos se quedaron fuera.
- **Por qué**: decisión de Rafa (2026-10-04); un confirm por cada vencido sería agobiante en una importación, y el aviso cumple la Constitución VI (nada desaparece sin enterarse).
- **Alternativas descartadas**: importarlos y que la pregunta de vencidos de la spec 002 los gestione (mete basura vieja en la semana); preguntar (ruido).

## D3. El login no se automatiza

- **Decisión**: la ventana de Google no se puede (ni se debe) automatizar en las verificaciones: ese flujo se verifica en código y con la cuenta real de Rafa.
- **Por qué**: login real de terceros en navegador sin cabeza = frágil y sin valor de prueba añadido.
- **Alternativas descartadas**: cuenta de prueba de Firebase solo para tests — infraestructura extra para un usuario.

## D4. Todo lo demás se verifica, no se toca

- **Decisión**: subida agrupada de 3 s, última-escritura-gana con `modificado`, mudanza, aviso de 12 s, dedupe por id, fusión de asignaturas por nombre: ya cumplen FR-003…FR-006 y el resto de FR-007.
- **Por qué**: leídos y verificados en código (app.js 82-259, firebase.js); sin sesiones de nube en las pruebas automáticas, el comportamiento de red se comprueba con la cuenta real.
- **Alternativas descartadas**: tocar la lógica de sync — funciona en producción desde hace semanas; riesgo sin requisito.

## D5. Sin tests automatizados

- Igual que 001-005 (III + VII): quickstart + evidencias (IX).
