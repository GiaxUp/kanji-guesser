# Kanji Guesser v2.0 漢字マスター
### Modern Japanese Kanji Learning Platform
Built with **React 18, TypeScript, Vite, Web Audio API, Web Speech API, and Bootstrap 5**.

---

## 🌟 Key Features

- **3D Guessing Cards**: Interactive flip cards with stroke counts, radical badges, mnemonic aids, and instant answer reveals.
- **Native Japanese Speech & Audio**: Authentic pronunciation for kanji characters, Kun'yomi, On'yomi, and vocabulary sentences via native speech synthesis and CDN audio links.
- **Calligraphy & Stroke Drawing Canvas**: Practice writing kanji directly on an interactive HTML5 canvas with ghost guides, stroke counts, undo, and brush physics.
- **JLPT Quiz Challenge**: Test knowledge with 4-choice timed questions on character meanings and readings, featuring streak multipliers and celebratory confetti.
- **Review Vault**: Permanent `localStorage`-backed repository for difficult characters with animated stroke MP4 videos, search, and mastery tracking.
- **Kanji Explorer & Dictionary**: Search over 150+ kanji characters across grades by English keyword, Romaji, or Japanese readings.
- **Cultural Chronicles & History**: Comprehensive educational guides on ancient Chinese hànzì origins, On'yomi vs Kun'yomi distinctions, and memory study science.
- **Community Feedback Board**: Persistent suggestions, bug reporting, and feedback board with upvotes and categories.
- **Neo-Tokyo Ink Design System**: Premium dark aesthetic with Torii vermilion (`#e63946`), sakura pink, imperial gold accents, and Japanese calligraphy typography.

---

## 📖 Application Sections & Overview

### 🏠 Home Page
- **Kanji of the Day**: Highlights a featured character each day with quick pronunciation audio, stroke count, and readings.
- **Live Progress Stats**: Real-time counter showing your current correct streak, total characters stored in your Review Vault, and mastered kanji count.
- **Study Mode Hub**: Direct access cards to launch Guessing Cards, Writing Canvas, Speed Quiz, Review Vault, Explorer, or History.

### 🎴 3D Guessing Cards (`/learn?tab=card`)
- **Interactive 3D Flip Physics**: Click on the card or press <kbd>Space</kbd> to smoothly rotate the card 180 degrees.
- **Front Face**: Displays the kanji character in authentic calligraphy font (`Noto Serif JP`), its radical breakdown, stroke count, difficulty grade, and audio speaker button.
- **Back Face**: Unveils the English translation, Kun'yomi (訓読み) reading, On'yomi (音読み) reading, and three real-world vocabulary sentences with pronunciation buttons.
- **Quick Action Triggers**:
  - *"I knew this!"*: Increments your consecutive correct streak with success chimes.
  - *"Save for Review"*: Adds the character to your permanent Review Vault with a notification badge.
  - Keyboard navigation supported (<kbd>Space</kbd> to flip, <kbd>→</kbd> for next card, <kbd>←</kbd> for previous).

### ✍️ Interactive Calligraphy & Stroke Practice Canvas (`/practice`)
- **HTML5 Writing Surface**: Practice drawing kanji strokes with your mouse, trackpad, or touch screen.
- **Ghost Calligraphy Guide**: Toggleable faint character background to trace accurate stroke shapes and proportions.
- **Stroke Accuracy Tracker**: Automatically counts each drawn stroke and triggers a celebratory sound effect and confetti when reaching the exact required stroke count.
- **Controls**: Undo last stroke, clear canvas, or switch characters via the top kanji carousel strip.

### 🏆 Multiple Choice JLPT Quiz Challenge (`/learn?tab=quiz`)
- **Dynamic Question Generator**: Generates 4-choice questions testing both English meaning recall and character recognition.
- **Instant Visual Feedback**: Correct answers glow green with harmonious chimes; incorrect answers highlight the mistake with full explanations.
- **Streak & Performance Multipliers**: Tracks your ongoing streak, calculates overall score percentages, and celebrates high scores with confetti bursts.

### 🗃️ Review Vault & Mastery Tracker (`/review`)
- **Permanent Browser Storage**: Characters saved during study sessions persist in `localStorage` across visits and navigation.
- **Animated Stroke Videos**: Watch smooth MP4 videos of each kanji being drawn stroke by stroke.
- **Mastery Toggle**: Mark characters as *"Mastered"* or *"In Progress"* to organize your spaced repetition workflow.
- **Search & Filter Bar**: Search saved cards by keyword, or filter by mastery status and JLPT difficulty grade.

### 🔍 Kanji Explorer & Catalog (`/dictionary`)
- **Full Library Search**: Search through the 150+ kanji database by English keyword, Romaji pronunciation, Japanese reading, or character glyph.
- **Grade Filtering**: Instantly isolate characters from Grade 1 (N5 Foundations) through Grade 5 (Advanced).
- **Detail Inspection Modal**: Click any card in the grid to open a comprehensive inspection dialog featuring stroke videos, radicals, mnemonics, and vocabulary.

### 📜 Cultural History & Community Feedback (`/history`)
- **Ancient Origins**: In-depth chronicle detailing how Chinese hànzì entered Japan via classical texts and the Asuka period.
- **Demystifying On'yomi & Kun'yomi**: Structural guide explaining when to apply Chinese-derived readings vs indigenous Japanese readings.
- **Spaced Repetition & Study Science**: Evidence-based strategies for mastering kanji without cognitive overload.
- **Community Feedback Board**: Fully functional feedback board supporting categories (Feedback, Suggestions, Bug Reports), author handles, and upvoting.

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/GiaxUp/kanji-guesser.git
cd kanji-guesser
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173`. Zero configuration or external API keys are required to start studying immediately.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Architecture

```
src/
  ├── components/
  │   ├── common/         # Navbar, Footer, AudioButton, Badge
  │   ├── kanji/          # KanjiCard (3D flip), StrokeCanvas, StrokeOrderViewer, KanjiModal
  │   ├── quiz/           # QuizMode (4-choice challenge with streak scoring)
  │   ├── review/         # ReviewCardItem, ReviewFilterBar
  │   └── comments/       # FeedbackBoard (persistent community suggestions)
  ├── context/            # KanjiContext (study state, streaks, sound toggle, review vault)
  ├── data/               # kanjiDataset (grades 1-5), historyData, sampleComments
  ├── services/           # audioService (Web Audio + SpeechSynthesis), kanjiService
  ├── styles/             # index.css (Neo-Tokyo Ink design system tokens & glassmorphism)
  ├── types/              # kanji.ts (strict TypeScript definitions)
  └── pages/              # Home, Learn, Practice, Review, Dictionary, History
```

---

## 💡 Keyboard Shortcuts
- <kbd>Space</kbd>: Flip the active guessing card.
- <kbd>→</kbd> (Right Arrow): Move to next card.
- <kbd>←</kbd> (Left Arrow): Move to previous card.

---

## 📜 Public API & Acknowledgments
- Inspired by and compatible with the [Kanji Alive API](https://app.kanjialive.com/api/docs).
- Media, stroke order animations, and audio references provided by Kanji Alive open-source resources.
