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
    legs: ['Círculos de cadera: 10 por lado', 'Balanceos de pierna adelante–atrás: 10 por pierna', 'Sentadilla sin peso: 15', 'Puente de glúteos en colchoneta: 15', 'Zancadas caminando sin peso: 10'],
    push: ['Círculos de brazos adelante y atrás: 10 + 10', 'Rotaciones de hombro con polea muy liviana: 15 por brazo', 'Flexiones con manos en el cajón: 10', 'Aperturas livianas o pec deck con poco peso: 15'],
    pull: ['Círculos de brazos adelante y atrás: 10 + 10', 'Colgarse de la barra (o dorsalera liviana): 20 s', 'Face pull liviano en polea: 15', 'Rotación de columna en cuadrupedia: 8 por lado'],
    upper: ['Círculos de brazos adelante y atrás: 10 + 10', 'Rotaciones de hombro con polea muy liviana: 15 por brazo', 'Face pull liviano: 15', 'Flexiones con manos en el cajón: 10'],
    full: ['Círculos de cadera y de brazos: 10 de cada uno', 'Sentadilla sin peso: 15', 'Flexiones con manos en el cajón: 10', 'Face pull liviano en polea: 15', 'Puente de glúteos: 15']
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

  /* ---------- Generación ---------- */
  function build(f, seed = 0) {
    const goal = GOALS[f.objetivo] || GOALS.musculo;
    const n = SIZE[f.duracion] || 6;
    const used = {}; // cuántas veces se usó cada tipo de día (para variar)
    return split(f).map((key, di) => {
      const day = DAYS[key];
      const occ = used[key] = (used[key] || 0) + 1;
      // Patrones del día (se saltean los que no tienen opciones por molestias) + core al final
      const want = f.foco === 'core' ? n - 2 : n - 1;
      const extra = ['core', 'calf', 'rear-delt', 'abduction', 'biceps', 'triceps', 'glute-iso'];
      const slots = [];
      for (const pat of day.slots.concat(extra)) {
        if (slots.length >= want) break;
        if (options(pat, f).length) slots.push(pat);
      }
      if (f.foco === 'core') slots.push('core');
      slots.push('core');
      const taken = new Set(), perPattern = {};
      const items = [];
      slots.forEach((pat) => {
        const opts = options(pat, f).filter(o => !taken.has(o.ref));
        if (!opts.length) return;
        const k = perPattern[pat] = (perPattern[pat] || 0) + 1;
        const start = (seed + occ - 1 + (k - 1) + (pat === 'core' ? di : 0)) % opts.length;
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
        items.push({ pat, main, alts, dose, rest });
      });
      const stretchKeys = [...new Set(items.flatMap(it => STRETCH_BY[it.pat] || []))].slice(0, 7);
      const warmMin = f.edad === '60+' || f.edad === '40–59' ? '8–10' : '5–8';
      return {
        n: di + 1, key, name: day.name,
        warm: [`${warmMin} min de cardio suave (cinta, bici o elíptico) hasta entrar en calor`, ...WARM[day.kind].slice(0, 4),
          `1–2 series de aproximación del primer ejercicio con poco peso (12 reps livianas + 6 reps a mitad de peso)`],
        items,
        finisher: f.objetivo === 'grasa' ? '15–20 min de cardio al final (cinta inclinada, bici o elíptico) a ritmo moderado.' : '',
        stretch: stretchKeys.map(k => STRETCH[k])
      };
    });
  }

  /* ---------- Formulario ---------- */
  const FIELDS = [
    { k: 'objetivo', q: '¿Cuál es tu objetivo?', o: Object.entries(GOALS).map(([v, g]) => [v, g.label]) },
    { k: 'nivel', q: '¿Qué experiencia tenés?', o: [['principiante', 'Principiante (menos de 6 meses)'], ['intermedio', 'Intermedio (6 meses a 2 años)'], ['avanzado', 'Avanzado (más de 2 años)']] },
    { k: 'dias', q: '¿Cuántos días por semana vas a entrenar?', o: [[2, '2'], [3, '3'], [4, '4'], [5, '5'], [6, '6']] },
    { k: 'duracion', q: '¿Cuánto tiempo tenés por sesión?', o: [[45, '45 min'], [60, '1 hora'], [75, '1 h 15'], [90, '1 h 30']] },
    { k: 'foco', q: '¿Querés priorizar alguna zona?', o: [['equilibrado', 'Todo el cuerpo por igual'], ['piernas', 'Piernas y glúteos'], ['superior', 'Tren superior'], ['core', 'Abdomen / core']] },
    { k: 'edad', q: '¿Qué edad tenés?', o: [['<18', 'Menos de 18'], ['18–39', '18 a 39'], ['40–59', '40 a 59'], ['60+', '60 o más']] },
    { k: 'molestias', q: '¿Tenés alguna molestia o lesión? (podés marcar varias)', multi: true, o: [['rodilla', 'Rodilla'], ['lumbar', 'Espalda baja'], ['hombro', 'Hombro']] }
  ];
  const DEFAULT = { objetivo: 'musculo', nivel: 'principiante', dias: 3, duracion: 60, foco: 'equilibrado', edad: '18–39', molestias: [] };
  const KEY = 'qrgym-rutina';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; } };
  const save = (st) => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  const exLink = (o, cls = '') => `<a class="${cls}" href="#/m/${o.m.id}/${o.e.id}">${esc(o.e.name)}</a>`;

  function formHTML(f) {
    return `<form class="rt-form card" id="rt-form">
      ${FIELDS.map(fl => `<fieldset class="rt-field">
        <legend>${fl.q}</legend>
        <div class="chips">${fl.o.map(([v, l]) => {
          const on = fl.multi ? (f[fl.k] || []).includes(v) : String(f[fl.k]) === String(v);
          return `<button type="button" class="chip ${on ? 'on' : ''}" data-k="${fl.k}" data-v="${v}" ${fl.multi ? 'data-multi' : ''} aria-pressed="${on}">${esc(l)}</button>`;
        }).join('')}${fl.multi ? `<button type="button" class="chip ${(f.molestias || []).length ? '' : 'on'}" data-none>Ninguna</button>` : ''}</div>
      </fieldset>`).join('')}
      <button class="btn rt-go" type="submit">Armar mi rutina →</button>
    </form>`;
  }

  function planHTML(f, days) {
    const goal = GOALS[f.objetivo];
    return `<section class="rt-plan" id="rt-plan">
      <div class="rt-summary card">
        <div>
          <p class="eyebrow">Tu rutina</p>
          <h2 class="title-lg">${days.length} días · ${esc(goal.label)}</h2>
          <p class="muted">Nivel ${esc(f.nivel)} · ${f.duracion} min por sesión${(f.molestias || []).length ? ` · cuidando: ${f.molestias.join(', ')}` : ''}</p>
        </div>
        <div class="rt-actions no-print">
          <button class="btn" data-variant>🔀 Otra variante</button>
          <button class="btn ghost" data-print>🖨 Imprimir</button>
          <button class="btn ghost" data-edit>✏️ Cambiar datos</button>
        </div>
      </div>
      <p class="rt-tip muted">Tocá un ejercicio para ver cómo se hace. Si la máquina está ocupada, usá cualquiera de las <b>alternativas</b>: trabajan lo mismo. Descansá al menos un día entre sesiones que repiten los mismos músculos.</p>
      ${days.map(d => `<details class="rt-day card" ${d.n === 1 ? 'open' : ''}>
        <summary><span class="rt-num">Día ${d.n}</span><span class="rt-name">${esc(d.name)}</span><span class="rt-count">${d.items.length} ejercicios</span></summary>
        <div class="rt-block rt-warm"><h3>🔥 Entrada en calor <small>10 min</small></h3><ul>${d.warm.map(w => `<li>${esc(w)}</li>`).join('')}</ul></div>
        <div class="rt-block"><h3>🏋️ Ejercicios</h3>
          <ol class="rt-list">${d.items.map(it => `<li class="rt-ex">
            <div class="rt-ex-main">
              <div class="rt-ex-art">${Anim.staticSVG(it.main.m.id, it.main.e, 0.7, 'anim-svg') || ''}</div>
              <div class="rt-ex-info">
                ${exLink(it.main, 'rt-ex-name')}
                <span class="rt-machine">${esc(it.main.m.short)}</span>
                <span class="rt-dose"><b>${esc(it.dose)}</b> · descanso ${esc(it.rest)}</span>
              </div>
            </div>
            ${it.alts.length ? `<p class="rt-alts"><span>Si está ocupada:</span> ${it.alts.map(a => `${exLink(a)} <small>(${esc(a.m.short)})</small>`).join(' · ')}</p>` : ''}
          </li>`).join('')}</ol>
          ${d.finisher ? `<p class="rt-finisher">🏃 ${esc(d.finisher)}</p>` : ''}
        </div>
        <div class="rt-block rt-stretch"><h3>🧘 Estiramientos <small>al terminar</small></h3><ul>${d.stretch.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>
      </details>`).join('')}
      <p class="muted rt-foot">Progresión: cuando completes todas las series con buena técnica, subí un poco el peso la semana siguiente. Ante cualquier molestia, consultá al profesor de sala.</p>
    </section>`;
  }

  function render(app) {
    document.title = 'Armá tu rutina · QrGym';
    const st = load();
    let f = Object.assign({}, DEFAULT, st && st.form);
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
    const bind = () => {
      const form = app.querySelector('#rt-form');
      if (form) {
        form.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
          const k = b.dataset.k, v = isNaN(+b.dataset.v) ? b.dataset.v : +b.dataset.v;
          if (b.hasAttribute('data-multi')) {
            const l = new Set(f[k] || []);
            l.has(v) ? l.delete(v) : l.add(v);
            f[k] = [...l];
          } else f[k] = v;
          form.outerHTML = formHTML(f); bind();
        });
        const none = form.querySelector('[data-none]');
        if (none) none.onclick = () => { f.molestias = []; form.outerHTML = formHTML(f); bind(); };
        form.onsubmit = ev => {
          ev.preventDefault();
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
    };
    draw();
  }

  return { render, build, P };
})();
