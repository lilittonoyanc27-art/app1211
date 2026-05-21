import { Topic, LessonData, DialogueExchange, DialogueQuiz } from "./types";

export const lessonsData: Record<Topic, LessonData> = {
  [Topic.GRAMMAR]: {
    topic: Topic.GRAMMAR,
    titleArm: "Նախադասության Կառուցվածք",
    titleEsp: "Estructura de la Oración",
    descriptionArm: "Իմացեք, թե ինչպես են կառուցվում նախադասությունները իսպաներենում՝ համեմատած հայերենի հետ:",
    grammarExplanation: `### Իսպաներեն Նախադասության Կառուցման Հիմունքները

Հայերենի և իսպաներենի միջև կան մի շարք սկզբունքային տարբերություններ, որոնք պետք է հասկանալ՝ ճիշտ նախադասություն կառուցելու համար.

1. **Խիստ Բառերի Դասավորություն (SVO Structure)**
   * **Հայերենում** բառերի կարգը բավականին ազատ է: Մենք կարող ենք ասել՝ *«Ես խնձոր եմ ուտում»* կամ *«Ուտում եմ ես խնձոր»*:
   * **Իսպաներենում** սովորաբար գործում է խիստ **Ենթակա (Subject) + Ստորոգյալ (Verb) + Լրացում (Object)** կառույցը:
     * *Օրինակ:* **Yo** (Ես) + **como** (ուտում եմ) + **una manzana** (խնձոր)։

2. **Հոդերի առկայությունը (Articles)**
   * Հայերենն ունի միայն որոշյալ հոդ (ս, դ, ն, ը), որը դրվում է բառի վերջում (օր.՝ *խնձորը*):
   * Իսպաներենում կան **որոշյալ** (el, la, los, las) և **անորոշ** (un, una, unos, unas) հոդեր, որոնք դրվում են գոյականից առաջ և համաձայնեցվում են սեռի ու թվի հետ:
     * *un libro* - գիրք (ինչ-որ մի)
     * *el libro* - գիրքը (կոնկրետ)

3. **Ածականների դիրքը (Adjective Position)**
   * **Հայերենում** ածականը միշտ նախորդում է գոյականին՝ *«կարմիր գիրք»*։
   * **Իսպաներենում** ածականները գրեթե միշտ դրվում են գոյականից **հետո**:
     * *Օրինակ:* *el libro rojo* (գիրքը կարմիր) = կարմիր գիրքը։

4. **Ենթակայի բացթողումը (Subject Pronoun Drop)**
   * Քանի որ բայի խոնարհման վերջավորություններն արդեն ցույց են տալիս դեմքն ու թիվը, անձնական դերանունները (yo, tú, él և այլն) հաճախ բաց են թողնվում:
     * *[Yo] vivo en Madrid* -> *Vivo en Madrid* (Ապրում եմ Մադրիդում)։`,
    vocabulary: [
      { spanish: "el sujeto", armenian: "ենթակա" },
      { spanish: "el verbo", armenian: "բայ (ստորոգյալ)" },
      { spanish: "el objeto", armenian: "լրացում (ուղիղ խնդիր)" },
      { spanish: "el adjetivo", armenian: "ածական" },
      { spanish: "el artículo", armenian: "հոդ" },
      { spanish: "yo como", armenian: "ես ուտում եմ" },
      { spanish: "tú lees", armenian: "դու կարդում ես" },
      { spanish: "una carta", armenian: "նամակ" },
      { spanish: "un coche nuevo", armenian: "նոր մեքենա (բառացի՝ մեքենա նոր)" }
    ],
    exercises: [
      {
        id: "g1",
        topic: Topic.GRAMMAR,
        armenian: "Ես կարդում եմ մի հետաքրքիր գիրք:",
        spanish: "Yo leo un libro interesante.",
        wordsInOrder: ["Yo", "leo", "un", "libro", "interesante."],
        explanation: "1-ին դիրքում Ենթական է (Yo-Ես), 2-րդում` բայը (leo-կարդում եմ), 3-րդում` անորոշ հոդը (un), 4-րդում` գոյականը (libro-գիրք), իսկ 5-րդում` ածականը (interesante - հետաքրքիր), քանի որ իսպաներենում ածականը դրվում է գոյականից հետո:"
      },
      {
        id: "g2",
        topic: Topic.GRAMMAR,
        armenian: "Մենք ունենք մի կարմիր մեքենա:",
        spanish: "Nosotros tenemos un coche rojo.",
        wordsInOrder: ["Nosotros", "tenemos", "un", "coche", "rojo."],
        explanation: "Nosotros (Մենք) - tenemos (ունենք) - un coche (մի մեքենա) - rojo (կարմիր)։ Ածականը 'rojo' դրվում է 'coche'-ից հետո:"
      },
      {
        id: "g3",
        topic: Topic.GRAMMAR,
        armenian: "Աղջիկը խմում է ջուրը:",
        spanish: "La chica bebe el agua.",
        wordsInOrder: ["La", "chica", "bebe", "el", "agua."],
        explanation: "La chica (Աղջիկը - իգական որոշյալ հոդով) bebe (խմում է) el agua (ջուրը - արական հոդով՝ հնչյունաբանական պատճառով):"
      }
    ]
  },
  [Topic.NUMBERS]: {
    topic: Topic.NUMBERS,
    titleArm: "Թվեր և Քանակ",
    titleEsp: "Números y Cantidad",
    descriptionArm: "Սովորեք հաշվել իսպաներենով և օգտագործել թվերը նախադասություններում:",
    grammarExplanation: `### Թվերի Օգտագործումը Նախադասություններում

1. **Բացարձակ թվեր (Números Cardinales)**
   * *1-10:* uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez.
   * *11-15 (յուրահատուկ ձևեր):* once, doce, trece, catorce, quince.
   * *16-19:* dieciséis, diecisiete, dieciocho, diecinueve.
   * *20-29:* veinte (20), veintiuno (21), veintidós (22)...

2. **Թվականների Համաձայնեցումը**
   * «Uno» (մեկ) թվականը գոյականից առաջ դառնում է **un** (արական սեռի դեպքում) կամ **una** (իգական սեռի դեպքում):
     * *un gato* (մեկ կատու), *una mesa* (մեկ սեղան):

3. **Տարիք արտահայտելը (Expresar la Edad)**
   * **Հայերենում** ասում ենք՝ *«Ես 20 տարեկան եմ»* (բայ՝ լինել):
   * **Իսպաներենում** օգտագործվում է **tener** (ունենալ) բայը.
     * *Yo tengo veinte años* (Ես ունեմ քսան տարի)։`,
    vocabulary: [
      { spanish: "uno", armenian: "մեկ" },
      { spanish: "dos", armenian: "երկու" },
      { spanish: "tres", armenian: "երեք" },
      { spanish: "diez", armenian: "տասը" },
      { spanish: "quince", armenian: "տասնհինգ" },
      { spanish: "veinte", armenian: "քսան" },
      { spanish: "treinta", armenian: "երեսուն" },
      { spanish: "cien", armenian: "հարյուր" },
      { spanish: "el año", armenian: "տարի" },
      { spanish: "tener", armenian: "ունենալ" }
    ],
    exercises: [
      {
        id: "n1",
        topic: Topic.NUMBERS,
        armenian: "Ես ունեմ երեք կատու:",
        spanish: "Yo tengo tres gatos.",
        wordsInOrder: ["Yo", "tengo", "tres", "gatos."],
        explanation: "Yo (Ես) + tengo (ունեմ) + tres (երեք) + gatos (կատուներ)։ Հոգնակի թիվ ստանալու համար գոյականին ավելացվել է -s:"
      },
      {
        id: "n2",
        topic: Topic.NUMBERS,
        armenian: "Աննան քսան տարեկան է:",
        spanish: "Ana tiene veinte años.",
        wordsInOrder: ["Ana", "tiene", "veinte", "años."],
        explanation: "Տարիքի համար օգտագործում ենք tener (ոչ թե ser): Երրորդ դեմքով այն դառնում է 'tiene': Ana tiene veinte años (Աննան ունի քսան տարի):"
      },
      {
        id: "n3",
        topic: Topic.NUMBERS,
        armenian: "Տունն ունի հինգ սենյակ:",
        spanish: "La casa tiene cinco habitaciones.",
        wordsInOrder: ["La", "casa", "tiene", "cinco", "habitaciones."],
        explanation: "La casa (Տունը) tiene (ունի) cinco (հինգ) habitaciones (սենյակներ)։"
      }
    ]
  },
  [Topic.TIME]: {
    topic: Topic.TIME,
    titleArm: "Ժամանակ և Ժամեր",
    titleEsp: "El Tiempo y las Horas",
    descriptionArm: "Ինչպես հարցնել ժամը և ճիշտ պատասխանել իսպաներենով:",
    grammarExplanation: `### Ինչպես հարցնել և ասել ժամը

1. **Հարցը.**
   * **¿Qué hora es?** (Ժամը քանիսն՞ է):

2. **Պատասխանը (Լինել՝ Ser բայի միջոցով).**
   * Քանի որ ժամը հոգնակի հասկացություն է (բացի ժամը 1-ից), օգտագործվում է **son las** կառույցը:
     * *Son las dos* (Ժամը երկուսն է):
     * *Son las cinco* (Ժամը հինգն է):
   * Ժամը **1-ի** համար օգտագործվում է եզակի ձևը՝ **es la**:
     * *Es la una* (Ժամը մեկն է):

3. **Րոպեները արտահայտելը.**
   * Քառորդ (15 րոպե անց)՝ **y cuarto**.
     * *Son las tres y cuarto* (Երեքն անց քառորդ):
   * Կես (30 րոպե անց)՝ **y media**.
     * *Es la una y media* (Մեկն անց կես):
   * Պակաս (օր.՝ 20 պակաս)՝ **menos veinte**.
     * *Son las cuatro menos diez* (Չորսին տասն է պակաս - բառացի՝ չորսը՝ մինուս տասը):`,
    vocabulary: [
      { spanish: "¿Qué hora es?", armenian: "Ժամը քանիսն՞ է`" },
      { spanish: "la hora", armenian: "ժամ" },
      { spanish: "el minuto", armenian: "րոպե" },
      { spanish: "la mañana", armenian: "առավոտ" },
      { spanish: "la tarde", armenian: "կեսօր/երեկո (մինչև մութը)" },
      { spanish: "la noche", armenian: "գիշեր" },
      { spanish: "es la una", armenian: "ժամը մեկն է" },
      { spanish: "son las tres", armenian: "ժամը երեքն է" },
      { spanish: "en punto", armenian: "ուղիղ (ճիշտ ժամին)" }
    ],
    exercises: [
      {
        id: "t1",
        topic: Topic.TIME,
        armenian: "Ժամը հինգն է:",
        spanish: "Son las cinco.",
        wordsInOrder: ["Son", "las", "cinco."],
        explanation: "Ժամը 5-ը հոգնակի է, ուստի օգտագործում ենք 'Son' (բայի հոդնակի ձևը) և 'las' (իգական որոշյալ դերանունը/հոդը ժամերի համար):"
      },
      {
        id: "t2",
        topic: Topic.TIME,
        armenian: "Ժամը մեկն անց կես է:",
        spanish: "Es la una y media.",
        wordsInOrder: ["Es", "la", "una", "y", "media."],
        explanation: "Քանի որ ժամը 1-ն է, օգտագործվում է եզակի 'Es la una'։ 'y media' նշանակում է 'և կես':"
      },
      {
        id: "t3",
        topic: Topic.TIME,
        armenian: "Ժամը ութն անց քառորդ է առավոտյան:",
        spanish: "Son las ocho y cuarto de la mañana.",
        wordsInOrder: ["Son", "las", "ocho", "y", "cuarto", "de", "la", "mañana."],
        explanation: "Son las ocho (ութն է) y cuarto (անց քառորդ) de la mañana (առավոտյան - բառացի՝ առավոտից)։"
      }
    ]
  },
  [Topic.WEATHER]: {
    topic: Topic.WEATHER,
    titleArm: "Եղանակ",
    titleEsp: "El Clima",
    descriptionArm: "Իմացեք, թե ինչպես նկարագրել եղանակը և օգտագործել Hacer բայը:",
    grammarExplanation: `### Եղանակի Նկարագրման Ինքնատիպ Սկզբունքները

Իսպաներենում եղանակի մասին խոսելիս հաճախ օգտագործվում է **hacer** (անել/պատրաստել) բայը, այլ ոչ թե լինել բայը: Սա շատ կարևոր տարբերություն է.

1. **Hacer-ի կիրառումը (Hacer + Noun).**
   * *Hace frío* (Ցուրտ է - բառացի՝ անում է ցուրտ):
   * *Hace calor* (Շոգ է - անում է տաքություն):
   * *Hace buen tiempo* (Լավ եղանակ է):
   * *Hace viento* (Քամի է):

2. **Estar-ի կիրառումը (Estar + Adjective/Participle).**
   * Եղանակի ժամանակավոր վիճակները նկարագրելու համար օգտագործվում է **estar** (գտնվել/լինել) բայը.
     * *Está nublado* (Ամպամած է):
     * *Está despejado* (Պարզ է):

3. **Ինքնուրույն եղանակային բայեր.**
   * Ինչպես անձրևելը կամ ձյուն գալը.
     * *Llueve* (Անձրևում է):
     * *Nieva* (Ձյուն է գալիս):`,
    vocabulary: [
      { spanish: "¿Qué tiempo hace?", armenian: "Ինչպիսի՞ եղանակ է`" },
      { spanish: "el frío", armenian: "ցուրտ" },
      { spanish: "el calor", armenian: "շոգ / տաքություն" },
      { spanish: "el sol", armenian: "արև" },
      { spanish: "la lluvia", armenian: "անձրև" },
      { spanish: "la nieve", armenian: "ձյուն" },
      { spanish: "hace sol", armenian: "արևոտ է (բառացի՝ անում է արև)" },
      { spanish: "está despejado", armenian: "պարզկա է" }
    ],
    exercises: [
      {
        id: "w1",
        topic: Topic.WEATHER,
        armenian: "Այսօր շատ շոգ է:",
        spanish: "Hoy hace mucho calor.",
        wordsInOrder: ["Hoy", "hace", "mucho", "calor."],
        explanation: "Hoy (Այսօր) + hace mucho calor (բառացի՝ անում է շատ տաքություն)։ Ուշադրություն դարձրեք, որ 'mucho'-ն օգտագործվում է գոյականների հետ (calor-ը գոյական է), ոչ թե 'muy' (որն օգտագործվում է ածականների հետ):"
      },
      {
        id: "w2",
        topic: Topic.WEATHER,
        armenian: "Իսպանիայում հաճախ անձրևում է:",
        spanish: "En España llueve a menudo.",
        wordsInOrder: ["En", "España", "llueve", "a", "menudo."],
        explanation: "En España (Իսպանիայում) + llueve (անձրևում է՝ լինելով llover բայի 3-րդ դեմքը) + a menudo (հաճախ)։"
      },
      {
        id: "w3",
        topic: Topic.WEATHER,
        armenian: "Ձմռանը ցուրտ է:",
        spanish: "Hace frío en invierno.",
        wordsInOrder: ["Hace", "frío", "en", "invierno."],
        explanation: "Hace frío (Ցուրտ է - բառացի՝ անում է ցուրտ) en (մեջ/-ում) invierno (ձմեռ)։"
      }
    ]
  },
  [Topic.MONTHS]: {
    topic: Topic.MONTHS,
    titleArm: "Ամիսներ և Օրացույց",
    titleEsp: "Meses y Calendario",
    descriptionArm: "Սովորեք ամիսների անվանումները և ինչպես գրել ամսաթվեր:",
    grammarExplanation: `### Ամիսների և Ամսաթվերի Կանոնները

1. **Փոքրատառով գրելը (Lower Case)**
   * Ի տարբերություն անգլերենի, իսպաներենում ամիսների և շաբաթվա օրերի անունները գրվում են **փոքրատառով**:
     * *enero* (հունվար), *lunes* (երկուշաբթի):

2. **Ամսաթվերի կառուցվածքը (Dates Structure)**
   * Ամսաթիվ ասելու համար օգտագործվում է հետևյալ կաղապարը՝ **el + [թիվ] + de + [ամիս]**.
     * *el cinco de mayo* (մայիսի հինգը)։
   * Ամսվա 1-ին օրվա համար օգտագործվում է **el primero** (ոչ թե el uno):
     * *el primero de junio* (հունիսի մեկը)։

3. **Նախդիրների համադրումը**
   * Ամսին նշելու համար օգտագործում ենք **en** (մեջ).
     * *Mi cumpleaños es en octubre* (Իմ ծննդյան օրը հոկտեմբերին է)։`,
    vocabulary: [
      { spanish: "enero", armenian: "հունվար" },
      { spanish: "febrero", armenian: "փետրվար" },
      { spanish: "marzo", armenian: "մարտ" },
      { spanish: "abril", armenian: "ապրիլ" },
      { spanish: "mayo", armenian: "մայիս" },
      { spanish: "junio", armenian: "հունիս" },
      { spanish: "julio", armenian: "հուլիս" },
      { spanish: "agosto", armenian: "օգոստոս" },
      { spanish: "septiembre", armenian: "սեպտեմբեր" },
      { spanish: "octubre", armenian: "հոկտեմբեր" },
      { spanish: "noviembre", armenian: "նոյեմբեր" },
      { spanish: "diciembre", armenian: "դեկտեմբեր" }
    ],
    exercises: [
      {
        id: "m1",
        topic: Topic.MONTHS,
        armenian: "Իմ ծնունդը հուլիսին է:",
        spanish: "Mi cumpleaños es en julio.",
        wordsInOrder: ["Mi", "cumpleaños", "es", "en", "julio."],
        explanation: "Mi cumpleaños (իմ ծննդյան օրը) + es (է) + en julio (հուլիսին՝ բառացի՝ հուլիսի մեջ)։ 'julio' գրվում է փոքրատառով:"
      },
      {
        id: "m2",
        topic: Topic.MONTHS,
        armenian: "Այսօր հոկտեմբերի տասն է:",
        spanish: "Hoy es el diez de octubre.",
        wordsInOrder: ["Hoy", "es", "el", "diez", "de", "octubre."],
        explanation: "Hoy es el diez (այսօր տասն է) de octubre (հոկտեմբերի - օգտագործելով 'de' սեռական հոլովի նախդիրը)։"
      },
      {
        id: "m3",
        topic: Topic.MONTHS,
        armenian: "Մայիսը տարվա հինգերորդ ամիսն է:",
        spanish: "Mayo es el quinto mes del año.",
        wordsInOrder: ["Mayo", "es", "el", "quinto", "mes", "del", "año."],
        explanation: "Mayo (Մայիսը) es (է) el quinto mes (հինգերորդ ամիսը) del año (տարվա - del-ը de+el-ի միացումն է)։"
      }
    ]
  },
  [Topic.DIALOGUES]: {
    topic: Topic.DIALOGUES,
    titleArm: "Երկխոսություն և Խոսակցություն",
    titleEsp: "Diálogo y Conversación",
    descriptionArm: "Ինչպես կառուցել բնական խոսակցություններ և կիրառել սովորածը:",
    grammarExplanation: `### Ինչպես հաղորդակցվել իսպաներենով

Երկխոսությունների ընթացքում շատ կարևոր է իմանալ քաղաքավարի դիմելաձևերն ու արտահայտությունները, որոնք հաճախ բառացի չեն թարգմանվում.

1. **Ողջույններ և Ներկայացում.**
   * *¿Cómo te llamas?* (Ինչպե՞ս է քո անունը):
   * *Me llamo...* (Իմ անունն է... բառացի՝ կոչվում եմ):

2. **Որպիսություն հարցնելը.**
   * *¿Cómo estás?* (Ինչպե՞ս ես - օգտագործելով Estar բայը, որը ցույց է տալիս ժամանակավոր վիճակը)։
   * *Estoy bien, gracias* (Լավ եմ, շնորհակալություն):

3. **Շնորհակալություն հայտնելը և Խնդրելը.**
   * *Por favor* (Խնդրում եմ):
   * *Muchas gracias* (Շատ շնորհակալություն):
   * *De nada* (Խնդրեմ / Չարժե)։`,
    vocabulary: [
      { spanish: "hola", armenian: "բարև" },
      { spanish: "adiós", armenian: "ցտեսություն" },
      { spanish: "gracias", armenian: "շնորհակալություն" },
      { spanish: "buenos días", armenian: "բարի լույս (առավոտ)" },
      { spanish: "buenas tardes", armenian: "բարի օր" },
      { spanish: "buenas noches", armenian: "բարի գիշեր" },
      { spanish: "¿cómo estás?", armenian: "ինչպե՞ս ես" },
      { spanish: "¿cuánto cuesta?", armenian: "ինչքա՞ն արժե" }
    ],
    exercises: [
      {
        id: "d1",
        topic: Topic.DIALOGUES,
        armenian: "Բարի լույս, ինչպե՞ս ես դու:",
        spanish: "Buenos días, ¿cómo estás tú?",
        wordsInOrder: ["Buenos", "días,", "¿cómo", "estás", "tú?"],
        explanation: "Buenos días (Բարի լույս) + ¿cómo estás tú? (ինչպե՞ս ես դու)։ 'días'-ը արական հոգնակի է, ուստի ածականը ևս արական հոգնակի է՝ 'Buenos':"
      },
      {
        id: "d2",
        topic: Topic.DIALOGUES,
        armenian: "Այո, ես շատ լավ եմ, շնորհակալություն:",
        spanish: "Sí, yo estoy muy bien, gracias.",
        wordsInOrder: ["Sí,", "yo", "estoy", "muy", "bien,", "gracias."],
        explanation: "Sí (Այո - շեշտադրումով) + yo estoy (ես գտնվում եմ/եմ) + muy bien (շատ լավ) + gracias (շնորհակալություն)։"
      },
      {
        id: "d3",
        topic: Topic.DIALOGUES,
        armenian: "Հաճելի է ծանոթանալ, հաջողություն:",
        spanish: "Mucho gusto, adiós.",
        wordsInOrder: ["Mucho", "gusto,", "adiós."],
        explanation: "Mucho gusto (Հաճելի է ծանոթանալ - բառացի՝ մեծ հաճույք) + adiós (հաջողություն/ցտեսություն)։"
      }
    ]
  }
};

export const dialoguesData: DialogueExchange[] = [
  {
    id: "diag1",
    title: "Ծանոթություն Սրճարանում",
    description: "Երկու ընկերներ հանդիպում են և խոսում իրենց տարիքի, ժամանակի և եղանակի մասին:",
    exchanges: [
      {
        speaker: "A",
        speakerNameArm: "Արամ",
        spanish: "Hola, ¿cómo te llamas?",
        armenian: "Բարև, ի՞նչ է անունդ:",
        explanation: "Hola (Բարև) + ¿cómo te llamas? (ի՞նչ է անունդ` բառացի՝ ինչպե՞ս ես քեզ անվանում)։"
      },
      {
        speaker: "B",
        speakerNameArm: "Միգել",
        spanish: "Hola, me llamo Miguel. ¿Y tú?",
        armenian: "Բարև, իմ անունը Միգել է: Իսկ քո՞նը:",
        explanation: "Me llamo (իմ անունն է՝ բառացի՝ կոչվում եմ) + ¿Y tú? (իսկ դո՞ւ)"
      },
      {
        speaker: "A",
        speakerNameArm: "Արամ",
        spanish: "Me llamo Aram. ¿Qué hora es, Miguel?",
        armenian: "Իմ անունն Արամ է: Ժամը քանիսն՞ է, Միգել:",
        explanation: "¿Qué hora es? (Ժամը քանիսն՞ է) հարցն է"
      },
      {
        speaker: "B",
        speakerNameArm: "Միգել",
        spanish: "Son las dos en punto. ¡Hace mucho calor hoy!",
        armenian: "Ուղիղ ժամը երկուսն է: Այսօր շատ շոգ է:",
        explanation: "Son las dos en punto (ուղիղ երկուսն է - en punto նշանակում է ուղիղ)։ ¡Hace mucho calor hoy! (շոգ է այսօր)։"
      },
      {
        speaker: "A",
        speakerNameArm: "Արամ",
        spanish: "Sí, es el primero de julio, el verano es muy caluroսo.",
        armenian: "Այո, հուլիսի մեկն է, ամառը շատ տաք է:",
        explanation: "Es el primero de julio (հուլիսի մեկն է, օգտագործվում է primero, ոչ թե uno)։"
      }
    ]
  }
];

export const dialogueQuizzes: DialogueQuiz[] = [
  {
    id: "quiz1",
    title: "Ինտերակտիվ Զրույց Միգելի հետ",
    description: "Լրացրեք երկխոսությունը՝ ընտրելով ճիշտ իսպաներեն պատասխանները:",
    steps: [
      {
        speaker: "Miguel",
        promptSpanish: "¡Hola! ¿Cómo estás?",
        promptArmenian: "Բարև: Ինչպե՞ս ես:",
        options: [
          {
            spanish: "Estoy muy bien, gracias. ¿Y tú?",
            armenian: "Շատ լավ եմ, շնորհակալություն: Իսկ դո՞ւ:",
            explanation: "Սա լավագույն քաղաքավարի պատասխանն է հարցին:"
          },
          {
            spanish: "Hoy hace frío.",
            armenian: "Այսօր ցուրտ է:",
            explanation: "Սա եղանակի մասին է և չի պատասխանում «ինչպես ես» հարցին:"
          },
          {
            spanish: "Tengo veinte años.",
            armenian: "Ես քսան տարեկան եմ:",
            explanation: "Սա տարիքի հետ է կապված, ոչ թե որպիսության:"
          }
        ],
        correctIndex: 0
      },
      {
        speaker: "Miguel",
        promptSpanish: "Estoy bien también. ¿Qué hora es ahora?",
        promptArmenian: "Ես նույնպես լավ եմ: Ժամը քանիսն՞ է հիմա:",
        options: [
          {
            spanish: "Es en julio de invierno.",
            armenian: "Ձմռան հուլիսին է:",
            explanation: "Ասում է ամսաթիվը, ոչ թե ժամը:"
          },
          {
            spanish: "Son las tres y media.",
            armenian: "Ժամը երեքն անց կես է:",
            explanation: "Ճիշտ ձևակերպված ժամ է («Son las» + ժամ + «y media» = անց կես)։"
          },
          {
            spanish: "Hacen las tres.",
            armenian: "Անում են երեքը:",
            explanation: "Ժամերի համար 'hacer' բայը չի օգտագործվում, օգտագործվում է 'ser'-ը՝ 'Son las':"
          }
        ],
        correctIndex: 1
      },
      {
        speaker: "Miguel",
        promptSpanish: "¿Qué tiempo hace en tu ciudad natal?",
        promptArmenian: "Ինչպիսի՞ եղանակ է քո հայրենի քաղաքում:",
        options: [
          {
            spanish: "Es muy calor hoy.",
            armenian: "Այսօր շատ տաք է (սխալ բայով):",
            explanation: "Սխալ է, քանի որ Calor գոյականի հետ օգտագործվում է 'hacer' բայը՝ 'Hace calor', ոչ 'es':"
          },
          {
            spanish: "Tengo frío ahí.",
            armenian: "Այնտեղ ինձ ցուրտ է:",
            explanation: "Սա նկարագրում է անձնական զգացողությունը, ոչ թե քաղաքի եղանակը:"
          },
          {
            spanish: "Hace sol y buen tiempo.",
            armenian: "Արևոտ է և լավ եղանակ է:",
            explanation: "Ճիշտ պատասխանն է: 'Hace sol' նշանակում է արևոտ է, իսկ 'buen tiempo'՝ լավ եղանակ:"
          }
        ],
        correctIndex: 2
      }
    ]
  }
];
