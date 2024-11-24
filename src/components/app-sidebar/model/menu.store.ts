import { create } from 'zustand';
import { SIDEBAR_MENU } from '@/components/app-sidebar/model/menu.constant.ts';

type StateType = {
  currentMenu: SIDEBAR_MENU;
};

type ActionsType = {
  changeMenu: (to: SIDEBAR_MENU) => void;
};

const useMenuStore = create<StateType & { actions: ActionsType }>((set) => ({
  currentMenu: SIDEBAR_MENU.INDUSTRY,
  actions: {
    changeMenu: (to) => {
      set(() => ({ currentMenu: to }));
    },
  },
}));

export const useCurrentMenu = () => useMenuStore((state) => state.currentMenu);
export const useMenuActions = () => useMenuStore((state) => state.actions);
