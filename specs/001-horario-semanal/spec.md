# Especificación de la función: Horario semanal

**Rama de la función**: `001-horario-semanal`

**Creada**: 2026-10-04

**Estado**: Borrador

**Entrada**: Descripción del usuario: "Horario semanal: el usuario apunta para cada día laborable (lunes a viernes) sus clases y sus actividades de tarde (hora + descripción), puede corregirlas y borrarlas con confirmación, y en fin de semana no hay horario sino un mensaje de descanso. Lo apuntado alimenta el resumen del día. Especificación retrospectiva de la funcionalidad ya existente, en español."

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia de usuario 1 - Consultar mi día (Prioridad: P1)

Como usuario quiero ver, de un vistazo y para cualquier día de lunes a viernes, qué clases tengo y qué tengo por la tarde, ordenado por hora, para saber qué me espera ese día.

**Por qué esta prioridad**: consultar el horario es el uso más frecuente; sin esto, apuntar no sirve de nada.

**Prueba independiente**: se prueba abriendo el horario de un día que ya tenga entradas y comprobando que salen todas, ordenadas por hora y separadas entre clases y tarde.

**Escenarios de aceptación**:

1. **Dado** un día laborable con clases y tardes apuntadas, **cuando** consulto ese día, **entonces** veo todas sus entradas ordenadas por hora, separadas en clases y en tarde.
2. **Dado** que es sábado o domingo, **cuando** consulto el horario, **entonces** veo un mensaje de descanso y no hay nada que apuntar ni borrar.

---

### Historia de usuario 2 - Apuntar mi día (Prioridad: P1)

Como usuario quiero añadir a cualquier día laborable una clase o una actividad de tarde, cada una con su hora y una descripción de una línea, para no tener que recordarlo de memoria.

**Por qué esta prioridad**: es el corazón de la función; sin apuntar no hay nada que consultar.

**Prueba independiente**: se prueba apuntando una entrada nueva en un día vacío y viendo que aparece al momento, ordenada por hora.

**Escenarios de aceptación**:

1. **Dado** un lunes sin nada apuntado, **cuando** apunto una clase con hora y descripción, **entonces** aparece en lunes, en su sitio por hora, sin recargar nada.
2. **Dado** dos entradas a la misma hora, **cuando** las consulto, **entonces** se ven las dos.
3. **Dado** que es fin de semana, **cuando** quiero apuntar horario, **entonces** no puedo: el finde no se apunta, se descansa.

---

### Historia de usuario 3 - Corregir y borrar (Prioridad: P2)

Como usuario quiero cambiar la hora o la descripción de cualquier entrada, y borrar entradas que ya no valen, sin miedo a perder las demás.

**Por qué esta prioridad**: el horario cambia (horarios nuevos, actividades que se acaban); sin corregir, la lista se vuelve mentira.

**Prueba independiente**: se prueba editando una entrada (cambia al momento) y borrando otra con confirmación.

**Escenarios de aceptación**:

1. **Dado** una entrada apuntada, **cuando** cambio su hora o su descripción, **entonces** se guarda al momento y se reordena si toca.
2. **Dado** una entrada apuntada, **cuando** pido borrarla, **entonces** la app me pide confirmación nombrando la entrada; si cancelo no pasa nada, si confirmo desaparece y las demás siguen.
3. **Dado** que estoy corrigiendo una entrada, **cuando** me arrepiento, **entonces** puedo desistir y la entrada queda como estaba.

---

### Historia de usuario 4 - Que Hoy lo refleje (Prioridad: P2)

Como usuario quiero que lo apuntado en el horario del día de hoy aparezca en el resumen del día sin hacer nada más, y que al cambiar de día la app lo note sola.

**Por qué esta prioridad**: el resumen es la portada de la app; el horario vale para eso.

**Prueba independiente**: se prueba apuntando algo para hoy y mirando el resumen; y dejando la app abierta al pasar de día.

**Escenarios de aceptación**:

1. **Dado** clases y tardes apuntadas para hoy, **cuando** miro el resumen del día, **entonces** las veo, sin necesidad de volver a apuntarlas.
2. **Dado** la app abierta al llegar el día siguiente, **cuando** pasa el tiempo, **entonces** el resumen y el horario pasan solos al nuevo día, sin recargar.

---

### Casos límite

- ¿Qué pasa cuando un día laborable no tiene nada apuntado? La app dice qué hacer en lugar de quedar en blanco (Constitución V).
- ¿Qué pasa cuando borro la última entrada de un día? Igual: indicación de qué hacer, nunca vacío.
- ¿Qué pasa con muchas entradas en un día? Se mantienen ordenadas por hora y legibles.
- ¿Qué pasa a medianoche con la app abierta? El día visible y el resumen cambian solos al nuevo día.
- ¿Qué pasa en fin de semana? No hay horario: mensaje de descanso; lo del finde se apunta en "Cosas que hacer".

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **FR-001**: La app DEBE permitir apuntar, para cada día de lunes a viernes, entradas de clase y de actividad de tarde, cada una con una hora y una descripción de una línea.
- **FR-002**: La app DEBE mostrar las entradas de cada día ordenadas por hora, separadas entre clases y tarde.
- **FR-003**: La app DEBE permitir corregir la hora y la descripción de cualquier entrada ya apuntada, y desistir de la corrección sin cambios.
- **FR-004**: La app DEBE pedir confirmación para borrar una entrada, nombrando la entrada en la confirmación; solo al confirmar se borra.
- **FR-005**: La app DEBE conservar el horario entre sesiones sin que el usuario haga nada (guarda al momento).
- **FR-006**: En sábado y domingo la app DEBE mostrar un mensaje de descanso en lugar del horario, y NO DEBE permitir apuntar entradas esos días.
- **FR-007**: El resumen del día DEBE reflejar las clases y tardes apuntadas para el día actual.
- **FR-008**: Cuando un día laborable no tiene nada apuntado, la app DEBE indicar qué hacer en lugar de quedar vacía.
- **FR-009**: Al cambiar de día con la app abierta, la app DEBE actualizar sola el día visible y el resumen del día.
- **FR-010**: El horario DEBE ser semanal y repetitivo: lo apuntado vale para todas las semanas, sin fechas.

### Entidades clave

- **Entrada de horario**: una cosa que pasa a una hora en un día laborable. Atributos: día de la semana, grupo (clase o tarde), hora, descripción de una línea.
- **Semana**: los siete días; de lunes a viernes con sus clases y sus tardes; sábado y domingo sin horario.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **SC-001**: Apuntar una entrada nueva lleva menos de 10 segundos.
- **SC-002**: Corregir o borrar una entrada lleva menos de 10 segundos y no pierde las demás.
- **SC-003**: El 100 % de los borrados piden confirmación y nombran lo que van a borrar.
- **SC-004**: El resumen del día coincide siempre con lo apuntado en el horario del día actual.
- **SC-005**: Ningún día laborable se ve en blanco: siempre hay una indicación de qué hacer.

## Supuestos

- Especificación retrospectiva: la función ya está construida; esta spec describe el comportamiento deseado. Donde el código actual se quede corto (p. ej., días vacíos sin mensaje), lo detectará la fase de convergencia y se completará.
- El finde no lleva horario a propósito: las cosas del finde se apuntan en "Cosas que hacer" (especificada aparte).
- El guardado y la sincronización con la cuenta se especifican en la función "cuenta y sincronización"; esta spec asume que el horario viaja con el resto de la semana.
- Toda la interfaz está en español y se usa primero en el móvil (Constitución IV).
