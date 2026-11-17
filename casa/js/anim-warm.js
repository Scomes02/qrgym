/* ============================================================
   EnCasa — Dibujos de la entrada en calor y los estiramientos.
   Escenas registradas en la "máquina" _warm; WARM_GFX dice qué
   músculos se pintan en cada una.
   ============================================================ */
(() => {
  const { S, F, register, getScene } = Anim;
  const MAT = { type: 'mat', x1: 50, x2: 270 };
  const HIPS = [[-35, 150]];                       // manos en la cintura
  const post = (x) => ({ type: 'rect', x: x - 3, y: 40, w: 6, h: 158, r: 2, cls: 'eq-metal' });
  const wall = (x) => ({ type: 'rect', x, y: 30, w: 10, h: 168, r: 2, cls: 'eq-pad' });

  register('_warm', {
    /* ---------- Entrada en calor ---------- */
    'cardio': S({ anchor: ['hip', [160, 113]], period: 1100,
      A: { torso: 184, a: [[30, 100], [-25, 40]], l: [[0, 0, 70], [-10, -120, -40]] },
      B: { torso: 184, a: [[-25, 40], [30, 100]], l: [[-10, -120, -40], [0, 0, 70]] } }),
    'circ-cadera': S({ A: { torso: 168, a: HIPS }, B: { torso: 194, a: HIPS } }),
    'balanceo': S({ props: [post(219)],
      A: { a: [[0, 0], [72, 80]], l: [[0, 0], [62, 40]] }, B: { a: [[0, 0], [72, 80]], l: [[0, 0], [-32, -32]] } }),
    'sentadilla': S({ A: { torso: 180, a: [[0, 0]], l: [[0, 0]] }, B: { torso: 158, a: [[88, 88]], l: [[84, -28]] } }),
    'zancadas': S({ anchor: ['ankle', [192, 190]],
      A: { torso: 180, a: HIPS, l: [[25, -25], [-30, -55, 10]] }, B: { torso: 180, a: HIPS, l: [[80, -30], [-5, -90, 50]] } }),
    'circ-brazos': S({ period: 2200, A: { a: [[178, 178], [-20, -20]] }, B: { a: [[-60, -60], [120, 120]] } }),
    'colgarse': S({ anchor: ['hand', [160, 22]], vb: '40 0 240 210',
      props: [{ type: 'frame', p1: [110, 20], p2: [214, 20], w: 6 }, { type: 'frame', p1: [114, 20], p2: [114, 198], w: 5 }, { type: 'frame', p1: [210, 20], p2: [210, 198], w: 5 }],
      A: { torso: 180, a: [[180, 180]], l: [[18, -50]] }, B: { torso: 180, sh: 4, a: [[176, 176]], l: [[18, -50]] } }),
    'cuadrupedia': S({ anchor: ['knee', [128, 192]], props: [MAT],
      A: { torso: 104, a: [[0, 0], [0, 0]], l: [[0, -90, -95]] }, B: { torso: 104, a: [[0, 0], [178, 178]], l: [[0, -90, -95]] } }),

    /* ---------- Estiramientos ---------- */
    's-cuadriceps': S({ props: [post(215)],
      A: { a: [[60, 70], [0, 0]], l: [[0, 0], [0, 0]] },
      B: { a: [[60, 70], [0, -29]], l: [[0, 0], [-8, -168, -100]] } }),
    's-isquios': S({ anchor: ['hip', [118, 186]], vb: '40 70 250 136', props: [MAT],
      A: { torso: 178, a: [[60, 80]], l: [[90, 90, 180]] }, B: { torso: 118, a: [[95, 95]], l: [[90, 90, 180]] } }),
    's-gluteos': S({ anchor: ['hip', [180, 186]], floor: 198, vb: '40 70 250 136', props: [MAT],
      A: { torso: 270, a: [[95, 90]], l: [[120, 43, 90], [175, 69]] },
      B: { torso: 270, a: [[130, 110]], l: [[150, 70, 160], [200, 95]] } }),
    's-aductores': F({ anchor: ['hip', [160, 162]], vb: '40 60 240 146', props: [MAT],
      A: { a: [[12, -15]], l: [[40, -40, 0, .45]] }, B: { a: [[18, -8]], l: [[72, -72, 0, .45]] } }),
    's-gemelos': S({ anchor: ['ankle', [178, 190]], props: [wall(236)],
      A: { torso: 170, a: [[95, 95]], l: [[20, -5], [-18, -18, 72]] }, B: { torso: 160, a: [[110, 105]], l: [[35, -15], [-28, -28, 62]] } }),
    's-cadera': S({ anchor: ['knee2', [140, 192]], props: [MAT],
      A: { torso: 180, a: [[60, 60]], l: [[95, 0, 90], [-25, -90, -95]] },
      B: { torso: 184, a: [[70, 70]], l: [[105, 5, 90], [-42, -90, -95]] } }),
    's-pecho': S({ anchor: ['ankle', [165, 190]], props: [post(108)],
      A: { torso: 180, a: [[-70, -70]] }, B: { torso: 172, a: [[-92, -92]] } }),
    's-hombro': F({ A: { a: [[0, 0], [0, 0]] }, B: { a: [[-80, -80], [-25, -100]] } }),
    's-triceps': F({ A: { a: [[0, 0], [0, 0]] }, B: { a: [[172, -15], [-40, -150]] } }),
    's-dorsal': S({ anchor: ['ankle', [110, 190]], props: [{ type: 'bench', x1: 205, x2: 275, top: 140 }],
      A: { torso: 112, a: [[52, 52]], l: [[-8, 0]] }, B: { torso: 90, a: [[62, 62]], l: [[-20, 0]] } }),
    's-biceps': S({ anchor: ['ankle', [165, 190]], props: [wall(100)],
      A: { torso: 180, a: [[-45, -45]] }, B: { torso: 176, a: [[-85, -85]] } }),
    's-espalda': S({ anchor: ['knee', [180, 192]], props: [MAT],
      A: { torso: 180, a: [[0, 0]], l: [[0, -90, -95]] }, B: { torso: 100, a: [[80, 80]], l: [[60, -90, -95]] } }),
    's-abdomen': S({ anchor: ['hip', [150, 190]], vb: '40 70 250 136', props: [MAT],
      A: { torso: 90, a: [[-90, 90]], l: [[-90, -90, -150]] }, B: { torso: 140, a: [[40, 25]], l: [[-90, -90, -150]] } }),
    's-cuello': F({ A: { a: [[0, 0], [0, 0]] }, B: { a: [[150, -120], [0, 0]] } })
  });
  register('_warm', {
    'puente': getScene('piernas', 'puente'),
    'flex-pared': getScene('empuje', 'flexiones-pared'),
    'plancha': getScene('core', 'plancha'),
    'ytw': getScene('espalda', 'ytw'),
    'superman': getScene('espalda', 'superman'),
    'jacks': getScene('cardio', 'jumping-jacks')
  });

  /* músculos que se pintan (principal / secundario) */
  window.WARM_GFX = {
    'cardio': [['cuadriceps', 'gemelos'], ['gluteos']],
    'circ-cadera': [['oblicuos', 'abdomen'], ['gluteos']],
    'balanceo': [['isquios', 'cuadriceps'], ['gluteos']],
    'sentadilla': [['cuadriceps', 'gluteos'], ['isquios']],
    'zancadas': [['cuadriceps', 'gluteos'], ['isquios']],
    'circ-brazos': [['deltoide_ant', 'deltoide_lat'], ['deltoide_post']],
    'colgarse': [['dorsal'], ['antebrazo', 'trapecio']],
    'cuadrupedia': [['romboides', 'oblicuos'], ['deltoide_post']],
    'puente': [['gluteos'], ['isquios']],
    'flex-pared': [['pecho_inf', 'triceps'], ['deltoide_ant']],
    'plancha': [['abdomen'], ['deltoide_ant', 'gluteos']],
    'ytw': [['romboides', 'deltoide_post'], ['trapecio']],
    'superman': [['lumbar', 'gluteos'], ['romboides']],
    'jacks': [['gemelos', 'deltoide_lat'], ['cuadriceps']],
    's-cuadriceps': [['cuadriceps'], []], 's-isquios': [['isquios'], ['gemelos']], 's-gluteos': [['gluteos'], []],
    's-aductores': [['aductores'], []], 's-gemelos': [['gemelos'], []], 's-cadera': [['cuadriceps'], ['abdomen']],
    's-pecho': [['pecho_sup', 'pecho_inf'], ['deltoide_ant']], 's-hombro': [['deltoide_post'], ['deltoide_lat']],
    's-triceps': [['triceps'], []], 's-dorsal': [['dorsal'], ['triceps']], 's-biceps': [['biceps'], ['antebrazo']],
    's-espalda': [['dorsal'], ['gluteos']], 's-abdomen': [['abdomen'], ['oblicuos']], 's-cuello': [['trapecio'], []]
  };
})();
