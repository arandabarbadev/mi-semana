# Especificación de la función: Instalación y uso sin conexión (PWA)

**Rama de la función**: `007-pwa-offline`

**Creada**: 2026-10-10

**Estado**: Borrador

**Entrada**: Descripción del usuario: "La app se instala en el móvil como una app más, abre sin conexión con mis datos, y siempre me llega la última versión publicada." Especificación retrospectiva.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia de usuario 1 - Instalarla como una app (Prioridad: P1)

Como usuario quiero "Mi semana" en la pantalla de inicio, abriéndola a pantalla completa como una app de verdad, sin barra de navegador.

**Por qué esta prioridad**: si vive en el navegador, no se abre; en la pantalla de inicio, sí.

**Prueba independiente**: añadir a pantalla de inicio y abrir: nombre, icono y pantalla completa.

**Escenarios de aceptación**:

1. **Dado** el móvil, **cuando** añado la web a la pantalla de inicio, **entonces** aparece con su icono y su nombre ("Mi semana").
2. **Dado** el icono en el inicio, **cuando** la abro, **entonces** lo hace a pantalla completa, como una app, con el color de la app en la barra del sistema.

---

### Historia de usuario 2 - Abre sin conexión (Prioridad: P1)

Como usuario quiero abrir la app en el bus sin cobertura y ver mi semana entera, porque mis datos viven en el navegador.

**Por qué esta prioridad**: los datos son locales (Constitución II/VI); que la falta de red impida verlos sería absurdo.

**Prueba independiente**: visitar la app una vez, activar avión, abrir de nuevo: todo pinta.

**Escenarios de aceptación**:

1. **Dado** la app visitada al menos una vez, **cuando** abro sin conexión, **entonces** abre y las cinco secciones pintan con los datos del navegador.
2. **Dado** sin conexión, **cuando** miro mis datos, **entonces** están todos: son locales; solo lo de la nube espera a haber red (spec 006).

---

### Historia de usuario 3 - Siempre la última versión (Prioridad: P2)

Como usuario quiero que los arreglos publicados me lleguen sin hacer nada, y que la caché vieja no me los esconda.

**Por qué esta prioridad**: es la lección L2 de la constitución — la caché vieja ya escondió arreglos una vez.

**Prueba independiente**: publicar un cambio y abrir la app: llega la versión nueva sin borrar nada manualmente.

**Escenarios de aceptación**:

1. **Dado** una versión nueva publicada, **cuando** abro la app, **entonces** el HTML se pide a la red primero y me llega la nueva.
2. **Dado** el fondo que actualiza la app en segundo plano, **cuando** termina de instalar la nueva versión, **entonces** la app se recarga sola una única vez (sin bucles).

---

### Casos límite

- ¿Primera visita sin conexión? No hay nada cacheado: el navegador muestra su error; no se promete lo imposible.
- ¿Conexión lenta? Red primero con caída a caché: tarda pero abre.
- ¿Dos pestañas abiertas? Cada una se recarga una vez como mucho al actualizar.
- ¿Fuentes o módulos externos caídos? Se guardaron al visitar: offline no depende de ellos.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **FR-001**: La app DEBE poder añadirse a la pantalla de inicio con nombre e iconos propios (incluido el adaptable que rellena cualquier forma), y abrir a pantalla completa con el color propio de la app.
- **FR-002**: Tras una visita con conexión, la app DEBE abrir sin conexión y mostrar las cinco secciones con los datos del navegador.
- **FR-003**: El HTML DEBE pedirse a la red primero y servirse la copia guardada solo cuando no haya red (lección L2).
- **FR-004**: Al instalarse una versión nueva del fondo de la app, esta DEBE recargarse sola una única vez, sin bucles.
- **FR-005**: Los datos del usuario NUNCA dependen de la caché de la app: viven en el navegador (y en la nube de la cuenta, spec 006).

### Entidades clave

- Sin entidades de datos propias: es la carcasa que envuelve a las specs 001-006.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **SC-001**: Instalada desde el icono, abre a pantalla completa el 100 % de las veces.
- **SC-002**: Sin conexión, la app abre y pinta todo en menos de 3 segundos.
- **SC-003**: Tras publicar una versión nueva, la siguiente apertura muestra la nueva sin pasos manuales.
- **SC-004**: Ninguna apertura offline pierde datos del navegador.

## Supuestos

- Especificación retrospectiva: manifiesto, iconos, caché y autorecarga ya existen; se verifica (offline en vivo con el navegador de pruebas; instalación, con el móvil de Rafa).
- El nombre de iconos y el color del tema son parte de la identidad y viven en el plan, no aquí.
- Todo en español (Constitución IV).
