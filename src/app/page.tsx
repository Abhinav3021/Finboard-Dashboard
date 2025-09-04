// src/app/page.tsx
import AddWidgetButton from '@/components/dashboard/AddWidgetButton';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardBackup from '@/components/dashboard/DashboardBackup'; // Import the new component
import ThemeToggle from '@/components/ThemeToggle';
import { Separator } from '@/components/ui/separator';


export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 mb-2 ">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <h1 className="text-4xl font-bold text-green-700">Finance Dashboard</h1>
        <div className="flex gap-4">
          <DashboardBackup />
          <AddWidgetButton />
          <ThemeToggle />
        </div>
      </div>
      <Separator className="my-4" />
      <DashboardLayout />
    </main>
  );
}