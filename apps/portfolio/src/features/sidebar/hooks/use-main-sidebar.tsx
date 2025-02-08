import { create } from "zustand";

type MainSidebarState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useMainSidebar = create<MainSidebarState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMainSidebar;
