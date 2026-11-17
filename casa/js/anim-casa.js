/* ============================================================
   EnCasa — Animaciones de los ejercicios en casa
   A = posición inicial, B = contracción (la animación va y viene).
   ============================================================ */
(() => {
  const { S, F, register, getScene } = Anim;
  const MAT = { type: 'mat', x1: 50, x2: 270 };
  const cross = t => [[t - 150, t - 10]];          // brazos cruzados sobre el pecho
  const HIPS = [[-35, 150]];                       // manos en la cintura
  const KNEES = [[120, 43, 90]];
  const SUP = (A, B, extra) => S(Object.assign({ anchor: ['hip', [180, 186]], floor: 198, vb: '40 70 250 136', props: [MAT],
    A: Object.assign({ torso: 270 }, A), B: Object.assign({ torso: 270 }, B) }, extra));
  const PLANK = { anchor: ['hand', [205, 192]], floor: 198, vb: '40 70 250 136', props: [MAT] };
  const QUAD = (A, B, extra) => S(Object.assign({ anchor: ['knee2', [140, 192]], floor: 198, vb: '40 70 250 136', props: [MAT],
    A: Object.assign({ torso: 104, a: [[0, 0], [0, 0]], l: [[0, -90, -95], [0, -90, -95]] }, A),
    B: Object.assign({ torso: 104, a: [[0, 0], [0, 0]], l: [[0, -90, -95], [0, -90, -95]] }, B) }, extra));
  const SQUAT_B = { torso: 158, a: [[88, 88]], l: [[84, -28]] };
  const BAG = (o) => Object.assign({ type: 'bag', at: 'hand' }, o);
  const BOT = { type: 'bottle', at: 'hand' }, BOTL = { type: 'bottle', at: 'handL' }, BOTR = { type: 'bottle', at: 'handR' };
  const CHAIR = (x, top, back, w) => ({ type: 'chair', x, top, back, w });

  /* ---------- Piernas y glúteos ---------- */
  register('piernas', {
    'sentadilla': S({ A: { a: [[10, 10]] }, B: SQUAT_B }),
    'sentadilla-sumo': F({ anchor: ['ankleL', [128, 190]],
      A: { a: [[22, -135]], l: [[16, -2]] }, B: { a: [[22, -135]], l: [[54, -22, 0, .8]] } }),
    'zancada-atras': S({ anchor: ['ankle', [186, 190]],
      A: { a: HIPS, l: [[0, 0], [0, 0]] }, B: { a: HIPS, l: [[80, -30], [-5, -90, 50]] } }),
    'zancada-lateral': F({ anchor: ['ankle2', [196, 190]],
      A: { a: [[22, -135]], l: [[10, 0], [10, 10]] }, B: { a: [[22, -135]], l: [[62, -18, 0, .85], [42, 42]] } }),
    'sentadilla-pared': S({ anchor: ['ankle', [180, 190]], props: [{ type: 'wall', x: 118, w: 14 }],
      A: { torso: 180, a: [[0, 0]], l: [[45, 18]] }, B: { torso: 180, a: [[0, 0]], l: [[90, 0]] } }),
    'puente': S({ anchor: ['ankle', [200, 191]], floor: 198, vb: '40 70 250 136', props: [MAT],
      A: { torso: 270, a: [[95, 90]], l: [[130, 30, 90]] }, B: { torso: 299, a: [[118, 100]], l: [[100, 20, 90]] } }),
    'puente-una-pierna': S({ anchor: ['ankle', [200, 191]], floor: 198, vb: '40 70 250 136', props: [MAT],
      A: { torso: 270, a: [[95, 90]], l: [[130, 30, 90], [130, 130, 220]] }, B: { torso: 299, a: [[118, 100]], l: [[100, 20, 90], [100, 100, 190]] } }),
    'patada-cuadrupedia': QUAD({}, { l: [[-98, 172, 262], [0, -90, -95]] }),
    'abduccion-pie': F({ anchor: ['ankle2', [184, 190]], props: [CHAIR(214, 140, 'R', 40)],
      A: { a: [[5, 5], [55, 40]], l: [[2, 2], [0, 0]] }, B: { a: [[5, 5], [55, 40]], l: [[38, 38], [0, 0]] } }),
    'gemelos': S({ anchor: ['toe', [178, 182]], floor: 198, props: [{ type: 'step', x: 160, w: 60, top: 184 }, { type: 'wall', x: 232, w: 14 }],
      A: { torso: 180, a: [[70, 80]], l: [[0, 0, 115]] }, B: { torso: 180, a: [[70, 80]], l: [[0, 0, 58]] } }),
    'sentadilla-salto': S({ anchor: ['toe', [176, 196]],
      A: { torso: 150, a: [[-35, -35]], l: [[84, -28, 90]] }, B: { torso: 182, a: [[170, 170]], l: [[0, 0, 20]] } }),
    'buenos-dias': S({ A: { torso: 180, a: cross(180), l: [[0, 0]] }, B: { torso: 112, a: cross(112), l: [[14, -6]] } })
  });

  /* ---------- Empuje ---------- */
  const PUSH = { A: { torso: 112, a: [[0, 0]], l: [[-68, -68, 10]] }, B: { torso: 95, a: [[-95, 30]], l: [[-85, -85, -7]] } };
  register('empuje', {
    'flexiones-pared': S({ anchor: ['hand', [236, 96]], props: [{ type: 'wall', x: 240, w: 16 }],
      A: { torso: 135, a: [[90, 90]], l: [[-45, -45, 45]] }, B: { torso: 155, a: [[-25, 100]], l: [[-25, -25, 65]] } }),
    'flexiones-rodillas': S(Object.assign({}, PLANK, {
      A: { torso: 128, a: [[0, 0]], l: [[-52, -90, -95]] }, B: { torso: 104, a: [[-100, 25]], l: [[-76, -90, -95]] } })),
    'flexiones': S(Object.assign({}, PLANK, PUSH)),
    'flexiones-abiertas': S(Object.assign({}, PLANK, PUSH, { B: { torso: 95, a: [[-80, 40]], l: [[-85, -85, -7]] } })),
    'flexiones-diamante': S(Object.assign({}, PLANK, PUSH, { B: { torso: 93.5, a: [[-110, 20]], l: [[-86.5, -86.5, -8.5]] } })),
    'pike': S(Object.assign({}, PLANK, { anchor: ['hand', [196, 192]],
      A: { torso: 40, a: [[28, 28]], l: [[-38, -38, 40]] }, B: { torso: 72, a: [[-55, 40]], l: [[-52, -52, 26]] } })),
    'plancha-flexion': S(Object.assign({}, PLANK, { anchor: ['toe', [96, 196]],
      A: { torso: 99, a: [[0, 90]], l: [[-81, -81, -3]] }, B: { torso: 112, a: [[0, 0]], l: [[-68, -68, 10]] } }))
  });

  /* ---------- Espalda ---------- */
  const PRONE = (A, B) => S({ anchor: ['hip', [150, 188]], floor: 198, vb: '40 70 250 136', props: [MAT],
    A: Object.assign({ torso: 90, l: [[-90, -90, -60]] }, A), B: Object.assign({ torso: 90, l: [[-90, -90, -60]] }, B) });
  register('espalda', {
    'superman': PRONE({ a: [[90, 90]] }, { torso: 99, a: [[102, 102]], l: [[-100, -100, -10]] }),
    'ytw': PRONE({ a: [[88, 88]] }, { torso: 94, a: [[112, 112]] }),
    'nadador': PRONE({ torso: 94, a: [[108, 108], [90, 90]], l: [[-90, -90, -60], [-100, -100, -10]] },
      { torso: 94, a: [[90, 90], [108, 108]], l: [[-100, -100, -10], [-90, -90, -60]] }),
    'remo-puerta': S({ anchor: ['ankle', [226, 190]], props: [{ type: 'wall', x: 238, w: 16 }],
      A: { torso: 201.5, a: [[80, 80]], l: [[21.5, 21.5, 111.5]] }, B: { torso: 181, a: [[-30, 75]], l: [[1, 1, 91]] } }),
    'curl-toalla': S({ props: [{ type: 'band', from: 'toe', to: 'hand', cls: 'eq-towel' }], A: { a: [[3, 3]], l: [[0, 0], [0, 0]] }, B: { a: [[8, 150]] } }),
    'bird-dog': QUAD({}, { a: [[0, 0], [95, 95]], l: [[0, -90, -95], [-96, -96, -170]] }, { anchor: ['knee', [140, 192]] })
  });

  /* ---------- Abdomen y core ---------- */
  register('core', {
    'crunch': SUP({ a: cross(270), l: KNEES }, { torso: 238, a: cross(238), l: KNEES }),
    'crunch-inverso': SUP({ a: [[95, 90]], l: [[150, 60]] }, { torso: 280, a: [[95, 90]], l: [[196, 110]] }, { anchor: ['shoulder', [128, 186]] }),
    'plancha': S(Object.assign({}, PLANK, { anchor: ['elbow', [205, 191]],
      A: { torso: 99, a: [[0, 90]], l: [[-81, -81, -3]] }, B: { torso: 100, a: [[0, 90]], l: [[-80, -80, -2]] } })),
    'plancha-lateral': S(Object.assign({}, PLANK, { anchor: ['elbow', [205, 191]],
      A: { torso: 108, a: [[0, 90]], l: [[-86, -86, -8]] }, B: { torso: 99, a: [[0, 90]], l: [[-81, -81, -3]] } })),
    'dead-bug': SUP({ a: [[180, 180], [180, 180]], l: [[180, 90], [180, 90]] }, { a: [[262, 262], [180, 180]], l: [[180, 90], [96, 96]] }),
    'bicicleta': SUP({ torso: 246, a: [[215, 320]], l: [[140, 70], [100, 98]] }, { torso: 250, a: [[215, 320]], l: [[100, 98], [140, 70]] }),
    'hollow': SUP({ torso: 258, a: [[252, 252]], l: [[100, 100, 190]] }, { torso: 254, a: [[248, 248]], l: [[104, 104, 194]] }),
    'elevacion-piernas': SUP({ a: [[92, 90]], l: [[97, 97, 185]] }, { a: [[92, 90]], l: [[172, 172, 262]] }),
    'russian-twist': F({ anchor: ['hip', [160, 162]], floor: 198, vb: '40 60 240 146', props: [MAT],
      A: { a: [[35, 62], [-48, -80]], l: [[48, -48, 0, .45]] }, B: { a: [[-48, -80], [35, 62]], l: [[48, -48, 0, .45]] } }),
    'toques-talon': SUP({ torso: 250, a: [[88, 86]], l: KNEES }, { torso: 246, a: [[76, 72]], l: KNEES }),
    'plancha-toques': S(Object.assign({}, PLANK, { anchor: ['hand', [205, 192]],
      A: { torso: 112, a: [[0, 0], [0, 0]], l: [[-68, -68, 10]] }, B: { torso: 112, a: [[0, 0], [40, 190]], l: [[-68, -68, 10]] } })),
    'mountain-climbers': S(Object.assign({}, PLANK, { period: 1600,
      A: { torso: 112, a: [[0, 0]], l: [[-68, -68, 10], [-68, -68, 10]] },
      B: { torso: 112, a: [[2, 2]], l: [[100, -35], [-68, -68, 10]] } }))
  });

  /* ---------- Cardio ---------- */
  register('cardio', {
    'jumping-jacks': F({ period: 1300, A: { a: [[6, 6]], l: [[2, 2]] }, B: { a: [[165, 165]], l: [[16, 16]] } }),
    'skipping': S({ anchor: ['hip', [160, 113]], period: 1100,
      A: { torso: 182, a: [[40, 100], [-35, 30]], l: [[0, 0, 70], [92, 0, 60]] }, B: { torso: 182, a: [[-35, 30], [40, 100]], l: [[92, 0, 60], [0, 0, 70]] } }),
    'talones': S({ anchor: ['hip', [160, 113]], period: 1100,
      A: { torso: 184, a: [[30, 100], [-25, 40]], l: [[0, 0, 70], [-10, -150, -70]] }, B: { torso: 184, a: [[-25, 40], [30, 100]], l: [[-10, -150, -70], [0, 0, 70]] } }),
    'burpees': S({ anchor: ['hand', [196, 192]], vb: '40 40 250 166', props: [MAT], period: 2400,
      A: { torso: 118, a: [[8, 8]], l: [[100, -30, 70]] }, B: { torso: 112, a: [[0, 0]], l: [[-68, -68, 10]] } }),
    'patinador': F({ anchor: ['hip', [160, 116]], period: 1500,
      A: { a: [[40, 60], [-30, -20]], l: [[12, -8], [-28, -60]] }, B: { a: [[-30, -20], [40, 60]], l: [[-28, -60], [12, -8]] } }),
    'zancada-salto': S({ anchor: ['hip', [160, 147]], period: 1500,
      A: { a: [[-30, 20], [35, 80]], l: [[80, -30], [-5, -90, 50]] }, B: { a: [[35, 80], [-30, 20]], l: [[-5, -90, 50], [80, -30]] } })
  });

  /* ---------- Silla, sofá o mesa ---------- */
  register('silla', {
    'fondos-silla': S({ anchor: ['hand', [104, 147]], floor: 198, props: [CHAIR(52, 150, 'L', 58)],
      A: { torso: 180, a: [[-80, 0]], l: [[85, 60]] }, B: { torso: 180, a: [[-15, -15]], l: [[75, 60]] } }),
    'bulgara-silla': S({ anchor: ['ankle', [195, 190]], props: [CHAIR(70, 152, 'L', 52)],
      A: { torso: 172, a: HIPS, l: [[80, -30], [-15, -130, -60]] }, B: { torso: 180, a: HIPS, l: [[25, -25], [-40, -85, -30]] } }),
    'step-up-silla': S({ anchor: ['ankle', [212, 144]], floor: 198, vb: '40 -14 250 216', props: [CHAIR(186, 150, 'R', 56)],
      A: { torso: 166, a: [[25, 40], [-20, -10]], l: [[85, -35], [-12, -5]] },
      B: { torso: 180, a: [[-10, 0], [10, 20]], l: [[0, 0], [70, -10]] } }),
    'sentadilla-silla': S({ props: [CHAIR(96, 160, 'L', 42)], A: { a: [[10, 10]] }, B: SQUAT_B }),
    'hip-thrust-sofa': S({ anchor: ['ankle', [196, 191]], floor: 199, props: [{ type: 'sofa', x: 6, w: 112, top: 151, back: 'L' }],
      A: { torso: 234, a: [[45, 70]], l: [[112, 0]] }, B: { torso: 261, a: [[70, 95]], l: [[75, -15]] } }),
    'flexiones-inclinadas': S({ anchor: ['hand', [204, 150]], floor: 198, props: [CHAIR(186, 154, 'R', 50)],
      A: { torso: 135, a: [[0, 0]], l: [[-45, -45, 33]] }, B: { torso: 111, a: [[-110, 25]], l: [[-69, -69, 9]] } }),
    'flexiones-declinadas': S({ anchor: ['hand', [222, 194]], floor: 198, props: [CHAIR(40, 152, 'L', 64)],
      A: { torso: 91, a: [[0, 0]], l: [[-89, -89, -11]] }, B: { torso: 75, a: [[-100, 20]], l: [[-105, -105, -27]] } }),
    'remo-mesa': S({ anchor: ['hand', [136, 104]], floor: 198, vb: '20 40 280 166', props: [{ type: 'table', x1: 20, x2: 140, top: 100 }],
      A: { torso: 254.5, a: [[178, 178]], l: [[74.5, 74.5, 164.5]] }, B: { torso: 245.5, a: [[240, 150]], l: [[65.5, 65.5, 155.5]] } })
  });

  /* ---------- Barra de dominadas ---------- */
  const DOOR = { type: 'door', x1: 110, x2: 210, y: 14 };
  const HANG = (A, B) => S({ anchor: ['hand', [160, 14]], vb: '40 -4 240 210', props: [DOOR],
    A: Object.assign({ torso: 180, l: [[30, -75]] }, A), B: Object.assign({ torso: 180, l: [[30, -75]] }, B) });
  register('barra', {
    'colgarse': HANG({ a: [[180, 180]] }, { a: [[176, 176]], sh: 4 }),
    'negativas': HANG({ a: [[25, 175]] }, { a: [[180, 180]] }),
    'dominadas': HANG({ a: [[180, 180]] }, { a: [[25, 175]] }),
    'chin-ups': HANG({ a: [[178, 178]] }, { a: [[30, 172]] }),
    'rodillas-colgado': HANG({ a: [[180, 180]], l: [[30, -60]] }, { torso: 186, a: [[180, 180]], l: [[105, 0]] })
  });

  /* ---------- Mochila o botellas ---------- */
  register('mochila', {
    'goblet-mochila': S({ props: [BAG({ at: 'hands', dy: -6 })],
      A: { torso: 180, a: [[28, 178]], l: [[0, 0]] }, B: { torso: 158, a: [[28, 178]], l: [[84, -28]] } }),
    'rumano-mochila': S({ props: [BAG()], A: { torso: 180, a: [[0, 0]], l: [[0, 0]] }, B: { torso: 118, a: [[0, 0]], l: [[18, -5]] } }),
    'remo-mochila': S({ props: [BAG()], A: { torso: 125, a: [[0, 0]], l: [[22, -12]] }, B: { torso: 125, a: [[-70, 10]], l: [[22, -12]] } }),
    'press-hombros': S({ props: [BOT], A: { a: [[40, 175]] }, B: { a: [[170, 175]] } }),
    'laterales': F({ props: [BOTL, BOTR], A: { a: [[6, 6]] }, B: { a: [[88, 88]] } }),
    'pajaro': F({ props: [BOTL, BOTR], A: { a: [[85, 85]], sc: .25 }, B: { a: [[90, 90]], sc: 1 } }),
    'curl': S({ props: [BAG({ dy: 4 })], A: { a: [[3, 3]] }, B: { a: [[8, 160]] } }),
    'frances': S({ props: [BOT], A: { a: [[172, -15]] }, B: { a: [[172, 172]] } })
  });

  /* ---------- Banda elástica ---------- */
  const DOORW = { type: 'wall', x: 268, w: 16 };
  const band = (from, to) => ({ type: 'band', from, to });
  register('banda', {
    'remo-banda': S({ anchor: ['ankle', [150, 190]], props: [DOORW, band([268, 96], 'hand')],
      A: { a: [[90, 90]] }, B: { a: [[-50, 85]] } }),
    'face-pull': S({ anchor: ['ankle', [150, 190]], props: [DOORW, band([268, 62], 'hand')],
      A: { a: [[112, 112]] }, B: { a: [[-95, 150]] } }),
    'press-pecho-banda': S({ anchor: ['ankle', [170, 190]], props: [{ type: 'wall', x: 34, w: 16 }, band([50, 92], 'hand')],
      A: { a: [[-60, 80]] }, B: { a: [[88, 90]] } }),
    'curl-banda': S({ props: [band('toe', 'hand')], A: { a: [[3, 3]] }, B: { a: [[8, 160]] } }),
    'triceps-banda': S({ anchor: ['ankle', [160, 190]], props: [DOORW, band([268, 24], 'hand')],
      A: { torso: 175, a: [[10, 125]] }, B: { torso: 175, a: [[10, 8]] } }),
    'laterales-banda': F({ props: [band('ankleL', 'handL'), band('ankleR', 'handR')], A: { a: [[6, 6]] }, B: { a: [[86, 86]] } }),
    'pallof': S({ anchor: ['ankle', [150, 190]], props: [DOORW, band([268, 98], 'hand')],
      A: { a: [[10, 170]], l: [[8, -8]] }, B: { a: [[90, 90]], l: [[8, -8]] } }),
    'caminata-lateral': F({ anchor: ['hip', [160, 120]], props: [band('knee', 'knee2')], period: 1800,
      A: { a: [[20, -120]], l: [[12, -6, 0, .9]] }, B: { a: [[20, -120]], l: [[28, -14, 0, .9], [8, -4, 0, .9]] } })
  });
})();
