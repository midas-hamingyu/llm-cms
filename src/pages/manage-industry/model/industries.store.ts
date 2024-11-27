import { create } from 'zustand';
import { Industry } from '@/pages/manage-industry/model/industry.ts';
type StateType = {
  industries: Industry[];
};

type ActionsType = {
  addIndustry: (newIndustry: Industry) => void;
  removeIndustry: (industryName: string) => void;
  getIndustryByName: (industryName: string) => Industry | undefined;
};

const useIndustriesStore = create<StateType & { actions: ActionsType }>(
  (set, get) => ({
    industries: [],
    actions: {
      addIndustry: (newIndustry) => {
        set((state) => {
          return {
            industries: [newIndustry, ...state.industries],
          };
        });
      },
      removeIndustry: (industryName) => {
        set((state) => {
          return {
            industries: state.industries.filter(
              (industry) => industry.name !== industryName,
            ),
          };
        });
      },
      getIndustryByName: (industryName) => {
        const { industries } = get();
        return industries.find((industry) => industry.name === industryName);
      },
    },
  }),
);

export const useIndustries = () =>
  useIndustriesStore((state) => state.industries);

export const useIndustriesActions = () =>
  useIndustriesStore((state) => state.actions);
