# Investigación y decisiones: Resumen del día (Hoy)

**Fase 0** · 2026-10-10

## D1. Sin código nuevo

- **Decisión**: Hoy se documenta y se verifica; no se toca nada.
- **Por qué**: las cuatro tarjetas ya consumen las specs 001-004 con vacíos y refresco por minuto; no hay carencia conocida.
- **Alternativas descartadas**: añadir interacción de edición en Hoy — FR-008 la prohíbe a propósito (portada limpia).

## D2. Verificación de la rama laborable

- **Decisión**: la rama "día laborable con clases" se verifica en código (`dibujarHoy()` lee `datos.horario[diaDeHoy()]`) y Rafa la confirma entre semana; finde, próximos, deberes cercanos y mini-notas se verifican en vivo hoy (sábado).
- **Por qué**: no se puede simular otro día de la semana sin tocar el reloj del sistema, y no merece la pena arriesgar.
- **Alternativas descartadas**: parchear el reloj en el navegador de pruebas — frágil y no prueba la app real.

## D3. Los "próximos" no cuentan vencidos

- **Decisión**: próximo = fecha de hoy en adelante, el más cercano; igual que las secciones.
- **Por qué**: coherencia con 003; un vencido en la portada desorienta.
- **Alternativas descartadas**: mostrar vencidos — ya viven en "Pasados".

## D4. Sin tests automatizados

- Igual que 001-004 (III + VII): quickstart + evidencias (IX).
