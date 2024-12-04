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

export function TemplateTable() {
  const templates = useTemplates();
  const { removeTemplate } = useTemplatesActions();
  const { getIndustryByName } = useIndustriesActions();
  const { getCompanyByName } = useCompaniesActions();
  return (
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
              <TableRow key={template.templateSn}>
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
                      .map((industry) => <IndustryBadge industry={industry} />)}
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
  );
}
