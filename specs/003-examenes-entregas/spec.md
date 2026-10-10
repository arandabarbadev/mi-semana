# Especificación de la función: Exámenes y entregas

**Rama de la función**: `003-examenes-entregas`

**Creada**: 2026-10-10

**Estado**: Borrador

**Entrada**: Descripción del usuario: "Exámenes y entregas con cuenta atrás en días, urgencia visual cuando se acercan, pasados plegados y aviso cuando es hoy." Especificación retrospectiva con las decisiones de Rafa del 2026-10-04 (botón de editar en los tres tipos de elementos).

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia de usuario 1 - Saber lo que se me viene (Prioridad: P1)

Como usuario quiero ver cada examen y cada entrega con los días que faltan, y que lo urgente se vea urgente, para organizarme sin hacer cuentas.

**Por qué esta prioridad**: la cuenta atrás es toda la gracia de esta sección; sin ella es una lista cualquiera.

**Prueba independiente**: con exámenes a 0, 2 y 7 días, miro la lista y compruebo cuentas, orden y color.

**Escenarios de aceptación**:

1. **Dado** exámenes a 7, 2 y 0 días, **cuando** abro la sección, **entonces** salen ordenados por fecha, con los días que faltan, y el de hoy y el de 2 días destacados como urgentes y el de hoy como "HOY".
2. **Dado** una entrega y un examen, **cuando** navego entre las dos subpestañas, **entonces** cada tipo va a lo suyo, con sus contadores de pendientes.
3. **Dado** la pestaña de la app, **cuando** hay exámenes o entregas pendientes, **entonces** el total se ve en la pestaña; si no hay, no hay número.

---

### Historia de usuario 2 - Apuntar examen o entrega (Prioridad: P1)

Como usuario quiero apuntar un examen o una entrega poniendo la asignatura y el día que toca, para no depender de la memoria.

**Por qué esta prioridad**: sin apuntar no hay cuenta atrás.

**Prueba independiente**: apunto uno con el +, relleno asignatura y fecha, y aparece colocado por fecha.

**Escenarios de aceptación**:

1. **Dado** el botón de añadir, **cuando** relleno asignatura y fecha y guardo, **entonces** aparece al momento en su lista, en su sitio por fecha.
2. **Dado** el formulario, **cuando** falta la asignatura o la fecha, **entonces** no se guarda y se me dice qué falta.

---

### Historia de usuario 3 - Corregir y borrar (Prioridad: P2)

Como usuario quiero corregir la asignatura o la fecha de un examen o entrega (se cambian de día, se equivocan), y borrar los que ya no valen.

**Por qué esta prioridad**: decisión de Rafa del 2026-10-04: todo elemento se puede editar; y la Constitución VI exige confirmación para borrar.

**Prueba independiente**: edito uno cambiando la fecha (se recoloca y cambia su urgencia); borro otro con confirmación.

**Escenarios de aceptación**:

1. **Dado** un examen pendiente, **cuando** lo edito cambiando su fecha a más lejos, **entonces** se recoloca y pierde la urgencia al momento; puedo cancelar la edición sin cambios.
2. **Dado** un pasado, **cuando** lo edito con una fecha futura, **entonces** vuelve a pendientes.
3. **Dado** un examen o entrega (pendiente o pasado), **cuando** pido borrarlo, **entonces** la confirmación nombra la asignatura; al cancelar no pasa nada.

---

### Historia de usuario 4 - El día que toca y lo que ya pasó (Prioridad: P2)

Como usuario quiero un aviso tranquilo el día que toca y que lo pasado no estorbe pero no desaparezca sin mi permiso.

**Por qué esta prioridad**: el día del examen no quiero sorpresas; y lo pasado aplasta si se mezcla.

**Prueba independiente**: con uno para hoy y uno de ayer, compruebo aviso y plegado.

**Escenarios de aceptación**:

1. **Dado** un examen para hoy, **cuando** abro su subpestaña, **entonces** sale un aviso en tono tranquilo ("Es hoy. Respira hondo, tú puedes.").
2. **Dado** elementos con fecha pasada, **cuando** abro la sección, **entonces** están plegados bajo "Pasados (N)" con "ayer" o "hace N días", y no se borran solos nunca.

---

### Casos límite

- ¿Lista sin pendientes? Dice qué hacer (p. ej. "Nada pendiente. Añade el examen con el +"), nunca blanco (Constitución V).
- ¿Cambio de día con la app abierta? Cuentas, urgencias, plegados y avisos se recalculan solos (cada minuto).
- ¿Dos el mismo día? Ambos cuentan 0 y ambos urgentes.
- ¿Cuenta de un dígito? "7 días"; de un solo día, "1 día".
- ¿Muchos pasados? Quedan plegados con su cuenta; no limitan.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **FR-001**: La app DEBE permitir apuntar exámenes y entregas con asignatura obligatoria (una línea) y fecha obligatoria.
- **FR-002**: Cada lista DEBE ordenarse por fecha y mostrar los días que faltan: "HOY" (0), "1 día", "N días".
- **FR-003**: Los elementos a 3 días o menos DEBEN verse urgentes (marca y tono); el de hoy, destacado como HOY.
- **FR-004**: Los de fecha pasada DEBEN plegarse bajo "Pasados (N)" mostrando "ayer" o "hace N días", y NUNCA borrarse solos.
- **FR-005**: Cuando algo cae hoy, la subpestaña DEBE mostrar un aviso en tono tranquilo, distinto para exámenes y entregas.
- **FR-006** *(decisión de Rafa, 2026-10-04)*: La app DEBE permitir editar la asignatura y la fecha de cualquier examen o entrega, pendiente o pasado, pudiendo desistir; al editar, la posición, urgencia y plegado se recalculan.
- **FR-007**: Borrar DEBE pedir confirmación nombrando la asignatura, en pendientes y en pasados.
- **FR-008**: Los contadores DEBEN verse por subpestaña (pendientes de cada tipo) y en la pestaña general (total pendientes), esta solo si es mayor que cero.
- **FR-009**: La app DEBE conservar exámenes y entregas entre sesiones; viajan con la semana (sincronización en spec aparte).
- **FR-010**: Las listas sin pendientes DEBEN decir qué hacer, nunca quedar en blanco.

### Entidades clave

- **Examen**: una prueba que toca un día. Atributos: asignatura, fecha.
- **Entrega**: un trabajo que hay que entregar un día. Atributos: asignatura, fecha. Igual que el examen salvo el tono del aviso.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **SC-001**: Apuntar un examen o entrega lleva menos de 10 segundos.
- **SC-002**: La cuenta atrás es exacta: el número de días coincide con el cálculo a mano de la fecha.
- **SC-003**: El 100 % de los borrados piden confirmación y nombran la asignatura.
- **SC-004**: Ningún pasado desaparece solo (Constitución VI).
- **SC-005**: Las listas vacías siempre muestran mensaje con qué hacer.

## Supuestos

- Especificación retrospectiva con dos novedades aprobadas: botón de editar (FR-006, hoy inexistente en la UI) y mensajes de lista vacía (FR-010, hoy blanco).
- Exámenes y entregas son listas independientes; no se convierten entre sí.
- La cuenta atrás usa días naturales (de fecha a fecha, sin horas).
- Todo en español, móvil primero (Constitución IV).
