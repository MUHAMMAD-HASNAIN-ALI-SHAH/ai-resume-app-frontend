import { create } from "zustand";

interface DashboardState {
  menu: string;
  setMenu: (menu: string) => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
  menu: "resumes",
  setMenu: (menu) => set({ menu }),
}));

export default useDashboardStore;
