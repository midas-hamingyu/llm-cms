import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import { AppSidebar } from '@/components/app-sidebar';
import { cn } from '@/lib/utils.ts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={cn('w-full p-5')}>{children}</main>
    </SidebarProvider>
  );
}
