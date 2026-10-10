# Plan de implementación: Exámenes y entregas

**Rama**: `003-examenes-entregas` | **Fecha**: 2026-10-10 | **Spec**: [spec.md](spec.md)

**Entrada**: especificación de la función en `specs/003-examenes-entregas/spec.md`

## Resumen

Plan retrospectivo con **dos cambios aprobados**: FR-006 (botón de editar en exámenes y entregas — el formulario emergente ya soporta editar, solo falta el botón y el título) y FR-010 (mensaje cuando una lista está vacía, reutilizando `.vacio`). Cuenta atrás, urgencia, plegado de pasados, aviso de "es hoy", contadores y borrado con confirmación ya existen y se verifican.

## Contexto técnico

**Lenguaje/Versión**: JavaScript (módulos ES) + HTML5 + CSS3, sin build.

**Dependencias principales**: ninguna para esta función.

**Almacenamiento**: `localStorage` clave `mi-semana-v1`, arrays `datos.examenes` y `datos.entregas`; la nube se gobierna en la spec 006.

**Testing**: manual (quickstart) + verificación en vivo con Chrome headless y CDP (Constituciones VII y IX).

**Plataforma objetivo**: PWA en navegador móvil; GitHub Pages.

**Tipo de proyecto**: web app estática monolito (index.html, app.js, styles.css).

**Objetivos de rendimiento**: pintar y recolocar al momento.

**Restricciones**: sin dependencias nuevas (III); móvil y español (IV); borrados confirmados y nada se pierde solo (VI); evidencias visibles (IX).

**Escala/Alcance**: un usuario; decenas de exámenes y entregas por curso.

## Constitution Check

| Principio / lección | Estado | Nota |
|---|---|---|
| I. Spec antes que código | ✔ | Spec 003 creada y compartida |
| II. Privacidad | ✔ | Asignaturas y fechas del usuario; nada al repo |
| III. Sin dependencias | ✔ | JS puro existente |
| IV. Móvil primero | ✔ | UI existente, español |
| V. Se entiende sin explicación | ⚠ corregido aquí | Listas de exámenes/entregas sin pendientes quedan en blanco → FR-010 añade mensaje |
| VI. No perder datos | ✔ | Borrado con confirmación; pasados nunca se auto-borran |
| VII. Requisito comprobable | ✔ | quickstart con "hecho cuando" |
| VIII. Todo en mi carpeta | ✔ | specs/ en el repo local |
| IX. Evidencias | ✔ | Verificación en vivo con capturas |
| L1 / L2 | ✔ | styles.css:31 / sw.js red primero |

**Puerta: PASA** — la fricción con V se corrige dentro del alcance.

## Estructura del proyecto

### Documentación (esta función)

```text
specs/003-examenes-entregas/
├── plan.md · research.md · data-model.md · quickstart.md · tasks.md
└── checklists/requirements.md
```

*(Sin `contracts/`: sin interfaces externas, como en 001 y 002.)*

### Código fuente y puntos de contacto

```text
index.html   # Sección Exámenes: dos tarjetas con sus listas y sus + (vacíos nuevos)
app.js       # filaCuenta(), dibujarExamenes(), delegación de borrado en las 4 listas,
             # abrirModal(titulos) y el submit del modal para examen/entrega
styles.css   # .urgente, .hoy-fila, .pasados-item (sin cambios)
```

**Cambio 1 (FR-006, editar)**:
- `filaCuenta()` (app.js ~610-626): añadir el botón de editar a cada fila, junto al de borrar.
- Delegación de las 4 listas (~660-674): además de borrar, `editar` busca el elemento y llama `abrirModal('examen' | 'entrega', elemento)` — el submit del modal ya actualiza cuando recibe un existente (app.js ~886-894).
- `titulos` de `abrirModal`: "Editar examen/entrega" cuando llega un existente, "Nuevo/Nueva…" cuando no.

**Cambio 2 (FR-010, vacíos)**:
- index.html (~145, ~160): un `<p class="vacio" hidden>` por lista ("Nada pendiente. Añade el examen con el +" / "…la entrega…").
- `dibujarExamenes()`: mostrar el vacío cuando no hay pendientes; ocultarlo cuando hay.

## Seguimiento de complejidad

> Sin entradas: no hay violaciones que justificar.
