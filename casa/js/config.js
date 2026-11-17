/* ============================================================
   EnCasa — Configuración
   Para ocultar una zona, agregá su id en `hidden`.
   IDs: piernas, empuje, espalda, core, cardio, silla, barra, mochila, banda
   ============================================================ */
const CASA_CONFIG = { name: 'EnCasa', hidden: [] };

const GROUP_ORDER = ['Sin equipo', 'Silla o sofá', 'Barra', 'Mochila o botellas', 'Banda elástica'];

(function () {
  for (let i = MACHINES.length - 1; i >= 0; i--) {
    if (CASA_CONFIG.hidden.includes(MACHINES[i].id)) MACHINES.splice(i, 1);
  }
})();
