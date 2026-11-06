/* ============================================================
   QrGym — Animaciones de las máquinas adicionales
   ============================================================ */
(() => {
  const { S, F, lie, LYING, PRESS, register } = Anim;
  const SM = (at = 'hand', dy = 0) => ({ type: 'smith', at, dy });
  const SEAT = [{ type: 'backpad' }, { type: 'seatpad' }];

  /* ---------- Smith ---------- */
  const SQ_A = { torso: 160, a: [[-70, 150]], l: [[82, -28]] };
  const SQ_B = { torso: 180, a: [[-70, 160]], l: [[0, 0]] };
  const INC = (A, B, props) => S({
    anchor: ['hip', [180, 140]], floor: 201,
    A: Object.assign({ torso: 235, l: [[70, 0]] }, A), B: Object.assign({ torso: 235, l: [[70, 0]] }, B),
    props: [{ type: 'backpad', a: -4, b: 16 }, { type: 'seatpad', dx1: -10, dx2: 22 }, ...props]
  });
  const SEATED = (A, B, props, extra) => S(Object.assign({
    anchor: ['hip', [150, 140]], floor: 186,
    A: Object.assign({ torso: 180, l: [[90, 0]] }, A), B: Object.assign({ torso: 180, l: [[90, 0]] }, B),
    props: [...SEAT, ...props]
  }, extra));
  const HT = {
    anchor: ['ankle', [196, 191]], floor: 199,
    A: { torso: 234, a: [[45, 70]], l: [[112, 0]] }, B: { torso: 261, a: [[70, 95]], l: [[75, -15]] }
  };

  register('smith', {
    'sentadilla': S({ A: SQ_A, B: SQ_B, props: [SM()] }),
    'sentadilla-pies-adelantados': S({ anchor: ['ankle', [178, 190]], props: [SM()],
      A: { torso: 175, a: [[-70, 150]], l: [[88, -5]] }, B: { torso: 182, a: [[-70, 160]], l: [[35, 20]] } }),
    'sentadilla-sumo': S({ props: [SM()], A: { torso: 168, a: [[-70, 150]], l: [[78, -20]] }, B: SQ_B }),
    'zancada': S({ anchor: ['ankle', [192, 190]], props: [SM()],
      A: { torso: 180, a: [[-70, 155]], l: [[80, -30], [-5, -90, 0]] },
      B: { torso: 180, a: [[-70, 160]], l: [[25, -25], [-30, -55, 10]] } }),
    'bulgara': S({ anchor: ['ankle', [195, 190]], props: [{ type: 'bench', x1: 70, x2: 128, top: 156 }, SM()],
      A: { torso: 172, a: [[-70, 155]], l: [[80, -30], [-15, -130, -60]] },
      B: { torso: 180, a: [[-70, 160]], l: [[25, -25], [-40, -85, -30]] } }),
    'press-banca-smith': lie(PRESS.A, PRESS.B, { props: [...LYING.props, { type: 'bar' }, SM()] }),
    'press-inclinado-smith': INC({ a: [[95, 175]] }, { a: [[165, 170]] }, [{ type: 'bar' }, SM()]),
    'press-militar-smith': SEATED({ a: [[40, 175]] }, { a: [[170, 175]] }, [{ type: 'bar', r: 12 }, SM()]),
    'remo-inclinado-smith': S({ props: [{ type: 'bar' }, SM()],
      A: { torso: 118, a: [[0, 0]], l: [[20, -10]] }, B: { torso: 118, a: [[-70, 10]], l: [[20, -10]] } }),
    'peso-muerto-rumano': S({ props: [{ type: 'bar' }, SM()],
      A: { torso: 120, a: [[0, 0]], l: [[20, -5]] }, B: { torso: 180, a: [[0, 0]], l: [[0, 0]] } }),
    'hip-thrust-smith': S(Object.assign({}, HT, { props: [{ type: 'bench', x1: 14, x2: 118, top: 151 }, SM('hip', -15)] })),
    'gemelos-smith': S({ anchor: ['toe', [178, 182]], floor: 198,
      props: [{ type: 'rect', x: 160, y: 184, w: 45, h: 14, cls: 'eq-metal' }, SM()],
      A: { torso: 180, a: [[-70, 160]], l: [[0, 0, 115]] }, B: { torso: 180, a: [[-70, 160]], l: [[0, 0, 58]] } }),
    'remo-menton-smith': S({ props: [{ type: 'bar' }, SM()], A: { a: [[5, 5]] }, B: { a: [[-100, 55]] } }),
    'encogimientos': S({ props: [{ type: 'bar' }, SM()], A: { a: [[0, 0]] }, B: { a: [[0, 0]], sh: 8 } })
  });

  /* ---------- Curl femoral (boca abajo) ---------- */
  const PRONE = (Bnear, far) => S({
    anchor: ['hip', [170, 118]], floor: 190, vb: '20 45 260 170',
    props: [{ type: 'bench', x1: 120, x2: 252, top: 130 }, { type: 'stack', x: 40, top: 40 },
      { type: 'roller', seg: 's', at: .9, side: 'back', arm: true }],
    A: { torso: 90, a: [[15, 40]], l: [[-90, -90], far || [-90, -90]] },
    B: { torso: 90, a: [[15, 40]], l: [Bnear, far || Bnear] }
  });
  register('curl-femoral', {
    _default: PRONE([-90, -205]),
    'unilateral': PRONE([-90, -205], [-90, -90])
  });

  /* ---------- Sillón de cuádriceps ---------- */
  const EXT = (far) => S({
    anchor: ['hip', [130, 140]], floor: 190, vb: '60 45 230 151',
    props: [{ type: 'backpad', a: -6, b: 10 }, { type: 'seatpad', dx1: -14, dx2: 36 }, { type: 'stack', x: 270, top: 50 },
      { type: 'roller', seg: 's', at: .86, side: 'front', arm: true }],
    A: { torso: 188, a: [[10, 40]], l: [[90, -8], far || [90, -8]] },
    B: { torso: 188, a: [[10, 40]], l: [[90, 82], far || [90, 82]] }
  });
  register('extension-cuadriceps', { _default: EXT(), 'unilateral': EXT([90, -8]) });

  /* ---------- Abductores / aductores (de frente, sentado) ---------- */
  const ABD = (tA, tB, side) => F({
    anchor: ['hip', [160, 122]], floor: 192,
    props: [{ type: 'rect', x: 132, y: 54, w: 56, h: 64, cls: 'eq-pad' }, { type: 'rect', x: 118, y: 120, w: 84, h: 12, cls: 'eq-pad' },
      { type: 'frame', p1: [160, 132], p2: [160, 192] },
      { type: 'roller', both: true, seg: 't', at: 1, side, off: 11, r: 7 }],
    A: { a: [[15, 0]], l: [[tA, 0, 0, .55]] }, B: { a: [[15, 0]], l: [[tB, 0, 0, .55]] }
  });
  register('abductores', {
    'abduccion': ABD(6, 42, 'out'), 'abduccion-inclinado': ABD(6, 40, 'out'),
    'aduccion': ABD(42, 6, 'in'), 'aduccion-pausa': ABD(42, 6, 'in')
  });

  /* ---------- Gemelos ---------- */
  const CALF = (far) => S({
    anchor: ['toe', [178, 180]], floor: 196,
    props: [{ type: 'rect', x: 165, y: 182, w: 45, h: 14, cls: 'eq-metal' }, { type: 'rect', x: 96, y: 18, w: 14, h: 178, cls: 'eq-tower' },
      { type: 'lever', pivot: [103, 40], to: 'shoulder' }, { type: 'padAt', to: 'shoulder', dx1: -12, dx2: 14, dy: -9 }],
    A: { torso: 180, a: [[-20, 170]], l: [[0, 0, 115], far || [0, 0, 115]] },
    B: { torso: 180, a: [[-20, 170]], l: [[0, 0, 58], far || [0, 0, 58]] }
  });
  register('gemelos', {
    _default: CALF(),
    'una-pierna': CALF([10, -70]),
    'sentado': S({
      anchor: ['hip', [130, 140]], floor: 190,
      props: [...SEAT, { type: 'rect', x: 168, y: 181, w: 34, h: 9, cls: 'eq-metal' }, { type: 'roller', seg: 't', at: .9, side: 'front', off: 12, r: 7 }],
      A: { torso: 180, a: [[30, 60]], l: [[90, 0, 105]] }, B: { torso: 180, a: [[30, 60]], l: [[100, 0, 50]] }
    })
  });

  /* ---------- Dorsalera ---------- */
  const LAT = (A, B, far) => S({
    anchor: ['hip', [150, 142]], floor: 190,
    props: [{ type: 'seatpad', dx1: -12, dx2: 22 }, { type: 'roller', seg: 't', at: .8, side: 'front', off: 12, r: 7 },
      { type: 'frame', p1: [146, 16], p2: [252, 16], w: 6 }, { type: 'stack', x: 252, top: 16 }],
    cables: [{ from: [146, 16], to: 'hand' }],
    A: { torso: 188, a: [A, far || A], l: [[90, 0]] }, B: { torso: 188, a: [B, far || B], l: [[90, 0]] }
  });
  register('dorsalera', {
    'agarre-ancho': LAT([172, 178], [-20, 165]),
    'agarre-cerrado': LAT([175, 180], [-30, 155]),
    'agarre-supino': LAT([175, 180], [-30, 155]),
    'una-mano': S(Object.assign(LAT([172, 178], [-25, 160]), {
      A: { torso: 188, a: [[172, 178], [5, 5]], l: [[90, 0]] }, B: { torso: 188, a: [[-25, 160], [5, 5]], l: [[90, 0]] } })),
    'brazos-rectos': S({ anchor: ['ankle', [140, 190]], cables: [{ from: [212, 16], to: 'hand' }],
      props: [{ type: 'frame', p1: [212, 16], p2: [252, 16], w: 6 }, { type: 'stack', x: 252, top: 16 }],
      A: { torso: 160, a: [[150, 150]], l: [[10, -5]] }, B: { torso: 160, a: [[10, 10]], l: [[10, -5]] } }),
    'triceps': S({ anchor: ['ankle', [150, 190]], cables: [{ from: [200, 16], to: 'hand' }],
      props: [{ type: 'frame', p1: [200, 16], p2: [252, 16], w: 6 }, { type: 'stack', x: 252, top: 16 }],
      A: { torso: 175, a: [[10, 150]] }, B: { torso: 175, a: [[10, 8]] } }),
    'crunch': S({ anchor: ['knee', [150, 186]], floor: 193, cables: [{ from: [205, 16], to: 'hand' }],
      props: [{ type: 'frame', p1: [205, 16], p2: [252, 16], w: 6 }, { type: 'stack', x: 252, top: 16 }],
      A: { torso: 178, a: [[150, 205]], l: [[0, -90]] }, B: { torso: 110, a: [[80, 135]], l: [[0, -90]] } })
  });

  /* ---------- Remo en polea baja ---------- */
  const ROW = (aA, aB, tA = 165, tB = 185, far) => S({
    anchor: ['hip', [110, 152]], floor: 196,
    props: [{ type: 'bench', x1: 56, x2: 172, top: 163 }, { type: 'rect', x: 196, y: 126, w: 8, h: 46, cls: 'eq-pad' },
      { type: 'rect', x: 204, y: 20, w: 26, h: 176, cls: 'eq-tower' }],
    cables: [{ from: [208, 168], to: 'hand' }],
    A: { torso: tA, a: [aA, far || aA], l: [[82, 100]] }, B: { torso: tB, a: [aB, far || aB], l: [[82, 100]] }
  });
  register('remo-polea-baja', {
    'triangulo': ROW([85, 85], [-45, 80]),
    'agarre-ancho': ROW([85, 85], [-75, 90]),
    'agarre-supino': ROW([85, 85], [-45, 80]),
    'una-mano': ROW([85, 85], [-50, 80], 165, 185, [30, 40]),
    'face-pull': ROW([95, 95], [-100, 150], 180, 182)
  });

  /* ---------- Remo en T ---------- */
  const TROW = S({
    anchor: ['ankle', [170, 190]], props: [{ type: 'lever', pivot: [36, 194], to: 'hand', w: 6 }, { type: 'bar', r: 15 }],
    A: { torso: 132, a: [[2, 2]], l: [[25, -15]] }, B: { torso: 132, a: [[-70, 10]], l: [[25, -15]] }
  });
  register('remo-t', { _default: TROW });

  /* ---------- Pec deck (de frente) ---------- */
  const PEC = (A, B) => F({
    anchor: ['hip', [160, 128]], floor: 192,
    props: [{ type: 'rect', x: 136, y: 52, w: 48, h: 70, cls: 'eq-pad' }, { type: 'rect', x: 124, y: 124, w: 72, h: 12, cls: 'eq-pad' },
      { type: 'frame', p1: [160, 136], p2: [160, 192] }, { type: 'frame', p1: [110, 26], p2: [210, 26], w: 6 },
      { type: 'lever', pivot: [128, 26], to: 'handL' }, { type: 'lever', pivot: [192, 26], to: 'handR' }],
    A: Object.assign({ l: [[10, 0, 0, .5]] }, A), B: Object.assign({ l: [[10, 0, 0, .5]] }, B)
  });
  register('pec-deck', {
    'aperturas': PEC({ a: [[88, 92]] }, { a: [[80, 85]], sc: .3 }),
    'aperturas-codos': PEC({ a: [[90, 180]] }, { a: [[90, 180]], sc: .35 }),
    'un-brazo': PEC({ a: [[88, 92]] }, { a: [[80, 85], [88, 92]], sc: .3, sc2: 1 }),
    'pajaro': PEC({ a: [[85, 85]], sc: .3 }, { a: [[90, 90]], sc: 1 }),
    'pajaro-un-brazo': PEC({ a: [[85, 85]], sc: .3 }, { a: [[90, 90], [85, 85]], sc: 1, sc2: .3 })
  });

  /* ---------- Press inclinado (banco) ---------- */
  const RACK = { type: 'frame', p1: [118, 40], p2: [118, 201] };
  register('press-inclinado', {
    'agarre-medio': INC({ a: [[95, 175]] }, { a: [[165, 170]] }, [RACK, { type: 'bar' }]),
    'agarre-cerrado': INC({ a: [[70, 175]] }, { a: [[165, 170]] }, [RACK, { type: 'bar' }]),
    'agarre-ancho': INC({ a: [[95, 175]] }, { a: [[165, 170]] }, [RACK, { type: 'bar' }]),
    'mancuernas': INC({ a: [[95, 175]] }, { a: [[165, 170]] }, [{ type: 'db' }]),
    'aperturas': INC({ a: [[168, 168]], sc: .32 }, { a: [[168, 168]], sc: 1 }, [{ type: 'db' }]),
    'remo-apoyado': S({ anchor: ['ankle', [100, 190]],
      props: [{ type: 'chestpad', a: 2, b: 12, off: 14 }, { type: 'db' }],
      A: { torso: 135, a: [[0, 0]], l: [[25, -10]] }, B: { torso: 135, a: [[-60, 10]], l: [[25, -10]] } }),
    'curl-inclinado': INC({ a: [[0, 0]] }, { a: [[0, 160]] }, [{ type: 'db' }])
  });

  /* ---------- Patada burro ---------- */
  const KICK = (A, B) => S({
    anchor: ['knee2', [150, 172]], floor: 192,
    props: [{ type: 'rect', x: 108, y: 179, w: 62, h: 9, cls: 'eq-pad' }, { type: 'rect', x: 192, y: 158, w: 46, h: 9, cls: 'eq-pad' },
      { type: 'frame', p1: [140, 188], p2: [140, 192] }, { type: 'frame', p1: [215, 167], p2: [215, 192] },
      { type: 'roller', to: 'ankle', r: 7 }],
    A: { torso: 100, a: [[0, 90]], l: [A, [0, -90, 0]] }, B: { torso: 100, a: [[0, 90]], l: [B, [0, -90, 0]] }
  });
  register('patada-burro', {
    'pierna-estirada': KICK([30, -60], [-75, -80]),
    'rodilla-90': KICK([30, -60], [-80, 175]),
    'pulsos': KICK([-50, -70], [-78, -82])
  });

  /* ---------- Hip thrust máquina ---------- */
  const HTM = (far) => S(Object.assign({}, HT, {
    props: [{ type: 'bench', x1: 30, x2: 118, top: 151 }, { type: 'rect', x: 168, y: 196, w: 60, h: 4, cls: 'eq-metal' },
      { type: 'lever', pivot: [96, 92], to: 'hip' }, { type: 'padAt', to: 'hip', dx1: -14, dx2: 16, dy: -13, w: 10 }],
    A: Object.assign({}, HT.A, { l: [HT.A.l[0], far || HT.A.l[0]] }),
    B: Object.assign({}, HT.B, { l: [HT.B.l[0], far || HT.B.l[0]] })
  }));
  register('hip-thrust', { _default: HTM(), 'una-pierna': S(Object.assign(HTM(), {
    A: { torso: 234, a: [[45, 70]], l: [[112, 0], [140, 120]] }, B: { torso: 261, a: [[70, 95]], l: [[75, -15], [110, 110]] } })) });

  /* ---------- Remo independiente ---------- */
  const ISO = (aB, far) => S({
    anchor: ['hip', [120, 142]], floor: 190,
    props: [{ type: 'seatpad', dx1: -14, dx2: 22 }, { type: 'chestpad', a: 22, b: 6, off: 15 }, { type: 'lever', pivot: [232, 32], to: 'hand' },
      { type: 'frame', p1: [232, 32], p2: [232, 190], w: 6 }, { type: 'handle' }],
    A: { torso: 172, a: [[92, 92], far || [92, 92]], l: [[90, 0]] }, B: { torso: 172, a: [aB, far || aB], l: [[90, 0]] }
  });
  register('remo-independiente', {
    'agarre-neutro': ISO([-45, 85]), 'agarre-prono': ISO([-75, 92]),
    'un-brazo': ISO([-45, 85], [92, 92]), 'remo-alto': ISO([-95, 120])
  });

  /* ---------- Press de pecho máquina ---------- */
  const CHEST = (far) => S({
    anchor: ['hip', [110, 142]], floor: 190,
    props: [...SEAT, { type: 'lever', pivot: [222, 28], to: 'hand' }, { type: 'frame', p1: [222, 28], p2: [222, 190], w: 6 }, { type: 'handle' }],
    A: { torso: 182, a: [[-60, 92], far || [-60, 92]], l: [[90, 0]] }, B: { torso: 182, a: [[88, 88], far || [88, 88]], l: [[90, 0]] }
  });
  register('press-pecho', { _default: CHEST(), 'un-brazo': CHEST([-60, 92]) });

  /* ---------- Press de hombros máquina ---------- */
  const SHP = (far) => S({
    anchor: ['hip', [140, 142]], floor: 190,
    props: [...SEAT, { type: 'lever', pivot: [72, 52], to: 'hand' }, { type: 'frame', p1: [72, 52], p2: [72, 190], w: 6 }, { type: 'handle' }],
    A: { torso: 180, a: [[40, 175], far || [40, 175]], l: [[90, 0]] }, B: { torso: 180, a: [[170, 175], far || [170, 175]], l: [[90, 0]] }
  });
  register('press-hombros', { _default: SHP(), 'un-brazo': SHP([40, 175]) });

  /* ---------- Hack ---------- */
  register('hack', {
    _default: S({ anchor: ['ankle', [190, 190]],
      props: [{ type: 'frame', p1: [112, 20], p2: [112, 198], w: 6 }, { type: 'backpad', a: -4, b: 10, leg: false },
        { type: 'frame', p1: [168, 197], p2: [228, 187], w: 6 }, { type: 'padAt', to: 'shoulder', dx1: -10, dx2: 12, dy: -9 }],
      A: { torso: 200, a: [[-60, 160]], l: [[88, -5]] }, B: { torso: 200, a: [[-60, 165]], l: [[35, 20]] } })
  });

  /* ---------- Asistida ---------- */
  const BARFRAME = [{ type: 'frame', p1: [110, 22], p2: [225, 22], w: 6 }, { type: 'frame', p1: [225, 22], p2: [225, 196], w: 6 }];
  register('asistida', {
    _default: S({ anchor: ['hand', [165, 24]], floor: 196,
      props: [...BARFRAME, { type: 'lever', pivot: [225, 170], to: 'knee' }, { type: 'padAt', to: 'knee', dx1: -42, dx2: 8, dy: 9 }],
      A: { torso: 180, a: [[180, 180]], l: [[0, -90]] }, B: { torso: 180, a: [[15, 175]], l: [[0, -90]] } }),
    'fondos': S({ anchor: ['hand', [165, 110]], floor: 196,
      props: [{ type: 'frame', p1: [150, 112], p2: [196, 112], w: 6 }, { type: 'frame', p1: [196, 112], p2: [196, 196], w: 6 },
        { type: 'lever', pivot: [225, 196], to: 'knee' }, { type: 'padAt', to: 'knee', dx1: -42, dx2: 8, dy: 9 }],
      A: { torso: 180, a: [[-80, 0]], l: [[0, -90]] }, B: { torso: 180, a: [[0, 0]], l: [[0, -90]] } })
  });

  /* ---------- Lumbares ---------- */
  register('lumbares', {
    _default: S({ anchor: ['ankle', [62, 150]], floor: 196,
      props: [{ type: 'frame', p1: [64, 160], p2: [122, 102], w: 6 }, { type: 'frame', p1: [66, 158], p2: [66, 196] }, { type: 'frame', p1: [108, 116], p2: [108, 196] }, { type: 'frame', p1: [50, 196], p2: [124, 196] },
        { type: 'padAlong', seg: 't', from: -.05, to: .45, side: 'front', off: 12, w: 10 },
        { type: 'roller', seg: 's', at: .98, side: 'back', off: 9, r: 6 }],
      A: { torso: 25, a: [[-130, 110]], l: [[-45, -45]] }, B: { torso: 132, a: [[-25, 220]], l: [[-45, -45]] } })
  });

  /* ---------- Scott ---------- */
  const SCOTT = (tool) => S({
    anchor: ['hip', [110, 148]], floor: 190,
    props: [{ type: 'seatpad', dx1: -12, dx2: 20 }, { type: 'padAlong', seg: 'u', from: .05, to: 1.05, side: 'back', off: 10, w: 9 },
      { type: 'frame', p1: [132, 128], p2: [132, 190] }, tool],
    A: { torso: 172, a: [[45, 30]], l: [[90, 0]] }, B: { torso: 172, a: [[45, 165]], l: [[90, 0]] }
  });
  register('scott', { _default: SCOTT({ type: 'bar', r: 11 }), 'mancuerna': SCOTT({ type: 'db' }), 'martillo': SCOTT({ type: 'db' }) });

  /* ---------- Silla romana ---------- */
  const ROMAN = (B) => S({
    anchor: ['shoulder', [160, 60]], floor: 196,
    props: [{ type: 'backpad', a: 6, b: 4, off: 13 }, { type: 'padAlong', seg: 'f', from: -.1, to: 1.1, side: 'back', off: 7, w: 8 },
      { type: 'frame', p1: [137, 96], p2: [137, 196], w: 6 }],
    A: { torso: 180, a: [[0, 90]], l: [[0, 0]] }, B: Object.assign({ torso: 180, a: [[0, 90]] }, B)
  });
  register('silla-romana', {
    'rodillas': ROMAN({ l: [[95, 0]] }), 'piernas-rectas': ROMAN({ l: [[88, 88]] }), 'oblicuas': ROMAN({ l: [[90, 5]] })
  });
})();
