/* ============================================================
   QrGym — "Cómo NO hacerlo": gráficos de los errores más comunes
   Cada error se muestra como un par ✅ Así / ❌ Así no.
   - Los de postura usan la misma figura animada: A = bien, B = mal
     (las marcas rojas solo aparecen en la versión "mal").
   - Los de pies usan las huellas de los diagramas de posición.
   ============================================================ */
const ErrorGfx = (() => {
  const { S, F, lie, LYING, register, getScene, staticSVG } = Anim;
  const MARK = (o) => Object.assign({ type: 'mark' }, o);
  const TORSO_MARK = (t = .25) => MARK({ seg: 'torso', t, side: 'back', off: 2, r: 12 });
  const cross = t => [[t - 150, t - 10]];

  /* Dirección del riel de la prensa (igual que la animación real) */
  let railDir = null;
  function prensaDir() {
    if (railDir) return railDir;
    try {
      staticSVG('prensa', { id: 'estandar', primary: [], secondary: [] }, 0);
      railDir = getScene('prensa', 'estandar')._rail.d;
    } catch (e) { railDir = [0.707, -0.707]; }
    return railDir;
  }

  /* ---------- Escenas de error (A = bien, B = mal) ---------- */
  let ready = false;
  function setup() {
    if (ready) return;
    ready = true;
    const PR = (A, B, mark) => S({
      anchor: ['hip', [118, 138]], floor: 196, vb: '30 38 240 158', vbPro: '46 40 216 142',
      props: [{ type: 'legpress', dir: prensaDir() }, MARK(mark)],
      A: Object.assign({ torso: 225, a: [[35, 70]] }, A), B: Object.assign({ torso: 225, a: [[35, 70]] }, B)
    });
    const SUPINE = (A, B, props) => S({ anchor: ['hip', [180, 186]], floor: 198, vb: '40 70 250 136',
      props: [{ type: 'mat', x1: 50, x2: 270 }, ...props], A: Object.assign({ torso: 270 }, A), B: Object.assign({ torso: 270 }, B) });
    const KNEES = [[120, 43, 90]];

    register('_err', {
      'prensa-bloqueo': PR({ l: [[160, 108, 214]] }, { l: [[141, 137, 228]] }, { at: 'knee' }),
      'prensa-cola': PR({ l: [[179, 88, 205]] }, { torso: 246, l: [[198, 78, 196]] }, { at: 'hip', dx: -4, dy: 6, r: 13 }),
      'sq-talones': S({ anchor: ['toe', [178, 196]], vb: '70 24 190 178', props: [MARK({ at: 'ankle', r: 9, dx: -3 })],
        A: { torso: 158, a: [[88, 88]], l: [[84, -26, 90]] }, B: { torso: 168, a: [[88, 88]], l: [[66, -48, 28]] } }),
      'sq-torso': S({ vb: '70 24 190 178', props: [TORSO_MARK(.3)],
        A: { torso: 160, a: [[88, 88]], l: [[84, -28]] }, B: { torso: 112, a: [[40, 40]], l: [[72, -22]] } }),
      'valgo': F({ anchor: ['ankleL', [132, 190]], vb: '70 24 180 178', props: [MARK({ at: 'knee', r: 9 }), MARK({ at: 'knee2', r: 9 })],
        A: { a: [[25, 150]], l: [[30, -12, 0, .75]] }, B: { a: [[25, 150]], l: [[2, 28, 0, .75]] } }),
      'zancada': S({ anchor: ['ankle', [186, 190]], vb: '70 24 190 178', 
        props: [{ type: 'guide', p1: 'toe', vertical: 110, when: 'both', cls: 'err-guide-n' }, MARK({ at: 'knee', r: 10 })],
        A: { a: [[0, 0]], l: [[86, -4], [-30, -96, 0]] }, B: { a: [[0, 0]], l: [[60, -52], [-4, -70, 0]] } }),
      'rumano': S({ vb: '70 24 190 178', props: [{ type: 'bar', r: 13 }, MARK({ at: 'hand', r: 16 })],
        A: { torso: 120, a: [[0, 0]], l: [[20, -5]] }, B: { torso: 120, a: [[44, 44]], l: [[20, -5]] } }),
      'swing': S({ vb: '70 24 190 178', props: [{ type: 'kb', at: 'hand' }, MARK({ at: 'knee', r: 10 })],
        A: { torso: 108, a: [[-28, -28]], l: [[26, -16]] }, B: { torso: 150, a: [[-4, -4]], l: [[82, -36]] } }),
      'press-cuello': lie({ a: [[70, 180]] }, { a: [[-12, 180]] }, { props: [...LYING.props, { type: 'bar' }, MARK({ at: 'hand', r: 18 })] }),
      'press-arco': S({ vb: '70 24 190 178', props: [{ type: 'db' }, TORSO_MARK(.2)],
        A: { torso: 180, a: [[170, 175]] }, B: { torso: 202, a: [[150, 168]], l: [[-6, 0]] } }),
      'curl': S({ vb: '70 24 190 178', props: [{ type: 'db' }, MARK({ at: 'elbow', r: 9 }), TORSO_MARK(.2)],
        A: { torso: 180, a: [[8, 160]] }, B: { torso: 202, a: [[52, 186]], l: [[-8, 0]] } }),
      'laterales': F({ vb: '50 24 220 178', props: [{ type: 'db', at: 'handL' }, { type: 'db', at: 'handR' }, MARK({ at: 'shoulder', r: 15, dy: -2 })],
        A: { a: [[88, 88]] }, B: { a: [[130, 130]], sh: 7 } }),
      'remo-erguido': S({ vb: '70 24 190 178', props: [{ type: 'db' }, TORSO_MARK(.3)],
        A: { torso: 118, a: [[-70, 10]], l: [[20, -10]] }, B: { torso: 156, a: [[-40, 52]], l: [[10, -5]] } }),
      'remo-balanceo': S({ anchor: ['hip', [110, 152]], floor: 196,
        props: [{ type: 'bench', x1: 56, x2: 172, top: 163 }, { type: 'rect', x: 196, y: 126, w: 8, h: 46, cls: 'eq-pad' },
          { type: 'rect', x: 204, y: 20, w: 26, h: 176, cls: 'eq-tower' }, TORSO_MARK(.3)],
        cables: [{ from: [208, 168], to: 'hand' }],
        A: { torso: 184, a: [[-45, 80]], l: [[82, 100]] }, B: { torso: 218, a: [[-15, 92]], l: [[82, 100]] } }),
      'jalon': S({ anchor: ['hip', [150, 142]], floor: 190,
        props: [{ type: 'seatpad', dx1: -12, dx2: 22 }, { type: 'roller', seg: 't', at: .8, side: 'front', off: 12, r: 7 },
          { type: 'frame', p1: [146, 16], p2: [252, 16], w: 6 }, { type: 'stack', x: 252, top: 16 }, TORSO_MARK(.3)],
        cables: [{ from: [146, 16], to: 'hand' }],
        A: { torso: 188, a: [[-20, 165]], l: [[90, 0]] }, B: { torso: 222, a: [[-62, 140]], l: [[90, 0]] } }),
      'pushdown': S({ towers: [['R', 'alta']], cables: [['R', 'alta', 'hand']], props: [MARK({ at: 'elbow', r: 10 })],
        A: { torso: 175, a: [[10, 8]] }, B: { torso: 148, a: [[58, 14]] } }),
      'fondos': S({ anchor: ['hand', [110, 158]], floor: 198, props: [{ type: 'bench', x1: 14, x2: 116, top: 161 }, MARK({ at: 'shoulder', r: 11 })],
        A: { torso: 180, a: [[-62, 0]], l: [[85, 60]] }, B: { torso: 176, a: [[-116, -8]], l: [[90, 60]] } }),
      'hip-thrust': S({ anchor: ['ankle', [196, 191]], floor: 199, props: [{ type: 'bench', x1: 14, x2: 118, top: 151 }, TORSO_MARK(.2)],
        A: { torso: 261, a: [[70, 95]], l: [[75, -15]] }, B: { torso: 286, a: [[70, 95]], l: [[60, -24]] } }),
      'crunch': SUPINE({ torso: 240, a: cross(240), l: KNEES }, { torso: 204, a: [[215, 320]], l: KNEES }, [MARK({ at: 'head', r: 11 })]),
      'plancha': S({ anchor: ['elbow', [205, 191]], floor: 198, vb: '40 70 250 136', props: [{ type: 'mat', x1: 50, x2: 270 }, MARK({ at: 'hip', r: 12 })],
        A: { torso: 99, a: [[0, 90]], l: [[-81, -81, -3]] }, B: { torso: 110, a: [[0, 90]], l: [[-88, -88, -10]] } }),
      'patada': S({ anchor: ['ankle2', [160, 184]], floor: 198, vb: '40 20 250 182',
        props: [{ type: 'rect', x: 110, y: 186, w: 120, h: 12, cls: 'eq-metal' }, { type: 'frame', p1: [256, 34], p2: [256, 198], w: 8 },
          { type: 'handle', at: 'hand' }, { type: 'roller', to: 'ankle', r: 7 }, TORSO_MARK(.2)],
        A: { torso: 148, a: [[62, 112]], l: [[-52, -48], [-4, 0]] }, B: { torso: 136, a: [[50, 100]], l: [[-92, -84], [-4, 0]] } })
    });
  }

  /* ---------- Huellas (bien / mal) ---------- */
  const arrow = (x1, y1, x2, y2, cls) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 9;
    const p1 = [x2 - h * Math.cos(a - .5), y2 - h * Math.sin(a - .5)], p2 = [x2 - h * Math.cos(a + .5), y2 - h * Math.sin(a + .5)];
    return `<g class="${cls}"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><path d="M${x2} ${y2} L${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z"/></g>`;
  };
  /* Dos pies sobre una base: dx = separación, rot = giro de puntas (+ afuera, − adentro),
     knees = flechas de hacia dónde van las rodillas */
  function feetSVG({ dx = 40, rot = 8, knees = 0, bad = false, label = '' }) {
    const cx = 130, y = 128;
    const cls = bad ? 'foot-bad' : '';
    let s = footprint(cx - dx, y, -rot, cls) + footprint(cx + dx, y, rot, cls, true);
    if (knees) {
      // Flechas: hacia dónde van las rodillas (siguen a las puntas = bien; se cierran = mal)
      const k = bad ? 'err-arrow' : 'ok-arrow', L = 46, r = d => d * Math.PI / 180;
      const aL = knees === 'in' ? r(25) : r(-rot), aR = knees === 'in' ? r(-25) : r(rot);
      s += arrow(cx - dx, y - 52, cx - dx + Math.sin(aL) * L, y - 52 - Math.cos(aL) * L, k);
      s += arrow(cx + dx, y - 52, cx + dx + Math.sin(aR) * L, y - 52 - Math.cos(aR) * L, k);
    }
    return `<svg viewBox="0 0 260 210" class="diagram err-feet">
      <rect x="10" y="10" width="240" height="190" rx="14" class="dg-plate"/>
      ${s}
      ${label ? `<text x="130" y="194" text-anchor="middle" class="dg-note">${label}</text>` : ''}
    </svg>`;
  }

  /* ---------- Catálogo de errores ---------- */
  const T = {
    'prensa-bajos': { title: 'Pies muy abajo en la plataforma',
      good: 'Pies al medio, todo el pie apoyado.', bad: 'Los talones se despegan y la rodilla pasa la punta del pie: carga de más en la rodilla.',
      svg: () => [prensaDiagram({ y: 'media', ancho: 'hombros' }), prensaDiagram({ y: 'borde', ancho: 'hombros' })] },
    'prensa-rodillas': { title: 'Rodillas que se cierran hacia adentro',
      good: 'Las rodillas siguen la dirección de las puntas.', bad: 'Puntas hacia adentro o rodillas que se juntan al empujar: lastima la rodilla.',
      svg: () => [feetSVG({ dx: 42, rot: 14, knees: 'out', label: 'rodillas → hacia las puntas' }), feetSVG({ dx: 42, rot: -24, knees: 'in', bad: true, label: 'rodillas hacia adentro' })] },
    'prensa-bloqueo': { pose: true, title: 'Trabar las rodillas arriba',
      good: 'Arriba dejá las rodillas apenas flexionadas.', bad: 'Estirar del todo y trabar la rodilla: el peso cae en la articulación.' },
    'prensa-cola': { pose: true, title: 'Bajar de más y despegar la cola',
      good: 'Bajá hasta unos 90° con cola y espalda apoyadas.', bad: 'Si bajás de más, la cadera se despega y se redondea la zona lumbar.' },
    'sq-pies': { title: 'Pies muy juntos y puntas hacia adentro',
      good: 'Pies al ancho de hombros, puntas un poco hacia afuera.', bad: 'Con los pies juntos y las puntas adentro perdés equilibrio y las rodillas se cierran.',
      svg: () => [feetSVG({ dx: 40, rot: 14, knees: 'out', label: 'ancho de hombros' }), feetSVG({ dx: 22, rot: -22, knees: 'in', bad: true, label: 'muy juntos' })] },
    'sumo-puntas': { title: 'Pies abiertos pero puntas al frente',
      good: 'En sumo las puntas van bien hacia afuera (30–45°).', bad: 'Si las puntas miran al frente, las rodillas se van hacia adentro al bajar.',
      svg: () => [feetSVG({ dx: 72, rot: 34, knees: 'out', label: 'puntas afuera' }), feetSVG({ dx: 72, rot: 0, knees: 'in', bad: true, label: 'puntas al frente' })] },
    'sq-talones': { pose: true, title: 'Levantar los talones',
      good: 'Todo el pie apoyado; la cadera va hacia atrás.', bad: 'Talones despegados y rodillas muy adelante: toda la carga va a la rodilla.' },
    'sq-torso': { pose: true, title: 'Tirar el pecho hacia adelante',
      good: 'Pecho alto y espalda recta.', bad: 'El torso se cae hacia adelante y la zona lumbar hace la fuerza.' },
    'valgo': { pose: true, title: 'Rodillas hacia adentro',
      good: 'Rodillas alineadas con las puntas de los pies.', bad: 'Las rodillas se juntan al subir (valgo): es la causa más común de dolor de rodilla.' },
    'zancada': { pose: true, title: 'Paso corto: la rodilla se va muy adelante',
      good: 'Paso largo: la rodilla queda arriba del pie y la de atrás baja al piso.', bad: 'Con el paso corto la rodilla pasa mucho la punta y se despega el talón.' },
    'rumano': { pose: true, title: 'Peso lejos del cuerpo',
      good: 'La barra o las mancuernas bajan rozando las piernas.', bad: 'Si el peso se aleja, la espalda baja hace toda la fuerza.' },
    'swing': { pose: true, title: 'Hacer el swing como una sentadilla',
      good: 'Cadera bien atrás, rodillas apenas flexionadas (bisagra).', bad: 'Bajar flexionando mucho las rodillas: se pierde la potencia de la cadera.' },
    'press-cuello': { pose: true, title: 'Bajar el peso hacia el cuello',
      good: 'Bajá a la mitad del pecho con los codos a ~45°.', bad: 'Codos abiertos en cruz y el peso cerca del cuello: mucha tensión en el hombro.' },
    'press-arco': { pose: true, title: 'Arquear la espalda para empujar',
      good: 'Abdomen firme y espalda neutra.', bad: 'Tirarse hacia atrás arqueando la zona lumbar.' },
    'curl': { pose: true, title: 'Balancear el cuerpo y adelantar el codo',
      good: 'Codo quieto al costado del cuerpo, torso firme.', bad: 'Tirarse hacia atrás y subir con impulso: trabaja la espalda, no el bíceps.' },
    'laterales': { pose: true, title: 'Subir de más y encoger los hombros',
      good: 'Subí hasta la altura de los hombros, cuello relajado.', bad: 'Por encima del hombro trabaja el trapecio y se pinza el hombro.' },
    'remo-erguido': { pose: true, title: 'Pararse mientras tirás',
      good: 'Torso inclinado y quieto todo el movimiento.', bad: 'Si te vas parando, trabaja el trapecio y la espalda baja.' },
    'remo-balanceo': { pose: true, title: 'Tirarse hacia atrás',
      good: 'Torso firme, apenas inclinado. Tiran los brazos y la espalda.', bad: 'Balancearse con el cuerpo para mover más peso.' },
    'jalon': { pose: true, title: 'Acostarse hacia atrás al tirar',
      good: 'Torso apenas inclinado, la barra baja al pecho alto.', bad: 'Tirarse mucho hacia atrás: se transforma en un remo con impulso.' },
    'pushdown': { pose: true, title: 'Codos que se mueven',
      good: 'Codos pegados al cuerpo; solo se mueve el antebrazo.', bad: 'Inclinarse y mover los codos: empuja el hombro y el pecho.' },
    'fondos': { pose: true, title: 'Bajar demasiado',
      good: 'Bajá hasta que el brazo quede paralelo al piso.', bad: 'Bajar de más lleva el hombro hacia adelante y lo lastima.' },
    'hip-thrust': { pose: true, title: 'Arquear la espalda arriba',
      good: 'Arriba: rodillas, cadera y hombros en línea, mentón metido.', bad: 'Subir de más arqueando la zona lumbar en vez de apretar el glúteo.' },
    'crunch': { pose: true, title: 'Tirar de la cabeza y subir de más',
      good: 'Despegá solo los omóplatos, manos sin tirar.', bad: 'Tirar del cuello con las manos y despegar la zona lumbar.' },
    'plancha': { pose: true, title: 'Dejar caer la cadera',
      good: 'Cuerpo en línea recta de la cabeza a los talones.', bad: 'Cadera caída: se carga la zona lumbar.' },
    'patada': { pose: true, title: 'Arquear la espalda para subir más',
      good: 'La pierna sube hasta donde llega la cadera, espalda quieta.', bad: 'Subir de más arqueando la espalda baja.' },
    'rango': { range: true, title: 'Recorrido a medias',
      good: 'Recorrido completo y controlado.', bad: 'Movimientos cortos y rápidos: trabajás la mitad del músculo.' }
  };

  /* ---------- Qué errores van con cada ejercicio ---------- */
  function keysFor(m, e) {
    const id = e.id, mid = m.id, k = [];
    const has = (re) => re.test(id);
    if (mid === 'prensa' && id !== 'gemelos') k.push('prensa-bajos', 'prensa-rodillas', 'prensa-bloqueo');
    else if (mid === 'hack') k.push(has(/sumo/) ? 'sumo-puntas' : 'sq-talones', 'valgo');
    else if (has(/sumo/) && (mid === 'smith' || mid === 'pesa-rusa')) k.push('sumo-puntas', 'valgo');
    else if (has(/sentadilla|goblet/) && !has(/bulgara/)) k.push('sq-talones', 'sq-torso', 'sq-pies');
    else if (has(/zancada|bulgara|step-up/)) k.push('zancada', 'valgo');
    else if (has(/swing/)) k.push('swing');
    else if (has(/rumano|peso-muerto|pull-through/)) k.push('rumano');
    else if (has(/hip-thrust|puente/) || mid === 'hip-thrust') k.push('hip-thrust');
    else if (has(/salto/)) k.push('valgo');
    else if (mid === 'gluteo-pie' || mid === 'patada-burro' || has(/patada-gluteo/)) k.push('patada');
    else if (has(/fondos/)) k.push('fondos');
    else if (has(/flexiones|plancha|mountain/)) k.push('plancha');
    else if (has(/crunch|sit-up|toques|bicicleta/) && mid !== 'poleas' && mid !== 'dorsalera') k.push('crunch');
    else if (has(/curl/) && !has(/femoral|inclinado|concentrado/) && mid !== 'scott') k.push('curl');
    else if (has(/lateral/) || mid === 'laterales-pie') k.push('laterales');
    else if (has(/militar/) || mid === 'press-hombros') k.push('press-arco');
    else if (has(/pushdown/) || (mid === 'dorsalera' && id === 'triceps')) k.push('pushdown');
    else if (mid === 'dorsalera' || mid === 'asistida' || has(/jalon/)) { if (mid === 'dorsalera' && id !== 'brazos-rectos') k.push('jalon'); }
    else if (mid === 'remo-polea-baja' || has(/remo-bajo/)) k.push('remo-balanceo');
    else if (has(/remo/) && (mid === 'remo-t' || mid === 'mancuernas' || mid === 'smith')) k.push('remo-erguido');
    else if ((mid === 'press-banca' || mid === 'smith' || mid === 'press-inclinado' || mid === 'mancuernas') &&
      has(/agarre|press-mancuernas|press-plano|press-inclinado|press-banca/) && !has(/remo|curl/)) k.push('press-cuello');
    if (k.length < 2) k.push('rango');
    return k.slice(0, 3);
  }

  /* ---------- Render ---------- */
  function poseSVG(key, ex, p) {
    return staticSVG('_err', { id: key, primary: ex.primary, secondary: ex.secondary }, p, 'anim-svg err-anim');
  }
  function rangeSVG(m, ex, a, b) {
    const ghost = staticSVG(m.id, ex, a, 'anim-svg err-anim err-ghost');
    const main = staticSVG(m.id, ex, b, 'anim-svg err-anim');
    return ghost && main ? `<div class="err-stack">${ghost}${main}</div>` : '';
  }

  function itemHTML(key, m, ex) {
    const t = T[key];
    let good, bad;
    if (t.svg) [good, bad] = t.svg();
    else if (t.range) {
      good = rangeSVG(m, ex, 0, 1); bad = rangeSVG(m, ex, .38, .62);
      if (!good) return '';
    } else { good = poseSVG(key, ex, 0); bad = poseSVG(key, ex, 1); }
    return `<article class="err-item">
      <h3 class="err-title">${t.title}</h3>
      <div class="err-pair">
        <figure class="err-fig ok"><figcaption><span class="err-badge">✓ Así</span></figcaption>${good}<p>${t.good}</p></figure>
        <figure class="err-fig bad"><figcaption><span class="err-badge">✕ Así no</span></figcaption>${bad}<p>${t.bad}</p></figure>
      </div>
    </article>`;
  }

  function html(m, ex) {
    setup();
    return keysFor(m, ex).map(k => itemHTML(k, m, ex)).join('');
  }

  return { html, keysFor, T };
})();
