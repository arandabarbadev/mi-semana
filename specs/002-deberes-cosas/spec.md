# Especificación de la función: Deberes y cosas que hacer

**Rama de la función**: `002-deberes-cosas`

**Creada**: 2026-10-04

**Estado**: Borrador

**Entrada**: Descripción del usuario: "Cosas que hacer: deberes con asignatura y fecha de entrega opcionales más cosas sin fecha, pendientes y completados, con etiquetas de urgencia y limpieza de vencidas." Especificación retrospectiva con las decisiones de Rafa del 2026-10-04.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia de usuario 1 - Apuntar lo que hay que hacer (Prioridad: P1)

Como usuario quiero apuntar rápido lo que me mandan —con asignatura y fecha de entrega si las tiene, o sin ninguna si es una cosa suelta— para no depender de la memoria.

**Por qué esta prioridad**: sin apuntar no hay nada que tachar; es el corazón de la pestaña.

**Prueba independiente**: apunto un deber con fecha, una cosa sin fecha y compruebo el orden y las etiquetas.

**Escenarios de aceptación**:

1. **Dado** el formulario de añadir, **cuando** escribo solo la descripción, **entonces** se apunta como cosa sin fecha y sin asignatura.
2. **Dado** un deber con fecha de entrega, **cuando** lo apunto, **entonces** sale entre los pendientes, ordenado por fecha.
3. **Dado** varias cosas sin fecha, **cuando** miro los pendientes, **entonces** salen debajo de los deberes con fecha, bajo el grupo "Cosas que hacer".
4. **Dado** que escribo una asignatura que ya usé antes, **cuando** vuelvo a apuntar, **entonces** la app me la sugiere.

---

### Historia de usuario 2 - Ir tachando (Prioridad: P1)

Como usuario quiero marcar un deber como hecho y verlo pasar a completados, y poder deshacerlo si me equivoqué, para ver lo que me queda de un vistazo.

**Por qué esta prioridad**: tachar es la recompensa; sin ello la lista no baja nunca.

**Prueba independiente**: marco uno (pasa a completados y baja el contador), lo deshago (vuelve a pendientes).

**Escenarios de aceptación**:

1. **Dado** un deber pendiente, **cuando** lo marco hecho, **entonces** desaparece de pendientes, aparece en completados y los contadores se mueven al momento.
2. **Dado** un deber completado, **cuando** lo desmarco, **entonces** vuelve a pendientes en su sitio.
3. **Dado** pendientes sin hacer, **cuando** miro la pestaña, **entonces** el número de pendientes se ve en la pestaña sin entrar; si no hay, no hay número.

---

### Historia de usuario 3 - Corregir y borrar (Prioridad: P2)

Como usuario quiero corregir cualquier dato de un deber (asignatura, fecha, texto) y borrar deberes, sin perder los demás por accidente.

**Por qué esta prioridad**: las cosas cambian (se retrasa la entrega, me equivoco al escribirlas).

**Prueba independiente**: edito un deber cambiando la fecha; borro otro con confirmación.

**Escenarios de aceptación**:

1. **Dado** un deber pendiente, **cuando** corrijo su asignatura, fecha o texto, **entonces** se guarda al momento y se reordena si toca; si me arrepiento, puedo desistir sin cambios.
2. **Dado** un deber, **cuando** pido borrarlo, **entonces** la confirmación lo nombra; al cancelar no pasa nada.
3. **Dado** deberes completados, **cuando** pido quitar todas las completadas, **entonces** se pide confirmación antes de vaciarlas.

---

### Historia de usuario 4 - Lo vencido no se acumula (Prioridad: P2)

Como usuario quiero que los deberes con fecha pasada que quedaron sin hacer no se me pierdan en silencio: la app me pregunta antes de quitarlos.

**Por qué esta prioridad**: es la decisión de Rafa del 2026-10-04 y la Constitución VI: nada se borra sin que me entere.

**Prueba independiente**: con un deber vencido guardado, abro la app y respondo a la pregunta en ambos sentidos.

**Escenarios de aceptación**:

1. **Dado** deberes pendientes con fecha pasada, **cuando** abro la app, **entonces** pregunta cuántos hay y si quiero quitarlos; si digo que sí, desaparecen; si digo que no, se quedan.
2. **Dado** deberes ya completados con fecha pasada, **cuando** abro la app, **entonces** no se borran solos: se quedan en completados hasta que yo los quite.
3. **Dado** cosas sin fecha (grupo "Cosas que hacer"), **cuando** pasa el tiempo, **entonces** nunca se quitan solas.

---

### Casos límite

- ¿Lista de pendientes vacía? Mensaje de ánimo ("El esfuerzo de hoy…"), nunca blanco.
- ¿Completados vacíos? Mensión "Nada completado aún.".
- ¿Deber con fecha de hoy? Etiqueta "hoy"; mañana → "mañana"; hasta 3 días → "en N días"; más → "en N días" en tono calmado; sin fecha → "por hacer".
- ¿Muchos deberes? Orden por fecha y grupos claros.
- ¿Medianoche con la app abierta? Lo que vence ese día se marca "hoy" sin recargar.
- ¿Fecha al añadir en el pasado? No se ofrece: la fecha nueva empieza hoy como mínimo.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **FR-001**: La app DEBE permitir apuntar un deber con descripción obligatoria de una línea, asignatura opcional y fecha de entrega opcional.
- **FR-002**: Los pendientes DEBEN ordenarse: primero los con fecha (de la más próxima a la más lejana) y debajo las cosas sin fecha bajo el grupo "Cosas que hacer".
- **FR-003**: Cada deber pendiente DEBE llevar una etiqueta de cuándo toca: "hoy", "mañana", "en N días", o "por hacer" si no tiene fecha, con distinción visual de urgencia.
- **FR-004**: La app DEBE permitir marcar un deber como hecho y deshacerlo, moviéndolo entre pendientes y completados al momento.
- **FR-005**: Los contadores DEBEN mostrarse siempre: pendientes y completados por separado, y el total de pendientes en la pestaña solo cuando sea mayor que cero.
- **FR-006**: La app DEBE permitir corregir asignatura, fecha y texto de un deber pendiente, y desistir de la corrección sin cambios.
- **FR-007**: Borrar un deber DEBE pedir confirmación nombrándolo; quitar todas las completadas DEBE pedir confirmación antes.
- **FR-008** *(decisión de Rafa, 2026-10-04)*: Los deberes pendientes con fecha pasada DEBEN preguntar antes de quitarse, diciendo cuántos hay; si se cancela, se quedan. Los completados con fecha pasada NO se quitan solos.
- **FR-009**: Las cosas sin fecha NUNCA se quitan solas.
- **FR-010**: La app DEBE conservar los deberes entre sesiones y sugerir asignaturas ya usadas (deberes y notas) al apuntar.
- **FR-011**: Las pantallas sin datos DEBEN decir qué hacer o animar, nunca quedar en blanco.

### Entidades clave

- **Deber**: una cosa que hacer. Atributos: asignatura opcional (una palabra o corta), fecha de entrega opcional, descripción de una línea, y estado (pendiente o hecho).
- **Cosas que hacer**: el subconjunto de deberes sin fecha; viven al final de los pendientes.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **SC-001**: Apuntar un deber lleva menos de 10 segundos.
- **SC-002**: Marcar o desmarcar un deber se refleja al momento (menos de 1 segundo perceptible).
- **SC-003**: El 100 % de los borrados (uno o todas las completadas) piden confirmación.
- **SC-004**: Ningún deber desaparece sin pregunta previa o confirmación (Constitución VI).
- **SC-005**: Las pantallas vacías siempre muestran mensaje, nunca blanco.

## Supuestos

- Especificación retrospectiva con cambios aprobados: la pregunta de vencidos (FR-008) sustituye al borrado silencioso actual; la fase de convergencia lo comprobará.
- La migración histórica de las tareas del finde antiguas ya está hecha y no genera trabajo.
- La sincronización con la cuenta se especifica aparte ("cuenta y sincronización"); los deberes viajan con la semana.
- Todo en español, móvil primero (Constitución IV).
