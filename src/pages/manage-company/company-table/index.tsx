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
import { Button } from '@/components/ui/button.tsx';
import {
  useCompanies,
  useCompaniesActions,
} from '@/pages/manage-company/model/companies.store.ts';
import { useIndustriesActions } from '@/pages/manage-industry/model/industries.store.ts';
import { Industry } from '@/pages/manage-industry/model/industry.ts';
import { IndustryBadge } from '@/components/industry/IndustryBadge.tsx';

export function CompanyTable() {
  const companies = useCompanies();
  const { removeCompany } = useCompaniesActions();
  const { getIndustryByName } = useIndustriesActions();
  return (
    <Card className={cn('mt-5')}>
      <CardHeader>
        <CardTitle>회사 목록</CardTitle>
        <CardDescription>추가한 회사 목록입니다.</CardDescription>
      </CardHeader>
      <CardContent className={cn('grid w-full items-center gap-4')}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>업종</TableHead>
              <TableHead className={cn('w-[100px] text-right')}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.name}>
                <TableCell className={cn('whitespace-nowrap')}>
                  {company.name}
                </TableCell>
                <TableCell className={cn('w-full')}>
                  <div className={cn('flex flex-wrap gap-1')}>
                    {company.industries
                      .map(getIndustryByName)
                      .filter(
                        (industry): industry is Industry =>
                          industry !== undefined,
                      )
                      .map((industry) => (
                        <IndustryBadge
                          key={industry.name}
                          industry={industry}
                        />
                      ))}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeCompany(company.name)}
                    aria-label={`${company.name} 삭제`}>
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
