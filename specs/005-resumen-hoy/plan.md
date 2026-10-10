# Plan de implementación: Resumen del día (Hoy)

**Rama**: `005-resumen-hoy` | **Fecha**: 2026-10-10 | **Spec**: [spec.md](spec.md)

**Entrada**: especificación de la función en `specs/005-resumen-hoy/spec.md`

## Resumen

Plan retrospectivo **sin cambios de código**: Hoy ya consume el horario, los deberes, los exámenes/entregas y las notas, con vacíos en todas partes y refresco por minuto. Se documenta y se verifica. Cualquier carencia que la verificación destape la añade converge.

## Contexto técnico

**Lenguaje/Versión**: JavaScript (módulos ES) + HTML5 + CSS3, sin build.

**Dependencias principales**: ninguna. Dependencias de datos: specs 001-004.

**Almacenamiento**: lee `mi-semana-v1`; no escribe nunca (Hoy es de solo lectura).

**Testing**: manual (quickstart) + verificación en vivo con Chrome headless (VII, IX). La rama de día laborable con clases se verifica en código y con Rafa entre semana (hoy es sábado).

**Plataforma objetivo**: PWA en navegador móvil; GitHub Pages.

**Tipo de proyecto**: web app estática monolito (index.html, app.js, styles.css).

**Objetivos de rendimiento**: pintar al momento.

**Restricciones**: sin dependencias (III); móvil y español (IV); vacíos con mensaje (V); evidencias (IX).

**Escala/Alcance**: un usuario; el resumen cabe en una pantalla de móvil.

## Constitution Check

| Principio / lección | Estado | Nota |
|---|---|---|
| I. Spec antes que código | ✔ | No hay código nuevo; spec para constancia |
| II. Privacidad | ✔ | Solo datos del usuario |
| III. Sin dependencias | ✔ | Nada nuevo |
| IV. Móvil primero | ✔ | Hoy es la portada, pensada para el móvil |
| V. Se entiende sin explicación | ✔ | Vacíos en las cuatro tarjetas |
| VI. No perder datos | ✔ | Hoy no borra ni edita nada |
| VII. Requisito comprobable | ✔ | quickstart |
| VIII. Todo en mi carpeta | ✔ | specs/ en el repo local |
| IX. Evidencias | ✔ | Verificación en vivo con captura |
| L1 / L2 | ✔ | Sin cambios |

**Puerta: PASA.**

## Estructura del proyecto

### Documentación (esta función)

```text
specs/005-resumen-hoy/
├── plan.md · research.md · data-model.md · quickstart.md · tasks.md
└── checklists/requirements.md
```

### Código fuente y puntos de contacto (sin cambios)

```text
index.html   # Sección Hoy: tarjetas de clases, próximo examen, próxima entrega, deberes, notas
app.js       # saludo(), dibujarHoy(), dibujarProxima(), y el intervalo de 60 s
styles.css   # .tarjeta-destacada, .cuenta-grande, .mini-notas (sin cambios)
```

## Seguimiento de complejidad

> Sin entradas: no hay violaciones que justificar.
