# Especificación de la función: Cuenta y sincronización

**Rama de la función**: `006-cuenta-sincronizacion`

**Creada**: 2026-10-10

**Estado**: Borrador

**Entrada**: Descripción del usuario: "Entrar con mi cuenta Google para tener la semana en todos mis dispositivos, ver siempre el estado del guardado, y traerme los datos de mis otras apps (deberes, exámenes, notas) sin duplicados." Especificación retrospectiva con la decisión de Rafa del 2026-10-04 (avisar cuántos vencidos se descartan al importar).

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia de usuario 1 - Entrar con mi cuenta (Prioridad: P1)

Como usuario quiero entrar con mi cuenta de Google para que mi semana me siga a cualquier dispositivo, y salir cuando quiera.

**Por qué esta prioridad**: sin cuenta no hay sincronización; es la puerta.

**Prueba independiente**: entro, veo mi nombre y correo en el panel; salgo y vuelve el estado de "solo este navegador".

**Escenarios de aceptación**:

1. **Dado** el panel de cuenta, **cuando** pulso entrar con Google y elijo mi cuenta, **entonces** la app me reconoce: nombre, correo y foto (o inicial) en el botón.
2. **Dado** un navegador que bloquea la ventana de login, **cuando** entro, **entonces** la app lo resuelve llevándome a una pantalla de Google y volviendo.
3. **Dado** sesión abierta, **cuando** salgo, **entonces** el panel vuelve al estado de sin sesión y **mis datos siguen en el navegador** (no se borra nada).

---

### Historia de usuario 2 - Sin perder nada nunca (Prioridad: P1)

Como usuario quiero saber SIEMPRE dónde están mis datos: solo en este navegador o también en la nube.

**Por qué esta prioridad**: la Constitución VI lo exige: si los datos viven en un navegador, la app lo dice claramente.

**Prueba independiente**: sin sesión, el aviso de "solo este navegador" se ve al abrir y en el panel; con sesión, el estado de sincronización cambia al hacer cambios.

**Escenarios de aceptación**:

1. **Dado** sin sesión, **cuando** abro la app, **entonces** se ve "Sin sesión: solo se guarda en este navegador" y el panel lo explica.
2. **Dado** sesión abierta, **cuando** hago cambios seguidos, **entonces** se suben agrupados (un guardado por tanda de cambios, no uno por tecla) y el estado lo cuenta: conectando, subiendo, guardado en la nube, sincronizada.
3. **Dado** un fallo de red al subir, **cuando** pasa, **entonces** aviso claro ("Aviso: no se pudo subir…") y nada se pierde: sigue en el navegador.

---

### Historia de usuario 3 - Mis dispositivos en calma (Prioridad: P2)

Como usuario quiero abrir la app en otro dispositivo y encontrarme mi semana, sin líos de versiones.

**Por qué esta prioridad**: es la promesa de la cuenta; funciona sin pensar.

**Prueba independiente**: cambio algo en un dispositivo y en el otro llega; cambio en los dos y gana el último cambio.

**Escenarios de aceptación**:

1. **Dado** la nube más nueva que lo local, **cuando** abro la app, **entonces** se baja y sustituye lo local ("Descargada de la nube").
2. **Dado** datos en el navegador y nube vacía (primera vez con sesión), **cuando** entro, **entonces** se suben solos ("mudanza").
3. **Dado** cambios en dos sitios, **cuando** se sincronizan, **entonces** gana el cambio con marca de tiempo más reciente.
4. **Dado** la nube que no responde, **cuando** pasan unos 12 segundos, **entonces** aviso claro que pide mirar la consola y no bloquea la app.

---

### Historia de usuario 4 - Traer mis otras apps (Prioridad: P2)

Como usuario quiero traerme lo que ya tenía en mis webs de deberes, exámenes y notas, sin duplicados y sin vencidos viejos.

**Por qué esta prioridad**: mudarse a una app nueva con los datos a cuestas es lo que la hace usable de verdad.

**Prueba independiente**: con datos en las otras apps, importo y reviso el resumen.

**Escenarios de aceptación**:

1. **Dado** el botón de traer datos, **cuando** lo pulso, **entonces** pide confirmación explicando qué se trae y que lo existente no se toca.
2. **Dado** datos repetidos (mismo identificador), **cuando** importo, **entonces** no se duplican.
3. **Dado** una asignatura con el mismo nombre en ambas partes, **cuando** importo, **entonces** se quedan en una y sus notas pasan a ella.
4. **Dado** deberes ya vencidos en las otras apps, **cuando** importo, **entonces** no se traen **y el resumen dice cuántos se han quedado fuera** *(decisión de Rafa, 2026-10-04)*.
5. **Dado** la importación terminada, **cuando** acaba, **entonces** resumen claro de lo traído (deberes, exámenes, entregas, asignaturas, notas).

---

### Casos límite

- ¿Se cierra la sesión a mitad de guardado? Los datos locales quedan; al volver la sesión, se reanuda la subida.
- ¿Nube vacía y navegador vacío? Estado "Sincronizada (nube vacía)".
- ¿Fallo al importar? Aviso "fallo al importar" sin tocar los datos existentes.
- ¿Pestaña en segundo plano? La escucha sigue viva: los cambios remotos llegan solos.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **FR-001**: La app DEBE permitir entrar con cuenta de Google —ventana emergente y, si el navegador la bloquea, redirección— y salir; y mostrar quién está dentro (nombre, correo, foto o inicial).
- **FR-002**: Sin sesión, los datos DEBEN vivir solo en el navegador y la app DEBE decirlo en la línea de estado y en el panel de cuenta.
- **FR-003**: Con sesión, cada cambio DEBE guardarse al momento en el navegador y subirse agrupado a la nube (tanda de cambios, un solo envío); el estado de sincronización DEBE verse siempre.
- **FR-004**: Ante diferencias, DEBE ganar el cambio con marca de tiempo más reciente; si la nube trae algo más nuevo, se baja y sustituye lo local.
- **FR-005**: Con sesión y nube vacía pero datos locales, la app DEBE subirlos sola (mudanza) al conectar.
- **FR-006**: Si la nube no responde en ~12 segundos, la app DEBE avisar claro (sin bloquear) y dejar detalle en consola.
- **FR-007**: Importar DEBE: pedir confirmación; no duplicar por identificador; unir asignaturas por nombre y mapear sus notas; **no traer deberes vencidos y avisar cuántos quedan fuera**; y acabar con resumen de lo traído.
- **FR-008**: Salir de la sesión NO DEBE borrar ningún dato del navegador.
- **FR-009**: Los fallos DEBEN mostrarse como avisos ("Aviso: …") sin perder datos y sin bloquear la app.

### Entidades clave

- **Cuenta**: quién eres (nombre, correo, foto) y tu identificador interno para la nube.
- **Semana en la nube**: una copia completa de la semana por cuenta, con su marca de tiempo (`modificado`) para dirimir conflictos.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **SC-001**: Entrar y salir lleva menos de 15 segundos cada uno (con la cuenta a un clic).
- **SC-002**: Un cambio hecho en un dispositivo se ve en otro en menos de 10 segundos con la app abierta.
- **SC-003**: El estado de guardado/sincronización es visible el 100 % del tiempo.
- **SC-004**: Ningún flujo de esta función borra datos del navegador (salir, fallos, importar).
- **SC-005**: La importación nunca deja duplicados (comprobable contando antes y después).

## Supuestos

- Especificación retrospectiva con una novedad aprobada: el aviso de vencidos descartados al importar (FR-007).
- La sincronización es de una sola cuenta personal; no hay compartir ni multiusuario.
- El login con Google no se puede automatizar en las verificaciones: se comprueba en código y con la cuenta real de Rafa; el resto (avisos, panel, estados) se verifica en vivo sin sesión.
- Todo en español, móvil primero (Constitución IV).
