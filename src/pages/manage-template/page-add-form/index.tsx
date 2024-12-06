import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';

interface PageFormData {
  pageSn: number;
  pageName: string;
  typeKeywords: string[];
  feelingKeywords: string[];
}

interface Props {
  onSubmit: (data: PageFormData) => void;
}

const formSchema = z.object({
  pageSn: z.string().min(1, '페이지 Sn을 입력해주세요.'),
  pageName: z.string().min(1, '페이지 이름을 입력해주세요.'),
  typeKeywords: z.string().optional(),
  feelingKeywords: z.string().optional(),
});

export function PageAddForm({ onSubmit: _onSubmit }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageSn: '',
      pageName: '',
      typeKeywords: '',
      feelingKeywords: '',
    },
  });

  const { handleSubmit, control, reset } = form;

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
      data.feelingKeywords
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

    _onSubmit({
      pageSn: Number(data.pageSn),
      pageName: data.pageName,
      typeKeywords: formattedTypeKeywords,
      feelingKeywords: formattedfeelingKeywords,
    });
    reset();
  };

  return (
    <Card className={'mt-4'}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>페이지 추가</CardTitle>
            <CardDescription>
              페이지 추가를 위한 정보들을 입력해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className={cn('grid w-full items-center gap-4')}>
            <FormField
              control={control}
              name="pageSn"
              render={({ field }) => (
                <FormItem className={cn('flex flex-col space-y-1.5')}>
                  <FormLabel htmlFor="pageSn">페이지 Sn</FormLabel>
                  <FormControl>
                    <Input
                      id="pageSn"
                      placeholder="페이지 Sn을 입력해주세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="pageName"
              render={({ field }) => (
                <FormItem className={cn('flex flex-col space-y-1.5')}>
                  <FormLabel htmlFor="pageName">페이지 이름</FormLabel>
                  <FormControl>
                    <Input
                      id="pageName"
                      placeholder="페이지 이름을 입력해주세요"
                      {...field}
                    />
                  </FormControl>
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
