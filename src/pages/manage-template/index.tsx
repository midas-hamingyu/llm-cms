import { TemplateAddForm } from '@/pages/manage-template/template-add-form';
import { useTemplates } from '@/pages/manage-template/model/templates.store.ts';

export function ManageTemplatePage() {
  const templates = useTemplates();
  console.log(templates);
  return (
    <>
      <TemplateAddForm />
    </>
  );
}
