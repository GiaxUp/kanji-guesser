import React, { createContext, useContext, useState, useEffect } from "react";
import { KanjiItem, ReviewItem } from "../types/kanji";
import { audioService } from "../services/audioService";

interface KanjiContextType {
  savedKanji: ReviewItem[];
  saveKanjiForReview: (kanji: KanjiItem) => boolean;
  removeSavedKanji: (id: string) => void;
  toggleMastered: (id: string) => void;
  clearAllSaved: () => void;
  selectedGrade: number;
  setSelectedGrade: (grade: number) => void;
  streak: number;
  incrementStreak: () => void;
  resetStreak: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  inspectKanji: KanjiItem | null;
  setInspectKanji: (item: KanjiItem | null) => void;
}

const KanjiContext = createContext<KanjiContextType | undefined>(undefined);

export const KanjiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved kanji from localStorage ("savedInfo" key maintained from v1.0)
  const [savedKanji, setSavedKanji] = useState<ReviewItem[]>(() => {
    try {
      const stored = localStorage.getItem("savedInfo");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Normalize items into ReviewItem format
          return parsed.map((item: any) => ({
            ...item,
            _id: item._id || item.kanji?.character || `k-${Date.now()}-${Math.random()}`,
            savedAt: item.savedAt || Date.now(),
            mastered: item.mastered ?? false,
          }));
        }
      }
    } catch {
      // Storage parsing fallback
    }
    return [];
  });

  // Selected Grade (1 to 5, or 0 for all)
  const [selectedGrade, setSelectedGrade] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("selectedGrade");
      return stored ? parseInt(stored, 10) : 2; // Default to Grade 2 as in original app
    } catch {
      return 2;
    }
  });

  // Streak counter
  const [streak, setStreak] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("kanjiStreak");
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Sound effects toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("kanjiSoundEnabled");
      return stored !== null ? stored === "true" : true;
    } catch {
      return true;
    }
  });

  // Modal inspection target
  const [inspectKanji, setInspectKanji] = useState<KanjiItem | null>(null);

  // Sync saved kanji to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("savedInfo", JSON.stringify(savedKanji));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, [savedKanji]);

  // Sync selectedGrade
  useEffect(() => {
    try {
      localStorage.setItem("selectedGrade", selectedGrade.toString());
    } catch {
      // Ignore
    }
  }, [selectedGrade]);

  // Sync streak
  useEffect(() => {
    try {
      localStorage.setItem("kanjiStreak", streak.toString());
    } catch {
      // Ignore
    }
  }, [streak]);

  // Sync sound
  useEffect(() => {
    try {
      localStorage.setItem("kanjiSoundEnabled", soundEnabled.toString());
      audioService.setSoundEffectsEnabled(soundEnabled);
    } catch {
      // Ignore
    }
  }, [soundEnabled]);

  const saveKanjiForReview = (kanji: KanjiItem): boolean => {
    const existingIndex = savedKanji.findIndex(
      (item) => item.kanji.character === kanji.kanji.character
    );
    if (existingIndex >= 0) {
      return false; // Already saved
    }

    const reviewItem: ReviewItem = {
      ...kanji,
      savedAt: Date.now(),
      mastered: false,
    };
    setSavedKanji((prev) => [reviewItem, ...prev]);
    return true;
  };

  const removeSavedKanji = (id: string) => {
    setSavedKanji((prev) =>
      prev.filter((item) => item._id !== id && item.kanji.character !== id)
    );
  };

  const toggleMastered = (id: string) => {
    setSavedKanji((prev) =>
      prev.map((item) => {
        if (item._id === id || item.kanji.character === id) {
          return { ...item, mastered: !item.mastered };
        }
        return item;
      })
    );
  };

  const clearAllSaved = () => {
    setSavedKanji([]);
  };

  const incrementStreak = () => {
    setStreak((prev) => prev + 1);
  };

  const resetStreak = () => {
    setStreak(0);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <KanjiContext.Provider
      value={{
        savedKanji,
        saveKanjiForReview,
        removeSavedKanji,
        toggleMastered,
        clearAllSaved,
        selectedGrade,
        setSelectedGrade,
        streak,
        incrementStreak,
        resetStreak,
        soundEnabled,
        toggleSound,
        inspectKanji,
        setInspectKanji,
      }}>
      {children}
    </KanjiContext.Provider>
  );
};

export const useKanji = () => {
  const context = useContext(KanjiContext);
  if (!context) {
    throw new Error("useKanji must be used within a KanjiProvider");
  }
  return context;
};
