import { create } from "zustand";

export const useGlobalStore = create((set) => ({
  unReadcount: null,
  increment: () =>
    set((state) => ({
      unReadcount: state.unReadcount === null ? 0 : state.unReadcount + 1,
    })),
  decrement: () =>
    set((state) => ({
      unReadcount: state.unReadcount === 0 ? null : state.unReadcount - 1,
    })),
  setReadcount: (value) => set(() => ({ unReadcount: value })),
}));
