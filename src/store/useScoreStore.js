import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useScoreStore = create(
  persist(
    (set) => ({
      score: 0,
      setScore: (score) => set({ score }),
      addScore: (delta) => set((s) => ({ score: s.score + delta })),
      resetScore: () => set({ score: 0 }),
    }),
    {
      name: "lab-safety-score", 
    }
  )
);