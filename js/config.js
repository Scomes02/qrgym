/* ============================================================
   QrGym — Configuración del gimnasio
   Para ocultar una máquina que el gym no tiene, agregá su id
   en la lista `hidden`. Ejemplo: hidden: ['hack', 'silla-romana']

   IDs disponibles:
   prensa, press-banca, poleas, smith, curl-femoral, extension-cuadriceps,
   abductores, gemelos, dorsalera, remo-polea-baja, remo-t, pec-deck,
   press-inclinado, patada-burro, hip-thrust, remo-independiente,
   press-pecho, press-hombros, hack, asistida, lumbares, scott, silla-romana
   ============================================================ */
const GYM_CONFIG = {
  name: 'Reaxion Fitness',
  city: 'Mendoza',
  hidden: []
};

const GROUP_ORDER = ['Piernas', 'Glúteos', 'Pecho', 'Espalda', 'Hombros', 'Brazos', 'Core', 'Multiuso'];

/* Aplica la configuración: saca las máquinas ocultas */
(function () {
  for (let i = MACHINES.length - 1; i >= 0; i--) {
    if (GYM_CONFIG.hidden.includes(MACHINES[i].id)) MACHINES.splice(i, 1);
  }
})();
