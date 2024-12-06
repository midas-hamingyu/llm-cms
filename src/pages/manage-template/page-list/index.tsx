import { Page } from '@/pages/manage-template/model/template.ts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';

interface Props {
  pages: Page[];
  onClickRemove: (pageSn: number) => void;
}

export function PageList({ pages, onClickRemove }: Props) {
  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">페이지 목록</h3>
        {pages.map((page) => (
          <Card key={page.pageSn}>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {page.pageSn} - {page.pageName}
                </CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onClickRemove(page.pageSn)}>
                  삭제
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">
                    유형 키워드
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {page.typeKeywords.map((keyword) => (
                      <Badge variant="outline" key={keyword}>
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    느낌 키워드
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {page.feelingKeywords.map((keyword) => (
                      <Badge variant="outline" key={keyword}>
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
