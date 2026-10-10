# Guía de validación: Cuenta y sincronización

**Fase 1** · 2026-10-10 · Con la app en la mano; los puntos con ⭐ requieren la cuenta real de Rafa

## Preparación

App publicada o local. Para lo de la cuenta: la versión publicada con la cuenta Google de Rafa (dos dispositivos a ser posible: móvil y portátil).

## Escenarios: "hecho cuando…"

### A. Sin sesión (FR-002, SC-003) — verificable sin cuenta

1. **Hecho cuando** abro la app sin sesión: la línea de estado dice "Sin sesión: solo se guarda en este navegador".
2. **Hecho cuando** abro el panel de cuenta: la nota lo explica ("…solo en este navegador"), el botón de entrar visible y el de salir oculto.
3. **Hecho cuando** hago cambios sin sesión: se guardan en el navegador igual (recargar y comprobar).

### B. Entrar y salir ⭐ (FR-001, FR-008, SC-001)

4. **Hecho cuando** pulso entrar y elijo mi cuenta: el botón del panel muestra foto (o inicial), nombre y correo.
5. **Hecho cuando** el navegador bloquea la ventana (móvil): salta la pantalla de Google y vuelve dentro.
6. **Hecho cuando** salgo: el panel vuelve a sin sesión y **todos mis datos siguen** (recargar y comprobar).

### C. Sincronización ⭐ (FR-003…FR-006, SC-002)

7. **Hecho cuando** entro con datos locales y nube vacía: "Subiendo tus datos…" y luego la nube los tiene (mudanza).
8. **Hecho cuando** hago cambios seguidos: suben en una tanda (unos segundos después del último), no uno por tecla; el estado pasa por "Guardado en la nube"/"Sincronizada".
9. **Hecho cuando** abro la app en otro dispositivo: llega la semana ("Descargada de la nube").
10. **Hecho cuando** la nube no responde (modo avión al abrir con sesión): a los ~12 s, aviso claro que pide mirar la consola; la app sigue usable.

### D. Importar ⭐ (FR-007, SC-005)

11. **Hecho cuando** pulso traer datos: confirmación que explica qué se trae y que lo existente no se toca.
12. **Hecho cuando** importo con datos repetidos: nada se duplica (contar antes y después).
13. **Hecho cuando** hay una asignatura con el mismo nombre: se queda una y sus notas pasan a ella.
14. **Hecho cuando** hay deberes vencidos en las otras apps: no se traen **y el resumen dice cuántos se quedaron fuera** (novedad).
15. **Hecho cuando** acaba: resumen con las cuentas de todo lo traído.

## Resultado esperado

Los 15 puntos en verde (1-3 automatizados ya en la verificación; el resto con la cuenta real). Fallos → /speckit-converge.
