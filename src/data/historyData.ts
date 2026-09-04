import { HistorySection } from "../types/kanji";

export const HISTORY_DATA: HistorySection[] = [
  {
    id: "curiosities-intro",
    title: "Discover Curiosities & Secrets of Kanji",
    era: "Introduction",
    tagline: "Unlocking thousands of years of visual language",
    content: `Hi! Welcome to the deeper exploration of Kanji. Their historical evolution is one of the most fascinating linguistic journeys in human history! In this section, you will uncover where kanji characters originated, why characters have multiple pronunciations (On'yomi and Kun'yomi), and effective mental strategies to master them without getting overwhelmed.`,
    bullets: [
      "Over 2,000 Joyo Kanji are used in everyday Japanese society.",
      "Each character represents an idea, image, or concept, not just a phonetic sound.",
      "Understanding the historical roots makes memorization intuitive rather than mechanical.",
    ],
    image: "https://i.ibb.co/D5CM02g/kanji-1.jpg",
  },
  {
    id: "origins-hanzi",
    title: "The Ancient Origin of Kanji (漢字)",
    era: "c. 5th Century AD — Asuka Period",
    tagline: "How Chinese hànzì crossed seas and shaped Japan",
    content: `Kanji, as we know it today, has its profound roots in ancient China, where it is referred to as hànzì (汉字). These pictographic and ideographic characters found their way to Japan through the Korean peninsula, primarily via classical Buddhist and philosophical religious texts during the 4th to 6th centuries.

Japan, which possessed a rich spoken language (Yamato kotoba) but no indigenous writing system at the time, adopted Chinese characters to transcribe their language. The original Chinese meanings were mapped directly onto Japanese concepts. For example, the character 食 represented "meal" or "food."

Despite adopting Chinese characters, Japan didn't morph into a Chinese-speaking nation. Instead, scholars engineered a genius dual system: each kanji was given both a Chinese-derived pronunciation (On'yomi) and an indigenous Japanese pronunciation (Kun'yomi). The challenge lay in adapting complex Chinese tones into the simpler, melodic Japanese phonetic syllables, resulting in approximate sonic matches that endure to this day.`,
    bullets: [
      "Hànzì (China) became Kanji (Japan) and Hanja (Korea).",
      "Yamato Kotoba was paired with Chinese logographs.",
      "Radicals (bushu) were organized to classify characters by semantic meaning.",
    ],
    image: "https://i.ibb.co/xHzBHnf/kanji-2.jpg",
  },
  {
    id: "onyomi-vs-kunyomi",
    title: "Demystifying On'yomi & Kun'yomi Readings",
    era: "Linguistic Structure",
    tagline: "The dual soul of every Japanese character",
    content: `Learning kanji readings can feel intimidating because single characters frequently carry three, four, or even more readings. However, once you recognize the pattern, it transforms into an intuitive puzzle:

1. On'yomi (音読み — Sound Reading):
Derived from ancient Chinese pronunciations. These are usually used when kanji appear in compound words (Jukugo, 熟語), such as 日本 (Nihon / Nichi-hon) or 水泳 (Suiei).

2. Kun'yomi (訓読み — Meaning Reading):
The native, indigenous Japanese word attached to the character's meaning. These typically appear when a kanji stands alone or is followed by hiragana okurigana, such as 水 (mizu) or 食べる (taberu).`,
    bullets: [
      "Compound words (2+ kanji together) → usually use On'yomi.",
      "Standalone kanji with hiragana tails → usually use Kun'yomi.",
      "Exceptions exist, but following this 80/20 heuristic accelerates fluency dramatically.",
    ],
    image: "https://i.ibb.co/mG5rSkD/kangi-3.jpg",
  },
  {
    id: "learning-strategies",
    title: "Mastery Strategies: How to Learn Without Burnout",
    era: "Modern Study Science",
    tagline: "Context over brute-force memorization",
    content: `Rote memorization of isolated readings is the number one cause of student fatigue. Here is the modern, scientifically proven approach to mastering kanji:

1. Focus on One Core Reading First:
Associating the primary, most common reading with the core meaning builds a solid anchor in your memory. Trust that nuanced secondary readings will fall into place naturally through context.

2. Prioritize High-Frequency Vocabulary:
Over 85% of real-world reading revolves around high-frequency vocabulary. Learning useful words (like 空港 for airport, or 朝食 for breakfast) embeds both the reading and practical usage effortlessly.

3. Harness Spaced Repetition (SRS):
Human memory decays exponentially unless reinforced at calculated intervals. Using tools like this Kanji Guesser app, review vaults, and active flashcards ensures characters transition into permanent long-term memory.

Be patient and celebrate small milestones. Every character you recognize unlocks another door into Japanese literature, culture, and conversation!`,
    bullets: [
      "Learn kanji in context, through vocabulary rather than isolated lists.",
      "Practice stroke order: the kinesthetic memory of drawing strengthens retention.",
      "Review regularly using the Review Vault to reinforce weak characters.",
    ],
    image: "https://i.ibb.co/zJcdqK7/kanjiguesser.jpg",
  },
];
