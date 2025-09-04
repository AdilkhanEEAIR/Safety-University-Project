import { create } from "zustand";

export const useScoreStore = create((set, get) => ({
  score: 0,

  setScore: (score) => set({ score }),

  addScore: (delta) => {
    set((s) => ({ score: s.score + delta }));
    const { user } = get();
    if (user) saveScoreForUser(user.email, get().score);
  },

  resetScore: () => set({ score: 0 }),

  user: null,
  setUser: (user) => {
    set({ user });
    if (user) {
      const userScore = loadScoreForUser(user.email);
      set({ score: userScore });
    }
  },
}));

function saveScoreForUser(email, score) {
  const stored = JSON.parse(localStorage.getItem("lab-safety-score")) || {};
  stored[email] = score;
  localStorage.setItem("lab-safety-score", JSON.stringify(stored));
}

function loadScoreForUser(email) {
  const stored = JSON.parse(localStorage.getItem("lab-safety-score")) || {};
  return stored[email] || 0;
}