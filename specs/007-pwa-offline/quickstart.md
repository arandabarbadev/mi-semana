# Guía de validación: Instalación y uso sin conexión

**Fase 1** · 2026-10-10 · Con la app en la mano; ⭐ = con el móvil de Rafa

## Escenarios: "hecho cuando…"

### A. Instalación ⭐ (FR-001, SC-001)

1. **Hecho cuando** añado la web a la pantalla de inicio: icono con el 7 y nombre "Mi semana".
2. **Hecho cuando** la abro desde el icono: pantalla completa, sin barra de navegador, con el color de la app en la barra del sistema.

### B. Sin conexión (FR-002, FR-005, SC-002, SC-004) — verificable en el navegador

3. **Hecho cuando** visito la app una vez con conexión: el fondo queda instalado (DevTools → Application → Service workers).
4. **Hecho cuando** corto la red (avión, o DevTools → Network → Offline) y recargo: la app abre y las cinco secciones pintan con mis datos.
5. **Hecho cuando** vuelvo a tener red: todo vuelve a la normalidad sin pasos manuales.

### C. Última versión (FR-003, FR-004, SC-003)

6. **Hecho cuando** se publica una versión nueva y abro la app: me llega la nueva (red primero); si el fondo actualiza en segundo plano, la app se recarga sola una vez.
7. **Hecho cuando** miro el fondo en DevTools: solo queda la caché de la versión vigente (las viejas se borran al activar).

### D. Manifiesto

8. **Hecho cuando** pido el manifiesto y los iconos: responden (200) con sus tipos correctos.

## Resultado esperado

Los 8 puntos en verde (3, 4 y 8 automatizados ya en la verificación; 1-2 y 6-7, con el móvil/publicación real). Fallos → /speckit-converge.
