/* ============================================================
   QrGym — Animaciones: banco de abdominales, patada de glúteo de pie,
   laterales de pie, mancuernas, colchoneta, cajón y pesa rusa.
   ============================================================ */
(() => {
  const { S, F, lie, LYING, PRESS, register, getScene } = Anim;
  const DB = { type: 'db' }, DB2 = { type: 'db', at: 'hand2' };
  const DBL = { type: 'db', at: 'handL' }, DBR = { type: 'db', at: 'handR' };
  const MAT = { type: 'mat', x1: 50, x2: 270 };
  const cross = t => [[t - 150, t - 10]]; // brazos cruzados sobre el pecho

  /* ---------- Banco de abdominales declinado ---------- */
  const DECL = (A, B) => S({
    anchor: ['hip', [172, 122]], floor: 198, vb: '40 26 250 176',
    props: [{ type: 'frame', p1: [84, 171], p2: [208, 126], w: 10, cls: 'eq-pad-l' },
      { type: 'frame', p1: [98, 172], p2: [98, 198], w: 6 }, { type: 'frame', p1: [202, 130], p2: [226, 198], w: 6 },
      { type: 'roller', to: 'ankle', r: 7 }],
    A: Object.assign({ l: [[110, 20]] }, A), B: Object.assign({ l: [[110, 20]] }, B)
  });
  register('banco-abdominal', {
    'crunch-declinado': DECL({ torso: 290, a: cross(290) }, { torso: 238, a: cross(238) }),
    'sit-up': DECL({ torso: 290, a: cross(290) }, { torso: 192, a: cross(192) }),
    'crunch-giro': DECL({ torso: 290, a: [[210, 300]] }, { torso: 232, a: [[150, 250]] }),
    'crunch-disco': S(Object.assign(DECL({ torso: 290, a: cross(290) }, { torso: 240, a: cross(240) }), {})),
    'elevacion-piernas-banco': S({
      anchor: ['hip', [150, 130]], floor: 198, vb: '30 40 250 162',
      props: [{ type: 'frame', p1: [70, 117], p2: [226, 174], w: 10, cls: 'eq-pad-l' },
        { type: 'frame', p1: [84, 122], p2: [84, 198], w: 6 }, { type: 'frame', p1: [214, 172], p2: [214, 198], w: 6 },
        { type: 'roller', to: 'hand', r: 7 }],
      A: { torso: 250, a: [[250, 180]], l: [[72, 72, 160]] }, B: { torso: 250, a: [[250, 180]], l: [[165, 165, 255]] }
    })
  });
  getScene('banco-abdominal', 'crunch-disco').props = [...getScene('banco-abdominal', 'crunch-disco').props, { type: 'bar', at: 'elbow', r: 11 }];

  /* ---------- Patada de glúteo de pie ---------- */
  const GKP = (Al, Bl) => S({
    anchor: ['ankle2', [160, 184]], floor: 198, vb: '40 20 250 182',
    props: [{ type: 'rect', x: 110, y: 186, w: 120, h: 12, cls: 'eq-metal' }, { type: 'frame', p1: [256, 34], p2: [256, 198], w: 8 },
      { type: 'frame', p1: [256, 60], p2: [214, 76], w: 5 }, { type: 'chestpad', a: 12, b: 2, off: 14, leg: false },
      { type: 'handle', at: 'hand' }, { type: 'lever', pivot: [182, 118], to: 'ankle', w: 5 }, { type: 'roller', to: 'ankle', r: 7 }],
    A: { torso: 148, a: [[62, 112]], l: [Al, [-4, 0]] }, B: { torso: 148, a: [[62, 112]], l: [Bl, [-4, 0]] }
  });
  register('gluteo-pie', {
    'patada-atras': GKP([6, -4], [-52, -48]),
    'patada-rodilla-90': GKP([20, -70], [-48, -138]),
    'patada-pausa': GKP([6, -4], [-55, -50]),
    'patada-pulsos': GKP([-38, -34], [-56, -52])
  });

  /* ---------- Laterales de pie (máquina) ---------- */
  const LATP = (A, B, one) => F({
    floor: 198,
    props: [{ type: 'rect', x: 112, y: 190, w: 96, h: 8, cls: 'eq-metal' },
      { type: 'frame', p1: [92, 40], p2: [92, 198], w: 8 }, { type: 'frame', p1: [228, 40], p2: [228, 198], w: 8 },
      { type: 'frame', p1: [92, 40], p2: [228, 40], w: 6 }],
    cables: one ? [{ from: [228, 172], to: 'handR' }] : [{ from: [92, 172], to: 'handL' }, { from: [228, 172], to: 'handR' }],
    A, B
  });
  register('laterales-pie', {
    'laterales-bilateral': LATP({ a: [[8, 8]] }, { a: [[88, 88]] }),
    'laterales-unilateral': LATP({ a: [[20, 150], [8, 8]] }, { a: [[20, 150], [88, 88]] }, true),
    'laterales-pausa': LATP({ a: [[8, 8]] }, { a: [[90, 90]] }),
    'laterales-parciales': LATP({ a: [[50, 50]] }, { a: [[86, 86]] })
  });

  /* ---------- Mancuernas ---------- */
  const STAND = (A, B, props, extra) => S(Object.assign({ props: props || [DB] }, extra, { A, B }));
  const SEAT_DB = (A, B) => S({
    anchor: ['hip', [150, 140]], floor: 186, props: [{ type: 'backpad' }, { type: 'seatpad' }, DB],
    A: Object.assign({ torso: 180, l: [[90, 0]] }, A), B: Object.assign({ torso: 180, l: [[90, 0]] }, B)
  });
  const SQ = (tool) => S({ props: [tool],
    A: { torso: 158, a: [[28, 178]], l: [[84, -28]] }, B: { torso: 180, a: [[28, 178]], l: [[0, 0]] } });
  const LUNGE = (props) => S({ anchor: ['ankle', [192, 190]], props,
    A: { torso: 180, a: [[0, 0]], l: [[80, -30], [-5, -90, 0]] },
    B: { torso: 180, a: [[0, 0]], l: [[25, -25], [-30, -55, 10]] } });
  const BULG = (sup) => S({ anchor: ['ankle', [195, 190]], props: [sup, DB],
    A: { torso: 172, a: [[0, 0]], l: [[80, -30], [-15, -130, -60]] },
    B: { torso: 180, a: [[0, 0]], l: [[25, -25], [-40, -85, -30]] } });
  const ROW1 = (tool) => S({
    anchor: ['hip', [130, 112]], floor: 198, props: [{ type: 'bench', x1: 68, x2: 204, top: 159 }, tool],
    A: { torso: 95, a: [[0, 0], [20, -20]], l: [[0, -90], [-10, 5]] },
    B: { torso: 95, a: [[-150, 0], [20, -20]], l: [[0, -90], [-10, 5]] }
  });

  register('mancuernas', {
    'press-plano': getScene('press-banca', 'press-mancuernas'),
    'press-inclinado': getScene('press-inclinado', 'mancuernas'),
    'aperturas': getScene('press-banca', 'aperturas'),
    'pullover': getScene('press-banca', 'pullover'),
    'remo-una-mano': ROW1(DB),
    'remo-inclinado': STAND({ torso: 118, a: [[0, 0]], l: [[20, -10]] }, { torso: 118, a: [[-70, 10]], l: [[20, -10]] }),
    'press-militar': SEAT_DB({ a: [[40, 175]] }, { a: [[170, 175]] }),
    'laterales': F({ props: [DBL, DBR], A: { a: [[6, 6]] }, B: { a: [[88, 88]] } }),
    'frontales': STAND({ a: [[8, 8]] }, { a: [[92, 92]] }),
    'pajaro': F({ props: [DBL, DBR], A: { a: [[85, 85]], sc: .25 }, B: { a: [[90, 90]], sc: 1 } }),
    'encogimientos': STAND({ a: [[0, 0]] }, { a: [[0, 0]], sh: 8 }, [DB]),
    'curl-alterno': STAND({ a: [[3, 3], [3, 3]] }, { a: [[8, 160], [3, 3]] }, [DB2, DB]),
    'curl-martillo': STAND({ a: [[3, 3], [8, 160]] }, { a: [[8, 160], [3, 3]] }, [DB2, DB]),
    'curl-concentrado': S({ anchor: ['hip', [130, 150]], floor: 198, props: [{ type: 'bench', x1: 76, x2: 156, top: 161 }, DB],
      A: { torso: 140, a: [[28, 8]], l: [[90, 0]] }, B: { torso: 140, a: [[28, 150]], l: [[90, 0]] } }),
    'frances': lie({ a: [[195, 275]] }, { a: [[195, 195]] }, { props: [...LYING.props, DB] }),
    'extension-nuca': STAND({ a: [[172, -15]] }, { a: [[172, 172]] }),
    'patada-triceps': S(Object.assign(ROW1(DB), {
      A: { torso: 95, a: [[-80, 0], [20, -20]], l: [[0, -90], [-10, 5]] },
      B: { torso: 95, a: [[-80, -88], [20, -20]], l: [[0, -90], [-10, 5]] } })),
    'goblet': SQ({ type: 'db', at: 'hands', dy: 3 }),
    'zancadas': LUNGE([DB]),
    'bulgara': BULG({ type: 'bench', x1: 70, x2: 128, top: 156 }),
    'peso-muerto-rumano': STAND({ torso: 120, a: [[0, 0]], l: [[20, -5]] }, { torso: 180, a: [[0, 0]], l: [[0, 0]] }),
    'hip-thrust': S({
      anchor: ['ankle', [196, 191]], floor: 199, props: [{ type: 'bench', x1: 14, x2: 118, top: 151 }, { type: 'db', at: 'hip', dy: -12 }],
      A: { torso: 234, a: [[45, 70]], l: [[112, 0]] }, B: { torso: 261, a: [[70, 95]], l: [[75, -15]] }
    }),
    'gemelos': S({ anchor: ['toe', [178, 182]], floor: 198,
      props: [{ type: 'rect', x: 160, y: 184, w: 45, h: 14, cls: 'eq-metal' }, DB],
      A: { torso: 180, a: [[0, 0]], l: [[0, 0, 115]] }, B: { torso: 180, a: [[0, 0]], l: [[0, 0, 58]] } })
  });

  /* ---------- Colchoneta ---------- */
  const SUP = (A, B, extra) => S(Object.assign({ anchor: ['hip', [180, 186]], floor: 198, vb: '40 70 250 136', props: [MAT],
    A: Object.assign({ torso: 270 }, A), B: Object.assign({ torso: 270 }, B) }, extra));
  const KNEES = [[135, 45, 90]];
  const PLANK_HI = { anchor: ['hand', [205, 192]], floor: 198, vb: '40 70 250 136', props: [MAT] };

  register('colchoneta', {
    'crunch': SUP({ a: cross(270), l: KNEES }, { torso: 238, a: cross(238), l: KNEES }),
    'crunch-inverso': SUP({ a: [[95, 90]], l: [[150, 60]] }, { torso: 280, a: [[95, 90]], l: [[196, 110]] }, { anchor: ['shoulder', [128, 186]] }),
    'elevacion-piernas': SUP({ a: [[92, 90]], l: [[97, 97, 185]] }, { a: [[92, 90]], l: [[172, 172, 262]] }),
    'plancha': S(Object.assign({}, PLANK_HI, { anchor: ['elbow', [205, 191]],
      A: { torso: 104, a: [[0, 90]], l: [[-76, -76, 0]] }, B: { torso: 105, a: [[0, 90]], l: [[-75, -75, 0]] } })),
    'plancha-lateral': S(Object.assign({}, PLANK_HI, { anchor: ['elbow', [205, 191]],
      A: { torso: 116, a: [[0, 90]], l: [[-84, -84, 0]] }, B: { torso: 105, a: [[0, 90]], l: [[-75, -75, 0]] } })),
    'bicicleta': SUP({ torso: 246, a: [[215, 320]], l: [[140, 70], [100, 98]] }, { torso: 250, a: [[215, 320]], l: [[100, 98], [140, 70]] }),
    'russian-twist': F({ anchor: ['hip', [160, 170]], floor: 198, vb: '40 60 240 146', props: [MAT, { type: 'db', at: 'hands' }],
      A: { a: [[35, 62], [-48, -80]], l: [[40, -40, 0, .45]] }, B: { a: [[-48, -80], [35, 62]], l: [[40, -40, 0, .45]] } }),
    'dead-bug': SUP({ a: [[180, 180], [180, 180]], l: [[180, 90], [180, 90]] }, { a: [[262, 262], [180, 180]], l: [[180, 90], [96, 96]] }),
    'mountain-climbers': S(Object.assign({}, PLANK_HI, {
      A: { torso: 116, a: [[0, 0]], l: [[-64, -64, -10], [-64, -64, -10]] },
      B: { torso: 113, a: [[2, 2]], l: [[100, -35], [-65, -65, -10]] } })),
    'puente': S({ anchor: ['ankle', [200, 191]], floor: 198, vb: '40 70 250 136', props: [MAT],
      A: { torso: 270, a: [[95, 90]], l: [[130, 30, 90]] }, B: { torso: 299, a: [[118, 100]], l: [[100, 20, 90]] } }),
    'superman': S({ anchor: ['hip', [150, 188]], floor: 198, vb: '40 70 250 136', props: [MAT],
      A: { torso: 90, a: [[90, 90]], l: [[-90, -90, 0]] }, B: { torso: 99, a: [[102, 102]], l: [[-100, -100, -10]] } }),
    'hollow': SUP({ torso: 258, a: [[252, 252]], l: [[100, 100, 190]] }, { torso: 254, a: [[248, 248]], l: [[104, 104, 194]] }),
    'toques-talon': SUP({ torso: 250, a: [[88, 86]], l: KNEES }, { torso: 246, a: [[76, 72]], l: KNEES }),
    'flexiones': S(Object.assign({}, PLANK_HI, {
      A: { torso: 103, a: [[-95, 30]], l: [[-77, -77, -5]] }, B: { torso: 115, a: [[0, 0]], l: [[-65, -65, -5]] } }))
  });

  /* ---------- Cajón ---------- */
  const BOX = (x, w, top) => ({ type: 'box', x, w, top });
  register('cajon', {
    'step-up': S({ anchor: ['ankle', [210, 150]], floor: 198, vb: '40 -14 250 216', props: [BOX(186, 64, 156)],
      A: { torso: 166, a: [[25, 40], [-20, -10]], l: [[85, -35], [-12, -5]] },
      B: { torso: 180, a: [[-10, 0], [10, 20]], l: [[0, 0], [70, -10]] } }),
    'salto': S({ anchor: ['toe', [150, 196]], floor: 198, vb: '40 -14 250 216', props: [BOX(206, 60, 150)],
      A: { torso: 135, a: [[-60, -40]], l: [[72, -32, 60]] }, B: { torso: 180, a: [[165, 170]], l: [[0, 0, 15]] } }),
    'bulgara-cajon': BULG(BOX(72, 56, 156)),
    'fondos': S({ anchor: ['hand', [110, 158]], floor: 198, props: [BOX(50, 66, 161)],
      A: { torso: 180, a: [[-80, 0]], l: [[85, 60]] }, B: { torso: 180, a: [[-15, -15]], l: [[75, 60]] } }),
    'flexiones-inclinadas': S({ anchor: ['hand', [204, 150]], floor: 198, props: [BOX(184, 64, 154)],
      A: { torso: 118, a: [[-110, 25]], l: [[-62, -62, -10]] }, B: { torso: 140, a: [[0, 0]], l: [[-40, -40, -10]] } }),
    'flexiones-declinadas': S({ anchor: ['hand', [222, 194]], floor: 198, props: [BOX(36, 82, 152)],
      A: { torso: 80, a: [[-100, 20]], l: [[-100, -100, -150]] }, B: { torso: 95, a: [[0, 0]], l: [[-85, -85, -140]] } }),
    'step-up-lateral': F({ anchor: ['ankle2', [180, 164]], floor: 198, vb: '40 -4 250 206', props: [BOX(160, 70, 170)],
      A: { a: [[15, 0]], l: [[-4, 0], [20, -14, 0, .45]] }, B: { a: [[15, 0]], l: [[-8, 20], [6, 0]] } })
  });

  /* ---------- Pesa rusa ---------- */
  const KB = { type: 'kb', at: 'hands' };
  register('pesa-rusa', {
    'sentadilla-sumo': F({ anchor: ['ankleL', [132, 190]], props: [KB],
      A: { a: [[-6, -6]], l: [[52, -20, 0, .8]] }, B: { a: [[-6, -6]], l: [[16, -2]] } }),
    'peso-muerto-sumo': S({ props: [KB], A: { torso: 125, a: [[0, 0]], l: [[62, -25]] }, B: { torso: 180, a: [[0, 0]], l: [[0, 0]] } }),
    'swing': S({ props: [{ type: 'kb', at: 'hand' }], period: 2600,
      A: { torso: 108, a: [[-28, -28]], l: [[26, -16]] }, B: { torso: 182, a: [[96, 96]], l: [[0, 0]] } }),
    'goblet': SQ({ type: 'kb', at: 'hands', r: 8 }),
    'remo': ROW1({ type: 'kb', at: 'hand' })
  });
})();
