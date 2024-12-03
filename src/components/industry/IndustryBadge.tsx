import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { cn } from '@/lib/utils.ts';
import { Industry } from '@/pages/manage-industry/model/industry.ts';

interface Props {
  industry: Industry;
}

export function IndustryBadge({ industry }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={(e) => e.preventDefault()}>
          <Badge
            className={cn('cursor-help')}
            variant="outline"
            key={industry.name}>
            {industry.name}
          </Badge>
        </TooltipTrigger>
        <TooltipContent align={'start'}>
          {industry.feelingKeywords.join(', ')}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
