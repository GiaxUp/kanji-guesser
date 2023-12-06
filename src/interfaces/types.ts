// Starting kanji informations
// recovered from the first fetch in KanjiCard
export interface KanjiObject {
  kanji: {
    character: string;
    stroke: number;
  };
  radical: {
    character: string;
  };
}

// Detailed informations recovered
// from the second fetch in KanjiCard
export interface KanjiAdditionalInfo {
  kanji: {
    character: string;
    strokes: {
      count: number;
    };
    meaning: {
      english: string;
    };
  };
  examples: {
    meaning: {
      english: string;
    };
    japanese: string;
  }[];
}

// Informations needed to render the
// components in the Review section,
// saved and cleared for readability

// Main interface
export interface Kanji {
  kanji: KanjiSub;
  examples: Example[];
  grade: string;
  kunyomi_ja: string;
  onyomi_ja: string;
  radical?: Radical; // Some kanji don't have a radical, so let's make this optional
  _id: string;
}

// Sub interfaces
export interface KanjiSub {
  character: string;
  strokes: KanjiStrokes;
  meaning: KanjiMeaning;
  video: KanjiVideo;
  kunyomi: KanjiKunyomi;
  onyomi: KanjiOnyomi;
}

export interface KanjiStrokes {
  count: number;
  images: string[];
}

export interface KanjiMeaning {
  english: string;
}

export interface KanjiVideo {
  mp4: string;
}

export interface KanjiKunyomi {
  hiragana: string;
}

export interface KanjiOnyomi {
  katakana: string;
}

export interface Example {
  meaning: KanjiMeaning;
  japanese: string;
  audio: {
    mp3: string;
  };
}

export interface Radical {
  image: string;
  name: {
    hiragana: string;
  };
  meaning: KanjiMeaning;
}

export interface Comment {
  id: number;
  text: string;
}
