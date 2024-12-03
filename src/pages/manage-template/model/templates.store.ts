import { create } from 'zustand';
import { Template } from '@/pages/manage-template/model/template.ts';

type StateType = {
  templates: Template[];
};

type ActionsType = {
  addTemplate: (newTemplate: Template) => void;
  removeTemplate: (templateSn: number) => void;
};

const useTemplatesStore = create<StateType & { actions: ActionsType }>(
  (set) => ({
    templates: [],
    actions: {
      addTemplate: (newTemplate) => {
        set((state) => {
          return {
            templates: [newTemplate, ...state.templates],
          };
        });
      },
      removeTemplate: (templateSn) => {
        set((state) => {
          return {
            templates: state.templates.filter(
              (template) => template.templateSn !== templateSn,
            ),
          };
        });
      },
    },
  }),
);

export const useTemplates = () => useTemplatesStore((state) => state.templates);

export const useTemplatesActions = () =>
  useTemplatesStore((state) => state.actions);
