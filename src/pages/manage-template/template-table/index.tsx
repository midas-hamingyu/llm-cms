import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { cn } from '@/lib/utils.ts';
import {
  useTemplates,
  useTemplatesActions,
} from '@/pages/manage-template/model/templates.store.ts';
import { useCompaniesActions } from '@/pages/manage-company/model/companies.store.ts';
import { useIndustriesActions } from '@/pages/manage-industry/model/industries.store.ts';
import { IndustryBadge } from '@/components/industry/IndustryBadge.tsx';
import { Industry } from '@/pages/manage-industry/model/industry.ts';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { PageAddForm } from '../page-add-form';
import { PageList } from '@/pages/manage-template/page-list';

interface PageFormData {
  pageSn: number;
  pageName: string;
  typeKeywords: string[];
  feelingKeywords: string[];
}

export function TemplateTable() {
  const [selectedTemplateSn, setSelectedTemplateSn] = useState<number | null>(
    null,
  );
  const templates = useTemplates();
  const { removeTemplate, updateTemplate } = useTemplatesActions();
  const { getIndustryByName } = useIndustriesActions();
  const { getCompanyByName } = useCompaniesActions();
  const { getTemplateBySn } = useTemplatesActions();

  const selectedTemplate = selectedTemplateSn
    ? getTemplateBySn(selectedTemplateSn)
    : null;

  const handleAddPage = (data: PageFormData) => {
    if (!selectedTemplate) return;

    const updatedTemplate = {
      ...selectedTemplate,
      pages: [data, ...selectedTemplate.pages],
    };

    updateTemplate(updatedTemplate);
  };

  const handleRemovePage = (pageSn: number) => {
    if (!selectedTemplate) return;

    const updatedTemplate = {
      ...selectedTemplate,
      pages: selectedTemplate.pages.filter((page) => page.pageSn !== pageSn),
    };

    updateTemplate(updatedTemplate);
  };

  return (
    <>
      <Card className={cn('mt-5')}>
        <CardHeader>
          <CardTitle>템플릿 목록</CardTitle>
          <CardDescription>추가한 템플릿 목록입니다.</CardDescription>
        </CardHeader>
        <CardContent className={cn('grid w-full items-center gap-4')}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>템플릿 Sn</TableHead>
                <TableHead>회사명</TableHead>
                <TableHead>회사-업종</TableHead>
                <TableHead className={cn('whitespace-nowrap')}>
                  추가 유형 키워드
                </TableHead>
                <TableHead className={cn('whitespace-nowrap')}>
                  추가 느낌 키워드
                </TableHead>
                <TableHead className={cn('whitespace-nowrap')}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow
                  key={template.templateSn}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedTemplateSn(template.templateSn)}>
                  <TableCell className={cn('w-20 whitespace-nowrap')}>
                    {template.templateSn}
                  </TableCell>
                  <TableCell className={cn('w-20')}>
                    {template.companyName}
                  </TableCell>
                  <TableCell>
                    <div className={cn('flex gap-1 flex-wrap')}>
                      {getCompanyByName(template.companyName)
                        ?.industries.map(getIndustryByName)
                        .filter(
                          (industry): industry is Industry =>
                            industry !== undefined,
                        )
                        .map((industry) => (
                          <IndustryBadge industry={industry} />
                        ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={cn('flex gap-1 flex-wrap')}>
                      {template.typeKeywords.map((typeKeyword) => (
                        <Badge
                          variant="outline"
                          key={typeKeyword}
                          className={cn('whitespace-nowrap')}>
                          {typeKeyword}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={cn('flex gap-1 flex-wrap')}>
                      {template.feelingKeywords.map((feelingKeyword) => (
                        <Badge variant="outline" key={feelingKeyword}>
                          {feelingKeyword}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeTemplate(template.templateSn)}
                      aria-label={`${template.templateSn} 삭제`}>
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet
        open={!!selectedTemplate}
        onOpenChange={() => setSelectedTemplateSn(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>템플릿 페이지 관리</SheetTitle>
            <SheetDescription>
              {selectedTemplate?.companyName} 템플릿의 페이지를 관리합니다.
            </SheetDescription>
          </SheetHeader>
          <PageAddForm onSubmit={handleAddPage} />
          <PageList
            pages={selectedTemplate?.pages || []}
            onClickRemove={handleRemovePage}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
