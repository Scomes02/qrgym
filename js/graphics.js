/* ============================================================
   QrGym — Ilustraciones SVG
   - Mapa muscular (frente / espalda)
   - Diagramas de posición (prensa, banca, poleas)
   - Íconos de máquinas
   ============================================================ */

const MIRROR = 'transform="translate(200,0) scale(-1,1)"';

/* Silueta base (lado izquierdo, se espeja) */
const BODY_BASE_HALF = `
  <path d="M100 56 L82 58 L64 66 L58 80 L60 102 L68 124 L72 172 L100 178 Z"/>
  <ellipse cx="57" cy="112" rx="11" ry="26"/>
  <ellipse cx="50" cy="152" rx="9" ry="22" transform="rotate(8 50 152)"/>
  <ellipse cx="46" cy="183" rx="6" ry="9"/>
  <path d="M100 170 L72 168 L67 200 L70 242 L76 270 L95 270 L99 232 L100 200 Z"/>
  <ellipse cx="85" cy="300" rx="11" ry="32"/>
  <ellipse cx="84" cy="340" rx="11" ry="6"/>`;

/* Músculos — vista de frente (lado izquierdo) */
const FRONT = {
  trapecio:     '<path d="M91 56 L72 66 L91 64 Z"/>',
  deltoide_ant: '<ellipse cx="67" cy="81" rx="9" ry="13" transform="rotate(-18 67 81)"/>',
  deltoide_lat: '<ellipse cx="56" cy="84" rx="6" ry="12" transform="rotate(10 56 84)"/>',
  pecho_sup:    '<path d="M98 69 L77 72 Q70 78 70 89 L98 87 Z"/>',
  pecho_inf:    '<path d="M98 88 L70 90 Q70 102 78 107 Q90 111 98 105 Z"/>',
  biceps:       '<ellipse cx="57" cy="114" rx="8" ry="17"/>',
  antebrazo:    '<ellipse cx="50" cy="152" rx="7" ry="19" transform="rotate(8 50 152)"/>',
  abdomen:      '<path d="M88 112 h10 v14 h-10 Z M88 129 h10 v14 h-10 Z M88 146 h10 v24 q-6 0 -10 -6 Z"/>',
  oblicuos:     '<path d="M85 111 L75 113 Q71 140 78 166 L85 169 Z"/>',
  cuadriceps:   '<path d="M73 190 Q70 220 76 262 Q84 270 92 264 Q97 230 93 200 Q86 186 73 190 Z"/>',
  aductores:    '<path d="M99 190 Q90 198 93 238 L99 214 Z"/>',
  gemelos:      '<ellipse cx="83" cy="300" rx="7" ry="24"/>'
};

/* Músculos — vista de espalda (lado izquierdo) */
const BACK = {
  trapecio:      '<path d="M100 52 L76 68 L100 114 Z"/>',
  romboides:     '<path d="M99 76 L87 82 L99 102 Z"/>',
  deltoide_post: '<ellipse cx="67" cy="81" rx="9" ry="13" transform="rotate(18 67 81)"/>',
  deltoide_lat:  '<ellipse cx="56" cy="84" rx="6" ry="12" transform="rotate(10 56 84)"/>',
  triceps:       '<ellipse cx="57" cy="114" rx="8" ry="17"/>',
  antebrazo:     '<ellipse cx="50" cy="152" rx="7" ry="19" transform="rotate(8 50 152)"/>',
  dorsal:        '<path d="M77 90 Q65 114 77 154 L95 132 L91 104 Z"/>',
  lumbar:        '<ellipse cx="94" cy="152" rx="5" ry="18"/>',
  abductores:    '<ellipse cx="75" cy="180" rx="6" ry="11"/>',
  gluteos:       '<ellipse cx="88" cy="194" rx="13" ry="16"/>',
  isquios:       '<path d="M75 214 Q72 240 78 266 L94 266 Q98 238 96 214 Q86 208 75 214 Z"/>',
  gemelos:       '<ellipse cx="85" cy="298" rx="10" ry="24"/>'
};

function expandMuscles(list) {
  const out = [];
  (list || []).forEach(m => m === 'pecho' ? out.push('pecho_sup', 'pecho_inf') : out.push(m));
  return out;
}

/* Mapa muscular. opts: { size: 'sm'|'md', interactive: bool, selected: id } */
function bodySVG(view, primary, secondary, opts = {}) {
  const P = expandMuscles(primary), S = expandMuscles(secondary);
  const map = view === 'front' ? FRONT : BACK;
  const muscles = Object.entries(map).map(([id, shape]) => {
    let cls = 'mus';
    if (P.includes(id)) cls += ' mus-p';
    else if (S.includes(id)) cls += ' mus-s';
    if (opts.selected === id) cls += ' mus-sel';
    const attrs = opts.interactive ? ` data-m="${id}" tabindex="0" role="button" aria-label="${MUSCLES[id]}"` : '';
    return `<g class="${cls}"${attrs}><title>${MUSCLES[id]}</title>${shape}<g ${MIRROR}>${shape}</g></g>`;
  }).join('');
  const face = view === 'front'
    ? '<circle cx="100" cy="32" r="17" class="body-base"/>'
    : '<circle cx="100" cy="32" r="17" class="body-base"/><path d="M85 26 Q100 10 115 26 Q112 18 100 16 Q88 18 85 26Z" class="body-hair"/>';
  return `<svg viewBox="30 8 140 345" class="body body-${opts.size || 'md'}" aria-hidden="${opts.interactive ? 'false' : 'true'}">
    ${face}
    <rect x="92" y="46" width="16" height="14" class="body-base"/>
    <g class="body-base">${BODY_BASE_HALF}<g ${MIRROR}>${BODY_BASE_HALF}</g></g>
    ${muscles}
  </svg>`;
}

function bodyPair(primary, secondary, opts = {}) {
  return `<div class="body-pair">
    <figure>${bodySVG('front', primary, secondary, opts)}<figcaption>Frente</figcaption></figure>
    <figure>${bodySVG('back', primary, secondary, opts)}<figcaption>Espalda</figcaption></figure>
  </div>`;
}

/* ---------------- Diagrama PRENSA: plataforma + huellas ---------------- */
/* Huella de pie izquierdo (dedo gordo hacia adentro); right=true la espeja */
function footprint(x, y, rot, cls = '', right = false) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) ${right ? 'scale(-1,1)' : ''}" class="foot ${cls}">
    <ellipse cx="1" cy="-14" rx="13" ry="21"/>
    <ellipse cx="0" cy="20" rx="9.5" ry="12"/>
    <circle cx="8" cy="-40" r="4.4"/><circle cx="1" cy="-41" r="3.2"/><circle cx="-5" cy="-39" r="2.8"/><circle cx="-10" cy="-36" r="2.5"/><circle cx="-13.5" cy="-31" r="2.2"/>
  </g>`;
}

function prensaDiagram(pos) {
  const W = 260, H = 300;
  const yMap = { alta: 85, media: 150, baja: 215, borde: 278 };
  const xMap = { juntos: 16, hombros: 40, ancho: 72 };
  const y = yMap[pos.y] || 150;
  const rot = pos.puntas === 'afuera' ? 22 : 6;
  let feet = '';
  if (pos.ancho === 'uni') {
    feet = footprint(W / 2 - 40, y, -6) + footprint(W / 2 + 40, y, 6, 'foot-ghost', true);
  } else {
    const dx = xMap[pos.ancho] || 40;
    feet = footprint(W / 2 - dx, y, -rot) + footprint(W / 2 + dx, y, rot, '', true);
  }
  const zone = (label, yy, active) =>
    `<text x="250" y="${yy + 4}" class="dg-zone ${active ? 'on' : ''}">${active ? '◀ ' : ''}${label}</text>`;
  const LB = pos.labels || ['ALTA', 'MEDIA', 'BAJA'];
  return `<svg viewBox="0 0 ${W + 50} ${H}" class="diagram">
    <defs><clipPath id="plat"><rect x="20" y="20" width="220" height="250" rx="14"/></clipPath>
      <pattern id="grip" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10 L10 0" class="dg-grip"/></pattern></defs>
    <rect x="20" y="20" width="220" height="250" rx="14" class="dg-plate"/>
    <rect x="20" y="20" width="220" height="250" rx="14" fill="url(#grip)" opacity=".5"/>
    <line x1="20" y1="118" x2="240" y2="118" class="dg-dash"/>
    <line x1="20" y1="184" x2="240" y2="184" class="dg-dash"/>
    <line x1="130" y1="24" x2="130" y2="266" class="dg-dash"/>
    ${zone(LB[0], 70, pos.y === 'alta')}${zone(LB[1], 151, pos.y === 'media')}${zone(LB[2], 230, pos.y === 'baja')}
    <rect x="20" y="268" width="220" height="5" rx="2" class="dg-edge ${pos.y === 'borde' ? 'on' : ''}"/>
    <g clip-path="${pos.y === 'borde' ? '' : 'url(#plat)'}">${feet}</g>
    ${pos.y === 'borde' ? '<text x="130" y="296" text-anchor="middle" class="dg-note">talones en el aire ↓</text>' : ''}
  </svg>`;
}

/* ---------------- Diagrama BANCA: barra con agarre ---------------- */
function barraDiagram(pos) {
  const W = 320, H = 190, cx = 160;
  const dxMap = { cerrado: 38, medio: 62, ancho: 92 };
  const dx = dxMap[pos.ancho] || 62;
  const hand = (x, flip) => `<g transform="translate(${x} 70) ${flip ? 'scale(-1,1)' : ''}" class="hand ${pos.supino ? 'hand-sup' : ''}">
      <rect x="-9" y="-16" width="18" height="34" rx="8"/>
      <rect x="-11" y="-5" width="7" height="14" rx="3.5" class="thumb"/>
    </g>`;
  return `<svg viewBox="0 0 ${W} ${H}" class="diagram">
    <rect x="6" y="48" width="14" height="44" rx="3" class="dg-plate2"/>
    <rect x="22" y="42" width="12" height="56" rx="3" class="dg-plate2"/>
    <rect x="300" y="48" width="14" height="44" rx="3" class="dg-plate2"/>
    <rect x="286" y="42" width="12" height="56" rx="3" class="dg-plate2"/>
    <rect x="34" y="66" width="252" height="8" rx="4" class="dg-bar"/>
    <rect x="62" y="66" width="196" height="8" fill="url(#knurl)" />
    <defs><pattern id="knurl" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 4L4 0" class="dg-knurl"/></pattern></defs>
    <line x1="${cx - 81}" y1="60" x2="${cx - 81}" y2="80" class="dg-ring"/><line x1="${cx + 81}" y1="60" x2="${cx + 81}" y2="80" class="dg-ring"/>
    ${hand(cx - dx, false)}${hand(cx + dx, true)}
    <!-- referencia de hombros -->
    <circle cx="${cx}" cy="128" r="13" class="dg-person"/>
    <path d="M${cx - 44} 172 Q${cx - 44} 146 ${cx - 30} 146 L${cx + 30} 146 Q${cx + 44} 146 ${cx + 44} 172" class="dg-person"/>
    <line x1="${cx - 40}" y1="100" x2="${cx - 40}" y2="150" class="dg-dash"/><line x1="${cx + 40}" y1="100" x2="${cx + 40}" y2="150" class="dg-dash"/>
    <text x="${cx}" y="106" text-anchor="middle" class="dg-note">ancho de hombros</text>
    <text x="${cx}" y="30" text-anchor="middle" class="dg-label">${pos.supino ? 'Agarre SUPINO (palmas hacia vos)' : 'Agarre PRONO (palmas hacia adelante)'}</text>
  </svg>`;
}

/* ---------------- Diagrama BANCO: pose lateral ---------------- */
const POSES = {
  acostado: {
    segs: [[118,101,190,101],[190,101,232,104],[232,104,240,162],[135,98,135,58]],
    head: [108,97], tool: [135,54], contact: [[150,108],[185,108]], label: 'Acostado boca arriba'
  },
  transversal: {
    segs: [[112,103,165,124],[165,124,200,121],[200,121,206,162],[112,103,72,94]],
    head: [100,98], tool: [66,93], contact: [[118,108]], label: 'Espalda alta cruzada sobre el banco'
  },
  rodilla: {
    segs: [[195,82,135,78],[135,78,131,106],[195,82,203,106],[203,106,228,106],[195,82,188,124],[188,124,186,162],[142,80,144,126]],
    head: [122,72], tool: [144,130], contact: [[131,108],[214,108]], label: 'Rodilla y mano en el banco'
  },
  'manos-borde': {
    segs: [[112,82,110,132],[112,84,124,108],[110,132,62,130],[62,130,46,162]],
    head: [113,68], tool: null, contact: [[124,108]], label: 'Manos en el borde, de espaldas al banco'
  },
  escapulas: {
    segs: [[108,104,168,108],[168,108,206,112],[206,112,206,162]],
    head: [97,100], tool: [168,98], contact: [[106,108]], label: 'Omóplatos apoyados en el borde'
  }
};

function bancoDiagram(pos) {
  const p = POSES[pos.pose] || POSES.acostado;
  const segs = p.segs.map(s => `<line x1="${s[0]}" y1="${s[1]}" x2="${s[2]}" y2="${s[3]}"/>`).join('');
  const tool = p.tool ? `<g class="dg-tool"><rect x="${p.tool[0] - 13}" y="${p.tool[1] - 4}" width="26" height="8" rx="3"/><rect x="${p.tool[0] - 16}" y="${p.tool[1] - 8}" width="7" height="16" rx="2"/><rect x="${p.tool[0] + 9}" y="${p.tool[1] - 8}" width="7" height="16" rx="2"/></g>` : '';
  const contact = p.contact.map(c => `<circle cx="${c[0]}" cy="${c[1]}" r="7" class="dg-contact"/>`).join('');
  return `<svg viewBox="30 30 230 150" class="diagram">
    <line x1="30" y1="165" x2="260" y2="165" class="dg-floor"/>
    <rect x="100" y="108" width="130" height="10" rx="4" class="dg-bench"/>
    <rect x="110" y="118" width="7" height="47" class="dg-bench-leg"/><rect x="213" y="118" width="7" height="47" class="dg-bench-leg"/>
    <g class="dg-fig">${segs}<circle cx="${p.head[0]}" cy="${p.head[1]}" r="9"/></g>
    ${tool}${contact}
    <text x="145" y="48" text-anchor="middle" class="dg-label">${p.label}</text>
  </svg>`;
}

/* ---------------- Diagrama POLEAS ---------------- */
const ACC = {
  maneral:   { name: 'Maneral (agarre D)', svg: '<path d="M-14 -10 Q0 -26 14 -10" class="acc-line"/><rect x="-16" y="-10" width="32" height="10" rx="5" class="acc-fill"/>' },
  cuerda:    { name: 'Cuerda (tríceps)', svg: '<path d="M0 -24 L0 -14 M0 -14 Q-6 4 -12 20 M0 -14 Q6 4 12 20" class="acc-rope"/><circle cx="-12" cy="22" r="5" class="acc-fill"/><circle cx="12" cy="22" r="5" class="acc-fill"/>' },
  barra:     { name: 'Barra recta', svg: '<path d="M0 -24 L0 -6 M-16 -6 L0 -14 L16 -6" class="acc-line"/><rect x="-34" y="-6" width="68" height="8" rx="4" class="acc-fill"/>' },
  v:         { name: 'Maneral en V (agarre cerrado)', svg: '<path d="M0 -24 L0 -14" class="acc-line"/><path d="M-4 -14 L-14 14 M4 -14 L14 14" class="acc-thick"/><rect x="-20" y="12" width="14" height="7" rx="3" class="acc-fill"/><rect x="6" y="12" width="14" height="7" rx="3" class="acc-fill"/>' },
  tobillera: { name: 'Tobillera', svg: '<path d="M0 -24 L0 -12" class="acc-line"/><rect x="-16" y="-12" width="32" height="22" rx="8" class="acc-fill"/><rect x="-16" y="-4" width="32" height="5" class="acc-strap"/>' },
  sin:       { name: 'Sin accesorio (cable directo)', svg: '<path d="M0 -24 L0 6" class="acc-line"/><circle cx="0" cy="10" r="5" class="acc-fill"/>' }
};

function poleaDiagram(pos) {
  const hMap = { alta: 34, media: 92, baja: 150 };
  const hy = hMap[pos.alt] || 92;
  const tower = (x) => `
    <rect x="${x}" y="14" width="34" height="156" rx="5" class="dg-tower"/>
    ${[30,50,70,90,110,130,150].map(yy => `<circle cx="${x + 17}" cy="${yy}" r="2.2" class="dg-hole"/>`).join('')}
    <circle cx="${x + 17}" cy="${hy}" r="9" class="dg-pulley"/>`;
  const cableTo = (x1, x2) => `<line x1="${x1}" y1="${hy}" x2="${x2}" y2="96" class="dg-cable"/>`;
  const acc = ACC[pos.acc] || ACC.maneral;
  let body;
  if (pos.dual) {
    body = tower(8) + tower(278) + cableTo(34, 138) + cableTo(286, 182) +
      `<g transform="translate(138 120) scale(.8)">${acc.svg}</g><g transform="translate(182 120) scale(.8)">${acc.svg}</g>`;
  } else {
    body = tower(8) + cableTo(34, 160) + `<g transform="translate(160 120)">${acc.svg}</g>`;
  }
  const levels = ['alta', 'media', 'baja'].map((l, i) =>
    `<text x="${pos.dual ? 160 : 60}" y="${[34, 92, 150][i] + 4}" ${pos.dual ? 'text-anchor="middle"' : ''} class="dg-zone ${pos.alt === l ? 'on' : ''}">${l.toUpperCase()}</text>`).join('');
  return `<svg viewBox="0 0 320 180" class="diagram">
    <line x1="0" y1="172" x2="320" y2="172" class="dg-floor"/>
    ${body}
    ${pos.dual ? `<g transform="translate(0 -18)">${levels}</g>` : levels}
  </svg>`;
}

function accName(pos) { return (ACC[pos.acc] || ACC.maneral).name; }

/* ---------------- Agarre en manijas (neutro / prono / un brazo) ---------------- */
function agarreDiagram(pos) {
  if (pos.grip !== 'neutro' && pos.ancho !== 'uno') return barraDiagram({ ancho: pos.ancho, supino: pos.grip === 'supino' });
  const W = 320, cx = 160;
  const dx = { cerrado: 16, medio: 58, ancho: 92, uno: 0 }[pos.ancho] ?? 58;
  const neutral = pos.grip === 'neutro';
  const handle = (x) => neutral
    ? `<rect x="${x - 4}" y="38" width="8" height="64" rx="4" class="dg-bar"/>`
    : `<rect x="${x - 32}" y="66" width="64" height="8" rx="4" class="dg-bar"/>`;
  const hand = (x, flip) => neutral
    ? `<g transform="translate(${x} 70) rotate(90) ${flip ? 'scale(1,-1)' : ''}" class="hand"><rect x="-9" y="-16" width="18" height="34" rx="8"/><rect x="-11" y="-5" width="7" height="14" rx="3.5" class="thumb"/></g>`
    : `<g transform="translate(${x} 70) ${flip ? 'scale(-1,1)' : ''}" class="hand"><rect x="-9" y="-16" width="18" height="34" rx="8"/><rect x="-11" y="-5" width="7" height="14" rx="3.5" class="thumb"/></g>`;
  let body;
  if (pos.ancho === 'uno') {
    body = handle(cx) + hand(cx, false);
  } else if (neutral && pos.ancho === 'cerrado') {
    body = `<path d="M${cx} 22 L${cx - 20} 98 M${cx} 22 L${cx + 20} 98" class="dg-vbar"/>` + hand(cx - 20, false) + hand(cx + 20, true);
  } else {
    body = handle(cx - dx) + handle(cx + dx) + hand(cx - dx, false) + hand(cx + dx, true);
  }
  const label = pos.ancho === 'uno' ? 'UN BRAZO / UNA MANIJA'
    : neutral ? (pos.ancho === 'cerrado' ? 'Agarre NEUTRO cerrado (triángulo / V)' : 'Agarre NEUTRO (palmas enfrentadas)')
    : 'Agarre PRONO (palmas hacia abajo)';
  return `<svg viewBox="0 0 ${W} 150" class="diagram">
    ${body}
    <line x1="${cx - 40}" y1="118" x2="${cx + 40}" y2="118" class="dg-dash"/>
    <text x="${cx}" y="134" text-anchor="middle" class="dg-note">ancho de hombros</text>
    <text x="${cx}" y="16" text-anchor="middle" class="dg-label">${label}</text>
  </svg>`;
}

/* ---------------- Pies en el piso respecto de la barra (Smith) ---------------- */
function piesDiagram(pos) {
  const W = 260, H = 250, cx = 130, barY = 110;
  let feet = '';
  if (pos.split) {
    feet = footprint(cx - 26, barY + 20, -4) + footprint(cx + 26, barY + 110, 4, pos.banco ? 'foot-ghost' : '', true);
  } else {
    const dx = { juntos: 16, hombros: 40, ancho: 70 }[pos.ancho] || 40;
    const rot = pos.puntas === 'afuera' ? 24 : 6;
    const y = pos.adelante === 'adelante' ? barY - 50 : barY + 4;
    feet = footprint(cx - dx, y, -rot) + footprint(cx + dx, y, rot, '', true);
  }
  return `<svg viewBox="0 0 ${W} ${H}" class="diagram">
    <rect x="10" y="10" width="${W - 20}" height="${H - 20}" rx="14" class="dg-plate"/>
    <text x="${cx}" y="30" text-anchor="middle" class="dg-label">▲ ADELANTE (hacia donde mirás)</text>
    <line x1="20" y1="${barY}" x2="${W - 20}" y2="${barY}" class="dg-barline"/>
    <text x="${W - 22}" y="${barY - 6}" text-anchor="end" class="dg-note">línea de la barra</text>
    ${feet}
    ${pos.banco ? `<rect x="${cx - 5}" y="${barY + 150}" width="70" height="40" rx="6" class="dg-plate2" opacity=".5"/><text x="${cx + 30}" y="${barY + 175}" text-anchor="middle" class="dg-note" style="fill:#fff">banco</text>` : ''}
  </svg>`;
}

/* ---------------- Dirección de las puntas ---------------- */
function puntasDiagram(pos) {
  const W = 260, H = 200, cx = 130, y = 110;
  const rot = { neutro: 0, afuera: 28, adentro: -22 }[pos.dir] || 0;
  const label = { neutro: 'PUNTAS AL FRENTE', afuera: 'PUNTAS HACIA AFUERA', adentro: 'PUNTAS HACIA ADENTRO' }[pos.dir] || '';
  return `<svg viewBox="0 0 ${W} ${H}" class="diagram">
    <rect x="10" y="10" width="${W - 20}" height="${H - 20}" rx="14" class="dg-plate"/>
    ${pos.borde ? `<rect x="10" y="${y - 10}" width="${W - 20}" height="6" class="dg-edge on"/><text x="${cx}" y="${y + 74}" text-anchor="middle" class="dg-note">talones en el aire ↓</text>` : ''}
    ${footprint(cx - 36, y - (pos.borde ? 36 : 0), -rot)}${footprint(cx + 36, y - (pos.borde ? 36 : 0), rot, '', true)}
    <text x="${cx}" y="30" text-anchor="middle" class="dg-label">${label}</text>
  </svg>`;
}

const POS_TITLES = {
  plataforma: 'Posición de los pies', pies: 'Posición de los pies', puntas: 'Posición de los pies',
  barra: 'Posición del agarre', agarre: 'Posición del agarre', banco: 'Posición en el banco', inicio: 'Posición inicial'
};
function positionTitle(machine, pos) {
  if (pos.type) return POS_TITLES[pos.type] || 'Posición';
  if (machine === 'prensa') return 'Posición de los pies';
  if (machine === 'poleas') return 'Configuración de la polea';
  return 'Posición';
}

function positionDiagram(machine, pos, ex) {
  switch (pos.type) {
    case 'plataforma': return prensaDiagram(pos);
    case 'pies': return piesDiagram(pos);
    case 'puntas': return puntasDiagram(pos);
    case 'barra': return barraDiagram(pos);
    case 'agarre': return agarreDiagram(pos);
    case 'banco': return bancoDiagram(pos);
    case 'inicio': return (typeof Anim !== 'undefined' && ex) ? Anim.staticSVG(machine, ex, 0, 'anim-svg diagram-anim') : '';
  }
  if (machine === 'prensa') return prensaDiagram(pos);
  if (machine === 'poleas') return poleaDiagram(pos);
  return bancoDiagram(pos);
}

/* ---------------- Íconos de máquinas ---------------- */
const MACHINE_ICONS = {
  prensa: `<svg viewBox="0 0 120 90" class="m-icon">
    <path d="M10 82 L110 82" class="mi-floor"/>
    <path d="M18 80 L96 14" class="mi-rail"/><path d="M30 80 L104 18" class="mi-rail"/>
    <rect x="70" y="18" width="30" height="20" rx="3" transform="rotate(-40 85 28)" class="mi-accent"/>
    <path d="M14 60 L40 66 L46 80" class="mi-seat"/>
    <circle cx="88" cy="46" r="11" class="mi-plate"/></svg>`,
  banca: `<svg viewBox="0 0 120 90" class="m-icon">
    <path d="M10 82 L110 82" class="mi-floor"/>
    <path d="M28 82 L28 22 M92 82 L92 22" class="mi-rail"/>
    <rect x="20" y="52" width="80" height="8" rx="3" class="mi-seat-f"/>
    <path d="M40 60 L40 82 M80 60 L80 82" class="mi-rail"/>
    <rect x="8" y="26" width="104" height="5" rx="2" class="mi-accent"/>
    <rect x="4" y="16" width="8" height="25" rx="2" class="mi-plate-f"/><rect x="108" y="16" width="8" height="25" rx="2" class="mi-plate-f"/></svg>`,
  poleas: `<svg viewBox="0 0 120 90" class="m-icon">
    <path d="M6 82 L114 82" class="mi-floor"/>
    <rect x="8" y="8" width="16" height="74" rx="3" class="mi-tower"/><rect x="96" y="8" width="16" height="74" rx="3" class="mi-tower"/>
    <path d="M8 8 L112 8" class="mi-rail"/>
    <circle cx="16" cy="34" r="4" class="mi-plate-f"/><circle cx="104" cy="34" r="4" class="mi-plate-f"/>
    <path d="M20 34 L54 52 M100 34 L66 52" class="mi-cable"/>
    <rect x="48" y="50" width="10" height="5" rx="2" class="mi-accent"/><rect x="62" y="50" width="10" height="5" rx="2" class="mi-accent"/></svg>`
};
