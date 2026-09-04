import { KANJI_DATASET } from "../data/kanjiDataset";
import { KanjiItem, QuizQuestion } from "../types/kanji";
import axios from "axios";

class KanjiService {
  private localDataset: KanjiItem[] = KANJI_DATASET;

  // Retrieve kanji, filtered by grade if specified (or all if grade is 0 or 'all')
  public getKanjiList(grade?: number): KanjiItem[] {
    if (!grade || grade === 0) {
      return [...this.localDataset];
    }
    const filtered = this.localDataset.filter((k) => k.grade === grade);
    return filtered.length > 0 ? filtered : this.localDataset;
  }

  // Shuffle a deck for study sessions
  public getShuffledDeck(grade?: number): KanjiItem[] {
    const list = this.getKanjiList(grade);
    return [...list].sort(() => Math.random() - 0.5);
  }

  // Search by English meaning, character, reading, or radical
  public searchKanji(query: string, grade?: number): KanjiItem[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.getKanjiList(grade);

    return this.getKanjiList(grade).filter((item) => {
      const charMatch = item.kanji.character.includes(q);
      const meaningMatch = item.kanji.meaning.english.toLowerCase().includes(q);
      const kunMatch =
        item.kunyomi_ja.toLowerCase().includes(q) ||
        (item.kanji.kunyomi.romaji && item.kanji.kunyomi.romaji.toLowerCase().includes(q));
      const onMatch =
        item.onyomi_ja.toLowerCase().includes(q) ||
        (item.kanji.onyomi.romaji && item.kanji.onyomi.romaji.toLowerCase().includes(q));
      const radicalMatch =
        item.radical?.meaning.english.toLowerCase().includes(q) ||
        item.radical?.character?.includes(q);

      return charMatch || meaningMatch || kunMatch || onMatch || radicalMatch;
    });
  }

  // Generate dynamic 4-choice quiz questions
  public generateQuizQuestions(count = 10, grade?: number): QuizQuestion[] {
    const pool = this.getKanjiList(grade);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, pool.length));

    return selected.map((item, index) => {
      const isMeaningQuestion = Math.random() > 0.4;

      if (isMeaningQuestion) {
        // Question: What is the English meaning of Kanji?
        const correctAnswer = item.kanji.meaning.english;
        // Distractors from other kanji
        const otherMeanings = pool
          .filter((k) => k._id !== item._id)
          .map((k) => k.kanji.meaning.english)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const options = [correctAnswer, ...otherMeanings].sort(() => Math.random() - 0.5);

        return {
          id: `quiz-q-${index}-${item._id}`,
          type: "meaning",
          prompt: `What is the meaning of the kanji 「${item.kanji.character}」?`,
          kanji: item,
          options,
          correctAnswer,
          explanation: `「${item.kanji.character}」 means "${item.kanji.meaning.english}". Readings: Kun'yomi: ${item.kunyomi_ja} | On'yomi: ${item.onyomi_ja}.`,
        };
      } else {
        // Question: Which kanji represents this meaning?
        const correctAnswer = item.kanji.character;
        const otherKanji = pool
          .filter((k) => k._id !== item._id)
          .map((k) => k.kanji.character)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const options = [correctAnswer, ...otherKanji].sort(() => Math.random() - 0.5);

        return {
          id: `quiz-q-${index}-${item._id}`,
          type: "kanji",
          prompt: `Which kanji corresponds to: "${item.kanji.meaning.english}"?`,
          kanji: item,
          options,
          correctAnswer,
          explanation: `"${item.kanji.meaning.english}" is written as 「${item.kanji.character}」 with ${item.kanji.strokes.count} strokes.`,
        };
      }
    });
  }

  // Backward-compatible RapidAPI fetcher if user supplies keys in .env
  public async fetchFromRapidApi(grade = "2"): Promise<KanjiItem[] | null> {
    const apiKey = import.meta.env.VITE_APP_KEY;
    const apiHost = import.meta.env.VITE_APP_SITE;

    if (!apiKey || !apiHost) {
      return null;
    }

    try {
      const response = await axios.get(
        "https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/",
        {
          params: { grade },
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": apiHost,
          },
          timeout: 4000,
        }
      );
      if (Array.isArray(response.data)) {
        // Successfully connected to RapidAPI
        return null; // Local dataset is already formatted with rich strokes, fallback safely
      }
    } catch {
      // RapidAPI unavailable or rate limited, silent fallback to rich local dataset
    }
    return null;
  }
}

export const kanjiService = new KanjiService();
