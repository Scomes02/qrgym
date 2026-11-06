/* ============================================================
   QrGym — Motor de animaciones propias (sin video, sin IA)
   Una figura articulada (cinemática directa) se mueve entre
   dos posturas A ↔ B. Los músculos del ejercicio se iluminan
   en rojo según la contracción. La máquina se dibuja alrededor.

   Ángulos en grados: 0 = abajo, 90 = adelante (derecha),
   180 = arriba, -90 = atrás (izquierda).

   Postura: { torso, a:[[hombro,codo],[...]], l:[[cadera,rodilla,pie,escalaMuslo],...],
              sc / sc2 (escala de brazos, para escorzo), sh (encogimiento de hombros) }
   ============================================================ */

const Anim = (() => {
  const LEN = { torso: 52, u: 30, f: 28, t: 40, s: 38, foot: 13 };
  const W_SIDE = { torso: 22, u: 11, f: 9, t: 16, s: 12 };
  const W_FRONT = { torso: 30, u: 10, f: 8, t: 15, s: 11 };
  const PULLEY_Y = { alta: 42, media: 98, baja: 180 };
  const TOWER_X = { L: 26, R: 294 };

  const dir = a => { const r = a * Math.PI / 180; return [Math.sin(r), Math.cos(r)]; };
  const add = (p, v, k = 1) => [p[0] + v[0] * k, p[1] + v[1] * k];
  const lerp = (a, b, t) => a + (b - a) * t;
  const f1 = n => n.toFixed(1);

  /* ---------- Normalización de posturas ---------- */
  function norm(p, view) {
    const a = (p.a || [[0, 0]]).map(x => x.slice());
    const l = (p.l || [[0, 0]]).map(x => x.slice());
    if (a.length === 1) a.push(a[0].slice());
    if (l.length === 1) l.push(l[0].slice());
    l.forEach(x => {
      if (x[2] === undefined) x[2] = view === 'front' ? 0 : x[1] + 90; // pie hacia adelante
      if (x[3] === undefined) x[3] = 1;                                   // escala del muslo
    });
    const sc = p.sc === undefined ? 1 : p.sc;
    return {
      torso: p.torso === undefined ? 180 : p.torso, a, l,
      sc: [sc, p.sc2 === undefined ? sc : p.sc2], sh: p.sh || 0
    };
  }
  function mix(A, B, t) {
    return {
      torso: lerp(A.torso, B.torso, t),
      a: A.a.map((x, i) => x.map((v, j) => lerp(v, B.a[i][j], t))),
      l: A.l.map((x, i) => x.map((v, j) => lerp(v, B.l[i][j], t))),
      sc: A.sc.map((v, i) => lerp(v, B.sc[i], t)),
      sh: lerp(A.sh, B.sh, t)
    };
  }

  /* ---------- Cinemática directa ---------- */
  function fk(scene, p) {
    const front = scene.view === 'front';
    const H = [0, 0];
    const TL = LEN.torso + p.sh;
    let Sh, Head, shoulders, hips;
    if (front) {
      Sh = [0, -TL]; Head = [0, -TL - 22];
      shoulders = [[-16, -TL + 4], [16, -TL + 4]];
      hips = [[-9, 0], [9, 0]];
    } else {
      Sh = add(H, dir(p.torso), TL); Head = add(Sh, dir(p.torso), 17);
      shoulders = [Sh, Sh]; hips = [H, H];
    }
    const sideDir = (i, ang) => {
      const d = dir(ang);
      return front ? [i === 0 ? -d[0] : d[0], d[1]] : d;
    };
    const arms = p.a.map(([u, f], i) => {
      const S = shoulders[i];
      const E = add(S, sideDir(i, u), LEN.u * p.sc[i]);
      const Hd = add(E, sideDir(i, f), LEN.f * p.sc[i]);
      return { S, E, Hd };
    });
    const legs = p.l.map(([t, s, ft, ts], i) => {
      const Hp = hips[i];
      const K = add(Hp, sideDir(i, t), LEN.t * ts);
      const A = add(K, sideDir(i, s), LEN.s);
      const T = front ? add(A, [i === 0 ? -1 : 1, 0], 7) : add(A, dir(ft), LEN.foot);
      return { H: Hp, K, A, T };
    });
    const J = { H, Sh, Head, arms, legs, torso: p.torso, front };
    const [key, at] = scene.anchor;
    const ref = jointRaw(J, key);
    const dx = at[0] - ref[0], dy = at[1] - ref[1];
    const mv = q => [q[0] + dx, q[1] + dy];
    J.H = mv(H); J.Sh = mv(Sh); J.Head = mv(Head);
    J.arms = arms.map(x => ({ S: mv(x.S), E: mv(x.E), Hd: mv(x.Hd) }));
    J.legs = legs.map(x => ({ H: mv(x.H), K: mv(x.K), A: mv(x.A), T: mv(x.T) }));
    return J;
  }

  function jointRaw(J, key) {
    const a = J.arms, l = J.legs;
    switch (key) {
      case 'hip': return J.H;
      case 'shoulder': return J.Sh;
      case 'head': return J.Head;
      case 'hand': case 'handL': return a[0].Hd;
      case 'hand2': case 'handR': return a[1].Hd;
      case 'hands': return [(a[0].Hd[0] + a[1].Hd[0]) / 2, (a[0].Hd[1] + a[1].Hd[1]) / 2];
      case 'elbow': return a[0].E;
      case 'elbow2': return a[1].E;
      case 'knee': return l[0].K;
      case 'knee2': return l[1].K;
      case 'ankle': case 'ankleL': return l[0].A;
      case 'ankle2': case 'ankleR': return l[1].A;
      case 'toe': return l[0].T;
      case 'toe2': return l[1].T;
    }
    return J.H;
  }
  const joint = jointRaw;

  /* Punto sobre un segmento: seg = torso|u|f|t|s, at = 0..1, side = front|back|out|in */
  function segEnds(J, seg, i = 0) {
    if (seg === 'torso') return [J.H, J.Sh, true];
    if (seg === 'u') return [J.arms[i].S, J.arms[i].E];
    if (seg === 'f') return [J.arms[i].E, J.arms[i].Hd];
    if (seg === 't') return [J.legs[i].H, J.legs[i].K];
    return [J.legs[i].K, J.legs[i].A];
  }
  function normalOf(p1, p2, isTorso) {
    const vx = p2[0] - p1[0], vy = p2[1] - p1[1];
    const L = Math.hypot(vx, vy) || 1;
    let nx = vy / L, ny = -vx / L;
    if (isTorso) { nx = -nx; ny = -ny; }
    return [nx, ny, vx / L, vy / L, L];
  }
  function segPoint(J, seg, i, at, side, off) {
    const [p1, p2, isT] = segEnds(J, seg, i);
    const [nx, ny] = normalOf(p1, p2, isT);
    let k = side === 'back' ? -off : side === 'front' ? off : 0;
    let base = [p1[0] + (p2[0] - p1[0]) * at, p1[1] + (p2[1] - p1[1]) * at];
    if (side === 'out' || side === 'in') {
      const sx = (i === 0 ? -1 : 1) * (side === 'out' ? 1 : -1);
      return [base[0] + sx * off, base[1]];
    }
    return [base[0] + nx * k, base[1] + ny * k];
  }

  /* ---------- Músculos ---------- */
  const REG = {
    pecho_sup: ['torso', 'front', .72, .95], pecho_inf: ['torso', 'front', .52, .8],
    deltoide_ant: ['u', 'front', -.05, .32], deltoide_lat: ['u', 'full', -.05, .3], deltoide_post: ['u', 'back', -.05, .32],
    trapecio: ['torso', 'back', .86, 1.08], romboides: ['torso', 'back', .62, .86], dorsal: ['torso', 'back', .36, .8],
    lumbar: ['torso', 'back', .04, .36], abdomen: ['torso', 'front', .1, .52], oblicuos: ['torso', 'full', .14, .48],
    biceps: ['u', 'front', .3, .92], triceps: ['u', 'back', .3, .92], antebrazo: ['f', 'full', .08, .72],
    cuadriceps: ['t', 'front', .15, .9], isquios: ['t', 'back', .2, .9], aductores: ['t', 'full', .08, .55],
    abductores: ['t', 'back', -.06, .2], gluteos: ['t', 'back', -.1, .3], gemelos: ['s', 'back', .06, .55]
  };
  const FREG = {
    pecho_sup: [.8, .97, [-7, 7], 11], pecho_inf: [.63, .83, [-7, 7], 12], abdomen: [.1, .55, [0], 10],
    oblicuos: [.12, .5, [-11, 11], 5], dorsal: [.4, .8, [-12, 12], 5], lumbar: [.05, .35, [0], 6],
    trapecio: [.95, 1.08, [-6, 6], 7], romboides: [.66, .86, [0], 7]
  };

  function segLine(p1, p2, from, to, off, w, cls, isTorso) {
    const [nx, ny] = normalOf(p1, p2, isTorso);
    const vx = p2[0] - p1[0], vy = p2[1] - p1[1];
    const a = [p1[0] + vx * from + nx * off, p1[1] + vy * from + ny * off];
    const b = [p1[0] + vx * to + nx * off, p1[1] + vy * to + ny * off];
    return `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke-width="${w}" class="${cls}"/>`;
  }

  function musclesSVG(J, list, cls) {
    const W = J.front ? W_FRONT : W_SIDE;
    let out = '';
    list.forEach(m => {
      const r = REG[m]; if (!r) return;
      const [seg, face, from, to] = r;
      if (J.front && seg === 'torso') {
        const fr = FREG[m]; if (!fr) return;
        fr[2].forEach(dx => {
          const p1 = [J.H[0] + dx, J.H[1]], p2 = [J.Sh[0] + dx, J.Sh[1]];
          out += segLine(p1, p2, fr[0], fr[1], 0, fr[3], cls, true);
        });
        return;
      }
      const w = W[seg];
      const off = J.front || face === 'full' ? 0 : (face === 'front' ? 1 : -1) * w * .27;
      const sw = J.front || face === 'full' ? w * .6 : w * .5;
      (J.front ? [0, 1] : [0]).forEach(i => {
        const [p1, p2, isT] = segEnds(J, seg, i);
        out += segLine(p1, p2, from, to, off, sw, cls, isT);
      });
    });
    return out;
  }

  /* ---------- Figura ---------- */
  const ln = (a, b, w, cls) => `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke-width="${w}" class="${cls}"/>`;
  const circ = (p, r, cls) => `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${r}" class="${cls}"/>`;

  function figureSVG(J) {
    const W = J.front ? W_FRONT : W_SIDE;
    const limb = (i, cls) => {
      const a = J.arms[i], l = J.legs[i];
      return {
        leg: ln(l.H, l.K, W.t, cls) + ln(l.K, l.A, W.s, cls) + ln(l.A, l.T, 7, cls),
        arm: ln(a.S, a.E, W.u, cls) + ln(a.E, a.Hd, W.f, cls) + circ(a.Hd, W.f * .62, cls + '-f')
      };
    };
    const neck = ln(J.Sh, J.Head, 9, 'fg');
    const head = circ(J.Head, 10.5, 'fg-f');
    if (J.front) {
      const L = limb(0, 'fg'), R = limb(1, 'fg');
      return L.leg + R.leg + ln(J.legs[0].H, J.legs[1].H, 16, 'fg') + ln(J.H, J.Sh, W.torso, 'fg') +
        ln(J.arms[0].S, J.arms[1].S, 12, 'fg') + neck + head + L.arm + R.arm;
    }
    const far = limb(1, 'bg'), near = limb(0, 'fg');
    const v = dir(J.torso), nf = [-v[1], v[0]];
    const nose = circ(add(add(J.Head, nf, 10), v, 1), 3, 'fg-f');
    return far.leg + far.arm + ln(J.H, J.Sh, W.torso, 'fg') + neck + head + nose + near.leg + near.arm;
  }

  /* ---------- Máquinas y accesorios ---------- */
  function plate(p, r = 15) { return circ(p, r, 'eq-plate') + circ(p, 3, 'eq-hub'); }
  function dumbbell(p) {
    return `<rect x="${f1(p[0] - 11)}" y="${f1(p[1] - 3)}" width="22" height="6" rx="2" class="eq-metal"/>
      <rect x="${f1(p[0] - 14)}" y="${f1(p[1] - 8)}" width="7" height="16" rx="2" class="eq-acc"/>
      <rect x="${f1(p[0] + 7)}" y="${f1(p[1] - 8)}" width="7" height="16" rx="2" class="eq-acc"/>`;
  }
  function bench(x1, x2, top, floor) {
    return `<rect x="${x1}" y="${top}" width="${x2 - x1}" height="9" rx="4" class="eq-pad"/>
      <rect x="${x1 + 8}" y="${top + 9}" width="6" height="${Math.max(0, floor - top - 9)}" class="eq-metal"/>
      <rect x="${x2 - 14}" y="${top + 9}" width="6" height="${Math.max(0, floor - top - 9)}" class="eq-metal"/>`;
  }
  function torsoPad(J, side, a, b, off, w = 9) {
    const v = dir(J.torso), n = side === 'back' ? [v[1], -v[0]] : [-v[1], v[0]];
    const p1 = add(add(J.H, n, off), v, a), p2 = add(add(J.Sh, n, off), v, b);
    return [p1, p2, ln(p1, p2, w, 'eq-pad-l')];
  }

  // Capa de atrás (detrás de la figura)
  function propsBack(scene, J, floor, p) {
    let s = '';
    (scene.towers || []).forEach(t => {
      const x = TOWER_X[t[0]], y = PULLEY_Y[t[1]];
      s += `<rect x="${x - 11}" y="14" width="22" height="${floor - 14}" rx="4" class="eq-tower"/>` + circ([x, y], 7, 'eq-pulley');
    });
    (scene.props || []).forEach(pr => {
      switch (pr.type) {
        case 'bench': s += bench(pr.x1, pr.x2, pr.top, floor); break;
        case 'rect': s += `<rect x="${pr.x}" y="${pr.y}" width="${pr.w}" height="${pr.h}" rx="${pr.r === undefined ? 4 : pr.r}" class="${pr.cls || 'eq-pad'}"/>`; break;
        case 'frame': s += ln(pr.p1, pr.p2, pr.w || 5, pr.cls || 'eq-metal-l'); break;
        case 'stack': {
          const top = pr.top || 30, x = pr.x, lift = p * 16;
          s += `<rect x="${x - 13}" y="${top}" width="26" height="${floor - top}" rx="3" class="eq-tower"/>`;
          for (let k = 0; k < 6; k++) {
            const yy = floor - 8 - k * 7 - (k >= 3 ? lift : 0);
            s += `<rect x="${x - 9}" y="${f1(yy)}" width="18" height="5" rx="1" class="${k >= 3 ? 'eq-acc' : 'eq-metal'}"/>`;
          }
          break;
        }
        case 'backpad': case 'chestpad': {
          const [p1, p2, svg] = torsoPad(J, pr.type === 'backpad' ? 'back' : 'front', pr.a ?? -6, pr.b ?? 14, pr.off ?? 13, pr.w);
          s += svg;
          if (pr.leg !== false) s += ln(p1, [p1[0], floor], 5, 'eq-metal-l');
          break;
        }
        case 'seatpad': {
          const y = J.H[1] + (pr.dy ?? 12);
          s += ln([J.H[0] + (pr.dx1 ?? -8), y], [J.H[0] + (pr.dx2 ?? 24), y], 9, 'eq-pad-l');
          s += ln([J.H[0] + 6, y + 4], [J.H[0] + 6, floor], 6, 'eq-metal-l');
          break;
        }
        case 'smith': {
          const x = scene._smithX;
          s += ln([x, 16], [x, floor], 5, 'eq-metal-l') + ln([x - 22, 16], [x + 22, 16], 6, 'eq-metal-l');
          break;
        }
        case 'lever': {
          const piv = pr.pivot, to = joint(J, pr.to);
          s += ln(piv, to, pr.w || 5, 'eq-metal-l') + circ(piv, 4, 'eq-hub');
          break;
        }
        case 'legpress': {
          const v = dir(J.torso), nb = [v[1], -v[0]];
          const b1 = add(add(J.H, nb, 13), v, -6), b2 = add(add(J.Sh, nb, 13), v, 14);
          s += ln(b1, b2, 9, 'eq-pad-l');
          s += ln([J.H[0] - 6, J.H[1] + 12], [J.H[0] + 22, J.H[1] + 12], 9, 'eq-pad-l');
          s += ln([J.H[0] + 4, J.H[1] + 16], [J.H[0] + 4, floor], 6, 'eq-metal-l');
          s += ln(b1, [b1[0], floor], 6, 'eq-metal-l');
          const R = scene._rail;
          if (R) {
            const r0 = add(R.p, R.d, -22), r1 = add(R.p, R.d, 75);
            s += ln(r0, r1, 6, 'eq-metal-l') + ln(r0, [r0[0], floor], 6, 'eq-metal-l');
            const m = add(R.p, R.d, 45);
            s += ln(m, [m[0], floor], 5, 'eq-metal-l');
          }
          break;
        }
      }
    });
    return s;
  }

  // Capa de adelante (sobre la figura)
  function propsFront(scene, J) {
    let s = '';
    (scene.cables || []).forEach(c => {
      let p0, target;
      if (Array.isArray(c)) { p0 = [TOWER_X[c[0]], PULLEY_Y[c[1]]]; target = c[2]; }
      else { p0 = c.from; target = c.to; s += circ(p0, 6, 'eq-pulley'); }
      const p1 = joint(J, target);
      s += ln(p0, p1, 1.6, 'eq-cable') + `<rect x="${f1(p1[0] - 5)}" y="${f1(p1[1] - 5)}" width="10" height="10" rx="3" class="eq-acc"/>`;
    });
    (scene.props || []).forEach(pr => {
      switch (pr.type) {
        case 'bar': s += plate(joint(J, pr.at || 'hand'), pr.r || 15); break;
        case 'db': s += dumbbell(joint(J, pr.at || 'hand')); break;
        case 'hipbar': s += plate([J.H[0] + 2, J.H[1] - 15], 15); break;
        case 'smith': {
          const q = joint(J, pr.at || 'hand');
          s += plate([q[0], q[1] + (pr.dy || 0)], pr.r || 13);
          break;
        }
        case 'handle': { const q = joint(J, pr.at || 'hand'); s += `<rect x="${f1(q[0] - 6)}" y="${f1(q[1] - 4)}" width="12" height="8" rx="3" class="eq-acc"/>`; break; }
        case 'padAt': {
          const q = joint(J, pr.to);
          s += ln([q[0] + (pr.dx1 ?? -12), q[1] + (pr.dy || 0)], [q[0] + (pr.dx2 ?? 12), q[1] + (pr.dy || 0)], pr.w || 8, 'eq-pad-l');
          break;
        }
        case 'padAlong': {
          const a = segPoint(J, pr.seg, pr.i || 0, pr.from ?? 0, pr.side || 'back', pr.off ?? 9);
          const b = segPoint(J, pr.seg, pr.i || 0, pr.to ?? 1, pr.side || 'back', pr.off ?? 9);
          s += ln(a, b, pr.w || 8, 'eq-pad-l');
          break;
        }
        case 'roller': {
          const list = pr.both ? [0, 1] : [pr.i || 0];
          list.forEach(i => {
            const q = pr.to ? joint(J, pr.to) : segPoint(J, pr.seg, i, pr.at ?? .85, pr.side || 'front', pr.off ?? 11);
            if (pr.arm) {
              const piv = pr.seg === 's' ? J.legs[i].K : pr.seg === 'f' ? J.arms[i].E : (Array.isArray(pr.arm) ? pr.arm : q);
              s += ln(piv, q, 4, 'eq-metal-l');
            }
            s += circ(q, pr.r || 6.5, 'eq-roller');
          });
          break;
        }
        case 'legpress': {
          if (!scene._rail) break;
          const R = scene._rail, rd = R.d, pp = [-rd[1], rd[0]];
          const q = sledPoint(J, pr), k = (q[0] - R.p[0]) * rd[0] + (q[1] - R.p[1]) * rd[1];
          const c = add(add(R.p, rd, k), rd, 7);
          s += ln(add(c, pp, -28), add(c, pp, 28), 7, 'eq-sled') + plate(add(add(c, rd, 22), pp, -10), 16);
          break;
        }
      }
    });
    return s;
  }

  function sledPoint(J, pr) {
    const L = J.legs[0];
    return pr.at === 'toe' ? L.T : [(L.A[0] + L.T[0]) / 2, (L.A[1] + L.T[1]) / 2];
  }

  /* Precalcula valores fijos de la escena (riel de prensa, eje Smith) */
  function prep(scene, A, B) {
    if (scene._ready) return;
    const JA = fk(scene, A), JB = fk(scene, B);
    (scene.props || []).forEach(pr => {
      if (pr.type === 'legpress') {
        const a = sledPoint(JA, pr), b = sledPoint(JB, pr);
        let d = [b[0] - a[0], b[1] - a[1]];
        const L = Math.hypot(d[0], d[1]);
        d = (pr.at !== 'toe' && L > 12) ? [d[0] / L, d[1] / L] : [0.707, -0.707];
        if (d[1] > 0) d = [-d[0], -d[1]];
        scene._rail = { p: a, d };
      }
      if (pr.type === 'smith') {
        scene._smithX = (joint(JA, pr.at || 'hand')[0] + joint(JB, pr.at || 'hand')[0]) / 2;
      }
    });
    scene._ready = true;
  }

  /* ---------- Escenas ---------- */
  const ST = [160, 190];
  const FH = [160, 112];
  const S = (o) => Object.assign({ view: 'side', anchor: ['ankle', ST], floor: 198 }, o);
  const F = (o) => Object.assign({ view: 'front', anchor: ['hip', FH], floor: 198 }, o);

  const PRENSA = {
    anchor: ['hip', [118, 138]], floor: 196, props: [{ type: 'legpress' }], vb: '30 38 240 158',
    A: { torso: 225, a: [[35, 70]], l: [[179, 88, 205]] }, B: { torso: 225, a: [[35, 70]], l: [[160, 108, 214]] }
  };
  const LYING = { anchor: ['hip', [192, 127]], floor: 193, vb: '50 37 240 158', props: [{ type: 'bench', x1: 98, x2: 214, top: 139 }] };
  const lie = (A, B, extra) => S(Object.assign({}, LYING, {
    A: Object.assign({ torso: 270, l: [[60, 0]] }, A),
    B: Object.assign({ torso: 270, l: [[60, 0]] }, B)
  }, extra));
  const PRESS = { A: { a: [[70, 180]] }, B: { a: [[175, 180]] } };

  const SCENES = {
    prensa: {
      _default: S(PRENSA),
      gemelos: S(Object.assign({}, PRENSA, {
        props: [{ type: 'legpress', at: 'toe' }],
        A: { torso: 225, a: [[35, 70]], l: [[160, 108, 238]] }, B: { torso: 225, a: [[35, 70]], l: [[160, 108, 188]] }
      }))
    },
    'press-banca': {
      'agarre-medio': lie(PRESS.A, PRESS.B, { props: [...LYING.props, { type: 'bar' }] }),
      'agarre-ancho': lie(PRESS.A, PRESS.B, { props: [...LYING.props, { type: 'bar' }] }),
      'agarre-cerrado': lie({ a: [[50, 180]] }, PRESS.B, { props: [...LYING.props, { type: 'bar' }] }),
      'agarre-invertido': lie({ a: [[60, 175]] }, PRESS.B, { props: [...LYING.props, { type: 'bar' }] }),
      'press-frances': lie({ a: [[195, 275]] }, { a: [[195, 195]] }, { props: [...LYING.props, { type: 'bar', r: 11 }] }),
      'press-mancuernas': lie(PRESS.A, PRESS.B, { props: [...LYING.props, { type: 'db' }] }),
      'aperturas': lie({ a: [[180, 180]], sc: .32 }, { a: [[180, 180]], sc: 1 }, { props: [...LYING.props, { type: 'db' }] }),
      'pullover': S({
        anchor: ['ankle', [215, 189]], floor: 197, vb: '40 41 240 158', props: [{ type: 'bench', x1: 70, x2: 150, top: 151 }, { type: 'db' }],
        A: { torso: 250, a: [[268, 268]], l: [[100, 0]] }, B: { torso: 250, a: [[178, 178]], l: [[100, 0]] }
      }),
      'remo-unilateral': S({
        anchor: ['hip', [130, 112]], floor: 198, props: [{ type: 'bench', x1: 68, x2: 204, top: 159 }, { type: 'db' }],
        A: { torso: 95, a: [[0, 0], [20, -20]], l: [[0, -90], [-10, 5]] },
        B: { torso: 95, a: [[-150, 0], [20, -20]], l: [[0, -90], [-10, 5]] }
      }),
      'fondos-banco': S({
        anchor: ['hand', [110, 158]], floor: 198, props: [{ type: 'bench', x1: 14, x2: 116, top: 161 }],
        A: { torso: 180, a: [[-80, 0]], l: [[85, 60]] }, B: { torso: 180, a: [[-15, -15]], l: [[75, 60]] }
      }),
      'hip-thrust': S({
        anchor: ['ankle', [196, 191]], floor: 199, props: [{ type: 'bench', x1: 14, x2: 118, top: 151 }, { type: 'hipbar' }],
        A: { torso: 234, a: [[45, 70]], l: [[112, 0]] }, B: { torso: 261, a: [[70, 95]], l: [[75, -15]] }
      })
    },
    poleas: {
      'cruce-alto': F({ towers: [['L', 'alta'], ['R', 'alta']], cables: [['L', 'alta', 'handL'], ['R', 'alta', 'handR']],
        A: { a: [[125, 125]] }, B: { a: [[12, -10]] } }),
      'cruce-medio': F({ towers: [['L', 'media'], ['R', 'media']], cables: [['L', 'media', 'handL'], ['R', 'media', 'handR']],
        A: { a: [[92, 92]] }, B: { a: [[70, 70]], sc: .35 } }),
      'cruce-bajo': F({ towers: [['L', 'baja'], ['R', 'baja']], cables: [['L', 'baja', 'handL'], ['R', 'baja', 'handR']],
        A: { a: [[35, 35]] }, B: { a: [[160, 170]], sc: .45 } }),
      'press-pecho-polea': S({ towers: [['L', 'media']], cables: [['L', 'media', 'hand']],
        A: { torso: 178, a: [[-70, 90]], l: [[12, 0], [-12, -5]] }, B: { torso: 178, a: [[88, 88]], l: [[12, 0], [-12, -5]] } }),
      'remo-bajo': S({ towers: [['R', 'baja']], cables: [['R', 'baja', 'hand']],
        A: { torso: 170, a: [[70, 70]], l: [[25, -20]] }, B: { torso: 182, a: [[-40, 85]], l: [[25, -20]] } }),
      'jalon-brazos-rectos': S({ towers: [['R', 'alta']], cables: [['R', 'alta', 'hand']],
        A: { torso: 160, a: [[150, 150]], l: [[10, -5]] }, B: { torso: 160, a: [[10, 10]], l: [[10, -5]] } }),
      'jalon-unilateral': S({ anchor: ['knee', [160, 186]], floor: 193, towers: [['R', 'alta']], cables: [['R', 'alta', 'hand']],
        A: { torso: 180, a: [[165, 172], [5, 5]], l: [[0, -90]] }, B: { torso: 180, a: [[-15, 170], [5, 5]], l: [[0, -90]] } }),
      'remo-unilateral-pie': S({ towers: [['R', 'media']], cables: [['R', 'media', 'hand']],
        A: { torso: 168, a: [[95, 95], [5, 30]], l: [[12, 0], [-15, -5]] }, B: { torso: 168, a: [[-50, 85], [5, 30]], l: [[12, 0], [-15, -5]] } }),
      'face-pull': S({ towers: [['R', 'alta']], cables: [['R', 'alta', 'hand']],
        A: { torso: 182, a: [[115, 115]] }, B: { torso: 182, a: [[-95, 150]] } }),
      'elevacion-lateral': F({ towers: [['L', 'baja']], cables: [['L', 'baja', 'handR']],
        A: { a: [[5, 5], [6, 6]] }, B: { a: [[5, 5], [92, 92]] } }),
      'elevacion-frontal': S({ towers: [['L', 'baja']], cables: [['L', 'baja', 'hand']],
        A: { a: [[8, 8]] }, B: { a: [[95, 95]] } }),
      'pajaro-polea': F({ towers: [['L', 'media'], ['R', 'media']], cables: [['L', 'media', 'handR'], ['R', 'media', 'handL']],
        A: { a: [[85, 85]], sc: .25 }, B: { a: [[90, 90]], sc: 1 } }),
      'remo-menton': S({ towers: [['R', 'baja']], cables: [['R', 'baja', 'hand']],
        A: { a: [[5, 5]] }, B: { a: [[-100, 55]] } }),
      'curl-barra': S({ towers: [['R', 'baja']], cables: [['R', 'baja', 'hand']],
        A: { a: [[3, 3]] }, B: { a: [[8, 160]] } }),
      'curl-martillo': S({ towers: [['R', 'baja']], cables: [['R', 'baja', 'hand']],
        A: { a: [[3, 3]] }, B: { a: [[8, 160]] } }),
      'curl-bayesiano': S({ towers: [['L', 'baja']], cables: [['L', 'baja', 'hand']],
        A: { a: [[-25, -25], [5, 5]], l: [[12, 0], [-12, -5]] }, B: { a: [[-25, 140], [5, 5]], l: [[12, 0], [-12, -5]] } }),
      'curl-alto': F({ towers: [['L', 'alta'], ['R', 'alta']], cables: [['L', 'alta', 'handL'], ['R', 'alta', 'handR']],
        A: { a: [[95, 95]] }, B: { a: [[95, 195]] } }),
      'pushdown-barra': S({ towers: [['R', 'alta']], cables: [['R', 'alta', 'hand']],
        A: { torso: 175, a: [[10, 150]] }, B: { torso: 175, a: [[10, 8]] } }),
      'pushdown-cuerda': S({ towers: [['R', 'alta']], cables: [['R', 'alta', 'hand']],
        A: { torso: 175, a: [[10, 150]] }, B: { torso: 175, a: [[10, 5]] } }),
      'extension-cabeza': S({ towers: [['L', 'baja']], cables: [['L', 'baja', 'hand']],
        A: { torso: 160, a: [[155, -60]], l: [[12, 0], [-14, -5]] }, B: { torso: 160, a: [[155, 150]], l: [[12, 0], [-14, -5]] } }),
      'patada-triceps': S({ towers: [['R', 'baja']], cables: [['R', 'baja', 'hand']],
        A: { torso: 120, a: [[-80, 0], [40, 40]], l: [[18, -8]] }, B: { torso: 120, a: [[-80, -85], [40, 40]], l: [[18, -8]] } }),
      'patada-gluteo': S({ anchor: ['ankle2', [170, 190]], towers: [['R', 'baja']], cables: [['R', 'baja', 'ankle']],
        A: { torso: 165, a: [[100, 100]], l: [[8, -5], [0, 0]] }, B: { torso: 165, a: [[100, 100]], l: [[-40, -45], [0, 0]] } }),
      'abduccion': F({ towers: [['R', 'baja']], cables: [['R', 'baja', 'ankleL']],
        A: { a: [[5, 5], [70, 70]], l: [[0, 0], [0, 0]] }, B: { a: [[5, 5], [70, 70]], l: [[35, 35], [0, 0]] } }),
      'aduccion': F({ towers: [['L', 'baja']], cables: [['L', 'baja', 'ankleL']],
        A: { a: [[70, 70], [5, 5]], l: [[30, 30], [0, 0]] }, B: { a: [[70, 70], [5, 5]], l: [[-12, -12], [0, 0]] } }),
      'pull-through': S({ towers: [['L', 'baja']], cables: [['L', 'baja', 'hand']],
        A: { torso: 112, a: [[-15, -15]], l: [[15, -8]] }, B: { torso: 180, a: [[-8, -8]], l: [[0, 0]] } }),
      'curl-femoral': S({ anchor: ['ankle2', [170, 190]], towers: [['R', 'baja']], cables: [['R', 'baja', 'ankle']],
        A: { torso: 172, a: [[100, 100]], l: [[5, -3], [0, 0]] }, B: { torso: 172, a: [[100, 100]], l: [[5, -110], [0, 0]] } }),
      'crunch-polea': S({ anchor: ['knee', [160, 186]], floor: 193, towers: [['R', 'alta']], cables: [['R', 'alta', 'hand']],
        A: { torso: 178, a: [[150, 205]], l: [[0, -90]] }, B: { torso: 110, a: [[80, 135]], l: [[0, -90]] } }),
      'lenador': F({ towers: [['R', 'alta']], cables: [['R', 'alta', 'hands']],
        A: { a: [[-120, -120], [135, 135]] }, B: { a: [[35, 35], [-35, -35]] } }),
      'pallof': S({ towers: [['R', 'media']], cables: [['R', 'media', 'hand']],
        A: { a: [[10, 170]] }, B: { a: [[90, 90]] } })
    }
  };

  function register(machineId, map) { SCENES[machineId] = Object.assign(SCENES[machineId] || {}, map); }

  function getScene(machineId, exId) {
    const g = SCENES[machineId] || {};
    return g[exId] || g._default || null;
  }

  /* ---------- Render ---------- */
  function render(scene, A, B, p, P, Sx, floor, animated) {
    const J = fk(scene, mix(A, B, p));
    const sOp = animated ? (0.35 + 0.3 * p).toFixed(2) : 1, pOp = animated ? (0.55 + 0.45 * p).toFixed(2) : 1;
    return propsBack(scene, J, floor, p) + figureSVG(J) +
      `<g style="opacity:${sOp}">${musclesSVG(J, Sx, 'mu-s')}</g>` +
      `<g style="opacity:${pOp}">${musclesSVG(J, P, 'mu-p')}</g>` +
      propsFront(scene, J);
  }

  const players = new Set();
  let raf = null;
  function frame(now) {
    players.forEach(p => p.tick(now));
    raf = players.size ? requestAnimationFrame(frame) : null;
  }

  function mount(el, machineId, ex) {
    const scene = getScene(machineId, ex.id);
    if (!scene) return null;
    const A = norm(scene.A, scene.view), B = norm(scene.B, scene.view);
    prep(scene, A, B);
    const P = expandMuscles(ex.primary), Sx = expandMuscles(ex.secondary);
    const floor = scene.floor || 198;
    el.innerHTML = `<svg viewBox="${scene.vb || '0 0 320 210'}" class="anim-svg" role="img" aria-label="Animación: ${ex.name}">
      <line x1="-50" y1="${floor}" x2="370" y2="${floor}" class="eq-floor"/><g class="anim-layer"></g></svg>`;
    const layer = el.querySelector('.anim-layer');
    const period = scene.period || 3400;
    const player = {
      t0: performance.now(), paused: false, pausedAt: 0, speed: 1,
      tick(now) {
        if (this.paused) return;
        const t = ((now - this.t0) * this.speed % period) / period;
        let p = (1 - Math.cos(t * 2 * Math.PI)) / 2;
        p = Math.min(1, Math.max(0, (p - 0.04) / 0.92));
        layer.innerHTML = render(scene, A, B, p, P, Sx, floor, true);
      },
      toggle() {
        if (this.paused) { this.t0 += performance.now() - this.pausedAt; this.paused = false; }
        else { this.pausedAt = performance.now(); this.paused = true; }
        return this.paused;
      },
      setSpeed(s) {
        const now = performance.now();
        const elapsed = (now - this.t0) * this.speed;
        this.speed = s; this.t0 = now - elapsed / s;
      }
    };
    player.tick(performance.now());
    players.add(player);
    if (!raf) raf = requestAnimationFrame(frame);
    return player;
  }

  function stopAll() { players.clear(); if (raf) cancelAnimationFrame(raf); raf = null; }

  /* SVG estático en la fase p (0 = inicio, 1 = contracción) */
  function staticSVG(machineId, ex, p, cls = 'anim-svg') {
    const scene = getScene(machineId, ex.id);
    if (!scene) return '';
    const A = norm(scene.A, scene.view), B = norm(scene.B, scene.view);
    prep(scene, A, B);
    const floor = scene.floor || 198;
    return `<svg viewBox="${scene.vb || '0 0 320 210'}" class="${cls}"><line x1="-50" y1="${floor}" x2="370" y2="${floor}" class="eq-floor"/>` +
      render(scene, A, B, p, expandMuscles(ex.primary), expandMuscles(ex.secondary), floor, false) + '</svg>';
  }

  return { mount, stopAll, getScene, staticSVG, register, S, F, lie, LYING, PRESS };
})();
