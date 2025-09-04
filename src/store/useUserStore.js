import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useScoreStore } from "./useScoreStore";

export const useUserStore = create(
  persist(
    (set, get) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),

      user: null,
      isAuth: false,
      hasAttempt: false,
      leaderboard: [],

      register: (name, email) => {
        set({ user: { name, email }, isAuth: true });
        useScoreStore.getState().setUser({ name, email });
      },

      login: (name, email) => {
        set({ user: { name, email }, isAuth: true });
        useScoreStore.getState().setUser({ name, email });
      },

      logout: () => {
        set({ user: null, isAuth: false, hasAttempt: false });
        useScoreStore.getState().resetScore();
        useScoreStore.getState().setUser(null);
      },

      markAttempt: () => set({ hasAttempt: true }),

      pushLeaderboard: ({ name, email, score }) => {
        const entry = {
          name,
          email,
          score,
          date: new Date().toLocaleString(),
        };
        const list = get().leaderboard;
        const without = list.filter((x) => x.email !== email);
        set({ leaderboard: [...without, entry] });
      },
    }),
    { name: "lab-safety-user" }
  )
);
