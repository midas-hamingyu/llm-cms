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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { useCompanies } from '@/pages/manage-company/model/companies.store.ts';
import { useState } from 'react';
import { useTemplatesActions } from '@/pages/manage-template/model/templates.store.ts';
import { useIndustriesActions } from '@/pages/manage-industry/model/industries.store.ts';
import { IndustryBadge } from '@/components/industry/IndustryBadge.tsx';
import { Industry } from '@/pages/manage-industry/model/industry.ts';
import { Check } from 'lucide-react';

const formSchema = z.object({
  templateSn: z.string().min(1, '템플릿 Sn을 입력해주세요.'),
  companyName: z.string().min(1, '회사를 선택해주세요.'),
  typeKeywords: z.string().optional(),
  feelingKeywords: z.string().optional(),
});

export function TemplateAddForm() {
  const companies = useCompanies();
  const thereIsNoCompany = companies.length === 0;
  const { addTemplate } = useTemplatesActions();
  const { getIndustryByName } = useIndustriesActions();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      templateSn: '',
      companyName: '',
      typeKeywords: '',
      feelingKeywords: '',
    },
  });
  const [isCompanySelectPopoverOpen, setIsCompanySelectPopoverOpen] =
    useState<boolean>(false);
  const { handleSubmit, control, reset, setValue, watch } = form;

  const selectedCompany = watch('companyName');
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formattedTypeKeywords =
      data.typeKeywords
        ?.split(',')
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0) // 빈 키워드 제거
        .reduce<string[]>(
          (uniqueKeywords, keyword) =>
            uniqueKeywords.includes(keyword)
              ? uniqueKeywords
              : [...uniqueKeywords, keyword],
          [],
        ) || []; // 중복 제거 및 빈 키워드 대비 안전 처리

    const formattedfeelingKeywords =
      data.typeKeywords
        ?.split(',')
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0) // 빈 키워드 제거
        .reduce<string[]>(
          (uniqueKeywords, keyword) =>
            uniqueKeywords.includes(keyword)
              ? uniqueKeywords
              : [...uniqueKeywords, keyword],
          [],
        ) || []; // 중복 제거 및 빈 키워드 대비 안전 처리

    addTemplate({
      templateSn: Number(data.templateSn),
      companyName: data.companyName,
      typeKeywords: formattedTypeKeywords,
      feelingKeywords: formattedfeelingKeywords,
    });
    reset();
  };

  const selectCompany = (companyName: string) => {
    setValue('companyName', companyName);
    setIsCompanySelectPopoverOpen(false);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>템플릿 추가</CardTitle>
            <CardDescription>
              템플릿 추가를 위한 정보들을 입력해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className={cn('grid w-full items-center gap-4')}>
            <FormField
              control={control}
              name="templateSn"
              render={({ field }) => (
                <FormItem className={cn('flex flex-col space-y-1.5')}>
                  <FormLabel htmlFor="templateSn">템플릿 Sn</FormLabel>
                  <FormControl>
                    <Input
                      id="templateSn"
                      placeholder="템플릿 Sn을 입력해주세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyName"
              render={() => (
                <FormItem className={cn('flex flex-col space-y-1.5')}>
                  <FormLabel>회사</FormLabel>
                  <Popover
                    open={isCompanySelectPopoverOpen}
                    onOpenChange={setIsCompanySelectPopoverOpen}>
                    <PopoverTrigger asChild disabled={thereIsNoCompany}>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start',
                          !selectedCompany && 'text-gray-500/90',
                        )}>
                        {selectedCompany ? (
                          <div className={cn('flex gap-1')}>
                            {selectedCompany}
                          </div>
                        ) : thereIsNoCompany ? (
                          '선택할 수 있는 회사가 없습니다.'
                        ) : (
                          '회사를 선택하세요.'
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className={cn('p-1 w-fit')}>
                      <ScrollArea className="max-h-[208px] overflow-auto">
                        <div className={cn('grid pr-3')}>
                          {companies.map((company) => (
                            <div
                              key={company.name}
                              onClick={() => selectCompany(company.name)}
                              className={cn(
                                'flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 hover:cursor-pointer',
                              )}>
                              <label
                                className={cn(
                                  'flex items-center gap-3 text-sm font-medium hover:cursor-pointer',
                                )}>
                                {company.name === selectedCompany && (
                                  <Check size={16} />
                                )}
                                {company.name}
                                <div className={cn('flex gap-1')}>
                                  {company.industries
                                    .map(getIndustryByName)
                                    .filter(
                                      (industry): industry is Industry =>
                                        industry !== undefined,
                                    )
                                    .map((industry) => (
                                      <IndustryBadge industry={industry} />
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
            <FormField
              control={control}
              name="typeKeywords"
              render={({ field }) => (
                <FormItem className={cn('flex flex-col space-y-1.5')}>
                  <FormLabel htmlFor="keywords">유형 키워드</FormLabel>
                  <FormControl>
                    <Input
                      id="keywords"
                      placeholder="키워드를 콤마로 구분하여 입력하세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="feelingKeywords"
              render={({ field }) => (
                <FormItem className={cn('flex flex-col space-y-1.5')}>
                  <FormLabel htmlFor="keywords">느낌 키워드</FormLabel>
                  <FormControl>
                    <Input
                      id="keywords"
                      placeholder="키워드를 콤마로 구분하여 입력하세요"
                      {...field}
                    />
                  </FormControl>
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
