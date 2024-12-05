import { useIndustries } from '@/pages/manage-industry/model/industries.store.ts';
import { useCompanies } from '@/pages/manage-company/model/companies.store.ts';
import { useTemplates } from '@/pages/manage-template/model/templates.store.ts';
import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Company } from '@/pages/manage-company/model/company.ts';
import { Industry } from '@/pages/manage-industry/model/industry.ts';
import { Template } from '@/pages/manage-template/model/template.ts';

export function DownloadJSONPage() {
  const industries = useIndustries();
  const companies = useCompanies();
  const templates = useTemplates();

  const downloadJSON = (
    data: {
      companies: Company[];
      industries: Industry[];
      templates: Template[];
    },
    fileName: string,
  ) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const combinedData = {
    industries,
    companies,
    templates,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>전체 다운로드</CardTitle>
        <CardDescription>
          업종, 회사, 템플릿을 한 파일로 다운로드합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => downloadJSON(combinedData, '업종_회사_템플릿.json')}>
          다운로드
        </Button>
      </CardContent>
    </Card>
  );
}
