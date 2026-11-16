/* ============================================================
   QrGym — Generador de rutinas
   Pide objetivo, nivel, días, duración, foco, edad y molestias;
   arma la semana con ejercicios del catálogo del gimnasio, cada uno
   con alternativas (por si la máquina está ocupada), más entrada
   en calor y estiramientos de cada día.
   ============================================================ */
const Routine = (() => {
  /* ---------- Patrones de movimiento → opciones (en orden de preferencia) ---------- */
  const P = {
    squat: ['prensa/estandar', 'hack/estandar', 'smith/sentadilla', 'mancuernas/goblet', 'pesa-rusa/goblet'],
    'glute-squat': ['smith/sentadilla-pies-adelantados', 'prensa/pies-altos', 'hack/pies-altos', 'pesa-rusa/sentadilla-sumo'],
    lunge: ['mancuernas/bulgara', 'smith/bulgara', 'mancuernas/zancadas', 'cajon/step-up', 'smith/zancada', 'cajon/bulgara-cajon', 'cajon/step-up-lateral', 'gluteo-pie/patada-atras'],
    hinge: ['mancuernas/peso-muerto-rumano', 'smith/peso-muerto-rumano', 'pesa-rusa/peso-muerto-sumo', 'poleas/pull-through', 'pesa-rusa/swing'],
    'hip-thrust': ['hip-thrust/estandar', 'smith/hip-thrust-smith', 'mancuernas/hip-thrust', 'press-banca/hip-thrust', 'colchoneta/puente'],
    'glute-iso': ['gluteo-pie/patada-atras', 'patada-burro/pierna-estirada', 'poleas/patada-gluteo', 'gluteo-pie/patada-rodilla-90'],
    abduction: ['abductores/abduccion', 'poleas/abduccion', 'cajon/step-up-lateral'],
    adduction: ['abductores/aduccion', 'pesa-rusa/sentadilla-sumo', 'poleas/aduccion'],
    'knee-ext': ['extension-cuadriceps/estandar', 'extension-cuadriceps/unilateral', 'extension-cuadriceps/pausa'],
    'knee-flex': ['curl-femoral/estandar', 'poleas/curl-femoral', 'curl-femoral/unilateral'],
    calf: ['gemelos/de-pie', 'prensa/gemelos', 'smith/gemelos-smith', 'mancuernas/gemelos', 'gemelos/sentado'],
    'h-push': ['press-banca/agarre-medio', 'press-pecho/agarre-horizontal', 'mancuernas/press-plano', 'smith/press-banca-smith', 'colchoneta/flexiones'],
    'incline-push': ['press-inclinado/agarre-medio', 'mancuernas/press-inclinado', 'smith/press-inclinado-smith', 'cajon/flexiones-declinadas'],
    fly: ['pec-deck/aperturas', 'poleas/cruce-medio', 'mancuernas/aperturas', 'poleas/cruce-alto'],
    'v-push': ['press-hombros/agarre-neutro', 'mancuernas/press-militar', 'smith/press-militar-smith', 'press-hombros/agarre-prono'],
    lateral: ['laterales-pie/laterales-bilateral', 'mancuernas/laterales', 'poleas/elevacion-lateral'],
    'rear-delt': ['pec-deck/pajaro', 'poleas/face-pull', 'mancuernas/pajaro', 'remo-polea-baja/face-pull'],
    'v-pull': ['dorsalera/agarre-ancho', 'asistida/dominada-prona', 'dorsalera/agarre-cerrado', 'poleas/jalon-unilateral', 'dorsalera/agarre-supino'],
    'h-pull': ['remo-polea-baja/triangulo', 'remo-independiente/agarre-neutro', 'remo-t/agarre-cerrado', 'mancuernas/remo-una-mano', 'press-inclinado/remo-apoyado', 'pesa-rusa/remo', 'smith/remo-inclinado-smith'],
    biceps: ['scott/barra-z', 'mancuernas/curl-alterno', 'poleas/curl-barra', 'mancuernas/curl-martillo', 'press-inclinado/curl-inclinado', 'poleas/curl-bayesiano'],
    triceps: ['poleas/pushdown-cuerda', 'dorsalera/triceps', 'mancuernas/frances', 'poleas/extension-cabeza', 'cajon/fondos', 'mancuernas/extension-nuca'],
    core: ['colchoneta/plancha', 'banco-abdominal/crunch-declinado', 'poleas/crunch-polea', 'silla-romana/rodillas', 'colchoneta/dead-bug',
      'colchoneta/plancha-lateral', 'poleas/pallof', 'colchoneta/crunch-inverso', 'banco-abdominal/crunch-giro', 'colchoneta/bicicleta', 'poleas/lenador', 'colchoneta/russian-twist'],
    'low-back': ['lumbares/estandar', 'colchoneta/superman', 'colchoneta/puente']
  };
  const COMPOUND = new Set(['squat', 'glute-squat', 'lunge', 'hinge', 'hip-thrust', 'h-push', 'incline-push', 'v-push', 'v-pull', 'h-pull']);

  /* Ejercicios a evitar según molestias / edad */
  const AVOID = {
    rodilla: ['cajon/salto', 'smith/sentadilla', 'hack/*', 'mancuernas/zancadas', 'smith/zancada', 'mancuernas/bulgara', 'smith/bulgara',
      'cajon/bulgara-cajon', 'prensa/pies-bajos', 'extension-cuadriceps/pausa', 'colchoneta/mountain-climbers'],
    lumbar: ['smith/sentadilla', 'smith/peso-muerto-rumano', 'mancuernas/peso-muerto-rumano', 'pesa-rusa/peso-muerto-sumo', 'pesa-rusa/swing',
      'smith/remo-inclinado-smith', 'mancuernas/remo-inclinado', 'remo-t/*', 'colchoneta/superman', 'banco-abdominal/sit-up',
      'colchoneta/elevacion-piernas', 'poleas/pull-through', 'lumbares/*', 'silla-romana/piernas-rectas'],
    hombro: ['smith/press-militar-smith', 'mancuernas/press-militar', 'press-hombros/*', 'asistida/fondos', 'cajon/fondos', 'press-banca/fondos-banco',
      'smith/remo-menton-smith', 'poleas/remo-menton', 'press-banca/agarre-ancho', 'mancuernas/pullover', 'cajon/flexiones-declinadas'],
    mayor: ['cajon/salto', 'pesa-rusa/swing', 'cajon/flexiones-declinadas', 'colchoneta/mountain-climbers', 'banco-abdominal/sit-up']
  };

  /* ---------- Tipos de día ---------- */
  const DAYS = {
    'full-a': { name: 'Cuerpo completo A', kind: 'full', slots: ['squat', 'h-push', 'h-pull', 'hinge', 'lateral', 'knee-flex', 'biceps', 'triceps'] },
    'full-b': { name: 'Cuerpo completo B', kind: 'full', slots: ['hip-thrust', 'v-pull', 'incline-push', 'lunge', 'v-push', 'knee-ext', 'rear-delt', 'calf'] },
    'full-c': { name: 'Cuerpo completo C', kind: 'full', slots: ['glute-squat', 'v-pull', 'h-push', 'knee-flex', 'lateral', 'abduction', 'triceps', 'biceps'] },
    push: { name: 'Empuje: pecho, hombros y tríceps', kind: 'push', slots: ['h-push', 'incline-push', 'v-push', 'lateral', 'fly', 'triceps', 'triceps', 'lateral'] },
    pull: { name: 'Tirón: espalda y bíceps', kind: 'pull', slots: ['v-pull', 'h-pull', 'h-pull', 'rear-delt', 'biceps', 'biceps', 'v-pull', 'low-back'] },
    legs: { name: 'Piernas completas', kind: 'legs', slots: ['squat', 'hinge', 'lunge', 'knee-ext', 'knee-flex', 'calf', 'hip-thrust', 'adduction'] },
    upper: { name: 'Tren superior', kind: 'upper', slots: ['h-push', 'v-pull', 'incline-push', 'h-pull', 'lateral', 'biceps', 'triceps', 'rear-delt'] },
    lower: { name: 'Tren inferior', kind: 'legs', slots: ['squat', 'hip-thrust', 'hinge', 'lunge', 'knee-flex', 'knee-ext', 'calf', 'abduction'] },
    glutes: { name: 'Glúteos y femorales', kind: 'legs', slots: ['hip-thrust', 'glute-squat', 'lunge', 'hinge', 'abduction', 'glute-iso', 'knee-flex', 'adduction'] }
  };

  function split(f) {
    const d = f.dias, legs = f.foco === 'piernas', up = f.foco === 'superior';
    if (d <= 2) return ['full-a', 'full-b'].slice(0, d);
    if (d === 3) return f.nivel === 'principiante' ? ['full-a', 'full-b', 'full-c'] : legs ? ['lower', 'upper', 'glutes'] : up ? ['push', 'pull', 'legs'] : ['push', 'pull', 'legs'];
    if (d === 4) return legs ? ['lower', 'upper', 'glutes', 'upper'] : ['upper', 'lower', 'upper', 'lower'];
    if (d === 5) return legs ? ['lower', 'upper', 'glutes', 'upper', 'legs'] : up ? ['push', 'pull', 'legs', 'upper', 'pull'] : ['upper', 'lower', 'push', 'pull', 'legs'];
    return legs ? ['legs', 'push', 'glutes', 'pull', 'lower', 'upper'] : ['push', 'pull', 'legs', 'push', 'pull', 'legs'];
  }

  /* ---------- Series, repeticiones y descanso según objetivo ---------- */
  const GOALS = {
    musculo: { label: 'Ganar músculo', comp: [4, '8–10', '90 s'], iso: [3, '10–12', '60 s'] },
    fuerza: { label: 'Ganar fuerza', comp: [5, '5', '2–3 min'], iso: [3, '8–10', '90 s'] },
    tonificar: { label: 'Tonificar / definir', comp: [3, '12', '60 s'], iso: [3, '15', '45 s'] },
    grasa: { label: 'Bajar de peso', comp: [3, '15', '45 s'], iso: [3, '15–20', '30 s'] },
    salud: { label: 'Salud y bienestar', comp: [3, '10–12', '60–90 s'], iso: [2, '12–15', '60 s'] }
  };
  const SIZE = { 45: 5, 60: 6, 75: 7, 90: 8 };

  /* ---------- Entrada en calor ---------- */
  const WARM = {
    legs: [['Círculos de cadera: 10 por lado', 'circ-cadera'], ['Balanceos de pierna adelante–atrás: 10 por pierna', 'balanceo'], ['Sentadilla sin peso: 15', 'sentadilla'], ['Puente de glúteos en colchoneta: 15', 'puente'], ['Zancadas caminando sin peso: 10', 'zancadas']],
    push: [['Círculos de brazos adelante y atrás: 10 + 10', 'circ-brazos'], ['Rotaciones de hombro con polea muy liviana: 15 por brazo', 'face-pull'], ['Flexiones con manos en el cajón: 10', 'flex-cajon'], ['Aperturas livianas o pec deck con poco peso: 15', 'aperturas']],
    pull: [['Círculos de brazos adelante y atrás: 10 + 10', 'circ-brazos'], ['Colgarse de la barra (o dorsalera liviana): 20 s', 'colgarse'], ['Face pull liviano en polea: 15', 'face-pull'], ['Rotación de columna en cuadrupedia: 8 por lado', 'cuadrupedia']],
    upper: [['Círculos de brazos adelante y atrás: 10 + 10', 'circ-brazos'], ['Rotaciones de hombro con polea muy liviana: 15 por brazo', 'face-pull'], ['Colgarse de la barra: 20 s', 'colgarse'], ['Flexiones con manos en el cajón: 10', 'flex-cajon']],
    full: [['Círculos de cadera y de brazos: 10 de cada uno', 'circ-brazos'], ['Sentadilla sin peso: 15', 'sentadilla'], ['Flexiones con manos en el cajón: 10', 'flex-cajon'], ['Face pull liviano en polea: 15', 'face-pull'], ['Puente de glúteos: 15', 'puente']]
  };

  /* ---------- Estiramientos (20–30 s cada uno) ---------- */
  const STRETCH = {
    cuadriceps: 'Cuádriceps de pie: llevá el talón a la cola (30 s por pierna)',
    isquios: 'Isquios sentado: piernas estiradas, llevá el pecho hacia las rodillas (30 s)',
    gluteos: 'Glúteo en "figura 4" acostado (30 s por lado)',
    aductores: 'Mariposa sentado: plantas juntas, bajá las rodillas (30 s)',
    gemelos: 'Gemelos contra la pared, talón apoyado (30 s por pierna)',
    cadera: 'Flexor de cadera en estocada con la rodilla de atrás apoyada (30 s por lado)',
    pecho: 'Pecho en el marco de una puerta o en la torre de poleas (30 s por lado)',
    hombro: 'Hombro cruzado: brazo estirado contra el pecho (30 s por lado)',
    triceps: 'Tríceps detrás de la cabeza, empujando el codo (30 s por brazo)',
    dorsal: 'Dorsal: manos en el banco y cadera atrás (postura de oración, 30 s)',
    biceps: 'Bíceps contra la pared, palma apoyada (30 s por brazo)',
    espalda: 'Postura del niño en la colchoneta (30–45 s)',
    abdomen: 'Cobra suave boca abajo, estirando el abdomen (20 s)',
    cuello: 'Cuello: inclinación lateral suave (20 s por lado)'
  };
  const STRETCH_BY = {
    squat: ['cuadriceps', 'gluteos'], 'glute-squat': ['gluteos', 'cuadriceps'], lunge: ['cadera', 'cuadriceps'], hinge: ['isquios', 'espalda'],
    'hip-thrust': ['gluteos', 'cadera'], 'glute-iso': ['gluteos'], abduction: ['gluteos'], adduction: ['aductores'], 'knee-ext': ['cuadriceps'],
    'knee-flex': ['isquios'], calf: ['gemelos'], 'h-push': ['pecho', 'triceps'], 'incline-push': ['pecho', 'hombro'], fly: ['pecho'],
    'v-push': ['hombro', 'triceps'], lateral: ['hombro', 'cuello'], 'rear-delt': ['hombro'], 'v-pull': ['dorsal', 'biceps'],
    'h-pull': ['dorsal', 'espalda'], biceps: ['biceps'], triceps: ['triceps'], core: ['abdomen', 'espalda'], 'low-back': ['espalda']
  };

  /* ---------- Utilidades del catálogo ---------- */
  const lookup = (ref) => {
    const [mid, eid] = ref.split('/');
    const m = MACHINES.find(x => x.id === mid);
    const e = m && m.exercises.find(x => x.id === eid);
    return e ? { m, e, ref } : null;
  };
  function avoided(ref, f) {
    const [mid] = ref.split('/');
    const lists = (f.molestias || []).map(k => AVOID[k] || []);
    if (f.edad === '60+') lists.push(AVOID.mayor);
    return lists.some(l => l.includes(ref) || l.includes(mid + '/*'));
  }
  function options(pattern, f) {
    return (P[pattern] || []).filter(r => !avoided(r, f)).map(lookup).filter(Boolean)
      .filter(o => !(f.nivel === 'principiante' && o.e.level === 'Avanzado'));
  }

  /* ---------- Objetivo (se pueden combinar dos) ---------- */
  const GOAL_ORDER = ['fuerza', 'musculo', 'tonificar', 'salud', 'grasa'];
  function goalsOf(f) {
    const g = (f.objetivos || []).filter(k => GOALS[k]);
    return g.length ? g : ['musculo'];
  }
  function scheme(f) {
    const g = goalsOf(f);
    const base = GOAL_ORDER.find(k => g.includes(k) && k !== 'grasa') || 'grasa';
    const s = { comp: GOALS[base].comp.slice(), iso: GOALS[base].iso.slice() };
    const fat = g.includes('grasa');
    // Bajar de peso + otro objetivo: misma carga, descansos más cortos y cardio al final
    if (fat && base !== 'grasa') {
      if (base !== 'fuerza') s.comp[2] = '60 s';
      s.iso[2] = '45 s';
    }
    return {
      s, fat, combo: fat && base !== 'grasa',
      label: g.map(k => GOALS[k].label).join(' + ')
    };
  }

  /* ---------- Grupos musculares (para armar cada día a mano) ---------- */
  const GROUPS = {
    pecho: { label: 'Pecho', big: 1, up: 1, pats: ['h-push', 'incline-push', 'fly', 'h-push'] },
    espalda: { label: 'Espalda', big: 1, up: 1, pats: ['v-pull', 'h-pull', 'v-pull', 'h-pull', 'low-back'] },
    hombros: { label: 'Hombros', up: 1, pats: ['v-push', 'lateral', 'rear-delt', 'lateral', 'v-push', 'rear-delt'] },
    biceps: { label: 'Bíceps', up: 1, pats: ['biceps', 'biceps', 'biceps'] },
    triceps: { label: 'Tríceps', up: 1, pats: ['triceps', 'triceps', 'triceps'] },
    cuadriceps: { label: 'Pierna delantera', hint: 'cuádriceps', big: 1, legs: 1, pats: ['squat', 'knee-ext', 'lunge', 'squat', 'adduction'] },
    posterior: { label: 'Pierna posterior', hint: 'femorales', big: 1, legs: 1, pats: ['hinge', 'knee-flex', 'hip-thrust', 'knee-flex', 'glute-iso'] },
    gluteos: { label: 'Glúteos', big: 1, legs: 1, pats: ['hip-thrust', 'glute-squat', 'abduction', 'glute-iso', 'lunge'] },
    gemelos: { label: 'Gemelos', legs: 1, pats: ['calf', 'calf'] },
    core: { label: 'Abdomen', pats: ['core', 'core', 'core'] }
  };
  const PRESETS = {
    2: [['pecho', 'espalda', 'hombros', 'biceps', 'triceps'], ['cuadriceps', 'posterior', 'gluteos', 'gemelos']],
    3: [['pecho', 'triceps', 'hombros'], ['espalda', 'biceps'], ['cuadriceps', 'posterior', 'gemelos']],
    4: [['espalda', 'biceps'], ['cuadriceps'], ['pecho', 'triceps'], ['posterior', 'gluteos']],
    5: [['espalda', 'biceps'], ['cuadriceps'], ['pecho', 'triceps'], ['posterior', 'gluteos'], ['hombros']],
    6: [['espalda', 'biceps'], ['cuadriceps'], ['pecho', 'triceps'], ['posterior', 'gluteos'], ['hombros', 'core'], ['pecho', 'espalda']]
  };
  const EXTRAS = {
    hombros: 'Hombros en todos los días de tren superior',
    gemelos: 'Gemelos en todos los días de pierna',
    abs: 'Abdominales al final de cada día'
  };
  const UPPER_KINDS = ['push', 'pull', 'upper', 'full'], LEG_KINDS = ['legs', 'full'];

  /* Reparte los ejercicios del día entre los grupos elegidos (los grandes reciben más) */
  function customSlots(groups, n) {
    const gs = groups.filter(g => GROUPS[g]).sort((a, b) => (GROUPS[b].big || 0) - (GROUPS[a].big || 0));
    if (!gs.length || n <= 0) return [];
    const cnt = Object.fromEntries(gs.map(g => [g, 0]));
    let left = n;
    gs.forEach(g => { if (left > 0) { cnt[g] = 1; left--; } });
    while (left > 0) {
      let best = null, bq = -1;
      gs.forEach(g => {
        if (cnt[g] >= GROUPS[g].pats.length) return;
        const q = (GROUPS[g].big ? 2 : 1) / (cnt[g] + 1);
        if (q > bq) { bq = q; best = g; }
      });
      if (!best) break;
      cnt[best]++; left--;
    }
    // Sin repetir el mismo patrón entre grupos (ej. hip thrust en posterior y glúteos)
    const out = [];
    gs.forEach(g => {
      const pats = GROUPS[g].pats;
      const others = out.slice();
      let k = 0;
      pats.forEach(p => { if (k < cnt[g] && !others.includes(p)) { out.push(p); k++; } });
      for (let i = 0; k < cnt[g] && i < pats.length; i++) { out.push(pats[i]); k++; }
    });
    return out;
  }
  function customKind(groups) {
    const legs = groups.some(g => GROUPS[g] && GROUPS[g].legs), up = groups.some(g => GROUPS[g] && GROUPS[g].up);
    if (legs && up) return 'full';
    if (legs) return 'legs';
    if (!up) return 'full';
    const pull = groups.every(g => ['espalda', 'biceps', 'core'].includes(g));
    const push = groups.every(g => ['pecho', 'triceps', 'hombros', 'core'].includes(g));
    return pull ? 'pull' : push ? 'push' : 'upper';
  }
  function customName(groups) {
    const l = groups.filter(g => GROUPS[g]).map((g, i) => i ? GROUPS[g].label.toLowerCase() : GROUPS[g].label);
    return l.length > 1 ? l.slice(0, -1).join(', ') + ' y ' + l[l.length - 1] : (l[0] || 'Día libre');
  }
  function plan(f) {
    if (f.modo === 'custom') {
      return (f.custom || []).slice(0, f.dias).map(groups => ({
        key: 'c:' + groups.slice().sort().join('+'), name: customName(groups), kind: customKind(groups),
        groups, upper: groups.some(g => GROUPS[g] && GROUPS[g].up), legs: groups.some(g => GROUPS[g] && GROUPS[g].legs)
      }));
    }
    return split(f).map(key => {
      const d = DAYS[key];
      return { key, name: d.name, kind: d.kind, slots: d.slots, upper: UPPER_KINDS.includes(d.kind), legs: LEG_KINDS.includes(d.kind) };
    });
  }

  /* ---------- Generación ---------- */
  function build(f, seed = 0) {
    const { s: goal, fat, combo } = scheme(f);
    const n = SIZE[f.duracion] || 6;
    const ex = f.extras || [];
    const used = {}; // cuántas veces se usó cada tipo de día (para variar)
    return plan(f).map((day, di) => {
      const occ = used[day.key] = (used[day.key] || 0) + 1;
      // Extras fijos que pidió la persona
      const add = [];
      const tag = [];
      const gs = day.groups || [];
      const autoHas = p => !day.groups && day.slots.slice(0, n).includes(p);
      if (ex.includes('hombros') && day.upper && !gs.includes('hombros') && !autoHas('lateral')) { add.push('lateral'); tag.push('hombros'); }
      if (ex.includes('gemelos') && day.legs && !gs.includes('gemelos') && !autoHas('calf')) { add.push('calf'); tag.push('gemelos'); }
      const wantCore = ex.includes('abs') || (!day.groups && f.foco === 'core');
      const coreN = (wantCore ? 1 : 0) + (!day.groups && f.foco === 'core' ? 1 : 0);
      const want = Math.max(2, n - add.length - coreN);
      const base0 = day.groups ? customSlots(day.groups, want) : day.slots;
      // Patrones del día (se saltean los que no tienen opciones por molestias)
      const fill = day.groups ? customSlots(day.groups, n + 4) : ['core', 'calf', 'rear-delt', 'abduction', 'biceps', 'triceps', 'glute-iso'];
      const slots = [];
      for (const pat of base0.concat(fill)) {
        if (slots.length >= want) break;
        if (options(pat, f).length) slots.push(pat);
      }
      add.forEach(p => { if (!slots.includes(p) && options(p, f).length) slots.push(p); });
      for (let i = 0; i < coreN; i++) slots.push('core');
      const taken = new Set(), perPattern = {};
      const items = [];
      slots.forEach((pat) => {
        const opts = options(pat, f).filter(o => !taken.has(o.ref));
        if (!opts.length) return;
        const k = perPattern[pat] = (perPattern[pat] || 0) + 1;
        const start = (seed + occ - 1 + (k - 1) + (pat === 'core' || pat === 'calf' || pat === 'lateral' ? di : 0)) % opts.length;
        const main = opts[start];
        taken.add(main.ref);
        // Alternativas: primero de otras máquinas, después de la misma
        const others = [];
        for (let i = 1; i < opts.length; i++) others.push(opts[(start + i) % opts.length]);
        const alts = others.filter(o => o.m.id !== main.m.id).concat(others.filter(o => o.m.id === main.m.id)).slice(0, 2);
        const comp = COMPOUND.has(pat);
        let [sets, reps, rest] = comp ? goal.comp : goal.iso;
        if (f.nivel === 'principiante') sets = Math.max(2, sets - 1);
        if (f.nivel === 'avanzado' && !comp && sets < 4) sets += 1;
        let dose = `${sets} × ${reps}`;
        if (pat === 'core') { dose = main.e.sets.replace('x', ' × '); rest = '30–45 s'; }
        if (/c\/(pierna|brazo|lado)/.test(main.e.sets) && pat !== 'core') dose += ' c/' + main.e.sets.split('c/')[1];
        items.push({ pat, main, alts, dose, rest, extra: add.includes(pat) });
      });
      const stretchKeys = [...new Set(items.flatMap(it => STRETCH_BY[it.pat] || []))].slice(0, 7);
      const warmMin = f.edad === '60+' || f.edad === '40–59' ? '8–10' : '5–8';
      return {
        n: di + 1, key: day.key, name: day.name, tag,
        warm: [{ t: `${warmMin} min de cardio suave (cinta, bici o elíptico) hasta entrar en calor`, k: 'cardio' },
          ...WARM[day.kind].slice(0, 4).map(([t, k]) => ({ t, k })),
          ...(items[0] ? [{ t: `1–2 series de aproximación del primer ejercicio (${items[0].main.e.name}) con poco peso: 12 reps livianas + 6 reps a mitad de peso`, ref: items[0].main }] : [])],
        items,
        finisher: fat ? (combo
          ? '15–20 min de cardio moderado al final (cinta inclinada, bici o elíptico). Así quemás grasa sin perder la fuerza para las pesas.'
          : '15–20 min de cardio al final (cinta inclinada, bici o elíptico) a ritmo moderado.') : '',
        stretch: stretchKeys.map(k => ({ t: STRETCH[k], k: 's-' + k }))
      };
    });
  }

  /* ---------- Formulario ---------- */
  const DEFAULT = { objetivos: ['musculo'], nivel: 'principiante', dias: 3, duracion: 60, modo: 'auto', foco: 'equilibrado',
    custom: null, extras: ['abs'], edad: '18–39', molestias: [] };
  const KEY = 'qrgym-rutina';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; } };
  const save = (st) => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  /* Ajusta la lista de días armados a mano a la cantidad de días elegida */
  function fitCustom(f) {
    const pre = PRESETS[f.dias] || PRESETS[3];
    const c = (f.custom || []).slice(0, f.dias).map(x => x.slice());
    for (let i = c.length; i < f.dias; i++) c.push(pre[i].slice());
    f.custom = c;
  }

  const exLink = (o, cls = '') => `<a class="${cls}" href="#/m/${o.m.id}/${o.e.id}">${esc(o.e.name)}</a>`;
  const chip = (on, attrs, label, sub) =>
    `<button type="button" class="chip ${on ? 'on' : ''}" ${attrs} aria-pressed="${on}">${esc(label)}${sub ? ` <small>${esc(sub)}</small>` : ''}</button>`;
  const field = (q, inner, hint) => `<fieldset class="rt-field"><legend>${q}</legend>${hint ? `<p class="rt-hint">${hint}</p>` : ''}<div class="chips">${inner}</div></fieldset>`;
  const single = (f, k, opts) => opts.map(([v, l]) => chip(String(f[k]) === String(v), `data-k="${k}" data-v="${v}"`, l)).join('');
  const multi = (f, k, opts) => opts.map(([v, l]) => chip((f[k] || []).includes(v), `data-k="${k}" data-v="${v}" data-multi`, l)).join('');

  function formHTML(f, err) {
    const custom = f.modo === 'custom';
    if (custom) fitCustom(f);
    const days = custom ? `<div class="rt-days">
        ${f.custom.map((gs, i) => `<div class="rt-dayrow ${gs.length ? '' : 'empty'}">
          <span class="rt-num">Día ${i + 1}</span>
          <div class="chips">${Object.entries(GROUPS).map(([g, G]) => chip(gs.includes(g), `data-day="${i}" data-g="${g}"`, G.label, G.hint)).join('')}</div>
        </div>`).join('')}
        <button type="button" class="link-btn" data-preset>↺ Usar el ejemplo para ${f.dias} días</button>
      </div>` : '';
    return `<form class="rt-form card" id="rt-form">
      ${field('¿Cuál es tu objetivo?', multi(f, 'objetivos', Object.entries(GOALS).map(([v, g]) => [v, g.label])),
        'Podés elegir dos. Ej.: <b>Bajar de peso + Ganar músculo</b>.')}
      ${field('¿Qué experiencia tenés?', single(f, 'nivel', [['principiante', 'Principiante (menos de 6 meses)'], ['intermedio', 'Intermedio (6 meses a 2 años)'], ['avanzado', 'Avanzado (más de 2 años)']]))}
      ${field('¿Cuántos días por semana vas a entrenar?', single(f, 'dias', [[2, '2'], [3, '3'], [4, '4'], [5, '5'], [6, '6']]))}
      ${field('¿Cuánto tiempo tenés por sesión?', single(f, 'duracion', [[45, '45 min'], [60, '1 hora'], [75, '1 h 15'], [90, '1 h 30']]))}
      ${field('¿Cómo querés dividir los días?', single(f, 'modo', [['auto', 'Que la app arme la división'], ['custom', 'Elijo yo qué músculos entreno cada día']]))}
      ${custom ? `<fieldset class="rt-field"><legend>¿Qué músculos entrenás cada día?</legend>
          <p class="rt-hint">Tocá uno o varios grupos por día. Ej.: Día 1 espalda y bíceps, Día 2 pierna delantera, Día 3 pecho y tríceps…</p>${days}
          ${err ? `<p class="rt-err">${err}</p>` : ''}</fieldset>`
        : field('¿Querés priorizar alguna zona?', single(f, 'foco', [['equilibrado', 'Todo el cuerpo por igual'], ['piernas', 'Piernas y glúteos'], ['superior', 'Tren superior'], ['core', 'Abdomen / core']]))}
      ${field('¿Querés sumar algo fijo?', multi(f, 'extras', Object.entries(EXTRAS)), 'Se agrega en cada día que corresponda, aunque ese día sea de otro músculo.')}
      ${field('¿Qué edad tenés?', single(f, 'edad', [['<18', 'Menos de 18'], ['18–39', '18 a 39'], ['40–59', '40 a 59'], ['60+', '60 o más']]))}
      ${field('¿Tenés alguna molestia o lesión? (podés marcar varias)',
        multi(f, 'molestias', [['rodilla', 'Rodilla'], ['lumbar', 'Espalda baja'], ['hombro', 'Hombro']]) + chip(!(f.molestias || []).length, 'data-none', 'Ninguna'))}
      <button class="btn rt-go" type="submit">Armar mi rutina →</button>
    </form>`;
  }

  function planHTML(f, days) {
    const sc = scheme(f);
    return `<section class="rt-plan" id="rt-plan">
      <div class="rt-summary card">
        <div>
          <p class="eyebrow">Tu rutina</p>
          <h2 class="title-lg">${days.length} días · ${esc(sc.label)}</h2>
          <p class="muted">Nivel ${esc(f.nivel)} · ${f.duracion} min por sesión${f.modo === 'custom' ? ' · días armados por vos' : ''}${(f.molestias || []).length ? ` · cuidando: ${f.molestias.join(', ')}` : ''}</p>
        </div>
        <div class="rt-actions no-print">
          <button class="btn" data-variant>🔀 Otra variante</button>
          <button class="btn ghost" data-print>🖨 Imprimir</button>
          <button class="btn ghost" data-edit>✏️ Cambiar datos</button>
        </div>
      </div>
      ${sc.combo ? `<p class="rt-note">⚖️ <b>Bajar de peso y ganar músculo a la vez:</b> las pesas van con carga de verdad (para que el músculo crezca o no se pierda), con descansos más cortos y cardio al final para quemar más. Sumá una alimentación con poco déficit y buena proteína.</p>` : ''}
      <div class="rt-week">${days.map(d => `<span><b>D${d.n}</b> ${esc(d.name)}${d.tag.length ? ` <small>+ ${d.tag.join(' + ')}</small>` : ''}</span>`).join('')}</div>
      <p class="rt-tip muted">Tocá un ejercicio para ver cómo se hace. Si la máquina está ocupada, usá cualquiera de las <b>alternativas</b>: trabajan lo mismo. Descansá al menos un día entre sesiones que repiten los mismos músculos.</p>
      ${days.map(d => `<details class="rt-day card" ${d.n === 1 ? 'open' : ''}>
        <summary><span class="rt-num">Día ${d.n}</span><span class="rt-name">${esc(d.name)}${d.tag.length ? ` <small class="rt-tag">+ ${d.tag.join(' + ')}</small>` : ''}</span><span class="rt-count">${d.items.length} ejercicios</span></summary>
        <div class="rt-block rt-warm"><h3>🔥 Entrada en calor <small>10 min</small></h3><ul class="rt-how-list">${d.warm.map(howItem).join('')}</ul></div>
        <div class="rt-block"><h3>🏋️ Ejercicios</h3>
          <ol class="rt-list">${d.items.map(it => `<li class="rt-ex">
            <div class="rt-ex-main">
              <div class="rt-ex-art">${Anim.staticSVG(it.main.m.id, it.main.e, 0.7, 'anim-svg') || ''}</div>
              <div class="rt-ex-info">
                ${exLink(it.main, 'rt-ex-name')}
                <span class="rt-machine">${esc(it.main.m.short)}${it.extra ? ' · <b class="rt-fixed">fijo</b>' : ''}</span>
                <span class="rt-dose"><b>${esc(it.dose)}</b> · descanso ${esc(it.rest)}</span>
              </div>
            </div>
            ${it.alts.length ? `<p class="rt-alts"><span>Si está ocupada:</span> ${it.alts.map(a => `${exLink(a)} <small>(${esc(a.m.short)})</small>`).join(' · ')}</p>` : ''}
          </li>`).join('')}</ol>
          ${d.finisher ? `<p class="rt-finisher">🏃 ${esc(d.finisher)}</p>` : ''}
        </div>
        <div class="rt-block rt-stretch"><h3>🧘 Estiramientos <small>al terminar</small></h3><ul class="rt-how-list">${d.stretch.map(howItem).join('')}</ul></div>
      </details>`).join('')}
      <p class="muted rt-foot">Progresión: cuando completes todas las series con buena técnica, subí un poco el peso la semana siguiente. Ante cualquier molestia, consultá al profesor de sala.</p>
    </section>`;
  }

  /* Ítem de calentamiento / estiramiento con dibujo desplegable */
  function howItem(w) {
    if (typeof w === 'string') return `<li>${esc(w)}</li>`;
    const has = w.ref || (w.k && Anim.getScene('_warm', w.k));
    if (!has) return `<li>${esc(w.t)}</li>`;
    const data = w.ref ? `data-m="${w.ref.m.id}" data-e="${w.ref.e.id}"` : `data-w="${w.k}"`;
    return `<li><details class="rt-how" ${data}><summary><span>${esc(w.t)}</span><span class="rt-how-btn">Ver cómo</span></summary><div class="rt-how-art"></div></details></li>`;
  }
  function mountHow(d) {
    const box = d.querySelector('.rt-how-art');
    if (!d.open || box.childElementCount) return;
    if (d.dataset.w) {
      const g = (window.WARM_GFX || {})[d.dataset.w] || [[], []];
      Anim.mount(box, '_warm', { id: d.dataset.w, name: d.querySelector('summary span').textContent, primary: g[0], secondary: g[1] });
    } else {
      const r = lookup(d.dataset.m + '/' + d.dataset.e);
      if (r) Anim.mount(box, r.m.id, r.e);
    }
  }

  /* Datos guardados con la versión anterior (un solo objetivo) */
  function migrate(form) {
    const f = Object.assign({}, DEFAULT, form);
    if (!form || !form.objetivos) f.objetivos = form && form.objetivo ? [form.objetivo] : DEFAULT.objetivos.slice();
    delete f.objetivo;
    if (!form || !form.extras) f.extras = DEFAULT.extras.slice();
    return f;
  }

  function render(app) {
    document.title = 'Armá tu rutina · QrGym';
    const st = load();
    const f = migrate(st && st.form);
    let seed = (st && st.seed) || 0;
    let showPlan = !!(st && st.done);
    const draw = () => {
      app.innerHTML = `
        <a class="back" href="#/">← Inicio</a>
        <header class="ex-head">
          <p class="eyebrow">${esc(GYM_CONFIG.name)} · Rutina personalizada</p>
          <h1 class="title-xl">Armá tu <span class="accent">rutina</span></h1>
          <p class="lead">Respondé unas preguntas y te armamos la semana con las máquinas del gimnasio, alternativas por si están ocupadas, entrada en calor y estiramientos.</p>
        </header>
        ${showPlan ? planHTML(f, build(f, seed)) : formHTML(f)}`;
      bind();
    };
    const redrawForm = (err) => {
      const form = app.querySelector('#rt-form');
      form.outerHTML = formHTML(f, err);
      bind();
    };
    const bind = () => {
      const form = app.querySelector('#rt-form');
      if (form) {
        form.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
          const k = b.dataset.k, v = isNaN(+b.dataset.v) ? b.dataset.v : +b.dataset.v;
          if (b.hasAttribute('data-multi')) {
            let l = (f[k] || []).filter(x => x !== v);
            if (l.length === (f[k] || []).length) l.push(v);
            if (k === 'objetivos') { if (l.length > 2) l = l.slice(-2); if (!l.length) l = [v]; }
            f[k] = l;
          } else f[k] = v;
          redrawForm();
        });
        form.querySelectorAll('[data-day]').forEach(b => b.onclick = () => {
          const d = f.custom[+b.dataset.day], g = b.dataset.g, i = d.indexOf(g);
          i >= 0 ? d.splice(i, 1) : d.push(g);
          redrawForm();
        });
        const pre = form.querySelector('[data-preset]');
        if (pre) pre.onclick = () => { f.custom = null; redrawForm(); };
        const none = form.querySelector('[data-none]');
        if (none) none.onclick = () => { f.molestias = []; redrawForm(); };
        form.onsubmit = ev => {
          ev.preventDefault();
          if (f.modo === 'custom') {
            fitCustom(f);
            const empty = f.custom.findIndex(d => !d.length);
            if (empty >= 0) { redrawForm(`Elegí al menos un grupo para el Día ${empty + 1}.`); return; }
          }
          showPlan = true; seed = 0;
          save({ form: f, seed, done: true });
          draw(); window.scrollTo(0, 0);
        };
      }
      const q = s => app.querySelector(s);
      if (q('[data-variant]')) q('[data-variant]').onclick = () => { seed++; save({ form: f, seed, done: true }); draw(); };
      if (q('[data-print]')) q('[data-print]').onclick = () => {
        app.querySelectorAll('.rt-day').forEach(d => d.open = true);
        window.print();
      };
      if (q('[data-edit]')) q('[data-edit]').onclick = () => { showPlan = false; draw(); window.scrollTo(0, 0); };
      app.querySelectorAll('.rt-how').forEach(d => d.addEventListener('toggle', () => mountHow(d)));
    };
    draw();
  }

  return { render, build, P, GROUPS, PRESETS };
})();
