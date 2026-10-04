# Constitución personal de Rafa
<!-- Vale para todas las apps que construyo, no solo para este proyecto. -->

## Principios

### I. Spec antes que código
Ninguna funcionalidad se implementa sin un spec.md que yo haya leído. La spec dice QUÉ y POR QUÉ, nunca CÓMO: en la spec no aparecen tecnologías, botones, colores ni pantallas. Todo eso va en el plan.

### II. Privacidad
El repositorio es público. Nunca se suben datos personales: ni mi email, ni nombres de profesores o compañeros, ni mis notas, tareas o dinero. Los datos del usuario viven en su navegador.

### III. Sin dependencias por defecto
HTML, CSS y JavaScript puros, sin librerías, frameworks, fuentes externas ni servicios de terceros. Usar uno es una excepción: se justifica por escrito en el plan, explicando qué problema resuelve y qué alternativa sin dependencias se descartó, y el cliente tiene que aprobarla. Nunca se añade una dependencia en silencio.

### IV. Móvil primero
Se diseña para usarse con una mano, de pie, en el móvil. En el portátil también funciona, pero el móvil manda. Todo el texto en español.

### V. Se entiende sin explicación
Una persona que no ha visto la app la usa sin que nadie le explique nada. Cuando no hay datos, la pantalla dice qué hacer, nunca aparece vacía.

### VI. El usuario no pierde datos sin enterarse
Borrar algo pide confirmación o se puede deshacer. Si los datos solo viven en un navegador, la app lo dice claramente.

### VII. Todo requisito se puede comprobar usándolo
Cada spec incluye criterios de "hecho cuando" que se verifican con la app en la mano, sin mirar el código.

## Lecciones aprendidas
<!-- Reglas técnicas obligatorias para el plan y la implementación. -->

### L1. El atributo hidden siempre oculta
Toda app incluye la regla CSS `[hidden] { display: none !important; }`. Motivo: un display en el CSS anulaba hidden y la app se quedaba atascada detrás de una pantalla de carga (pasó dos veces, en mi-semana y en mis-finanzas).

### L2. El HTML se pide a la red primero
Si la app tiene service worker, el HTML se pide a la red primero y la caché solo se usa sin conexión. Motivo: la caché vieja impedía que llegaran los arreglos publicados.

## Gobierno

- Esta constitución tiene prioridad sobre cualquier plan o tarea. Si el plan la incumple, se dice en el Constitution Check y se justifica o se corrige.
- Cada vez que un error me cueste tiempo, se añade aquí como lección nueva y se sube la versión.

**Versión**: 1.0.0 | **Ratificada**: 2026-10-04 | **Última enmienda**: 2026-10-04
