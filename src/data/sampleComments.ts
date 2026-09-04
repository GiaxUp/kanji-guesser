import { FeedbackComment } from "../types/kanji";

export const INITIAL_COMMENTS: FeedbackComment[] = [
  {
    id: "fb-1",
    author: "Kenji M.",
    avatarSeed: "kenji",
    category: "feedback",
    text: "The stroke order animations and pronunciation audio make remembering the radicals so much easier! Love the clean interface.",
    upvotes: 14,
    createdAt: "2 days ago",
  },
  {
    id: "fb-2",
    author: "Elena Rossi",
    avatarSeed: "elena",
    category: "suggestion",
    text: "Would love to see a writing canvas where I can physically draw the strokes with mouse/touch! Keep up the amazing work!",
    upvotes: 21,
    createdAt: "4 days ago",
  },
  {
    id: "fb-3",
    author: "Marco D.",
    avatarSeed: "marco",
    category: "feedback",
    text: "The comparison between On'yomi and Kun'yomi in the history section finally made it click for me. Grazie mille!",
    upvotes: 9,
    createdAt: "1 week ago",
  },
];
