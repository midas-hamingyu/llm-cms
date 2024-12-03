import { Badge } from '@/components/ui/badge.tsx';
import { Industry } from '@/pages/manage-industry/model/industry.ts';

interface Props {
  industry: Industry;
}

export function IndustryBadge({ industry }: Props) {
  return (
    <Badge variant="outline" key={industry.name}>
      {industry.name} - {industry.feelingKeywords.join(', ')}
    </Badge>
  );
}
