import { useIndustriesActions } from '@/pages/manage-industry/model/industries.store';
import { useCompaniesActions } from '@/pages/manage-company/model/companies.store';
import { useTemplatesActions } from '@/pages/manage-template/model/templates.store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';

export function UploadJSONPage() {
  const [isDragging, setIsDragging] = useState(false);
  const { initIndustries } = useIndustriesActions();
  const { initCompanies } = useCompaniesActions();
  const { initTemplates } = useTemplatesActions();

  const handleFileProcess = async (file: File) => {
    if (!file.name.endsWith('.json')) {
      alert('JSON 파일만 업로드 가능합니다.');
      return;
    }

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (data.industries) {
        initIndustries(data.industries);
      }
      if (data.companies) {
        initCompanies(data.companies);
      }
      if (data.templates) {
        initTemplates(data.templates);
      }

      alert('데이터가 성공적으로 업로드되었습니다.');
    } catch (error) {
      alert('파일을 처리하는 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileProcess(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileProcess(file);
    }
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) =>
      handleFileSelect(e as unknown as React.ChangeEvent<HTMLInputElement>);
    input.click();
  };

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader>
          <CardTitle>JSON 파일 업로드</CardTitle>
          <CardDescription>
            다운로드한 JSON 파일을 드래그하거나 클릭하여 업로드할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              h-40 
              border-2 
              border-dashed 
              rounded-lg 
              flex 
              items-center 
              justify-center
              transition-colors
              cursor-pointer
              hover:border-primary
              hover:bg-primary/5
              ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'}
            `}>
            <p className="text-gray-500">
              {isDragging
                ? '파일을 놓으세요'
                : '이곳을 클릭하거나 JSON 파일을 드래그하세요'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
