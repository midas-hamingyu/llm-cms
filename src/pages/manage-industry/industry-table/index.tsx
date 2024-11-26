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
  useIndustries,
  useIndustriesActions,
} from '@/pages/manage-industry/model/industries.store.ts';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';

export function IndustryTable() {
  const industries = useIndustries();
  const { removeIndustry } = useIndustriesActions();
  return (
    <Card className={cn('mt-5')}>
      <CardHeader>
        <CardTitle>업종 목록</CardTitle>
        <CardDescription>추가한 업종 목록입니다.</CardDescription>
      </CardHeader>
      <CardContent className={cn('grid w-full items-center gap-4')}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>느낌 키워드</TableHead>
              <TableHead className={cn('w-[100px] text-right')}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {industries.map((industry) => (
              <TableRow key={industry.name}>
                <TableCell className={cn('whitespace-nowrap')}>
                  {industry.name}
                </TableCell>
                <TableCell className={cn('w-full')}>
                  <div className={cn('flex flex-wrap gap-1')}>
                    {industry.feelingKeywords.map((keyword) => (
                      <Badge variant="outline" key={keyword}>
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeIndustry(industry.name)}
                    aria-label={`${industry.name} 삭제`}>
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
