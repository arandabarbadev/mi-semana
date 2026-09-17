// ===== Mi semana — lógica de la app =====

import { enCambiarSesion, entrar, salir, escucharSemana, subirSemana, leerOtrasApps }
  from './firebase.js';

// ---------- Estado ----------

const CLAVE = 'mi-semana-v1';
const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
const DIAS_CORTO = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

function estadoVacio() {
  const horario = {};
  for (const d of DIAS) horario[d] = { clases: [], tarde: [] };
  return {
    horario,
    tareasFinde: [],
    deberes: [],
    examenes: [],
    entregas: [],
    asignaturas: [],
    notas: [],
    modificado: 0
  };
}

let datos = estadoVacio();
let uid = null;            // usuario con sesión (o null)
let usuarioActual = null;  // el objeto user de Firebase (para pintar avatar/nombre)
let ultimaSubida = 0;      // último "modificado" que sabemos que está en la nube
let temporizadorNube = null;

// ---------- Utilidades ----------

const $ = (sel) => document.querySelector(sel);

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

function idNuevo() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function hoyISO() {
  const f = new Date();
  const m = String(f.getMonth() + 1).padStart(2, '0');
  const d = String(f.getDate()).padStart(2, '0');
  return `${f.getFullYear()}-${m}-${d}`;
}

function diasQueFaltan(fechaISO) {
  const a = new Date(hoyISO() + 'T00:00:00');
  const b = new Date(fechaISO + 'T00:00:00');
  return Math.round((b - a) / 86400000);
}

function diaDeHoy() {
  return DIAS[(new Date().getDay() + 6) % 7];
}

function esFinde(dia) {
  return dia === 'sabado' || dia === 'domingo';
}

function capitalizar(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatearNota(n) {
  return n.toLocaleString('es-ES', { maximumFractionDigits: 2 });
}

// ---------- Persistencia ----------

function cargar() {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (crudo) datos = { ...estadoVacio(), ...JSON.parse(crudo) };
  } catch { /* si está corrupto, empezamos de cero */ }
}

function guardar() {
  datos.modificado = Date.now();
  localStorage.setItem(CLAVE, JSON.stringify(datos));
  programarNube();
}

function estado(txt) {
  $('#estado-sync').textContent = txt;
}

// Subir con retardo: si escribes varias cosas, se sube una sola vez (3 s después)
function programarNube() {
  if (!uid) return;
  clearTimeout(temporizadorNube);
  temporizadorNube = setTimeout(subirNube, 3000);
}

async function subirNube() {
  if (!uid || datos.modificado <= ultimaSubida) return;
  try {
    await subirSemana(uid, datos);
    ultimaSubida = datos.modificado;
    estado('✅ guardado en la nube');
  } catch (e) {
    estado('⚠️ no se pudo subir: ' + (e.code || 'error'));
  }
}

// ---------- Nube y cuenta ----------

enCambiarSesion((user) => {
  uid = user ? user.uid : null;
  usuarioActual = user;
  dibujarCuenta(user);
  if (user) {
    estado('☁️ conectando…');
    // Si la nube no responde en 12 s, avisamos claro y dejamos el detalle en consola
    let nubeRespondio = false;
    const despedida = setTimeout(() => {
      if (!nubeRespondio) {
        estado('⚠️ la nube no responde: pulsa F12 → Consola y cuéntame lo rojo');
        console.warn('mi-semana: Firestore no respondió en 12 s. Último error:', window.__msError || 'ninguno');
      }
    }, 12000);
    const marcarRespuesta = () => { nubeRespondio = true; clearTimeout(despedida); };
    escucharSemana(user.uid, (remoto) => {
      marcarRespuesta();
      if (remoto === null) {
        // Nube vacía y hay datos aquí: los subimos ("mudanza")
        if (datos.modificado > 0) { estado('☁️ subiendo tus datos…'); subirNube(); }
        else estado('☁️ sincronizada (nube vacía)');
      } else if ((remoto.modificado || 0) > datos.modificado) {
        // La nube está más nueva: bajamos
        datos = { ...estadoVacio(), ...remoto };
        ultimaSubida = datos.modificado;
        localStorage.setItem(CLAVE, JSON.stringify(datos));
        dibujarTodo();
        estado('⬇️ descargada de la nube');
      } else {
        ultimaSubida = remoto.modificado || 0;
        if (datos.modificado > ultimaSubida) { estado('☁️ subiendo…'); subirNube(); }
        else estado('☁️ sincronizada');
      }
    }, (s) => {
      marcarRespuesta();
      if (s === 'conectado') { if (!uid) estado('⚠️ sesión perdida'); }
      else { window.__msError = s; estado('⚠️ ' + s); }
    });
  } else {
    estado('modo local: solo se guarda en este navegador');
  }
});

function dibujarCuenta(user) {
  const btn = $('#btn-cuenta');
  if (user) {
    btn.innerHTML = user.photoURL
      ? `<img src="${esc(user.photoURL)}" alt="">`
      : esc((user.displayName || 'Tú')[0]);
    $('#cuenta-perfil').hidden = false;
    $('#cuenta-nombre').textContent = user.displayName || 'Tú';
    $('#cuenta-correo').textContent = user.email || '';
    $('#btn-login').hidden = true;
    $('#btn-logout').hidden = false;
    $('#btn-importar').hidden = false;
  } else {
    btn.textContent = '👤';
    $('#cuenta-perfil').hidden = true;
    $('#btn-login').hidden = false;
    $('#btn-logout').hidden = true;
    $('#btn-importar').hidden = true;
  }
}

$('#btn-cuenta').addEventListener('click', () => { $('#panel-cuenta').hidden = false; });
$('#btn-cerrar-cuenta').addEventListener('click', () => { $('#panel-cuenta').hidden = true; });
$('#panel-cuenta').addEventListener('click', (e) => {
  if (e.target === $('#panel-cuenta')) $('#panel-cuenta').hidden = true;
});

$('#btn-login').addEventListener('click', async () => {
  try { await entrar(); } catch (e) { estado('⚠️ no se pudo entrar: ' + (e.code || 'error')); }
});

$('#btn-logout').addEventListener('click', async () => {
  await salir();
  $('#panel-cuenta').hidden = true;
  estado('modo local: solo se guarda en este navegador');
});

$('#btn-importar').addEventListener('click', async () => {
  if (!uid) return;
  if (!confirm('¿Traer los deberes, exámenes, entregas, asignaturas y notas de tus otras apps? Lo que ya esté aquí no se toca.')) return;
  estado('⬇️ trayendo datos…');
  try {
    const t = await leerOtrasApps(uid);

    // Deberes, exámenes y entregas: añadir los que no existan por id
    for (const lista of ['deberes', 'examenes', 'entregas']) {
      const ids = new Set(datos[lista].map(x => x.id));
      datos[lista].push(...t[lista].filter(x => !ids.has(x.id)));
    }

    // Asignaturas: si ya existe una con el mismo nombre, mapeamos sus notas a la nuestra
    const porNombre = new Map(datos.asignaturas.map(a => [a.nombre.toLowerCase(), a.id]));
    const cambioId = new Map();
    for (const a of t.asignaturas) {
      if (datos.asignaturas.some(x => x.id === a.id)) continue;
      const existente = porNombre.get(a.nombre.toLowerCase());
      if (existente) { cambioId.set(a.id, existente); continue; }
      datos.asignaturas.push(a);
      porNombre.set(a.nombre.toLowerCase(), a.id);
    }
    const idsNotas = new Set(datos.notas.map(n => n.id));
    for (const n of t.notas) {
      if (idsNotas.has(n.id)) continue;
      const nuevoAsig = cambioId.get(n.asignaturaId) ?? n.asignaturaId;
      if (!datos.asignaturas.some(a => a.id === nuevoAsig)) continue;
      datos.notas.push({ ...n, asignaturaId: nuevoAsig });
    }

    // Deberes pasadas no interesan
    datos.deberes = datos.deberes.filter(d => diasQueFaltan(d.fecha) >= 0);

    guardar();
    dibujarTodo();
    $('#panel-cuenta').hidden = true;
    const cuenta = [t.deberes.length + ' deberes', t.examenes.length + ' exámenes',
      t.entregas.length + ' entregas', t.asignaturas.length + ' asignaturas', t.notas.length + ' notas'];
    alert('Traído de tus otras apps:\n· ' + cuenta.join('\n· ') + '\n\n(lo que ya estaba no se duplica)');
  } catch (e) {
    estado('⚠️ fallo al importar: ' + (e.code || 'error'));
  }
});

// ---------- Navegación por pestañas ----------

$('#pestanas').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-seccion]');
  if (!btn) return;
  const seccion = btn.dataset.seccion;
  document.body.dataset.seccion = seccion;
  for (const b of $('#pestanas').children) b.classList.toggle('activa', b === btn);
  for (const s of document.querySelectorAll('.seccion')) {
    s.hidden = s.id !== 'seccion-' + seccion;
  }
  if (seccion === 'hoy') dibujarHoy();
});

// ---------- HOY ----------

function saludo() {
  const h = new Date().getHours();
  if (esFinde(diaDeHoy())) return '🎉 ¡Es finde!';
  if (h < 13) return '☀️ Buenos días';
  if (h < 20) return '👋 Buenas tardes';
  return '🌙 Buenas noches';
}

function dibujarHoy() {
  $('#hoy-saludo').textContent = saludo();

  const dia = datos.horario[diaDeHoy()];
  const clases = [...dia.clases].sort((a, b) => a.hora.localeCompare(b.hora));
  const tarde = [...dia.tarde].sort((a, b) => a.hora.localeCompare(b.hora));

  $('#hoy-clases').innerHTML = clases.map(f => `
    <li class="fila-horario"><span class="hora">${esc(f.hora)}</span><span class="texto">${esc(f.texto)}</span></li>`).join('');
  $('#hoy-tarde').innerHTML = tarde.map(f => `
    <li class="fila-horario"><span class="hora">${esc(f.hora)}</span><span class="texto">${esc(f.texto)}</span></li>`).join('');

  if (esFinde(diaDeHoy())) {
    $('#hoy-tarde-titulo').hidden = true;
    $('#hoy-clases-vacio').textContent = datos.tareasFinde.some(t => !t.hecha)
      ? ''
      : 'Sin tareas pendientes para el finde. Disfruta 🕹️';
    const pend = datos.tareasFinde.filter(t => !t.hecha);
    $('#hoy-clases').innerHTML = pend.map(t => `
      <li class="fila-horario"><span class="texto">☐ ${esc(t.texto)}</span></li>`).join('');
    $('#hoy-tarde').innerHTML = '';
  } else {
    $('#hoy-tarde-titulo').hidden = false;
    const vacioC = clases.length === 0 && tarde.length === 0;
    $('#hoy-clases-vacio').textContent = vacioC
      ? 'Hoy no tienes nada apuntado. Ponlo en Horario 📅'
      : (clases.length === 0 ? 'Sin clases apuntadas' : '');
  }

  // Próximo examen y próxima entrega
  dibujarProxima('#hoy-examen', datos.examenes);
  dibujarProxima('#hoy-entrega', datos.entregas);

  // Deberes que se echan encima (hoy o en 2 días)
  const cercanas = datos.deberes
    .filter(d => !d.hecha && diasQueFaltan(d.fecha) <= 2)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  $('#hoy-deberes').innerHTML = cercanas.map(d => `
    <li class="fila-deber">
      <span class="texto-deber">
        <span class="asignatura">${esc(d.asignatura)}</span>
        <div class="detalle">${esc(d.texto)}</div>
      </span>
      ${etiquetaCuando(d.fecha)}
    </li>`).join('');
  $('#hoy-deberes-vacio').textContent = cercanas.length === 0
    ? 'Nada urgente. Échale un ojo a Deberes 📝 por si acaso.' : '';

  // Mini resumen de notas
  const conNotas = datos.asignaturas
    .map(a => ({ a, media: mediaExacta(a.id) }))
    .filter(x => x !== null && x.media !== null);
  if (conNotas.length === 0) {
    $('#hoy-notas').innerHTML = '<p class="vacio">Sin asignaturas aún. Añádelas en Notas 🧮</p>';
  } else {
    const global = conNotas.map(x => x.media).reduce((s, n) => s + n, 0) / conNotas.length;
    $('#hoy-notas').innerHTML =
      `<p class="estado-objetivo" style="margin-top:0">Media global: <b style="font-size:1.05rem">${formatearNota(Math.round(global * 100) / 100)}</b></p>
       <div class="mini-notas">` +
      conNotas.map(x => `<span class="mini-nota">${esc(x.a.nombre)} <b class="${x.media >= 5 ? 'ok' : ''}">${formatearNota(Math.round(x.media))}</b></span>`).join('') +
      '</div>';
  }
}

function dibujarProxima(sel, lista) {
  const pendientes = lista
    .filter(x => diasQueFaltan(x.fecha) >= 0)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  const cont = $(sel);
  if (pendientes.length === 0) {
    cont.innerHTML = '<p class="sin-proxima" style="margin:0;color:var(--suave)">Nada pendiente 🎉</p>';
    return;
  }
  const p = pendientes[0];
  const dias = diasQueFaltan(p.fecha);
  cont.innerHTML = dias === 0
    ? `<div class="cuenta-grande"><span class="hoy-texto">¡HOY!</span><span class="nombre">${esc(p.asignatura)}</span></div>`
    : `<div class="cuenta-grande"><span class="numero">${dias}</span><span class="nombre"><small style="color:var(--suave)">${dias === 1 ? 'día' : 'días'} para</small><br>${esc(p.asignatura)}</span></div>`;
}

// ---------- HORARIO ----------

let diaActivo = diaDeHoy();

function dibujarDias() {
  $('#dias').innerHTML = DIAS.map((d, i) =>
    `<button data-dia="${d}" class="${d === diaActivo ? 'activa' : ''}">${DIAS_CORTO[i]}</button>`).join('');
  const finde = esFinde(diaActivo);
  $('#horario-laboral').hidden = finde;
  $('#horario-finde').hidden = !finde;
  if (finde) dibujarTareasFinde();
  else { dibujarListaHorario('clases'); dibujarListaHorario('tarde'); }
}

function dibujarListaHorario(tipo) {
  const filas = [...(datos.horario[diaActivo]?.[tipo] || [])]
    .sort((a, b) => a.hora.localeCompare(b.hora));
  $(tipo === 'clases' ? '#lista-clases' : '#lista-tarde').innerHTML = filas.map(f => `
    <li class="fila-horario" data-id="${esc(f.id)}">
      <span class="hora">${esc(f.hora)}</span>
      <span class="texto">${esc(f.texto)}</span>
      <span class="acciones">
        <button class="btn-mini" data-accion="editar" data-tipo="${tipo}" title="Editar">✎</button>
        <button class="btn-mini peligro" data-accion="borrar" data-tipo="${tipo}" title="Borrar">✕</button>
      </span>
    </li>`).join('');
}

$('#dias').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-dia]');
  if (!btn) return;
  diaActivo = btn.dataset.dia;
  dibujarDias();
});

function añadirAHorario(tipo, hora, texto) {
  datos.horario[diaActivo][tipo].push({ id: idNuevo(), hora, texto });
  guardar();
  dibujarListaHorario(tipo);
  dibujarHoy();
}

$('#form-clases').addEventListener('submit', (e) => {
  e.preventDefault();
  añadirAHorario('clases', $('#clases-hora').value, $('#clases-texto').value.trim());
  $('#form-clases').reset();
});
$('#form-tarde').addEventListener('submit', (e) => {
  e.preventDefault();
  añadirAHorario('tarde', $('#tarde-hora').value, $('#tarde-texto').value.trim());
  $('#form-tarde').reset();
});

// Editar / borrar clases y tardes (delegación sobre las dos listas)
for (const sel of ['#lista-clases', '#lista-tarde']) {
  const ul = $(sel);
  ul.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-accion]');
    if (!btn) return;
    const tipo = btn.dataset.tipo;
    const li = btn.closest('li');
    const fila = datos.horario[diaActivo][tipo].find(x => x.id === li.dataset.id);
    if (!fila) return;
    if (btn.dataset.accion === 'cancelar') { dibujarListaHorario(tipo); return; }
    if (btn.dataset.accion === 'borrar') {
      if (!confirm('¿Borrar "' + fila.texto + '"?')) return;
      datos.horario[diaActivo][tipo] = datos.horario[diaActivo][tipo].filter(x => x.id !== fila.id);
      guardar(); dibujarListaHorario(tipo); dibujarHoy();
    } else {
      li.innerHTML = `
        <form class="fila-edit" data-id="${esc(fila.id)}">
          <input type="time" value="${esc(fila.hora)}" required>
          <input type="text" maxlength="40" value="${esc(fila.texto)}" required>
          <button type="submit" class="btn-primario">✓</button>
          <button type="button" class="btn-mini" data-accion="cancelar">✕</button>
        </form>`;
    }
  });
  ul.addEventListener('submit', (e) => {
    const form = e.target.closest('form.fila-edit');
    if (!form) return;
    e.preventDefault();
    const tipo = sel.includes('clases') ? 'clases' : 'tarde';
    const fila = datos.horario[diaActivo][tipo].find(x => x.id === form.dataset.id);
    if (fila) {
      fila.hora = form.querySelector('input[type="time"]').value;
      fila.texto = form.querySelector('input[type="text"]').value.trim();
      guardar();
    }
    dibujarListaHorario(tipo);
    dibujarHoy();
  });
}

// Tareas del finde
function dibujarTareasFinde() {
  const pend = datos.tareasFinde.filter(t => !t.hecha).length;
  $('#cont-tareas-finde').textContent = pend > 0 ? pend : '';
  $('#lista-tareas-finde').innerHTML = datos.tareasFinde.map(t => `
    <li class="fila-tarea ${t.hecha ? 'hecha' : ''}" data-id="${esc(t.id)}">
      <input type="checkbox" ${t.hecha ? 'checked' : ''} aria-label="Marcar como hecha">
      <span class="texto-deber texto">${esc(t.texto)}</span>
      <span class="acciones">
        <button class="btn-mini peligro" data-accion="borrar" title="Borrar">✕</button>
      </span>
    </li>`).join('');
}

$('#form-tareas-finde').addEventListener('submit', (e) => {
  e.preventDefault();
  datos.tareasFinde.push({ id: idNuevo(), texto: $('#tareas-finde-texto').value.trim(), hecha: false });
  guardar();
  $('#form-tareas-finde').reset();
  dibujarTareasFinde();
});

$('#lista-tareas-finde').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-accion="borrar"]');
  if (!btn) return;
  const id = btn.closest('li').dataset.id;
  const t = datos.tareasFinde.find(x => x.id === id);
  if (t && confirm('¿Borrar "' + t.texto + '"?')) {
    datos.tareasFinde = datos.tareasFinde.filter(x => x.id !== id);
    guardar();
    dibujarTareasFinde();
  }
});

$('#lista-tareas-finde').addEventListener('change', (e) => {
  if (!e.target.matches('input[type="checkbox"]')) return;
  const t = datos.tareasFinde.find(x => x.id === e.target.closest('li').dataset.id);
  if (t) { t.hecha = e.target.checked; guardar(); dibujarTareasFinde(); dibujarHoy(); }
});

$('#btn-quitar-hechas').addEventListener('click', () => {
  if (!datos.tareasFinde.some(t => t.hecha)) return;
  datos.tareasFinde = datos.tareasFinde.filter(t => !t.hecha);
  guardar();
  dibujarTareasFinde();
});

// ---------- DEBERES ----------

function etiquetaCuando(fecha) {
  const d = diasQueFaltan(fecha);
  if (d <= 0) return '<span class="cuando hoy">hoy</span>';
  if (d === 1) return '<span class="cuando manana">mañana</span>';
  if (d <= 3) return `<span class="cuando pronto">en ${d} días</span>`;
  return `<span class="cuando lejos">en ${d} días</span>`;
}

function dibujarDeberes() {
  const pend = datos.deberes.filter(d => !d.hecha).sort((a, b) => a.fecha.localeCompare(b.fecha));
  const comp = datos.deberes.filter(d => d.hecha).sort((a, b) => b.fecha.localeCompare(a.fecha));

  $('#cont-deberes').textContent = pend.length > 0 ? pend.length : '';
  $('#cont-deberes-pend').textContent = pend.length;
  $('#cont-deberes-comp').textContent = comp.length;

  $('#lista-deberes-pend').innerHTML = pend.map(d => `
    <li class="fila-deber" data-id="${esc(d.id)}">
      <input type="checkbox" data-accion="completar" aria-label="Marcar como hecha">
      <span class="texto-deber">
        <span class="asignatura">${esc(d.asignatura)}</span>
        <div class="detalle">${esc(d.texto)}</div>
      </span>
      ${etiquetaCuando(d.fecha)}
      <span class="acciones">
        <button class="btn-mini" data-accion="editar" title="Editar">✎</button>
        <button class="btn-mini peligro" data-accion="borrar" title="Borrar">✕</button>
      </span>
    </li>`).join('');
  $('#deberes-pend-vacio').textContent = pend.length === 0 ? 'El esfuerzo de hoy es el éxito del mañana 💪' : '';

  $('#lista-deberes-comp').innerHTML = comp.map(d => `
    <li class="fila-deber hecha" data-id="${esc(d.id)}">
      <input type="checkbox" checked data-accion="deshacer" aria-label="Devolver a pendientes">
      <span class="texto-deber">
        <span class="asignatura">${esc(d.asignatura)}</span>
        <div class="detalle">${esc(d.texto)}</div>
      </span>
      ${etiquetaCuando(d.fecha)}
      <span class="acciones">
        <button class="btn-mini peligro" data-accion="borrar" title="Borrar">✕</button>
      </span>
    </li>`).join('');
  $('#deberes-comp-vacio').textContent = comp.length === 0 ? 'Nada completado aún.' : '';

  // Sugerencias de asignatura (deberes + notas)
  const nombres = new Set([
    ...datos.deberes.map(d => d.asignatura),
    ...datos.asignaturas.map(a => a.nombre)
  ]);
  $('#sugerencias-asignaturas').innerHTML =
    [...nombres].sort((a, b) => a.localeCompare(b, 'es')).map(n => `<option value="${esc(n)}">`).join('');
}

$('#deberes-tabs').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-tab]');
  if (!btn) return;
  for (const b of $('#deberes-tabs').children) b.classList.toggle('activa', b === btn);
  const pend = btn.dataset.tab === 'pendientes';
  $('#deberes-pendientes').hidden = !pend;
  $('#deberes-completados').hidden = pend;
});

$('#form-deber').addEventListener('submit', (e) => {
  e.preventDefault();
  datos.deberes.push({
    id: idNuevo(),
    asignatura: $('#deber-asignatura').value.trim(),
    fecha: $('#deber-fecha').value,
    texto: $('#deber-texto').value.trim(),
    hecha: false
  });
  guardar();
  $('#form-deber').reset();
  $('#deber-fecha').min = hoyISO();
  dibujarDeberes();
  dibujarHoy();
});

$('#lista-deberes-pend').addEventListener('change', (e) => {
  if (!e.target.matches('input[data-accion="completar"]')) return;
  const d = datos.deberes.find(x => x.id === e.target.closest('li').dataset.id);
  if (d) { d.hecha = true; guardar(); dibujarDeberes(); dibujarHoy(); }
});

$('#lista-deberes-comp').addEventListener('change', (e) => {
  if (!e.target.matches('input[data-accion="deshacer"]')) return;
  const d = datos.deberes.find(x => x.id === e.target.closest('li').dataset.id);
  if (d) { d.hecha = false; guardar(); dibujarDeberes(); dibujarHoy(); }
});

for (const sel of ['#lista-deberes-pend', '#lista-deberes-comp']) {
  $(sel).addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-accion]');
    if (!btn) return;
    const li = btn.closest('li');
    const d = datos.deberes.find(x => x.id === li.dataset.id);
    if (!d) return;
    if (btn.dataset.accion === 'borrar') {
      if (!confirm('¿Borrar "' + d.texto + '"?')) return;
      datos.deberes = datos.deberes.filter(x => x.id !== d.id);
      guardar(); dibujarDeberes(); dibujarHoy();
    } else if (btn.dataset.accion === 'editar') {
      li.innerHTML = `
        <form class="fila-edit" style="width:100%" data-id="${esc(d.id)}">
          <input type="text" maxlength="30" value="${esc(d.asignatura)}" required>
          <input type="date" value="${esc(d.fecha)}" min="${hoyISO()}" required>
          <input type="text" maxlength="140" value="${esc(d.texto)}" required style="flex-basis:100%">
          <button type="submit" class="btn-primario">✓</button>
          <button type="button" class="btn-mini" data-accion="cancelar">✕</button>
        </form>`;
      li.querySelector('button[data-accion="cancelar"]')
        .addEventListener('click', () => dibujarDeberes());
    }
  });
  $(sel).addEventListener('submit', (e) => {
    const form = e.target.closest('form.fila-edit');
    if (!form) return;
    e.preventDefault();
    const d = datos.deberes.find(x => x.id === form.dataset.id);
    if (d) {
      const inputs = form.querySelectorAll('input');
      d.asignatura = inputs[0].value.trim();
      d.fecha = inputs[1].value;
      d.texto = inputs[2].value.trim();
      guardar();
    }
    dibujarDeberes();
    dibujarHoy();
  });
}

$('#btn-quitar-completadas').addEventListener('click', () => {
  if (!datos.deberes.some(d => d.hecha)) return;
  if (!confirm('¿Quitar todas las completadas?')) return;
  datos.deberes = datos.deberes.filter(d => !d.hecha);
  guardar();
  dibujarDeberes();
});

// Las tareas con fecha pasada se van solas
function quitarPasadas() {
  const antes = datos.deberes.length;
  datos.deberes = datos.deberes.filter(d => diasQueFaltan(d.fecha) >= 0);
  if (datos.deberes.length !== antes) { guardar(); dibujarDeberes(); dibujarHoy(); }
}

// ---------- EXÁMENES Y ENTREGAS ----------

function filaCuenta(x) {
  const dias = diasQueFaltan(x.fecha);
  const urgente = dias >= 0 && dias <= 3;
  let cuenta;
  if (dias === 0) cuenta = 'HOY';
  else if (dias === 1) cuenta = '1<small>día</small>';
  else if (dias > 1) cuenta = `${dias}<small>días</small>`;
  else if (dias === -1) cuenta = 'ayer';
  else cuenta = `${-dias}<small>días</small>`;
  return `
    <li class="fila-cuenta ${urgente ? 'urgente' : ''} ${dias === 0 ? 'hoy-fila' : ''} ${dias < 0 ? 'pasados-item' : ''}" data-id="${esc(x.id)}">
      ${urgente && dias > 0 ? '<span class="punto-urgente"></span>' : ''}
      <span class="dias">${cuenta}</span>
      <span class="asignatura">${esc(x.asignatura)}</span>
      <span class="acciones">
        <button class="btn-mini peligro" data-accion="borrar" title="Borrar">✕</button>
      </span>
    </li>`;
}

function dibujarExamenes() {
  for (const [clave, listaSel, pasadosSel, numSel, avisoSel] of [
    ['examenes', '#lista-examenes', '#lista-examenes-pasados', '#num-examenes-pasados', '#aviso-examenes'],
    ['entregas', '#lista-entregas', '#lista-entregas-pasadas', '#num-entregas-pasadas', '#aviso-entregas']
  ]) {
    const lista = datos[clave];
    const pend = lista.filter(x => diasQueFaltan(x.fecha) >= 0).sort((a, b) => a.fecha.localeCompare(b.fecha));
    const pas = lista.filter(x => diasQueFaltan(x.fecha) < 0).sort((a, b) => b.fecha.localeCompare(a.fecha));

    $(listaSel).innerHTML = pend.map(filaCuenta).join('');
    $(pasadosSel).innerHTML = pas.map(filaCuenta).join('');
    $(numSel).textContent = pas.length;
    $(pasadosSel).closest('details').hidden = pas.length === 0;
    $(avisoSel).hidden = !pend.some(x => diasQueFaltan(x.fecha) === 0);
  }

  const totalPend = ['examenes', 'entregas']
    .reduce((s, k) => s + datos[k].filter(x => diasQueFaltan(x.fecha) >= 0).length, 0);
  $('#cont-examenes').textContent = totalPend > 0 ? totalPend : '';
  $('#cont-examenes-pend').textContent = datos.examenes.filter(x => diasQueFaltan(x.fecha) >= 0).length;
  $('#cont-entregas-pend').textContent = datos.entregas.filter(x => diasQueFaltan(x.fecha) >= 0).length;
}

$('#examenes-tabs').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-tab]');
  if (!btn) return;
  for (const b of $('#examenes-tabs').children) b.classList.toggle('activa', b === btn);
  const ex = btn.dataset.tab === 'examenes';
  $('#examenes-lista').hidden = !ex;
  $('#entregas-lista').hidden = ex;
});

for (const sel of ['#lista-examenes', '#lista-examenes-pasados', '#lista-entregas', '#lista-entregas-pasadas']) {
  $(sel).addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-accion="borrar"]');
    if (!btn) return;
    const li = btn.closest('li');
    const clave = sel.includes('entregas') ? 'entregas' : 'examenes';
    const x = datos[clave].find(y => y.id === li.dataset.id);
    if (x && confirm('¿Borrar "' + x.asignatura + '"?')) {
      datos[clave] = datos[clave].filter(y => y.id !== x.id);
      guardar();
      dibujarExamenes();
      dibujarHoy();
    }
  });
}

// ---------- NOTAS ----------

function notasDe(asignaturaId) {
  return datos.notas.filter(n => n.asignaturaId === asignaturaId);
}

function mediaExacta(asignaturaId) {
  const n = notasDe(asignaturaId);
  if (n.length === 0) return null;
  return n.reduce((s, x) => s + x.nota, 0) / n.length;
}

function mediaRedondeada(asignaturaId) {
  const m = mediaExacta(asignaturaId);
  if (m === null) return null;
  return Math.min(10, Math.round(Math.round(m * 100) / 100));
}

function estadoObjetivo(a) {
  const n = notasDe(a.id);
  if (!a.objetivo) {
    return n.length === 0
      ? '<p class="estado-objetivo">Sin notas aún</p>'
      : '<p class="estado-objetivo">Ponle un objetivo para ver qué necesitas 🎯</p>';
  }
  if (n.length === 0) return `<p class="estado-objetivo">Objetivo: ${formatearNota(a.objetivo)}. ¡A por él!</p>`;
  const exacta = mediaExacta(a.id);
  const red = mediaRedondeada(a.id);
  if (exacta >= a.objetivo) return '<p class="estado-objetivo ok">✅ ¡Objetivo conseguido!</p>';
  if (red >= a.objetivo) return `<p class="estado-objetivo casi">🎯 ¡Casi! Media: ${formatearNota(Math.round(exacta * 100) / 100)}</p>`;
  const suma = n.reduce((s, x) => s + x.nota, 0);
  const necesaria = a.objetivo * (n.length + 1) - suma;
  if (necesaria > 10) {
    return `<p class="estado-objetivo">Con un 10 en el próximo examen aún no llegas a ${formatearNota(a.objetivo)}… ¡pero cada décima cuenta!</p>`;
  }
  return `<p class="estado-objetivo">Necesitas un ${formatearNota(Math.ceil(necesaria * 10) / 10)} en el próximo examen para llegar a ${formatearNota(a.objetivo)}</p>`;
}

function dibujarNotas() {
  const asignaturas = [...datos.asignaturas].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

  // Pestaña Calculadora
  $('#lista-asignaturas').innerHTML = asignaturas.length === 0
    ? '<p class="vacio">Añade tu primera asignatura para empezar a llevar las notas 🧮</p>'
    : asignaturas.map(a => {
        const m = mediaExacta(a.id);
        const r = mediaRedondeada(a.id);
        const clase = m === null ? '' : (m >= (a.objetivo || 5) ? 'conseguida' : (r >= (a.objetivo || 5) ? 'cerca' : ''));
        return `
        <div class="asignatura-tarjeta" data-id="${esc(a.id)}">
          <div class="asignatura-fila">
            <span class="nota-media ${clase}">${r === null ? '—' : formatearNota(r)}</span>
            <span class="asignatura-info">
              <span class="asignatura-nombre">${esc(a.nombre)}</span><br>
              ${a.objetivo ? `<span class="chip-objetivo">🎯 objetivo ${formatearNota(a.objetivo)}</span>` : ''}
            </span>
            <span class="acciones">
              <button class="btn-mini" data-accion="editar-asignatura" title="Editar">✎</button>
              <button class="btn-mini peligro" data-accion="borrar-asignatura" title="Borrar">✕</button>
            </span>
          </div>
          ${estadoObjetivo(a)}
        </div>`;
      }).join('');

  // Pestaña Medias
  if (asignaturas.length === 0) {
    $('#medias-contenido').innerHTML = '<p class="vacio">Aún no hay asignaturas.</p>';
  } else {
    $('#medias-contenido').innerHTML = asignaturas.map(a => {
      const n = notasDe(a.id).sort((x, y) => (x.createdAt || 0) - (y.createdAt || 0));
      const exacta = mediaExacta(a.id);
      return `
        <section class="tarjeta grupo-notas" data-id="${esc(a.id)}" style="margin-bottom:14px">
          <h3>${esc(a.nombre)}
            <button data-accion="nueva-nota" data-id="${esc(a.id)}">＋ nota</button>
          </h3>
          ${n.length === 0
            ? '<p class="vacio" style="padding:4px 0">Sin notas todavía</p>'
            : '<ul class="lista-notas">' + n.map(x => `
              <li class="fila-nota" data-id="${esc(x.id)}">
                <span class="examen">${esc(x.examen)}</span>
                <span class="valor">${formatearNota(x.nota)}</span>
                <button class="btn-mini peligro" data-accion="borrar-nota" title="Borrar">✕</button>
              </li>`).join('') + '</ul>'}
          ${exacta !== null ? `<p class="pie-medias" style="margin-top:10px">media ${formatearNota(Math.round(exacta * 100) / 100)} → <b>${formatearNota(mediaRedondeada(a.id))}</b></p>` : ''}
        </section>`;
    }).join('');
  }
}

$('#notas-tabs').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-tab]');
  if (!btn) return;
  for (const b of $('#notas-tabs').children) b.classList.toggle('activa', b === btn);
  const calc = btn.dataset.tab === 'calculadora';
  $('#notas-calculadora').hidden = !calc;
  $('#notas-medias').hidden = calc;
});

$('#lista-asignaturas').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-accion]');
  if (!btn) return;
  const id = btn.closest('[data-id]').dataset.id;
  const a = datos.asignaturas.find(x => x.id === id);
  if (!a) return;
  if (btn.dataset.accion === 'borrar-asignatura') {
    if (!confirm('¿Borrar "' + a.nombre + '" y todas sus notas?')) return;
    datos.asignaturas = datos.asignaturas.filter(x => x.id !== id);
    datos.notas = datos.notas.filter(n => n.asignaturaId !== id);
    guardar();
    dibujarNotas();
    dibujarHoy();
    dibujarDeberes();
  } else {
    abrirModal('asignatura', a);
  }
});

$('#medias-contenido').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-accion]');
  if (!btn) return;
  if (btn.dataset.accion === 'nueva-nota') {
    abrirModal('nota', { asignaturaId: btn.dataset.id });
  } else if (btn.dataset.accion === 'borrar-nota') {
    const id = btn.closest('li').dataset.id;
    const n = datos.notas.find(x => x.id === id);
    if (n && confirm('¿Borrar la nota "' + n.examen + '"?')) {
      datos.notas = datos.notas.filter(x => x.id !== id);
      guardar();
      dibujarNotas();
      dibujarHoy();
    }
  }
});

// ---------- Modal genérico ----------

let modalAbierto = null; // qué se está editando

function abrirModal(tipo, existente = null) {
  modalAbierto = { tipo, existente };
  const campos = {
    examen: [
      { id: 'asignatura', label: 'Asignatura', tipo: 'text', max: 40, req: true, valor: existente?.asignatura },
      { id: 'fecha', label: 'Fecha', tipo: 'date', req: true, valor: existente?.fecha }
    ],
    entrega: [
      { id: 'asignatura', label: 'Asignatura', tipo: 'text', max: 40, req: true, valor: existente?.asignatura },
      { id: 'fecha', label: 'Fecha', tipo: 'date', req: true, valor: existente?.fecha }
    ],
    asignatura: [
      { id: 'nombre', label: 'Nombre', tipo: 'text', max: 40, req: true, valor: existente?.nombre },
      { id: 'objetivo', label: 'Objetivo (0-10, opcional)', tipo: 'number', min: 0, max: 10, step: 0.5, valor: existente?.objetivo ?? '' }
    ],
    nota: [
      { id: 'asignaturaId', label: 'Asignatura', tipo: 'select', req: true, valor: existente?.asignaturaId },
      { id: 'examen', label: 'Examen o trabajo', tipo: 'text', max: 60, req: true, valor: existente?.examen },
      { id: 'nota', label: 'Nota (0-10)', tipo: 'number', min: 0, max: 10, step: 0.1, req: true, valor: existente?.nota }
    ]
  };

  const titulos = {
    examen: 'Nuevo examen', entrega: 'Nueva entrega',
    asignatura: existente ? 'Editar asignatura' : 'Nueva asignatura', nota: 'Nueva nota'
  };
  $('#modal-titulo').textContent = titulos[tipo];

  $('#modal-campos').innerHTML = campos[tipo].map(c => {
    const valor = c.valor != null ? ` value="${esc(c.valor)}"` : '';
    const atributos = [
      c.max ? ` maxlength="${c.max}"` : '',
      c.min != null ? ` min="${c.min}"` : '',
      c.max != null && c.tipo === 'number' ? ` max="${c.max}"` : '',
      c.step ? ` step="${c.step}"` : '',
      c.req ? ' required' : ''
    ].join('');
    const control = c.tipo === 'select'
      ? `<select id="modal-${c.id}" ${c.req ? 'required' : ''} style="width:100%">` +
        [...datos.asignaturas].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
          .map(a => `<option value="${esc(a.id)}" ${a.id === c.valor ? 'selected' : ''}>${esc(a.nombre)}</option>`).join('') +
        '</select>'
      : `<input type="${c.tipo}" id="modal-${c.id}"${valor}${atributos} style="width:100%">`;
    return `<div><label for="modal-${c.id}">${c.label}</label>${control}</div>`;
  }).join('');

  $('#modal-error').hidden = true;
  $('#overlay-modal').hidden = false;
  const primerInput = $('#modal-campos input, #modal-campos select');
  if (primerInput) primerInput.focus();
}

function cerrarModal() {
  $('#overlay-modal').hidden = true;
  modalAbierto = null;
}

$('#modal-cancelar').addEventListener('click', cerrarModal);
$('#modal-cerrar').addEventListener('click', cerrarModal);
$('#overlay-modal').addEventListener('click', (e) => { if (e.target === $('#overlay-modal')) cerrarModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarModal(); });

document.querySelectorAll('[data-abrir-modal]').forEach(btn => {
  btn.addEventListener('click', () => abrirModal(btn.dataset.abrirModal));
});

$('#modal-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!modalAbierto) return;
  const { tipo, existente } = modalAbierto;
  const val = (id) => $('#modal-' + id)?.value?.trim();

  try {
    if (tipo === 'examen' || tipo === 'entrega') {
      const lista = tipo === 'examen' ? datos.examenes : datos.entregas;
      if (existente) {
        existente.asignatura = val('asignatura');
        existente.fecha = val('fecha');
      } else {
        lista.push({ id: idNuevo(), asignatura: val('asignatura'), fecha: val('fecha') });
      }
      dibujarExamenes();
    } else if (tipo === 'asignatura') {
      const objetivoCrudo = val('objetivo');
      const objetivo = objetivoCrudo === '' ? null : Number(objetivoCrudo.replace(',', '.'));
      if (objetivo !== null && (isNaN(objetivo) || objetivo < 0 || objetivo > 10)) {
        throw new Error('El objetivo tiene que estar entre 0 y 10');
      }
      if (existente) {
        existente.nombre = val('nombre');
        existente.objetivo = objetivo;
      } else {
        datos.asignaturas.push({ id: idNuevo(), nombre: val('nombre'), objetivo, createdAt: Date.now() });
      }
      dibujarNotas();
      dibujarDeberes();
    } else if (tipo === 'nota') {
      if (val('nota') === '') throw new Error('Escribe la nota');
      const numero = Number(val('nota').replace(',', '.'));
      if (isNaN(numero) || numero < 0 || numero > 10) {
        throw new Error('La nota tiene que estar entre 0 y 10');
      }
      const nueva = {
        id: existente?.id || idNuevo(),
        asignaturaId: existente?.asignaturaId || val('asignaturaId'),
        examen: val('examen'),
        nota: numero,
        createdAt: existente?.createdAt || Date.now()
      };
      if (existente) {
        const i = datos.notas.findIndex(n => n.id === existente.id);
        if (i >= 0) datos.notas[i] = nueva;
      } else {
        datos.notas.push(nueva);
      }
      dibujarNotas();
    }
    guardar();
    dibujarHoy();
    cerrarModal();
  } catch (err) {
    $('#modal-error').textContent = err.message;
    $('#modal-error').hidden = false;
  }
});

// ---------- Arranque ----------

function dibujarFecha() {
  const texto = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  $('#fecha-hoy').textContent = capitalizar(texto);
}

function dibujarTodo() {
  dibujarFecha();
  dibujarDias();
  dibujarDeberes();
  dibujarExamenes();
  dibujarNotas();
  dibujarHoy();
  dibujarCuenta(usuarioActual);
}

cargar();
$('#deber-fecha').min = hoyISO();
quitarPasadas();
dibujarTodo();

// La cuenta atrás y la fecha se refrescan solas
let ultimoDia = hoyISO();
setInterval(() => {
  dibujarFecha();
  dibujarExamenes();
  dibujarHoy();
  if (hoyISO() !== ultimoDia) {
    ultimoDia = hoyISO();
    quitarPasadas();
    diaActivo = diaDeHoy();
    dibujarDias();
  }
}, 60000);

// Service worker (solo funciona publicado en http/https)
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
