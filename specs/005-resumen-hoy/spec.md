# Especificación de la función: Resumen del día (Hoy)

**Rama de la función**: `005-resumen-hoy`

**Creada**: 2026-10-10

**Estado**: Borrador

**Entrada**: Descripción del usuario: "Hoy: tu día de un vistazo — saludo, clases y tarde de hoy, próximo examen y próxima entrega con cuenta, deberes que se echan encima y tus notas de un vistazo." Especificación retrospectiva.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia de usuario 1 - Ver mi día de un vistazo (Prioridad: P1)

Como usuario quiero abrir la app y ver sin tocar nada qué tengo hoy: el saludo, la fecha, mis clases y mi tarde.

**Por qué esta prioridad**: Hoy es la portada; si hay que buscar, no sirve de portada.

**Prueba independiente**: con horario apuntado para hoy, abro la app y veo sus clases y tarde; en finde veo el mensaje de motivación.

**Escenarios de aceptación**:

1. **Dado** un día laborable con clases y tarde apuntados, **cuando** abro Hoy, **entonces** saludo según la hora (mañana, tarde o noche), fecha completa en español, y mis clases y tarde de hoy ordenadas por hora.
2. **Dado** sábado o domingo, **cuando** abro Hoy, **entonces** el saludo es "Es finde" y en lugar de clases, el mensaje de motivación.
3. **Dado** un día laborable sin nada apuntado, **cuando** abro Hoy, **entonces** me dice que lo apunte en Horario.

---

### Historia de usuario 2 - Lo que se me echa encima (Prioridad: P1)

Como usuario quiero ver el próximo examen y la próxima entrega con sus días, y los deberes que vencen pronto, sin entrar en sus pestañas.

**Por qué esta prioridad**: es lo que decide lo que hago esta tarde.

**Prueba independiente**: con un examen a 2 días, una entrega mañana y un deber que vence pronto, todo se ve en Hoy al momento.

**Escenarios de aceptación**:

1. **Dado** exámenes pendientes, **cuando** abro Hoy, **entonces** el más cercano sale con su número de días ("2 días para Mates") o "¡HOY!" si cae hoy; sin pendientes, "Nada pendiente".
2. **Dado** entregas pendientes, **igual**, en su tarjeta propia.
3. **Dado** deberes pendientes, **cuando** abro Hoy, **entonces** salen los que vencen en 2 días o antes, ordenados por fecha, más las cosas sin fecha, cada uno con su etiqueta de cuándo; sin nada, mensaje de ánimo.

---

### Historia de usuario 3 - Mis notas de un vistazo (Prioridad: P2)

Como usuario quiero ver mi media global y un chip por asignatura con su media, para saber cómo voy sin entrar a Notas.

**Por qué esta prioridad**: informa, pero no urge.

**Prueba independiente**: con asignaturas y notas, Hoy muestra la media global y un chip por asignatura.

**Escenarios de aceptación**:

1. **Dado** asignaturas con notas, **cuando** abro Hoy, **entonces** media global y un chip por asignatura con su media redondeada, en verde si llega a 5.
2. **Dado** sin asignaturas, **cuando** abro Hoy, **entonces** "Sin asignaturas aún. Añádelas en Notas".

---

### Historia de usuario 4 - Siempre al día (Prioridad: P2)

Como usuario quiero que el resumen no se quede viejo: al día siguiente, Hoy es el día nuevo sin recargar.

**Por qué esta prioridad**: un resumen desactualizado miente.

**Prueba independiente**: dejo la app abierta al cambiar de día y compruebo que saluda al día nuevo.

**Escenarios de aceptación**:

1. **Dado** la app abierta al pasar de día, **cuando** pasa la medianoche, **entonces** saludo, fecha, cuenta y listas pasan solas al nuevo día (cada minuto).
2. **Dado** cualquier dato cambiado en otra pestaña de la app, **cuando** vuelvo a Hoy, **entonces** el resumen lo refleja al momento.

---

### Casos límite

- ¿Examen y entrega el mismo día? Cada tarjeta con lo suyo.
- ¿Deber con fecha a más de 2 días? No estorba Hoy: vive en su pestaña.
- ¿Muchas cosas sin fecha? Todas en Hoy (son "cosas por hacer").
- ¿Finde con deberes? El mensaje de motivación manda en clases; los deberes siguen en su tarjeta.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **FR-001**: Hoy DEBE saludar según la hora (mañana, tarde, noche) y con "Es finde" en sábado y domingo.
- **FR-002**: Hoy DEBE mostrar la fecha completa de hoy en español.
- **FR-003**: Hoy DEBE mostrar las clases y la tarde del día actual (del horario, ordenadas por hora); en finde, el mensaje de motivación; en día laborable vacío, indicación de apuntarlo en Horario.
- **FR-004**: Hoy DEBE mostrar el próximo examen y la próxima entrega: el más cercano no vencido, con días restantes o "¡HOY!", o "Nada pendiente" si no hay.
- **FR-005**: Hoy DEBE listar los deberes pendientes que vencen en 2 días o antes (ordenados por fecha) más las cosas sin fecha, con su etiqueta de cuándo; vacío con mensaje de ánimo.
- **FR-006**: Hoy DEBE mostrar la media global (de las asignaturas con notas) y un chip por asignatura con su media redondeada, verde a partir de 5; sin asignaturas, guía a Notas.
- **FR-007**: El resumen DEBE recalcularse solo: al abrir, al cambiar de día y cada minuto, sin recargar.
- **FR-008**: Hoy es de solo lectura: DEBE llevar a cada sección para editar, no editar desde aquí.
- **FR-009**: Los contadores de las pestañas (deberes pendientes, exámenes + entregas pendientes) DEBEN verse desde Hoy.

### Entidades clave

- Sin entidades propias: Hoy **consume** horario (spec 001), deberes (002), exámenes y entregas (003) y notas (004).

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **SC-001**: Todo el resumen se entiende en menos de 5 segundos, sin tocar nada.
- **SC-002**: Lo que muestra Hoy coincide siempre con lo apuntado en cada sección.
- **SC-003**: Ninguna parte de Hoy queda en blanco sin mensaje.
- **SC-004**: El resumen del día cambia de día solo, sin recargar.

## Supuestos

- Especificación retrospectiva: todo existe; se verifica (la rama de "día laborable con clases" se comprueba en código y con Rafa entre semana; la de finde y el resto, en vivo).
- "Próximo" significa: fecha de hoy en adelante, el más cercano; los vencidos no cuentan.
- Todo en español, móvil primero (Constitución IV).
