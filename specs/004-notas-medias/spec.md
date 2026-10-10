# Especificación de la función: Notas y medias

**Rama de la función**: `004-notas-medias`

**Creada**: 2026-10-10

**Estado**: Borrador

**Entrada**: Descripción del usuario: "Notas: asignaturas con objetivo opcional, notas por asignatura, media exacta y redondeada, y el mensaje de qué necesito en el próximo examen para llegar al objetivo." Especificación retrospectiva con la decisión de Rafa del 2026-10-04 (botón de editar también en las notas).

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia de usuario 1 - Llevar las notas (Prioridad: P1)

Como usuario quiero apuntar mis asignaturas y las notas que saco en cada examen o trabajo, y ver la media al momento, para saber cómo voy sin hacer cuentas.

**Por qué esta prioridad**: sin notas apuntadas no hay medias ni objetivos; es la base.

**Prueba independiente**: apunto una asignatura con objetivo, le meto una nota y veo media y estado del objetivo.

**Escenarios de aceptación**:

1. **Dado** la pestaña de notas, **cuando** añado una asignatura con nombre (y objetivo opcional), **entonces** aparece con su hueco de media y, si tiene objetivo, su etiqueta de objetivo.
2. **Dado** una asignatura, **cuando** apunto una nota con su concepto y valor, **entonces** la media se recalcula al momento.
3. **Dado** el valor de la nota, **cuando** lo escribo con coma o con punto, **entonces** se entiende igual; fuera de 0 a 10 no se guarda y se avisa.

---

### Historia de usuario 2 - Saber qué necesito (Prioridad: P1)

Como usuario quiero que la app me diga, según mi objetivo, si lo tengo conseguido, si estoy a nada, o qué nota necesito en el próximo examen para llegar.

**Por qué esta prioridad**: es el motivo de existir de la calculadora; el número solo no dice nada.

**Prueba independiente**: con objetivo 7 y media 6,5 el mensaje dice que estoy a nada; cambiando la media, el mensaje cambia de tercio.

**Escenarios de aceptación**:

1. **Dado** asignatura sin objetivo, **cuando** la abro, **entonces** me invita a poner objetivo ("Ponle un objetivo para ver qué necesitas"); con objetivo y sin notas, "¡A por él!".
2. **Dado** media exacta igual o superior al objetivo, **cuando** la miro, **entonces** "¡Objetivo conseguido!".
3. **Dado** media exacta por debajo pero redondeada que llega, **cuando** la miro, **entonces** "¡Casi!" con la media exacta.
4. **Dado** que ni con un 10 en el próximo examen llego al objetivo, **cuando** lo miro, **entonces** me lo dice sin drama ("cada décima cuenta").
5. **Dado** resto de casos, **cuando** lo miro, **entonces** dice exactamente qué nota necesito en el próximo examen.

---

### Historia de usuario 3 - Medias de grupo (Prioridad: P2)

Como usuario quiero ver todas las notas de una asignatura juntas, ordenadas por cuando las apunté, con su media exacta y la redondeada, para repasar de donde viene mi media.

**Por qué esta prioridad**: da contexto a la media; útil pero secundario.

**Prueba independiente**: con dos notas apuntadas, la pestaña de medias las lista con "media exacta → redondeada".

**Escenarios de aceptación**:

1. **Dado** varias notas en una asignatura, **cuando** abro Medias, **entonces** salen en orden de apuntado y debajo "media X → Y" (X exacta, Y redondeada, tope 10).
2. **Dado** una asignatura sin notas, **cuando** abro Medias, **entonces** "Sin notas todavía".

---

### Historia de usuario 4 - Corregir y borrar (Prioridad: P2)

Como usuario quiero corregir una nota mal metida (valor, concepto, o incluso la asignatura a la que pertenece), corregir mi asignatura y su objetivo, y borrar lo que sobre.

**Por qué esta prioridad**: te equivocas metiendo notas más de lo que crees; y borrar una asignatura arrastra sus notas, así que mejor con aviso.

**Prueba independiente**: edito una nota de 6,5 a 8 y la media salta; borro una asignatura y sus notas se van con aviso.

**Escenarios de aceptación**:

1. **Dado** una nota apuntada, **cuando** la edito (concepto, valor o asignatura), **entonces** la media y los mensajes se recalculan al momento; puedo desistir sin cambios. *(editar es nuevo: decisión de Rafa 2026-10-04)*
2. **Dado** una asignatura, **cuando** edito su nombre u objetivo, **entonces** se actualiza en todas partes al momento.
3. **Dado** una nota, **cuando** la borro, **entonces** confirmación nombrándola.
4. **Dado** una asignatura con notas, **cuando** la borro, **entonces** la confirmación avisa de que sus notas se van con ella.

---

### Casos límite

- ¿Sin asignaturas? "Añade tu primera asignatura para empezar a llevar las notas", nunca blanco.
- ¿Objetivo imposible? Fuera de 0 a 10 no se acepta, con mensaje claro.
- ¿Media con decimales largos? Se muestra con sentido español (máx. 2 decimales, coma).
- ¿Redondeo pasa de 10? Se queda en 10.
- ¿Muchas notas? Orden por apuntado, lista clara.
- ¿Asignatura repetida en el nombre? Se permite (son cosas del usuario).

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **FR-001**: La app DEBE permitir apuntar asignaturas con nombre obligatorio (una línea) y objetivo opcional entre 0 y 10 en pasos de 0,5.
- **FR-002**: La app DEBE permitir apuntar notas: asignatura obligatoria, concepto de una línea obligatorio y valor entre 0 y 10 (admite decimales, con coma o punto).
- **FR-003**: La app DEBE calcular y mostrar la media exacta (máx. 2 decimales, formato español) y la media redondeada a entero, con tope de 10, de cada asignatura con notas.
- **FR-004**: Según el objetivo, la app DEBE mostrar: invitación a poner objetivo; "¡A por él!" si hay objetivo sin notas; "¡Objetivo conseguido!" si la exacta llega; "¡Casi!" con la exacta si solo llega la redondeada; "con un 10 aún no llegas… cada décima cuenta" si ni con un 10; y en el resto, la nota exacta que hace falta en el próximo examen.
- **FR-005**: Las asignaturas DEBEN listarse en orden alfabético; la pestaña de medias DEBE listar las notas de cada asignatura por orden de apuntado con su "media exacta → redondeada".
- **FR-006** *(decisión de Rafa, 2026-10-04)*: La app DEBE permitir editar una nota —concepto, valor y asignatura a la que pertenece—, con desistir; al editar, medias y mensajes se recalculan.
- **FR-007**: La app DEBE permitir editar nombre y objetivo de una asignatura, con desistir.
- **FR-008**: Borrar una nota DEBE pedir confirmación nombrándola; borrar una asignatura DEBE pedir confirmación avisando de que sus notas se borran con ella.
- **FR-009**: Asignaturas y notas DEBEN conservarse entre sesiones y viajar con la semana (sincronización en spec aparte); las asignaturas se sugieren al apuntar deberes (spec 002).
- **FR-010**: Los valores fuera de rango (objetivo y nota) NO DEBEN guardarse y DEBEN avisar con mensaje claro.
- **FR-011**: Las pantallas sin datos DEBEN decir qué hacer, nunca quedar en blanco.

### Entidades clave

- **Asignatura**: una materia del curso. Atributos: nombre (una línea), objetivo opcional (0-10), fecha de alta (para ordenar).
- **Nota**: lo sacado en un examen o trabajo. Atributos: asignatura a la que pertenece, concepto (una línea), valor (0-10), fecha de alta.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **SC-001**: Apuntar una asignatura o una nota lleva menos de 15 segundos.
- **SC-002**: La media mostrada coincide siempre con el cálculo a mano (exacta y redondeada).
- **SC-003**: El mensaje de objetivo es correcto en los cinco casos de FR-004, comprobable con la app en la mano.
- **SC-004**: El 100 % de los borrados piden confirmación; el de asignatura avisa de las notas.
- **SC-005**: Las pantallas vacías siempre muestran qué hacer.

## Supuestos

- Especificación retrospectiva con una novedad aprobada: el botón de editar notas (FR-006, hoy inexistente en la UI aunque el formulario lo soporta).
- La media global de todas las asignaturas se muestra en el resumen del día (spec 005), no aquí.
- Las notas no se ponderan: todas cuentan igual.
- Todo en español, móvil primero (Constitución IV).
