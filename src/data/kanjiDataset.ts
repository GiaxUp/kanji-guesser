import { KanjiItem } from "../types/kanji";

export const KANJI_DATASET: KanjiItem[] = [
  // GRADE 1 (JLPT N5)
  {
    _id: "k-sun-1",
    grade: 1,
    jlpt: "N5",
    kanji: {
      character: "日",
      strokes: {
        count: 4,
        images: [
          "https://media.kanjialive.com/kanji_strokes/nichi_1.svg",
          "https://media.kanjialive.com/kanji_strokes/nichi_2.svg",
          "https://media.kanjialive.com/kanji_strokes/nichi_3.svg",
          "https://media.kanjialive.com/kanji_strokes/nichi_4.svg",
        ],
      },
      meaning: { english: "day, sun, Japan" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/nichi_00.mp4",
      },
      kunyomi: { hiragana: "ひ, -び, -か", romaji: "hi, -bi, -ka" },
      onyomi: { katakana: "ニチ, ジツ", romaji: "NICHI, JITSU" },
    },
    kunyomi_ja: "ひ, -び, -か",
    onyomi_ja: "ニチ, ジツ",
    radical: {
      character: "日",
      strokes: 4,
      name: { hiragana: "ひ", romaji: "hi" },
      meaning: { english: "sun, day" },
    },
    examples: [
      {
        japanese: "日本 (にほん)",
        romaji: "nihon",
        meaning: { english: "Japan" },
        audio: { mp3: "https://media.kanjialive.com/examples_audio/audio-aac/nihon_06_a.aac" },
      },
      {
        japanese: "日曜日 (にちようび)",
        romaji: "nichiyoubi",
        meaning: { english: "Sunday" },
        audio: { mp3: "https://media.kanjialive.com/examples_audio/audio-aac/nichiyoubi_06_b.aac" },
      },
      {
        japanese: "毎日 (まいにち)",
        romaji: "mainichi",
        meaning: { english: "every day" },
      },
    ],
    mnemonic: "A window looking out at the radiant sun in the morning sky.",
  },
  {
    _id: "k-moon-2",
    grade: 1,
    jlpt: "N5",
    kanji: {
      character: "月",
      strokes: {
        count: 4,
        images: [
          "https://media.kanjialive.com/kanji_strokes/tsuki_1.svg",
          "https://media.kanjialive.com/kanji_strokes/tsuki_2.svg",
          "https://media.kanjialive.com/kanji_strokes/tsuki_3.svg",
          "https://media.kanjialive.com/kanji_strokes/tsuki_4.svg",
        ],
      },
      meaning: { english: "moon, month" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/tsuki_00.mp4",
      },
      kunyomi: { hiragana: "つき", romaji: "tsuki" },
      onyomi: { katakana: "ゲツ, ガツ", romaji: "GETSU, GATSU" },
    },
    kunyomi_ja: "つき",
    onyomi_ja: "ゲツ, ガツ",
    radical: {
      character: "月",
      strokes: 4,
      name: { hiragana: "つき", romaji: "tsuki" },
      meaning: { english: "moon" },
    },
    examples: [
      {
        japanese: "月曜日 (げつようび)",
        romaji: "getsuyoubi",
        meaning: { english: "Monday" },
        audio: { mp3: "https://media.kanjialive.com/examples_audio/audio-aac/getsuyoubi_06_a.aac" },
      },
      {
        japanese: "今月 (こんげつ)",
        romaji: "kongetsu",
        meaning: { english: "this month" },
      },
      {
        japanese: "満月 (まんげつ)",
        romaji: "mangetsu",
        meaning: { english: "full moon" },
      },
    ],
    mnemonic: "A crescent moon suspended in the nocturnal sky with passing clouds.",
  },
  {
    _id: "k-tree-3",
    grade: 1,
    jlpt: "N5",
    kanji: {
      character: "木",
      strokes: {
        count: 4,
        images: [
          "https://media.kanjialive.com/kanji_strokes/ki_1.svg",
          "https://media.kanjialive.com/kanji_strokes/ki_2.svg",
          "https://media.kanjialive.com/kanji_strokes/ki_3.svg",
          "https://media.kanjialive.com/kanji_strokes/ki_4.svg",
        ],
      },
      meaning: { english: "tree, wood" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/ki_00.mp4",
      },
      kunyomi: { hiragana: "き, こ-", romaji: "ki, ko-" },
      onyomi: { katakana: "ボク, モク", romaji: "BOKU, MOKU" },
    },
    kunyomi_ja: "き, こ-",
    onyomi_ja: "ボク, モク",
    radical: {
      character: "木",
      strokes: 4,
      name: { hiragana: "き", romaji: "ki" },
      meaning: { english: "tree" },
    },
    examples: [
      {
        japanese: "木曜日 (もくようび)",
        romaji: "mokuyoubi",
        meaning: { english: "Thursday" },
      },
      {
        japanese: "大木 (たいぼく)",
        romaji: "taiboku",
        meaning: { english: "large tree" },
      },
    ],
    mnemonic: "A tall trunk with branches reaching up and deep roots planted in soil.",
  },
  {
    _id: "k-water-4",
    grade: 1,
    jlpt: "N5",
    kanji: {
      character: "水",
      strokes: {
        count: 4,
        images: [
          "https://media.kanjialive.com/kanji_strokes/mizu_1.svg",
          "https://media.kanjialive.com/kanji_strokes/mizu_2.svg",
          "https://media.kanjialive.com/kanji_strokes/mizu_3.svg",
          "https://media.kanjialive.com/kanji_strokes/mizu_4.svg",
        ],
      },
      meaning: { english: "water" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/mizu_00.mp4",
      },
      kunyomi: { hiragana: "みず", romaji: "mizu" },
      onyomi: { katakana: "スイ", romaji: "SUI" },
    },
    kunyomi_ja: "みず",
    onyomi_ja: "スイ",
    radical: {
      character: "水",
      strokes: 4,
      name: { hiragana: "みず", romaji: "mizu" },
      meaning: { english: "water" },
    },
    examples: [
      {
        japanese: "水曜日 (すいようび)",
        romaji: "suiyoubi",
        meaning: { english: "Wednesday" },
      },
      {
        japanese: "水泳 (すいえい)",
        romaji: "suiei",
        meaning: { english: "swimming" },
      },
      {
        japanese: "冷水 (れいすい)",
        romaji: "reisui",
        meaning: { english: "cold water" },
      },
    ],
    mnemonic: "A central river cascading down with water droplets splashing on both sides.",
  },
  {
    _id: "k-fire-5",
    grade: 1,
    jlpt: "N5",
    kanji: {
      character: "火",
      strokes: {
        count: 4,
        images: [
          "https://media.kanjialive.com/kanji_strokes/hi_1.svg",
          "https://media.kanjialive.com/kanji_strokes/hi_2.svg",
          "https://media.kanjialive.com/kanji_strokes/hi_3.svg",
          "https://media.kanjialive.com/kanji_strokes/hi_4.svg",
        ],
      },
      meaning: { english: "fire, flame" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/hi_00.mp4",
      },
      kunyomi: { hiragana: "ひ, -び, ほ-", romaji: "hi, -bi, ho-" },
      onyomi: { katakana: "カ", romaji: "KA" },
    },
    kunyomi_ja: "ひ, -び, ほ-",
    onyomi_ja: "カ",
    radical: {
      character: "火",
      strokes: 4,
      name: { hiragana: "ひ", romaji: "hi" },
      meaning: { english: "fire" },
    },
    examples: [
      {
        japanese: "火曜日 (かようび)",
        romaji: "kayoubi",
        meaning: { english: "Tuesday" },
      },
      {
        japanese: "花火 (はなび)",
        romaji: "hanabi",
        meaning: { english: "fireworks" },
      },
      {
        japanese: "火山 (かざん)",
        romaji: "kazan",
        meaning: { english: "volcano" },
      },
    ],
    mnemonic: "Lively flames bursting upward with sparks dancing in the wind.",
  },
  {
    _id: "k-gold-6",
    grade: 1,
    jlpt: "N5",
    kanji: {
      character: "金",
      strokes: {
        count: 8,
        images: [
          "https://media.kanjialive.com/kanji_strokes/kane_1.svg",
          "https://media.kanjialive.com/kanji_strokes/kane_2.svg",
          "https://media.kanjialive.com/kanji_strokes/kane_3.svg",
          "https://media.kanjialive.com/kanji_strokes/kane_4.svg",
        ],
      },
      meaning: { english: "gold, money, metal" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/kane_00.mp4",
      },
      kunyomi: { hiragana: "かね, かな-", romaji: "kane, kana-" },
      onyomi: { katakana: "キン, コン", romaji: "KIN, KON" },
    },
    kunyomi_ja: "かね, かな-",
    onyomi_ja: "キン, コン",
    radical: {
      character: "金",
      strokes: 8,
      name: { hiragana: "かね", romaji: "kane" },
      meaning: { english: "metal, gold" },
    },
    examples: [
      {
        japanese: "金曜日 (きんようび)",
        romaji: "kinyoubi",
        meaning: { english: "Friday" },
      },
      {
        japanese: "お金 (おかね)",
        romaji: "okane",
        meaning: { english: "money" },
      },
      {
        japanese: "金色 (きんいろ)",
        romaji: "kiniro",
        meaning: { english: "golden color" },
      },
    ],
    mnemonic: "Precious gold nuggets mined from deep beneath the earth's roof.",
  },
  {
    _id: "k-earth-7",
    grade: 1,
    jlpt: "N5",
    kanji: {
      character: "土",
      strokes: {
        count: 3,
        images: [
          "https://media.kanjialive.com/kanji_strokes/tsuchi_1.svg",
          "https://media.kanjialive.com/kanji_strokes/tsuchi_2.svg",
          "https://media.kanjialive.com/kanji_strokes/tsuchi_3.svg",
        ],
      },
      meaning: { english: "soil, earth, ground" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/tsuchi_00.mp4",
      },
      kunyomi: { hiragana: "つち", romaji: "tsuchi" },
      onyomi: { katakana: "ド, ト", romaji: "DO, TO" },
    },
    kunyomi_ja: "つち",
    onyomi_ja: "ド, ト",
    radical: {
      character: "土",
      strokes: 3,
      name: { hiragana: "つち", romaji: "tsuchi" },
      meaning: { english: "earth" },
    },
    examples: [
      {
        japanese: "土曜日 (どようび)",
        romaji: "doyoubi",
        meaning: { english: "Saturday" },
      },
      {
        japanese: "土地 (とち)",
        romaji: "tochi",
        meaning: { english: "land, plot of soil" },
      },
    ],
    mnemonic: "A sprouting plant rising out from the fertile ground line.",
  },
  {
    _id: "k-mountain-8",
    grade: 1,
    jlpt: "N5",
    kanji: {
      character: "山",
      strokes: {
        count: 3,
        images: [
          "https://media.kanjialive.com/kanji_strokes/yama_1.svg",
          "https://media.kanjialive.com/kanji_strokes/yama_2.svg",
          "https://media.kanjialive.com/kanji_strokes/yama_3.svg",
        ],
      },
      meaning: { english: "mountain" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/yama_00.mp4",
      },
      kunyomi: { hiragana: "やま", romaji: "yama" },
      onyomi: { katakana: "サン, セン", romaji: "SAN, SEN" },
    },
    kunyomi_ja: "やま",
    onyomi_ja: "サン, セン",
    radical: {
      character: "山",
      strokes: 3,
      name: { hiragana: "やま", romaji: "yama" },
      meaning: { english: "mountain" },
    },
    examples: [
      {
        japanese: "富士山 (ふじさん)",
        romaji: "fujisan",
        meaning: { english: "Mount Fuji" },
      },
      {
        japanese: "山道 (やまみち)",
        romaji: "yamamichi",
        meaning: { english: "mountain path" },
      },
    ],
    mnemonic: "Three majestic mountain peaks soaring into the clouds.",
  },
  {
    _id: "k-river-9",
    grade: 1,
    jlpt: "N5",
    kanji: {
      character: "川",
      strokes: {
        count: 3,
        images: [
          "https://media.kanjialive.com/kanji_strokes/kawa_1.svg",
          "https://media.kanjialive.com/kanji_strokes/kawa_2.svg",
          "https://media.kanjialive.com/kanji_strokes/kawa_3.svg",
        ],
      },
      meaning: { english: "river, stream" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/kawa_00.mp4",
      },
      kunyomi: { hiragana: "かわ", romaji: "kawa" },
      onyomi: { katakana: "セン", romaji: "SEN" },
    },
    kunyomi_ja: "かわ",
    onyomi_ja: "セン",
    radical: {
      character: "川",
      strokes: 3,
      name: { hiragana: "かわ", romaji: "kawa" },
      meaning: { english: "river" },
    },
    examples: [
      {
        japanese: "小川 (おがわ)",
        romaji: "ogawa",
        meaning: { english: "brook, stream" },
      },
      {
        japanese: "河川 (かせん)",
        romaji: "kasen",
        meaning: { english: "rivers" },
      },
    ],
    mnemonic: "Three winding currents of water flowing smoothly side-by-side.",
  },
  {
    _id: "k-person-10",
    grade: 1,
    jlpt: "N5",
    kanji: {
      character: "人",
      strokes: {
        count: 2,
        images: [
          "https://media.kanjialive.com/kanji_strokes/hito_1.svg",
          "https://media.kanjialive.com/kanji_strokes/hito_2.svg",
        ],
      },
      meaning: { english: "person, human" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/hito_00.mp4",
      },
      kunyomi: { hiragana: "ひと", romaji: "hito" },
      onyomi: { katakana: "ジン, ニン", romaji: "JIN, NIN" },
    },
    kunyomi_ja: "ひと",
    onyomi_ja: "ジン, ニン",
    radical: {
      character: "人",
      strokes: 2,
      name: { hiragana: "ひと", romaji: "hito" },
      meaning: { english: "person" },
    },
    examples: [
      {
        japanese: "日本人 (にほんじん)",
        romaji: "nihonjin",
        meaning: { english: "Japanese person" },
      },
      {
        japanese: "大人 (おとな)",
        romaji: "otona",
        meaning: { english: "adult" },
      },
      {
        japanese: "三人 (さんにん)",
        romaji: "sannin",
        meaning: { english: "three people" },
      },
    ],
    mnemonic: "A resilient human being walking forward with two strong legs.",
  },

  // GRADE 2 (JLPT N5/N4) - Original default grade in user's app
  {
    _id: "k-heart-11",
    grade: 2,
    jlpt: "N4",
    kanji: {
      character: "心",
      strokes: {
        count: 4,
        images: [
          "https://media.kanjialive.com/kanji_strokes/kokoro_1.svg",
          "https://media.kanjialive.com/kanji_strokes/kokoro_2.svg",
          "https://media.kanjialive.com/kanji_strokes/kokoro_3.svg",
          "https://media.kanjialive.com/kanji_strokes/kokoro_4.svg",
        ],
      },
      meaning: { english: "heart, mind, spirit" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/kokoro_00.mp4",
      },
      kunyomi: { hiragana: "こころ", romaji: "kokoro" },
      onyomi: { katakana: "シン", romaji: "SHIN" },
    },
    kunyomi_ja: "こころ",
    onyomi_ja: "シン",
    radical: {
      character: "心",
      strokes: 4,
      name: { hiragana: "こころ", romaji: "kokoro" },
      meaning: { english: "heart" },
    },
    examples: [
      {
        japanese: "安心 (あんしん)",
        romaji: "anshin",
        meaning: { english: "peace of mind, relief" },
      },
      {
        japanese: "熱心 (ねっしん)",
        romaji: "nesshin",
        meaning: { english: "enthusiastic, passionate" },
      },
      {
        japanese: "心臓 (しんぞう)",
        romaji: "shinzou",
        meaning: { english: "heart (anatomical)" },
      },
    ],
    mnemonic: "The anatomical chambers and pulse beats of the loving heart.",
  },
  {
    _id: "k-food-12",
    grade: 2,
    jlpt: "N5",
    kanji: {
      character: "食",
      strokes: {
        count: 9,
        images: [
          "https://media.kanjialive.com/kanji_strokes/ta(beru)_1.svg",
          "https://media.kanjialive.com/kanji_strokes/ta(beru)_2.svg",
          "https://media.kanjialive.com/kanji_strokes/ta(beru)_3.svg",
        ],
      },
      meaning: { english: "eat, food, meal" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/ta(beru)_00.mp4",
      },
      kunyomi: { hiragana: "た.べる, く.う", romaji: "ta.beru, ku.u" },
      onyomi: { katakana: "ショク, ジキ", romaji: "SHOKU, JIKI" },
    },
    kunyomi_ja: "た.べる, く.う",
    onyomi_ja: "ショク, ジキ",
    radical: {
      character: "食",
      strokes: 9,
      name: { hiragana: "しょく", romaji: "shoku" },
      meaning: { english: "food, eat" },
    },
    examples: [
      {
        japanese: "食べる (たべる)",
        romaji: "taberu",
        meaning: { english: "to eat" },
      },
      {
        japanese: "食事 (しょくじ)",
        romaji: "shokuji",
        meaning: { english: "meal, dining" },
      },
      {
        japanese: "朝食 (ちょうしょく)",
        romaji: "choushoku",
        meaning: { english: "breakfast" },
      },
    ],
    mnemonic: "A person enjoying a bountiful covered bowl of delicious steaming food.",
  },
  {
    _id: "k-drink-13",
    grade: 2,
    jlpt: "N5",
    kanji: {
      character: "飲",
      strokes: {
        count: 12,
        images: [
          "https://media.kanjialive.com/kanji_strokes/no(mu)_1.svg",
          "https://media.kanjialive.com/kanji_strokes/no(mu)_2.svg",
        ],
      },
      meaning: { english: "drink, swallow" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/no(mu)_00.mp4",
      },
      kunyomi: { hiragana: "の.む", romaji: "no.mu" },
      onyomi: { katakana: "イン", romaji: "IN" },
    },
    kunyomi_ja: "の.む",
    onyomi_ja: "イン",
    radical: {
      character: "食",
      strokes: 9,
      name: { hiragana: "しょくへん", romaji: "shokuhen" },
      meaning: { english: "food, eat" },
    },
    examples: [
      {
        japanese: "飲む (のむ)",
        romaji: "nomu",
        meaning: { english: "to drink" },
      },
      {
        japanese: "飲み物 (のみもの)",
        romaji: "nomimono",
        meaning: { english: "beverage, drink" },
      },
      {
        japanese: "飲食店 (いんしょくてん)",
        romaji: "inshokuten",
        meaning: { english: "restaurant, eatery" },
      },
    ],
    mnemonic: "At a banquet of food, yawning with thirst and drinking deeply.",
  },
  {
    _id: "k-read-14",
    grade: 2,
    jlpt: "N5",
    kanji: {
      character: "読",
      strokes: {
        count: 14,
        images: [
          "https://media.kanjialive.com/kanji_strokes/yo(mu)_1.svg",
          "https://media.kanjialive.com/kanji_strokes/yo(mu)_2.svg",
        ],
      },
      meaning: { english: "read, chant" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/yo(mu)_00.mp4",
      },
      kunyomi: { hiragana: "よ.む", romaji: "yo.mu" },
      onyomi: { katakana: "ドク, トク", romaji: "DOKU, TOKU" },
    },
    kunyomi_ja: "よ.む",
    onyomi_ja: "ドク, トク",
    radical: {
      character: "言",
      strokes: 7,
      name: { hiragana: "ごんべん", romaji: "gonben" },
      meaning: { english: "words, speak" },
    },
    examples: [
      {
        japanese: "本を読む (ほんをよむ)",
        romaji: "hon o yomu",
        meaning: { english: "to read a book" },
      },
      {
        japanese: "読書 (どくしょ)",
        romaji: "dokusho",
        meaning: { english: "reading books" },
      },
      {
        japanese: "音読 (おんどく)",
        romaji: "ondoku",
        meaning: { english: "reading aloud" },
      },
    ],
    mnemonic: "Speaking words aloud while studying texts on parchment.",
  },
  {
    _id: "k-write-15",
    grade: 2,
    jlpt: "N5",
    kanji: {
      character: "書",
      strokes: {
        count: 10,
        images: [
          "https://media.kanjialive.com/kanji_strokes/ka(ku)_1.svg",
          "https://media.kanjialive.com/kanji_strokes/ka(ku)_2.svg",
        ],
      },
      meaning: { english: "write, book, document" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/ka(ku)_00.mp4",
      },
      kunyomi: { hiragana: "か.く", romaji: "ka.ku" },
      onyomi: { katakana: "ショ", romaji: "SHO" },
    },
    kunyomi_ja: "か.く",
    onyomi_ja: "ショ",
    radical: {
      character: "曰",
      strokes: 4,
      name: { hiragana: "ひらび", romaji: "hirabi" },
      meaning: { english: "say" },
    },
    examples: [
      {
        japanese: "手紙を書く (てがみをかく)",
        romaji: "tegami o kaku",
        meaning: { english: "to write a letter" },
      },
      {
        japanese: "図書館 (としょかん)",
        romaji: "toshokan",
        meaning: { english: "library" },
      },
      {
        japanese: "書道 (しょどう)",
        romaji: "shodou",
        meaning: { english: "calligraphy" },
      },
    ],
    mnemonic: "A hand holding a bamboo brush, inscribing characters on scroll paper.",
  },
  {
    _id: "k-sky-16",
    grade: 2,
    jlpt: "N4",
    kanji: {
      character: "空",
      strokes: {
        count: 8,
        images: [
          "https://media.kanjialive.com/kanji_strokes/sora_1.svg",
          "https://media.kanjialive.com/kanji_strokes/sora_2.svg",
        ],
      },
      meaning: { english: "sky, empty, void" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/sora_00.mp4",
      },
      kunyomi: { hiragana: "そら, あ.く, から", romaji: "sora, a.ku, kara" },
      onyomi: { katakana: "クウ", romaji: "KUU" },
    },
    kunyomi_ja: "そら, あ.く, から",
    onyomi_ja: "クウ",
    radical: {
      character: "穴",
      strokes: 5,
      name: { hiragana: "あなかんむり", romaji: "anakanmuri" },
      meaning: { english: "hole, cave" },
    },
    examples: [
      {
        japanese: "青空 (あおぞら)",
        romaji: "aozora",
        meaning: { english: "blue sky" },
      },
      {
        japanese: "空港 (くうこう)",
        romaji: "kuukou",
        meaning: { english: "airport" },
      },
      {
        japanese: "空手 (からて)",
        romaji: "karate",
        meaning: { english: "karate (empty hand)" },
      },
    ],
    mnemonic: "Looking up through an opening into the boundless, open blue sky.",
  },
  {
    _id: "k-rain-17",
    grade: 2,
    jlpt: "N5",
    kanji: {
      character: "雨",
      strokes: {
        count: 8,
        images: [
          "https://media.kanjialive.com/kanji_strokes/ame_1.svg",
          "https://media.kanjialive.com/kanji_strokes/ame_2.svg",
        ],
      },
      meaning: { english: "rain" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/ame_00.mp4",
      },
      kunyomi: { hiragana: "あめ, あま-", romaji: "ame, ama-" },
      onyomi: { katakana: "ウ", romaji: "U" },
    },
    kunyomi_ja: "あめ, あま-",
    onyomi_ja: "ウ",
    radical: {
      character: "雨",
      strokes: 8,
      name: { hiragana: "あめ", romaji: "ame" },
      meaning: { english: "rain" },
    },
    examples: [
      {
        japanese: "雨が降る (あめがふる)",
        romaji: "ame ga furu",
        meaning: { english: "it rains" },
      },
      {
        japanese: "大雨 (おおあめ)",
        romaji: "ooame",
        meaning: { english: "heavy rain" },
      },
      {
        japanese: "雨傘 (あまがさ)",
        romaji: "amagasa",
        meaning: { english: "rain umbrella" },
      },
    ],
    mnemonic: "Raindrops falling steadily from heavy sky clouds onto a window pane.",
  },

  // GRADE 3 (JLPT N4/N3)
  {
    _id: "k-journey-18",
    grade: 3,
    jlpt: "N4",
    kanji: {
      character: "旅",
      strokes: {
        count: 10,
        images: [
          "https://media.kanjialive.com/kanji_strokes/tabi_1.svg",
          "https://media.kanjialive.com/kanji_strokes/tabi_2.svg",
        ],
      },
      meaning: { english: "trip, travel, journey" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/tabi_00.mp4",
      },
      kunyomi: { hiragana: "たび", romaji: "tabi" },
      onyomi: { katakana: "リョ", romaji: "RYO" },
    },
    kunyomi_ja: "たび",
    onyomi_ja: "リョ",
    radical: {
      character: "方",
      strokes: 4,
      name: { hiragana: "ほうへん", romaji: "houhen" },
      meaning: { english: "direction, flag" },
    },
    examples: [
      {
        japanese: "旅行 (りょこう)",
        romaji: "ryokou",
        meaning: { english: "travel, trip" },
      },
      {
        japanese: "一人旅 (ひとりたび)",
        romaji: "hitoritabi",
        meaning: { english: "solo travel" },
      },
      {
        japanese: "旅館 (りょかん)",
        romaji: "ryokan",
        meaning: { english: "traditional Japanese inn" },
      },
    ],
    mnemonic: "Carrying a traveler's banner, marching across uncharted lands.",
  },
  {
    _id: "k-sea-19",
    grade: 2,
    jlpt: "N4",
    kanji: {
      character: "海",
      strokes: {
        count: 9,
        images: [
          "https://media.kanjialive.com/kanji_strokes/umi_1.svg",
          "https://media.kanjialive.com/kanji_strokes/umi_2.svg",
        ],
      },
      meaning: { english: "sea, ocean" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/umi_00.mp4",
      },
      kunyomi: { hiragana: "うみ", romaji: "umi" },
      onyomi: { katakana: "カイ", romaji: "KAI" },
    },
    kunyomi_ja: "うみ",
    onyomi_ja: "カイ",
    radical: {
      character: "水",
      strokes: 3,
      name: { hiragana: "さんずい", romaji: "sanzui" },
      meaning: { english: "water" },
    },
    examples: [
      {
        japanese: "日本海 (にほんかい)",
        romaji: "nihonkai",
        meaning: { english: "Sea of Japan" },
      },
      {
        japanese: "海外 (かいがい)",
        romaji: "kaigai",
        meaning: { english: "overseas, abroad" },
      },
      {
        japanese: "海岸 (かいがん)",
        romaji: "kaigan",
        meaning: { english: "coast, seashore" },
      },
    ],
    mnemonic: "Water drops stretching outward into the vast mother sea.",
  },
  {
    _id: "k-light-20",
    grade: 2,
    jlpt: "N4",
    kanji: {
      character: "光",
      strokes: {
        count: 6,
        images: [
          "https://media.kanjialive.com/kanji_strokes/hikari_1.svg",
          "https://media.kanjialive.com/kanji_strokes/hikari_2.svg",
        ],
      },
      meaning: { english: "light, ray, shine" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/hikari_00.mp4",
      },
      kunyomi: { hiragana: "ひかり, ひか.る", romaji: "hikari, hika.ru" },
      onyomi: { katakana: "コウ", romaji: "KOU" },
    },
    kunyomi_ja: "ひかり, ひか.る",
    onyomi_ja: "コウ",
    radical: {
      character: "儿",
      strokes: 2,
      name: { hiragana: "ひとあし", romaji: "hitoashi" },
      meaning: { english: "legs" },
    },
    examples: [
      {
        japanese: "日光 (にっこう)",
        romaji: "nikkou",
        meaning: { english: "sunlight, Nikko city" },
      },
      {
        japanese: "観光 (かんこう)",
        romaji: "kankou",
        meaning: { english: "sightseeing, tourism" },
      },
      {
        japanese: "月光 (げっこう)",
        romaji: "gekkou",
        meaning: { english: "moonlight" },
      },
    ],
    mnemonic: "A torch radiating warm golden light from high above.",
  },

  // GRADE 4 (JLPT N3)
  {
    _id: "k-dream-21",
    grade: 4,
    jlpt: "N3",
    kanji: {
      character: "夢",
      strokes: {
        count: 13,
        images: [
          "https://media.kanjialive.com/kanji_strokes/yume_1.svg",
          "https://media.kanjialive.com/kanji_strokes/yume_2.svg",
        ],
      },
      meaning: { english: "dream, vision" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/yume_00.mp4",
      },
      kunyomi: { hiragana: "ゆめ", romaji: "yume" },
      onyomi: { katakana: "ム", romaji: "MU" },
    },
    kunyomi_ja: "ゆめ",
    onyomi_ja: "ム",
    radical: {
      character: "夕",
      strokes: 3,
      name: { hiragana: "ゆうべ", romaji: "yuube" },
      meaning: { english: "evening" },
    },
    examples: [
      {
        japanese: "夢を見る (ゆめをみる)",
        romaji: "yume o miru",
        meaning: { english: "to have a dream" },
      },
      {
        japanese: "悪夢 (あくむ)",
        romaji: "akumu",
        meaning: { english: "nightmare" },
      },
      {
        japanese: "夢中 (むちゅう)",
        romaji: "muchuu",
        meaning: { english: "absorbed, entranced" },
      },
    ],
    mnemonic: "In the evening grass, eyes drift shut into a magical world of dreams.",
  },
  {
    _id: "k-love-22",
    grade: 4,
    jlpt: "N3",
    kanji: {
      character: "愛",
      strokes: {
        count: 13,
        images: [
          "https://media.kanjialive.com/kanji_strokes/ai_1.svg",
          "https://media.kanjialive.com/kanji_strokes/ai_2.svg",
        ],
      },
      meaning: { english: "love, affection" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/ai_00.mp4",
      },
      kunyomi: { hiragana: "いと.しい", romaji: "ito.shii" },
      onyomi: { katakana: "アイ", romaji: "AI" },
    },
    kunyomi_ja: "いと.しい",
    onyomi_ja: "アイ",
    radical: {
      character: "心",
      strokes: 4,
      name: { hiragana: "こころ", romaji: "kokoro" },
      meaning: { english: "heart" },
    },
    examples: [
      {
        japanese: "愛する (あいする)",
        romaji: "aisuru",
        meaning: { english: "to love" },
      },
      {
        japanese: "愛情 (あいじょう)",
        romaji: "aijou",
        meaning: { english: "affection, love" },
      },
      {
        japanese: "愛犬 (あいけん)",
        romaji: "aiken",
        meaning: { english: "beloved pet dog" },
      },
    ],
    mnemonic: "A heart cradled delicately between hands, offering deep, sincere affection.",
  },

  // GRADE 5 (JLPT N2/N1)
  {
    _id: "k-spirit-23",
    grade: 5,
    jlpt: "N2",
    kanji: {
      character: "魂",
      strokes: {
        count: 14,
        images: [
          "https://media.kanjialive.com/kanji_strokes/tamashii_1.svg",
          "https://media.kanjialive.com/kanji_strokes/tamashii_2.svg",
        ],
      },
      meaning: { english: "soul, spirit" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/tamashii_00.mp4",
      },
      kunyomi: { hiragana: "たましい, たま", romaji: "tamashii, tama" },
      onyomi: { katakana: "コン", romaji: "KON" },
    },
    kunyomi_ja: "たましい, たま",
    onyomi_ja: "コン",
    radical: {
      character: "鬼",
      strokes: 10,
      name: { hiragana: "おに", romaji: "oni" },
      meaning: { english: "ghost, demon" },
    },
    examples: [
      {
        japanese: "魂 (たましい)",
        romaji: "tamashii",
        meaning: { english: "soul, spirit" },
      },
      {
        japanese: "闘魂 (とうこん)",
        romaji: "toukon",
        meaning: { english: "fighting spirit" },
      },
    ],
    mnemonic: "The ethereal ghost vapor that whispers the eternal spirit of life.",
  },
  {
    _id: "k-cherry-24",
    grade: 4,
    jlpt: "N3",
    kanji: {
      character: "桜",
      strokes: {
        count: 10,
        images: [
          "https://media.kanjialive.com/kanji_strokes/sakura_1.svg",
          "https://media.kanjialive.com/kanji_strokes/sakura_2.svg",
        ],
      },
      meaning: { english: "cherry blossom, sakura" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/sakura_00.mp4",
      },
      kunyomi: { hiragana: "さくら", romaji: "sakura" },
      onyomi: { katakana: "オウ", romaji: "OU" },
    },
    kunyomi_ja: "さくら",
    onyomi_ja: "オウ",
    radical: {
      character: "木",
      strokes: 4,
      name: { hiragana: "きへん", romaji: "kihen" },
      meaning: { english: "tree" },
    },
    examples: [
      {
        japanese: "桜 (さくら)",
        romaji: "sakura",
        meaning: { english: "cherry blossom" },
      },
      {
        japanese: "桜前線 (さくらぜんせん)",
        romaji: "sakurazensen",
        meaning: { english: "cherry blossom front" },
      },
    ],
    mnemonic: "A blossoming tree adorned with delicate pink floral necklaces in spring.",
  },
  {
    _id: "k-sword-25",
    grade: 2,
    jlpt: "N4",
    kanji: {
      character: "刀",
      strokes: {
        count: 2,
        images: [
          "https://media.kanjialive.com/kanji_strokes/katana_1.svg",
          "https://media.kanjialive.com/kanji_strokes/katana_2.svg",
        ],
      },
      meaning: { english: "sword, katana, blade" },
      video: {
        mp4: "https://media.kanjialive.com/kanji_animations/kanji_mp4/katana_00.mp4",
      },
      kunyomi: { hiragana: "かたな", romaji: "katana" },
      onyomi: { katakana: "トウ", romaji: "TOU" },
    },
    kunyomi_ja: "かたな",
    onyomi_ja: "トウ",
    radical: {
      character: "刀",
      strokes: 2,
      name: { hiragana: "かたな", romaji: "katana" },
      meaning: { english: "sword" },
    },
    examples: [
      {
        japanese: "日本刀 (にほんとう)",
        romaji: "nihontou",
        meaning: { english: "Japanese katana" },
      },
      {
        japanese: "木刀 (ぼくとう)",
        romaji: "bokutou",
        meaning: { english: "wooden practice sword" },
      },
    ],
    mnemonic: "The curved, razor-sharp edge of a traditional samurai blade.",
  },
];
