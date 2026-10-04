# Plan de implementación: Deberes y cosas que hacer

**Rama**: `002-deberes-cosas` | **Fecha**: 2026-10-04 | **Spec**: [spec.md](spec.md)

**Entrada**: especificación de la función en `specs/002-deberes-cosas/spec.md`

## Resumen

Plan retrospectivo con **un cambio aprobado**: FR-008 — los deberes pendientes vencidos hoy se borran en silencio al abrir (`quitarPasadas()`) y deben pasar a preguntar con confirmación, y los completados vencidos deben dejarse quietos. El resto (apuntar, orden, etiquetas, tachar, editar, borrar, sugerencias, vacíos) ya existe y se verifica.

## Contexto técnico

**Lenguaje/Versión**: JavaScript (módulos ES) + HTML5 + CSS3, sin build.

**Dependencias principales**: ninguna para esta función.

**Almacenamiento**: `localStorage` clave `mi-semana-v1`, array `datos.deberes`; la nube se gobierna en la spec 006.

**Testing**: manual con quickstart.md + verificación en vivo con Chrome headless (Constituciones VII y IX).

**Plataforma objetivo**: PWA en navegador móvil; GitHub Pages.

**Tipo de proyecto**: web app estática monolito (index.html, app.js, styles.css).

**Objetivos de rendimiento**: pintar y reordenar al momento.

**Restricciones**: sin dependencias nuevas (III); móvil y español (IV); borrados siempre confirmados (VI); evidencias visibles (IX).

**Escala/Alcance**: un usuario; cientos de deberes como mucho.

## Constitution Check

| Principio / lección | Estado | Nota |
|---|---|---|
| I. Spec antes que código | ✔ | Spec 002 creada y compartida con Rafa |
| II. Privacidad | ✔ | Deberes = datos del usuario, nada al repo |
| III. Sin dependencias | ✔ | JS puro existente |
| IV. Móvil primero | ✔ | UI existente, español |
| V. Se entiende sin explicación | ✔ | Vacíos con mensaje ya existen |
| VI. No perder datos sin enterarse | ⚠ corregido en este plan | `quitarPasadas()` borra vencidas en silencio → pasa a preguntar (FR-008) |
| VII. Requisito comprobable | ✔ | quickstart con "hecho cuando" |
| VIII. Todo en mi carpeta | ✔ | specs/ en el repo local |
| IX. Evidencias | ✔ | Verificación en vivo con capturas |
| L1 / L2 | ✔ | styles.css:31 / sw.js red primero |

**Puerta: PASA** — la fricción con VI se corrige dentro del alcance.

## Estructura del proyecto

### Documentación (esta función)

```text
specs/002-deberes-cosas/
├── plan.md · research.md · data-model.md · quickstart.md · tasks.md
└── checklists/requirements.md
```

*(Sin `contracts/`: sin interfaces externas, como en 001.)*

### Código fuente y puntos de contacto

```text
index.html   # Sección Cosas que hacer: pestañas internas, listas, formulario, datalist
app.js       # Bloque DEBERES: etiquetaCuando, filaDeber, dibujarDeberes, form-deber,
             # delegación completar/deshacer/editar/borrar, btn-quitar-completadas, quitarPasadas
styles.css   # .cuando (hoy/mañana/pronto/lejos), .hecha, .grupo-titulo (sin cambios)
```

**El cambio (FR-008)** — `quitarPasadas()` en app.js (~líneas 601-606):
- Ahora: filtra sin preguntar todo deber con fecha pasada (también completados).
- Después: cuenta los **pendientes** vencidos; si hay, `confirm()` con el número ("Tienes N deber(es) vencido(s)… ¿Lo(s) quito?"); al aceptar se quitan solo esos; los completados se quedan siempre. Se llama igual que ahora: al arrancar y al cambiar de día.

## Seguimiento de complejidad

> Sin entradas: no hay violaciones que justificar.
