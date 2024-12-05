import { create } from 'zustand';
import { Company } from '@/pages/manage-company/model/company.ts';
type StateType = {
  companies: Company[];
};

type ActionsType = {
  initCompanies: (companies: Company[]) => void;
  addCompany: (newCompany: Company) => void;
  removeCompany: (companyName: string) => void;
  getCompanyByName: (companyName: string) => Company | undefined;
};

const useCompaniesStore = create<StateType & { actions: ActionsType }>(
  (set, get) => ({
    companies: [],
    actions: {
      initCompanies: (companies) => {
        set({ companies });
      },
      addCompany: (newCompany) => {
        set((state) => {
          return {
            companies: [newCompany, ...state.companies],
          };
        });
      },
      removeCompany: (companyName) => {
        set((state) => {
          return {
            companies: state.companies.filter(
              (company) => company.name !== companyName,
            ),
          };
        });
      },
      getCompanyByName: (companyName) => {
        const { companies } = get();
        return companies.find((company) => company.name === companyName);
      },
    },
  }),
);

export const useCompanies = () => useCompaniesStore((state) => state.companies);

export const useCompaniesActions = () =>
  useCompaniesStore((state) => state.actions);
