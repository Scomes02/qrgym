/* ============================================================
   QrGym — Datos de máquinas y ejercicios
   Para agregar un video: completar el campo `video` con
   una URL .mp4 / .webm o un link de YouTube.
   ============================================================ */

const MUSCLES = {
  pecho_sup:     'Pecho superior (clavicular)',
  pecho_inf:     'Pecho medio / inferior',
  deltoide_ant:  'Deltoides anterior',
  deltoide_lat:  'Deltoides lateral',
  deltoide_post: 'Deltoides posterior',
  trapecio:      'Trapecio',
  romboides:     'Romboides / espalda media',
  dorsal:        'Dorsal ancho',
  lumbar:        'Lumbares',
  biceps:        'Bíceps / braquial',
  triceps:       'Tríceps',
  antebrazo:     'Antebrazo',
  abdomen:       'Recto abdominal',
  oblicuos:      'Oblicuos',
  cuadriceps:    'Cuádriceps',
  aductores:     'Aductores',
  abductores:    'Glúteo medio (abductores)',
  gluteos:       'Glúteo mayor',
  isquios:       'Isquiotibiales',
  gemelos:       'Gemelos / sóleo'
};

const MACHINES = [
  /* ======================= PRENSA ======================= */
  {
    id: 'prensa',
    name: 'Prensa de piernas 45°',
    short: 'Prensa', group: 'Piernas',
    icon: 'prensa',
    desc: 'Cambiando la posición de los pies sobre la plataforma cambiás qué músculo trabaja más. Elegí una posición y mirá el detalle.',
    safety: [
      'Nunca bloquees las rodillas al estirar las piernas.',
      'La zona lumbar y la cadera siempre pegadas al respaldo.',
      'Quitá los seguros recién cuando estés en posición y volvé a ponerlos al terminar.'
    ],
    exercises: [
      {
        id: 'estandar', name: 'Prensa estándar', cat: 'Cuádriceps', level: 'Principiante', sets: '4x12',
        primary: ['cuadriceps', 'gluteos'], secondary: ['isquios', 'aductores'],
        pos: { y: 'media', ancho: 'hombros' },
        posText: 'Pies en el centro de la plataforma, separados al ancho de hombros, puntas levemente hacia afuera.',
        steps: [
          'Sentate con la espalda y la cadera bien apoyadas en el respaldo.',
          'Apoyá los pies en el centro de la plataforma al ancho de hombros.',
          'Quitá los seguros y bajá controlando hasta que las rodillas formen ~90°.',
          'Empujá con todo el pie (sobre todo talón y medio pie) hasta casi estirar.'
        ],
        tips: ['Las rodillas siguen la dirección de las puntas de los pies.', 'Bajá en 2–3 segundos, subí con fuerza.'],
        errors: ['Despegar la cola del asiento al bajar demasiado.', 'Rodillas que se cierran hacia adentro.'],
        video: ''
      },
      {
        id: 'pies-altos', name: 'Pies altos', cat: 'Glúteo', level: 'Principiante', sets: '4x12',
        primary: ['gluteos', 'isquios'], secondary: ['cuadriceps'],
        pos: { y: 'alta', ancho: 'hombros' },
        posText: 'Pies en la parte superior de la plataforma, al ancho de hombros. Los talones casi en el borde de arriba.',
        steps: [
          'Colocá los pies en la parte alta de la plataforma.',
          'Bajá llevando las rodillas hacia el pecho, sin despegar la cadera.',
          'Empujá con los talones hasta casi estirar las piernas.'
        ],
        tips: ['Pensá en "empujar con los talones": más glúteo e isquios.', 'Mayor recorrido de cadera = más glúteo.'],
        errors: ['Bajar tanto que la pelvis se enrolla y se despega la zona lumbar.'],
        video: ''
      },
      {
        id: 'pies-bajos', name: 'Pies bajos', cat: 'Cuádriceps', level: 'Intermedio', sets: '3x12',
        primary: ['cuadriceps'], secondary: ['gluteos'],
        pos: { y: 'baja', ancho: 'hombros' },
        posText: 'Pies en la parte inferior de la plataforma, al ancho de cadera/hombros. Talones bien apoyados.',
        steps: [
          'Apoyá los pies en la mitad inferior de la plataforma.',
          'Bajá controlando: las rodillas van a pasar por delante de los dedos.',
          'Empujá con todo el pie sin levantar los talones.'
        ],
        tips: ['Usá menos peso que en la estándar.', 'Ideal para enfocar el cuádriceps (zona de la rodilla).'],
        errors: ['Levantar los talones de la plataforma.', 'Bajar rápido con rodillas que molestan: reducí el recorrido.'],
        video: ''
      },
      {
        id: 'sumo', name: 'Pies anchos (sumo)', cat: 'Aductores', level: 'Principiante', sets: '3x12',
        primary: ['aductores', 'gluteos'], secondary: ['cuadriceps'],
        pos: { y: 'media', ancho: 'ancho', puntas: 'afuera' },
        posText: 'Pies bien abiertos (más que el ancho de hombros), puntas hacia afuera ~30–45°, en el centro de la plataforma.',
        steps: [
          'Abrí los pies bastante más que el ancho de hombros, puntas hacia afuera.',
          'Bajá abriendo las rodillas en la misma dirección de las puntas.',
          'Empujá apretando la cara interna del muslo y el glúteo.'
        ],
        tips: ['Trabaja mucho la zona interna del muslo.'],
        errors: ['Que las rodillas se cierren hacia adentro al subir.'],
        video: ''
      },
      {
        id: 'pies-juntos', name: 'Pies juntos', cat: 'Cuádriceps', level: 'Intermedio', sets: '3x12',
        primary: ['cuadriceps'], secondary: ['gluteos'],
        pos: { y: 'media', ancho: 'juntos' },
        posText: 'Pies juntos o casi juntos (ancho de un puño), en el centro de la plataforma, puntas al frente.',
        steps: [
          'Juntá los pies en el centro de la plataforma.',
          'Bajá controlando con las rodillas juntas y alineadas.',
          'Empujá hasta casi estirar.'
        ],
        tips: ['Enfoca la parte externa del cuádriceps (vasto lateral).', 'Recorrido algo más corto que la estándar.'],
        errors: ['Despegar la cadera en el final del recorrido.'],
        video: ''
      },
      {
        id: 'alta-ancha', name: 'Pies altos y anchos', cat: 'Glúteo', level: 'Intermedio', sets: '4x10',
        primary: ['gluteos', 'aductores'], secondary: ['isquios'],
        pos: { y: 'alta', ancho: 'ancho', puntas: 'afuera' },
        posText: 'Pies arriba en la plataforma y bien abiertos, puntas hacia afuera. Máximo trabajo de glúteo.',
        steps: [
          'Colocá los pies en la parte alta y abiertos, puntas hacia afuera.',
          'Bajá llevando las rodillas hacia afuera y hacia los hombros.',
          'Empujá con talones apretando glúteos arriba.'
        ],
        tips: ['La variante preferida para glúteo.'],
        errors: ['Rodillas hacia adentro.', 'Despegar la zona lumbar.'],
        video: ''
      },
      {
        id: 'unilateral', name: 'Prensa a una pierna', cat: 'Glúteo', level: 'Intermedio', sets: '3x10 c/pierna',
        primary: ['cuadriceps', 'gluteos'], secondary: ['abductores', 'isquios'],
        pos: { y: 'media', ancho: 'uni' },
        posText: 'Un solo pie en el centro de la plataforma, alineado con la cadera. El otro pie descansa en el piso o apoyado al costado.',
        steps: [
          'Apoyá un pie en el centro de la plataforma, alineado con tu cadera.',
          'Bajá controlando, sin que la rodilla se vaya hacia adentro.',
          'Empujá hasta casi estirar. Hacé todas las repeticiones y cambiá de pierna.'
        ],
        tips: ['Usá menos de la mitad del peso que usás con dos piernas.', 'Corrige diferencias de fuerza entre piernas.'],
        errors: ['Girar la cadera para "ayudarse".'],
        video: ''
      },
      {
        id: 'gemelos', name: 'Gemelos en prensa', cat: 'Pantorrilla', level: 'Principiante', sets: '4x15',
        primary: ['gemelos'], secondary: [],
        pos: { y: 'borde', ancho: 'hombros' },
        posText: 'Solo la punta del pie (metatarso) sobre el borde inferior de la plataforma, talones en el aire. Piernas casi estiradas.',
        steps: [
          'Con las piernas casi estiradas, apoyá solo la punta de los pies en el borde de abajo.',
          'Dejá bajar los talones para estirar la pantorrilla.',
          'Empujá con la punta de los pies lo más alto posible y apretá 1 segundo.'
        ],
        tips: ['NO quites los seguros para este ejercicio si la máquina lo permite.', 'Recorrido completo: estirar bien y subir bien.'],
        errors: ['Doblar las rodillas en cada repetición.', 'Rebotar abajo.'],
        video: ''
      }
    ]
  },

  /* ===================== PRESS BANCA ===================== */
  {
    id: 'press-banca',
    name: 'Press de banca recto',
    short: 'Press banca', group: 'Pecho',
    icon: 'banca',
    desc: 'La posición de las manos en la barra cambia el músculo protagonista. El banco además sirve para ejercicios con mancuernas.',
    safety: [
      'Usá los topes de seguridad o pedí a alguien que te asista.',
      'Pulgares siempre rodeando la barra (nada de agarre "suicida").',
      'Pies firmes en el piso y glúteos apoyados en el banco.'
    ],
    exercises: [
      {
        id: 'agarre-medio', name: 'Press banca agarre medio', cat: 'Pecho', level: 'Principiante', sets: '4x10',
        primary: ['pecho_inf', 'pecho_sup'], secondary: ['deltoide_ant', 'triceps'],
        pos: { type: 'barra', ancho: 'medio' },
        posText: 'Manos un poco más abiertas que los hombros (1,5 veces el ancho de hombros). Antebrazos verticales abajo.',
        steps: [
          'Acostate con los ojos debajo de la barra y los pies firmes en el piso.',
          'Juntá los omóplatos y agarrá la barra un poco más abierto que los hombros.',
          'Sacá la barra, bajala controlada hasta tocar la parte media/baja del pecho.',
          'Empujá hacia arriba hasta estirar los brazos.'
        ],
        tips: ['Codos a ~45–70° del cuerpo, no totalmente abiertos.', 'Leve arco natural en la espalda, glúteos apoyados.'],
        errors: ['Rebotar la barra en el pecho.', 'Levantar la cola del banco.'],
        video: ''
      },
      {
        id: 'agarre-ancho', name: 'Press banca agarre ancho', cat: 'Pecho', level: 'Intermedio', sets: '4x8',
        primary: ['pecho_inf'], secondary: ['pecho_sup', 'deltoide_ant'],
        pos: { type: 'barra', ancho: 'ancho' },
        posText: 'Manos bien abiertas, cerca del final del moleteado (aprox. 2 veces el ancho de hombros).',
        steps: [
          'Agarrá la barra bien abierto, sin pasar el final del moleteado.',
          'Bajá controlando hasta la parte media del pecho (recorrido más corto).',
          'Empujá hacia arriba sintiendo el estiramiento del pecho.'
        ],
        tips: ['Mayor estiramiento del pectoral, menos tríceps.'],
        errors: ['Abrir demasiado: puede molestar el hombro.'],
        video: ''
      },
      {
        id: 'agarre-cerrado', name: 'Press banca agarre cerrado', cat: 'Tríceps', level: 'Intermedio', sets: '3x10',
        primary: ['triceps'], secondary: ['pecho_inf', 'deltoide_ant'],
        pos: { type: 'barra', ancho: 'cerrado' },
        posText: 'Manos al ancho de hombros o apenas menos. Codos pegados al cuerpo.',
        steps: [
          'Agarrá la barra al ancho de hombros.',
          'Bajá con los codos pegados al cuerpo hasta la parte baja del pecho.',
          'Empujá estirando los brazos: sentí el tríceps.'
        ],
        tips: ['No hace falta juntar las manos al centro: cuida las muñecas.'],
        errors: ['Manos demasiado juntas.', 'Abrir los codos.'],
        video: ''
      },
      {
        id: 'agarre-invertido', name: 'Press banca agarre invertido', cat: 'Pecho', level: 'Avanzado', sets: '3x8',
        primary: ['pecho_sup'], secondary: ['triceps', 'deltoide_ant'],
        pos: { type: 'barra', ancho: 'medio', supino: true },
        posText: 'Palmas mirando hacia tu cara (agarre supino), manos algo más abiertas que los hombros.',
        steps: [
          'Agarrá la barra con las palmas hacia vos.',
          'Sacala con ayuda de un compañero y bajá hacia la parte baja del pecho.',
          'Empujá hacia arriba y un poco hacia atrás.'
        ],
        tips: ['Mucho trabajo de pecho superior.', 'Usá poco peso y SIEMPRE con asistencia.'],
        errors: ['Hacerlo sin ayudante o sin topes de seguridad.'],
        video: ''
      },
      {
        id: 'press-frances', name: 'Press francés con barra', cat: 'Tríceps', level: 'Intermedio', sets: '3x12',
        primary: ['triceps'], secondary: ['antebrazo'],
        pos: { type: 'barra', ancho: 'cerrado' },
        posText: 'Acostado en el banco, manos al ancho de hombros (o con barra Z), brazos verticales.',
        steps: [
          'Acostate con la barra arriba, brazos estirados sobre el pecho.',
          'Doblá solo los codos y bajá la barra hacia la frente o detrás de la cabeza.',
          'Estirá los codos volviendo arriba sin mover los hombros.'
        ],
        tips: ['Codos apuntando al techo durante todo el movimiento.'],
        errors: ['Abrir los codos hacia afuera.', 'Mover los hombros: se convierte en press.'],
        video: ''
      },
      {
        id: 'press-mancuernas', name: 'Press con mancuernas', cat: 'Pecho', level: 'Principiante', sets: '4x10',
        primary: ['pecho_inf', 'pecho_sup'], secondary: ['deltoide_ant', 'triceps'],
        pos: { type: 'banco', pose: 'acostado' },
        posText: 'Acostado boca arriba en el banco, una mancuerna en cada mano a la altura del pecho, pies en el piso.',
        steps: [
          'Sentate con las mancuernas sobre los muslos y acostate llevándolas al pecho.',
          'Empujá hacia arriba juntando las mancuernas sin chocarlas.',
          'Bajá controlando hasta sentir estiramiento en el pecho.'
        ],
        tips: ['Más recorrido que con barra.', 'Ideal para corregir desequilibrios entre lados.'],
        errors: ['Bajar los codos muy por debajo del banco.'],
        video: ''
      },
      {
        id: 'aperturas', name: 'Aperturas con mancuernas', cat: 'Pecho', level: 'Principiante', sets: '3x12',
        primary: ['pecho_inf', 'pecho_sup'], secondary: ['deltoide_ant'],
        pos: { type: 'banco', pose: 'acostado' },
        posText: 'Acostado, mancuernas arriba con palmas enfrentadas y codos apenas flexionados.',
        steps: [
          'Comenzá con las mancuernas arriba, palmas mirándose.',
          'Abrí los brazos en arco, codos levemente doblados, hasta sentir estiramiento.',
          'Cerrá "abrazando un árbol" hasta arriba.'
        ],
        tips: ['El codo mantiene el mismo ángulo todo el ejercicio.', 'Peso moderado.'],
        errors: ['Doblar y estirar los codos (se vuelve un press).', 'Bajar demasiado con mucho peso.'],
        video: ''
      },
      {
        id: 'pullover', name: 'Pullover con mancuerna', cat: 'Espalda', level: 'Intermedio', sets: '3x12',
        primary: ['dorsal', 'pecho_inf'], secondary: ['triceps', 'abdomen'],
        pos: { type: 'banco', pose: 'transversal' },
        posText: 'Solo la parte alta de la espalda apoyada en el banco (de costado), cadera baja, una mancuerna sostenida con ambas manos.',
        steps: [
          'Apoyá la parte alta de la espalda en el banco, cruzado, pies firmes.',
          'Con la mancuerna sobre el pecho, llevala en arco hacia atrás de la cabeza.',
          'Volvé al punto inicial con los brazos casi estirados.'
        ],
        tips: ['Mantené el abdomen firme y la cadera estable.'],
        errors: ['Doblar mucho los codos.', 'Bajar más allá de lo que permite el hombro.'],
        video: ''
      },
      {
        id: 'remo-unilateral', name: 'Remo a una mano', cat: 'Espalda', level: 'Principiante', sets: '3x10 c/lado',
        primary: ['dorsal', 'romboides'], secondary: ['biceps', 'deltoide_post'],
        pos: { type: 'banco', pose: 'rodilla' },
        posText: 'Rodilla y mano del mismo lado apoyadas en el banco, espalda recta y paralela al piso, la otra pierna en el piso.',
        steps: [
          'Apoyá rodilla y mano en el banco, espalda plana.',
          'Con el brazo libre colgando, tirá de la mancuerna hacia la cadera.',
          'Bajá controlando hasta estirar el brazo.'
        ],
        tips: ['Llevá el codo hacia atrás y hacia la cadera, no hacia arriba.'],
        errors: ['Girar el torso para subir más peso.', 'Encorvar la espalda.'],
        video: ''
      },
      {
        id: 'fondos-banco', name: 'Fondos de tríceps en banco', cat: 'Tríceps', level: 'Principiante', sets: '3x12',
        primary: ['triceps'], secondary: ['pecho_inf', 'deltoide_ant'],
        pos: { type: 'banco', pose: 'manos-borde' },
        posText: 'De espaldas al banco, manos en el borde al ancho de hombros, piernas hacia adelante.',
        steps: [
          'Apoyá las manos en el borde del banco con los dedos hacia adelante.',
          'Bajá el cuerpo doblando los codos hasta ~90°.',
          'Empujá estirando los brazos.'
        ],
        tips: ['Piernas dobladas = más fácil. Estiradas = más difícil.', 'Espalda cerca del banco.'],
        errors: ['Bajar demasiado y forzar el hombro.', 'Abrir los codos hacia los costados.'],
        video: ''
      },
      {
        id: 'hip-thrust', name: 'Hip thrust con apoyo en banco', cat: 'Glúteo', level: 'Intermedio', sets: '4x10',
        primary: ['gluteos'], secondary: ['isquios', 'abductores'],
        pos: { type: 'banco', pose: 'escapulas' },
        posText: 'Parte baja de los omóplatos apoyada en el borde del banco, barra (con protector) o mancuerna sobre la cadera.',
        steps: [
          'Sentate en el piso con la espalda alta contra el borde del banco.',
          'Colocá la barra o mancuerna sobre la cadera y los pies al ancho de cadera.',
          'Empujá la cadera hacia arriba hasta alinear rodillas, cadera y hombros.',
          'Apretá glúteos 1 segundo arriba y bajá controlado.'
        ],
        tips: ['Mentón hacia el pecho, mirada al frente.', 'Tibias verticales en la posición de arriba.'],
        errors: ['Arquear la zona lumbar en vez de extender la cadera.'],
        video: ''
      }
    ]
  },

  /* ======================== POLEAS ======================== */
  {
    id: 'poleas',
    name: 'Poleas / Cruce de poleas (Crossover)',
    short: 'Poleas', group: 'Multiuso',
    icon: 'poleas',
    desc: 'La máquina más versátil del gimnasio. Cambiando la altura de la polea y el accesorio podés entrenar todo el cuerpo.',
    safety: [
      'Verificá que el pasador de la altura y el del peso estén bien trabados.',
      'Soltá el peso controlado: nunca lo dejes caer de golpe.',
      'Revisá que el mosquetón del accesorio esté cerrado.'
    ],
    exercises: [
      // ---- Pecho
      {
        id: 'cruce-alto', name: 'Cruce de poleas alto', cat: 'Pecho', level: 'Principiante', sets: '3x12',
        primary: ['pecho_inf'], secondary: ['pecho_sup', 'deltoide_ant'],
        pos: { alt: 'alta', acc: 'maneral', dual: true, orient: 'Parado en el centro, de espaldas a la máquina, un paso adelante.' },
        posText: 'Ambas poleas arriba. Un maneral en cada mano, un pie adelante, torso levemente inclinado.',
        steps: ['Tomá ambos manerales y da un paso al frente.', 'Con codos semiflexionados, llevá las manos hacia abajo y al centro.', 'Juntá las manos frente a la cadera y volvé controlando.'],
        tips: ['Enfoca la parte baja del pecho.'], errors: ['Doblar y estirar los codos.'], video: ''
      },
      {
        id: 'cruce-medio', name: 'Cruce de poleas medio', cat: 'Pecho', level: 'Principiante', sets: '3x12',
        primary: ['pecho_inf', 'pecho_sup'], secondary: ['deltoide_ant'],
        pos: { alt: 'media', acc: 'maneral', dual: true, orient: 'De espaldas a la máquina, en el centro, un pie adelante.' },
        posText: 'Ambas poleas a la altura del pecho. Un maneral en cada mano.',
        steps: ['Colocá ambas poleas a la altura del pecho.', 'Abrazá hacia adelante juntando las manos frente al pecho.', 'Volvé lento hasta sentir estiramiento.'],
        tips: ['Apretá 1 segundo con las manos juntas.'], errors: ['Encoger los hombros.'], video: ''
      },
      {
        id: 'cruce-bajo', name: 'Cruce de poleas bajo', cat: 'Pecho', level: 'Principiante', sets: '3x12',
        primary: ['pecho_sup'], secondary: ['deltoide_ant', 'biceps'],
        pos: { alt: 'baja', acc: 'maneral', dual: true, orient: 'De espaldas a la máquina, en el centro.' },
        posText: 'Ambas poleas abajo. Las manos suben desde la cadera hasta la altura de los ojos.',
        steps: ['Tomá los manerales desde abajo.', 'Subí las manos en arco hacia adelante y arriba.', 'Juntalas frente a la cara y bajá controlando.'],
        tips: ['Enfoca el pecho superior.'], errors: ['Usar impulso con la espalda.'], video: ''
      },
      {
        id: 'press-pecho-polea', name: 'Press de pecho en polea', cat: 'Pecho', level: 'Principiante', sets: '3x12',
        primary: ['pecho_inf'], secondary: ['triceps', 'deltoide_ant'],
        pos: { alt: 'media', acc: 'maneral', dual: true, orient: 'De espaldas a la máquina, un pie adelante.' },
        posText: 'Poleas a la altura del pecho. Empujás hacia adelante como en un press.',
        steps: ['Manos al costado del pecho, codos atrás.', 'Empujá hacia adelante hasta estirar los brazos.', 'Volvé controlando.'],
        tips: ['Buena alternativa al press de banca.'], errors: ['Inclinarse demasiado hacia adelante.'], video: ''
      },
      // ---- Espalda
      {
        id: 'remo-bajo', name: 'Remo en polea baja', cat: 'Espalda', level: 'Principiante', sets: '4x12',
        primary: ['dorsal', 'romboides'], secondary: ['biceps', 'deltoide_post', 'trapecio'],
        pos: { alt: 'baja', acc: 'v', orient: 'De frente a la polea, sentado en el piso o de pie con rodillas flexionadas.' },
        posText: 'Polea abajo con maneral en V. Espalda recta y pecho afuera.',
        steps: ['Tomá el maneral V y alejate hasta tensar el cable.', 'Tirá hacia el abdomen juntando los omóplatos.', 'Estirá los brazos sin encorvar la espalda.'],
        tips: ['Codos pegados al cuerpo.'], errors: ['Balancear el torso para tirar.'], video: ''
      },
      {
        id: 'jalon-brazos-rectos', name: 'Jalón con brazos rectos', cat: 'Espalda', level: 'Intermedio', sets: '3x12',
        primary: ['dorsal'], secondary: ['triceps', 'abdomen'],
        pos: { alt: 'alta', acc: 'barra', orient: 'De frente a la polea, un paso atrás, torso inclinado ~30°.' },
        posText: 'Polea arriba con barra recta o cuerda, brazos estirados.',
        steps: ['Tomá la barra con brazos estirados a la altura de la cabeza.', 'Llevá la barra hacia los muslos en arco sin doblar codos.', 'Subí controlando.'],
        tips: ['Aísla el dorsal sin usar bíceps.'], errors: ['Doblar los codos.'], video: ''
      },
      {
        id: 'jalon-unilateral', name: 'Jalón arrodillado a una mano', cat: 'Espalda', level: 'Intermedio', sets: '3x10 c/lado',
        primary: ['dorsal'], secondary: ['biceps', 'romboides'],
        pos: { alt: 'alta', acc: 'maneral', orient: 'Arrodillado frente a la polea, de costado.' },
        posText: 'Polea arriba, un maneral. Arrodillado, tirás con un brazo hacia la cadera.',
        steps: ['Arrodillate con el brazo estirado arriba.', 'Tirá llevando el codo hacia la cadera.', 'Volvé estirando completamente.'],
        tips: ['Sentí el estiramiento del dorsal arriba.'], errors: ['Girar todo el torso.'], video: ''
      },
      {
        id: 'remo-unilateral-pie', name: 'Remo a una mano de pie', cat: 'Espalda', level: 'Principiante', sets: '3x12 c/lado',
        primary: ['dorsal', 'romboides'], secondary: ['biceps', 'deltoide_post'],
        pos: { alt: 'media', acc: 'maneral', orient: 'De frente a la polea, pie contrario adelante.' },
        posText: 'Polea a la altura del pecho/abdomen, un maneral.',
        steps: ['Tomá el maneral con brazo estirado.', 'Tirá hacia la cintura juntando el omóplato.', 'Volvé controlando.'],
        tips: ['Torso firme, sin rotar.'], errors: ['Encoger el hombro.'], video: ''
      },
      // ---- Hombros
      {
        id: 'face-pull', name: 'Face pull', cat: 'Hombros', level: 'Principiante', sets: '3x15',
        primary: ['deltoide_post', 'romboides'], secondary: ['trapecio'],
        pos: { alt: 'alta', acc: 'cuerda', orient: 'De frente a la polea, polea a la altura de la frente.' },
        posText: 'Polea a la altura de la cara/frente con cuerda. Agarre con pulgares hacia atrás.',
        steps: ['Tomá la cuerda con las palmas hacia abajo.', 'Tirá hacia la cara separando las manos a los costados de las orejas.', 'Volvé controlando.'],
        tips: ['Excelente para la postura y salud del hombro.'], errors: ['Tirar con la espalda baja.'], video: ''
      },
      {
        id: 'elevacion-lateral', name: 'Elevación lateral en polea', cat: 'Hombros', level: 'Principiante', sets: '3x15 c/lado',
        primary: ['deltoide_lat'], secondary: ['trapecio'],
        pos: { alt: 'baja', acc: 'maneral', orient: 'De costado a la polea, el cable pasa por delante del cuerpo.' },
        posText: 'Polea abajo, maneral en la mano más lejana a la máquina.',
        steps: ['Tomá el maneral con la mano lejana a la polea.', 'Subí el brazo hacia el costado hasta la altura del hombro.', 'Bajá lento.'],
        tips: ['Codo apenas flexionado, guía con el codo.'], errors: ['Subir encogiendo el trapecio.'], video: ''
      },
      {
        id: 'elevacion-frontal', name: 'Elevación frontal en polea', cat: 'Hombros', level: 'Principiante', sets: '3x12',
        primary: ['deltoide_ant'], secondary: ['pecho_sup'],
        pos: { alt: 'baja', acc: 'barra', orient: 'De espaldas a la polea, el cable pasa entre las piernas.' },
        posText: 'Polea abajo con barra recta o cuerda.',
        steps: ['Tomá la barra con brazos estirados frente a los muslos.', 'Subí al frente hasta la altura de los hombros.', 'Bajá controlando.'],
        tips: ['Torso quieto.'], errors: ['Balancearse.'], video: ''
      },
      {
        id: 'pajaro-polea', name: 'Pájaro / cruce inverso', cat: 'Hombros', level: 'Intermedio', sets: '3x15',
        primary: ['deltoide_post'], secondary: ['romboides', 'trapecio'],
        pos: { alt: 'alta', acc: 'sin', dual: true, orient: 'En el centro, de frente a la máquina. Mano derecha toma el cable izquierdo y viceversa.' },
        posText: 'Ambas poleas a la altura de los hombros (o arriba), tomando el cable directamente o con maneral, brazos cruzados.',
        steps: ['Cruzá los brazos tomando cada cable con la mano contraria.', 'Abrí los brazos hacia atrás en línea con los hombros.', 'Volvé lento cruzando de nuevo.'],
        tips: ['Brazos casi estirados.'], errors: ['Juntar los omóplatos demasiado: el foco es el hombro trasero.'], video: ''
      },
      {
        id: 'remo-menton', name: 'Remo al mentón', cat: 'Hombros', level: 'Intermedio', sets: '3x12',
        primary: ['deltoide_lat', 'trapecio'], secondary: ['biceps'],
        pos: { alt: 'baja', acc: 'barra', orient: 'De frente a la polea, cerca.' },
        posText: 'Polea abajo con barra recta, agarre al ancho de hombros.',
        steps: ['Tomá la barra con brazos estirados.', 'Tirá hacia el pecho alto llevando los codos hacia arriba y afuera.', 'Bajá controlando.'],
        tips: ['No pases los codos por encima del hombro si molesta.'], errors: ['Agarre demasiado cerrado.'], video: ''
      },
      // ---- Bíceps
      {
        id: 'curl-barra', name: 'Curl de bíceps con barra', cat: 'Bíceps', level: 'Principiante', sets: '3x12',
        primary: ['biceps'], secondary: ['antebrazo'],
        pos: { alt: 'baja', acc: 'barra', orient: 'De frente a la polea.' },
        posText: 'Polea abajo, barra recta o Z, palmas hacia arriba.',
        steps: ['Tomá la barra con palmas hacia arriba.', 'Doblá los codos subiendo la barra hacia el pecho.', 'Bajá controlando.'],
        tips: ['Codos fijos al costado del cuerpo.'], errors: ['Mover los codos hacia adelante.'], video: ''
      },
      {
        id: 'curl-martillo', name: 'Curl martillo con cuerda', cat: 'Bíceps', level: 'Principiante', sets: '3x12',
        primary: ['biceps', 'antebrazo'], secondary: [],
        pos: { alt: 'baja', acc: 'cuerda', orient: 'De frente a la polea.' },
        posText: 'Polea abajo con cuerda, palmas enfrentadas (agarre neutro).',
        steps: ['Tomá la cuerda con palmas mirándose.', 'Subí doblando los codos.', 'Bajá lento.'],
        tips: ['Trabaja el braquial y el antebrazo.'], errors: ['Balancear el torso.'], video: ''
      },
      {
        id: 'curl-bayesiano', name: 'Curl bayesiano', cat: 'Bíceps', level: 'Intermedio', sets: '3x12 c/brazo',
        primary: ['biceps'], secondary: [],
        pos: { alt: 'baja', acc: 'maneral', orient: 'De espaldas a la polea, un paso adelante, brazo atrás del cuerpo.' },
        posText: 'Polea abajo, un maneral. El brazo queda atrás del torso.',
        steps: ['De espaldas, con el brazo estirado atrás del cuerpo.', 'Doblá el codo sin moverlo de lugar.', 'Volvé estirando completamente.'],
        tips: ['Gran estiramiento del bíceps.'], errors: ['Llevar el codo hacia adelante.'], video: ''
      },
      {
        id: 'curl-alto', name: 'Curl alto doble (pose)', cat: 'Bíceps', level: 'Intermedio', sets: '3x12',
        primary: ['biceps'], secondary: ['deltoide_lat'],
        pos: { alt: 'alta', acc: 'maneral', dual: true, orient: 'En el centro, brazos abiertos en cruz.' },
        posText: 'Ambas poleas arriba (a la altura de los hombros o más). Un maneral en cada mano.',
        steps: ['Brazos abiertos a la altura de los hombros.', 'Doblá los codos llevando las manos hacia las orejas.', 'Estirá controlando.'],
        tips: ['Codos fijos a la altura de los hombros.'], errors: ['Bajar los codos.'], video: ''
      },
      // ---- Tríceps
      {
        id: 'pushdown-barra', name: 'Extensión de tríceps con barra', cat: 'Tríceps', level: 'Principiante', sets: '3x12',
        primary: ['triceps'], secondary: [],
        pos: { alt: 'alta', acc: 'barra', orient: 'De frente a la polea, cerca.' },
        posText: 'Polea arriba, barra recta o V, palmas hacia abajo.',
        steps: ['Tomá la barra con codos pegados al cuerpo.', 'Empujá hacia abajo hasta estirar los brazos.', 'Subí hasta 90° controlando.'],
        tips: ['Codos fijos al costado.'], errors: ['Inclinarse y empujar con el cuerpo.'], video: ''
      },
      {
        id: 'pushdown-cuerda', name: 'Extensión de tríceps con cuerda', cat: 'Tríceps', level: 'Principiante', sets: '3x12',
        primary: ['triceps'], secondary: [],
        pos: { alt: 'alta', acc: 'cuerda', orient: 'De frente a la polea, cerca.' },
        posText: 'Polea arriba con cuerda, palmas enfrentadas.',
        steps: ['Tomá la cuerda con codos pegados.', 'Empujá hacia abajo y separá la cuerda al final.', 'Volvé controlando.'],
        tips: ['Abrir la cuerda abajo aumenta la contracción.'], errors: ['Mover los codos.'], video: ''
      },
      {
        id: 'extension-cabeza', name: 'Extensión sobre la cabeza', cat: 'Tríceps', level: 'Intermedio', sets: '3x12',
        primary: ['triceps'], secondary: [],
        pos: { alt: 'baja', acc: 'cuerda', orient: 'De espaldas a la polea, un pie adelante, torso inclinado.' },
        posText: 'Polea baja (o media) con cuerda. La cuerda pasa por detrás de la cabeza.',
        steps: ['De espaldas, cuerda detrás de la cabeza, codos arriba.', 'Estirá los brazos hacia adelante y arriba.', 'Volvé doblando los codos.'],
        tips: ['Enfoca la cabeza larga del tríceps.'], errors: ['Abrir los codos.'], video: ''
      },
      {
        id: 'patada-triceps', name: 'Patada de tríceps', cat: 'Tríceps', level: 'Principiante', sets: '3x12 c/brazo',
        primary: ['triceps'], secondary: [],
        pos: { alt: 'baja', acc: 'sin', orient: 'De frente a la polea, torso inclinado hacia adelante.' },
        posText: 'Polea abajo tomando el cable sin accesorio (o maneral). Brazo pegado al cuerpo.',
        steps: ['Inclinate con el brazo pegado al torso y codo a 90°.', 'Estirá el codo llevando la mano hacia atrás.', 'Volvé controlando.'],
        tips: ['Solo se mueve el antebrazo.'], errors: ['Mover el hombro.'], video: ''
      },
      // ---- Piernas / Glúteo
      {
        id: 'patada-gluteo', name: 'Patada de glúteo', cat: 'Glúteo', level: 'Principiante', sets: '3x15 c/pierna',
        primary: ['gluteos'], secondary: ['isquios'],
        pos: { alt: 'baja', acc: 'tobillera', orient: 'De frente a la polea, manos apoyadas en la máquina.' },
        posText: 'Polea abajo con tobillera en un tobillo. Torso levemente inclinado.',
        steps: ['Colocá la tobillera y tomate de la máquina.', 'Llevá la pierna hacia atrás con la rodilla casi estirada.', 'Apretá el glúteo arriba y volvé lento.'],
        tips: ['No arquees la zona lumbar.'], errors: ['Usar impulso.'], video: ''
      },
      {
        id: 'abduccion', name: 'Abducción de cadera', cat: 'Glúteo', level: 'Principiante', sets: '3x15 c/pierna',
        primary: ['abductores'], secondary: ['gluteos'],
        pos: { alt: 'baja', acc: 'tobillera', orient: 'De costado a la polea, la tobillera en la pierna más lejana.' },
        posText: 'Polea abajo, tobillera en la pierna lejana a la máquina.',
        steps: ['De costado, tomate de la máquina.', 'Llevá la pierna hacia afuera, alejándola.', 'Volvé controlando.'],
        tips: ['Enfoca el glúteo medio (lateral de la cadera).'], errors: ['Inclinar el torso.'], video: ''
      },
      {
        id: 'aduccion', name: 'Aducción de cadera', cat: 'Piernas', level: 'Principiante', sets: '3x15 c/pierna',
        primary: ['aductores'], secondary: [],
        pos: { alt: 'baja', acc: 'tobillera', orient: 'De costado a la polea, la tobillera en la pierna más cercana.' },
        posText: 'Polea abajo, tobillera en la pierna cercana a la máquina.',
        steps: ['De costado, pierna cercana con la tobillera.', 'Cruzá la pierna por delante de la otra.', 'Volvé lento.'],
        tips: ['Trabaja la cara interna del muslo.'], errors: ['Girar la cadera.'], video: ''
      },
      {
        id: 'pull-through', name: 'Pull through', cat: 'Glúteo', level: 'Intermedio', sets: '3x12',
        primary: ['gluteos', 'isquios'], secondary: ['lumbar'],
        pos: { alt: 'baja', acc: 'cuerda', orient: 'De espaldas a la polea, cuerda entre las piernas.' },
        posText: 'Polea abajo con cuerda, pies algo más abiertos que la cadera.',
        steps: ['Tomá la cuerda entre las piernas y alejate dos pasos.', 'Llevá la cadera hacia atrás con la espalda recta.', 'Extendé la cadera apretando glúteos.'],
        tips: ['Es una bisagra de cadera, no una sentadilla.'], errors: ['Tirar con los brazos.'], video: ''
      },
      {
        id: 'curl-femoral', name: 'Curl femoral de pie', cat: 'Piernas', level: 'Principiante', sets: '3x12 c/pierna',
        primary: ['isquios'], secondary: ['gemelos'],
        pos: { alt: 'baja', acc: 'tobillera', orient: 'De frente a la polea, tomado de la máquina.' },
        posText: 'Polea abajo con tobillera.',
        steps: ['Colocá la tobillera y tomate de la máquina.', 'Doblá la rodilla llevando el talón a la cola.', 'Bajá controlando.'],
        tips: ['Rodilla fija apuntando al piso.'], errors: ['Mover la cadera.'], video: ''
      },
      // ---- Core
      {
        id: 'crunch-polea', name: 'Crunch en polea', cat: 'Abdomen', level: 'Principiante', sets: '3x15',
        primary: ['abdomen'], secondary: ['oblicuos'],
        pos: { alt: 'alta', acc: 'cuerda', orient: 'Arrodillado de frente a la polea.' },
        posText: 'Polea arriba con cuerda. Manos a los costados de la cabeza.',
        steps: ['Arrodillate y sujetá la cuerda junto a la cabeza.', 'Enrollá la columna llevando los codos a los muslos.', 'Volvé sin soltar la tensión.'],
        tips: ['La cadera no se mueve: solo se enrolla el tronco.'], errors: ['Tirar con los brazos o sentarse sobre los talones.'], video: ''
      },
      {
        id: 'lenador', name: 'Leñador (woodchop)', cat: 'Abdomen', level: 'Intermedio', sets: '3x12 c/lado',
        primary: ['oblicuos'], secondary: ['abdomen', 'deltoide_ant'],
        pos: { alt: 'alta', acc: 'maneral', orient: 'De costado a la polea, pies al ancho de hombros.' },
        posText: 'Polea arriba con maneral tomado con ambas manos.',
        steps: ['Tomá el maneral con ambas manos arriba del hombro.', 'Bajá en diagonal hacia la rodilla contraria girando el torso.', 'Volvé controlando.'],
        tips: ['Pivotá el pie de atrás.'], errors: ['Doblar mucho los brazos.'], video: ''
      },
      {
        id: 'pallof', name: 'Press Pallof', cat: 'Abdomen', level: 'Principiante', sets: '3x10 c/lado',
        primary: ['oblicuos', 'abdomen'], secondary: [],
        pos: { alt: 'media', acc: 'maneral', orient: 'De costado a la polea, alejado hasta tensar el cable.' },
        posText: 'Polea a la altura del pecho, maneral con ambas manos pegado al pecho.',
        steps: ['De costado, maneral al pecho.', 'Empujá los brazos al frente sin dejar que el cable te gire.', 'Sostené 2 s y volvé.'],
        tips: ['Ejercicio de anti-rotación: el torso no se mueve.'], errors: ['Girar hacia la polea.'], video: ''
      }
    ]
  }
];
