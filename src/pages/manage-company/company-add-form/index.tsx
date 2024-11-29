import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { cn } from '@/lib/utils.ts';
import {
  useIndustries,
  useIndustriesActions,
} from '@/pages/manage-industry/model/industries.store.ts';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx';
import { Industry } from '@/pages/manage-industry/model/industry.ts';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { useCompaniesActions } from '@/pages/manage-company/model/companies.store.ts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

const formSchema = z.object({
  name: z.string().min(1, '회사명을 입력해주세요.'),
  industries: z.array(z.string()),
});

export function CompanyAddForm() {
  const industries = useIndustries();
  const { getIndustryByName } = useIndustriesActions();
  const thereIsNoIndustry = industries.length === 0;
  const { addCompany } = useCompaniesActions();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      industries: [],
    },
  });
  const { handleSubmit, control, reset, setValue, watch } = form;

  const selectedIndustries = watch('industries') || [];
  const thereAreSelectedIndustries = selectedIndustries.length > 0;

  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setValue(
        'industries',
        selectedIndustries.filter((item) => item !== industry),
      );
    } else {
      setValue('industries', [...selectedIndustries, industry]);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    addCompany(data);
    reset();
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>회사 추가</CardTitle>
            <CardDescription>
              회사명 입력과 함께 업종들을 선택해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className={cn('grid w-full items-center gap-4')}>
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className={cn('flex flex-col space-y-1.5')}>
                  <FormLabel htmlFor="name">회사명</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="회사명을 입력하세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="industries"
              render={() => (
                <FormItem className={cn('flex flex-col space-y-1.5')}>
                  <FormLabel>업종</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild disabled={thereIsNoIndustry}>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start',
                          !thereAreSelectedIndustries && 'text-gray-500/90',
                        )}>
                        {thereAreSelectedIndustries ? (
                          <div className={cn('flex gap-1')}>
                            {selectedIndustries
                              .map(getIndustryByName)
                              .filter(
                                (industry): industry is Industry =>
                                  industry !== undefined,
                              )
                              .map((industry) => (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger
                                      onClick={(e) => e.preventDefault()}>
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
                              ))}
                          </div>
                        ) : thereIsNoIndustry ? (
                          '선택할 수 있는 업종이 없습니다.'
                        ) : (
                          '업종을 선택하세요.'
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className={cn('p-1 w-fit')}>
                      <ScrollArea className="max-h-[208px] overflow-auto">
                        <div className={cn('grid pr-3')}>
                          {industries.map((industry) => (
                            <div
                              key={industry.name}
                              onClick={() => toggleIndustry(industry.name)}
                              className={cn(
                                'flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 hover:cursor-pointer',
                              )}>
                              <Checkbox
                                checked={selectedIndustries.includes(
                                  industry.name,
                                )}
                              />
                              <label
                                className={cn(
                                  'flex gap-3 text-sm font-medium hover:cursor-pointer',
                                )}>
                                {industry.name}
                                <div className={cn('flex gap-1')}>
                                  {industry.feelingKeywords.map((keyword) => (
                                    <Badge variant="outline" key={keyword}>
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">추가</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
