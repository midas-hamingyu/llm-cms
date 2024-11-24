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

const formSchema = z.object({
  name: z.string().min(1, '업종명을 입력해주세요.'),
  keywords: z
    .string()
    .transform((val) => val.split(',').map((keyword) => keyword.trim()))
    .refine((arr) => arr.length > 0 && arr.every((kw) => kw.length > 0), {
      message: '유효한 키워드를 입력해주세요.',
    }),
});

export function IndustryAddForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      keywords: [],
    },
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('폼 데이터:', data);
    reset();
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>업종 추가</CardTitle>
            <CardDescription>업종명과 키워드를 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent className={cn('grid w-full items-center gap-4')}>
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className={cn('flex flex-col space-y-1.5')}>
                  <FormLabel htmlFor="name">업종명</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="업종명을 입력하세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="keywords"
              render={({ field }) => (
                <FormItem className={cn('flex flex-col space-y-1.5')}>
                  <FormLabel htmlFor="keywords">키워드</FormLabel>
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
            <Button type="submit">제출</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
