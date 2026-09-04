export interface KanjiMeaning {
  english: string;
}

export interface KanjiStrokes {
  count: number;
  images: string[];
}

export interface KanjiVideo {
  mp4: string;
  webm?: string;
}

export interface KanjiReading {
  hiragana?: string;
  katakana?: string;
  romaji?: string;
}

export interface KanjiSub {
  character: string;
  strokes: KanjiStrokes;
  meaning: KanjiMeaning;
  video?: KanjiVideo;
  kunyomi: {
    hiragana: string;
    romaji?: string;
  };
  onyomi: {
    katakana: string;
    romaji?: string;
  };
}

export interface Example {
  japanese: string;
  meaning: KanjiMeaning;
  audio?: {
    mp3: string;
    opus?: string;
  };
  romaji?: string;
}

export interface Radical {
  character?: string;
  image?: string;
  strokes?: number;
  name: {
    hiragana: string;
    romaji?: string;
  };
  meaning: KanjiMeaning;
}

export interface KanjiItem {
  _id: string;
  grade: number; // 1 to 5
  jlpt?: string; // N5, N4, N3, N2, N1
  kanji: KanjiSub;
  kunyomi_ja: string;
  onyomi_ja: string;
  radical?: Radical;
  examples: Example[];
  mnemonic?: string;
}

export interface ReviewItem extends KanjiItem {
  savedAt: number;
  mastered: boolean;
  notes?: string;
}

export interface QuizQuestion {
  id: string;
  type: "meaning" | "reading" | "kanji";
  prompt: string;
  kanji: KanjiItem;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface FeedbackComment {
  id: string;
  author: string;
  avatarSeed: string;
  category: "feedback" | "suggestion" | "bug";
  text: string;
  upvotes: number;
  createdAt: string;
}

export interface HistorySection {
  id: string;
  title: string;
  era?: string;
  tagline?: string;
  content: string;
  bullets?: string[];
  image?: string;
}
