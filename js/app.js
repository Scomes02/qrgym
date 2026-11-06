/* ============================================================
   QrGym — App (router por hash, sin dependencias)
   Rutas:
     #/                      → inicio
     #/m/<maquina>           → todas las posiciones de una máquina (destino del QR)
     #/m/<maquina>/<ejerc>   → detalle del ejercicio
     #/musculo/<id>          → ejercicios de todas las máquinas para un músculo
   También acepta ?m=<maquina> (útil para QR impresos).
   ============================================================ */

const $app = document.getElementById('app');
const state = { cat: {}, muscle: {}, group: 'Todas', q: '' };

/* Ícono de máquina: dibujo propio o, si no tiene, un cuadro de su primera animación */
function machineIcon(m) {
  if (m.icon && MACHINE_ICONS[m.icon]) return MACHINE_ICONS[m.icon];
  return Anim.staticSVG(m.id, m.exercises[0], 0.55, 'm-icon anim-svg');
}

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const findMachine = id => MACHINES.find(m => m.id === id);
const muscleChips = (ids, cls) => ids.map(id => `<span class="mchip ${cls}">${MUSCLES[id] || id}</span>`).join('');

/* ---------------- Inicio ---------------- */
function renderHome() {
  document.title = 'QrGym · Guía de máquinas';
  $app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">${esc(GYM_CONFIG.name)} · Guía de máquinas</p>
      <h1 class="title-xl">Escaneá. Mirá.<br><span class="accent">Entrená bien.</span></h1>
      <p class="lead">Escaneá el QR de cualquier máquina y vas a ver todas las posiciones, qué músculos trabajás y cómo hacer cada ejercicio.</p>
    </section>

    <div class="home-head">
      <h2 class="title-lg">Máquinas <small>${MACHINES.length}</small></h2>
      <input class="search" type="search" placeholder="Buscar máquina o ejercicio…" value="${esc(state.q)}" aria-label="Buscar">
    </div>
    <div class="chips groups">
      ${['Todas', ...GROUP_ORDER.filter(g => MACHINES.some(m => m.group === g))].map(g =>
        `<button class="chip ${g === state.group ? 'on' : ''}" data-group="${esc(g)}">${esc(g)}</button>`).join('')}
    </div>
    <div class="machine-grid" id="mgrid"></div>

    <h2 class="title-lg" id="musculos">Buscar por músculo</h2>
    <p class="muted">Tocá un músculo del cuerpo para ver con qué máquinas lo podés entrenar.</p>
    <div class="card body-picker">${bodyPair([], [], { interactive: true })}</div>
  `;
  const drawGrid = () => {
    const q = state.q.trim().toLowerCase();
    const list = MACHINES.filter(m =>
      (state.group === 'Todas' || m.group === state.group) &&
      (!q || m.name.toLowerCase().includes(q) || m.short.toLowerCase().includes(q) || m.exercises.some(e => e.name.toLowerCase().includes(q))));
    document.getElementById('mgrid').innerHTML = list.map(m => `
      <a class="machine-card" href="#/m/${m.id}">
        <div class="machine-art">${machineIcon(m)}</div>
        <div>
          <span class="tag">${esc(m.group || '')}</span>
          <h3>${esc(m.short)}</h3>
          <p>${m.exercises.length} ejercicios y posiciones</p>
        </div>
        <span class="arrow">→</span>
      </a>`).join('') || '<p class="empty">No encontramos máquinas con esa búsqueda.</p>';
  };
  drawGrid();
  $app.querySelectorAll('[data-group]').forEach(b => b.onclick = () => {
    state.group = b.dataset.group;
    $app.querySelectorAll('[data-group]').forEach(x => x.classList.toggle('on', x === b));
    drawGrid();
  });
  $app.querySelector('.search').addEventListener('input', ev => { state.q = ev.target.value; drawGrid(); });
  bindMusclePick(id => location.hash = `#/musculo/${id}`);
}

/* ---------------- Página de máquina (destino del QR) ---------------- */
function renderMachine(m) {
  document.title = `${m.short} · QrGym`;
  const cats = [...new Set(m.exercises.map(e => e.cat))];
  const cat = state.cat[m.id] || 'Todas';
  const mus = state.muscle[m.id] || null;
  const list = m.exercises.filter(e =>
    (cat === 'Todas' || e.cat === cat) &&
    (!mus || expandMuscles(e.primary).includes(mus) || expandMuscles(e.secondary).includes(mus)));

  $app.innerHTML = `
    <a class="back" href="#/">← Todas las máquinas</a>
    <header class="m-head">
      <div class="m-head-art">${machineIcon(m)}</div>
      <div>
        <p class="eyebrow">Máquina</p>
        <h1 class="title-xl">${esc(m.name)}</h1>
        <p class="lead">${esc(m.desc)}</p>
      </div>
    </header>

    <details class="safety">
      <summary>⚠️ Seguridad antes de empezar</summary>
      <ul>${m.safety.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
    </details>

    <div class="filters">
      <div class="chips" role="tablist">
        ${['Todas', ...cats].map(c => `<button class="chip ${c === cat ? 'on' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}
      </div>
      <details class="muscle-filter" ${mus ? 'open' : ''}>
        <summary>${mus ? `Músculo: <b>${MUSCLES[mus]}</b>` : 'Filtrar tocando un músculo'}</summary>
        <div class="body-picker">${bodyPair([], [], { interactive: true, selected: mus })}</div>
        ${mus ? '<button class="link-btn" data-clear>Quitar filtro de músculo</button>' : ''}
      </details>
    </div>

    <p class="count">${list.length} ${list.length === 1 ? 'ejercicio' : 'ejercicios'}</p>
    <div class="ex-grid">
      ${list.map(e => exCard(m, e)).join('') || '<p class="empty">No hay ejercicios con ese filtro.</p>'}
    </div>
  `;

  $app.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => { state.cat[m.id] = b.dataset.cat; renderMachine(m); });
  const clr = $app.querySelector('[data-clear]');
  if (clr) clr.onclick = () => { state.muscle[m.id] = null; renderMachine(m); };
  bindMusclePick(id => { state.muscle[m.id] = state.muscle[m.id] === id ? null : id; renderMachine(m); });
}

function exCard(m, e) {
  return `<a class="ex-card" href="#/m/${m.id}/${e.id}">
    <div class="ex-card-bodies">
      ${bodySVG('front', e.primary, e.secondary, { size: 'sm' })}
      ${bodySVG('back', e.primary, e.secondary, { size: 'sm' })}
    </div>
    <div class="ex-card-info">
      <span class="tag">${esc(e.cat)}</span>
      <h3>${esc(e.name)}</h3>
      <p>${expandMuscles(e.primary).map(id => MUSCLES[id]).join(' · ')}</p>
      <span class="sets">${esc(e.sets)}</span>
    </div>
  </a>`;
}

/* ---------------- Detalle de ejercicio ---------------- */
function renderExercise(m, e) {
  document.title = `${e.name} · ${m.short}`;
  const idx = m.exercises.indexOf(e);
  const prev = m.exercises[idx - 1], next = m.exercises[idx + 1];
  const P = expandMuscles(e.primary), S = expandMuscles(e.secondary);

  let posExtra = '';
  if (m.id === 'poleas') {
    posExtra = `<dl class="pos-facts">
      <div><dt>Altura de polea</dt><dd>${e.pos.alt.toUpperCase()}</dd></div>
      <div><dt>Accesorio</dt><dd>${accName(e.pos)}</dd></div>
      <div><dt>Poleas</dt><dd>${e.pos.dual ? 'Las dos' : 'Una'}</dd></div>
      <div class="wide"><dt>Ubicación</dt><dd>${esc(e.pos.orient)}</dd></div>
    </dl>`;
  }

  $app.innerHTML = `
    <a class="back" href="#/m/${m.id}">← ${esc(m.short)}: todas las posiciones</a>
    <header class="ex-head">
      <p class="eyebrow">${esc(m.short)} · ${idx + 1}/${m.exercises.length}</p>
      <h1 class="title-xl">${esc(e.name)}</h1>
      <div class="chips static">
        <span class="chip on">${esc(e.cat)}</span>
        <span class="chip">${esc(e.level)}</span>
        <span class="chip big">${esc(e.sets)}</span>
      </div>
    </header>

    <div class="detail-grid">
      <section class="card">
        <h2 class="title-md">Músculos que trabajás</h2>
        ${bodyPair(P, S, { size: 'lg' })}
        <div class="legend"><span><i class="lg-p"></i>Principal</span><span><i class="lg-s"></i>Secundario</span></div>
        <div class="mchips">${muscleChips(P, 'p')}${muscleChips(S, 's')}</div>
      </section>

      <section class="card">
        <h2 class="title-md">${positionTitle(m.id, e.pos)}</h2>
        <div class="diagram-wrap">${positionDiagram(m.id, e.pos, e)}</div>
        <p class="pos-text">${esc(e.posText)}</p>
        ${posExtra}
        ${(e.ajustes && e.ajustes.length) ? `<div class="ajustes"><b>🔧 Ajustes de la máquina</b><ul>${e.ajustes.map(a => `<li>${esc(a)}</li>`).join('')}</ul></div>` : ''}
      </section>

      <section class="card video-card">
        <h2 class="title-md">Mirá cómo se hace</h2>
        <div class="anim-box">
          <div class="anim" id="anim"></div>
          <div class="anim-ctrl">
            <button class="ctl" data-play aria-label="Pausar">❚❚</button>
            <button class="ctl spd" data-speed="0.5">Lento</button>
            <button class="ctl spd on" data-speed="1">Normal</button>
            <span class="anim-legend"><i class="lg-p"></i>Trabaja fuerte <i class="lg-s"></i>Ayuda</span>
          </div>
        </div>
        ${videoBlock(e)}
      </section>

      <section class="card">
        <h2 class="title-md">Cómo hacerlo</h2>
        <ol class="steps">${e.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
      </section>

      <section class="card tips">
        <h2 class="title-md">✅ Consejos</h2>
        <ul>${e.tips.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      </section>

      <section class="card errors">
        <h2 class="title-md">❌ Errores comunes</h2>
        <ul>${e.errors.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      </section>
    </div>

    <nav class="pager">
      ${prev ? `<a href="#/m/${m.id}/${prev.id}"><small>← Anterior</small>${esc(prev.name)}</a>` : '<span></span>'}
      ${next ? `<a class="next" href="#/m/${m.id}/${next.id}"><small>Siguiente →</small>${esc(next.name)}</a>` : '<span></span>'}
    </nav>
  `;
  enableSwipe(prev && `#/m/${m.id}/${prev.id}`, next && `#/m/${m.id}/${next.id}`);

  const player = Anim.mount(document.getElementById('anim'), m.id, e);
  const playBtn = $app.querySelector('[data-play]');
  if (!player) { $app.querySelector('.anim-box').remove(); return; }
  playBtn.onclick = () => {
    const paused = player.toggle();
    playBtn.textContent = paused ? '▶' : '❚❚';
    playBtn.setAttribute('aria-label', paused ? 'Reproducir' : 'Pausar');
  };
  $app.querySelectorAll('[data-speed]').forEach(b => b.onclick = () => {
    player.setSpeed(parseFloat(b.dataset.speed));
    $app.querySelectorAll('[data-speed]').forEach(x => x.classList.toggle('on', x === b));
  });
}

function videoBlock(e) {
  const v = (e.video || '').trim();
  if (/\.(mp4|webm|mov)(\?|$)/i.test(v)) {
    return `<video src="${esc(v)}" controls playsinline loop muted autoplay preload="metadata"></video>`;
  }
  const yt = v.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  if (yt) {
    return `<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}" title="${esc(e.name)}" allowfullscreen loading="lazy"></iframe></div>`;
  }
  const q = encodeURIComponent(`${e.name} técnica correcta gimnasio`);
  return `<a class="yt-link" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">▶ Ver más ejemplos en YouTube</a>`;
}

/* ---------------- Búsqueda por músculo ---------------- */
function renderMuscle(id) {
  const name = MUSCLES[id];
  if (!name) return renderHome();
  document.title = `${name} · QrGym`;
  const groups = MACHINES.map(m => ({
    m,
    list: m.exercises.filter(e => expandMuscles(e.primary).includes(id) || expandMuscles(e.secondary).includes(id))
      .sort((a, b) => expandMuscles(b.primary).includes(id) - expandMuscles(a.primary).includes(id))
  })).filter(g => g.list.length);

  $app.innerHTML = `
    <a class="back" href="#/">← Inicio</a>
    <header class="ex-head">
      <p class="eyebrow">Buscar por músculo</p>
      <h1 class="title-xl">${esc(name)}</h1>
    </header>
    <div class="card body-picker">${bodyPair([id], [], { interactive: true, selected: id })}</div>
    ${groups.map(g => `
      <h2 class="title-lg with-icon"><span class="mini-icon">${machineIcon(g.m)}</span>${esc(g.m.short)}</h2>
      <div class="ex-grid">${g.list.map(e => exCard(g.m, e)).join('')}</div>`).join('')
      || '<p class="empty">Todavía no hay ejercicios para este músculo.</p>'}
  `;
  bindMusclePick(m => location.hash = `#/musculo/${m}`);
}

/* ---------------- Utilidades ---------------- */
function bindMusclePick(cb) {
  $app.querySelectorAll('[data-m]').forEach(g => {
    g.addEventListener('click', () => cb(g.dataset.m));
    g.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); cb(g.dataset.m); } });
  });
}

let swipeCleanup = null;
function enableSwipe(prevHref, nextHref) {
  if (swipeCleanup) swipeCleanup();
  let x0 = null, y0 = null;
  const start = ev => { x0 = ev.touches[0].clientX; y0 = ev.touches[0].clientY; };
  const end = ev => {
    if (x0 === null) return;
    const dx = ev.changedTouches[0].clientX - x0, dy = ev.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 2) {
      if (dx < 0 && nextHref) location.hash = nextHref;
      if (dx > 0 && prevHref) location.hash = prevHref;
    }
    x0 = null;
  };
  $app.addEventListener('touchstart', start, { passive: true });
  $app.addEventListener('touchend', end, { passive: true });
  swipeCleanup = () => { $app.removeEventListener('touchstart', start); $app.removeEventListener('touchend', end); };
}

function router() {
  if (swipeCleanup) { swipeCleanup(); swipeCleanup = null; }
  Anim.stopAll();
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'm') {
    const m = findMachine(parts[1]);
    if (!m) return renderHome();
    const e = parts[2] && m.exercises.find(x => x.id === parts[2]);
    e ? renderExercise(m, e) : renderMachine(m);
  } else if (parts[0] === 'musculo') {
    renderMuscle(parts[1]);
  } else if (parts[0] === 'musculos') {
    renderHome();
    const t = document.getElementById('musculos');
    if (t) { t.scrollIntoView(); return; }
  } else {
    renderHome();
  }
  window.scrollTo(0, 0);
  $app.classList.remove('enter'); void $app.offsetWidth; $app.classList.add('enter');
}

/* Soporte ?m=prensa (QR impresos) */
const qm = new URLSearchParams(location.search).get('m');
if (qm && !location.hash) location.replace(`${location.pathname}#/m/${qm}`);

window.addEventListener('hashchange', router);
router();
