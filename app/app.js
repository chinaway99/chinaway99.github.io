/* ChinaWay — приложение (PWA). Без сборки, без библиотек. */
(function () {
  "use strict";
  const WORDS = window.CW_WORDS || [];
  const LEVELS = window.CW_LEVELS || [];
  const BOT = "https://t.me/chinaway_tj_bot";
  const IG = "https://www.instagram.com/chinaway.tj/";
  const SITE = "https://chinaway99.github.io/";

  /* ---------- хранилище ---------- */
  const KEY = "chinaway-app";
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } },
    set(patch) { const s = Object.assign(store.get(), patch); try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} return s; },
  };
  let S = Object.assign({ lang: null, goal: null, name: "", xp: 0, streak: 0, last: "", known: [], theme: "auto", quizBest: 0 }, store.get());
  const save = (p) => { S = store.set(Object.assign(S, p)); };

  /* ---------- тексты ---------- */
  const TX = {
    tg: {
      home: "Асосӣ", courses: "Курсҳо", practice: "Машқ", profile: "Профил",
      hi: "Салом", hiName: "Салом, {n}!", today: "Имрӯз барои забони чинӣ 5 дақиқа ҷудо кунед",
      heroEy: "Дарси 1 — ройгон", heroH: "Забони чиниро аз сифр то HSK 6 омӯзед",
      heroP: "Бо забони тоҷикӣ ё русӣ. Дар хона, дар кор — танҳо бо телефон.",
      startFree: "Оғози ройгон", allCourses: "Ҳамаи курсҳо",
      wod: "Калимаи рӯз", listen: "Гӯш кардан",
      quick: "Машқи зуд", cards: "Кортҳо", quiz: "Тест", tones: "Оҳангҳо",
      st1: "сатҳ", st2: "дарс", st3: "забон", st4: "дастрасӣ",
      forever: "∞", why: "Чаро ChinaWay",
      w1: "Бе рафтан ба ҷое", w1s: "Аз телефон ё ноутбук — дар хона ё дар кор.",
      w2: "Як бор харидан — то абад", w2s: "Ҳар сатҳро як бор мехаред ва ҳамеша дастрасӣ доред.",
      w3: "Тоҷикӣ ё русӣ", w3s: "Забони омӯзишро худатон интихоб мекунед.",
      w4: "Барои таҳсил, кор ва тиҷорат", w4s: "Аз салому алейк то музокироти тиҷоратӣ.",
      cTitle: "Курсҳо", cSub: "6 сатҳ · ҳар сатҳ 20 дарс · PDF + аудио",
      from: "аз", smn: "смн", words: "калима", lessons: "дарс", ready: "Тайёр", recommended: "Барои оғоз",
      tSelf: "Мустақил", tSup: "Бо дастгирӣ", tVip: "VIP",
      fSelf: ["20 дарс (PDF) бо пиньин", "Аудио ва тестҳо", "Имтиҳони озмоишӣ", "Дастрасии абадӣ"],
      fSup: ["Ҳамаи «Мустақил»", "Гурӯҳи шогирдон", "Санҷиши вазифаи хонагӣ", "Ҷавоб ба саволҳо"],
      fVip: ["Ҳамаи «Бо дастгирӣ»", "Диққати шахсӣ", "Ёрии фаврӣ", "Тартиби инфиродӣ"],
      popular: "МАШҲУР", buy: "Харидан", howBuy: "Чӣ тавр харидан",
      hb1: "Тарифро интихоб кунед — боти Telegram кушода мешавад",
      hb2: "Маблағро ба корт гузаронед ва скриншоти чекро фиристед",
      hb3: "Пас аз санҷиш дарсҳо фавран ба Telegram меоянд",
      lang2: "Забони курс: тоҷикӣ ё русӣ — дар бот интихоб мекунед",
      pTitle: "Машқ", pSub: "Ҳар рӯз 5 дақиқа — ва калимаҳо дар хотир мемонанд",
      mCards: "Кортҳои калимаҳо", mCardsS: "Иероглиф → маъно. Гардонед ва санҷед.",
      mQuiz: "Тести 10 савол", mQuizS: "Маънои дурустро интихоб кунед",
      mTones: "Оҳангҳо", mTonesS: "Оҳанги калимаро аз рӯи пиньин муайян кунед",
      mLesson: "Дарси 1 — ройгон", mLessonS: "PDF ва 5 аудио: тонҳо, калимаҳо, муколама",
      learned: "калима омӯхтед", best: "беҳтарин натиҷа",
      tap: "Барои гардондан пахш кунед", know: "Медонам", again: "Боз",
      next: "Минбаъд", finish: "Анҷом", great: "Офарин!", good: "Хуб!", tryMore: "Боз кӯшиш кунед!",
      score: "{a} аз {b} дуруст", xpGot: "+{x} XP", again2: "Аз нав", toHome: "Ба асосӣ",
      whichTone: "Ин кадом оҳанг аст?", t1: "Ҳамвор", t2: "Боло", t3: "Паст-боло", t4: "Поён", t5: "Сабук",
      whichMean: "Маънояш чист?",
      lTitle: "Дарси 1 — ройгон", lSub: "Тонҳо, пиньин ва аввалин калимаҳо",
      openPdf: "Кушодани дарс (PDF)", audio: "Аудио",
      a1: "Чор оҳанг", a2: "Тезгӯяк", a3: "Калимаҳо", a4: "Муколамаҳо", a5: "Машқ 1",
      likeIt: "Маъқул шуд? 19 дарси дигар ва HSK 2–6 дар курси пурра.",
      prTitle: "Профил", yourName: "Номи шумо", namePh: "Номатонро нависед",
      days: "рӯз пай дар пай", xp: "XP", settings: "Танзимот", language: "Забон", theme: "Намуд",
      thAuto: "Авто", thLight: "Рӯшан", thDark: "Торик",
      contacts: "Тамос", tgBot: "Telegram — харид ва саволҳо", insta: "Instagram — дарсҳои ҳаррӯза", site: "Сомона",
      install: "Насб кардани барнома", installS: "Иконаи ChinaWay дар экрани телефон",
      installNow: "Насб", installed: "Барнома насб шудааст ✓",
      iosT: "Насб дар iPhone", ios1: "Дар Safari тугмаи «Мубодила» {i}-ро пахш кунед",
      ios2: "«Ба экрани хона» (На экран «Домой»)-ро интихоб кунед", ios3: "«Илова»-ро пахш кунед — тайёр!",
      androidT: "Насб дар Android", and1: "Менюи браузер ⋮-ро кушоед", and2: "«Насб кардани барнома» ё «Ба экрани асосӣ»-ро интихоб кунед",
      ok: "Фаҳмо", privacy: "Махфият", version: "Версия",
      onb1: "Забони чинӣ — дар телефони шумо", onb1p: "Курсҳои HSK 1–6 аз ChinaWay: дарсҳо, аудио, тестҳо ва машқҳо дар як барнома.",
      onb2: "Забонро интихоб кунед", onb2p: "Тамоми барнома бо ҳамин забон мешавад. Баъд метавонед иваз кунед.",
      onb3: "Ҳадафи шумо чист?", onb3p: "Ба шумо роҳи мувофиқро нишон медиҳем.",
      g1: "Таҳсил дар Чин", g2: "Тиҷорат бо Чин", g3: "Кор ва даромад", g4: "Барои худам",
      cont: "Идома", start: "Оғоз", skip: "Гузаштан",
      saved: "Сабт шуд", soundNo: "Овоз дар ин дастгоҳ дастрас нест",
      goalHint: { g1: "Барои донишгоҳҳои Чин одатан HSK 4–5 лозим аст.", g2: "Барои харид ва музокирот HSK 3–4 кифоя аст.", g3: "Барои кор бо ширкатҳои чинӣ HSK 4 тавсия мешавад.", g4: "Аз HSK 1 оғоз кунед — бо суръати худ." },
      yourPath: "Роҳи шумо",
    },
    ru: {
      home: "Главная", courses: "Курсы", practice: "Тренировка", profile: "Профиль",
      hi: "Привет", hiName: "Привет, {n}!", today: "Уделите китайскому 5 минут сегодня",
      heroEy: "Урок 1 — бесплатно", heroH: "Китайский с нуля до HSK 6",
      heroP: "На таджикском или русском. Дома, на работе — нужен только телефон.",
      startFree: "Начать бесплатно", allCourses: "Все курсы",
      wod: "Слово дня", listen: "Послушать",
      quick: "Быстрая тренировка", cards: "Карточки", quiz: "Тест", tones: "Тоны",
      st1: "уровней", st2: "уроков", st3: "языка", st4: "доступ",
      forever: "∞", why: "Почему ChinaWay",
      w1: "Никуда не нужно ходить", w1s: "С телефона или ноутбука — дома или на работе.",
      w2: "Покупаете один раз — навсегда", w2s: "Купили уровень один раз — доступ остаётся всегда.",
      w3: "Таджикский или русский", w3s: "Язык обучения выбираете сами.",
      w4: "Для учёбы, работы и бизнеса", w4s: "От приветствия до деловых переговоров.",
      cTitle: "Курсы", cSub: "6 уровней · в каждом 20 уроков · PDF + аудио",
      from: "от", smn: "смн", words: "слов", lessons: "уроков", ready: "Готов", recommended: "Для старта",
      tSelf: "Самостоятельный", tSup: "С поддержкой", tVip: "VIP",
      fSelf: ["20 уроков (PDF) с пиньинем", "Аудио и тесты", "Пробный экзамен", "Доступ навсегда"],
      fSup: ["Всё из «Самостоятельного»", "Группа учеников", "Проверка домашних заданий", "Ответы на вопросы"],
      fVip: ["Всё из «С поддержкой»", "Личное внимание", "Быстрая помощь", "Индивидуальный темп"],
      popular: "ПОПУЛЯРНЫЙ", buy: "Купить", howBuy: "Как купить",
      hb1: "Выберите тариф — откроется наш Telegram-бот",
      hb2: "Переведите сумму на карту и пришлите скриншот чека",
      hb3: "После проверки уроки сразу придут в Telegram",
      lang2: "Язык курса: таджикский или русский — выбираете в боте",
      pTitle: "Тренировка", pSub: "5 минут в день — и слова запоминаются",
      mCards: "Карточки слов", mCardsS: "Иероглиф → значение. Переверните и проверьте себя.",
      mQuiz: "Тест из 10 вопросов", mQuizS: "Выберите правильное значение",
      mTones: "Тоны", mTonesS: "Определите тон слова по пиньиню",
      mLesson: "Урок 1 — бесплатно", mLessonS: "PDF и 5 аудио: тоны, слова, диалоги",
      learned: "слов выучено", best: "лучший результат",
      tap: "Нажмите, чтобы перевернуть", know: "Знаю", again: "Повторить",
      next: "Дальше", finish: "Готово", great: "Отлично!", good: "Хорошо!", tryMore: "Попробуйте ещё!",
      score: "{a} из {b} правильно", xpGot: "+{x} XP", again2: "Ещё раз", toHome: "На главную",
      whichTone: "Какой это тон?", t1: "Ровный", t2: "Вверх", t3: "Вниз-вверх", t4: "Вниз", t5: "Лёгкий",
      whichMean: "Что это значит?",
      lTitle: "Урок 1 — бесплатно", lSub: "Тоны, пиньинь и первые слова",
      openPdf: "Открыть урок (PDF)", audio: "Аудио",
      a1: "Четыре тона", a2: "Скороговорка", a3: "Слова", a4: "Диалоги", a5: "Упражнение 1",
      likeIt: "Понравилось? Ещё 19 уроков и уровни HSK 2–6 — в полном курсе.",
      prTitle: "Профиль", yourName: "Ваше имя", namePh: "Напишите имя",
      days: "дней подряд", xp: "XP", settings: "Настройки", language: "Язык", theme: "Тема",
      thAuto: "Авто", thLight: "Светлая", thDark: "Тёмная",
      contacts: "Связь", tgBot: "Telegram — покупка и вопросы", insta: "Instagram — уроки каждый день", site: "Сайт",
      install: "Установить приложение", installS: "Иконка ChinaWay на экране телефона",
      installNow: "Установить", installed: "Приложение установлено ✓",
      iosT: "Установка на iPhone", ios1: "В Safari нажмите «Поделиться» {i}",
      ios2: "Выберите «На экран „Домой“»", ios3: "Нажмите «Добавить» — готово!",
      androidT: "Установка на Android", and1: "Откройте меню браузера ⋮", and2: "Выберите «Установить приложение» или «Добавить на главный экран»",
      ok: "Понятно", privacy: "Конфиденциальность", version: "Версия",
      onb1: "Китайский — в вашем телефоне", onb1p: "Курсы HSK 1–6 от ChinaWay: уроки, аудио, тесты и тренировки в одном приложении.",
      onb2: "Выберите язык", onb2p: "Всё приложение будет на этом языке. Поменять можно в любой момент.",
      onb3: "Какая у вас цель?", onb3p: "Подскажем подходящий путь.",
      g1: "Учёба в Китае", g2: "Бизнес с Китаем", g3: "Работа и заработок", g4: "Для себя",
      cont: "Продолжить", start: "Начать", skip: "Пропустить",
      saved: "Сохранено", soundNo: "Озвучка на этом устройстве недоступна",
      goalHint: { g1: "Для китайских вузов обычно нужен HSK 4–5.", g2: "Для закупок и переговоров хватит HSK 3–4.", g3: "Для работы с китайскими компаниями советуем HSK 4.", g4: "Начните с HSK 1 — в своём темпе." },
      yourPath: "Ваш путь",
    },
  };
  const L = () => (S.lang === "ru" ? "ru" : "tg");
  const t = (k, vars) => { let s = TX[L()][k]; if (s == null) s = k; if (vars) for (const v in vars) s = String(s).replace("{" + v + "}", vars[v]); return s; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const tr = (w) => (L() === "ru" ? w[3] : w[2]);

  /* ---------- иконки ---------- */
  const I = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h2l2-6 4 12 4-14 4 12 2-4h2"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>',
    tg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3L18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5L20.6 3c.9-.3 1.6.2 1.3 1.3z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v13M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  };

  /* ---------- утилиты ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const view = $("#view");
  const todayStr = () => new Date().toISOString().slice(0, 10);
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const buzz = (ms) => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} };
  function toast(msg) { const el = $("#toast"); el.textContent = msg; el.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 1900); }
  function addXP(x) {
    const d = todayStr(); let streak = S.streak || 0;
    if (S.last !== d) { const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10); streak = S.last === y ? streak + 1 : 1; }
    save({ xp: (S.xp || 0) + x, last: d, streak });
  }
  function speak(text) {
    try {
      if (!("speechSynthesis" in window)) return toast(t("soundNo"));
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text); u.lang = "zh-CN"; u.rate = 0.8;
      const v = speechSynthesis.getVoices().find((x) => /zh[-_]CN/i.test(x.lang)) || speechSynthesis.getVoices().find((x) => /^zh/i.test(x.lang));
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) { toast(t("soundNo")); }
  }
  function wordOfDay() { const n = Math.floor(Date.now() / 864e5); const ok = WORDS.filter((w) => w[2].length <= 16 && w[3].length <= 16 && !/[!?！？]/.test(w[0])); const pool = ok.length ? ok : WORDS; return pool[(n * 7) % pool.length]; }
  function applyTheme() {
    const r = document.documentElement;
    if (S.theme === "light" || S.theme === "dark") r.setAttribute("data-theme", S.theme); else r.removeAttribute("data-theme");
    r.lang = L() === "ru" ? "ru" : "tg";
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = getComputedStyle(r).getPropertyValue("--accent").trim() || "#c8102e";
  }
  const isStandalone = () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredPrompt = e; if (route().name === "home") render(); });
  window.addEventListener("appinstalled", () => { deferredPrompt = null; toast(t("installed")); });

  /* ---------- листы ---------- */
  function sheet(html) {
    const w = $("#sheet-wrap"); $(".sheet", w).innerHTML = html; w.hidden = false;
    w.onclick = (e) => { if (e.target.closest("[data-close]")) w.hidden = true; };
  }
  function installFlow() {
    if (isStandalone()) return toast(t("installed"));
    if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt.userChoice.finally(() => { deferredPrompt = null; render(); }); return; }
    if (isIOS()) {
      sheet(`<h3 class="h2" style="margin-top:0">${t("iosT")}</h3>
        <div class="ios-step"><span class="n">1</span><div>${t("ios1", { i: I.share })}</div></div>
        <div class="ios-step"><span class="n">2</span><div>${t("ios2")}</div></div>
        <div class="ios-step"><span class="n">3</span><div>${t("ios3")}</div></div>
        <button class="btn block" style="margin-top:18px" data-close>${t("ok")}</button>`);
    } else {
      sheet(`<h3 class="h2" style="margin-top:0">${t("androidT")}</h3>
        <div class="ios-step"><span class="n">1</span><div>${t("and1")}</div></div>
        <div class="ios-step"><span class="n">2</span><div>${t("and2")}</div></div>
        <button class="btn block" style="margin-top:18px" data-close>${t("ok")}</button>`);
    }
  }

  /* ---------- маршруты ---------- */
  function route() {
    const h = (location.hash || "#/home").slice(2).split("/");
    return { name: h[0] || "home", arg: h[1] };
  }
  const go = (r) => { location.hash = "#/" + r; };
  const TABS = [["home", "home", I.home], ["courses", "courses", I.book], ["practice", "practice", I.bolt], ["profile", "profile", I.user]];
  function tabs(active) {
    $("#tabs").innerHTML = '<div class="in">' + TABS.map(([r, k, ic]) =>
      `<a href="#/${r}" class="${active === r ? "on" : ""}" ${active === r ? 'aria-current="page"' : ""}>${ic}<span>${t(k)}</span></a>`).join("") + "</div>";
  }

  function render() {
    applyTheme();
    if (!S.lang) return onboarding(0);
    const r = route();
    const map = { home, courses, course, practice, cards, quiz, tones, lesson, profile };
    const fn = map[r.name] || home;
    const tab = { course: "courses", cards: "practice", quiz: "practice", tones: "practice", lesson: "home" }[r.name] || r.name;
    document.body.classList.toggle("bare", ["cards", "quiz", "tones"].includes(r.name));
    tabs(tab);
    view.style.animation = "none"; void view.offsetWidth; view.style.animation = "";
    fn(r.arg);
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", render);

  /* ---------- онбординг ---------- */
  function onboarding(step) {
    document.body.classList.add("bare");
    const dots = `<div class="dots">${[0, 1, 2].map((i) => `<i class="${i === step ? "on" : ""}"></i>`).join("")}</div>`;
    if (step === 0) {
      view.innerHTML = `<div class="onb"><div>
        <div class="art"><div class="ring"><span class="zh">中</span></div><div style="font-weight:800;font-size:22px">China<span style="color:#f4c86e">Way</span></div></div>
        <h1>Забони чинӣ — дар телефони шумо<br><span class="muted" style="font-size:20px">Китайский — в вашем телефоне</span></h1>
        <p>HSK 1–6 · тоҷикӣ / русский · 120 дарс / уроков</p></div>
        <div>${dots}<button class="btn block" id="n">Идома / Продолжить</button></div></div>`;
      $("#n").onclick = () => onboarding(1);
    } else if (step === 1) {
      view.innerHTML = `<div class="onb"><div>
        <h1>Забонро интихоб кунед<br><span class="muted" style="font-size:20px">Выберите язык</span></h1>
        <div class="stack" style="margin-top:18px">
          <button class="choice" data-l="tg"><span class="em">🇹🇯</span>Тоҷикӣ</button>
          <button class="choice" data-l="ru"><span class="em">🇷🇺</span>Русский</button>
        </div></div><div>${dots}</div></div>`;
      view.querySelectorAll("[data-l]").forEach((b) => (b.onclick = () => { buzz(10); S._pending = b.dataset.l; onboarding(2); }));
    } else {
      const lang = S._pending || "tg"; const T = TX[lang];
      view.innerHTML = `<div class="onb"><div>
        <h1>${T.onb3}</h1><p>${T.onb3p}</p>
        <div class="stack" style="margin-top:18px">
          ${[["g1", "🎓"], ["g2", "💼"], ["g3", "💰"], ["g4", "❤️"]].map(([g, e]) => `<button class="choice" data-g="${g}"><span class="em">${e}</span>${T[g]}</button>`).join("")}
        </div></div><div>${dots}<button class="btn ghost block" id="sk">${T.skip}</button></div></div>`;
      const done = (g) => { delete S._pending; save({ lang, goal: g }); buzz(15); location.hash = "#/home"; render(); };
      view.querySelectorAll("[data-g]").forEach((b) => (b.onclick = () => done(b.dataset.g)));
      $("#sk").onclick = () => done(null);
    }
  }

  /* ---------- главная ---------- */
  function home() {
    const w = wordOfDay();
    const showInstall = !isStandalone();
    view.innerHTML = `
      <div class="topbar">
        <div class="brand"><img src="icons/icon-192.png" alt=""><span>China<b>Way</b></span></div>
        <div class="chips"><span class="chip gold" title="streak">🔥 ${S.streak || 0}</span><span class="chip">⭐ ${S.xp || 0}</span></div>
      </div>
      <div class="h1">${S.name ? esc(t("hiName", { n: S.name })) : t("hi") + " 👋"}</div>
      <p class="sub">${t("today")}</p>
      ${showInstall ? `<div class="install"><img src="icons/icon-192.png" alt=""><div class="t"><b>${t("install")}</b>${t("installS")}</div><button class="btn" id="inst">${t("installNow")}</button></div>` : ""}
      <div class="hero" style="margin-top:16px">
        <div class="eyebrow">🎁 ${t("heroEy")}</div>
        <h2>${t("heroH")}</h2>
        <p>${t("heroP")}</p>
        <div class="row"><a class="btn light" href="#/lesson">${I.play}${t("startFree")}</a><a class="btn glass" href="#/courses">${t("allCourses")}</a></div>
      </div>
      <div class="card" style="margin-top:14px">
        <div class="label">${t("wod")}</div>
        <div class="wod"><div class="big zh">${esc(w[0])}</div><div><div class="py">${esc(w[1])}</div><div class="tr">${esc(tr(w))}</div></div>
        <button class="icon-btn" id="say" aria-label="${t("listen")}">${I.sound}</button></div>
      </div>
      <div class="h2">${t("quick")}</div>
      <div class="tiles">
        <a class="tile" href="#/cards"><span class="ic red">${I.cards}</span>${t("cards")}</a>
        <a class="tile" href="#/quiz"><span class="ic gold">${I.check}</span>${t("quiz")}</a>
        <a class="tile" href="#/tones"><span class="ic green">${I.wave}</span>${t("tones")}</a>
      </div>
      ${S.goal ? `<div class="card" style="margin-top:14px"><div class="label">${t("yourPath")} · ${t(S.goal)}</div><p>${TX[L()].goalHint[S.goal]}</p></div>` : ""}
      <div class="card stats" style="margin-top:14px">
        <div><b>6</b><span>${t("st1")} HSK</span></div><div><b>120</b><span>${t("st2")}</span></div>
        <div><b>2</b><span>${t("st3")}</span></div><div><b>${t("forever")}</b><span>${t("st4")}</span></div>
      </div>
      <div class="h2">${t("why")}</div>
      <div class="list">
        ${[["📱", "w1"], ["♾️", "w2"], ["🇹🇯", "w3"], ["🚀", "w4"]].map(([e, k]) => `<div class="item"><span class="ic" style="background:var(--surface-2);font-size:20px">${e}</span><div class="t"><b>${t(k)}</b><small>${t(k + "s")}</small></div></div>`).join("")}
      </div>
      <a class="btn block" style="margin-top:16px" href="#/courses">${t("allCourses")}</a>
      <p class="foot">© ChinaWay · chinaway99.github.io</p>`;
    $("#say").onclick = () => speak(w[0]);
    const ib = $("#inst"); if (ib) ib.onclick = installFlow;
  }

  /* ---------- курсы ---------- */
  function levelCard(l, i) {
    const n = l.id.slice(3);
    return `<a class="card lvl" href="#/course/${l.id}">
      <div class="badge"><small>HSK</small><b>${n}</b></div>
      <div><h3>${esc(L() === "ru" ? l.title_ru : l.title_tj)}</h3>
      <p>${esc(L() === "ru" ? l.about_ru : l.about_tj)}</p>
      <div class="meta"><span class="tag red">${t("from")} ${l.price[0]} ${t("smn")}</span><span class="tag">${l.lessons} ${t("lessons")}</span><span class="tag">~${l.words} ${t("words")}</span>${i === 0 ? `<span class="tag green">${t("recommended")}</span>` : ""}</div></div></a>`;
  }
  function courses() {
    view.innerHTML = `<div class="h1">${t("cTitle")}</div><p class="sub">${t("cSub")}</p>
      <div class="stack" style="margin-top:16px">${LEVELS.map(levelCard).join("")}</div>
      <div class="h2">${t("howBuy")}</div>
      <div class="card"><ol class="steps"><li>${t("hb1")}</li><li>${t("hb2")}</li><li>${t("hb3")}</li></ol></div>`;
  }
  function course(id) {
    const l = LEVELS.find((x) => x.id === id) || LEVELS[0]; const n = l.id.slice(3);
    const plans = [["tSelf", "fSelf", 0], ["tSup", "fSup", 1], ["tVip", "fVip", 2]];
    view.innerHTML = `<a class="back" href="#/courses">${I.back}${t("courses")}</a>
      <div class="hero"><div class="eyebrow">HSK ${n} · ${l.lessons} ${t("lessons")} · ~${l.words} ${t("words")}</div>
        <h2>${esc(L() === "ru" ? l.title_ru : l.title_tj)}</h2><p>${esc(L() === "ru" ? l.about_ru : l.about_tj)}</p></div>
      <p class="sub" style="margin:14px 2px 0">🇹🇯 🇷🇺 ${t("lang2")}</p>
      <div class="stack" style="margin-top:18px;gap:18px">
        ${plans.map(([tk, fk, i]) => `<div class="plan ${i === 1 ? "best" : ""}">${i === 1 ? `<span class="ribbon">${t("popular")}</span>` : ""}
          <h4>${t(tk)}</h4><div class="cost">${l.price[i]} <small>${t("smn")}</small></div>
          <ul>${TX[L()][fk].map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
          <a class="btn block ${i === 1 ? "" : "ghost"}" href="${BOT}?start=${l.id}" target="_blank" rel="noopener">${I.tg}${t("buy")}</a></div>`).join("")}
      </div>
      <div class="h2">${t("howBuy")}</div>
      <div class="card"><ol class="steps"><li>${t("hb1")}</li><li>${t("hb2")}</li><li>${t("hb3")}</li></ol></div>`;
  }

  /* ---------- тренировка ---------- */
  function practice() {
    const known = (S.known || []).length;
    view.innerHTML = `<div class="h1">${t("pTitle")}</div><p class="sub">${t("pSub")}</p>
      <div class="card stats" style="margin-top:16px;grid-template-columns:repeat(3,1fr)">
        <div><b>${known}</b><span>${t("learned")}</span></div><div><b>${S.quizBest || 0}/10</b><span>${t("best")}</span></div><div><b>🔥 ${S.streak || 0}</b><span>${t("days")}</span></div>
      </div>
      <div class="list" style="margin-top:16px">
        <a class="item" href="#/cards"><span class="ic red">${I.cards}</span><div class="t"><b>${t("mCards")}</b><small>${t("mCardsS")}</small></div>${I.chev}</a>
        <a class="item" href="#/quiz"><span class="ic gold">${I.check}</span><div class="t"><b>${t("mQuiz")}</b><small>${t("mQuizS")}</small></div>${I.chev}</a>
        <a class="item" href="#/tones"><span class="ic green">${I.wave}</span><div class="t"><b>${t("mTones")}</b><small>${t("mTonesS")}</small></div>${I.chev}</a>
        <a class="item" href="#/lesson"><span class="ic red">${I.gift}</span><div class="t"><b>${t("mLesson")}</b><small>${t("mLessonS")}</small></div>${I.chev}</a>
      </div>`;
  }
  function resultScreen(ok, total, xp, again) {
    const ratio = ok / total;
    addXP(xp);
    view.innerHTML = `<div class="result"><div class="medal">${ratio >= 0.8 ? "🏆" : ratio >= 0.5 ? "🎉" : "💪"}</div>
      <h2>${ratio >= 0.8 ? t("great") : ratio >= 0.5 ? t("good") : t("tryMore")}</h2>
      <p class="sub">${t("score", { a: ok, b: total })} · <b style="color:var(--gold)">${t("xpGot", { x: xp })}</b></p>
      <div class="stack" style="margin-top:26px"><button class="btn block" id="ag">${t("again2")}</button>
      <a class="btn ghost block" href="#/courses">${t("allCourses")}</a><a class="btn ghost block" href="#/home">${t("toHome")}</a></div></div>`;
    $("#ag").onclick = again;
  }
  function cards() {
    const known = new Set(S.known || []);
    const pool = shuffle(WORDS.filter((w) => !known.has(w[0]))).concat(shuffle(WORDS.filter((w) => known.has(w[0]))));
    const deck = pool.slice(0, 10); let i = 0, ok = 0;
    function show() {
      if (i >= deck.length) return resultScreen(ok, deck.length, ok * 5 + 5, cards);
      const w = deck[i];
      view.innerHTML = `<a class="back" href="#/practice">${I.back}${t("practice")}</a>
        <div class="progress"><i style="width:${(i / deck.length) * 100}%"></i></div>
        <div class="flash" id="fc"><div class="inner">
          <div class="face front-f"><div class="hz zh ${w[0].length > 2 ? "long" : ""}">${esc(w[0])}</div><div class="hint">${t("tap")}</div></div>
          <div class="face back-f"><div class="hz zh">${esc(w[0])}</div><div class="pyb">${esc(w[1])}</div><div class="mean">${esc(tr(w))}</div>${w[2] !== w[3] ? `<div class="alt">${esc(L() === "ru" ? w[2] : w[3])}</div>` : ""}</div>
        </div></div>
        <div class="two"><button class="btn ghost" id="ag">${t("again")}</button><button class="btn green" id="kn">${t("know")}</button></div>
        <button class="btn ghost block" style="margin-top:10px" id="sp">${I.sound}${t("listen")}</button>`;
      const fc = $("#fc"); fc.onclick = () => { fc.classList.toggle("flipped"); $(".front-f", fc).classList.add("anim"); buzz(8); if (fc.classList.contains("flipped")) speak(w[0]); };
      $("#sp").onclick = () => speak(w[0]);
      $("#kn").onclick = () => { ok++; const k = new Set(S.known || []); k.add(w[0]); save({ known: [...k] }); buzz(12); i++; show(); };
      $("#ag").onclick = () => { i++; show(); };
    }
    show();
  }
  function quiz() {
    const qs = shuffle(WORDS).slice(0, 10); let i = 0, ok = 0;
    function show() {
      if (i >= qs.length) { if (ok > (S.quizBest || 0)) save({ quizBest: ok }); return resultScreen(ok, qs.length, ok * 10, quiz); }
      const w = qs[i];
      const others = shuffle(WORDS.filter((x) => tr(x) !== tr(w))).slice(0, 3);
      const opts = shuffle([w].concat(others));
      view.innerHTML = `<a class="back" href="#/practice">${I.back}${t("practice")}</a>
        <div class="progress"><i style="width:${(i / qs.length) * 100}%"></i></div>
        <p class="sub" style="text-align:center;margin-top:16px">${t("whichMean")} · ${i + 1}/${qs.length}</p>
        <div class="q-hz zh ${w[0].length > 2 ? "long" : ""}">${esc(w[0])}</div><div class="q-py">${esc(w[1])}</div>
        <div class="opts">${opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(tr(o))}</button>`).join("")}</div>`;
      view.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
        const right = opts[+b.dataset.k] === w;
        view.querySelectorAll(".opt").forEach((x) => { x.disabled = true; if (opts[+x.dataset.k] === w) x.classList.add("ok"); });
        if (right) { ok++; buzz(12); } else { b.classList.add("bad"); buzz([30, 40, 30]); }
        speak(w[0]);
        setTimeout(() => { i++; show(); }, right ? 750 : 1400);
      }));
    }
    show();
  }
  const TONE = { "āēīōūǖ": 1, "áéíóúǘ": 2, "ǎěǐǒǔǚ": 3, "àèìòùǜ": 4 };
  function toneOf(py) { for (const ch of py) for (const k in TONE) if (k.includes(ch)) return TONE[k]; return 5; }
  function tones() {
    const single = WORDS.filter((w) => !/\s/.test(w[1]) && w[0].length === 1 && toneOf(w[1]) < 5);
    const qs = shuffle(single).slice(0, 10); let i = 0, ok = 0;
    function show() {
      if (i >= qs.length) return resultScreen(ok, qs.length, ok * 8, tones);
      const w = qs[i]; const right = toneOf(w[1]);
      const marks = [[1, "ā", "t1"], [2, "á", "t2"], [3, "ǎ", "t3"], [4, "à", "t4"]];
      view.innerHTML = `<a class="back" href="#/practice">${I.back}${t("practice")}</a>
        <div class="progress"><i style="width:${(i / qs.length) * 100}%"></i></div>
        <p class="sub" style="text-align:center;margin-top:16px">${t("whichTone")} · ${i + 1}/${qs.length}</p>
        <div class="q-hz zh">${esc(w[0])}</div><div class="q-py">${esc(w[1])} <span class="muted" style="font-weight:500">· ${esc(tr(w))}</span></div>
        <div class="tone-opts">${marks.map(([n, m, k]) => `<button class="opt" data-n="${n}"><b>${m}</b>${n} · ${t(k)}</button>`).join("")}</div>
        <button class="btn ghost block" style="margin-top:12px" id="sp">${I.sound}${t("listen")}</button>`;
      $("#sp").onclick = () => speak(w[0]);
      view.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
        const good = +b.dataset.n === right;
        view.querySelectorAll(".opt").forEach((x) => { x.disabled = true; if (+x.dataset.n === right) x.classList.add("ok"); });
        if (good) { ok++; buzz(12); } else { b.classList.add("bad"); buzz([30, 40, 30]); }
        speak(w[0]);
        setTimeout(() => { i++; show(); }, good ? 750 : 1400);
      }));
    }
    show();
  }

  /* ---------- бесплатный урок ---------- */
  const TRACKS = [["a1", "../01_chetyre_tona.m4a"], ["a2", "../02_skorogovorka.m4a"], ["a3", "../03_slova.m4a"], ["a4", "../04_dialogi.m4a"], ["a5", "../05_uprazhnenie_1.m4a"]];
  let player = null;
  function lesson() {
    const pdf = L() === "ru" ? "../urok-01.pdf" : "../urok-01-tj.pdf";
    view.innerHTML = `<a class="back" href="#/home">${I.back}${t("home")}</a>
      <div class="hero"><div class="eyebrow">🎁 HSK 1 · 1/20</div><h2>${t("lTitle")}</h2><p>${t("lSub")}</p>
        <div class="row"><a class="btn light" href="${pdf}" target="_blank" rel="noopener">${I.pdf}${t("openPdf")}</a></div></div>
      <div class="h2">${t("audio")}</div>
      <div class="list">${TRACKS.map(([k, src], n) => `<div class="track"><button class="play" data-n="${n}" aria-label="${t(k)}">${I.play}</button>
        <div class="t"><b>${n + 1}. ${t(k)}</b><div class="bar"><i id="bar${n}"></i></div></div></div>`).join("")}</div>
      <div class="card" style="margin-top:16px"><p style="margin-bottom:12px">${t("likeIt")}</p><a class="btn block" href="#/course/hsk1">HSK 1 · ${t("from")} 199 ${t("smn")}</a></div>`;
    if (player) { player.pause(); }
    player = new Audio(); player.preload = "none"; let cur = -1;
    const btns = view.querySelectorAll(".play");
    const setIcons = () => btns.forEach((b, n) => (b.innerHTML = n === cur && !player.paused ? I.pause : I.play));
    btns.forEach((b) => (b.onclick = () => {
      const n = +b.dataset.n;
      if (n === cur) { player.paused ? player.play() : player.pause(); }
      else { cur = n; player.src = TRACKS[n][1]; player.play().catch(() => {}); addXP(2); }
    }));
    player.ontimeupdate = () => { const bar = $("#bar" + cur); if (bar && player.duration) bar.style.width = (player.currentTime / player.duration) * 100 + "%"; };
    player.onplay = player.onpause = player.onended = setIcons;
  }
  window.addEventListener("hashchange", () => { if (route().name !== "lesson" && player) player.pause(); });

  /* ---------- профиль ---------- */
  function profile() {
    const initial = (S.name || "C").trim().charAt(0).toUpperCase();
    view.innerHTML = `<div class="h1">${t("prTitle")}</div>
      <div class="card me" style="margin-top:12px"><div class="avatar">${esc(initial)}</div>
        <div style="flex:1"><div style="font-weight:800;font-size:18px">${esc(S.name || "ChinaWay")}</div>
        <div class="sub">🔥 ${S.streak || 0} ${t("days")} · ⭐ ${S.xp || 0} ${t("xp")}</div></div></div>
      <div class="card stats" style="margin-top:12px;grid-template-columns:repeat(3,1fr)">
        <div><b>${(S.known || []).length}</b><span>${t("learned")}</span></div><div><b>${S.quizBest || 0}/10</b><span>${t("best")}</span></div><div><b>${S.xp || 0}</b><span>XP</span></div></div>
      <div class="h2">${t("yourName")}</div>
      <input class="field" id="nm" maxlength="30" placeholder="${t("namePh")}" value="${esc(S.name || "")}">
      <div class="h2">${t("settings")}</div>
      <div class="card stack">
        <div><div class="label">${t("language")}</div><div class="seg" id="lg"><button data-v="tg" class="${L() === "tg" ? "on" : ""}">🇹🇯 Тоҷикӣ</button><button data-v="ru" class="${L() === "ru" ? "on" : ""}">🇷🇺 Русский</button></div></div>
        <div><div class="label">${t("theme")}</div><div class="seg" id="th">${[["auto", "thAuto"], ["light", "thLight"], ["dark", "thDark"]].map(([v, k]) => `<button data-v="${v}" class="${S.theme === v ? "on" : ""}">${t(k)}</button>`).join("")}</div></div>
      </div>
      <div class="list" style="margin-top:12px">
        <button class="item" id="inst"><span class="ic" style="background:var(--gold-soft);color:var(--gold)">${I.download}</span><div class="t"><b>${isStandalone() ? t("installed") : t("install")}</b><small>${t("installS")}</small></div>${I.chev}</button>
      </div>
      <div class="h2">${t("contacts")}</div>
      <div class="list">
        <a class="item" href="${BOT}" target="_blank" rel="noopener"><span class="ic" style="background:#e3f2fd;color:#229ed9">${I.tg}</span><div class="t"><b>@chinaway_tj_bot</b><small>${t("tgBot")}</small></div>${I.chev}</a>
        <a class="item" href="${IG}" target="_blank" rel="noopener"><span class="ic" style="background:#fde7f1;color:#d6249f">${I.ig}</span><div class="t"><b>@chinaway.tj</b><small>${t("insta")}</small></div>${I.chev}</a>
        <a class="item" href="${SITE}" target="_blank" rel="noopener"><span class="ic red">${I.globe}</span><div class="t"><b>chinaway99.github.io</b><small>${t("site")}</small></div>${I.chev}</a>
        <a class="item" href="../privacy.html" target="_blank" rel="noopener"><span class="ic" style="background:var(--surface-2)">${I.lock}</span><div class="t"><b>${t("privacy")}</b></div>${I.chev}</a>
      </div>
      <p class="foot">ChinaWay · ${t("version")} 1.0</p>`;
    const nm = $("#nm"); nm.onchange = () => { save({ name: nm.value.trim() }); toast(t("saved")); };
    $("#lg").onclick = (e) => { const b = e.target.closest("button"); if (b) { save({ lang: b.dataset.v }); render(); } };
    $("#th").onclick = (e) => { const b = e.target.closest("button"); if (b) { save({ theme: b.dataset.v }); render(); } };
    $("#inst").onclick = installFlow;
  }

  /* ---------- запуск ---------- */
  render();
  setTimeout(() => $("#splash").classList.add("hide"), 900);
  if ("speechSynthesis" in window) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch (e) {} }
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
