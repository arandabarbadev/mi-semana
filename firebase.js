// ===== Firebase de mi-semana =====
// Mismo proyecto que deberes / examenes / notas: la misma cuenta Google.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect,
  getRedirectResult, onAuthStateChanged, signOut
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import {
  doc, setDoc, onSnapshot, getDoc, getDocs, collection,
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyC1mBofZooE010PRKjCo-fENDYU1lqWbh0',
  authDomain: 'deberes-e3282.firebaseapp.com',
  projectId: 'deberes-e3282',
  storageBucket: 'deberes-e3282.firebasestorage.app',
  messagingSenderId: '457365914046',
  appId: '1:457365914046:web:e3cf994128c4b75da479ef'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

// Mi semana guarda TODO en un único documento: users/{uid}/semana/datos
// (una subcolección, el MISMO patrón que usan notas y examenes, que ya funcionan)
const docSemana = (uid) => doc(db, 'users', uid, 'semana', 'datos');

// ---- Sesión ----

export function enCambiarSesion(callback) {
  onAuthStateChanged(auth, callback);
}

export async function entrar() {
  const proveedor = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, proveedor);
  } catch (e) {
    if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request') {
      await signInWithRedirect(auth, proveedor);
    } else {
      throw e;
    }
  }
}

export async function salir() {
  await signOut(auth);
}

// Recoger el resultado del login por redirección (móvil)
getRedirectResult(auth).catch(() => {});

// ---- Sincronización ----

// Escucha el documento de la nube en tiempo real.
// alBajar(datosRemotos) se llama cuando la nube tiene algo más nuevo.
export function escucharSemana(uid, alBajar, alEstado) {
  return onSnapshot(docSemana(uid), async (snap) => {
    alEstado('conectado');
    if (snap.exists()) {
      const remoto = snap.data();
      alBajar(remoto);
    } else {
      alBajar(null); // nube vacía: ocasión de "mudanza"
    }
  }, (error) => {
    alEstado('error: ' + error.code);
  });
}

// Sube el estado completo (última-escritura-gana, el que tenga modificado mayor)
export async function subirSemana(uid, datos) {
  await setDoc(docSemana(uid), datos);
}

// ---- Importar de las otras apps ----
// Lee los datos que las webs deberes / examenes / notas guardaron en Firestore
// y los devuelve en el formato de mi semana. No toca nada: solo lee.

async function leerColeccion(uid, nombre) {
  const r = await getDocs(collection(db, 'users', uid, nombre));
  return r.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function leerOtrasApps(uid) {
  const traidos = { deberes: [], examenes: [], entregas: [], asignaturas: [], notas: [] };

  // deberes: doc usuarios/{uid} con campo tareas
  try {
    const snap = await getDoc(doc(db, 'usuarios', uid));
    if (snap.exists() && Array.isArray(snap.data().tareas)) {
      traidos.deberes = snap.data().tareas.filter(t => t && t.asignatura && t.fecha && t.texto);
    }
  } catch { /* sin datos de esa app */ }

  // examenes: users/{uid}/examenes y users/{uid}/entregas
  try {
    traidos.examenes = (await leerColeccion(uid, 'examenes'))
      .filter(d => d.asignatura && d.fecha)
      .map(({ id, asignatura, fecha }) => ({ id, asignatura, fecha }));
    traidos.entregas = (await leerColeccion(uid, 'entregas'))
      .filter(d => d.asignatura && d.fecha)
      .map(({ id, asignatura, fecha }) => ({ id, asignatura, fecha }));
  } catch { /* sin datos de esa app */ }

  // notas: users/{uid}/asignaturas y users/{uid}/notas
  try {
    traidos.asignaturas = (await leerColeccion(uid, 'asignaturas'))
      .filter(d => d.nombre)
      .map(({ id, nombre, objetivo, createdAt }) => ({
        id, nombre, objetivo: (typeof objetivo === 'number' && objetivo > 0 && objetivo <= 10) ? objetivo : null,
        createdAt: createdAt || Date.now()
      }));
    traidos.notas = (await leerColeccion(uid, 'notas'))
      .filter(d => d.asignaturaId && d.examen && typeof d.nota === 'number')
      .map(({ id, asignaturaId, examen, nota, createdAt }) => ({ id, asignaturaId, examen, nota, createdAt: createdAt || Date.now() }));
  } catch { /* sin datos de esa app */ }

  return traidos;
}
