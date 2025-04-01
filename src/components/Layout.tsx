import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Fixed sidebar */}
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1 ml-[280px]">
        <Header />
        <main className="min-h-[calc(100vh-5rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
