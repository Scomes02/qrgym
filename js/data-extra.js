/* ============================================================
   QrGym — Máquinas adicionales
   ex(id, nombre, categoría, nivel, series, [principales], [secundarios],
      pos, textoPosición, [pasos], [consejos], [errores], [ajustes])
   ============================================================ */

const ex = (id, name, cat, level, sets, primary, secondary, pos, posText, steps, tips, errors, ajustes) =>
  ({ id, name, cat, level, sets, primary, secondary, pos, posText, steps, tips, errors, ajustes: ajustes || [], video: '' });

const SEAT_TIP = 'Ajustá el asiento antes de cargar peso.';

MACHINES.push(
  /* ===================== SMITH ===================== */
  {
    id: 'smith', name: 'Máquina Smith (Multipower)', short: 'Smith', group: 'Piernas',
    desc: 'Barra guiada por rieles: más estable y segura que la barra libre. Sirve para piernas, glúteos, pecho, hombros y espalda.',
    safety: [
      'Para trabar la barra girala hacia adelante hasta que el gancho entre en el soporte.',
      'Colocá los topes de seguridad a una altura apenas menor a tu recorrido.',
      'La barra baja en línea recta: ubicá el cuerpo según el ejercicio.'
    ],
    exercises: [
      ex('sentadilla', 'Sentadilla en Smith', 'Cuádriceps', 'Principiante', '4x10', ['cuadriceps', 'gluteos'], ['isquios', 'aductores', 'lumbar'],
        { type: 'pies', ancho: 'hombros', adelante: 'debajo' }, 'Barra apoyada sobre el trapecio (no en el cuello). Pies al ancho de hombros, justo debajo de la barra.',
        ['Ubicate debajo de la barra y apoyala sobre la parte alta de la espalda.', 'Destrabá girando la barra y bajá flexionando rodillas y cadera.', 'Bajá hasta que los muslos queden paralelos al piso.', 'Subí empujando con todo el pie.'],
        ['Mirada al frente y pecho afuera.', 'Rodillas en la dirección de las puntas.'], ['Redondear la espalda baja.', 'Levantar los talones.']),
      ex('sentadilla-pies-adelantados', 'Sentadilla con pies adelantados', 'Glúteo', 'Principiante', '4x10', ['gluteos', 'cuadriceps'], ['isquios'],
        { type: 'pies', ancho: 'hombros', adelante: 'adelante' }, 'Pies 30–40 cm por delante de la barra, al ancho de hombros. La espalda queda más vertical.',
        ['Apoyá la barra en la espalda alta y adelantá los pies.', 'Bajá llevando la cadera hacia abajo y atrás.', 'Subí empujando con los talones.'],
        ['Más glúteo y menos carga en la rodilla que la sentadilla normal.'], ['Pies demasiado adelante: se despegan los talones o la cola resbala.']),
      ex('sentadilla-sumo', 'Sentadilla sumo en Smith', 'Aductores', 'Principiante', '3x12', ['aductores', 'gluteos'], ['cuadriceps'],
        { type: 'pies', ancho: 'ancho', adelante: 'debajo', puntas: 'afuera' }, 'Pies bien abiertos, puntas hacia afuera a 30–45°, debajo de la barra.',
        ['Abrí los pies y girá las puntas hacia afuera.', 'Bajá abriendo las rodillas hacia las puntas.', 'Subí apretando glúteos y cara interna del muslo.'],
        ['Torso bien vertical.'], ['Rodillas que se cierran.']),
      ex('zancada', 'Zancada estática (split squat)', 'Glúteo', 'Intermedio', '3x10 c/pierna', ['cuadriceps', 'gluteos'], ['aductores', 'isquios'],
        { type: 'pies', split: true }, 'Un pie adelante (debajo o apenas delante de la barra) y el otro atrás apoyado en la punta.',
        ['Barra en la espalda, un pie adelante y otro atrás.', 'Bajá la rodilla de atrás hacia el piso.', 'Subí empujando con el pie de adelante.'],
        ['Paso largo = más glúteo. Paso corto = más cuádriceps.'], ['Que la rodilla de adelante se vaya hacia adentro.']),
      ex('bulgara', 'Sentadilla búlgara', 'Glúteo', 'Avanzado', '3x8 c/pierna', ['gluteos', 'cuadriceps'], ['aductores', 'isquios'],
        { type: 'pies', split: true, banco: true }, 'Empeine del pie de atrás apoyado en un banco. El pie de adelante a un paso largo.',
        ['Apoyá el empeine de atrás en el banco.', 'Bajá en vertical hasta que el muslo de adelante quede paralelo.', 'Subí empujando con el talón de adelante.'],
        ['Torso un poco inclinado hacia adelante = más glúteo.'], ['Apoyar peso en la pierna de atrás.']),
      ex('press-banca-smith', 'Press de banca en Smith', 'Pecho', 'Principiante', '4x10', ['pecho_inf', 'pecho_sup'], ['deltoide_ant', 'triceps'],
        { type: 'barra', ancho: 'medio' }, 'Banco plano debajo de la barra: la barra baja a la parte media del pecho.',
        ['Acostate con la barra alineada con la mitad del pecho.', 'Destrabá y bajá controlando hasta rozar el pecho.', 'Empujá hasta estirar los brazos.'],
        ['Ubicá bien el banco antes de empezar.'], ['Barra que baja sobre el cuello.']),
      ex('press-inclinado-smith', 'Press inclinado en Smith', 'Pecho', 'Principiante', '4x10', ['pecho_sup'], ['deltoide_ant', 'triceps'],
        { type: 'barra', ancho: 'medio' }, 'Banco a 30–45° debajo de la barra. La barra baja a la parte alta del pecho.',
        ['Inclinación del banco a 30–45°.', 'Bajá la barra hasta debajo de las clavículas.', 'Empujá hacia arriba.'],
        ['Más inclinación = más hombro; 30° es ideal para pecho superior.'], ['Despegar la cola del banco.']),
      ex('press-militar-smith', 'Press militar sentado', 'Hombros', 'Principiante', '4x10', ['deltoide_ant', 'deltoide_lat'], ['triceps', 'trapecio'],
        { type: 'barra', ancho: 'medio' }, 'Banco con respaldo vertical, la barra baja por delante de la cara hasta el mentón.',
        ['Sentate con la espalda apoyada.', 'Bajá la barra hasta el mentón.', 'Empujá hasta casi estirar los brazos.'],
        ['Abdomen firme, sin arquear la espalda.'], ['Bajar por detrás de la nuca.']),
      ex('remo-inclinado-smith', 'Remo inclinado en Smith', 'Espalda', 'Intermedio', '4x10', ['dorsal', 'romboides'], ['biceps', 'deltoide_post', 'lumbar'],
        { type: 'barra', ancho: 'medio' }, 'Torso inclinado ~45°, rodillas apenas flexionadas, barra colgando con brazos estirados.',
        ['Inclinate con la espalda recta.', 'Tirá la barra hacia el abdomen juntando omóplatos.', 'Bajá controlando.'],
        ['Llevá los codos hacia atrás, no hacia afuera.'], ['Encorvar la espalda.']),
      ex('peso-muerto-rumano', 'Peso muerto rumano en Smith', 'Isquios', 'Intermedio', '3x10', ['isquios', 'gluteos'], ['lumbar'],
        { type: 'barra', ancho: 'medio' }, 'Parado con pies al ancho de cadera, barra pegada a los muslos.',
        ['Con rodillas apenas flexionadas, llevá la cadera hacia atrás.', 'Bajá la barra pegada a las piernas hasta media tibia.', 'Volvé apretando glúteos.'],
        ['Sentí el estiramiento en la parte de atrás del muslo.'], ['Redondear la espalda.', 'Doblar mucho las rodillas (se vuelve sentadilla).']),
      ex('hip-thrust-smith', 'Hip thrust en Smith', 'Glúteo', 'Intermedio', '4x10', ['gluteos'], ['isquios', 'abductores'],
        { type: 'banco', pose: 'escapulas' }, 'Espalda alta apoyada en un banco, barra (con protector) sobre la cadera.',
        ['Ubicá el banco detrás y la barra sobre la cadera.', 'Empujá la cadera hacia arriba.', 'Apretá glúteos arriba y bajá controlado.'],
        ['Usá protector o una toalla en la barra.'], ['Arquear la zona lumbar.']),
      ex('gemelos-smith', 'Gemelos de pie en Smith', 'Pantorrilla', 'Principiante', '4x15', ['gemelos'], [],
        { type: 'puntas', dir: 'neutro', borde: true }, 'Puntas de los pies sobre un step o disco, talones en el aire.',
        ['Barra en la espalda y puntas sobre el step.', 'Bajá los talones para estirar.', 'Subí lo más alto posible.'],
        ['Pausa de 1 segundo arriba.'], ['Doblar las rodillas.']),
      ex('remo-menton-smith', 'Remo al mentón en Smith', 'Hombros', 'Intermedio', '3x12', ['deltoide_lat', 'trapecio'], ['biceps'],
        { type: 'barra', ancho: 'medio' }, 'Agarre prono al ancho de hombros, barra frente a los muslos.',
        ['Tirá hacia el pecho alto con los codos hacia arriba.', 'Codos siempre por encima de las manos.', 'Bajá controlando.'],
        ['Si molesta el hombro, subí solo hasta el pecho.'], ['Agarre muy cerrado.']),
      ex('encogimientos', 'Encogimientos (trapecio)', 'Espalda', 'Principiante', '4x15', ['trapecio'], ['antebrazo'],
        { type: 'barra', ancho: 'medio' }, 'Parado, barra frente a los muslos con brazos estirados.',
        ['Subí los hombros hacia las orejas.', 'Sostené 1 segundo.', 'Bajá lento.'],
        ['No gires los hombros: solo arriba y abajo.'], ['Doblar los codos.'])
    ]
  },

  /* ===================== CURL FEMORAL ===================== */
  {
    id: 'curl-femoral', name: 'Curl femoral (Extensión de piernas posterior)', short: 'Curl femoral', group: 'Piernas',
    desc: 'Trabaja la parte de atrás del muslo (isquiotibiales). Acostado boca abajo, llevás los talones hacia la cola.',
    safety: ['El rodillo va apoyado justo arriba del talón, no en la pantorrilla.', 'La rodilla queda alineada con el eje de giro de la máquina.', 'No levantes la cadera del banco.'],
    exercises: [
      ex('estandar', 'Curl femoral acostado', 'Isquios', 'Principiante', '4x12', ['isquios'], ['gemelos'],
        { type: 'puntas', dir: 'neutro' }, 'Boca abajo, rodillas justo fuera del borde del banco, rodillo sobre los tobillos.',
        ['Acostate y tomá las manijas.', 'Llevá los talones hacia la cola.', 'Bajá lento sin que las pesas choquen.'],
        ['Cadera pegada al banco todo el tiempo.'], ['Levantar la cola para ayudarte.', 'Bajar de golpe.'],
        ['Eje de la máquina alineado con la rodilla.', 'Rodillo apoyado arriba del talón.']),
      ex('puntas-adentro', 'Curl con puntas hacia adentro', 'Isquios', 'Intermedio', '3x12', ['isquios'], ['gemelos'],
        { type: 'puntas', dir: 'adentro' }, 'Igual que el estándar pero con las puntas de los pies giradas hacia adentro.',
        ['Girá las puntas hacia adentro.', 'Flexioná las rodillas.', 'Volvé controlando.'],
        ['Enfoca la parte interna (semitendinoso y semimembranoso).'], ['Girar la cadera.']),
      ex('puntas-afuera', 'Curl con puntas hacia afuera', 'Isquios', 'Intermedio', '3x12', ['isquios'], ['gemelos'],
        { type: 'puntas', dir: 'afuera' }, 'Puntas de los pies giradas hacia afuera.',
        ['Girá las puntas hacia afuera.', 'Flexioná las rodillas.', 'Volvé controlando.'],
        ['Enfoca la parte externa (bíceps femoral).'], ['Mover la cadera.']),
      ex('unilateral', 'Curl femoral a una pierna', 'Isquios', 'Intermedio', '3x10 c/pierna', ['isquios'], ['gemelos'],
        { type: 'inicio' }, 'Una sola pierna trabaja; la otra queda estirada y relajada.',
        ['Trabajá con una pierna.', 'Subí el talón hacia la cola.', 'Cambiá de pierna al terminar.'],
        ['Corrige diferencias entre piernas.'], ['Rotar la cadera.']),
      ex('negativo', 'Curl negativo (sube con 2, baja con 1)', 'Isquios', 'Avanzado', '3x6 c/pierna', ['isquios'], ['gemelos'],
        { type: 'inicio' }, 'Subís con las dos piernas y bajás con una sola, muy lento (4–5 segundos).',
        ['Subí con ambas piernas.', 'Soltá una pierna arriba.', 'Bajá con la otra en 4–5 segundos.'],
        ['Muy efectivo para fuerza y prevención de lesiones.'], ['Usar demasiado peso.'])
    ]
  },

  /* ===================== EXTENSIÓN DE CUÁDRICEPS ===================== */
  {
    id: 'extension-cuadriceps', name: 'Sillón de cuádriceps (Leg Extension)', short: 'Sillón cuádriceps', group: 'Piernas',
    desc: 'Aísla el cuádriceps estirando las rodillas desde sentado.',
    safety: ['El eje de la máquina tiene que quedar a la altura de tu rodilla.', 'Rodillo apoyado en la parte baja de la tibia, arriba del tobillo.', 'Sin trabar las rodillas de golpe arriba.'],
    exercises: [
      ex('estandar', 'Extensión de piernas', 'Cuádriceps', 'Principiante', '4x12', ['cuadriceps'], [],
        { type: 'puntas', dir: 'neutro' }, 'Sentado con la espalda apoyada, rodillas en el borde del asiento, rodillo sobre los tobillos.',
        ['Tomá las manijas laterales.', 'Estirá las rodillas hasta arriba.', 'Apretá 1 segundo y bajá lento.'],
        ['Controlá la bajada.'], ['Patear con impulso.', 'Levantar la cola del asiento.'],
        ['Respaldo: rodilla alineada con el eje.', 'Rodillo: arriba del tobillo.']),
      ex('puntas-afuera', 'Extensión con puntas hacia afuera', 'Cuádriceps', 'Intermedio', '3x12', ['cuadriceps'], [],
        { type: 'puntas', dir: 'afuera' }, 'Puntas de los pies giradas hacia afuera.',
        ['Girá las puntas hacia afuera.', 'Estirá las rodillas.', 'Bajá lento.'],
        ['Mayor trabajo del vasto medial (la "gota" sobre la rodilla).'], ['Girar las rodillas.']),
      ex('puntas-adentro', 'Extensión con puntas hacia adentro', 'Cuádriceps', 'Intermedio', '3x12', ['cuadriceps'], [],
        { type: 'puntas', dir: 'adentro' }, 'Puntas de los pies giradas hacia adentro.',
        ['Girá las puntas hacia adentro.', 'Estirá las rodillas.', 'Bajá lento.'],
        ['Mayor trabajo del vasto lateral (parte externa).'], ['Forzar la rotación.']),
      ex('unilateral', 'Extensión a una pierna', 'Cuádriceps', 'Principiante', '3x12 c/pierna', ['cuadriceps'], [],
        { type: 'inicio' }, 'Una pierna trabaja y la otra queda abajo relajada.',
        ['Trabajá con una sola pierna.', 'Estirá completamente.', 'Cambiá de pierna.'],
        ['Ideal si una pierna es más débil.'], ['Ayudarte con la otra pierna.']),
      ex('pausa', 'Extensión con pausa arriba', 'Cuádriceps', 'Intermedio', '3x10', ['cuadriceps'], [],
        { type: 'inicio' }, 'Igual que la estándar, sosteniendo 2–3 segundos con las piernas estiradas.',
        ['Estirá las piernas.', 'Sostené 2–3 segundos apretando.', 'Bajá en 3 segundos.'],
        ['Usá menos peso del habitual.'], ['Perder la pausa en las últimas repeticiones.'])
    ]
  },

  /* ===================== ABDUCTORES / ADUCTORES ===================== */
  {
    id: 'abductores', name: 'Máquina de abductores / aductores', short: 'Abductores / Aductores', group: 'Glúteos',
    desc: 'Una misma máquina para abrir (abductores, glúteo medio) o cerrar (aductores, cara interna) las piernas. Se cambian las almohadillas.',
    safety: ['Elegí el rango de apertura inicial con la palanca antes de cargar peso.', 'Movimiento controlado, sin rebotar.', 'Espalda apoyada salvo en la variante inclinada.'],
    exercises: [
      ex('abduccion', 'Abducción (abrir piernas)', 'Glúteo', 'Principiante', '4x15', ['abductores', 'gluteos'], [],
        { type: 'inicio' }, 'Almohadillas por fuera de las rodillas, piernas juntas al empezar.',
        ['Sentate con la espalda apoyada.', 'Abrí las piernas empujando hacia afuera.', 'Volvé lento sin que choquen las pesas.'],
        ['Pausa de 1 segundo con las piernas abiertas.'], ['Cerrar de golpe.'], ['Almohadillas del lado de afuera.', 'Apertura inicial: piernas juntas.']),
      ex('abduccion-inclinado', 'Abducción inclinado hacia adelante', 'Glúteo', 'Intermedio', '3x15', ['gluteos', 'abductores'], [],
        { type: 'inicio' }, 'Igual que la abducción pero con el torso inclinado hacia adelante, sin apoyar la espalda.',
        ['Inclinate hacia adelante con la espalda recta.', 'Abrí las piernas.', 'Volvé controlando.'],
        ['Involucra más el glúteo mayor.'], ['Encorvar la espalda.']),
      ex('aduccion', 'Aducción (cerrar piernas)', 'Aductores', 'Principiante', '4x15', ['aductores'], [],
        { type: 'inicio' }, 'Almohadillas por dentro de las rodillas, piernas abiertas al empezar.',
        ['Abrí las piernas hasta un estiramiento cómodo.', 'Cerrá las piernas apretando.', 'Volvé lento.'],
        ['No abras más de lo que tu flexibilidad permite.'], ['Arrancar demasiado abierto.'], ['Almohadillas del lado de adentro.', 'Apertura inicial: cómoda, sin dolor.']),
      ex('aduccion-pausa', 'Aducción con pausa', 'Aductores', 'Intermedio', '3x12', ['aductores'], [],
        { type: 'inicio' }, 'Cerrás y sostenés 2 segundos con las piernas juntas.',
        ['Cerrá las piernas.', 'Sostené 2 segundos.', 'Abrí en 3 segundos.'],
        ['Mejor conexión con el músculo.'], ['Usar impulso.'])
    ]
  },

  /* ===================== GEMELOS ===================== */
  {
    id: 'gemelos', name: 'Máquina de gemelos', short: 'Gemelos', group: 'Piernas',
    desc: 'Para las pantorrillas. De pie trabaja más el gemelo; sentado, el sóleo.',
    safety: ['Hombreras bien apoyadas sobre los hombros.', 'Solo la parte delantera del pie sobre el escalón.', 'No rebotes abajo.'],
    exercises: [
      ex('de-pie', 'Gemelos de pie', 'Pantorrilla', 'Principiante', '4x15', ['gemelos'], [],
        { type: 'puntas', dir: 'neutro', borde: true }, 'Puntas al frente sobre el escalón, talones en el aire, piernas estiradas.',
        ['Ubicate debajo de las hombreras.', 'Bajá los talones hasta estirar.', 'Subí lo más alto posible y apretá.'],
        ['Recorrido completo y lento.'], ['Doblar rodillas.', 'Rebotar.']),
      ex('puntas-afuera', 'Gemelos puntas afuera', 'Pantorrilla', 'Principiante', '3x15', ['gemelos'], [],
        { type: 'puntas', dir: 'afuera', borde: true }, 'Puntas giradas hacia afuera.',
        ['Girá las puntas hacia afuera.', 'Subí y bajá controlado.', 'Pausa arriba.'],
        ['Enfoca la cabeza interna del gemelo.'], ['Girar exageradamente.']),
      ex('puntas-adentro', 'Gemelos puntas adentro', 'Pantorrilla', 'Principiante', '3x15', ['gemelos'], [],
        { type: 'puntas', dir: 'adentro', borde: true }, 'Puntas giradas hacia adentro.',
        ['Girá las puntas hacia adentro.', 'Subí y bajá controlado.', 'Pausa arriba.'],
        ['Enfoca la cabeza externa del gemelo.'], ['Rodillas hacia adentro.']),
      ex('una-pierna', 'Gemelos a una pierna', 'Pantorrilla', 'Intermedio', '3x12 c/pierna', ['gemelos'], [],
        { type: 'inicio' }, 'Una sola pierna sobre el escalón, la otra flexionada atrás.',
        ['Apoyá un pie en el escalón.', 'Subí y bajá completo.', 'Cambiá de pierna.'],
        ['Usá menos peso.'], ['Perder el equilibrio: tomate de las manijas.']),
      ex('sentado', 'Gemelos sentado (sóleo)', 'Pantorrilla', 'Principiante', '4x15', ['gemelos'], [],
        { type: 'puntas', dir: 'neutro', borde: true }, 'Sentado con las rodillas bajo la almohadilla y las puntas en el escalón (si el gym tiene la versión sentado).',
        ['Ajustá la almohadilla sobre los muslos.', 'Bajá talones.', 'Subí lo más alto posible.'],
        ['Rodilla doblada = más sóleo.'], ['Recorrido corto.'])
    ]
  },

  /* ===================== DORSALERA ===================== */
  {
    id: 'dorsalera', name: 'Polea al pecho / Dorsalera (Lat Pulldown)', short: 'Dorsalera', group: 'Espalda',
    desc: 'Tirás de la barra desde arriba hacia el pecho. Es el ejercicio base para ensanchar la espalda.',
    safety: ['Ajustá el rodillo para que trabe bien los muslos.', 'Nunca bajes la barra por detrás de la nuca.', 'Soltá la barra controlada, sin dejarla subir de golpe.'],
    exercises: [
      ex('agarre-ancho', 'Jalón al pecho agarre ancho', 'Espalda', 'Principiante', '4x10', ['dorsal'], ['biceps', 'romboides', 'deltoide_post'],
        { type: 'barra', ancho: 'ancho' }, 'Manos en la curva de la barra larga, palmas hacia adelante.',
        ['Sentate con los muslos trabados bajo el rodillo.', 'Inclinate apenas hacia atrás y tirá la barra hasta el pecho alto.', 'Subí estirando completamente los brazos.'],
        ['Pensá en llevar los codos hacia los bolsillos.'], ['Balancearse hacia atrás.', 'Bajar detrás de la nuca.'], ['Rodillo apretando los muslos.']),
      ex('agarre-cerrado', 'Jalón agarre cerrado (triángulo)', 'Espalda', 'Principiante', '4x10', ['dorsal'], ['biceps', 'romboides'],
        { type: 'agarre', grip: 'neutro', ancho: 'cerrado' }, 'Maneral en V (triángulo), palmas enfrentadas.',
        ['Colgá el triángulo y tomalo.', 'Tirá hacia la parte alta del pecho.', 'Subí controlando.'],
        ['Mayor recorrido y trabajo de la parte baja del dorsal.'], ['Inclinarse demasiado.']),
      ex('agarre-supino', 'Jalón agarre supino', 'Espalda', 'Principiante', '3x10', ['dorsal', 'biceps'], ['romboides'],
        { type: 'barra', ancho: 'medio', supino: true }, 'Palmas hacia vos, manos al ancho de hombros.',
        ['Agarrá la barra con palmas hacia vos.', 'Tirá hacia el pecho.', 'Subí estirando.'],
        ['Más trabajo de bíceps.'], ['Tirar solo con los brazos.']),
      ex('una-mano', 'Jalón a una mano', 'Espalda', 'Intermedio', '3x10 c/lado', ['dorsal'], ['biceps'],
        { type: 'agarre', grip: 'neutro', ancho: 'uno' }, 'Maneral simple (D) en una mano.',
        ['Tomá el maneral con una mano.', 'Tirá llevando el codo al costado.', 'Estirá completo arriba.'],
        ['Gran estiramiento del dorsal.'], ['Girar el torso.']),
      ex('brazos-rectos', 'Pullover de pie con brazos rectos', 'Espalda', 'Intermedio', '3x12', ['dorsal'], ['triceps', 'abdomen'],
        { type: 'barra', ancho: 'medio' }, 'De pie frente a la máquina, barra con brazos estirados.',
        ['Parate a un paso de la máquina, torso inclinado.', 'Llevá la barra hasta los muslos sin doblar codos.', 'Subí controlando.'],
        ['Aísla el dorsal.'], ['Doblar los codos.']),
      ex('triceps', 'Extensión de tríceps en dorsalera', 'Tríceps', 'Principiante', '3x12', ['triceps'], [],
        { type: 'barra', ancho: 'cerrado' }, 'De pie frente a la polea alta, barra o cuerda, codos pegados.',
        ['Tomá la barra con codos pegados al cuerpo.', 'Empujá hacia abajo hasta estirar.', 'Volvé hasta 90°.'],
        ['Solo se mueven los antebrazos.'], ['Usar el peso del cuerpo.']),
      ex('crunch', 'Crunch arrodillado', 'Abdomen', 'Principiante', '3x15', ['abdomen'], ['oblicuos'],
        { type: 'inicio' }, 'Arrodillado frente a la polea, cuerda a los costados de la cabeza.',
        ['Arrodillate y tomá la cuerda.', 'Enrollá el tronco hacia las rodillas.', 'Volvé sin soltar la tensión.'],
        ['La cadera no se mueve.'], ['Tirar con los brazos.'])
    ]
  },

  /* ===================== REMO POLEA BAJA ===================== */
  {
    id: 'remo-polea-baja', name: 'Remo en polea baja (Seated Cable Row)', short: 'Remo polea baja', group: 'Espalda',
    desc: 'Sentado con los pies en la plataforma, tirás del cable hacia el abdomen. Espalda media y dorsales.',
    safety: ['Espalda recta, sin redondear al estirar.', 'Rodillas levemente flexionadas.', 'No dejes que el peso te tire hacia adelante.'],
    exercises: [
      ex('triangulo', 'Remo con triángulo', 'Espalda', 'Principiante', '4x12', ['dorsal', 'romboides'], ['biceps', 'deltoide_post', 'trapecio'],
        { type: 'agarre', grip: 'neutro', ancho: 'cerrado' }, 'Maneral en V, palmas enfrentadas.',
        ['Sentate con pies en la plataforma y espalda recta.', 'Tirá hacia el ombligo juntando omóplatos.', 'Estirá los brazos sin encorvarte.'],
        ['Pecho afuera durante todo el ejercicio.'], ['Balancear el torso.']),
      ex('agarre-ancho', 'Remo agarre ancho (barra)', 'Espalda', 'Intermedio', '3x12', ['romboides', 'deltoide_post'], ['trapecio', 'dorsal', 'biceps'],
        { type: 'barra', ancho: 'ancho' }, 'Barra larga, palmas hacia abajo, manos bien abiertas.',
        ['Tomá la barra abierta.', 'Tirá hacia el pecho bajo con codos abiertos.', 'Volvé controlando.'],
        ['Enfoca espalda alta y hombro posterior.'], ['Encoger los hombros.']),
      ex('agarre-supino', 'Remo agarre supino', 'Espalda', 'Principiante', '3x12', ['dorsal'], ['biceps', 'romboides'],
        { type: 'barra', ancho: 'medio', supino: true }, 'Barra recta con palmas hacia arriba.',
        ['Tomá la barra con palmas arriba.', 'Tirá hacia el abdomen con codos pegados.', 'Volvé estirando.'],
        ['Mucho dorsal bajo.'], ['Doblar muñecas.']),
      ex('una-mano', 'Remo a una mano', 'Espalda', 'Intermedio', '3x10 c/lado', ['dorsal', 'romboides'], ['biceps'],
        { type: 'agarre', grip: 'neutro', ancho: 'uno' }, 'Maneral simple en una mano.',
        ['Tomá el maneral con una mano.', 'Tirá llevando el codo atrás.', 'Volvé con rotación leve hacia adelante.'],
        ['Mayor rango de movimiento.'], ['Girar todo el tronco.']),
      ex('face-pull', 'Remo alto a la cara (sentado)', 'Hombros', 'Intermedio', '3x15', ['deltoide_post', 'romboides'], ['trapecio'],
        { type: 'inicio' }, 'Con cuerda, tirás hacia la cara con los codos altos.',
        ['Tomá la cuerda.', 'Tirá hacia la cara abriendo los codos.', 'Volvé controlando.'],
        ['Muy bueno para la postura.'], ['Tirar con la espalda baja.'])
    ]
  },

  /* ===================== REMO EN T ===================== */
  {
    id: 'remo-t', name: 'Remo en T (T-Bar Row)', short: 'Remo en T', group: 'Espalda',
    desc: 'Barra anclada en un extremo. Inclinado, tirás de los discos hacia el pecho. Gran ejercicio para grosor de espalda.',
    safety: ['Espalda recta durante todo el movimiento.', 'Rodillas flexionadas y peso en los talones.', 'Si la máquina tiene apoyo de pecho, usalo.'],
    exercises: [
      ex('agarre-cerrado', 'Remo en T agarre cerrado', 'Espalda', 'Intermedio', '4x10', ['dorsal', 'romboides'], ['biceps', 'lumbar', 'trapecio'],
        { type: 'agarre', grip: 'neutro', ancho: 'cerrado' }, 'Maneral en V debajo de la barra, palmas enfrentadas.',
        ['Parate con la barra entre las piernas e inclinate ~45°.', 'Tirá los discos hacia el pecho.', 'Bajá controlando sin perder la postura.'],
        ['Llevá los codos pegados atrás.'], ['Redondear la espalda.', 'Usar impulso de piernas.']),
      ex('agarre-ancho', 'Remo en T agarre ancho', 'Espalda', 'Intermedio', '3x10', ['romboides', 'trapecio'], ['deltoide_post', 'dorsal'],
        { type: 'barra', ancho: 'ancho' }, 'Manijas anchas con palmas hacia abajo.',
        ['Tomá las manijas abiertas.', 'Tirá con los codos abiertos.', 'Bajá lento.'],
        ['Enfoca la espalda alta.'], ['Encoger el cuello.']),
      ex('agarre-neutro-ancho', 'Remo en T agarre neutro ancho', 'Espalda', 'Intermedio', '3x10', ['dorsal', 'romboides'], ['biceps'],
        { type: 'agarre', grip: 'neutro', ancho: 'ancho' }, 'Manijas paralelas anchas, palmas enfrentadas.',
        ['Tomá las manijas paralelas.', 'Tirá hacia el abdomen alto.', 'Bajá controlando.'],
        ['Cómodo para muñecas y hombros.'], ['Levantar el torso al tirar.']),
      ex('unilateral', 'Remo a una mano (Meadows)', 'Espalda', 'Avanzado', '3x10 c/lado', ['dorsal'], ['romboides', 'biceps'],
        { type: 'agarre', grip: 'prono', ancho: 'uno' }, 'De costado a la barra, tomándola del extremo con una mano.',
        ['Parate de costado e inclinate.', 'Tirá el extremo de la barra hacia la cadera.', 'Bajá estirando bien.'],
        ['Apoyá la otra mano en la rodilla.'], ['Girar el torso.'])
    ]
  },

  /* ===================== PEC DECK ===================== */
  {
    id: 'pec-deck', name: 'Pec Deck / Máquina de aperturas (Fly)', short: 'Pec Deck', group: 'Pecho',
    desc: 'Aperturas guiadas para pecho y, del otro lado, pájaro para hombro posterior.',
    safety: ['Asiento a la altura en que las manijas quedan a nivel del pecho.', 'Codos levemente flexionados.', 'No abras más allá de la línea del cuerpo.'],
    exercises: [
      ex('aperturas', 'Aperturas con manijas', 'Pecho', 'Principiante', '4x12', ['pecho_inf', 'pecho_sup'], ['deltoide_ant'],
        { type: 'inicio' }, 'Sentado con la espalda apoyada, manijas a la altura del pecho, brazos casi estirados.',
        ['Tomá las manijas con codos apenas flexionados.', 'Juntá las manos frente al pecho.', 'Abrí lento hasta sentir estiramiento.'],
        ['Apretá 1 segundo con las manos juntas.'], ['Despegar la espalda.', 'Abrir demasiado.'], ['Asiento: manijas a la altura del pecho.']),
      ex('aperturas-codos', 'Pec deck con codos en almohadillas', 'Pecho', 'Principiante', '4x12', ['pecho_inf'], ['pecho_sup', 'deltoide_ant'],
        { type: 'inicio' }, 'Antebrazos verticales apoyados en las almohadillas, codos a la altura de los hombros.',
        ['Apoyá antebrazos en las almohadillas.', 'Juntá los codos al frente.', 'Volvé controlando.'],
        ['Empujá con los codos, no con las manos.'], ['Codos por encima de los hombros.']),
      ex('un-brazo', 'Apertura a un brazo', 'Pecho', 'Intermedio', '3x12 c/lado', ['pecho_inf'], ['deltoide_ant'],
        { type: 'inicio' }, 'Trabaja un brazo; el otro sostiene su manija quieta.',
        ['Tomá una manija.', 'Llevala hasta el centro.', 'Volvé lento.'],
        ['Más concentración en cada lado.'], ['Girar el torso.']),
      ex('pajaro', 'Pájaro (aperturas invertidas)', 'Hombros', 'Principiante', '4x15', ['deltoide_post'], ['romboides', 'trapecio'],
        { type: 'inicio' }, 'Sentado mirando al respaldo, pecho contra la almohadilla, manijas adelante.',
        ['Ubicate de frente al respaldo.', 'Abrí los brazos hacia atrás en línea con los hombros.', 'Volvé lento.'],
        ['Brazos casi estirados.'], ['Juntar demasiado los omóplatos (pasa a ser espalda).'], ['Manijas en posición trasera.']),
      ex('pajaro-un-brazo', 'Pájaro a un brazo', 'Hombros', 'Intermedio', '3x15 c/lado', ['deltoide_post'], ['romboides'],
        { type: 'inicio' }, 'Un brazo por vez, de frente al respaldo.',
        ['Tomá la manija con una mano.', 'Abrí hacia atrás.', 'Volvé lento.'],
        ['Ideal para corregir asimetrías.'], ['Girar el torso.'])
    ]
  },

  /* ===================== PRESS INCLINADO ===================== */
  {
    id: 'press-inclinado', name: 'Press inclinado (banco inclinado)', short: 'Press inclinado', group: 'Pecho',
    desc: 'Banco inclinado con soporte de barra. Enfoca la parte alta del pecho. También sirve para mancuernas.',
    safety: ['Usá topes o un compañero.', 'Glúteos apoyados en el asiento.', 'Bajá la barra a la parte alta del pecho, no al cuello.'],
    exercises: [
      ex('agarre-medio', 'Press inclinado con barra', 'Pecho', 'Principiante', '4x10', ['pecho_sup'], ['deltoide_ant', 'triceps'],
        { type: 'barra', ancho: 'medio' }, 'Manos 1,5 veces el ancho de hombros, barra baja a debajo de las clavículas.',
        ['Acostate con los ojos bajo la barra.', 'Bajá la barra a la parte alta del pecho.', 'Empujá hacia arriba.'],
        ['Codos a 45–60° del cuerpo.'], ['Rebotar la barra.']),
      ex('agarre-cerrado', 'Press inclinado agarre cerrado', 'Tríceps', 'Intermedio', '3x10', ['triceps', 'pecho_sup'], ['deltoide_ant'],
        { type: 'barra', ancho: 'cerrado' }, 'Manos al ancho de hombros, codos pegados.',
        ['Agarrá cerrado.', 'Bajá con codos pegados.', 'Empujá estirando.'],
        ['Más tríceps.'], ['Abrir codos.']),
      ex('agarre-ancho', 'Press inclinado agarre ancho', 'Pecho', 'Intermedio', '3x8', ['pecho_sup'], ['deltoide_ant'],
        { type: 'barra', ancho: 'ancho' }, 'Manos bien abiertas.',
        ['Agarrá abierto.', 'Bajá controlado.', 'Empujá.'],
        ['Mayor estiramiento del pecho.'], ['Abrir de más: molesta el hombro.']),
      ex('mancuernas', 'Press inclinado con mancuernas', 'Pecho', 'Principiante', '4x10', ['pecho_sup'], ['deltoide_ant', 'triceps'],
        { type: 'inicio' }, 'Banco a 30–45°, una mancuerna en cada mano a la altura del pecho.',
        ['Llevá las mancuernas al pecho.', 'Empujá hacia arriba juntándolas.', 'Bajá hasta sentir estiramiento.'],
        ['Más recorrido que con barra.'], ['Chocar las mancuernas.']),
      ex('aperturas', 'Aperturas inclinadas', 'Pecho', 'Principiante', '3x12', ['pecho_sup'], ['deltoide_ant'],
        { type: 'inicio' }, 'Mancuernas arriba, palmas enfrentadas, codos apenas flexionados.',
        ['Abrí los brazos en arco.', 'Bajá hasta sentir estiramiento.', 'Cerrá arriba.'],
        ['Mismo ángulo de codo todo el ejercicio.'], ['Convertirlo en un press.']),
      ex('remo-apoyado', 'Remo con pecho apoyado', 'Espalda', 'Principiante', '3x12', ['romboides', 'dorsal'], ['deltoide_post', 'biceps'],
        { type: 'inicio' }, 'Boca abajo con el pecho sobre el respaldo inclinado, mancuernas colgando.',
        ['Apoyá el pecho en el banco.', 'Tirá las mancuernas hacia la cadera.', 'Bajá estirando.'],
        ['Sin carga en la zona lumbar.'], ['Despegar el pecho del banco.']),
      ex('curl-inclinado', 'Curl de bíceps inclinado', 'Bíceps', 'Intermedio', '3x12', ['biceps'], ['antebrazo'],
        { type: 'inicio' }, 'Espalda apoyada en el banco inclinado, brazos colgando detrás del cuerpo.',
        ['Dejá colgar los brazos.', 'Subí las mancuernas sin mover los codos.', 'Bajá estirando completo.'],
        ['Gran estiramiento del bíceps.'], ['Llevar los codos adelante.'])
    ]
  },

  /* ===================== PATADA BURRO ===================== */
  {
    id: 'patada-burro', name: 'Máquina de patada de glúteo (Patada burro)', short: 'Patada burro', group: 'Glúteos',
    desc: 'Con apoyo de rodilla y antebrazos, empujás la plataforma hacia atrás con un pie. Aísla el glúteo.',
    safety: ['Apoyá bien antebrazos y rodilla.', 'No arquees la zona lumbar al patear.', 'Movimiento controlado, sin impulso.'],
    exercises: [
      ex('pierna-estirada', 'Patada con pierna estirada', 'Glúteo', 'Principiante', '4x12 c/pierna', ['gluteos'], ['isquios'],
        { type: 'inicio' }, 'Rodilla de apoyo en la almohadilla, pie de trabajo en la plataforma.',
        ['Apoyá antebrazos y una rodilla.', 'Empujá la plataforma hacia atrás estirando la pierna.', 'Apretá el glúteo arriba y volvé lento.'],
        ['Abdomen firme.'], ['Arquear la espalda baja.']),
      ex('rodilla-90', 'Patada burro (rodilla a 90°)', 'Glúteo', 'Principiante', '4x12 c/pierna', ['gluteos'], [],
        { type: 'inicio' }, 'Rodilla de trabajo doblada a 90° todo el ejercicio, empujando con la planta hacia el techo.',
        ['Mantené la rodilla a 90°.', 'Empujá con el talón hacia arriba.', 'Volvé sin apoyar el pie.'],
        ['Menos isquio, más glúteo.'], ['Girar la cadera.']),
      ex('pulsos', 'Pulsos arriba (rango corto)', 'Glúteo', 'Intermedio', '3x20 c/pierna', ['gluteos'], [],
        { type: 'inicio' }, 'Repeticiones cortas en la parte de arriba del movimiento.',
        ['Llevá la pierna arriba.', 'Hacé movimientos cortos sin bajar del todo.', 'Mantené la tensión.'],
        ['Ideal como final de rutina.'], ['Perder la postura.'])
    ]
  },

  /* ===================== HIP THRUST MÁQUINA ===================== */
  {
    id: 'hip-thrust', name: 'Máquina de Hip Thrust', short: 'Hip Thrust', group: 'Glúteos',
    desc: 'Empujás la cadera hacia arriba contra una almohadilla. El ejercicio más efectivo para glúteo.',
    safety: ['Almohadilla sobre la cadera (no sobre el abdomen).', 'Mentón al pecho, mirada al frente.', 'No hiperextiendas la espalda arriba.'],
    exercises: [
      ex('estandar', 'Hip thrust estándar', 'Glúteo', 'Principiante', '4x10', ['gluteos'], ['isquios', 'abductores'],
        { type: 'plataforma', y: 'media', ancho: 'hombros', labels: ['LEJOS', 'MEDIO', 'CERCA'] }, 'Pies al ancho de cadera, a una distancia en la que arriba las tibias quedan verticales.',
        ['Apoyá la espalda alta en el respaldo y la almohadilla en la cadera.', 'Empujá con los talones hacia arriba.', 'Apretá glúteos 1 segundo y bajá controlado.'],
        ['Rodillas, cadera y hombros alineados arriba.'], ['Empujar con la espalda baja.'], ['Respaldo a la altura de los omóplatos.']),
      ex('pies-lejos', 'Pies adelantados', 'Glúteo', 'Intermedio', '3x10', ['gluteos', 'isquios'], [],
        { type: 'plataforma', y: 'alta', ancho: 'hombros', labels: ['LEJOS', 'MEDIO', 'CERCA'] }, 'Pies más lejos del cuerpo.',
        ['Adelantá los pies.', 'Empujá con talones.', 'Bajá controlado.'],
        ['Más trabajo de isquiotibiales.'], ['Estirar demasiado las piernas.']),
      ex('pies-cerca', 'Pies cerca', 'Glúteo', 'Intermedio', '3x10', ['gluteos', 'cuadriceps'], [],
        { type: 'plataforma', y: 'baja', ancho: 'hombros', labels: ['LEJOS', 'MEDIO', 'CERCA'] }, 'Pies más cerca de la cola.',
        ['Acercá los pies.', 'Empujá con todo el pie.', 'Bajá lento.'],
        ['Algo más de cuádriceps.'], ['Levantar talones.']),
      ex('sumo', 'Hip thrust pies abiertos', 'Glúteo', 'Intermedio', '3x12', ['gluteos', 'abductores'], ['aductores'],
        { type: 'plataforma', y: 'media', ancho: 'ancho', puntas: 'afuera', labels: ['LEJOS', 'MEDIO', 'CERCA'] }, 'Pies abiertos con puntas hacia afuera, rodillas abiertas.',
        ['Abrí los pies y las rodillas.', 'Empujá hacia arriba.', 'Mantené las rodillas afuera.'],
        ['Más glúteo medio.'], ['Cerrar las rodillas.']),
      ex('una-pierna', 'Hip thrust a una pierna', 'Glúteo', 'Avanzado', '3x8 c/pierna', ['gluteos'], ['isquios', 'abductores'],
        { type: 'plataforma', y: 'media', ancho: 'uni', labels: ['LEJOS', 'MEDIO', 'CERCA'] }, 'Un pie en el centro; la otra pierna elevada.',
        ['Apoyá un solo pie.', 'Subí la cadera sin girarla.', 'Bajá controlado y cambiá.'],
        ['Corrige diferencias entre glúteos.'], ['Rotar la pelvis.'])
    ]
  },

  /* ===================== REMO INDEPENDIENTE ===================== */
  {
    id: 'remo-independiente', name: 'Remo sentado con brazos independientes', short: 'Remo independiente', group: 'Espalda',
    desc: 'Máquina de remo con palancas separadas para cada brazo y apoyo de pecho.',
    safety: ['Pecho siempre contra la almohadilla.', 'Asiento a la altura en que las manijas quedan a la altura del pecho bajo.', 'Sin girar el torso.'],
    exercises: [
      ex('agarre-neutro', 'Remo agarre neutro', 'Espalda', 'Principiante', '4x12', ['dorsal', 'romboides'], ['biceps', 'deltoide_post'],
        { type: 'agarre', grip: 'neutro', ancho: 'medio' }, 'Manijas verticales, palmas enfrentadas.',
        ['Apoyá el pecho y tomá las manijas verticales.', 'Tirá llevando los codos atrás.', 'Volvé estirando.'],
        ['Codos cerca del cuerpo.'], ['Despegar el pecho.'], ['Asiento: manijas a la altura del pecho bajo.']),
      ex('agarre-prono', 'Remo agarre prono', 'Espalda', 'Principiante', '3x12', ['romboides', 'deltoide_post'], ['trapecio', 'dorsal'],
        { type: 'agarre', grip: 'prono', ancho: 'medio' }, 'Manijas horizontales, palmas hacia abajo.',
        ['Tomá las manijas horizontales.', 'Tirá con codos abiertos.', 'Volvé controlando.'],
        ['Espalda alta.'], ['Encoger hombros.']),
      ex('un-brazo', 'Remo a un brazo', 'Espalda', 'Intermedio', '3x10 c/lado', ['dorsal', 'romboides'], ['biceps'],
        { type: 'agarre', grip: 'neutro', ancho: 'uno' }, 'Una palanca por vez.',
        ['Tomá una manija.', 'Tirá con un brazo.', 'Cambiá de lado.'],
        ['Mayor concentración y rango.'], ['Girar el torso.']),
      ex('remo-alto', 'Remo alto (codos abiertos)', 'Hombros', 'Intermedio', '3x15', ['deltoide_post', 'romboides'], ['trapecio'],
        { type: 'agarre', grip: 'prono', ancho: 'ancho' }, 'Agarre prono con codos a la altura de los hombros.',
        ['Subí los codos a la altura de los hombros.', 'Tirá hacia atrás.', 'Volvé lento.'],
        ['Para hombro posterior.'], ['Usar mucho peso.'])
    ]
  },

  /* ===================== PRESS PECHO MÁQUINA ===================== */
  {
    id: 'press-pecho', name: 'Press de pecho en máquina (Chest Press)', short: 'Press pecho máquina', group: 'Pecho',
    desc: 'Press guiado sentado: más seguro que la barra, ideal para principiantes y para llegar al fallo.',
    safety: ['Asiento a la altura en que las manijas quedan a nivel del pecho medio.', 'Espalda pegada al respaldo.', 'No trabes los codos.'],
    exercises: [
      ex('agarre-horizontal', 'Press agarre horizontal', 'Pecho', 'Principiante', '4x12', ['pecho_inf', 'pecho_sup'], ['triceps', 'deltoide_ant'],
        { type: 'agarre', grip: 'prono', ancho: 'medio' }, 'Manijas horizontales, palmas hacia abajo.',
        ['Sentate con la espalda apoyada.', 'Empujá hacia adelante hasta casi estirar.', 'Volvé lento hasta sentir estiramiento.'],
        ['Omóplatos juntos.'], ['Despegar la espalda.'], ['Asiento: manijas a la altura del pecho medio.']),
      ex('agarre-neutro', 'Press agarre neutro', 'Pecho', 'Principiante', '4x12', ['pecho_inf'], ['triceps', 'deltoide_ant'],
        { type: 'agarre', grip: 'neutro', ancho: 'medio' }, 'Manijas verticales, palmas enfrentadas.',
        ['Tomá las manijas verticales.', 'Empujá con codos cerca del cuerpo.', 'Volvé controlando.'],
        ['Más cómodo para los hombros, más tríceps.'], ['Rebotar.']),
      ex('un-brazo', 'Press a un brazo', 'Pecho', 'Intermedio', '3x10 c/lado', ['pecho_inf'], ['triceps'],
        { type: 'agarre', grip: 'prono', ancho: 'uno' }, 'Una manija por vez.',
        ['Empujá con un brazo.', 'Volvé controlado.', 'Cambiá de lado.'],
        ['Corrige asimetrías.'], ['Girar el torso.'])
    ]
  },

  /* ===================== PRESS HOMBROS MÁQUINA ===================== */
  {
    id: 'press-hombros', name: 'Press de hombros en máquina', short: 'Press hombros', group: 'Hombros',
    desc: 'Press vertical guiado desde sentado para los hombros.',
    safety: ['Asiento a la altura en que las manijas quedan a la altura de los hombros.', 'Espalda apoyada.', 'No arquees la zona lumbar.'],
    exercises: [
      ex('agarre-prono', 'Press hombros agarre prono', 'Hombros', 'Principiante', '4x10', ['deltoide_ant', 'deltoide_lat'], ['triceps', 'trapecio'],
        { type: 'agarre', grip: 'prono', ancho: 'ancho' }, 'Manijas horizontales, palmas hacia adelante.',
        ['Sentate con la espalda apoyada.', 'Empujá hacia arriba.', 'Bajá hasta la altura de las orejas.'],
        ['Abdomen firme.'], ['Arquear la espalda.'], ['Asiento: manijas a la altura de los hombros.']),
      ex('agarre-neutro', 'Press hombros agarre neutro', 'Hombros', 'Principiante', '4x10', ['deltoide_ant'], ['triceps', 'deltoide_lat'],
        { type: 'agarre', grip: 'neutro', ancho: 'medio' }, 'Manijas verticales, palmas enfrentadas.',
        ['Tomá las manijas verticales.', 'Empujá hacia arriba.', 'Bajá controlado.'],
        ['Más amigable para el hombro.'], ['Recorrido corto.']),
      ex('un-brazo', 'Press a un brazo', 'Hombros', 'Intermedio', '3x10 c/lado', ['deltoide_ant', 'deltoide_lat'], ['triceps'],
        { type: 'agarre', grip: 'prono', ancho: 'uno' }, 'Un brazo por vez.',
        ['Empujá con un brazo.', 'Bajá controlado.', 'Cambiá de lado.'],
        ['Mejor estabilidad del core.'], ['Inclinarse al costado.'])
    ]
  },

  /* ===================== HACK ===================== */
  {
    id: 'hack', name: 'Sentadilla Hack (Jaca)', short: 'Hack', group: 'Piernas',
    desc: 'Sentadilla guiada con la espalda apoyada en un respaldo. Gran trabajo de cuádriceps con poca carga en la espalda.',
    safety: ['Hombros bien apoyados bajo las hombreras.', 'Destrabá los seguros cuando estés en posición.', 'Sin trabar las rodillas arriba.'],
    exercises: [
      ex('estandar', 'Hack estándar', 'Cuádriceps', 'Principiante', '4x10', ['cuadriceps', 'gluteos'], ['aductores', 'isquios'],
        { type: 'plataforma', y: 'media', ancho: 'hombros' }, 'Pies al ancho de hombros en el centro de la plataforma.',
        ['Apoyá espalda y hombros.', 'Bajá hasta 90° o más si podés.', 'Subí empujando con todo el pie.'],
        ['Espalda pegada al respaldo.'], ['Levantar talones.', 'Despegar la cadera.']),
      ex('pies-altos', 'Hack pies altos', 'Glúteo', 'Intermedio', '3x10', ['gluteos', 'isquios'], ['cuadriceps'],
        { type: 'plataforma', y: 'alta', ancho: 'hombros' }, 'Pies en la parte alta de la plataforma.',
        ['Subí los pies.', 'Bajá profundo.', 'Empujá con talones.'],
        ['Más glúteo.'], ['Despegar la cadera abajo.']),
      ex('pies-bajos', 'Hack pies bajos', 'Cuádriceps', 'Avanzado', '3x10', ['cuadriceps'], ['gluteos'],
        { type: 'plataforma', y: 'baja', ancho: 'hombros' }, 'Pies en la parte baja de la plataforma.',
        ['Bajá los pies.', 'Bajá controlado.', 'Subí sin levantar talones.'],
        ['Máximo cuádriceps.'], ['Mucho peso: molesta la rodilla.']),
      ex('pies-juntos', 'Hack pies juntos', 'Cuádriceps', 'Intermedio', '3x10', ['cuadriceps'], ['gluteos'],
        { type: 'plataforma', y: 'media', ancho: 'juntos' }, 'Pies juntos en el centro.',
        ['Juntá los pies.', 'Bajá controlando.', 'Subí.'],
        ['Enfoca el vasto lateral.'], ['Rodillas hacia adentro.']),
      ex('sumo', 'Hack sumo', 'Aductores', 'Intermedio', '3x12', ['aductores', 'gluteos'], ['cuadriceps'],
        { type: 'plataforma', y: 'media', ancho: 'ancho', puntas: 'afuera' }, 'Pies bien abiertos con puntas afuera.',
        ['Abrí los pies.', 'Bajá abriendo rodillas.', 'Subí apretando.'],
        ['Cara interna del muslo.'], ['Cerrar rodillas.'])
    ]
  },

  /* ===================== ASISTIDA ===================== */
  {
    id: 'asistida', name: 'Dominadas y fondos asistidos (Gravitron)', short: 'Asistida', group: 'Espalda',
    desc: 'La plataforma te ayuda a levantar tu peso. Más peso en la máquina = más ayuda.',
    safety: ['Cuanto más peso elegís, MÁS fácil es el ejercicio.', 'Subí y bajá de la plataforma con cuidado.', 'Bajá siempre controlado.'],
    exercises: [
      ex('dominada-prona', 'Dominada agarre prono', 'Espalda', 'Principiante', '4x8', ['dorsal'], ['biceps', 'romboides'],
        { type: 'barra', ancho: 'ancho' }, 'Rodillas en la plataforma, manos más abiertas que los hombros, palmas adelante.',
        ['Subí a la plataforma y tomá la barra.', 'Tirá hasta pasar el mentón por arriba.', 'Bajá hasta estirar los brazos.'],
        ['Andá bajando la ayuda semana a semana.'], ['Medio recorrido.'], ['Peso de asistencia: el necesario para hacer 8 repeticiones.']),
      ex('dominada-supina', 'Dominada agarre supino (chin up)', 'Espalda', 'Principiante', '3x8', ['dorsal', 'biceps'], ['romboides'],
        { type: 'barra', ancho: 'medio', supino: true }, 'Palmas hacia vos, manos al ancho de hombros.',
        ['Tomá la barra con palmas hacia vos.', 'Tirá hasta el mentón.', 'Bajá controlado.'],
        ['Más bíceps.'], ['Balancearse.']),
      ex('dominada-neutra', 'Dominada agarre neutro', 'Espalda', 'Principiante', '3x8', ['dorsal'], ['biceps'],
        { type: 'agarre', grip: 'neutro', ancho: 'medio' }, 'Manijas paralelas, palmas enfrentadas.',
        ['Tomá las manijas paralelas.', 'Tirá hasta el mentón.', 'Bajá.'],
        ['La más cómoda para hombros.'], ['Encoger el cuello.']),
      ex('fondos', 'Fondos asistidos', 'Tríceps', 'Principiante', '4x10', ['triceps', 'pecho_inf'], ['deltoide_ant'],
        { type: 'agarre', grip: 'neutro', ancho: 'ancho' }, 'Manos en las paralelas, rodillas en la plataforma.',
        ['Tomá las paralelas con brazos estirados.', 'Bajá doblando los codos a 90°.', 'Subí estirando.'],
        ['Torso recto = tríceps; inclinado = pecho.'], ['Bajar demasiado.'])
    ]
  },

  /* ===================== LUMBARES ===================== */
  {
    id: 'lumbares', name: 'Banco de lumbares (Hiperextensiones 45°)', short: 'Lumbares', group: 'Core',
    desc: 'Fortalece la zona lumbar, glúteos e isquios. También para oblicuos de costado.',
    safety: ['El borde de la almohadilla va a la altura de la cadera (no de la panza).', 'No subas más allá de la línea del cuerpo.', 'Movimiento lento.'],
    exercises: [
      ex('estandar', 'Hiperextensión lumbar', 'Lumbares', 'Principiante', '3x15', ['lumbar'], ['gluteos', 'isquios'],
        { type: 'inicio' }, 'Pies trabados, almohadilla en la cadera, brazos cruzados en el pecho.',
        ['Bajá el tronco con la espalda recta.', 'Subí hasta quedar en línea con las piernas.', 'Bajá lento.'],
        ['Podés sumar un disco al pecho.'], ['Hiperextender arriba.'], ['Almohadilla a la altura de la cadera.']),
      ex('gluteo', 'Hiperextensión enfocada en glúteo', 'Glúteo', 'Principiante', '3x15', ['gluteos', 'isquios'], ['lumbar'],
        { type: 'inicio' }, 'Espalda alta levemente redondeada, puntas afuera, empujás la cadera contra la almohadilla.',
        ['Puntas hacia afuera.', 'Subí apretando el glúteo.', 'Bajá.'],
        ['Menos lumbar, más glúteo.'], ['Arquear la espalda.']),
      ex('oblicuos', 'Elevación lateral (oblicuos)', 'Abdomen', 'Intermedio', '3x12 c/lado', ['oblicuos'], ['lumbar'],
        { type: 'inicio' }, 'De costado sobre la almohadilla.',
        ['Ubicate de costado.', 'Bajá el tronco lateralmente.', 'Subí contrayendo el oblicuo.'],
        ['Movimiento corto y controlado.'], ['Girar el torso.'])
    ]
  },

  /* ===================== SCOTT ===================== */
  {
    id: 'scott', name: 'Banco Scott (Curl predicador)', short: 'Banco Scott', group: 'Brazos',
    desc: 'Los brazos apoyados en una almohadilla inclinada aíslan el bíceps.',
    safety: ['Axilas apoyadas en el borde de la almohadilla.', 'No estires los codos de golpe abajo.', 'Peso moderado.'],
    exercises: [
      ex('barra-z', 'Curl Scott con barra Z', 'Bíceps', 'Principiante', '4x10', ['biceps'], ['antebrazo'],
        { type: 'barra', ancho: 'medio', supino: true }, 'Brazos apoyados en la almohadilla, barra Z en la parte interna.',
        ['Apoyá la parte de atrás del brazo.', 'Subí la barra doblando los codos.', 'Bajá lento sin estirar de golpe.'],
        ['La bajada es la parte más importante.'], ['Levantar los codos de la almohadilla.'], ['Asiento: axilas en el borde de la almohadilla.']),
      ex('agarre-cerrado', 'Curl Scott agarre cerrado', 'Bíceps', 'Intermedio', '3x10', ['biceps'], ['antebrazo'],
        { type: 'barra', ancho: 'cerrado', supino: true }, 'Manos juntas.',
        ['Agarrá cerrado.', 'Subí.', 'Bajá lento.'],
        ['Enfoca la cabeza larga (externa).'], ['Impulso.']),
      ex('agarre-ancho', 'Curl Scott agarre ancho', 'Bíceps', 'Intermedio', '3x10', ['biceps'], [],
        { type: 'barra', ancho: 'ancho', supino: true }, 'Manos abiertas.',
        ['Agarrá abierto.', 'Subí.', 'Bajá lento.'],
        ['Enfoca la cabeza corta (interna).'], ['Doblar muñecas.']),
      ex('mancuerna', 'Curl Scott con mancuerna', 'Bíceps', 'Principiante', '3x10 c/brazo', ['biceps'], ['antebrazo'],
        { type: 'inicio' }, 'Un brazo por vez con mancuerna.',
        ['Apoyá un brazo.', 'Subí la mancuerna.', 'Bajá lento.'],
        ['Mayor concentración.'], ['Girar el hombro.']),
      ex('martillo', 'Curl martillo en Scott', 'Bíceps', 'Principiante', '3x12', ['biceps', 'antebrazo'], [],
        { type: 'agarre', grip: 'neutro', ancho: 'uno' }, 'Mancuerna con palma mirando hacia adentro.',
        ['Agarre neutro.', 'Subí.', 'Bajá.'],
        ['Trabaja braquial y antebrazo.'], ['Impulso.'])
    ]
  },

  /* ===================== SILLA ROMANA ===================== */
  {
    id: 'silla-romana', name: 'Silla romana (elevación de piernas)', short: 'Silla romana', group: 'Core',
    desc: 'Apoyado en los antebrazos con la espalda contra el respaldo, elevás las piernas para trabajar el abdomen.',
    safety: ['Espalda siempre apoyada.', 'No balancees las piernas.', 'Hombros lejos de las orejas.'],
    exercises: [
      ex('rodillas', 'Elevación de rodillas', 'Abdomen', 'Principiante', '3x15', ['abdomen'], ['oblicuos'],
        { type: 'inicio' }, 'Antebrazos en las almohadillas, espalda apoyada, piernas colgando.',
        ['Subí las rodillas hacia el pecho.', 'Enrollá un poco la pelvis arriba.', 'Bajá lento.'],
        ['Exhalá al subir.'], ['Balancearse.']),
      ex('piernas-rectas', 'Elevación de piernas rectas', 'Abdomen', 'Avanzado', '3x10', ['abdomen'], ['oblicuos'],
        { type: 'inicio' }, 'Piernas estiradas durante todo el movimiento.',
        ['Subí las piernas estiradas hasta 90°.', 'Bajá controlando.', 'Sin balanceo.'],
        ['Más difícil que con rodillas.'], ['Arquear la espalda.']),
      ex('oblicuas', 'Elevación oblicua', 'Abdomen', 'Intermedio', '3x12 c/lado', ['oblicuos'], ['abdomen'],
        { type: 'inicio' }, 'Subís las rodillas hacia un costado.',
        ['Subí las rodillas hacia un hombro.', 'Bajá.', 'Alterná lados.'],
        ['Controlá la bajada.'], ['Impulso.'])
    ]
  }
);
