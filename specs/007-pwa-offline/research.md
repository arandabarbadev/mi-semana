# Investigación y decisiones: Instalación y uso sin conexión

**Fase 0** · 2026-10-10

## D1. Sin código nuevo

- **Decisión**: documentar y verificar; la carcasa ya cumple FR-001…FR-005 en producción (instalada en el móvil de Rafa desde hace semanas).
- **Por qué**: manifiesto completo (icono adaptable incluido), red primero (L2, nacida de una lección) y autorecarga única ya están.
- **Alternativas descartadas**: tocar el SW — funciona; riesgo sin requisito.

## D2. El offline se verifica de verdad

- **Decisión**: en el navegador de pruebas: registrar el fondo, cortar la red desde el propio navegador (emulación offline), recargar y comprobar que todo pinta.
- **Por qué**: Constitución IX — evidencia, no promesa; y es la única pieza automatizable sin móvil.
- **Alternativas descartadas**: dar por bueno "funciona en mi móvil" — vale como evidencia adicional de Rafa, no como verificación.

## D3. La instalación la confirma Rafa

- **Decisión**: FR-001 (pantalla de inicio, pantalla completa) se verifica con el móvil real; el manifiesto y los iconos, en vivo (se piden y responden).
- **Por qué**: la instalación como tal no se puede automatizar de forma fiable sin el dispositivo.
- **Alternativas descartadas**: emular — no prueba el flujo real del sistema.

## D4. Sin tests automatizados

- Igual que 001-006 (III + VII): quickstart + evidencias (IX).
