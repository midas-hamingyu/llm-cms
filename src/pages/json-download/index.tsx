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

export function DownloadJSONPage() {
  const industries = useIndustries();
  const companies = useCompanies();
  const templates = useTemplates();

  const downloadJSON = (data: any, fileName: string) => {
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
    <div className={'flex flex-col gap-3'}>
      <Card>
        <CardHeader>
          <CardTitle>업종 다운로드</CardTitle>
          <CardDescription>업종 목록을 다운로드합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => downloadJSON(industries, '업종.json')}>
            다운로드
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>회사 다운로드</CardTitle>
          <CardDescription>회사 목록을 다운로드합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => downloadJSON(companies, '회사.json')}>
            다운로드
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>템플릿 다운로드</CardTitle>
          <CardDescription>템플릿 목록을 다운로드합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => downloadJSON(templates, '템플릿.json')}>
            다운로드
          </Button>
        </CardContent>
      </Card>
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
    </div>
  );
}
