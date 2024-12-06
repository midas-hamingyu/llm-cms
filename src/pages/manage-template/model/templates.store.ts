import { create } from 'zustand';
import { Template } from '@/pages/manage-template/model/template.ts';

type StateType = {
  templates: Template[];
};

type ActionsType = {
  initTemplates: (templates: Template[]) => void;
  addTemplate: (newTemplate: Template) => void;
  removeTemplate: (templateSn: number) => void;
  updateTemplate: (updatedTemplate: Template) => void;
  getTemplateBySn: (templateSn: number) => Template | undefined;
};

const useTemplatesStore = create<StateType & { actions: ActionsType }>(
  (set, get) => ({
    templates: [],
    actions: {
      initTemplates: (templates) => {
        set({ templates });
      },
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
      updateTemplate: (updatedTemplate) => {
        set((state) => ({
          templates: state.templates.map((template) =>
            template.templateSn === updatedTemplate.templateSn
              ? updatedTemplate
              : template,
          ),
        }));
      },
      getTemplateBySn: (templateSn) => {
        return get().templates.find(
          (template) => template.templateSn === templateSn,
        );
      },
    },
  }),
);

export const useTemplates = () => useTemplatesStore((state) => state.templates);

export const useTemplatesActions = () =>
  useTemplatesStore((state) => state.actions);
